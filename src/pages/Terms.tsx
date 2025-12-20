import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FileText, AlertTriangle, Scale, Users } from 'lucide-react';

export default function Terms() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 page-container">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-8">Terms of Service</h1>
          
          <div className="prose-explain space-y-8">
            <section className="result-section">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">Informational Tool Only</h2>
              </div>
              <p>DocExplain is designed to help you understand documents better. It provides explanations and highlights important sections in plain language.</p>
              <ul>
                <li>This is an educational and informational tool</li>
                <li>It helps you ask better questions about your documents</li>
                <li>It makes complex language easier to understand</li>
              </ul>
            </section>

            <section className="result-section border-l-4 border-l-amber-400">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="h-6 w-6 text-amber-500" />
                <h2 className="text-xl font-semibold text-foreground">Not Legal Advice</h2>
              </div>
              <p className="font-medium">DocExplain does not provide legal advice.</p>
              <ul>
                <li>The explanations are for informational purposes only</li>
                <li>We do not tell you what to do or what decisions to make</li>
                <li>The tool cannot account for your specific circumstances</li>
                <li>Laws and regulations vary by location and change over time</li>
              </ul>
            </section>

            <section className="result-section">
              <div className="flex items-center gap-3 mb-4">
                <Scale className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">Your Responsibility</h2>
              </div>
              <ul>
                <li>You are responsible for your own decisions</li>
                <li>Always verify important information independently</li>
                <li>Consult qualified professionals for legal, financial, or medical matters</li>
                <li>Do not rely solely on this tool for critical decisions</li>
              </ul>
            </section>

            <section className="result-section">
              <div className="flex items-center gap-3 mb-4">
                <Users className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">Consult Professionals</h2>
              </div>
              <p>For important matters, we strongly recommend consulting:</p>
              <ul>
                <li>A lawyer for legal documents and disputes</li>
                <li>An HR professional for employment matters</li>
                <li>A financial advisor for financial documents</li>
                <li>An insurance professional for policy questions</li>
              </ul>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
