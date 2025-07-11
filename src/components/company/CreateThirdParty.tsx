import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon, Building, ArrowLeft, Save, Send, Upload, FileText, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMetadata } from '@/hooks/useMetadata';

interface CreateThirdPartyProps {
  onBack?: () => void;
}

const CreateThirdParty = ({ onBack }: CreateThirdPartyProps) => {
  const { getMetadataItems } = useMetadata();
  
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    contactPerson: '',
    email: '',
    phone: '',
    address: '',
    country: '',
    website: '',
    description: '',
    services: '',
    dataCategories: [] as string[],
    riskLevel: '',
    contractStartDate: undefined as Date | undefined,
    contractEndDate: undefined as Date | undefined,
    dpuSigned: false,
    dpuDate: undefined as Date | undefined,
    gdprCompliant: false,
    dataTransferMechanism: '',
    securityMeasures: '',
    notes: '',
  });

  // Get values from metadata
  const dataCategories = getMetadataItems('personal-data-categories');
  const riskLevels = getMetadataItems('risk-levels');
  const countries = getMetadataItems('country');

  const categories = [
    'Data Processor', 'Data Controller', 'Cloud Service Provider', 'Software Vendor',
    'Marketing Agency', 'Analytics Provider', 'Payment Processor', 'HR Services',
    'IT Support', 'Legal Services', 'Consulting', 'Other'
  ];

  const transferMechanisms = [
    'Standard Contractual Clauses', 'Adequacy Decision', 'Binding Corporate Rules',
    'Certification', 'Code of Conduct', 'Other'
  ];

  const handleDataCategoryAdd = (category: string) => {
    if (!formData.dataCategories.includes(category)) {
      setFormData(prev => ({
        ...prev,
        dataCategories: [...prev.dataCategories, category]
      }));
    }
  };

  const handleDataCategoryRemove = (category: string) => {
    setFormData(prev => ({
      ...prev,
      dataCategories: prev.dataCategories.filter(c => c !== category)
    }));
  };

  const handleSubmit = (action: 'save' | 'submit') => {
    console.log('Third Party Form Data:', { ...formData, action });
    // Handle form submission
    if (onBack) onBack();
  };

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={onBack} className="p-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Add Third Party</h1>
            <p className="text-muted-foreground">Register a new third party processor or controller</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => handleSubmit('save')}>
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
          <Button onClick={() => handleSubmit('submit')}>
            <Send className="h-4 w-4 mr-2" />
            Add Third Party
          </Button>
        </div>
      </div>

      {/* Vertical Layout */}
      <div className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>General details about the third party organization</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Organization Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter organization name"
                />
              </div>
              <div>
                <Label htmlFor="category">Category *</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="services">Services Provided *</Label>
              <Textarea
                id="services"
                value={formData.services}
                onChange={(e) => setFormData(prev => ({ ...prev, services: e.target.value }))}
                placeholder="Describe the services provided by this third party..."
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={formData.website}
                onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                placeholder="https://example.com"
              />
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>Primary contact details for this third party</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contactPerson">Contact Person</Label>
                <Input
                  id="contactPerson"
                  value={formData.contactPerson}
                  onChange={(e) => setFormData(prev => ({ ...prev, contactPerson: e.target.value }))}
                  placeholder="Primary contact name"
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="contact@example.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="Phone number"
                />
              </div>
              <div>
                <Label htmlFor="country">Country *</Label>
                <Select value={formData.country} onValueChange={(value) => setFormData(prev => ({ ...prev, country: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country} value={country}>{country}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                placeholder="Full address"
                rows={2}
              />
            </div>
          </CardContent>
        </Card>

        {/* Data Processing Details */}
        <Card>
          <CardHeader>
            <CardTitle>Data Processing Details</CardTitle>
            <CardDescription>Information about data handling and processing</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Data Categories Processed</Label>
              <p className="text-sm text-muted-foreground mb-3">Select all categories of personal data processed by this third party</p>
              <Select onValueChange={handleDataCategoryAdd}>
                <SelectTrigger>
                  <SelectValue placeholder="Select data categories" />
                </SelectTrigger>
                <SelectContent>
                  {dataCategories.map((category) => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formData.dataCategories.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.dataCategories.map((category) => (
                    <Badge key={category} variant="secondary" className="flex items-center gap-1">
                      {category}
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => handleDataCategoryRemove(category)} 
                      />
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="dataTransferMechanism">Data Transfer Mechanism</Label>
              <Select value={formData.dataTransferMechanism} onValueChange={(value) => setFormData(prev => ({ ...prev, dataTransferMechanism: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select transfer mechanism" />
                </SelectTrigger>
                <SelectContent>
                  {transferMechanisms.map((mechanism) => (
                    <SelectItem key={mechanism} value={mechanism}>{mechanism}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="securityMeasures">Security Measures</Label>
              <Textarea
                id="securityMeasures"
                value={formData.securityMeasures}
                onChange={(e) => setFormData(prev => ({ ...prev, securityMeasures: e.target.value }))}
                placeholder="Describe security measures implemented..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Risk Assessment */}
        <Card>
          <CardHeader>
            <CardTitle>Risk Assessment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Risk Level</Label>
                <Select value={formData.riskLevel} onValueChange={(value) => setFormData(prev => ({ ...prev, riskLevel: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Assess risk level" />
                  </SelectTrigger>
                  <SelectContent>
                    {riskLevels.map((level) => (
                      <SelectItem key={level} value={level.toLowerCase()}>{level}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="gdprCompliant">GDPR Compliant</Label>
                <Switch
                  id="gdprCompliant"
                  checked={formData.gdprCompliant}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, gdprCompliant: checked }))}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contract Information */}
        <Card>
          <CardHeader>
            <CardTitle>Contract Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Contract Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.contractStartDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.contractStartDate ? format(formData.contractStartDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.contractStartDate}
                      onSelect={(date) => setFormData(prev => ({ ...prev, contractStartDate: date }))}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label>Contract End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.contractEndDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.contractEndDate ? format(formData.contractEndDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.contractEndDate}
                      onSelect={(date) => setFormData(prev => ({ ...prev, contractEndDate: date }))}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="dpuSigned">DPU Signed</Label>
                <Switch
                  id="dpuSigned"
                  checked={formData.dpuSigned}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, dpuSigned: checked }))}
                />
              </div>

              {formData.dpuSigned && (
                <div>
                  <Label>DPU Signature Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.dpuDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.dpuDate ? format(formData.dpuDate, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.dpuDate}
                        onSelect={(date) => setFormData(prev => ({ ...prev, dpuDate: date }))}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Documents & Notes */}
        <Card>
          <CardHeader>
            <CardTitle>Documents & Notes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Button variant="outline" className="w-full">
                <Upload className="h-4 w-4 mr-2" />
                Upload Contract
              </Button>
            </div>

            <div>
              <Label htmlFor="notes">Internal Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Add any internal notes about this third party..."
                rows={4}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateThirdParty;