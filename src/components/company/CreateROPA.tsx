
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  Save, 
  Info, 
  Plus,
  X,
  Building,
  Shield,
  Users,
  Globe,
  Clock,
  Lock
} from 'lucide-react';

const CreateROPA = ({ onBack }: { onBack: () => void }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    department: '',
    role: '',
    jointControllers: 'No',
    selectedControllers: [] as string[],
    purpose: '',
    legalBasis: '',
    dataSubjectCategories: [] as string[],
    personalDataCategories: [] as string[],
    specialCategoryData: 'No',
    specialCategoryDetails: '',
    specialCategoryGround: '',
    processingReason: '',
    imSystems: [] as string[],
    vendors: [] as string[],
    internalRecipients: [] as string[],
    externalRecipients: [] as string[],
    internationalTransfers: 'No',
    transferCountries: [] as string[],
    retentionTime: '',
    retentionPeriod: '',
    retentionTrigger: '',
    retentionAction: '',
    justificationType: 'Internal',
    justificationText: '',
    legislation: '',
    securityMeasures: [] as any[]
  });

  const [showNewDepartment, setShowNewDepartment] = useState(false);
  const [showNewIMSystem, setShowNewIMSystem] = useState(false);
  const [showNewMeasure, setShowNewMeasure] = useState(false);

  // Mock data - in real app these would come from API/metadata
  const departments = ['IT', 'HR', 'Marketing', 'Finance', 'Legal', 'Operations'];
  const legalBasisOptions = ['Consent', 'Legal Obligation', 'Legitimate Interest', 'Public Interest', 'Vital Interest'];
  const dataSubjectTypes = ['Customers', 'Employees', 'Suppliers', 'Website Visitors', 'Job Applicants'];
  const personalDataTypes = ['Personal Identifiers', 'Contact Information', 'Financial Data', 'Location Data', 'Technical Data'];
  const specialCategoryGrounds = ['Explicit Consent', 'Employment Law', 'Public Health', 'Legal Claims'];
  const countries = ['United States', 'Canada', 'United Kingdom', 'Germany', 'France', 'Japan'];
  const vendors = ['AWS', 'Microsoft', 'Google', 'Salesforce', 'HubSpot'];
  const recipientTypes = ['Controller', 'Processor', 'Third Party'];
  const measureTypes = ['Managerial', 'Organisational', 'Technical'];
  const implementationStatus = ['Not Started', 'In Progress', 'Implemented', 'Archived'];

  const handleArrayFieldChange = (field: keyof typeof formData, value: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...(prev[field] as string[]), value]
        : (prev[field] as string[]).filter(item => item !== value)
    }));
  };

  const addSecurityMeasure = () => {
    const newMeasure = {
      id: Date.now(),
      name: '',
      description: '',
      type: '',
      status: 'Not Started',
      imSystem: '',
      appointedTo: '',
      deadline: ''
    };
    setFormData(prev => ({
      ...prev,
      securityMeasures: [...prev.securityMeasures, newMeasure]
    }));
  };

  const updateSecurityMeasure = (id: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      securityMeasures: prev.securityMeasures.map(measure => 
        measure.id === id ? { ...measure, [field]: value } : measure
      )
    }));
  };

  const removeSecurityMeasure = (id: number) => {
    setFormData(prev => ({
      ...prev,
      securityMeasures: prev.securityMeasures.filter(measure => measure.id !== id)
    }));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to ROPA
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Create New ROPA</h1>
            <p className="text-gray-600">Record of Processing Activities</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Save className="mr-2 h-4 w-4" />
            Save Draft
          </Button>
          <Button className="bg-teal-600 hover:bg-teal-700">
            Create ROPA
          </Button>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general" className="flex items-center space-x-2">
            <Building className="h-4 w-4" />
            <span>General</span>
          </TabsTrigger>
          <TabsTrigger value="purpose" className="flex items-center space-x-2">
            <Shield className="h-4 w-4" />
            <span>Purpose</span>
          </TabsTrigger>
          <TabsTrigger value="data" className="flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span>Data</span>
          </TabsTrigger>
          <TabsTrigger value="context" className="flex items-center space-x-2">
            <Globe className="h-4 w-4" />
            <span>Context</span>
          </TabsTrigger>
          <TabsTrigger value="retention" className="flex items-center space-x-2">
            <Clock className="h-4 w-4" />
            <span>Retention</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center space-x-2">
            <Lock className="h-4 w-4" />
            <span>Security</span>
          </TabsTrigger>
        </TabsList>

        {/* General Information */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Information</CardTitle>
              <CardDescription>Basic details about the processing activity</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name of Processing Activity *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter processing activity name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <div className="flex space-x-2">
                    <Select
                      value={formData.department}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, department: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map(dept => (
                          <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm" onClick={() => setShowNewDepartment(!showNewDepartment)}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  {showNewDepartment && (
                    <Input placeholder="Add new department" className="mt-2" />
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe the processing activity"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Role in Processing</Label>
                  <Select
                    value={formData.role}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, role: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Controller">Controller</SelectItem>
                      <SelectItem value="Processor">Processor</SelectItem>
                      <SelectItem value="Joint Controller">Joint Controller</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Joint Controllers</Label>
                  <Select
                    value={formData.jointControllers}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, jointControllers: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Yes">Yes</SelectItem>
                      <SelectItem value="No">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {formData.jointControllers === 'Yes' && (
                <div className="space-y-2">
                  <Label>Select Joint Controllers</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium mb-2">Vendors</p>
                      {vendors.map(vendor => (
                        <div key={vendor} className="flex items-center space-x-2 mb-2">
                          <Checkbox
                            id={`vendor-${vendor}`}
                            checked={formData.selectedControllers.includes(vendor)}
                            onCheckedChange={(checked) => handleArrayFieldChange('selectedControllers', vendor, !!checked)}
                          />
                          <Label htmlFor={`vendor-${vendor}`}>{vendor}</Label>
                        </div>
                      ))}
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-2">Departments</p>
                      {departments.map(dept => (
                        <div key={dept} className="flex items-center space-x-2 mb-2">
                          <Checkbox
                            id={`dept-${dept}`}
                            checked={formData.selectedControllers.includes(dept)}
                            onCheckedChange={(checked) => handleArrayFieldChange('selectedControllers', dept, !!checked)}
                          />
                          <Label htmlFor={`dept-${dept}`}>{dept}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Purpose and Legal Basis */}
        <TabsContent value="purpose">
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
        </TabsContent>

        {/* Data Categories */}
        <TabsContent value="data">
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
        </TabsContent>

        {/* Processing Context */}
        <TabsContent value="context">
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
        </TabsContent>

        {/* Retention */}
        <TabsContent value="retention">
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
        </TabsContent>

        {/* Security Measures */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Measures</CardTitle>
              <CardDescription>Technical and organisational measures to protect personal data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-between items-center">
                <Label>Technical and Organisational Measures</Label>
                <Button onClick={addSecurityMeasure} variant="outline" size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Measure
                </Button>
              </div>

              {formData.securityMeasures.map((measure, index) => (
                <Card key={measure.id} className="p-4 bg-gray-50">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-medium">Security Measure #{index + 1}</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSecurityMeasure(measure.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Name *</Label>
                      <Input
                        value={measure.name}
                        onChange={(e) => updateSecurityMeasure(measure.id, 'name', e.target.value)}
                        placeholder="Measure name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Type *</Label>
                      <Select
                        value={measure.type}
                        onValueChange={(value) => updateSecurityMeasure(measure.id, 'type', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          {measureTypes.map(type => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2 col-span-2">
                      <Label>Description *</Label>
                      <Textarea
                        value={measure.description}
                        onChange={(e) => updateSecurityMeasure(measure.id, 'description', e.target.value)}
                        placeholder="Describe the security measure"
                        rows={2}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Implementation Status</Label>
                      <Select
                        value={measure.status}
                        onValueChange={(value) => updateSecurityMeasure(measure.id, 'status', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {implementationStatus.map(status => (
                            <SelectItem key={status} value={status}>{status}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Deadline</Label>
                      <Input
                        type="date"
                        value={measure.deadline}
                        onChange={(e) => updateSecurityMeasure(measure.id, 'deadline', e.target.value)}
                      />
                    </div>
                  </div>
                </Card>
              ))}

              {formData.securityMeasures.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Lock className="mx-auto h-8 w-8 mb-2" />
                  <p>No security measures added yet</p>
                  <p className="text-sm">Click "Add Measure" to add technical and organisational measures</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CreateROPA;
