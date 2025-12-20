import { FileText, AlertTriangle, HelpCircle, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SingleDocumentAnalysis } from '@/types/document';

interface SingleAnalysisResultProps {
  analysis: SingleDocumentAnalysis;
}

export function SingleAnalysisResult({ analysis }: SingleAnalysisResultProps) {
  return (
    <div className="space-y-6 stagger-children">
      {/* Document Type & TLDR */}
      <Card className="result-section">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="section-title">
              <FileText className="h-5 w-5 text-primary" />
              Summary
            </CardTitle>
            <Badge variant="documentType">{analysis.documentType}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {analysis.tldr.map((point, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                <span className="text-foreground/90">{point}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Key Clauses */}
      {analysis.keyClauses.length > 0 && (
        <Card className="result-section">
          <CardHeader className="pb-3">
            <CardTitle className="section-title">
              <FileText className="h-5 w-5 text-primary" />
              Key Clauses Explained
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {analysis.keyClauses.map((clause, index) => (
              <div 
                key={index} 
                className="p-4 rounded-lg bg-secondary/50 border border-border/50"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Badge 
                    variant={
                      clause.impact === 'high' ? 'impactHigh' : 
                      clause.impact === 'medium' ? 'impactMedium' : 
                      'impactLow'
                    }
                  >
                    {clause.impact} impact
                  </Badge>
                  <h4 className="font-semibold text-foreground">{clause.title}</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium text-muted-foreground">What it says: </span>
                    <span className="text-foreground/90">{clause.whatItSays}</span>
                  </div>
                  <div>
                    <span className="font-medium text-muted-foreground">What it means for you: </span>
                    <span className="text-foreground/90">{clause.whatItMeans}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Red Flags */}
      {analysis.redFlags.length > 0 && (
        <Card className="result-section border-l-4 border-l-amber-400">
          <CardHeader className="pb-3">
            <CardTitle className="section-title">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Points to Note
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {analysis.redFlags.map((flag, index) => (
              <div 
                key={index} 
                className="p-4 rounded-lg bg-amber-50/50 border border-amber-200/50"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Badge 
                    variant={
                      flag.severity === 'high' ? 'riskHigh' : 
                      flag.severity === 'medium' ? 'riskMedium' : 
                      'riskLow'
                    }
                  >
                    {flag.severity} severity
                  </Badge>
                  <h4 className="font-semibold text-foreground">{flag.title}</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <p className="text-foreground/90">{flag.whyItMatters}</p>
                  <div className="mt-2 p-3 bg-background rounded border border-border/50">
                    <span className="font-medium text-muted-foreground">Example: </span>
                    <span className="text-foreground/80 italic">{flag.exampleSituation}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Questions to Consider */}
      {analysis.questionsToConsider.length > 0 && (
        <Card className="result-section">
          <CardHeader className="pb-3">
            <CardTitle className="section-title">
              <HelpCircle className="h-5 w-5 text-info" />
              Questions You Might Want to Ask
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {analysis.questionsToConsider.map((question, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-info/10 text-info text-xs font-medium flex-shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-foreground/90">{question}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
