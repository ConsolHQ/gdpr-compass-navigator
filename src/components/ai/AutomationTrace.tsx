import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  User, 
  Bot, 
  ChevronRight, 
  Eye, 
  FileText, 
  AlertCircle 
} from 'lucide-react';
import { SourceChip } from './SourceChip';

interface AutomationStep {
  id: string;
  name: string;
  status: 'completed' | 'failed' | 'pending' | 'human-review';
  timestamp: Date;
  duration?: number;
  actor: 'ai' | 'human' | 'system';
  description: string;
  inputs?: Record<string, any>;
  outputs?: Record<string, any>;
  sources?: Array<{
    type: 'data-dictionary' | 'gdpr-article' | 'policy-template' | 'previous-dpia' | 'legal-basis' | 'company-policy';
    reference: string;
    description?: string;
  }>;
  humanReviewRequired?: boolean;
  confidence?: 'high' | 'medium' | 'low';
}

interface AutomationTraceProps {
  isOpen: boolean;
  onClose: () => void;
  automationId: string;
  title: string;
  steps: AutomationStep[];
}

export const AutomationTrace: React.FC<AutomationTraceProps> = ({
  isOpen,
  onClose,
  automationId,
  title,
  steps
}) => {
  const getStatusIcon = (status: AutomationStep['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-emerald-600" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-amber-600" />;
      case 'human-review':
        return <User className="h-4 w-4 text-blue-600" />;
    }
  };

  const getActorIcon = (actor: AutomationStep['actor']) => {
    switch (actor) {
      case 'ai':
        return <Bot className="h-3 w-3" />;
      case 'human':
        return <User className="h-3 w-3" />;
      case 'system':
        return <FileText className="h-3 w-3" />;
    }
  };

  const getStatusBadge = (status: AutomationStep['status']) => {
    switch (status) {
      case 'completed':
        return <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">Completed</Badge>;
      case 'failed':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Failed</Badge>;
      case 'pending':
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Pending</Badge>;
      case 'human-review':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Review Required</Badge>;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Automation Trace: {title}
            </DialogTitle>
            <Badge variant="outline" className="text-xs font-mono">
              ID: {automationId}
            </Badge>
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh]">
          <div className="space-y-4 pr-4">
            {steps.map((step, index) => (
              <div key={step.id} className="relative">
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="absolute left-6 top-12 w-px h-8 bg-border" />
                )}

                <Card className="relative">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(step.status)}
                        <div>
                          <CardTitle className="text-sm font-medium flex items-center gap-2">
                            {step.name}
                            <Badge variant="outline" className="text-xs flex items-center gap-1">
                              {getActorIcon(step.actor)}
                              {step.actor}
                            </Badge>
                          </CardTitle>
                          <p className="text-xs text-muted-foreground mt-1">
                            {step.timestamp.toLocaleString()}
                            {step.duration && (
                              <span className="ml-2">• {step.duration}ms</span>
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {step.confidence && (
                          <Badge variant="outline" className="text-xs">
                            {step.confidence} confidence
                          </Badge>
                        )}
                        {getStatusBadge(step.status)}
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    <p className="text-sm">{step.description}</p>

                    {step.humanReviewRequired && (
                      <div className="flex items-center gap-2 p-2 bg-amber-50 border border-amber-200 rounded-md">
                        <AlertCircle className="h-4 w-4 text-amber-600" />
                        <span className="text-sm text-amber-800">Human review required before proceeding</span>
                      </div>
                    )}

                    {step.sources && step.sources.length > 0 && (
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-2">Sources:</p>
                        <div className="flex flex-wrap gap-1">
                          {step.sources.map((source, sourceIndex) => (
                            <SourceChip
                              key={sourceIndex}
                              source={source}
                              size="sm"
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {(step.inputs || step.outputs) && (
                      <div className="space-y-2">
                        <Separator />
                        
                        {step.inputs && (
                          <div>
                            <p className="text-xs font-medium text-muted-foreground mb-1">Inputs:</p>
                            <pre className="text-xs bg-muted p-2 rounded overflow-x-auto">
                              {JSON.stringify(step.inputs, null, 2)}
                            </pre>
                          </div>
                        )}

                        {step.outputs && (
                          <div>
                            <p className="text-xs font-medium text-muted-foreground mb-1">Outputs:</p>
                            <pre className="text-xs bg-muted p-2 rounded overflow-x-auto">
                              {JSON.stringify(step.outputs, null, 2)}
                            </pre>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};