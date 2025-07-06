import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus } from 'lucide-react';
import { useMetadata } from '@/hooks/useMetadata';

interface GeneralInfoTabProps {
  formData: any;
  setFormData: (data: any) => void;
  handleArrayFieldChange: (field: string, value: string, checked: boolean) => void;
}

const GeneralInfoTab = ({ formData, setFormData, handleArrayFieldChange }: GeneralInfoTabProps) => {
  const [showNewDepartment, setShowNewDepartment] = useState(false);
  const { getMetadataItems } = useMetadata();
  
  const departments = getMetadataItems('department');
  const vendors = getMetadataItems('vendor');

  return (
    <Card>
      <CardHeader>
        <CardTitle>General Information</CardTitle>
        <CardDescription>Basic details about the processing activity</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">Name of Processing Activity *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter processing activity name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <div className="flex space-x-2">
              <Select
                value={formData.department}
                onValueChange={(value) => setFormData(prev => ({ ...prev, department: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map(dept => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" onClick={() => setShowNewDepartment(!showNewDepartment)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {showNewDepartment && (
              <Input placeholder="Add new department" className="mt-2" />
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Describe the processing activity"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Role in Processing</Label>
            <Select
              value={formData.role}
              onValueChange={(value) => setFormData(prev => ({ ...prev, role: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
                <SelectContent>
                  {getMetadataItems('agreement-role').map(role => (
                    <SelectItem key={role} value={role}>{role}</SelectItem>
                  ))}
                </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Joint Controllers</Label>
            <Select
              value={formData.jointControllers}
              onValueChange={(value) => setFormData(prev => ({ ...prev, jointControllers: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="No">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {formData.jointControllers === 'Yes' && (
          <div className="space-y-2">
            <Label>Select Joint Controllers</Label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium mb-2">Vendors</p>
                {vendors.map(vendor => (
                  <div key={vendor} className="flex items-center space-x-2 mb-2">
                    <Checkbox
                      id={`vendor-${vendor}`}
                      checked={formData.selectedControllers.includes(vendor)}
                      onCheckedChange={(checked) => handleArrayFieldChange('selectedControllers', vendor, !!checked)}
                    />
                    <Label htmlFor={`vendor-${vendor}`}>{vendor}</Label>
                  </div>
                ))}
              </div>
              <div>
                <p className="text-sm font-medium mb-2">Departments</p>
                {departments.map(dept => (
                  <div key={dept} className="flex items-center space-x-2 mb-2">
                    <Checkbox
                      id={`dept-${dept}`}
                      checked={formData.selectedControllers.includes(dept)}
                      onCheckedChange={(checked) => handleArrayFieldChange('selectedControllers', dept, !!checked)}
                    />
                    <Label htmlFor={`dept-${dept}`}>{dept}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GeneralInfoTab;