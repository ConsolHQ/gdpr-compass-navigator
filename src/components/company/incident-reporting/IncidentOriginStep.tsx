
import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMetadata } from '@/hooks/useMetadata';

interface IncidentOriginStepProps {
  data: any;
  onUpdate: (updates: any) => void;
}

const IncidentOriginStep: React.FC<IncidentOriginStepProps> = ({ data, onUpdate }) => {
  const { getMetadataItems } = useMetadata();
  const internalFunctions = getMetadataItems('employee-function');
  const externalVendors = getMetadataItems('vendor');
  const agreementRoles = getMetadataItems('agreement-role');

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Incident Origin</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label className="text-sm font-medium">
              Origin <span className="text-red-500">*</span>
            </Label>
            <RadioGroup
              value={data.origin}
              onValueChange={(value) => onUpdate({ origin: value })}
              className="flex space-x-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="internal" id="internal" />
                <Label htmlFor="internal">Internal</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="external" id="external" />
                <Label htmlFor="external">External</Label>
              </div>
            </RadioGroup>
          </div>

          {data.origin === 'internal' && (
            <div className="space-y-2">
              <Label className="text-sm font-medium">Involved Function</Label>
              <Select 
                value={data.involvedFunction} 
                onValueChange={(value) => onUpdate({ involvedFunction: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select internal function" />
                </SelectTrigger>
                <SelectContent>
                  {internalFunctions.map((func) => (
                    <SelectItem key={func} value={func}>
                      {func}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {data.origin === 'external' && (
            <div className="space-y-2">
              <Label className="text-sm font-medium">Involved Vendor</Label>
              <Select 
                value={data.involvedVendor} 
                onValueChange={(value) => onUpdate({ involvedVendor: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select external vendor" />
                </SelectTrigger>
                <SelectContent>
                  {externalVendors.map((vendor) => (
                    <SelectItem key={vendor} value={vendor}>
                      {vendor}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-3">
            <Label className="text-sm font-medium">
              Privacy Role <span className="text-red-500">*</span>
            </Label>
            <RadioGroup
              value={data.privacyRole}
              onValueChange={(value) => onUpdate({ privacyRole: value })}
              className="flex space-x-6"
            >
              {agreementRoles.filter(role => ['Controller', 'Processor'].includes(role)).map(role => (
                <div key={role} className="flex items-center space-x-2">
                  <RadioGroupItem value={role.toLowerCase()} id={role.toLowerCase()} />
                  <Label htmlFor={role.toLowerCase()}>{role}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      <Card className="border-orange-200 bg-orange-50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <span className="text-orange-600 mr-2">⚠️</span>
            Personal Data Assessment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-sm font-medium">
                Was personal data leaked or compromised?
              </Label>
              <p className="text-sm text-gray-600">
                This determines whether GDPR breach notification requirements apply
              </p>
            </div>
            <Switch
              checked={data.personalDataLeaked}
              onCheckedChange={(checked) => onUpdate({ personalDataLeaked: checked })}
            />
          </div>
          
          {!data.personalDataLeaked && (
            <div className="mt-4 p-3 bg-green-100 border border-green-200 rounded">
              <p className="text-sm text-green-800">
                <strong>Note:</strong> If no personal data was leaked, you will skip to the summary step 
                as GDPR breach notification requirements may not apply.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default IncidentOriginStep;
