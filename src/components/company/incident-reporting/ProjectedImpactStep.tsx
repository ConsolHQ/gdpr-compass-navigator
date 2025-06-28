
import React, { useEffect } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, CheckCircle, Info } from 'lucide-react';

interface ProjectedImpactStepProps {
  data: any;
  onUpdate: (updates: any) => void;
}

const ProjectedImpactStep: React.FC<ProjectedImpactStepProps> = ({ data, onUpdate }) => {
  // Calculate auto score based on previous steps
  const calculateAutoScore = () => {
    // DPC Score calculation
    const dpcScore = Object.values(data.dpcAnswers || {}).reduce((sum: number, answer: any) => {
      return sum + (answer?.answer ? 0.2 : 0); // Simplified scoring
    }, 0);

    // EI Score (Ease of Identification)
    const eiScore = data.identifiabilityLevel || 0.5;

    // CB Score (Circumstances of Breach)
    const cbScore = Object.values(data.circumstances || {}).reduce((sum: number, answer: any) => {
      return sum + (answer?.answer ? 0.1 : 0); // Simplified scoring
    }, 0);

    // Final calculation: Impact = DPC × EI + CB
    const impact = (dpcScore * eiScore) + cbScore;
    return Math.min(impact, 3.0); // Cap at 3.0
  };

  // Determine severity level
  const getSeverityLevel = (score: number): 'Low' | 'Medium' | 'High' => {
    if (score >= 2.0) return 'High';
    if (score >= 1.0) return 'Medium';
    return 'Low';
  };

  // Get severity color
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return 'text-red-600 bg-red-100 border-red-200';
      case 'Medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'Low': return 'text-green-600 bg-green-100 border-green-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  // Get severity icon
  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'High': return <AlertTriangle className="h-4 w-4" />;
      case 'Medium': return <Info className="h-4 w-4" />;
      case 'Low': return <CheckCircle className="h-4 w-4" />;
      default: return <Info className="h-4 w-4" />;
    }
  };

  // Update auto score when component mounts or dependencies change
  useEffect(() => {
    const autoScore = calculateAutoScore();
    const severity = getSeverityLevel(autoScore);
    onUpdate({ 
      autoScore, 
      severity,
      manualScore: data.scoreAgreed ? autoScore : data.manualScore
    });
  }, [data.dpcAnswers, data.identifiabilityLevel, data.circumstances]);

  const handleScoreAgreement = (agreed: boolean) => {
    onUpdate({ 
      scoreAgreed: agreed,
      manualScore: agreed ? data.autoScore : data.manualScore
    });
  };

  const finalScore = data.scoreAgreed ? data.autoScore : data.manualScore;
  const finalSeverity = getSeverityLevel(finalScore);

  return (
    <div className="space-y-6">
      {/* Auto-calculated Score */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">ENISA Risk Assessment</CardTitle>
          <p className="text-sm text-gray-600">
            Based on your responses, here is the calculated impact score using the ENISA methodology
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{data.autoScore.toFixed(2)}</div>
              <div className="text-sm text-gray-600">Calculated Score</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className={`text-2xl font-bold flex items-center justify-center space-x-2 ${getSeverityColor(data.severity).split(' ')[0]}`}>
                {getSeverityIcon(data.severity)}
                <span>{data.severity}</span>
              </div>
              <div className="text-sm text-gray-600">Severity Level</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{Math.round((data.autoScore / 3.0) * 100)}%</div>
              <div className="text-sm text-gray-600">Risk Percentage</div>
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium">Score Breakdown</Label>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">DPC (Data Processing Context)</span>
                <span className="text-sm font-medium">
                  {Object.values(data.dpcAnswers).filter((a: any) => a.answer).length} factors
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">EI (Ease of Identification)</span>
                <span className="text-sm font-medium">{data.identifiabilityLevel}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">CB (Circumstances of Breach)</span>
                <span className="text-sm font-medium">
                  {Object.values(data.circumstances).filter((a: any) => a.answer).length} factors
                </span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start space-x-2">
              <Info className="h-4 w-4 text-blue-600 mt-0.5" />
              <div className="text-sm text-blue-700">
                <strong>Calculation:</strong> Impact = (DPC × EI) + CB<br />
                This assessment is advisory only and based on ENISA guidelines.
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Score Agreement */}
      <Card className={`border-2 ${data.scoreAgreed ? 'border-green-200 bg-green-50' : 'border-orange-200 bg-orange-50'}`}>
        <CardHeader>
          <CardTitle className="text-lg">Score Validation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-sm font-medium">
                Do you agree with the calculated score?
              </Label>
              <p className="text-sm text-gray-600">
                You can override the automatic assessment if you have additional context
              </p>
            </div>
            <Switch
              checked={data.scoreAgreed}
              onCheckedChange={handleScoreAgreement}
            />
          </div>

          {!data.scoreAgreed && (
            <div className="space-y-4 pt-4 border-t">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Manual Score Override</Label>
                <Input
                  type="number"
                  min="0"
                  max="3"
                  step="0.1"
                  value={data.manualScore}
                  onChange={(e) => onUpdate({ manualScore: parseFloat(e.target.value) || 0 })}
                  placeholder="Enter score (0.0 - 3.0)"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Justification for Override</Label>
                <Textarea
                  value={data.scoreJustification}
                  onChange={(e) => onUpdate({ scoreJustification: e.target.value })}
                  placeholder="Explain why you disagree with the calculated score..."
                  rows={3}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Final Assessment */}
      <Card className={`border-2 ${getSeverityColor(finalSeverity)}`}>
        <CardHeader>
          <CardTitle className="text-lg flex items-center space-x-2">
            {getSeverityIcon(finalSeverity)}
            <span>Final Risk Assessment</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">{finalScore.toFixed(2)}</div>
              <div className="text-sm text-gray-600">Final Impact Score</div>
            </div>
            <Badge className={`${getSeverityColor(finalSeverity)} text-lg px-4 py-2`}>
              {finalSeverity} Risk
            </Badge>
          </div>
          
          <Progress value={(finalScore / 3.0) * 100} className="h-3" />
          
          <div className="text-sm text-gray-700">
            <strong>Assessment:</strong> This incident is classified as <strong>{finalSeverity.toLowerCase()} risk</strong> based on 
            {data.scoreAgreed ? ' automatic ENISA calculation' : ' your manual override'}.
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectedImpactStep;
