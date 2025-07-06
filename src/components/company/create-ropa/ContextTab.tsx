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

interface ContextTabProps {
  formData: any;
  setFormData: (data: any) => void;
  handleArrayFieldChange: (field: string, value: string, checked: boolean) => void;
}

const ContextTab = ({ formData, setFormData, handleArrayFieldChange }: ContextTabProps) => {
  const [showNewIMSystem, setShowNewIMSystem] = useState(false);
  const { getMetadataItems } = useMetadata();
  
  const departments = getMetadataItems('department');
  const vendors = getMetadataItems('vendor');
  const countries = getMetadataItems('country');

  return (
    <Card>
      <CardHeader>
        <CardTitle>Processing Context and Scope</CardTitle>
        <CardDescription>Define the context, systems, and recipients involved</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Why did the processing occur?</Label>
          <Textarea
            value={formData.processingReason}
            onChange={(e) => setFormData(prev => ({ ...prev, processingReason: e.target.value }))}
            placeholder="Explain the reason for processing"
            rows={3}
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Information Management Systems</Label>
            <Button variant="outline" size="sm" onClick={() => setShowNewIMSystem(!showNewIMSystem)}>
              <Plus className="mr-2 h-4 w-4" />
              Add New IM System
            </Button>
          </div>

          {showNewIMSystem && (
            <Card className="p-4 bg-gray-50">
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="System Name *" />
                <Input placeholder="Description" />
                <Input placeholder="Location" />
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Storage Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="internal">Internal</SelectItem>
                    <SelectItem value="external">External</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </Card>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Label>Data Recipients - Internal</Label>
            {departments.map(dept => (
              <div key={dept} className="flex items-center space-x-2">
                <Checkbox
                  id={`internal-${dept}`}
                  checked={formData.internalRecipients.includes(dept)}
                  onCheckedChange={(checked) => handleArrayFieldChange('internalRecipients', dept, !!checked)}
                />
                <Label htmlFor={`internal-${dept}`}>{dept}</Label>
              </div>
            ))}
          </div>
          <div className="space-y-4">
            <Label>Data Recipients - External</Label>
            {vendors.map(vendor => (
              <div key={vendor} className="flex items-center space-x-2">
                <Checkbox
                  id={`external-${vendor}`}
                  checked={formData.externalRecipients.includes(vendor)}
                  onCheckedChange={(checked) => handleArrayFieldChange('externalRecipients', vendor, !!checked)}
                />
                <Label htmlFor={`external-${vendor}`}>{vendor}</Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <Label>International Transfers/Transfer outside the EEA</Label>
          <Select
            value={formData.internationalTransfers}
            onValueChange={(value) => setFormData(prev => ({ ...prev, internationalTransfers: value }))}
          >
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Yes">Yes</SelectItem>
              <SelectItem value="No">No</SelectItem>
            </SelectContent>
          </Select>

          {formData.internationalTransfers === 'Yes' && (
            <div className="space-y-2">
              <Label>Select Countries</Label>
              <div className="grid grid-cols-3 gap-2">
                {countries.map(country => (
                  <div key={country} className="flex items-center space-x-2">
                    <Checkbox
                      id={`country-${country}`}
                      checked={formData.transferCountries.includes(country)}
                      onCheckedChange={(checked) => handleArrayFieldChange('transferCountries', country, !!checked)}
                    />
                    <Label htmlFor={`country-${country}`} className="text-sm">{country}</Label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ContextTab;