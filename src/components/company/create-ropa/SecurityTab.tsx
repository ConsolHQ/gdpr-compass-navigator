import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, X, Lock } from 'lucide-react';

interface SecurityTabProps {
  formData: any;
  setFormData: (data: any) => void;
  addSecurityMeasure: () => void;
  updateSecurityMeasure: (id: number, field: string, value: string) => void;
  removeSecurityMeasure: (id: number) => void;
}

const SecurityTab = ({ 
  formData, 
  addSecurityMeasure, 
  updateSecurityMeasure, 
  removeSecurityMeasure 
}: SecurityTabProps) => {
  const measureTypes = ['Managerial', 'Organisational', 'Technical'];
  const implementationStatus = ['Not Started', 'In Progress', 'Implemented', 'Archived'];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Security Measures</CardTitle>
        <CardDescription>Technical and organisational measures to protect personal data</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-between items-center">
          <Label>Technical and Organisational Measures</Label>
          <Button onClick={addSecurityMeasure} variant="outline" size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Measure
          </Button>
        </div>

        {formData.securityMeasures.map((measure: any, index: number) => (
          <Card key={measure.id} className="p-4 bg-gray-50">
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-medium">Security Measure #{index + 1}</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeSecurityMeasure(measure.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Name *</Label>
                <Input
                  value={measure.name}
                  onChange={(e) => updateSecurityMeasure(measure.id, 'name', e.target.value)}
                  placeholder="Measure name"
                />
              </div>
              <div className="space-y-2">
                <Label>Type *</Label>
                <Select
                  value={measure.type}
                  onValueChange={(value) => updateSecurityMeasure(measure.id, 'type', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {measureTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 col-span-2">
                <Label>Description *</Label>
                <Textarea
                  value={measure.description}
                  onChange={(e) => updateSecurityMeasure(measure.id, 'description', e.target.value)}
                  placeholder="Describe the security measure"
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label>Implementation Status</Label>
                <Select
                  value={measure.status}
                  onValueChange={(value) => updateSecurityMeasure(measure.id, 'status', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {implementationStatus.map(status => (
                      <SelectItem key={status} value={status}>{status}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Deadline</Label>
                <Input
                  type="date"
                  value={measure.deadline}
                  onChange={(e) => updateSecurityMeasure(measure.id, 'deadline', e.target.value)}
                />
              </div>
            </div>
          </Card>
        ))}

        {formData.securityMeasures.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Lock className="mx-auto h-8 w-8 mb-2" />
            <p>No security measures added yet</p>
            <p className="text-sm">Click "Add Measure" to add technical and organisational measures</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SecurityTab;