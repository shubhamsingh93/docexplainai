import { useState } from 'react';
import { FileText, GitCompare, ArrowRight, Shield, Zap, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { DocumentInput } from '@/components/document/DocumentInput';
import { SingleAnalysisResult } from '@/components/document/SingleAnalysisResult';
import { ComparisonResult } from '@/components/document/ComparisonResult';
import { AnalysisLoading } from '@/components/document/AnalysisLoading';
import { useDocumentAnalysis } from '@/hooks/useDocumentAnalysis';
import { useToast } from '@/hooks/use-toast';

type Mode = 'single' | 'compare';

export default function Index() {
  const [mode, setMode] = useState<Mode>('single');
  const [doc1Text, setDoc1Text] = useState<string | null>(null);
  const [doc2Text, setDoc2Text] = useState<string | null>(null);
  const { loading, error, result, analyzeDocument, reset } = useDocumentAnalysis();
  const { toast } = useToast();

  const handleAnalyze = async () => {
    if (!doc1Text) return;
    
    const analysisResult = await analyzeDocument(doc1Text, mode === 'compare' ? doc2Text || undefined : undefined);
    
    if (!analysisResult) {
      toast({
        title: "Analysis failed",
        description: error || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleReset = () => {
    setDoc1Text(null);
    setDoc2Text(null);
    reset();
  };

  const canAnalyze = mode === 'single' ? !!doc1Text : !!(doc1Text && doc2Text);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        {!result && !loading && (
          <section className="py-16 sm:py-24 bg-gradient-to-b from-secondary/50 to-background">
            <div className="container text-center max-w-3xl">
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight">
                Understand any document in{' '}
                <span className="text-primary">plain language</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Upload your offer letter, policy, or contract. Get a clear explanation of what it means, what to look out for, and questions you might want to ask.
              </p>
              
              {/* Trust badges */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary" />
                  <span>Documents never stored</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-primary" />
                  <span>Free to use</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-primary" />
                  <span>No account needed</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Main Content */}
        <section className="page-container">
          {loading ? (
            <AnalysisLoading />
          ) : result ? (
            <div className="animate-fade-in">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-foreground">Analysis Results</h2>
                <Button variant="outline" onClick={handleReset}>
                  Analyze Another Document
                </Button>
              </div>
              
              {result.mode === 'single' ? (
                <SingleAnalysisResult analysis={result.analysis} />
              ) : (
                <ComparisonResult analysis={result.analysis} />
              )}
            </div>
          ) : (
            <div className="max-w-2xl mx-auto">
              {/* Mode Selector */}
              <div className="flex gap-2 mb-8 p-1 bg-secondary rounded-lg">
                <button
                  onClick={() => setMode('single')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-md text-sm font-medium transition-all ${
                    mode === 'single' 
                      ? 'bg-background text-foreground shadow-sm' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <FileText className="h-4 w-4" />
                  Understand Document
                </button>
                <button
                  onClick={() => setMode('compare')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-md text-sm font-medium transition-all ${
                    mode === 'compare' 
                      ? 'bg-background text-foreground shadow-sm' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <GitCompare className="h-4 w-4" />
                  Compare Two Documents
                </button>
              </div>

              {/* Document Inputs */}
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-foreground mb-3">
                    {mode === 'compare' ? 'First Document (Original)' : 'Your Document'}
                  </h3>
                  <DocumentInput 
                    onTextExtracted={setDoc1Text} 
                    documentNumber={1}
                  />
                  {doc1Text && (
                    <p className="mt-2 text-sm text-green-600 flex items-center gap-1">
                      ✓ Document ready ({doc1Text.length.toLocaleString()} characters)
                    </p>
                  )}
                </div>

                {mode === 'compare' && (
                  <div>
                    <h3 className="font-medium text-foreground mb-3">
                      Second Document (New/Updated)
                    </h3>
                    <DocumentInput 
                      onTextExtracted={setDoc2Text} 
                      documentNumber={2}
                    />
                    {doc2Text && (
                      <p className="mt-2 text-sm text-green-600 flex items-center gap-1">
                        ✓ Document ready ({doc2Text.length.toLocaleString()} characters)
                      </p>
                    )}
                  </div>
                )}

                <Button 
                  onClick={handleAnalyze}
                  disabled={!canAnalyze}
                  size="lg"
                  className="w-full"
                >
                  {mode === 'compare' ? 'Compare Documents' : 'Analyze Document'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                {/* Disclaimer */}
                <p className="text-xs text-center text-muted-foreground">
                  This tool provides informational explanations only, not legal advice. 
                  Always consult a professional for important decisions.
                </p>
              </div>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
