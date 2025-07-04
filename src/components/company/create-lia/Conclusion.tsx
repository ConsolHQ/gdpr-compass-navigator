import React, { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle, Info } from 'lucide-react';

interface LIAFormData {
  // Section 1
  importance: string;
  alternativeLegalBasis: string;
  necessaryForOrganization: string;
  necessaryForThirdParty: string;
  legalException: string;

  // Section 2
  interactionFrequency: string;
  relationship: string;
  dataObtainment: string;
  informedTiming: string;
  rightToObject: string;
  decisionPower: string;

  // Section 3
  dataSubjectExpectation: string;
  processingExpectation: string;
  addedValue: string;
  negativeImpact: string;
  unwarrantedHarm: string;
  prejudiceToController: string;
  prejudiceToThirdParty: string;
  dataSubjectInterest: string;
  intrusiveProcessing: string;

  // Section 4
  calculatedScore?: {
    interestScore: number;
    impactScore: number;
  };
  finalDecision?: string;
  decisionReason?: string;
}

interface ConclusionProps {
  data: LIAFormData;
  updateData: (section: Partial<LIAFormData>) => void;
}

const calculateScores = (data: LIAFormData) => {
  // Check if alternative legal basis is available (blocking condition)
  if (['consent', 'contract', 'legal-obligation', 'vital-interest', 'public-interest'].includes(data.alternativeLegalBasis)) {
    return { interestScore: 0, impactScore: 100, blocked: true };
  }

  // Check if legal exception applies (auto-approval)
  if (data.legalException === 'yes') {
    return { interestScore: 100, impactScore: 0, autoApproved: true };
  }

  let interestScore = 0;
  let impactScore = 0;

  // Section 1: Identifying Legitimate Interest
  const s1q1 = data.alternativeLegalBasis === 'no' ? 0 : 0; // Already handled above
  const s1q2 = data.necessaryForOrganization === 'yes' ? 25 : 0;
  const s1q3Multiplier = {
    'no-impact': 1,
    'benefit': 1.5,
    'very-important': 2,
    'business-critical': 2.5
  }[data.importance] || 1;
  const s1q4 = data.necessaryForThirdParty === 'yes' ? 5 : 0;

  // Section 2: Scope Definition weights
  const s2q1_interest = {
    'employee-freelancer': 10,
    'supplier': 5,
    'existing-client-natural': 0,
    'existing-client-legal': 0,
    'former-client': 0,
    'potential-client': 0,
    'others': 0
  }[data.relationship] || 0;

  const s2q1_impact = {
    'existing-client-natural': 5,
    'existing-client-legal': 3,
    'former-client': 10,
    'potential-client': 10,
    'employee-freelancer': 0,
    'supplier': 0,
    'others': 0
  }[data.relationship] || 0;

  const s2q2_interest = {
    'daily': 4,
    'weekly': 3,
    'monthly': 2,
    'several-times-year': 1,
    'once-year': 0,
    'less-than-once-year': -5
  }[data.interactionFrequency] || 0;

  const s2q2_impact = {
    'daily': 20,
    'weekly': 10,
    'monthly': 6,
    'several-times-year': 0,
    'once-year': -4,
    'less-than-once-year': -8
  }[data.interactionFrequency] || 0;

  const s2q3_interest = {
    'directly': 5,
    'indirectly': 0,
    'mix': 2
  }[data.dataObtainment] || 0;

  const s2q3_impact = {
    'directly': -5,
    'indirectly': 3,
    'mix': -1
  }[data.dataObtainment] || 0;

  const s2q4_impact = {
    'organisation': 5,
    'data-subject': 0,
    'balanced': 0
  }[data.decisionPower] || 0;

  const s2q5_impact = {
    'long-before': -5,
    'right-before': 0,
    'during': 3,
    'after': 5,
    'privacy-policy': 8,
    'no': 10
  }[data.informedTiming] || 0;

  const s2q6_interest = data.rightToObject === 'yes' ? 5 : 0;
  const s2q6_impact = data.rightToObject === 'no' ? 5 : 0;

  // Section 3: Balance of Interests
  const s3q1 = data.dataSubjectExpectation === 'yes' ? 0.5 : 1;
  const s3q2 = data.processingExpectation === 'yes' ? 0.5 : 1;
  const s3q3 = data.addedValue === 'yes' ? -10 : 5;
  const s3q4 = data.negativeImpact === 'yes' ? 5 : -5;
  const s3q5 = data.unwarrantedHarm === 'yes' ? 15 : -5;
  const s3q6 = data.prejudiceToController === 'yes' ? 15 : -5;
  const s3q7 = data.prejudiceToThirdParty === 'yes' ? 5 : -3;
  const s3q8 = data.dataSubjectInterest === 'yes' ? 25 : 75;

  // Calculate Interest Score
  interestScore = ((s1q1 + s1q4) * s1q3Multiplier) + s2q1_interest + s2q2_interest + s2q3_interest + s2q6_interest + s3q6 + s3q7;
  
  // Calculate Impact Score
  const avgExpectation = (s3q1 + s3q2) / 2;
  impactScore = (s3q8 * avgExpectation) + s2q1_impact + s2q2_impact + s2q3_impact + s2q4_impact + s2q5_impact + s2q6_impact + s3q3 + s3q4 + s3q5;

  // Normalize to 100
  const normalizedInterestScore = Math.max(0, Math.min(100, (interestScore / 119) * 100));
  const normalizedImpactScore = Math.max(0, Math.min(100, (impactScore / 153) * 100));

  return {
    interestScore: Math.round(normalizedInterestScore),
    impactScore: Math.round(normalizedImpactScore)
  };
};

