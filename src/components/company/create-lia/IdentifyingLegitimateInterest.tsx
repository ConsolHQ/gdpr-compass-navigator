import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

interface LIAFormData {
  name: string;
  relatedProcessingActivities: string[];
  importance: string;
  alternativeLegalBasis: string;
  alternativeDescription?: string;
  otherLegalBasis?: string;
  necessaryForOrganization: string;
  organizationPurposes?: string;
  necessaryForThirdParty: string;
  thirdPartyPurposes?: string;
  thirdPartyDescription?: string;
  legalException: string;
  selectedExceptions?: string[];
}

interface IdentifyingLegitimateInterestProps {
  data: LIAFormData;
  updateData: (section: Partial<LIAFormData>) => void;
}

const processingActivities = [
  'Customer Analytics',
  'Marketing Communications',
  'Fraud Prevention',
  'System Security',
  'Service Improvement',
  'Business Intelligence',
];

const importanceOptions = [
  { value: 'no-impact', label: 'No Impact for the organisation' },
  { value: 'benefit', label: 'Benefit for the organisation' },
  { value: 'very-important', label: 'Very Important' },
  { value: 'business-critical', label: 'Business Critical' },
];

const legalBasisOptions = [
  { value: 'consent', label: 'Consent' },
  { value: 'contract', label: 'Performance of a Contract' },
  { value: 'legal-obligation', label: 'Legal Obligation' },
  { value: 'vital-interest', label: 'Vital Interest' },
  { value: 'public-interest', label: 'Public Interest' },
];

const legalExceptions = [
  'Direct marketing to existing customers',
  'Fraud prevention and security',
  'Internal administration and record keeping',
  'Corporate transactions and restructuring',
  'Legal proceedings and regulatory compliance',
];

const IdentifyingLegitimateInterest = ({ data, updateData }: IdentifyingLegitimateInterestProps) => {
  const handleProcessingActivityChange = (activity: string, checked: boolean) => {
    const updatedActivities = checked
      ? [...data.relatedProcessingActivities, activity]
      : data.relatedProcessingActivities.filter(a => a !== activity);
    
    updateData({ relatedProcessingActivities: updatedActivities });
  };

  const handleExceptionChange = (exception: string, checked: boolean) => {
    const currentExceptions = data.selectedExceptions || [];
    const updatedExceptions = checked
      ? [...currentExceptions, exception]
      : currentExceptions.filter(e => e !== exception);
    
    updateData({ selectedExceptions: updatedExceptions });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Identifying Legitimate Interest</CardTitle>
        <CardDescription>
          Provide general details about the processing activity and check for alternatives to legitimate interest.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name">Name *</Label>
          <Input
            id="name"
            placeholder="Enter a short, descriptive name for this LIA"
            value={data.name}
            onChange={(e) => updateData({ name: e.target.value })}
          />
        </div>

        {/* Related Processing Activities */}
        <div className="space-y-3">
          <Label>Related Processing Activities *</Label>
          <div className="grid grid-cols-2 gap-3">
            {processingActivities.map((activity) => (
              <div key={activity} className="flex items-center space-x-2">
                <Checkbox
                  id={activity}
                  checked={data.relatedProcessingActivities.includes(activity)}
                  onCheckedChange={(checked) => handleProcessingActivityChange(activity, checked as boolean)}
                />
                <Label htmlFor={activity} className="text-sm">{activity}</Label>
              </div>
            ))}
          </div>
        </div>

        {/* Importance */}
        <div className="space-y-2">
          <Label>Indicate the Importance of this Processing Activity *</Label>
          <Select value={data.importance} onValueChange={(value) => updateData({ importance: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select importance level" />
            </SelectTrigger>
            <SelectContent>
              {importanceOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Alternative Legal Basis */}
        <div className="space-y-2">
          <Label>Can the intended Processing Activity be carried out based on another Legal basis other than Legitimate Interest? *</Label>
          <Select 
            value={data.alternativeLegalBasis} 
            onValueChange={(value) => updateData({ alternativeLegalBasis: value, alternativeDescription: '', otherLegalBasis: '' })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="no">No</SelectItem>
              {legalBasisOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  Yes, {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Conditional fields for alternative legal basis */}
        {data.alternativeLegalBasis && data.alternativeLegalBasis !== 'no' && (
          <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
            <div className="space-y-2">
              <Label htmlFor="alternativeDescription">Description</Label>
              <Textarea
                id="alternativeDescription"
                placeholder="Provide details about the alternative legal basis"
                value={data.alternativeDescription || ''}
                onChange={(e) => updateData({ alternativeDescription: e.target.value })}
              />
            </div>
          </div>
        )}

        {/* Necessary for Organization */}
        <div className="space-y-2">
          <Label>Is this Processing Activity necessary for one or more organisational purposes? *</Label>
          <Select value={data.necessaryForOrganization} onValueChange={(value) => updateData({ necessaryForOrganization: value, organizationPurposes: '' })}>
            <SelectTrigger>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Conditional field for organization purposes */}
        {data.necessaryForOrganization === 'yes' && (
          <div className="space-y-2 p-4 bg-muted/50 rounded-lg">
            <Label htmlFor="organizationPurposes">Describe this (these) purpose(s)</Label>
            <Textarea
              id="organizationPurposes"
              placeholder="Provide details about the organizational purposes"
              value={data.organizationPurposes || ''}
              onChange={(e) => updateData({ organizationPurposes: e.target.value })}
            />
          </div>
        )}

        {/* Necessary for Third Party */}
        <div className="space-y-2">
          <Label>Is this Processing Activity necessary for one or more Organisational Purposes of a Third Party? *</Label>
          <Select 
            value={data.necessaryForThirdParty} 
            onValueChange={(value) => updateData({ necessaryForThirdParty: value, thirdPartyPurposes: '', thirdPartyDescription: '' })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Conditional fields for third party */}
        {data.necessaryForThirdParty === 'yes' && (
          <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
            <div className="space-y-2">
              <Label htmlFor="thirdPartyPurposes">Describe this (these) purpose(s)</Label>
              <Textarea
                id="thirdPartyPurposes"
                placeholder="Provide details about the third party purposes"
                value={data.thirdPartyPurposes || ''}
                onChange={(e) => updateData({ thirdPartyPurposes: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="thirdPartyDescription">Describe the Third Party</Label>
              <Input
                id="thirdPartyDescription"
                placeholder="Provide information about the third party"
                value={data.thirdPartyDescription || ''}
                onChange={(e) => updateData({ thirdPartyDescription: e.target.value })}
              />
            </div>
          </div>
        )}

        {/* Legal Exception */}
        <div className="space-y-2">
          <Label>Is there an allowed exception in the law, recitals, guidelines, advises or opinions? *</Label>
          <Select value={data.legalException} onValueChange={(value) => updateData({ legalException: value, selectedExceptions: [] })}>
            <SelectTrigger>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Conditional exceptions selection */}
        {data.legalException === 'yes' && (
          <div className="space-y-3 p-4 bg-muted/50 rounded-lg">
            <Label>Select an exception</Label>
            {legalExceptions.map((exception) => (
              <div key={exception} className="flex items-center space-x-2">
                <Checkbox
                  id={exception}
                  checked={(data.selectedExceptions || []).includes(exception)}
                  onCheckedChange={(checked) => handleExceptionChange(exception, checked as boolean)}
                />
                <Label htmlFor={exception} className="text-sm">{exception}</Label>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default IdentifyingLegitimateInterest;