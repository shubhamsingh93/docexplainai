import { Loader2 } from 'lucide-react';

export function AnalysisLoading() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="relative">
        <div className="h-16 w-16 rounded-full border-4 border-secondary" />
        <div className="absolute inset-0 h-16 w-16 rounded-full border-4 border-primary border-t-transparent animate-spin" />
      </div>
      <div className="mt-6 text-center">
        <h3 className="text-lg font-semibold text-foreground">Analyzing your document</h3>
        <p className="text-muted-foreground mt-2 max-w-sm">
          Reading through the content, identifying key clauses, and preparing a clear explanation for you...
        </p>
      </div>
      <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" />
        This usually takes 15-30 seconds
      </div>
    </div>
  );
}
