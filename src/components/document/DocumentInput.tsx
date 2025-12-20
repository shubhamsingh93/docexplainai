import { useCallback, useState, useRef } from 'react';
import { Upload, FileText, X, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { extractTextFromFile, validateFile } from '@/lib/documentParser';
import { cn } from '@/lib/utils';

interface DocumentInputProps {
  onTextExtracted: (text: string) => void;
  documentNumber?: 1 | 2;
  disabled?: boolean;
}

export function DocumentInput({ 
  onTextExtracted, 
  documentNumber = 1,
  disabled = false 
}: DocumentInputProps) {
  const [activeTab, setActiveTab] = useState<'upload' | 'paste'>('upload');
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(async (selectedFile: File) => {
    setError(null);
    const validation = validateFile(selectedFile);
    
    if (!validation.valid) {
      setError(validation.error || 'Invalid file');
      return;
    }

    setFile(selectedFile);
    setLoading(true);

    try {
      const extractedText = await extractTextFromFile(selectedFile);
      if (!extractedText.trim()) {
        setError('Could not extract text from this file. The file may be empty or contain only images.');
        setFile(null);
        return;
      }
      onTextExtracted(extractedText);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to read file');
      setFile(null);
    } finally {
      setLoading(false);
    }
  }, [onTextExtracted]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    
    if (disabled) return;
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFile(droppedFile);
    }
  }, [handleFile, disabled]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) {
      setDragActive(true);
    }
  }, [disabled]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handleFile(selectedFile);
    }
  }, [handleFile]);

  const handleTextSubmit = useCallback(() => {
    if (text.trim()) {
      onTextExtracted(text.trim());
    }
  }, [text, onTextExtracted]);

  const clearFile = useCallback(() => {
    setFile(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  const label = documentNumber === 1 ? 'Document' : 'Second Document';

  return (
    <div className={cn("w-full", disabled && "opacity-50 pointer-events-none")}>
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'upload' | 'paste')}>
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="upload" className="gap-2">
            <Upload className="h-4 w-4" />
            Upload File
          </TabsTrigger>
          <TabsTrigger value="paste" className="gap-2">
            <FileText className="h-4 w-4" />
            Paste Text
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="mt-0">
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
            className={cn(
              "upload-zone cursor-pointer",
              dragActive && "dragging",
              file && "border-primary bg-primary/5"
            )}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx,.txt"
              onChange={handleFileInput}
              className="hidden"
              disabled={disabled}
            />

            {loading ? (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                <p className="text-sm text-muted-foreground">Reading document...</p>
              </div>
            ) : file ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{file.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    clearFile();
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary">
                  <Upload className="h-6 w-6 text-muted-foreground" />
                </div>
                <div className="text-center">
                  <p className="font-medium text-foreground">
                    Drop your {label.toLowerCase()} here
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    or click to browse (PDF, DOCX, TXT)
                  </p>
                </div>
              </div>
            )}
          </div>

          {error && (
            <div className="flex items-center gap-2 mt-3 p-3 bg-destructive/10 text-destructive rounded-lg">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="paste" className="mt-0">
          <Textarea
            placeholder={`Paste your ${label.toLowerCase()} text here...`}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[200px] resize-y"
            disabled={disabled}
          />
          <Button
            onClick={handleTextSubmit}
            disabled={!text.trim() || disabled}
            className="w-full mt-4"
          >
            Use This Text
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
}
