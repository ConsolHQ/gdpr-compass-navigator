import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, CheckCircle } from 'lucide-react';

interface DPIACheckTabProps {
  formData: any;
  setFormData: (data: any) => void;
}

const DPIACheckTab = ({ formData, setFormData }: DPIACheckTabProps) => {
  const questions = [
    {
      id: 'evaluation',
      text: 'Does the project include evaluation or scoring, including profiling and forecasting?'
    },
    {
      id: 'automatedDecision',
      text: 'Does the project include automated decision-making with legal effect or equivalent material effect for the data subject?'
    },
    {
      id: 'systematicMonitoring',
      text: 'Does the project include systematic monitoring?'
    },
    {
      id: 'sensitiveData',
      text: 'Are sensitive data being processed?'
    },
    {
      id: 'largeScale',
      text: 'Does the project include large-scale data processing?'
    },
    {
      id: 'dataMatching',
      text: 'Does the project include matching or amalgamation of data sets?'
    },
    {
      id: 'vulnerableSubjects',
      text: 'Does the project include processing of data relating to vulnerable data subjects?'
    },
    {
      id: 'innovativeUse',
      text: 'Does the project include innovative use or application of new technological or organisational solutions?'
    },
    {
      id: 'preventExercise',
      text: 'Is it not possible, as a result of the processing itself, for a data subject to exercise a right or rely on a service or a contract?'
    }
  ];

  const handleAnswerChange = (questionId: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      dpiaCheck: {
        ...prev.dpiaCheck,
        [questionId]: {
          ...prev.dpiaCheck?.[questionId],
          answer: value
        }
      }
    }));
  };

  const handleJustificationChange = (questionId: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      dpiaCheck: {
        ...prev.dpiaCheck,
        [questionId]: {
          ...prev.dpiaCheck?.[questionId],
          justification: value
        }
      }
    }));
  };

  // Calculate DPIA recommendation
  const yesAnswers = questions.filter(q => 
    formData.dpiaCheck?.[q.id]?.answer === 'Yes'
  ).length;

  const getDPIARecommendation = () => {
    if (yesAnswers >= 2) {
      return {
        recommended: true,
        message: 'DPIA is recommended. Create DPIA',
        icon: AlertTriangle,
        variant: 'destructive' as const
      };
    } else {
      return {
        recommended: false,
        message: 'DPIA optional',
        icon: CheckCircle,
        variant: 'default' as const
      };
    }
  };

  const recommendation = getDPIARecommendation();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Protection Impact Check</CardTitle>
        <CardDescription>
          Assess if a Data Protection Impact Assessment (DPIA) is required for this processing activity
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {questions.map((question) => (
          <div key={question.id} className="space-y-4 p-4 border rounded-lg">
            <div className="space-y-2">
              <Label className="text-sm font-medium">{question.text}</Label>
              <Select
                value={formData.dpiaCheck?.[question.id]?.answer || ''}
                onValueChange={(value) => handleAnswerChange(question.id, value)}
              >
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {formData.dpiaCheck?.[question.id]?.answer && (
              <div className="space-y-2">
                <Label className="text-sm">Add justification</Label>
                <Textarea
                  value={formData.dpiaCheck?.[question.id]?.justification || ''}
                  onChange={(e) => handleJustificationChange(question.id, e.target.value)}
                  placeholder="Provide justification for your answer"
                  rows={2}
                />
              </div>
            )}
          </div>
        ))}

        {/* Show recommendation if at least one question is answered */}
        {Object.keys(formData.dpiaCheck || {}).length > 0 && (
          <Alert variant={recommendation.variant}>
            <recommendation.icon className="h-4 w-4" />
            <AlertDescription className="font-medium">
              {recommendation.message}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default DPIACheckTab;