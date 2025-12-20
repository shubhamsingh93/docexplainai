import { ArrowRight, ArrowUp, ArrowDown, Minus, AlertTriangle, HelpCircle, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ComparisonAnalysis } from '@/types/document';

interface ComparisonResultProps {
  analysis: ComparisonAnalysis;
}

export function ComparisonResult({ analysis }: ComparisonResultProps) {
  const getRestrictivenessIcon = () => {
    switch (analysis.summary.restrictiveness) {
      case 'more_restrictive':
        return <ArrowUp className="h-4 w-4 text-red-500" />;
      case 'less_restrictive':
        return <ArrowDown className="h-4 w-4 text-green-500" />;
      default:
        return <Minus className="h-4 w-4 text-amber-500" />;
    }
  };

  const getRestrictivenessText = () => {
    switch (analysis.summary.restrictiveness) {
      case 'more_restrictive':
        return 'More restrictive than before';
      case 'less_restrictive':
        return 'Less restrictive than before';
      default:
        return 'Mixed changes';
    }
  };

  return (
    <div className="space-y-6 stagger-children">
      {/* Summary */}
      <Card className="result-section">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <CardTitle className="section-title">
              <FileText className="h-5 w-5 text-primary" />
              Comparison Summary
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="documentType">{analysis.document1Type}</Badge>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
              <Badge variant="documentType">{analysis.document2Type}</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-foreground/90 mb-4">{analysis.summary.overallChange}</p>
          <div className="flex items-center gap-2 p-3 rounded-lg bg-secondary/50">
            {getRestrictivenessIcon()}
            <span className="font-medium text-foreground">{getRestrictivenessText()}</span>
          </div>
        </CardContent>
      </Card>

      {/* Key Differences */}
      {analysis.keyDifferences.length > 0 && (
        <Card className="result-section">
          <CardHeader className="pb-3">
            <CardTitle className="section-title">
              <ArrowRight className="h-5 w-5 text-primary" />
              Key Differences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {analysis.keyDifferences.map((diff, index) => (
              <div 
                key={index} 
                className="p-4 rounded-lg bg-secondary/50 border border-border/50"
              >
                <Badge variant="secondary" className="mb-3">
                  {diff.category}
                </Badge>
                <div className="grid md:grid-cols-2 gap-4 mb-3">
                  <div className="p-3 rounded bg-red-50/50 border border-red-200/30">
                    <p className="text-xs font-medium text-red-700 mb-1">Before</p>
                    <p className="text-sm text-foreground/90">{diff.before}</p>
                  </div>
                  <div className="p-3 rounded bg-green-50/50 border border-green-200/30">
                    <p className="text-xs font-medium text-green-700 mb-1">After</p>
                    <p className="text-sm text-foreground/90">{diff.after}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium">Why this matters: </span>
                  {diff.whyThisMatters}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Risk Changes */}
      {(analysis.riskChanges.newRisks.length > 0 || 
        analysis.riskChanges.reducedRisks.length > 0 || 
        analysis.riskChanges.clarifiedRisks.length > 0) && (
        <Card className="result-section border-l-4 border-l-amber-400">
          <CardHeader className="pb-3">
            <CardTitle className="section-title">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Risk Changes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {analysis.riskChanges.newRisks.length > 0 && (
              <div>
                <h4 className="font-medium text-red-700 mb-2 flex items-center gap-2">
                  <ArrowUp className="h-4 w-4" />
                  New Risks
                </h4>
                <ul className="space-y-1">
                  {analysis.riskChanges.newRisks.map((risk, i) => (
                    <li key={i} className="text-sm text-foreground/90 pl-6">• {risk}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {analysis.riskChanges.reducedRisks.length > 0 && (
              <div>
                <h4 className="font-medium text-green-700 mb-2 flex items-center gap-2">
                  <ArrowDown className="h-4 w-4" />
                  Reduced Risks
                </h4>
                <ul className="space-y-1">
                  {analysis.riskChanges.reducedRisks.map((risk, i) => (
                    <li key={i} className="text-sm text-foreground/90 pl-6">• {risk}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {analysis.riskChanges.clarifiedRisks.length > 0 && (
              <div>
                <h4 className="font-medium text-blue-700 mb-2 flex items-center gap-2">
                  <Minus className="h-4 w-4" />
                  Clarified Items
                </h4>
                <ul className="space-y-1">
                  {analysis.riskChanges.clarifiedRisks.map((risk, i) => (
                    <li key={i} className="text-sm text-foreground/90 pl-6">• {risk}</li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Questions to Consider */}
      {analysis.questionsToConsider.length > 0 && (
        <Card className="result-section">
          <CardHeader className="pb-3">
            <CardTitle className="section-title">
              <HelpCircle className="h-5 w-5 text-info" />
              Questions About the Changes
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
