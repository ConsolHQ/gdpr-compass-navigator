import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ConfidenceBadge } from '../ConfidenceBadge';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle,
  XCircle,
  Clock,
  BookOpen,
  Gavel,
  Sparkles
} from 'lucide-react';

interface ComplianceAssessmentAgentProps {
  isActive: boolean;
  formData: any;
  onFormUpdate: (updates: any) => void;
}

const ComplianceAssessmentAgent: React.FC<ComplianceAssessmentAgentProps> = ({ 
  isActive, 
  formData, 
  onFormUpdate 
}) => {
  const [isAssessing, setIsAssessing] = useState(false);
  const [complianceScore, setComplianceScore] = useState(0);
  const [assessmentResults, setAssessmentResults] = useState<any[]>([]);

  const runComplianceAssessment = async () => {
    setIsAssessing(true);
    
    // Simulate AI compliance assessment
    setTimeout(() => {
      const mockResults = [
        {
          area: 'Legal Basis',
          status: formData.legalBasis ? 'compliant' : 'gap',
          confidence: 92,
          message: formData.legalBasis 
            ? `Legal basis "${formData.legalBasis}" is appropriate for this processing`
            : 'Legal basis must be specified for GDPR compliance',
          recommendation: formData.legalBasis 
            ? null
            : 'Consider "Legitimate Interest" for customer service activities'
        },
        {
          area: 'Data Retention',
          status: formData.retentionTime ? 'compliant' : 'warning',
          confidence: 88,
          message: formData.retentionTime 
            ? 'Retention period specified'
            : 'Retention period should be defined',
          recommendation: 'Define clear retention periods based on processing purpose'
        },
        {
          area: 'Data Subject Rights',
          status: 'review',
          confidence: 76,
          message: 'Data subject rights implementation needs review',
          recommendation: 'Ensure procedures for data subject requests are documented'
        },
        {
          area: 'International Transfers',
          status: formData.internationalTransfers === 'No' ? 'compliant' : 'warning',
          confidence: 94,
          message: formData.internationalTransfers === 'No' 
            ? 'No international transfers - compliant'
            : 'International transfers require adequate safeguards',
          recommendation: formData.internationalTransfers === 'Yes' 
            ? 'Ensure adequate safeguards are in place for transfers'
            : null
        },
        {
          area: 'Security Measures',
          status: formData.securityMeasures?.length > 0 ? 'compliant' : 'gap',
          confidence: 85,
          message: formData.securityMeasures?.length > 0 
            ? `${formData.securityMeasures.length} security measures documented`
            : 'Security measures must be documented',
          recommendation: 'Implement appropriate technical and organizational measures'
        }
      ];
      
      const compliantCount = mockResults.filter(r => r.status === 'compliant').length;
      const score = Math.round((compliantCount / mockResults.length) * 100);
      
      setAssessmentResults(mockResults);
      setComplianceScore(score);
      setIsAssessing(false);
    }, 3000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'gap':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'review':
        return <Clock className="h-4 w-4 text-blue-600" />;
      default:
        return <Shield className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant':
        return 'bg-green-50 border-green-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'gap':
        return 'bg-red-50 border-red-200';
      case 'review':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  if (!isActive) {
    return (
      <Card className="opacity-60">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-sm">
            <Shield className="h-4 w-4" />
            <span>Compliance Assessment Agent</span>
            <Badge variant="outline" className="text-xs">Inactive</Badge>
          </CardTitle>
          <CardDescription className="text-xs">
            Will assess GDPR compliance and identify gaps
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="border-green-200 bg-green-50/50">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-sm">
          <Shield className="h-4 w-4 text-green-600" />
          <span>Compliance Assessment Agent</span>
          <Badge className="bg-green-100 text-green-800 text-xs">Active</Badge>
        </CardTitle>
        <CardDescription className="text-xs">
          AI-powered GDPR compliance assessment and gap analysis
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <Button 
            size="sm" 
            onClick={runComplianceAssessment}
            disabled={isAssessing}
            className="w-full"
          >
            {isAssessing ? (
              <>
                <Sparkles className="mr-2 h-3 w-3 animate-spin" />
                Assessing Compliance...
              </>
            ) : (
              <>
                <Shield className="mr-2 h-3 w-3" />
                Run Compliance Assessment
              </>
            )}
          </Button>
        </div>

        {complianceScore > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-green-900">Overall Compliance Score</span>
              <Badge 
                variant={complianceScore >= 80 ? 'default' : complianceScore >= 60 ? 'secondary' : 'destructive'}
                className="text-xs"
              >
                {complianceScore}%
              </Badge>
            </div>
            <Progress value={complianceScore} className="h-2" />
          </div>
        )}

        {assessmentResults.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-3 w-3 text-green-600" />
              <span className="text-xs font-medium text-green-900">Assessment Results</span>
            </div>
            
            {assessmentResults.map((result, index) => (
              <div key={index} className={`p-3 rounded-lg border ${getStatusColor(result.status)}`}>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(result.status)}
                    <span className="text-xs font-medium">
                      {result.area}
                    </span>
                    <ConfidenceBadge confidence={result.confidence} size="sm" />
                  </div>
                </div>
                
                <p className="text-xs text-gray-900 mb-1">
                  {result.message}
                </p>
                
                {result.recommendation && (
                  <div className="flex items-start space-x-2 mt-2 p-2 bg-white/50 rounded text-xs">
                    <BookOpen className="h-3 w-3 text-blue-600 mt-0.5 flex-shrink-0" />
                    <p className="text-blue-900">
                      <span className="font-medium">Recommendation: </span>
                      {result.recommendation}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="text-xs text-gray-600 p-2 bg-gray-50 rounded">
          <div className="flex items-center space-x-1 mb-1">
            <Gavel className="h-3 w-3" />
            <span className="font-medium">GDPR Compliance</span>
          </div>
          <p>AI evaluates your ROPA against GDPR requirements, identifies compliance gaps, and provides recommendations.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ComplianceAssessmentAgent;