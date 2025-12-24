import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';
import { ShareModal } from '@/components/ShareModal';
import { ThemeToggle } from '@/components/ThemeToggle';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/30 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-md transition-all duration-300 group-hover:shadow-lg group-hover:scale-105">
            <FileText className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold text-foreground font-display">
            DocExplain
          </span>
        </Link>
        
        <nav className="flex items-center gap-2 sm:gap-4">
          <Link 
            to="/how-it-works" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors animated-underline px-3 py-2 hidden sm:block"
          >
            How it Works
          </Link>
          <Link 
            to="/privacy" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors animated-underline px-3 py-2 hidden sm:block"
          >
            Privacy
          </Link>
          <Link 
            to="/terms" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors animated-underline px-3 py-2 hidden sm:block"
          >
            Terms
          </Link>
          <div className="flex items-center gap-1 border-l border-border/50 pl-2 sm:pl-4 ml-1 sm:ml-2">
            <ShareModal />
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}
