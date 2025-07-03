import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PurposeTabProps {
  formData: any;
  setFormData: (data: any) => void;
}

const PurposeTab = ({ formData, setFormData }: PurposeTabProps) => {
  const legalBasisOptions = ['Consent', 'Legal Obligation', 'Legitimate Interest', 'Public Interest', 'Vital Interest'];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Purpose and Legal Basis</CardTitle>
        <CardDescription>Define the purpose and legal justification for processing</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="purpose">Purpose of Processing *</Label>
          <Textarea
            id="purpose"
            value={formData.purpose}
            onChange={(e) => setFormData(prev => ({ ...prev, purpose: e.target.value }))}
            placeholder="Describe the purpose of processing personal data"
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label>Legal Basis *</Label>
          <Select
            value={formData.legalBasis}
            onValueChange={(value) => setFormData(prev => ({ ...prev, legalBasis: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select legal basis" />
            </SelectTrigger>
            <SelectContent>
              {legalBasisOptions.map(basis => (
                <SelectItem key={basis} value={basis}>{basis}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default PurposeTab;