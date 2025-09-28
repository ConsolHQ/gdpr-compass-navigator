import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Type, 
  AlignLeft, 
  ChevronDown, 
  Tags, 
  ToggleLeft, 
  Calendar, 
  Hash, 
  Mail, 
  Globe, 
  Phone, 
  FileUp,
  Plus,
  X
} from 'lucide-react';

interface CustomFieldModalProps {
  onAddField: (field: any) => void;
}

const fieldTypes = [
  {
    id: 'short_text',
    name: 'Short Text',
    description: 'Free text, single line.',
    icon: Type,
    constraints: ['maxLength', 'required']
  },
  {
    id: 'long_text',
    name: 'Long Text',
    description: 'Free text, multi-line.',
    icon: AlignLeft,
    constraints: ['maxLength', 'required']
  },
  {
    id: 'dropdown',
    name: 'Dropdown (Single Select)',
    description: 'User picks one option from a predefined list.',
    icon: ChevronDown,
    constraints: ['required', 'options']
  },
  {
    id: 'multiselect',
    name: 'Multi-select (Tags)',
    description: 'User can pick multiple options from a predefined list.',
    icon: Tags,
    constraints: ['required', 'options']
  },
  {
    id: 'boolean',
    name: 'Yes/No (Boolean)',
    description: 'Binary value (true/false).',
    icon: ToggleLeft,
    constraints: ['required']
  },
  {
    id: 'date',
    name: 'Date',
    description: 'Calendar date in YYYY-MM-DD.',
    icon: Calendar,
    constraints: ['required', 'minDate', 'maxDate']
  },
  {
    id: 'number',
    name: 'Number',
    description: 'Numeric field (integer or decimal).',
    icon: Hash,
    constraints: ['required', 'min', 'max', 'step']
  },
  {
    id: 'email',
    name: 'Email',
    description: 'Must follow name@domain.com format.',
    icon: Mail,
    constraints: ['required']
  },
  {
    id: 'url',
    name: 'URL',
    description: 'Must start with http:// or https://.',
    icon: Globe,
    constraints: ['required']
  },
  {
    id: 'phone',
    name: 'Phone Number',
    description: 'International E.164 format (+1234567890).',
    icon: Phone,
    constraints: ['required']
  },
  {
    id: 'file',
    name: 'File Upload',
    description: 'Attach supporting documents (PDF, DOCX, TXT, etc.).',
    icon: FileUp,
    constraints: ['required', 'fileTypes', 'maxSize']
  }
];

const CustomFieldModal: React.FC<CustomFieldModalProps> = ({ onAddField }) => {
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState<any>(null);
  const [fieldConfig, setFieldConfig] = useState({
    label: '',
    description: '',
    required: false,
    constraints: {} as any
  });
  const [options, setOptions] = useState<string[]>([]);
  const [newOption, setNewOption] = useState('');

  const handleTypeSelect = (type: any) => {
    setSelectedType(type);
    setStep(2);
    setFieldConfig({
      label: '',
      description: '',
      required: false,
      constraints: getDefaultConstraints(type.id)
    });
  };

  const getDefaultConstraints = (typeId: string) => {
    switch (typeId) {
      case 'short_text':
        return { maxLength: 255 };
      case 'long_text':
        return { maxLength: 2000 };
      case 'number':
        return { min: 0, max: 999999, step: 1 };
      case 'file':
        return { 
          allowedTypes: ['.pdf', '.docx', '.txt'], 
          maxSize: 10 // MB
        };
      default:
        return {};
    }
  };

  const handleAddOption = () => {
    if (newOption.trim() && !options.includes(newOption.trim())) {
      setOptions([...options, newOption.trim()]);
      setNewOption('');
    }
  };

  const handleRemoveOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const handleConstraintChange = (key: string, value: any) => {
    setFieldConfig(prev => ({
      ...prev,
      constraints: {
        ...prev.constraints,
        [key]: value
      }
    }));
  };

  const handleSubmit = () => {
    const finalConfig = {
      ...fieldConfig,
      type: selectedType.id,
      constraints: {
        ...fieldConfig.constraints,
        ...(selectedType.constraints.includes('options') && { options })
      }
    };
    
    onAddField(finalConfig);
    // Reset form
    setStep(1);
    setSelectedType(null);
    setFieldConfig({ label: '', description: '', required: false, constraints: {} });
    setOptions([]);
  };

  if (step === 1) {
    return (
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Choose Field Type</h3>
          <p className="text-sm text-gray-600 mb-4">
            Select the type of custom field you want to add to your ROPA form.
          </p>
        </div>

        <ScrollArea className="h-96">
          <div className="space-y-3">
            {fieldTypes.map((type) => {
              const IconComponent = type.icon;
              return (
                <Card
                  key={type.id}
                  className="cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => handleTypeSelect(type)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <IconComponent className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-sm">{type.name}</CardTitle>
                        <CardDescription className="text-xs">
                          {type.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </ScrollArea>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setStep(1)}
          className="p-1"
        >
          ←
        </Button>
        <div>
          <h3 className="text-lg font-semibold">Configure {selectedType?.name}</h3>
          <p className="text-sm text-gray-600">{selectedType?.description}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fieldLabel">Field Label *</Label>
          <Input
            id="fieldLabel"
            value={fieldConfig.label}
            onChange={(e) => setFieldConfig(prev => ({ ...prev, label: e.target.value }))}
            placeholder="Enter field label"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="fieldDescription">Description (optional)</Label>
          <Textarea
            id="fieldDescription"
            value={fieldConfig.description}
            onChange={(e) => setFieldConfig(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Add a description to help users understand this field"
            rows={2}
          />
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            checked={fieldConfig.required}
            onCheckedChange={(checked) => setFieldConfig(prev => ({ ...prev, required: checked }))}
          />
          <Label>Required field</Label>
        </div>

        <Separator />

        {/* Constraints */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Field Constraints</h4>

          {selectedType?.constraints.includes('maxLength') && (
            <div className="space-y-2">
              <Label>Maximum Length</Label>
              <Input
                type="number"
                value={fieldConfig.constraints.maxLength || ''}
                onChange={(e) => handleConstraintChange('maxLength', parseInt(e.target.value))}
                placeholder="255"
              />
            </div>
          )}

          {selectedType?.constraints.includes('options') && (
            <div className="space-y-2">
              <Label>Options</Label>
              <div className="flex space-x-2">
                <Input
                  value={newOption}
                  onChange={(e) => setNewOption(e.target.value)}
                  placeholder="Add an option"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddOption()}
                />
                <Button onClick={handleAddOption} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {options.map((option, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                    <span>{option}</span>
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => handleRemoveOption(index)}
                    />
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {selectedType?.constraints.includes('min') && (
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                <Label>Minimum Value</Label>
                <Input
                  type="number"
                  value={fieldConfig.constraints.min || ''}
                  onChange={(e) => handleConstraintChange('min', parseFloat(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label>Maximum Value</Label>
                <Input
                  type="number"
                  value={fieldConfig.constraints.max || ''}
                  onChange={(e) => handleConstraintChange('max', parseFloat(e.target.value))}
                />
              </div>
            </div>
          )}

          {selectedType?.constraints.includes('step') && (
            <div className="space-y-2">
              <Label>Step Size</Label>
              <Input
                type="number"
                value={fieldConfig.constraints.step || ''}
                onChange={(e) => handleConstraintChange('step', parseFloat(e.target.value))}
                placeholder="1"
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-4 border-t">
        <Button variant="outline" onClick={() => setStep(1)}>
          Back
        </Button>
        <Button 
          onClick={handleSubmit}
          disabled={!fieldConfig.label.trim()}
        >
          Add Field
        </Button>
      </div>
    </div>
  );
};

export default CustomFieldModal;