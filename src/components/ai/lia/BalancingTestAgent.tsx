import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ConfidenceBadge } from '../ConfidenceBadge';
import { 
  Scale, 
  TrendingUp,
  TrendingDown,
  Users,
  Building,
  Brain,
  Sparkles
} from 'lucide-react';

interface BalancingTestAgentProps {
  isActive: boolean;
  formData: any;
  onBalancingResult: (result: any) => void;
}

const BalancingTestAgent: React.FC<BalancingTestAgentProps> = ({ 
  isActive, 
  formData, 
  onBalancingResult 
}) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [balancingResult, setBalancingResult] = useState<any>(null);

  const runBalancingTest = async () => {
    setIsAnalyzing(true);
    
    setTimeout(() => {
      const result = {
        legitimateInterests: {
          commercial: { score: 8, weight: 'High', reasoning: 'Direct business benefit through improved customer relationships' },
          operational: { score: 7, weight: 'Medium-High', reasoning: 'Operational efficiency in marketing communications' },
          relationship: { score: 9, weight: 'High', reasoning: 'Maintaining existing customer relationships' },
          overall: 8.0
        },
        dataSubjectImpacts: {
          intrusion: { score: 3, level: 'Low', reasoning: 'Limited to existing customers with business relationship' },
          expectation: { score: 2, level: 'Very Low', reasoning: 'Customers reasonably expect marketing from companies they buy from' },
          sensitivity: { score: 2, level: 'Very Low', reasoning: 'Basic contact and preference data, not sensitive categories' },
          consequences: { score: 2, level: 'Very Low', reasoning: 'Minimal negative consequences, easy opt-out available' },
          overall: 2.25
        },
        balanceOutcome: {
          result: 'Legitimate Interest Justified',
          confidence: 'High',
          score: 5.75, // LI score - DS impact score
          reasoning: 'Strong legitimate interests significantly outweigh minimal data subject impacts'
        },
        mitigatingFactors: [
          'Existing customer relationship provides reasonable expectation',
          'Clear opt-out mechanism reduces intrusion impact',
          'Transparent privacy policy explains processing',
          'Frequency controls prevent excessive contact',
          'Relevant content based on actual purchase history'
        ],
        recommendations: [
          'Implement granular preference controls',
          'Provide clear opt-out in every communication',
          'Monitor complaint rates and engagement metrics',
          'Regular review of processing necessity'
        ]
      };
      
      setBalancingResult(result);
      setIsAnalyzing(false);
      onBalancingResult(result);
    }, 2000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600';
    if (score >= 6) return 'text-yellow-600';
    if (score >= 4) return 'text-orange-600';
    return 'text-red-600';
  };

  const getImpactColor = (score: number) => {
    if (score >= 8) return 'text-red-600';
    if (score >= 6) return 'text-orange-600';
    if (score >= 4) return 'text-yellow-600';
    return 'text-green-600';
  };

  if (!isActive) {
    return (
      <Card className="opacity-60">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-sm">
            <Scale className="h-4 w-4" />
            <span>Balancing Test Agent</span>
            <Badge variant="outline" className="text-xs">Inactive</Badge>
          </CardTitle>
          <CardDescription className="text-xs">
            Will perform legitimate interest vs data subject rights balancing
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="border-cyan-200 bg-cyan-50/50">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-sm">
          <Scale className="h-4 w-4 text-cyan-600" />
          <span>Balancing Test Agent</span>
          <Badge className="bg-cyan-100 text-cyan-800 text-xs">Active</Badge>
        </CardTitle>
        <CardDescription className="text-xs">
          AI balancing test analysis for legitimate interest justification
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!balancingResult ? (
          <div className="space-y-3">
            <Button 
              size="sm" 
              onClick={runBalancingTest}
              disabled={isAnalyzing}
              className="w-full"
            >
              {isAnalyzing ? (
                <>
                  <Sparkles className="mr-2 h-3 w-3 animate-spin" />
                  Running Balancing Test...
                </>
              ) : (
                <>
                  <Scale className="mr-2 h-3 w-3" />
                  Perform Balancing Test
                </>
              )}
            </Button>
            
            <div className="text-xs text-gray-600 p-2 bg-gray-50 rounded">
              <p>AI will analyze legitimate interests against data subject impacts to determine if processing is justified.</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Scale className="h-4 w-4 text-cyan-600" />
                <span className="text-sm font-medium text-cyan-900">Balancing Test Results</span>
              </div>
              <ConfidenceBadge confidence="ai-generated" size="sm" />
            </div>

            {/* Balancing Summary */}
            <div className="bg-white p-3 rounded-lg border border-cyan-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Balance Outcome</span>
                <Badge 
                  variant={balancingResult.balanceOutcome.result.includes('Justified') ? 'default' : 'destructive'}
                  className="text-xs"
                >
                  {balancingResult.balanceOutcome.result}
                </Badge>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <TrendingUp className="h-3 w-3 text-green-600" />
                    <span className="text-xs">Legitimate Interests</span>
                    <span className={`text-xs font-bold ${getScoreColor(balancingResult.legitimateInterests.overall)}`}>
                      {balancingResult.legitimateInterests.overall}/10
                    </span>
                  </div>
                  <Progress value={balancingResult.legitimateInterests.overall * 10} className="h-2" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <TrendingDown className="h-3 w-3 text-blue-600" />
                    <span className="text-xs">Data Subject Impact</span>
                    <span className={`text-xs font-bold ${getImpactColor(balancingResult.dataSubjectImpacts.overall)}`}>
                      {balancingResult.dataSubjectImpacts.overall}/10
                    </span>
                  </div>
                  <Progress value={balancingResult.dataSubjectImpacts.overall * 10} className="h-2" />
                </div>
              </div>
            </div>

            {/* Legitimate Interests Breakdown */}
            <div className="space-y-2">
              <span className="text-xs font-medium text-cyan-900">Legitimate Interests Analysis</span>
              {Object.entries(balancingResult.legitimateInterests).filter(([key]) => key !== 'overall').map(([key, value]: [string, any]) => (
                <div key={key} className="bg-green-50 border border-green-200 rounded p-2">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-2">
                      <Building className="h-3 w-3 text-green-600" />
                      <span className="text-xs font-medium capitalize">{key}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">{value.weight}</Badge>
                      <span className={`text-xs font-bold ${getScoreColor(value.score)}`}>{value.score}/10</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-700">{value.reasoning}</p>
                </div>
              ))}
            </div>

            {/* Data Subject Impacts */}
            <div className="space-y-2">
              <span className="text-xs font-medium text-cyan-900">Data Subject Impact Analysis</span>
              {Object.entries(balancingResult.dataSubjectImpacts).filter(([key]) => key !== 'overall').map(([key, value]: [string, any]) => (
                <div key={key} className="bg-blue-50 border border-blue-200 rounded p-2">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-2">
                      <Users className="h-3 w-3 text-blue-600" />
                      <span className="text-xs font-medium capitalize">{key}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">{value.level}</Badge>
                      <span className={`text-xs font-bold ${getImpactColor(value.score)}`}>{value.score}/10</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-700">{value.reasoning}</p>
                </div>
              ))}
            </div>

            {/* Mitigating Factors */}
            <div className="space-y-2">
              <span className="text-xs font-medium text-cyan-900">Mitigating Factors</span>
              <div className="bg-purple-50 border border-purple-200 rounded p-2">
                {balancingResult.mitigatingFactors.map((factor: string, index: number) => (
                  <div key={index} className="flex items-start space-x-2 text-xs mb-1">
                    <span className="text-purple-600 mt-0.5">•</span>
                    <span className="text-purple-900">{factor}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="text-xs text-gray-600 p-2 bg-gray-50 rounded">
          <div className="flex items-center space-x-1 mb-1">
            <Brain className="h-3 w-3" />
            <span className="font-medium">Smart Balancing Analysis</span>
          </div>
          <p>AI performs comprehensive balancing test weighing legitimate interests against data subject rights and freedoms.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BalancingTestAgent;