const getRecommendation = (interestScore: number, impactScore: number, blocked?: boolean, autoApproved?: boolean) => {
  if (blocked) {
    return {
      decision: 'not-recommended',
      reason: 'Alternative legal basis is available and should be used instead of legitimate interest.',
      color: 'destructive'
    };
  }

  if (autoApproved) {
    return {
      decision: 'recommended',
      reason: 'Legal exception applies - legitimate interest is permitted by default.',
      color: 'success'
    };
  }

  // Balance assessment
  if (interestScore >= 60 && impactScore <= 40) {
    return {
      decision: 'recommended',
      reason: 'Strong legitimate interest with low impact on data subjects.',
      color: 'success'
    };
  } else if (interestScore >= 40 && impactScore <= 60) {
    return {
      decision: 'conditional',
      reason: 'Moderate balance - consider additional safeguards and review regularly.',
      color: 'warning'
    };
  } else {
    return {
      decision: 'not-recommended',
      reason: 'High impact on data subjects or insufficient legitimate interest.',
      color: 'destructive'
    };
  }
};

const Conclusion = ({ data, updateData }: ConclusionProps) => {
  const scores = calculateScores(data);
  const recommendation = getRecommendation(
    scores.interestScore, 
    scores.impactScore, 
    scores.blocked, 
    scores.autoApproved
  );

  useEffect(() => {
    updateData({ calculatedScore: scores });
  }, [JSON.stringify(scores)]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Conclusion</CardTitle>
        <CardDescription>
          Review the calculated assessment results and make your final decision.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Calculated Results */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Calculated Assessment</h3>
          
          {scores.blocked && (
            <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                <span className="font-medium text-destructive">Legitimate Interest Not Permitted</span>
              </div>
              <p className="text-sm">An alternative legal basis is available and should be used instead.</p>
            </div>
          )}

          {scores.autoApproved && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-800">Legitimate Interest Permitted</span>
              </div>
              <p className="text-sm text-green-700">Legal exception applies - legitimate interest is allowed by default.</p>
            </div>
          )}

          {!scores.blocked && !scores.autoApproved && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label>Interest Score</Label>
                  <Badge variant="outline">{scores.interestScore}%</Badge>
                </div>
                <Progress value={scores.interestScore} className="h-3" />
                <p className="text-xs text-muted-foreground">
                  Measures the strength of your legitimate interest
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label>Impact Score</Label>
                  <Badge variant="outline">{scores.impactScore}%</Badge>
                </div>
                <Progress value={scores.impactScore} className="h-3" />
                <p className="text-xs text-muted-foreground">
                  Measures the negative impact on data subjects
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Recommendation */}
        <div className={`p-4 rounded-lg border ${
          recommendation.color === 'success' ? 'bg-green-50 border-green-200' :
          recommendation.color === 'warning' ? 'bg-yellow-50 border-yellow-200' :
          'bg-red-50 border-red-200'
        }`}>
          <div className="flex items-center gap-2 mb-2">
            {recommendation.color === 'success' ? (
              <CheckCircle className="h-5 w-5 text-green-600" />
            ) : recommendation.color === 'warning' ? (
              <Info className="h-5 w-5 text-yellow-600" />
            ) : (
              <AlertTriangle className="h-5 w-5 text-red-600" />
            )}
            <span className={`font-medium ${
              recommendation.color === 'success' ? 'text-green-800' :
              recommendation.color === 'warning' ? 'text-yellow-800' :
              'text-red-800'
            }`}>
              System Recommendation: {recommendation.decision === 'recommended' ? 'Use Legitimate Interest' : 
                                    recommendation.decision === 'conditional' ? 'Use with Caution' : 
                                    'Do Not Use Legitimate Interest'}
            </span>
          </div>
          <p className={`text-sm ${
            recommendation.color === 'success' ? 'text-green-700' :
            recommendation.color === 'warning' ? 'text-yellow-700' :
            'text-red-700'
          }`}>
            {recommendation.reason}
          </p>
        </div>

        {/* Final Decision */}
        <div className="space-y-4 pt-4 border-t">
          <h3 className="text-lg font-semibold">Final Decision</h3>
          
          <div className="space-y-2">
            <Label>Can legitimate interest be used for this processing activity? *</Label>
            <Select value={data.finalDecision} onValueChange={(value) => updateData({ finalDecision: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Make your final decision" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes - Legitimate interest can be used</SelectItem>
                <SelectItem value="no">No - Legitimate interest cannot be used</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="decisionReason">Explain your decision</Label>
            <Textarea
              id="decisionReason"
              placeholder="Provide your reasoning for this decision, especially if it differs from the system recommendation..."
              value={data.decisionReason || ''}
              onChange={(e) => updateData({ decisionReason: e.target.value })}
              rows={4}
            />
          </div>
        </div>

        {/* Disclaimer */}
        <div className="p-4 bg-muted/50 rounded-lg">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
            <div className="text-sm text-muted-foreground">
              <p className="font-medium mb-1">Disclaimer:</p>
              <p>
                The score provided is an indication based on context questions. This system cannot be held 
                accountable for any actions taken based on this calculation. You may override the conclusion 
                with an explanation based on additional context not covered by the calculation.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Conclusion;