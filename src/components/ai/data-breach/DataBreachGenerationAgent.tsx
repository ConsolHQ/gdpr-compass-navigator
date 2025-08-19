import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { AlertTriangle, Clock, CheckCircle, Wand2, FileText, Shield } from 'lucide-react';

interface DataBreachGenerationAgentProps {
  onApply?: (data: any) => void;
}

const DataBreachGenerationAgent: React.FC<DataBreachGenerationAgentProps> = ({ onApply }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generatedContent, setGeneratedContent] = useState<any>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setProgress(0);

    // Simulate AI generation process
    const steps = [
      'Analyzing incident details...',
      'Assessing severity and impact...',
      'Generating breach report template...',
      'Creating notification templates...',
      'Finalizing documentation...'
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setProgress((i + 1) * 20);
    }

    // Simulate generated breach management content
    const generated = {
      incidentTitle: 'Email Database Security Incident',
      severity: 'High',
      description: 'Unauthorized access to customer email database detected through compromised admin credentials',
      affectedRecords: 1250,
      dataTypes: ['Email addresses', 'Names', 'Phone numbers', 'Account creation dates'],
      containmentActions: [
        'Disabled compromised admin account',
        'Changed all admin passwords',
        'Implemented additional 2FA requirements',
        'Conducted security audit of access logs'
      ],
      riskAssessment: 'Medium likelihood of harm due to limited data exposure',
      notificationRequired: true,
      authorityNotification: 'Required within 72 hours',
      dataSubjectNotification: 'Required for high-risk individuals',
      timeline: {
        discovered: new Date().toISOString().split('T')[0],
        contained: new Date(Date.now() + 24*60*60*1000).toISOString().split('T')[0],
        reported: new Date(Date.now() + 48*60*60*1000).toISOString().split('T')[0]
      }
    };

    setGeneratedContent(generated);
    setIsGenerating(false);
  };

  const handleApply = () => {
    if (onApply && generatedContent) {
      onApply(generatedContent);
    }
  };

  return (
    <Card className="mb-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              Data Breach Generation Agent
            </CardTitle>
            <CardDescription>
              Generate comprehensive breach reports and response templates
            </CardDescription>
          </div>
          <Badge variant="outline" className="bg-red-50">
            <Shield className="h-3 w-3 mr-1" />
            Incident Response
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isGenerating && !generatedContent && (
          <div className="text-center py-8">
            <AlertTriangle className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Generate Breach Response</h3>
            <p className="text-muted-foreground mb-4">
              Create comprehensive incident documentation and response procedures
            </p>
            <Button onClick={handleGenerate} className="bg-red-600 hover:bg-red-700">
              <Wand2 className="mr-2 h-4 w-4" />
              Generate Breach Documentation
            </Button>
          </div>
        )}

        {isGenerating && (
          <div className="space-y-4">
            <div className="text-center">
              <Clock className="h-8 w-8 text-red-600 mx-auto mb-2 animate-spin" />
              <p className="font-medium">Generating breach response documentation...</p>
            </div>
            <Progress value={progress} className="w-full" />
            <p className="text-sm text-muted-foreground text-center">
              Analyzing incident and creating comprehensive response plan
            </p>
          </div>
        )}

        {generatedContent && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="font-medium text-green-600">Breach documentation generated successfully</span>
            </div>

            <div className="bg-red-50 p-4 rounded-lg space-y-3">
              <div>
                <h4 className="font-semibold text-red-900">Incident Overview</h4>
                <p className="text-sm text-red-800">{generatedContent.incidentTitle}</p>
                <p className="text-sm text-red-700 mt-1">{generatedContent.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xs font-medium text-red-900">Severity:</span>
                  <Badge variant={generatedContent.severity === 'High' ? 'destructive' : 'default'} className="ml-2">
                    {generatedContent.severity}
                  </Badge>
                </div>
                <div>
                  <span className="text-xs font-medium text-red-900">Affected Records:</span>
                  <span className="ml-2 text-sm font-medium">{generatedContent.affectedRecords.toLocaleString()}</span>
                </div>
              </div>

              <div>
                <h5 className="text-xs font-medium text-red-900 mb-1">Data Types Affected:</h5>
                <div className="flex flex-wrap gap-1">
                  {generatedContent.dataTypes.map((type: string, index: number) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {type}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleApply} className="flex-1 bg-red-600 hover:bg-red-700">
                <FileText className="mr-2 h-4 w-4" />
                Apply to Breach Report
              </Button>
              <Button variant="outline" onClick={() => setGeneratedContent(null)}>
                Generate New
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DataBreachGenerationAgent;