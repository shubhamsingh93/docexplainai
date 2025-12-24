import { Link } from 'react-router-dom';
import { FileText, Shield, Heart, ArrowUpRight } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border/30 bg-secondary/20 backdrop-blur-sm">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-md transition-all group-hover:shadow-lg">
                <FileText className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold text-foreground font-display">
                DocExplain
              </span>
            </Link>
            <p className="text-muted-foreground max-w-sm leading-relaxed mb-6">
              Helping you understand complex documents in plain language. 
              No legal advice, just clear explanations powered by AI.
            </p>
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-success/10 text-success text-sm font-medium">
              <Shield className="h-4 w-4" />
              <span>Your documents are never stored</span>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold text-foreground mb-6 font-display">Learn</h4>
            <ul className="space-y-4">
              <li>
                <Link 
                  to="/how-it-works" 
                  className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 group"
                >
                  How it Works
                  <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-6 font-display">Legal</h4>
            <ul className="space-y-4">
              <li>
                <Link 
                  to="/privacy" 
                  className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 group"
                >
                  Privacy Policy
                  <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                </Link>
              </li>
              <li>
                <Link 
                  to="/terms" 
                  className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 group"
                >
                  Terms of Service
                  <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/30 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} DocExplain. Free to use.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1.5">
            Made with <Heart className="h-3.5 w-3.5 text-accent fill-accent animate-pulse" /> for everyone
          </p>
        </div>
      </div>
    </footer>
  );
}
