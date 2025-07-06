import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Info } from 'lucide-react';
import { useMetadata } from '@/hooks/useMetadata';

interface DataTabProps {
  formData: any;
  setFormData: (data: any) => void;
  handleArrayFieldChange: (field: string, value: string, checked: boolean) => void;
}

const DataTab = ({ formData, setFormData, handleArrayFieldChange }: DataTabProps) => {
  const { getMetadataItems } = useMetadata();
  const dataSubjectTypes = getMetadataItems('data-subject-type');
  const personalDataTypes = getMetadataItems('personal-data-type');
  const specialCategoryGrounds = getMetadataItems('special-category-ground');

  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Categories</CardTitle>
        <CardDescription>Define the types of data and data subjects involved</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Label>Categories of Data Subjects</Label>
            {dataSubjectTypes.map(type => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={`subject-${type}`}
                  checked={formData.dataSubjectCategories.includes(type)}
                  onCheckedChange={(checked) => handleArrayFieldChange('dataSubjectCategories', type, !!checked)}
                />
                <Label htmlFor={`subject-${type}`}>{type}</Label>
              </div>
            ))}
          </div>
          <div className="space-y-4">
            <Label>Categories of Personal Data</Label>
            {personalDataTypes.map(type => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={`data-${type}`}
                  checked={formData.personalDataCategories.includes(type)}
                  onCheckedChange={(checked) => handleArrayFieldChange('personalDataCategories', type, !!checked)}
                />
                <Label htmlFor={`data-${type}`}>{type}</Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Label>Special Category Data?</Label>
            <Info className="h-4 w-4 text-gray-400" />
          </div>
          <Select
            value={formData.specialCategoryData}
            onValueChange={(value) => setFormData(prev => ({ ...prev, specialCategoryData: value }))}
          >
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Yes">Yes</SelectItem>
              <SelectItem value="No">No</SelectItem>
            </SelectContent>
          </Select>

          {formData.specialCategoryData === 'Yes' && (
            <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
              <div className="space-y-2">
                <Label>Specify Special Categories</Label>
                <Textarea
                  value={formData.specialCategoryDetails}
                  onChange={(e) => setFormData(prev => ({ ...prev, specialCategoryDetails: e.target.value }))}
                  placeholder="Specify which special categories are processed"
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label>Legal Ground for Special Category</Label>
                <Select
                  value={formData.specialCategoryGround}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, specialCategoryGround: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select legal ground" />
                  </SelectTrigger>
                  <SelectContent>
                    {specialCategoryGrounds.map(ground => (
                      <SelectItem key={ground} value={ground}>{ground}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DataTab;