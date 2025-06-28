
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';

interface CircumstancesStepProps {
  data: any;
  onUpdate: (updates: any) => void;
}

const CircumstancesStep: React.FC<CircumstancesStepProps> = ({ data, onUpdate }) => {
  const circumstanceQuestions = [
    {
      id: 'unknown_recipients',
      text: 'Were the data disclosed to unknown recipients?',
      explanation: 'Data was accessed by unauthorized third parties whose identity is unknown',
      weight: 0.5
    },
    {
      id: 'non_recoverable_modification',
      text: 'Was data modified without possibility of recovery?',
      explanation: 'Data was permanently altered or corrupted with no backup available',
      weight: 0.5
    },
    {
      id: 'intentional_malicious',
      text: 'Was the breach intentionally malicious?',
      explanation: 'The incident was caused by deliberate malicious activity',
      weight: 0.75
    },
    {
      id: 'reproducible_attack',
      text: 'Is the attack reproducible?',
      explanation: 'The same vulnerability could be exploited again',
      weight: 0.3
    },
    {
      id: 'unauthorized_access',
      text: 'Was there unauthorized access to systems?',
      explanation: 'Attackers gained access to systems they were not authorized to use',
      weight: 0.4
    },
    {
      id: 'data_exfiltration',
      text: 'Was data actually exfiltrated from the system?',
      explanation: 'Data was copied or moved out of the organization\'s control',
      weight: 0.6
    },
    {
      id: 'encryption_bypassed',
      text: 'Was encryption bypassed or broken?',
      explanation: 'Encrypted data was accessed in unencrypted form',
      weight: 0.5
    },
    {
      id: 'widespread_exposure',
      text: 'Was the data exposed to a wide audience?',
      explanation: 'Data was made publicly available or accessible to many people',
      weight: 0.8
    }
  ];

  const updateCircumstance = (questionId: string, answer: boolean, justification: string = '') => {
    const updatedCircumstances = {
      ...data.circumstances,
      [questionId]: { answer, justification }
    };
    onUpdate({ circumstances: updatedCircumstances });
  };

  const getAnsweredCount = () => {
    return Object.keys(data.circumstances).filter(key => 
      data.circumstances[key]?.answer !== undefined
    ).length;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            Circumstances of the Breach
            <HelpCircle className="h-4 w-4 ml-2 text-gray-400" />
          </CardTitle>
          <p className="text-sm text-gray-600">
            Answer the following questions about the specific circumstances of your incident. 
            These factors will influence the overall impact assessment.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded">
            <span className="text-sm font-medium text-blue-800">Progress</span>
            <span className="text-sm text-blue-600">
              {getAnsweredCount()} of {circumstanceQuestions.length} questions answered
            </span>
          </div>

          {circumstanceQuestions.map((question) => (
            <div key={question.id} className="space-y-4 p-4 border rounded-lg">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center space-x-2">
                    <Label className="text-sm font-medium">{question.text}</Label>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      Weight: +{question.weight}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{question.explanation}</p>
                </div>
                <Switch
                  checked={data.circumstances[question.id]?.answer || false}
                  onCheckedChange={(checked) => 
                    updateCircumstance(question.id, checked, data.circumstances[question.id]?.justification || '')
                  }
                />
              </div>

              {data.circumstances[question.id]?.answer && (
                <div className="space-y-2 pt-2 border-t">
                  <Label className="text-xs text-gray-600">
                    Justification (optional)
                  </Label>
                  <Textarea
                    value={data.circumstances[question.id]?.justification || ''}
                    onChange={(e) => 
                      updateCircumstance(question.id, true, e.target.value)
                    }
                    placeholder="Provide additional context or details..."
                    rows={2}
                    className="text-sm"
                  />
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="bg-orange-50 border-orange-200">
        <CardHeader>
          <CardTitle className="text-sm text-orange-800">Impact Calculation Note</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-orange-700">
            Each "Yes" answer contributes to the overall Circumstances of Breach (CB) score. 
            The final impact calculation will be: <strong>Impact = DPC × EI + CB</strong>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CircumstancesStep;
