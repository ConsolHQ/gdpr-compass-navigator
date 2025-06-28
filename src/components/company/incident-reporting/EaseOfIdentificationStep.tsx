
import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';

interface EaseOfIdentificationStepProps {
  data: any;
  onUpdate: (updates: any) => void;
}

const EaseOfIdentificationStep: React.FC<EaseOfIdentificationStepProps> = ({ data, onUpdate }) => {
  const identifiabilityLevels = [
    { value: 0.25, label: 'Negligible', description: 'Data subjects cannot be identified without significant effort' },
    { value: 0.5, label: 'Limited', description: 'Data subjects can be identified with moderate effort' },
    { value: 0.75, label: 'Significant', description: 'Data subjects can be identified with minimal effort' },
    { value: 1.0, label: 'Maximum', description: 'Data subjects can be directly identified' }
  ];

  const handleLevelChange = (value: number) => {
    onUpdate({ identifiabilityLevel: value });
  };

  const getSelectedLevel = () => {
    return identifiabilityLevels.find(level => level.value === data.identifiabilityLevel) || identifiabilityLevels[1];
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Ease of Identification Assessment</CardTitle>
          <p className="text-sm text-gray-600">
            Assess how easily the affected data subjects can be identified from the leaked data
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Label className="text-sm font-medium">
              Identifiability Level <span className="text-red-500">*</span>
            </Label>
            
            <RadioGroup
              value={data.identifiabilityLevel.toString()}
              onValueChange={(value) => handleLevelChange(parseFloat(value))}
              className="space-y-4"
            >
              {identifiabilityLevels.map((level) => (
                <div key={level.value} className="flex items-start space-x-3">
                  <RadioGroupItem value={level.value.toString()} id={level.value.toString()} className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor={level.value.toString()} className="font-medium">
                      {level.label} ({level.value})
                    </Label>
                    <p className="text-sm text-gray-600 mt-1">{level.description}</p>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <Label className="text-sm font-medium text-blue-800">Current Selection</Label>
              <span className="text-lg font-bold text-blue-600">{data.identifiabilityLevel}</span>
            </div>
            <p className="text-sm text-blue-700">
              <strong>{getSelectedLevel().label}:</strong> {getSelectedLevel().description}
            </p>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Justification</Label>
            <Textarea
              value={data.identifiabilityJustification}
              onChange={(e) => onUpdate({ identifiabilityJustification: e.target.value })}
              placeholder="Explain the reasoning behind your identifiability assessment..."
              rows={4}
              className="w-full"
            />
            <p className="text-sm text-gray-500">
              Consider factors such as: availability of additional information, 
              cross-referencing possibilities, uniqueness of data combinations, etc.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-50">
        <CardHeader>
          <CardTitle className="text-sm">Assessment Guidelines</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div><strong>Negligible (0.25):</strong> Heavily pseudonymized or anonymized data</div>
          <div><strong>Limited (0.5):</strong> Indirect identifiers that require effort to link</div>
          <div><strong>Significant (0.75):</strong> Clear personal identifiers without direct names</div>
          <div><strong>Maximum (1.0):</strong> Direct identifiers like names, IDs, or unique combinations</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EaseOfIdentificationStep;
