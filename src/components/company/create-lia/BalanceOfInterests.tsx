import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface LIAFormData {
  dataSubjectExpectation: string;
  processingExpectation: string;
  addedValue: string;
  negativeImpact: string;
  unwarrantedHarm: string;
  prejudiceToController: string;
  prejudiceToThirdParty: string;
  dataSubjectInterest: string;
  intrusiveProcessing: string;
}

interface BalanceOfInterestsProps {
  data: LIAFormData;
  updateData: (section: Partial<LIAFormData>) => void;
}

const questions = [
  {
    id: 'dataSubjectExpectation',
    question: 'Would the data subject expect his/her personal data to be processed for this purpose?',
    description: 'Consider whether this processing aligns with reasonable expectations'
  },
  {
    id: 'processingExpectation',
    question: 'Would the data subject expect this processing activity to take place?',
    description: 'Consider the context and nature of your relationship with the data subject'
  },
  {
    id: 'addedValue',
    question: 'Does the processing activity add value to a product or service for the data subject?',
    description: 'Consider direct benefits to the individual whose data is processed'
  },
  {
    id: 'negativeImpact',
    question: 'Is the processing likely to negatively impact the data subject rights?',
    description: 'Consider potential restrictions or limitations on data subject rights'
  },
  {
    id: 'unwarrantedHarm',
    question: 'Is the processing likely to result in unwarranted harm to the data subject?',
    description: 'Consider physical, financial, reputational, or psychological harm'
  },
  {
    id: 'prejudiceToController',
    question: 'Would there be a prejudice to the data controller if the processing doesn\'t take place?',
    description: 'Consider the impact on your organization if this processing is not permitted'
  },
  {
    id: 'prejudiceToThirdParty',
    question: 'Would there be a prejudice to a third party if the processing doesn\'t take place?',
    description: 'Consider impacts on other parties who depend on this processing'
  },
  {
    id: 'dataSubjectInterest',
    question: 'Is the personal data processing activity in the interests of the data subject whose personal data is being processed?',
    description: 'Consider whether the processing serves the data subject\'s own interests'
  },
  {
    id: 'intrusiveProcessing',
    question: 'Can the processing be considered by the data subject as intrusive or inappropriate?',
    description: 'Consider the sensitivity and nature of the processing from the data subject\'s perspective'
  }
];

const BalanceOfInterests = ({ data, updateData }: BalanceOfInterestsProps) => {
  const handleAnswerChange = (questionId: string, value: string) => {
    updateData({ [questionId]: value });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Balance of Interests</CardTitle>
        <CardDescription>
          Assess the balance between organizational interests and potential negative effects on data subjects.
          Answer all 9 questions to complete the balancing test.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {questions.map((q, index) => (
          <div key={q.id} className="space-y-3 pb-6 border-b border-border last:border-b-0">
            <div className="space-y-1">
              <Label className="text-base font-medium">
                {index + 1}. {q.question} *
              </Label>
              <p className="text-sm text-muted-foreground">{q.description}</p>
            </div>
            
            <Select 
              value={data[q.id as keyof LIAFormData] as string} 
              onValueChange={(value) => handleAnswerChange(q.id, value)}
            >
              <SelectTrigger className="max-w-xs">
                <SelectValue placeholder="Select answer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
        ))}

        <div className="mt-8 p-4 bg-muted/50 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
            <div className="text-sm text-muted-foreground">
              <p className="font-medium mb-1">Assessment Guidance:</p>
              <p>
                These questions help determine the balance between your legitimate interests and the 
                impact on data subjects. The scoring system will automatically calculate whether 
                legitimate interest is appropriate based on your responses.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BalanceOfInterests;