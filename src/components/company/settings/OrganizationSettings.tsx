import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Building } from 'lucide-react';

const OrganizationSettings = () => {
  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Building className="h-5 w-5" />
            <span>Organization Setup</span>
          </CardTitle>
          <CardDescription>Configure your company's basic information and compliance settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input id="companyName" defaultValue="TechCorp Solutions Ltd" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="registrationNumber">Registration Number</Label>
              <Input id="registrationNumber" defaultValue="12345678" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Business Address</Label>
            <Input id="address" defaultValue="456 Tech Street, London, UK SW1A 1AA" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" defaultValue="+44 20 7123 4567" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input id="website" defaultValue="https://techcorp.com" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dpoName">Data Protection Officer</Label>
              <Input id="dpoName" defaultValue="Jane Smith" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dpoEmail">DPO Email</Label>
              <Input id="dpoEmail" defaultValue="dpo@techcorp.com" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="supervisoryAuthority">Supervisory Authority</Label>
            <Input id="supervisoryAuthority" defaultValue="Information Commissioner's Office (ICO)" />
          </div>
          <Button>Save Organization Settings</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrganizationSettings;