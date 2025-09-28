import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, X, Save, ArrowLeft, CalendarIcon, FileUp } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import CustomFieldModal from './CustomFieldModal';

interface CustomField {
  id: string;
  label: string;
  type: string;
  description?: string;
  required: boolean;
  constraints: any;
  value?: any;
}

interface CustomTabProps {
  formData: any;
  setFormData: (data: any) => void;
  onBack: () => void;
  onCreateROPA: () => void;
}

const CustomTab: React.FC<CustomTabProps> = ({ formData, setFormData, onBack, onCreateROPA }) => {
  const [showCustomFieldModal, setShowCustomFieldModal] = useState(false);
  const [customFields, setCustomFields] = useState<CustomField[]>(formData.customFields || []);

  const handleAddCustomField = (fieldConfig: any) => {
    const newField: CustomField = {
      id: `custom_${Date.now()}`,
      label: fieldConfig.label,
      type: fieldConfig.type,
      description: fieldConfig.description,
      required: fieldConfig.required,
      constraints: fieldConfig.constraints,
      value: getDefaultValue(fieldConfig.type)
    };

    const updatedFields = [...customFields, newField];
    setCustomFields(updatedFields);
    setFormData(prev => ({
      ...prev,
      customFields: updatedFields
    }));
    setShowCustomFieldModal(false);
  };

  const getDefaultValue = (type: string) => {
    switch (type) {
      case 'multiselect':
        return [];
      case 'boolean':
        return false;
      case 'date':
        return null;
      case 'number':
        return '';
      default:
        return '';
    }
  };

  const handleRemoveField = (fieldId: string) => {
    const updatedFields = customFields.filter(field => field.id !== fieldId);
    setCustomFields(updatedFields);
    setFormData(prev => ({
      ...prev,
      customFields: updatedFields
    }));
  };

  const handleFieldValueChange = (fieldId: string, value: any) => {
    const updatedFields = customFields.map(field => 
      field.id === fieldId ? { ...field, value } : field
    );
    setCustomFields(updatedFields);
    setFormData(prev => ({
      ...prev,
      customFields: updatedFields
    }));
  };

  const renderCustomFieldInput = (field: CustomField) => {
    switch (field.type) {
      case 'short_text':
        return (
          <Input
            value={field.value || ''}
            onChange={(e) => handleFieldValueChange(field.id, e.target.value)}
            maxLength={field.constraints?.maxLength || 255}
            placeholder="Enter text..."
            required={field.required}
          />
        );

      case 'long_text':
        return (
          <Textarea
            value={field.value || ''}
            onChange={(e) => handleFieldValueChange(field.id, e.target.value)}
            maxLength={field.constraints?.maxLength || 2000}
            placeholder="Enter detailed text..."
            required={field.required}
            rows={3}
          />
        );

      case 'dropdown':
        return (
          <Select
            value={field.value || ''}
            onValueChange={(value) => handleFieldValueChange(field.id, value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {field.constraints?.options?.map((option: string, index: number) => (
                <SelectItem key={index} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'multiselect':
        return (
          <div className="space-y-2">
            {field.constraints?.options?.map((option: string, index: number) => (
              <div key={index} className="flex items-center space-x-2">
                <Checkbox
                  checked={field.value?.includes(option) || false}
                  onCheckedChange={(checked) => {
                    const currentValues = field.value || [];
                    const newValues = checked
                      ? [...currentValues, option]
                      : currentValues.filter((v: string) => v !== option);
                    handleFieldValueChange(field.id, newValues);
                  }}
                />
                <Label>{option}</Label>
              </div>
            ))}
          </div>
        );

      case 'boolean':
        return (
          <div className="flex items-center space-x-2">
            <Switch
              checked={field.value || false}
              onCheckedChange={(checked) => handleFieldValueChange(field.id, checked)}
            />
            <Label>{field.value ? 'Yes' : 'No'}</Label>
          </div>
        );

      case 'date':
        return (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !field.value && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={(date) => handleFieldValueChange(field.id, date)}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        );

      case 'number':
        return (
          <Input
            type="number"
            value={field.value || ''}
            onChange={(e) => handleFieldValueChange(field.id, e.target.value)}
            min={field.constraints?.min}
            max={field.constraints?.max}
            step={field.constraints?.step || 1}
            required={field.required}
          />
        );

      case 'email':
        return (
          <Input
            type="email"
            value={field.value || ''}
            onChange={(e) => handleFieldValueChange(field.id, e.target.value)}
            placeholder="name@example.com"
            required={field.required}
          />
        );

      case 'url':
        return (
          <Input
            type="url"
            value={field.value || ''}
            onChange={(e) => handleFieldValueChange(field.id, e.target.value)}
            placeholder="https://example.com"
            required={field.required}
          />
        );

      case 'phone':
        return (
          <Input
            type="tel"
            value={field.value || ''}
            onChange={(e) => handleFieldValueChange(field.id, e.target.value)}
            placeholder="+1234567890"
            pattern="^\+[1-9]\d{1,14}$"
            required={field.required}
          />
        );

      case 'file':
        return (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <FileUp className="mx-auto h-12 w-12 text-gray-400" />
            <div className="mt-4">
              <input
                type="file"
                className="hidden"
                id={`file-${field.id}`}
                accept={field.constraints?.allowedTypes?.join(',') || '*'}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    handleFieldValueChange(field.id, file.name);
                  }
                }}
              />
              <Label htmlFor={`file-${field.id}`} className="cursor-pointer text-blue-600 hover:text-blue-500">
                Choose file or drag and drop
              </Label>
              <p className="text-sm text-gray-500 mt-1">
                {field.constraints?.allowedTypes?.join(', ') || 'Any file type'}
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Custom Fields</h3>
          <p className="text-sm text-gray-600">
            Add custom data fields to capture additional information specific to your organization's needs.
          </p>
        </div>
        <Dialog open={showCustomFieldModal} onOpenChange={setShowCustomFieldModal}>
          <DialogTrigger asChild>
            <Button className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Add Custom Field</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add Custom Field</DialogTitle>
            </DialogHeader>
            <CustomFieldModal onAddField={handleAddCustomField} />
          </DialogContent>
        </Dialog>
      </div>

      {customFields.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                <Plus className="h-8 w-8 text-gray-400" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">No custom fields added</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Get started by adding your first custom field to capture additional data.
                </p>
              </div>
              <Button onClick={() => setShowCustomFieldModal(true)} variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Add Custom Field
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {customFields.map((field) => (
            <Card key={field.id}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-base flex items-center space-x-2">
                      <span>{field.label}</span>
                      {field.required && <span className="text-red-500">*</span>}
                    </CardTitle>
                    {field.description && (
                      <p className="text-sm text-gray-600">{field.description}</p>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveField(field.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {renderCustomFieldInput(field)}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-between pt-6 border-t">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Save className="mr-2 h-4 w-4" />
            Save Draft
          </Button>
          <Button onClick={onCreateROPA} className="bg-teal-600 hover:bg-teal-700">
            Create ROPA
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CustomTab;