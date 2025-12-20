import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Shield, Lock, Trash2, Eye } from 'lucide-react';

export default function Privacy() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 page-container">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-8">Privacy Policy</h1>
          
          <div className="prose-explain space-y-8">
            <section className="result-section">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">Your Privacy Matters</h2>
              </div>
              <p>DocExplain is designed with your privacy as a priority. We believe you should be able to understand your documents without sacrificing your personal information.</p>
            </section>

            <section className="result-section">
              <div className="flex items-center gap-3 mb-4">
                <Trash2 className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">Documents Are Not Stored</h2>
              </div>
              <ul>
                <li>Your documents are processed only to generate explanations</li>
                <li>We do not save your documents to any database</li>
                <li>Once you close your browser tab, your document is gone</li>
                <li>We cannot retrieve your document after your session ends</li>
              </ul>
            </section>

            <section className="result-section">
              <div className="flex items-center gap-3 mb-4">
                <Lock className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">No Accounts Required</h2>
              </div>
              <ul>
                <li>You can use DocExplain without creating an account</li>
                <li>We do not collect your email, name, or other personal information</li>
                <li>No login means no profile to worry about</li>
              </ul>
            </section>

            <section className="result-section">
              <div className="flex items-center gap-3 mb-4">
                <Eye className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">How AI Is Used</h2>
              </div>
              <ul>
                <li>AI is used only to explain the text you provide</li>
                <li>Your documents are not used to train AI models</li>
                <li>The AI analysis is generated fresh each time</li>
              </ul>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
