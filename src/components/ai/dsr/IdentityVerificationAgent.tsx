import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, CheckCircle, AlertTriangle, X, Upload, Eye, FileText } from 'lucide-react';
import { ConfidenceBadge } from '../ConfidenceBadge';

interface IdentityVerificationAgentProps {
  requesterInfo: {
    name: string;
    email: string;
    phone?: string;
  };
  onVerificationComplete: (results: VerificationResults) => void;
}

interface VerificationResults {
  overallScore: number;
  status: 'verified' | 'requires_review' | 'failed';
  checks: {
    emailValidation: { passed: boolean; confidence: number; details: string };
    nameConsistency: { passed: boolean; confidence: number; details: string };
    phoneValidation: { passed: boolean; confidence: number; details: string };
    documentAnalysis: { passed: boolean; confidence: number; details: string };
    riskAssessment: { passed: boolean; confidence: number; details: string };
  };
  recommendations: string[];
  requiredActions: string[];
}

export const IdentityVerificationAgent: React.FC<IdentityVerificationAgentProps> = ({
  requesterInfo,
  onVerificationComplete
}) => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResults, setVerificationResults] = useState<VerificationResults | null>(null);
  const [uploadedDocuments, setUploadedDocuments] = useState<string[]>([]);
  const [verificationStep, setVerificationStep] = useState(0);

  const verificationSteps = [
    'Email Domain Analysis',
    'Name Pattern Recognition',
    'Phone Number Validation',
    'Document Authenticity Check',
    'Risk Assessment'
  ];

  const handleStartVerification = async () => {
    setIsVerifying(true);
    
    // Simulate step-by-step verification
    for (let i = 0; i < verificationSteps.length; i++) {
      setVerificationStep(i);
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    // Mock verification results
    const mockResults: VerificationResults = {
      overallScore: 85,
      status: 'verified',
      checks: {
        emailValidation: {
          passed: true,
          confidence: 95,
          details: 'Email domain verified, MX records valid, no suspicious patterns detected'
        },
        nameConsistency: {
          passed: true,
          confidence: 90,
          details: 'Name format consistent with regional standards, no obvious aliases detected'
        },
        phoneValidation: {
          passed: !!requesterInfo.phone,
          confidence: requesterInfo.phone ? 85 : 0,
          details: requesterInfo.phone ? 'Phone number format valid for region' : 'No phone number provided'
        },
        documentAnalysis: {
          passed: uploadedDocuments.length > 0,
          confidence: uploadedDocuments.length > 0 ? 80 : 0,
          details: uploadedDocuments.length > 0 ? 'Document appears authentic, no tampering detected' : 'No documents uploaded'
        },
        riskAssessment: {
          passed: true,
          confidence: 88,
          details: 'No matches against fraud databases, request pattern normal'
        }
      },
      recommendations: [
        'Identity verification successful with high confidence',
        'Proceed with standard DSR processing workflow',
        'No additional verification steps required'
      ],
      requiredActions: []
    };

    // Adjust results based on missing information
    if (!requesterInfo.phone) {
      mockResults.overallScore -= 10;
      mockResults.recommendations.push('Consider requesting phone number for future requests');
    }

    if (uploadedDocuments.length === 0) {
      mockResults.overallScore -= 15;
      mockResults.status = 'requires_review';
      mockResults.requiredActions.push('Request proof of identity document');
      mockResults.recommendations.push('Manual review recommended due to missing ID documents');
    }

    setVerificationResults(mockResults);
    setIsVerifying(false);
    onVerificationComplete(mockResults);
  };

  const handleDocumentUpload = (fileName: string) => {
    setUploadedDocuments(prev => [...prev, fileName]);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'text-green-600';
      case 'requires_review': return 'text-amber-600';
      case 'failed': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'requires_review': return <AlertTriangle className="h-5 w-5 text-amber-600" />;
      case 'failed': return <X className="h-5 w-5 text-red-600" />;
      default: return <Shield className="h-5 w-5 text-gray-600" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          Identity Verification Agent
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Requester Info Summary */}
        <div className="bg-muted/50 p-3 rounded-lg">
          <h4 className="font-medium text-sm mb-2">Requester Information</h4>
          <div className="space-y-1 text-sm">
            <div><span className="font-medium">Name:</span> {requesterInfo.name}</div>
            <div><span className="font-medium">Email:</span> {requesterInfo.email}</div>
            {requesterInfo.phone && (
              <div><span className="font-medium">Phone:</span> {requesterInfo.phone}</div>
            )}
          </div>
        </div>

        {/* Document Upload */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Identity Documents</span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleDocumentUpload(`ID_Document_${Date.now()}.pdf`)}
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload Document
            </Button>
          </div>
          {uploadedDocuments.length > 0 ? (
            <div className="space-y-2">
              {uploadedDocuments.map((doc, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-green-50 border border-green-200 rounded">
                  <FileText className="h-4 w-4 text-green-600" />
                  <span className="text-sm flex-1">{doc}</span>
                  <Badge variant="outline" className="text-xs">Uploaded</Badge>
                </div>
              ))}
            </div>
          ) : (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                No identity documents uploaded. This may require manual verification.
              </AlertDescription>
            </Alert>
          )}
        </div>

        {/* Verification Process */}
        {!verificationResults ? (
          <div className="text-center space-y-4">
            {isVerifying ? (
              <div className="space-y-4">
                <Progress value={(verificationStep / verificationSteps.length) * 100} className="w-full" />
                <p className="text-sm text-muted-foreground">
                  {verificationStep < verificationSteps.length 
                    ? `Running: ${verificationSteps[verificationStep]}...`
                    : 'Completing verification...'
                  }
                </p>
              </div>
            ) : (
              <>
                <p className="text-muted-foreground text-sm">
                  Run AI-powered identity verification to assess requester authenticity and determine required verification level.
                </p>
                <Button onClick={handleStartVerification} className="w-full">
                  <Shield className="h-4 w-4 mr-2" />
                  Start Identity Verification
                </Button>
              </>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {/* Overall Result */}
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-3">
                {getStatusIcon(verificationResults.status)}
                <div>
                  <div className="font-medium capitalize">
                    {verificationResults.status.replace('_', ' ')}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Confidence Score: {verificationResults.overallScore}%
                  </div>
                </div>
              </div>
              <ConfidenceBadge 
                confidence={verificationResults.overallScore > 80 ? 'high' : verificationResults.overallScore > 60 ? 'medium' : 'low'} 
                size="sm"
              />
            </div>

            {/* Detailed Checks */}
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Verification Checks</h4>
              {Object.entries(verificationResults.checks).map(([checkName, result]) => (
                <div key={checkName} className="flex items-start gap-3 p-2 border rounded">
                  {result.passed ? (
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  ) : (
                    <X className="h-4 w-4 text-red-600 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium capitalize">
                        {checkName.replace(/([A-Z])/g, ' $1').toLowerCase()}
                      </span>
                      <Badge variant={result.passed ? 'default' : 'destructive'} className="text-xs">
                        {result.confidence}%
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{result.details}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Recommendations */}
            {verificationResults.recommendations.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Recommendations</h4>
                <ul className="space-y-1">
                  {verificationResults.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <Eye className="h-3 w-3 text-blue-600 mt-0.5" />
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Required Actions */}
            {verificationResults.requiredActions.length > 0 && (
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <div className="space-y-1">
                    <div className="font-medium">Required Actions:</div>
                    <ul className="list-disc list-inside space-y-1">
                      {verificationResults.requiredActions.map((action, index) => (
                        <li key={index} className="text-sm">{action}</li>
                      ))}
                    </ul>
                  </div>
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};