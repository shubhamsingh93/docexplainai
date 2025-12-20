export type RiskSeverity = "high" | "medium" | "low";
export type ImpactLevel = "high" | "medium" | "low";
export type Restrictiveness = "more_restrictive" | "less_restrictive" | "mixed";

export interface KeyClause {
  title: string;
  impact: ImpactLevel;
  whatItSays: string;
  whatItMeans: string;
}

export interface RedFlag {
  title: string;
  severity: RiskSeverity;
  whyItMatters: string;
  exampleSituation: string;
}

export interface SingleDocumentAnalysis {
  documentType: string;
  tldr: string[];
  keyClauses: KeyClause[];
  redFlags: RedFlag[];
  questionsToConsider: string[];
}

export interface KeyDifference {
  category: string;
  before: string;
  after: string;
  whyThisMatters: string;
}

export interface RiskChanges {
  newRisks: string[];
  reducedRisks: string[];
  clarifiedRisks: string[];
}

export interface ComparisonAnalysis {
  document1Type: string;
  document2Type: string;
  summary: {
    overallChange: string;
    restrictiveness: Restrictiveness;
  };
  keyDifferences: KeyDifference[];
  riskChanges: RiskChanges;
  questionsToConsider: string[];
}

export type AnalysisResult = 
  | { mode: "single"; analysis: SingleDocumentAnalysis }
  | { mode: "compare"; analysis: ComparisonAnalysis };
