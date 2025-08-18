import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Sparkles, Loader2, CheckCircle, Info } from 'lucide-react';

interface AutoFillButtonProps {
  onAutoFill: () => Promise<void>;
  confidence?: 'high' | 'medium' | 'low';
  description?: string;
  sources?: string[];
  disabled?: boolean;
  variant?: 'default' | 'outline' | 'secondary';
  size?: 'default' | 'sm' | 'lg';
  children?: React.ReactNode;
}

export const AutoFillButton: React.FC<AutoFillButtonProps> = ({
  onAutoFill,
  confidence = 'medium',
  description,
  sources = [],
  disabled = false,
  variant = 'outline',
  size = 'sm',
  children
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPopover, setShowPopover] = useState(false);

  const handleAutoFill = async () => {
    if (disabled || isLoading) return;
    
    setIsLoading(true);
    try {
      await onAutoFill();
    } catch (error) {
      console.error('Auto-fill failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getConfidenceColor = (conf: string) => {
    switch (conf) {
      case 'high': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'medium': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'low': return 'bg-slate-100 text-slate-800 border-slate-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const getConfidenceIcon = (conf: string) => {
    switch (conf) {
      case 'high': return <CheckCircle className="h-3 w-3" />;
      default: return <Info className="h-3 w-3" />;
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant={variant}
        size={size}
        onClick={handleAutoFill}
        disabled={disabled || isLoading}
        className="flex items-center gap-2"
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Sparkles className="h-4 w-4" />
        )}
        {children || 'Auto-fill'}
      </Button>

      {(description || sources.length > 0) && (
        <Popover open={showPopover} onOpenChange={setShowPopover}>
          <PopoverTrigger asChild>
            <Badge 
              variant="outline" 
              className={`cursor-pointer text-xs ${getConfidenceColor(confidence)}`}
            >
              <span className="flex items-center gap-1">
                {getConfidenceIcon(confidence)}
                {confidence}
              </span>
            </Badge>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="start">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="font-medium">AI Auto-fill Info</span>
              </div>
              
              {description && (
                <div>
                  <h4 className="font-medium text-sm mb-1">Description</h4>
                  <p className="text-sm text-muted-foreground">{description}</p>
                </div>
              )}

              {sources.length > 0 && (
                <div>
                  <h4 className="font-medium text-sm mb-2">Data Sources</h4>
                  <ul className="space-y-1">
                    {sources.map((source, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                        <div className="w-1 h-1 bg-muted-foreground rounded-full" />
                        {source}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="text-xs text-muted-foreground pt-2 border-t">
                Confidence level indicates the reliability of AI-generated content.
                Always review before submitting.
              </div>
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};