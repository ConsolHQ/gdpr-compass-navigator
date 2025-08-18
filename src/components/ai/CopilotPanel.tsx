import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  Sparkles, 
  X, 
  Send, 
  Lightbulb, 
  FileText, 
  CheckCircle,
  AlertCircle,
  ExternalLink 
} from 'lucide-react';

interface Suggestion {
  id: string;
  title: string;
  description: string;
  confidence: 'high' | 'medium' | 'low';
  source?: string;
  action?: () => void;
}

interface CopilotPanelProps {
  isOpen: boolean;
  onClose: () => void;
  context?: string;
  suggestions?: Suggestion[];
  onApplySuggestion?: (suggestionId: string) => void;
}

export const CopilotPanel: React.FC<CopilotPanelProps> = ({
  isOpen,
  onClose,
  context = "General",
  suggestions = [],
  onApplySuggestion
}) => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSendQuery = async () => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    // Simulate AI processing
    setTimeout(() => {
      setIsLoading(false);
      setQuery('');
    }, 2000);
  };

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case 'high': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'medium': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'low': return 'bg-slate-100 text-slate-800 border-slate-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const getConfidenceIcon = (confidence: string) => {
    switch (confidence) {
      case 'high': return <CheckCircle className="h-3 w-3" />;
      case 'medium': return <AlertCircle className="h-3 w-3" />;
      case 'low': return <AlertCircle className="h-3 w-3" />;
      default: return <AlertCircle className="h-3 w-3" />;
    }
  };

  return (
    <div className="fixed right-0 top-0 h-full w-96 bg-background border-l border-border shadow-2xl z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <div>
            <h3 className="font-semibold">AI Copilot</h3>
            <p className="text-sm text-muted-foreground">{context}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="h-8 w-8 p-0"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col">
        {/* Suggestions */}
        {suggestions.length > 0 && (
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="h-4 w-4 text-amber-500" />
              <span className="font-medium text-sm">Suggestions</span>
            </div>
            <ScrollArea className="max-h-64">
              <div className="space-y-3">
                {suggestions.map((suggestion) => (
                  <Card key={suggestion.id} className="p-3">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="font-medium text-sm">{suggestion.title}</h4>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getConfidenceColor(suggestion.confidence)}`}
                      >
                        <span className="flex items-center gap-1">
                          {getConfidenceIcon(suggestion.confidence)}
                          {suggestion.confidence}
                        </span>
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {suggestion.description}
                    </p>
                    {suggestion.source && (
                      <div className="flex items-center gap-1 mb-2">
                        <FileText className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          Source: {suggestion.source}
                        </span>
                      </div>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onApplySuggestion?.(suggestion.id)}
                      className="w-full"
                    >
                      Apply Suggestion
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </Button>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}

        {/* Chat Interface */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 p-4">
            <div className="text-center text-muted-foreground text-sm">
              Ask me anything about privacy compliance, GDPR requirements, or workflow automation.
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Textarea
                placeholder="Ask AI Copilot..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="min-h-[80px] resize-none"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendQuery();
                  }
                }}
              />
              <Button
                onClick={handleSendQuery}
                disabled={!query.trim() || isLoading}
                size="sm"
                className="h-20 w-12 p-0"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};