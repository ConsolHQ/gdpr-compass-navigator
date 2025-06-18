
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Building, MapPin, Users, ChevronRight } from 'lucide-react';

interface OrganizationData {
  name: string;
  industry: string;
  country: string;
  description: string;
  dpoName: string;
  dpoEmail: string;
  firstLocation: string;
  firstDepartment: string;
}

interface OrganizationSetupProps {
  onNext: (data: OrganizationData) => void;
  userType: 'partner' | 'company';
}

const industries = [
  'Technology',
  'Healthcare',
  'Finance',
  'Retail',
  'Manufacturing',
  'Education',
  'Government',
  'Non-profit',
  'Other'
];

const countries = [
  'United States',
  'United Kingdom',
  'Germany',
  'France',
  'Canada',
  'Australia',
  'Netherlands',
  'Other'
];

const OrganizationSetup = ({ onNext, userType }: OrganizationSetupProps) => {
  const [formData, setFormData] = useState<OrganizationData>({
    name: '',
    industry: '',
    country: '',
    description: '',
    dpoName: '',
    dpoEmail: '',
    firstLocation: '',
    firstDepartment: '',
  });

  const updateFormData = (field: keyof OrganizationData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(formData);
  };

  const isFormValid = formData.name && formData.industry && formData.country;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-slate-900">
            {userType === 'partner' ? 'Set Up Your Partnership' : 'Set Up Your Organization'}
          </CardTitle>
          <CardDescription>
            {userType === 'partner' 
              ? 'Configure your partner account to manage multiple companies'
              : 'Tell us about your company to get started with GDPR compliance'
            }
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-sm font-medium text-slate-700">
                <Building className="h-4 w-4" />
                <span>Basic Information</span>
              </div>
              
              <div className="space-y-4 pl-6">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    {userType === 'partner' ? 'Partnership Name' : 'Company Name'}
                  </Label>
                  <Input
                    id="name"
                    placeholder={userType === 'partner' ? 'ACME Compliance Partners' : 'ACME Corporation'}
                    value={formData.name}
                    onChange={(e) => updateFormData('name', e.target.value)}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Select onValueChange={(value) => updateFormData('industry', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        {industries.map(industry => (
                          <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Select onValueChange={(value) => updateFormData('country', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        {countries.map(country => (
                          <SelectItem key={country} value={country}>{country}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    placeholder="Brief description of your organization..."
                    value={formData.description}
                    onChange={(e) => updateFormData('description', e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
            </div>

            {/* DPO Information (Company only) */}
            {userType === 'company' && (
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-sm font-medium text-slate-700">
                  <Users className="h-4 w-4" />
                  <span>Data Protection Officer</span>
                </div>
                
                <div className="space-y-4 pl-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dpoName">DPO Name</Label>
                      <Input
                        id="dpoName"
                        placeholder="John Doe"
                        value={formData.dpoName}
                        onChange={(e) => updateFormData('dpoName', e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="dpoEmail">DPO Email</Label>
                      <Input
                        id="dpoEmail"
                        type="email"
                        placeholder="dpo@company.com"
                        value={formData.dpoEmail}
                        onChange={(e) => updateFormData('dpoEmail', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Initial Setup (Company only) */}
            {userType === 'company' && (
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-sm font-medium text-slate-700">
                  <MapPin className="h-4 w-4" />
                  <span>Initial Setup</span>
                </div>
                
                <div className="space-y-4 pl-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstLocation">First Location</Label>
                      <Input
                        id="firstLocation"
                        placeholder="Headquarters"
                        value={formData.firstLocation}
                        onChange={(e) => updateFormData('firstLocation', e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="firstDepartment">First Department</Label>
                      <Input
                        id="firstDepartment"
                        placeholder="IT Department"
                        value={formData.firstDepartment}
                        onChange={(e) => updateFormData('firstDepartment', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
          
          <div className="p-6 pt-0">
            <Button 
              type="submit" 
              className="w-full"
              disabled={!isFormValid}
            >
              Continue
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default OrganizationSetup;
