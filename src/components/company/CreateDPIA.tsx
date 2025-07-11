import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Save, Eye } from 'lucide-react';
import { useMetadata } from '@/hooks/useMetadata';

interface CreateDPIAProps {
  onBack: () => void;
}

const CreateDPIA = ({ onBack }: CreateDPIAProps) => {
  const { getMetadataItems } = useMetadata();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    riskLevel: '',
    assessor: '',
    dueDate: '',
    dataTypes: [] as string[],
    risks: [] as string[],
  });

  const handleSave = () => {
    console.log('Saving DPIA:', formData);
    // In a real app, this would save to backend
    onBack();
  };

  const handleDataTypeChange = (type: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({ ...prev, dataTypes: [...prev.dataTypes, type] }));
    } else {
      setFormData(prev => ({ ...prev, dataTypes: prev.dataTypes.filter(t => t !== type) }));
    }
  };

  const handleRiskChange = (risk: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({ ...prev, risks: [...prev.risks, risk] }));
    } else {
      setFormData(prev => ({ ...prev, risks: prev.risks.filter(r => r !== risk) }));
    }
  };

  const dataTypeOptions = getMetadataItems('personal-data-categories');
  const riskOptions = getMetadataItems('risk-levels');

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Create New DPIA</h1>
            <p className="text-gray-600">Data Protection Impact Assessment</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </Button>
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Save DPIA
          </Button>
        </div>
      </div>

      {/* Form */}
      <div className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>
              Enter the basic details for your DPIA assessment
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g., Customer Analytics Platform"
                />
              </div>
              <div>
                <Label>Risk Level</Label>
                <Select onValueChange={(value) => setFormData(prev => ({ ...prev, riskLevel: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select risk level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe the processing activity requiring assessment"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="assessor">Assessor</Label>
                <Input
                  id="assessor"
                  value={formData.assessor}
                  onChange={(e) => setFormData(prev => ({ ...prev, assessor: e.target.value }))}
                  placeholder="Name of the person conducting the assessment"
                />
              </div>
              <div>
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Types & Risks */}
        <Card>
          <CardHeader>
            <CardTitle>Data Types & Risks</CardTitle>
            <CardDescription>
              Select the types of data and associated risks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-base font-medium">Data Types Involved</Label>
              <Select onValueChange={(value) => handleDataTypeChange(value, true)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select data types" />
                </SelectTrigger>
                <SelectContent>
                  {dataTypeOptions.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formData.dataTypes.length > 0 && (
                <div className="mt-2 space-y-2">
                  {formData.dataTypes.map((type) => (
                    <div key={type} className="flex items-center justify-between p-2 bg-muted rounded">
                      <span className="text-sm">{type}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDataTypeChange(type, false)}
                      >
                        ×
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div>
              <Label className="text-base font-medium">Risk Areas</Label>
              <Select onValueChange={(value) => handleRiskChange(value, true)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select risk areas" />
                </SelectTrigger>
                <SelectContent>
                  {riskOptions.map((risk) => (
                    <SelectItem key={risk} value={risk}>{risk}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formData.risks.length > 0 && (
                <div className="mt-2 space-y-2">
                  {formData.risks.map((risk) => (
                    <div key={risk} className="flex items-center justify-between p-2 bg-muted rounded">
                      <span className="text-sm">{risk}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRiskChange(risk, false)}
                      >
                        ×
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateDPIA;