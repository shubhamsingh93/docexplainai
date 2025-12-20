import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are DocExplain, an AI assistant that helps non-legal users understand complex documents clearly and simply. You explain meaning, impact, and potential risks in plain language.

CRITICAL RULES - YOU MUST FOLLOW THESE:
1. NEVER give legal advice
2. NEVER tell the user what they should do
3. NEVER say "accept" or "reject"
4. NEVER reference laws unless explicitly present in the document
5. NEVER use legal jargon
6. NEVER be alarmist

TONE: Calm, neutral, clear, informational
STYLE: Short sentences, plain language, bullet points where helpful

DEFAULT CONTEXT: Assume India unless the document clearly references another country.

For SINGLE DOCUMENT ANALYSIS, you must:
1. Identify document type (offer letter, employment policy, insurance policy, terms and conditions, or other business document)
2. Identify key sections related to:
   - Money or compensation
   - Termination or exit
   - User obligations
   - Company obligations
   - Data usage and privacy
   - Penalties or restrictions
3. Rank sections by importance (High/Medium/Low impact)
4. Detect red flags - clauses that are:
   - One-sided
   - Limit flexibility
   - Increase financial risk
   - Unusually vague or strict
   Assign severity: Low/Medium/High
5. Explain clauses simply:
   - What it says
   - What it means for the user
   - Why it matters in real life

OUTPUT FORMAT (JSON):
{
  "documentType": "string",
  "tldr": ["bullet1", "bullet2", ...], // 4-6 bullets
  "keyClauses": [
    {
      "title": "string",
      "impact": "high|medium|low",
      "whatItSays": "string",
      "whatItMeans": "string"
    }
  ],
  "redFlags": [
    {
      "title": "string",
      "severity": "high|medium|low",
      "whyItMatters": "string",
      "exampleSituation": "string"
    }
  ],
  "questionsToConsider": ["question1", "question2", ...]
}`;

const COMPARISON_SYSTEM_PROMPT = `You are DocExplain, an AI assistant that helps non-legal users understand and compare documents. You explain differences, changes, and their impact in plain language.

CRITICAL RULES - YOU MUST FOLLOW THESE:
1. NEVER give legal advice
2. NEVER tell the user what they should do
3. NEVER say "accept" or "reject"
4. NEVER reference laws unless explicitly present in the documents
5. NEVER use legal jargon
6. NEVER be alarmist

TONE: Calm, neutral, clear, informational
STYLE: Short sentences, plain language, bullet points where helpful

For DOCUMENT COMPARISON:
1. Identify document type for both
2. Normalize clauses into categories:
   - Compensation or pricing
   - Termination or exit
   - Duration or validity
   - User obligations
   - Company obligations
   - Privacy and data
   - Penalties or restrictions
3. Detect changes: Added, Removed, Modified clauses
4. Explain impact: What changed, who benefits, what it means
5. Detect risk shift: Increased, Decreased, or Unchanged

OUTPUT FORMAT (JSON):
{
  "document1Type": "string",
  "document2Type": "string",
  "summary": {
    "overallChange": "string", // Brief overview
    "restrictiveness": "more_restrictive|less_restrictive|mixed"
  },
  "keyDifferences": [
    {
      "category": "string",
      "before": "string",
      "after": "string",
      "whyThisMatters": "string"
    }
  ],
  "riskChanges": {
    "newRisks": ["string"],
    "reducedRisks": ["string"],
    "clarifiedRisks": ["string"]
  },
  "questionsToConsider": ["question1", "question2", ...]
}`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { documentText, document2Text, mode } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const isComparison = mode === "compare" && document2Text;
    
    const userMessage = isComparison
      ? `Please compare these two documents and provide your analysis in the specified JSON format.

DOCUMENT 1:
${documentText}

DOCUMENT 2:
${document2Text}`
      : `Please analyze this document and provide your analysis in the specified JSON format.

DOCUMENT:
${documentText}`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { 
            role: "system", 
            content: isComparison ? COMPARISON_SYSTEM_PROMPT : SYSTEM_PROMPT 
          },
          { role: "user", content: userMessage },
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Service temporarily unavailable. Please try again later." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "Failed to analyze document. Please try again." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    
    if (!content) {
      throw new Error("No response from AI");
    }

    // Parse the JSON response
    let analysis;
    try {
      analysis = JSON.parse(content);
    } catch {
      // If JSON parsing fails, try to extract JSON from the response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysis = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("Failed to parse AI response");
      }
    }

    return new Response(JSON.stringify({ analysis, mode: isComparison ? "compare" : "single" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("analyze-document error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error occurred" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
