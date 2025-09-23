import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Building2, ArrowLeft, Check } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface WorkspaceCreationProps {
  onBack?: () => void;
  onSuccess?: (workspaceId: string) => void;
}

interface WorkspaceFormData {
  name: string;
  company_name: string;
  sector: string;
  location: string;
  dpo_name: string;
  dpo_email: string;
  dpo_phone: string;
  supervisory_authority: string;
  registration_number: string;
  website: string;
  module_config: {
    ropa: boolean;
    dpia: boolean;
    dsr: boolean;
    breach: boolean;
    vendor: boolean;
    lia: boolean;
  };
}

const WorkspaceCreation: React.FC<WorkspaceCreationProps> = ({
  onBack,
  onSuccess
}) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<WorkspaceFormData>({
    name: '',
    company_name: '',
    sector: '',
    location: '',
    dpo_name: '',
    dpo_email: '',
    dpo_phone: '',
    supervisory_authority: '',
    registration_number: '',
    website: '',
    module_config: {
      ropa: true,
      dpia: true,
      dsr: true,
      breach: true,
      vendor: true,
      lia: true
    }
  });

  const handleInputChange = (field: keyof Omit<WorkspaceFormData, 'module_config'>, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleModuleToggle = (module: keyof WorkspaceFormData['module_config'], enabled: boolean) => {
    setFormData(prev => ({
      ...prev,
      module_config: {
        ...prev.module_config,
        [module]: enabled
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.company_name) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in workspace name and company name.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    try {
      // For now, we'll use a mock partner ID since authentication isn't implemented yet
      const mockPartnerId = '00000000-0000-0000-0000-000000000001';
      
      const { data, error } = await supabase
        .from('workspaces')
        .insert([{
          partner_id: mockPartnerId,
          ...formData
        }])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Workspace Created",
        description: `${formData.name} has been successfully created.`,
      });

      if (onSuccess && data) {
        onSuccess(data.id);
      }

    } catch (error) {
      console.error('Error creating workspace:', error);
      toast({
        title: "Error",
        description: "Failed to create workspace. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const modules = [
    { key: 'ropa' as const, label: 'Records of Processing Activities (ROPA)', description: 'Article 30 compliance documentation' },
    { key: 'dpia' as const, label: 'Data Protection Impact Assessments', description: 'Article 35 risk assessments' },
    { key: 'dsr' as const, label: 'Data Subject Requests', description: 'Handle individual rights requests' },
    { key: 'breach' as const, label: 'Data Breach Management', description: 'Article 33 & 34 breach notifications' },
    { key: 'vendor' as const, label: 'Third-Party Management', description: 'Vendor compliance and DPAs' },
    { key: 'lia' as const, label: 'Legitimate Interest Assessments', description: 'Article 6(1)(f) balancing tests' }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        {onBack && (
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
        )}
        <div>
          <h1 className="text-3xl font-semibold">Create New Workspace</h1>
          <p className="text-muted-foreground">Set up a new client workspace for GDPR compliance management</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Building2 className="h-5 w-5" />
              <span>Basic Information</span>
            </CardTitle>
            <CardDescription>Essential details about the client company</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Workspace Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="e.g., TechCorp UK"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company_name">Company Name *</Label>
                <Input
                  id="company_name"
                  value={formData.company_name}
                  onChange={(e) => handleInputChange('company_name', e.target.value)}
                  placeholder="e.g., TechCorp Solutions Ltd"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sector">Industry Sector</Label>
                <Input
                  id="sector"
                  value={formData.sector}
                  onChange={(e) => handleInputChange('sector', e.target.value)}
                  placeholder="e.g., Technology, Healthcare"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="e.g., London, UK"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="registration_number">Company Registration</Label>
                <Input
                  id="registration_number"
                  value={formData.registration_number}
                  onChange={(e) => handleInputChange('registration_number', e.target.value)}
                  placeholder="e.g., 12345678"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  placeholder="https://example.com"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* DPO Information */}
        <Card>
          <CardHeader>
            <CardTitle>Data Protection Officer</CardTitle>
            <CardDescription>Contact details for the company's DPO</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dpo_name">DPO Name</Label>
                <Input
                  id="dpo_name"
                  value={formData.dpo_name}
                  onChange={(e) => handleInputChange('dpo_name', e.target.value)}
                  placeholder="e.g., Jane Smith"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dpo_email">DPO Email</Label>
                <Input
                  id="dpo_email"
                  type="email"
                  value={formData.dpo_email}
                  onChange={(e) => handleInputChange('dpo_email', e.target.value)}
                  placeholder="dpo@company.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dpo_phone">DPO Phone</Label>
                <Input
                  id="dpo_phone"
                  value={formData.dpo_phone}
                  onChange={(e) => handleInputChange('dpo_phone', e.target.value)}
                  placeholder="+44 20 1234 5678"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="supervisory_authority">Supervisory Authority</Label>
              <Input
                id="supervisory_authority"
                value={formData.supervisory_authority}
                onChange={(e) => handleInputChange('supervisory_authority', e.target.value)}
                placeholder="e.g., Information Commissioner's Office (ICO)"
              />
            </div>
          </CardContent>
        </Card>

        {/* Module Configuration */}
        <Card>
          <CardHeader>
            <CardTitle>GDPR Modules</CardTitle>
            <CardDescription>Select which compliance modules to enable for this workspace</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {modules.map((module) => (
              <div key={module.key} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <h4 className="font-medium">{module.label}</h4>
                  <p className="text-sm text-muted-foreground">{module.description}</p>
                </div>
                <Switch
                  checked={formData.module_config[module.key]}
                  onCheckedChange={(checked) => handleModuleToggle(module.key, checked)}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-end space-x-4">
          {onBack && (
            <Button type="button" variant="outline" onClick={onBack}>
              Cancel
            </Button>
          )}
          <Button type="submit" disabled={loading} className="gap-2">
            {loading ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            ) : (
              <Check className="h-4 w-4" />
            )}
            Create Workspace
          </Button>
        </div>
      </form>
    </div>
  );
};

export default WorkspaceCreation;