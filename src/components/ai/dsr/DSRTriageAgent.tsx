import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, CheckCircle, Clock, Zap, AlertTriangle, Info } from 'lucide-react';
import { ConfidenceBadge } from '../ConfidenceBadge';
import { AutoFillButton } from '../AutoFillButton';

interface DSRTriageAgentProps {
  requestData: {
    type?: string;
    description: string;
    requesterEmail: string;
    requesterName: string;
  };
  onTriageComplete: (triageResults: TriageResults) => void;
}

interface TriageResults {
  classification: {
    requestType: string;
    confidence: 'high' | 'medium' | 'low';
    subType?: string;
  };
  priority: {
    level: 'high' | 'medium' | 'low';
    reason: string;
    confidence: 'high' | 'medium' | 'low';
  };
  jurisdiction: {
    applicable: string;
    confidence: 'high' | 'medium' | 'low';
    reasoning: string;
  };
  compliance: {
    slaDeadline: string;
    notificationRequired: boolean;
    verificationLevel: 'basic' | 'enhanced' | 'strict';
  };
  riskFlags: Array<{
    type: 'duplicate' | 'vexatious' | 'broad_scope' | 'high_value';
    severity: 'low' | 'medium' | 'high';
    description: string;
  }>;
  suggestions: {
    assignTo: string[];
    estimatedHours: number;
    requiredActions: string[];
  };
}

export const DSRTriageAgent: React.FC<DSRTriageAgentProps> = ({
  requestData,
  onTriageComplete
}) => {
  const [isTriaging, setIsTriaging] = useState(false);
  const [triageResults, setTriageResults] = useState<TriageResults | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const handleAutoTriage = async () => {
    setIsTriaging(true);
    
    // Simulate AI triage processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock triage results based on input
    const mockResults: TriageResults = {
      classification: {
        requestType: requestData.type || 'Data Access',
        confidence: 'high',
        subType: 'Full Personal Data Export'
      },
      priority: {
        level: requestData.description.toLowerCase().includes('urgent') ? 'high' : 'medium',
        reason: 'Standard data access request with complete personal data scope',
        confidence: 'high'
      },
      jurisdiction: {
        applicable: 'GDPR (EU)',
        confidence: 'high',
        reasoning: 'Email domain suggests EU jurisdiction'
      },
      compliance: {
        slaDeadline: '30 days from receipt',
        notificationRequired: false,
        verificationLevel: 'basic'
      },
      riskFlags: [],
      suggestions: {
        assignTo: ['Sarah Johnson', 'Mike Davis'],
        estimatedHours: 4,
        requiredActions: [
          'Verify identity',
          'Search all systems',
          'Compile data export',
          'Legal review'
        ]
      }
    };

    // Add risk flags based on content analysis
    if (requestData.description.length < 50) {
      mockResults.riskFlags.push({
        type: 'broad_scope',
        severity: 'medium',
        description: 'Request description is very brief - may require clarification'
      });
    }

    setTriageResults(mockResults);
    setIsTriaging(false);
    onTriageComplete(mockResults);
  };

  const getPriorityIcon = (level: string) => {
    switch (level) {
      case 'high': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'medium': return <Clock className="h-4 w-4 text-amber-500" />;
      default: return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  const getPriorityColor = (level: string) => {
    switch (level) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      default: return 'secondary';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          AI Triage Agent
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!triageResults ? (
          <div className="text-center space-y-4">
            <p className="text-muted-foreground">
              Let AI analyze this request to determine priority, classification, and compliance requirements.
            </p>
            <AutoFillButton
              onAutoFill={handleAutoTriage}
              confidence="high"
              description="Analyzes request content, determines jurisdiction, classifies request type, and suggests workflow"
              sources={['GDPR Articles 15-22', 'Internal DSR History', 'Jurisdiction Detection Model']}
              disabled={isTriaging}
              variant="default"
              size="default"
            >
              {isTriaging ? 'Analyzing Request...' : 'Run AI Triage'}
            </AutoFillButton>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Classification Results */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Request Type</span>
                  <ConfidenceBadge confidence={triageResults.classification.confidence} size="sm" />
                </div>
                <Badge variant="outline" className="w-full justify-center">
                  {triageResults.classification.requestType}
                </Badge>
                {triageResults.classification.subType && (
                  <p className="text-xs text-muted-foreground">{triageResults.classification.subType}</p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Priority Level</span>
                  <ConfidenceBadge confidence={triageResults.priority.confidence} size="sm" />
                </div>
                <div className="flex items-center gap-2">
                  {getPriorityIcon(triageResults.priority.level)}
                  <Badge variant={getPriorityColor(triageResults.priority.level)}>
                    {triageResults.priority.level.toUpperCase()}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{triageResults.priority.reason}</p>
              </div>
            </div>

            <Separator />

            {/* Compliance Info */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Jurisdiction & Compliance</span>
                <ConfidenceBadge confidence={triageResults.jurisdiction.confidence} size="sm" />
              </div>
              <div className="bg-muted/50 p-3 rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Applicable Law:</span>
                  <Badge variant="outline">{triageResults.jurisdiction.applicable}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">SLA Deadline:</span>
                  <span className="text-sm font-medium">{triageResults.compliance.slaDeadline}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Verification Required:</span>
                  <Badge variant="secondary">{triageResults.compliance.verificationLevel}</Badge>
                </div>
              </div>
            </div>

            {/* Risk Flags */}
            {triageResults.riskFlags.length > 0 && (
              <div className="space-y-2">
                <span className="text-sm font-medium">Risk Flags</span>
                <div className="space-y-2">
                  {triageResults.riskFlags.map((flag, index) => (
                    <div key={index} className="flex items-start gap-2 p-2 bg-amber-50 border border-amber-200 rounded">
                      <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium capitalize">{flag.type.replace('_', ' ')}</span>
                          <Badge variant="outline" className="text-xs">
                            {flag.severity}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{flag.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Suggestions */}
            <div className="space-y-2">
              <span className="text-sm font-medium">AI Recommendations</span>
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Estimated Time:</span>
                  <span className="text-sm font-medium">{triageResults.suggestions.estimatedHours}h</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Suggested Assignees:</span>
                  <div className="flex gap-1">
                    {triageResults.suggestions.assignTo.map(person => (
                      <Badge key={person} variant="secondary" className="text-xs">
                        {person}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowDetails(!showDetails)}
              className="w-full"
            >
              {showDetails ? 'Hide' : 'Show'} Detailed Analysis
            </Button>

            {showDetails && (
              <div className="mt-4 p-3 bg-muted/30 rounded-lg space-y-2">
                <h4 className="font-medium text-sm">Required Actions Checklist:</h4>
                <ul className="space-y-1">
                  {triageResults.suggestions.requiredActions.map((action, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-3 w-3 text-green-600" />
                      {action}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};