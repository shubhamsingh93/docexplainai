import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AnalysisResult } from '@/types/document';

interface AnalysisState {
  loading: boolean;
  error: string | null;
  result: AnalysisResult | null;
}

export function useDocumentAnalysis() {
  const [state, setState] = useState<AnalysisState>({
    loading: false,
    error: null,
    result: null,
  });

  const analyzeDocument = async (
    documentText: string,
    document2Text?: string
  ): Promise<AnalysisResult | null> => {
    setState({ loading: true, error: null, result: null });

    try {
      const { data, error } = await supabase.functions.invoke('analyze-document', {
        body: {
          documentText,
          document2Text,
          mode: document2Text ? 'compare' : 'single',
        },
      });

      if (error) {
        throw new Error(error.message || 'Failed to analyze document');
      }

      if (data.error) {
        throw new Error(data.error);
      }

      const result = data as AnalysisResult;
      setState({ loading: false, error: null, result });
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setState({ loading: false, error: errorMessage, result: null });
      return null;
    }
  };

  const reset = () => {
    setState({ loading: false, error: null, result: null });
  };

  return {
    ...state,
    analyzeDocument,
    reset,
  };
}
