import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, Search, CheckCircle, TrendingUp, Clock } from 'lucide-react';

interface IncidentAssessmentAgentProps {
  onAssessmentComplete?: (assessment: any) => void;
}

const IncidentAssessmentAgent: React.FC<IncidentAssessmentAgentProps> = ({ onAssessmentComplete }) => {
  const [isAssessing, setIsAssessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [assessment, setAssessment] = useState<any>(null);

  const handleAssess = async () => {
    setIsAssessing(true);
    setProgress(0);

    // Simulate assessment process
    const steps = [
      'Analyzing incident scope...',
      'Evaluating data sensitivity...',
      'Assessing risk levels...',
      'Determining notification requirements...',
      'Generating recommendations...'
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 700));
      setProgress((i + 1) * 20);
    }

    const assessmentResult = {
      riskLevel: 'High',
      notificationRequired: {
        authority: true,
        dataSubjects: true,
        deadline: '72 hours from discovery'
      },
      impactAnalysis: {
        financial: 'Medium - potential regulatory fines',
        reputational: 'High - customer trust impact',
        operational: 'Low - systems contained quickly'
      },
      recommendations: [
        'Immediate notification to supervisory authority required',
        'Prepare data subject notifications for high-risk individuals',
        'Implement additional security measures',
        'Conduct thorough forensic investigation',
        'Review and update incident response procedures'
      ],
      complianceStatus: {
        gdprCompliant: false,
        requiredActions: [
          'Submit breach notification within 72 hours',
          'Document all incident response actions',
          'Notify affected data subjects if high risk'
        ]
      }
    };

    setAssessment(assessmentResult);
    setIsAssessing(false);
  };

  const handleApply = () => {
    if (onAssessmentComplete && assessment) {
      onAssessmentComplete(assessment);
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'High': return 'destructive';
      case 'Medium': return 'default';
      case 'Low': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <Card className="mb-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5 text-orange-600" />
              Incident Assessment Agent
            </CardTitle>
            <CardDescription>
              Analyze breach impact and determine compliance requirements
            </CardDescription>
          </div>
          <Badge variant="outline" className="bg-orange-50">
            <TrendingUp className="h-3 w-3 mr-1" />
            Risk Analysis
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isAssessing && !assessment && (
          <div className="text-center py-8">
            <Search className="h-12 w-12 text-orange-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Assess Incident Impact</h3>
            <p className="text-muted-foreground mb-4">
              Analyze the severity, risk level, and compliance requirements
            </p>
            <Button onClick={handleAssess} className="bg-orange-600 hover:bg-orange-700">
              <TrendingUp className="mr-2 h-4 w-4" />
              Run Impact Assessment
            </Button>
          </div>
        )}

        {isAssessing && (
          <div className="space-y-4">
            <div className="text-center">
              <Clock className="h-8 w-8 text-orange-600 mx-auto mb-2 animate-spin" />
              <p className="font-medium">Analyzing incident impact...</p>
            </div>
            <Progress value={progress} className="w-full" />
            <p className="text-sm text-muted-foreground text-center">
              Evaluating risk levels and compliance requirements
            </p>
          </div>
        )}

        {assessment && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="font-medium text-green-600">Assessment completed</span>
            </div>

            <div className="bg-orange-50 p-4 rounded-lg space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-orange-900">Risk Assessment</h4>
                <Badge variant={getRiskColor(assessment.riskLevel)}>
                  {assessment.riskLevel} Risk
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="text-center p-3 bg-white rounded">
                  <h5 className="text-xs font-medium text-orange-900">Financial Impact</h5>
                  <p className="text-sm mt-1">{assessment.impactAnalysis.financial}</p>
                </div>
                <div className="text-center p-3 bg-white rounded">
                  <h5 className="text-xs font-medium text-orange-900">Reputational Impact</h5>
                  <p className="text-sm mt-1">{assessment.impactAnalysis.reputational}</p>
                </div>
                <div className="text-center p-3 bg-white rounded">
                  <h5 className="text-xs font-medium text-orange-900">Operational Impact</h5>
                  <p className="text-sm mt-1">{assessment.impactAnalysis.operational}</p>
                </div>
              </div>

              <div>
                <h5 className="text-sm font-medium text-orange-900 mb-2">Notification Requirements:</h5>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span>Authority Notification:</span>
                    <Badge variant={assessment.notificationRequired.authority ? 'destructive' : 'secondary'}>
                      {assessment.notificationRequired.authority ? 'Required' : 'Not Required'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Data Subject Notification:</span>
                    <Badge variant={assessment.notificationRequired.dataSubjects ? 'destructive' : 'secondary'}>
                      {assessment.notificationRequired.dataSubjects ? 'Required' : 'Not Required'}
                    </Badge>
                  </div>
                  {assessment.notificationRequired.deadline && (
                    <p className="text-xs text-orange-700 mt-1">
                      Deadline: {assessment.notificationRequired.deadline}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleApply} className="flex-1 bg-orange-600 hover:bg-orange-700">
                Apply Assessment
              </Button>
              <Button variant="outline" onClick={() => setAssessment(null)}>
                Re-assess
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default IncidentAssessmentAgent;