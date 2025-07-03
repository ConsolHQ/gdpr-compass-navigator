import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

interface RetentionTabProps {
  formData: any;
  setFormData: (data: any) => void;
}

const RetentionTab = ({ formData, setFormData }: RetentionTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Retention Period</CardTitle>
        <CardDescription>Define how long data is retained and what happens after</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Retention Time</Label>
            <Input
              type="number"
              value={formData.retentionTime}
              onChange={(e) => setFormData(prev => ({ ...prev, retentionTime: e.target.value }))}
              placeholder="1, 2, 3..."
            />
          </div>
          <div className="space-y-2">
            <Label>Period</Label>
            <Select
              value={formData.retentionPeriod}
              onValueChange={(value) => setFormData(prev => ({ ...prev, retentionPeriod: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Minutes">Minutes</SelectItem>
                <SelectItem value="Hours">Hours</SelectItem>
                <SelectItem value="Days">Days</SelectItem>
                <SelectItem value="Weeks">Weeks</SelectItem>
                <SelectItem value="Months">Months</SelectItem>
                <SelectItem value="Years">Years</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Retention Trigger</Label>
            <Input
              value={formData.retentionTrigger}
              onChange={(e) => setFormData(prev => ({ ...prev, retentionTrigger: e.target.value }))}
              placeholder="e.g., End of contract"
            />
          </div>
        </div>

        <div className="space-y-4">
          <Label>Action at End of Retention Period</Label>
          <Textarea
            value={formData.retentionAction}
            onChange={(e) => setFormData(prev => ({ ...prev, retentionAction: e.target.value }))}
            placeholder="Describe what happens to the data"
            rows={2}
          />
        </div>

        <div className="space-y-4">
          <Label>Justification</Label>
          <div className="flex space-x-4 mb-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="internal-justification"
                checked={formData.justificationType === 'Internal'}
                onCheckedChange={() => setFormData(prev => ({ ...prev, justificationType: 'Internal' }))}
              />
              <Label htmlFor="internal-justification">Internal</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="legislation-justification"
                checked={formData.justificationType === 'Legislation'}
                onCheckedChange={() => setFormData(prev => ({ ...prev, justificationType: 'Legislation' }))}
              />
              <Label htmlFor="legislation-justification">Legislation</Label>
            </div>
          </div>

          {formData.justificationType === 'Internal' && (
            <Textarea
              value={formData.justificationText}
              onChange={(e) => setFormData(prev => ({ ...prev, justificationText: e.target.value }))}
              placeholder="Internal justification"
              rows={3}
            />
          )}

          {formData.justificationType === 'Legislation' && (
            <Select
              value={formData.legislation}
              onValueChange={(value) => setFormData(prev => ({ ...prev, legislation: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select legislation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="GDPR">GDPR</SelectItem>
                <SelectItem value="Data Protection Act">Data Protection Act</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RetentionTab;