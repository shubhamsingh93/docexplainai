import { useState } from 'react';
import { FileText, GitCompare, ArrowRight, Shield, Zap, Eye, Sparkles } from 'lucide-react';
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
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        {!result && !loading && (
          <section className="relative py-20 sm:py-32 overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
            
            <div className="container relative text-center max-w-4xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 animate-fade-in">
                <Sparkles className="h-4 w-4" />
                AI-Powered Document Analysis
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight animate-slide-up font-display">
                Understand any document in{' '}
                <span className="gradient-text">plain language</span>
              </h1>
              
              <p className="mt-8 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
                Upload your offer letter, policy, or contract. Get a clear explanation of what it means, what to look out for, and questions you might want to ask.
              </p>
              
              {/* Trust badges */}
              <div className="mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-8 stagger-children">
                <div className="feature-card flex items-center gap-3 px-5 py-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <span className="font-medium text-foreground">Documents never stored</span>
                </div>
                <div className="feature-card flex items-center gap-3 px-5 py-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
                    <Zap className="h-5 w-5 text-accent" />
                  </div>
                  <span className="font-medium text-foreground">Free to use</span>
                </div>
                <div className="feature-card flex items-center gap-3 px-5 py-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-success/10">
                    <Eye className="h-5 w-5 text-success" />
                  </div>
                  <span className="font-medium text-foreground">No account needed</span>
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
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground font-display">Analysis Results</h2>
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
            <div className="max-w-2xl mx-auto animate-fade-in">
              {/* Mode Selector */}
              <div className="flex gap-2 mb-8 p-1.5 bg-secondary/50 backdrop-blur-sm rounded-2xl border border-border/50">
                <button
                  onClick={() => setMode('single')}
                  className={`mode-tab ${mode === 'single' ? 'mode-tab-active' : 'mode-tab-inactive'}`}
                >
                  <FileText className="h-4 w-4" />
                  Understand Document
                </button>
                <button
                  onClick={() => setMode('compare')}
                  className={`mode-tab ${mode === 'compare' ? 'mode-tab-active' : 'mode-tab-inactive'}`}
                >
                  <GitCompare className="h-4 w-4" />
                  Compare Two Documents
                </button>
              </div>

              {/* Document Inputs */}
              <div className="space-y-8">
                <div className="glass-card p-6">
                  <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2 font-display">
                    <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary text-primary-foreground text-xs font-bold">1</span>
                    {mode === 'compare' ? 'First Document (Original)' : 'Your Document'}
                  </h3>
                  <DocumentInput 
                    onTextExtracted={setDoc1Text} 
                    documentNumber={1}
                  />
                  {doc1Text && (
                    <p className="mt-4 text-sm text-success flex items-center gap-2 font-medium">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-success/20">✓</span>
                      Document ready ({doc1Text.length.toLocaleString()} characters)
                    </p>
                  )}
                </div>

                {mode === 'compare' && (
                  <div className="glass-card p-6">
                    <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2 font-display">
                      <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-accent text-accent-foreground text-xs font-bold">2</span>
                      Second Document (New/Updated)
                    </h3>
                    <DocumentInput 
                      onTextExtracted={setDoc2Text} 
                      documentNumber={2}
                    />
                    {doc2Text && (
                      <p className="mt-4 text-sm text-success flex items-center gap-2 font-medium">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-success/20">✓</span>
                        Document ready ({doc2Text.length.toLocaleString()} characters)
                      </p>
                    )}
                  </div>
                )}

                <Button 
                  onClick={handleAnalyze}
                  disabled={!canAnalyze}
                  size="xl"
                  variant="gradient"
                  className="w-full group"
                >
                  {mode === 'compare' ? 'Compare Documents' : 'Analyze Document'}
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>

                {/* Disclaimer */}
                <p className="text-xs text-center text-muted-foreground leading-relaxed">
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
