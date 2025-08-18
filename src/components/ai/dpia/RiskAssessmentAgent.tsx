import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ConfidenceBadge } from '../ConfidenceBadge';
import { 
  Shield, 
  AlertTriangle, 
  TrendingUp,
  Users,
  Eye,
  Brain,
  Sparkles
} from 'lucide-react';

interface RiskAssessmentAgentProps {
  isActive: boolean;
  formData: any;
  onRiskAssessment: (assessment: any) => void;
}

const RiskAssessmentAgent: React.FC<RiskAssessmentAgentProps> = ({ 
  isActive, 
  formData, 
  onRiskAssessment 
}) => {
  const [isAssessing, setIsAssessing] = useState(false);
  const [riskAssessment, setRiskAssessment] = useState<any>(null);

  const runRiskAssessment = async () => {
    setIsAssessing(true);
    
    setTimeout(() => {
      const assessment = {
        overallRisk: 'High',
        riskScore: 8.2,
        categories: [
          {
            name: 'Data Subject Rights Impact',
            score: 8.5,
            level: 'High',
            factors: [
              'Automated decision making affects individual rights',
              'Complex profiling may limit transparency',
              'Large scale processing increases impact'
            ]
          },
          {
            name: 'Data Security Risks',
            score: 6.8,
            level: 'Medium',
            factors: [
              'Sensitive behavioral data requires protection',
              'Multiple data sources increase attack surface',
              'ML models may be vulnerable to inference attacks'
            ]
          },
          {
            name: 'Compliance Risks',
            score: 9.1,
            level: 'High',
            factors: [
              'Automated profiling requires explicit consent',
              'Right to explanation implementation needed',
              'Cross-border data transfers involved'
            ]
          }
        ],
        recommendations: [
          'Implement privacy-by-design architecture',
          'Establish clear consent mechanisms',
          'Deploy differential privacy techniques',
          'Create algorithmic transparency tools'
        ]
      };
      
      setRiskAssessment(assessment);
      setIsAssessing(false);
      onRiskAssessment(assessment);
    }, 2500);
  };

  const getRiskColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-amber-600 bg-amber-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  if (!isActive) {
    return (
      <Card className="opacity-60">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-sm">
            <AlertTriangle className="h-4 w-4" />
            <span>Risk Assessment Agent</span>
            <Badge variant="outline" className="text-xs">Inactive</Badge>
          </CardTitle>
          <CardDescription className="text-xs">
            Will analyze privacy risks and impact levels
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="border-amber-200 bg-amber-50/50">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-sm">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <span>Risk Assessment Agent</span>
          <Badge className="bg-amber-100 text-amber-800 text-xs">Active</Badge>
        </CardTitle>
        <CardDescription className="text-xs">
          AI-powered privacy risk analysis and impact assessment
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!riskAssessment ? (
          <div className="space-y-3">
            <Button 
              size="sm" 
              onClick={runRiskAssessment}
              disabled={isAssessing}
              className="w-full"
            >
              {isAssessing ? (
                <>
                  <Sparkles className="mr-2 h-3 w-3 animate-spin" />
                  Analyzing Privacy Risks...
                </>
              ) : (
                <>
                  <AlertTriangle className="mr-2 h-3 w-3" />
                  Run Risk Assessment
                </>
              )}
            </Button>
            
            <div className="text-xs text-gray-600 p-2 bg-gray-50 rounded">
              <p>AI will analyze processing activities to identify privacy risks, assess impact levels, and recommend mitigation strategies.</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-amber-600" />
                <span className="text-sm font-medium text-amber-900">Risk Assessment</span>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="destructive" className="text-xs">
                  {riskAssessment.overallRisk} Risk
                </Badge>
                <ConfidenceBadge confidence="ai-generated" size="sm" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium">Overall Risk Score</span>
                <span className="text-xs font-bold">{riskAssessment.riskScore}/10</span>
              </div>
              <Progress value={riskAssessment.riskScore * 10} className="h-2" />
            </div>

            <div className="space-y-3">
              <span className="text-xs font-medium text-amber-900">Risk Categories</span>
              
              {riskAssessment.categories.map((category: any, index: number) => (
                <div key={index} className="bg-white p-3 rounded-lg border border-amber-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        {category.name.includes('Rights') && <Users className="h-3 w-3 text-gray-600" />}
                        {category.name.includes('Security') && <Shield className="h-3 w-3 text-gray-600" />}
                        {category.name.includes('Compliance') && <Eye className="h-3 w-3 text-gray-600" />}
                        <span className="text-xs font-medium">{category.name}</span>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getRiskColor(category.level)}`}
                      >
                        {category.level}
                      </Badge>
                    </div>
                    <span className="text-xs font-bold">{category.score}/10</span>
                  </div>
                  
                  <div className="space-y-1">
                    {category.factors.map((factor: string, idx: number) => (
                      <div key={idx} className="flex items-start space-x-2 text-xs">
                        <span className="text-amber-600 mt-0.5">•</span>
                        <span className="text-gray-700">{factor}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <span className="text-xs font-medium text-amber-900">AI Recommendations</span>
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 space-y-1">
                {riskAssessment.recommendations.map((rec: string, index: number) => (
                  <div key={index} className="flex items-start space-x-2 text-xs">
                    <span className="text-green-600 mt-0.5">✓</span>
                    <span className="text-green-900">{rec}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="text-xs text-gray-600 p-2 bg-gray-50 rounded">
          <div className="flex items-center space-x-1 mb-1">
            <Brain className="h-3 w-3" />
            <span className="font-medium">Smart Risk Analysis</span>
          </div>
          <p>AI evaluates privacy risks across multiple dimensions and provides targeted mitigation recommendations.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskAssessmentAgent;