
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, HelpCircle } from 'lucide-react';

interface LeakedDataStepProps {
  data: any;
  onUpdate: (updates: any) => void;
}

const LeakedDataStep: React.FC<LeakedDataStepProps> = ({ data, onUpdate }) => {
  const [newDataSubject, setNewDataSubject] = useState({
    type: '',
    numberAffected: 0,
    imSystem: '',
    dataAttributes: []
  });

  const dataAttributes = [
    'Names', 'Email addresses', 'Phone numbers', 'Physical addresses',
    'Date of birth', 'National ID numbers', 'Passport numbers',
    'Credit card numbers', 'Bank account details', 'Medical records',
    'Employment data', 'Biometric data', 'Location data', 'Behavioral data'
  ];

  const imSystems = [
    'CRM System', 'HR System', 'Email Server', 'Database Server',
    'Cloud Storage', 'File Server', 'Backup System', 'Mobile App'
  ];

  const dpcQuestions = {
    'Simple Personal Data': [
      { id: 'simple_1', text: 'Does the data include contact information?', weight: 0.1 },
      { id: 'simple_2', text: 'Does the data include identification numbers?', weight: 0.2 },
      { id: 'simple_3', text: 'Does the data include employment information?', weight: 0.15 }
    ],
    'Behavior-related Data': [
      { id: 'behavior_1', text: 'Does the data include browsing history?', weight: 0.3 },
      { id: 'behavior_2', text: 'Does the data include location tracking?', weight: 0.4 },
      { id: 'behavior_3', text: 'Does the data include purchase history?', weight: 0.25 }
    ],
    'Financial Data': [
      { id: 'financial_1', text: 'Does the data include payment information?', weight: 0.6 },
      { id: 'financial_2', text: 'Does the data include bank account details?', weight: 0.8 },
      { id: 'financial_3', text: 'Does the data include credit scores?', weight: 0.7 }
    ],
    'Special Categories': [
      { id: 'special_1', text: 'Does the data include health information?', weight: 1.0 },
      { id: 'special_2', text: 'Does the data include biometric data?', weight: 0.9 },
      { id: 'special_3', text: 'Does the data include personal beliefs?', weight: 0.8 }
    ]
  };

  const addDataSubject = () => {
    if (newDataSubject.type && newDataSubject.numberAffected > 0) {
      const updatedSubjects = [...data.dataSubjects, { ...newDataSubject }];
      onUpdate({ dataSubjects: updatedSubjects });
      setNewDataSubject({ type: '', numberAffected: 0, imSystem: '', dataAttributes: [] });
    }
  };

  const removeDataSubject = (index: number) => {
    const updatedSubjects = data.dataSubjects.filter((_: any, i: number) => i !== index);
    onUpdate({ dataSubjects: updatedSubjects });
  };

  const updateDPCAnswer = (questionId: string, answer: boolean, justification: string = '') => {
    const updatedAnswers = {
      ...data.dpcAnswers,
      [questionId]: { answer, justification }
    };
    onUpdate({ dpcAnswers: updatedAnswers });
  };

  const toggleDataAttribute = (attribute: string) => {
    const updatedAttributes = newDataSubject.dataAttributes.includes(attribute)
      ? newDataSubject.dataAttributes.filter(a => a !== attribute)
      : [...newDataSubject.dataAttributes, attribute];
    setNewDataSubject({ ...newDataSubject, dataAttributes: updatedAttributes });
  };

  return (
    <div className="space-y-6">
      {/* Data Subjects Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Affected Data Subjects</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.dataSubjects.length > 0 && (
            <div className="space-y-3">
              {data.dataSubjects.map((subject: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded">
                  <div className="flex-1 grid grid-cols-4 gap-4">
                    <div>
                      <Label className="text-xs text-gray-500">Type</Label>
                      <p className="text-sm font-medium">{subject.type}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500">Number Affected</Label>
                      <p className="text-sm font-medium">{subject.numberAffected}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500">System</Label>
                      <p className="text-sm font-medium">{subject.imSystem}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500">Attributes</Label>
                      <div className="flex flex-wrap gap-1">
                        {subject.dataAttributes.slice(0, 2).map((attr: string) => (
                          <Badge key={attr} variant="outline" className="text-xs">
                            {attr}
                          </Badge>
                        ))}
                        {subject.dataAttributes.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{subject.dataAttributes.length - 2}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeDataSubject(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          {/* Add New Data Subject */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Data Subject Type</Label>
                <Input
                  value={newDataSubject.type}
                  onChange={(e) => setNewDataSubject({ ...newDataSubject, type: e.target.value })}
                  placeholder="e.g., Customers, Employees"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Number Affected</Label>
                <Input
                  type="number"
                  value={newDataSubject.numberAffected}
                  onChange={(e) => setNewDataSubject({ ...newDataSubject, numberAffected: parseInt(e.target.value) || 0 })}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">IM System</Label>
                <Select
                  value={newDataSubject.imSystem}
                  onValueChange={(value) => setNewDataSubject({ ...newDataSubject, imSystem: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select system" />
                  </SelectTrigger>
                  <SelectContent>
                    {imSystems.map((system) => (
                      <SelectItem key={system} value={system}>
                        {system}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Data Attributes</Label>
              <div className="flex flex-wrap gap-2">
                {dataAttributes.map((attribute) => (
                  <Badge
                    key={attribute}
                    variant={newDataSubject.dataAttributes.includes(attribute) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleDataAttribute(attribute)}
                  >
                    {attribute}
                  </Badge>
                ))}
              </div>
            </div>

            <Button onClick={addDataSubject} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Data Subject
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* DPC Questions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            ENISA DPC Assessment
            <HelpCircle className="h-4 w-4 ml-2 text-gray-400" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {Object.entries(dpcQuestions).map(([category, questions]) => (
            <div key={category} className="space-y-4">
              <h3 className="font-semibold text-gray-800 border-b pb-2">{category}</h3>
              {questions.map((question) => (
                <div key={question.id} className="space-y-3 p-3 border rounded">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <Label className="text-sm font-medium">{question.text}</Label>
                      <p className="text-xs text-gray-500 mt-1">Weight: {question.weight}</p>
                    </div>
                    <Switch
                      checked={data.dpcAnswers[question.id]?.answer || false}
                      onCheckedChange={(checked) => updateDPCAnswer(question.id, checked, data.dpcAnswers[question.id]?.justification || '')}
                    />
                  </div>
                  {data.dpcAnswers[question.id]?.answer && (
                    <div className="space-y-2">
                      <Label className="text-xs text-gray-600">Justification (optional)</Label>
                      <Textarea
                        value={data.dpcAnswers[question.id]?.justification || ''}
                        onChange={(e) => updateDPCAnswer(question.id, true, e.target.value)}
                        placeholder="Provide justification..."
                        rows={2}
                        className="text-sm"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default LeakedDataStep;
