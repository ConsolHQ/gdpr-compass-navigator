import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface LIAFormData {
  interactionFrequency: string;
  relationship: string;
  dataObtainment: string;
  informedTiming: string;
  rightToObject: string;
  decisionPower: string;
}

interface ScopeDefinitionProps {
  data: LIAFormData;
  updateData: (section: Partial<LIAFormData>) => void;
}

const ScopeDefinition = ({ data, updateData }: ScopeDefinitionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Scope Definition</CardTitle>
        <CardDescription>
          Define the scope and context of the data processing activity.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Interaction Frequency */}
        <div className="space-y-2">
          <Label>Indicate the frequency of interactions between the organisation and the individual whose personal data are being processed? *</Label>
          <Select value={data.interactionFrequency} onValueChange={(value) => updateData({ interactionFrequency: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="several-times-year">Several times a year</SelectItem>
              <SelectItem value="once-year">Once a year</SelectItem>
              <SelectItem value="less-than-once-year">Less than once a year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Relationship */}
        <div className="space-y-2">
          <Label>What is the relationship between the individual whose personal data are being processed and the organisation? *</Label>
          <Select value={data.relationship} onValueChange={(value) => updateData({ relationship: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select relationship type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="existing-client-natural">Existing client (natural person)</SelectItem>
              <SelectItem value="existing-client-legal">Existing client (legal person)</SelectItem>
              <SelectItem value="former-client">Former client</SelectItem>
              <SelectItem value="potential-client">Potential client</SelectItem>
              <SelectItem value="employee-freelancer">Employee or freelancer</SelectItem>
              <SelectItem value="supplier">Supplier</SelectItem>
              <SelectItem value="others">Others</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Data Obtainment */}
        <div className="space-y-2">
          <Label>Have the personal data been obtained directly or indirectly from the individual? *</Label>
          <Select value={data.dataObtainment} onValueChange={(value) => updateData({ dataObtainment: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select obtainment method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="directly">Directly</SelectItem>
              <SelectItem value="indirectly">Indirectly</SelectItem>
              <SelectItem value="mix">Mix of both</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Informed Timing */}
        <div className="space-y-2">
          <Label>When/how has the data subject been informed about the processing activity? (Choose the most appropriate answer) *</Label>
          <Select value={data.informedTiming} onValueChange={(value) => updateData({ informedTiming: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select timing" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="long-before">A long time before the start of the processing activity</SelectItem>
              <SelectItem value="right-before">Right before the start of the processing activity</SelectItem>
              <SelectItem value="during">During the processing activity</SelectItem>
              <SelectItem value="after">After the processing activity is finished</SelectItem>
              <SelectItem value="privacy-policy">Via the privacy policy</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Right to Object */}
        <div className="space-y-2">
          <Label>Can the involved data subjects easily exercise their right to object? *</Label>
          <Select value={data.rightToObject} onValueChange={(value) => updateData({ rightToObject: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Decision Power */}
        <div className="space-y-2">
          <Label>Who holds the power to decide whether or not the Personal data processing activity will take place? *</Label>
          <Select value={data.decisionPower} onValueChange={(value) => updateData({ decisionPower: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select who holds decision power" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="organisation">Organisation</SelectItem>
              <SelectItem value="data-subject">Data subject</SelectItem>
              <SelectItem value="balanced">Relationship is in balance</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScopeDefinition;