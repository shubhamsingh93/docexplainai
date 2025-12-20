import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-transform group-hover:scale-105">
            <FileText className="h-5 w-5" />
          </div>
          <span className="text-xl font-semibold text-foreground">
            DocExplain
          </span>
        </Link>
        
        <nav className="flex items-center gap-6">
          <Link 
            to="/how-it-works" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors animated-underline"
          >
            How it Works
          </Link>
          <Link 
            to="/privacy" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors animated-underline"
          >
            Privacy
          </Link>
          <Link 
            to="/terms" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors animated-underline"
          >
            Terms
          </Link>
        </nav>
      </div>
    </header>
  );
}
