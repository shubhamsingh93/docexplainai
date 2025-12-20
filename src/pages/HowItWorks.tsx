import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Upload, Brain, FileText, GitCompare } from 'lucide-react';

export default function HowItWorks() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 page-container">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-4">How It Works</h1>
          <p className="text-lg text-muted-foreground mb-12">Understanding your documents in four simple steps</p>
          
          <div className="space-y-8">
            <div className="result-section flex gap-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg flex-shrink-0">1</div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Upload className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">Upload or Paste Your Document</h3>
                </div>
                <p className="text-muted-foreground">Upload a PDF, Word document, or text file. You can also paste text directly. We support offer letters, policies, contracts, and terms of service.</p>
              </div>
            </div>

            <div className="result-section flex gap-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg flex-shrink-0">2</div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">AI Analysis</h3>
                </div>
                <p className="text-muted-foreground">Our AI reads through your document, identifies key sections, detects important clauses, and notes anything that might need your attention.</p>
              </div>
            </div>

            <div className="result-section flex gap-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg flex-shrink-0">3</div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">Clear Explanations</h3>
                </div>
                <p className="text-muted-foreground">Get a plain-language summary, key clauses explained, points to note, and thoughtful questions you might want to ask.</p>
              </div>
            </div>

            <div className="result-section flex gap-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg flex-shrink-0">4</div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <GitCompare className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">Optional: Compare Documents</h3>
                </div>
                <p className="text-muted-foreground">Have two versions? Upload both to see what changed, who benefits from the changes, and what new considerations you should keep in mind.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
