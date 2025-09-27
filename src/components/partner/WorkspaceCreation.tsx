import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface WorkspaceCreationProps {
  onWorkspaceCreated?: (workspaceId: string) => void;
  onCancel?: () => void;
}

export const WorkspaceCreation = ({ onWorkspaceCreated, onCancel }: WorkspaceCreationProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company_name: "",
    sector: "",
    location: "",
    dpo_name: "",
    dpo_email: "",
    dpo_phone: "",
    supervisory_authority: "",
    registration_number: "",
    website: "",
    module_config: {
      ropa: true,
      dpia: true,
      dsr: true,
      breach: true,
      vendor: true,
      lia: true
    }
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleModuleToggle = (module: string, enabled: boolean) => {
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
    setLoading(true);

    try {
      // For demo purposes, we'll create with a mock partner_id
      // In a real app, this would come from the authenticated user's context
      const mockPartnerId = "00000000-0000-4000-8000-000000000001";

      const { data, error } = await (supabase as any)
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
        description: `${formData.company_name} workspace has been created successfully.`,
      });

      onWorkspaceCreated?.(data?.id);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create workspace",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const sectors = [
    "Technology",
    "Healthcare",
    "Finance",
    "Education",
    "Manufacturing",
    "Retail",
    "Professional Services",
    "Government",
    "Non-profit",
    "Other"
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Create New Workspace</CardTitle>
          <CardDescription>
            Set up a new client company workspace with GDPR compliance modules
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Workspace Name</Label>
                <Input
                  id="name"
                  placeholder="Internal workspace name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company_name">Company Name</Label>
                <Input
                  id="company_name"
                  placeholder="Client company name"
                  value={formData.company_name}
                  onChange={(e) => handleInputChange("company_name", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="sector">Industry Sector</Label>
                <Select value={formData.sector} onValueChange={(value) => handleInputChange("sector", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select sector" />
                  </SelectTrigger>
                  <SelectContent>
                    {sectors.map((sector) => (
                      <SelectItem key={sector} value={sector.toLowerCase()}>
                        {sector}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="Company location"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                />
              </div>
            </div>

            {/* DPO Information */}
            <div>
              <h3 className="text-lg font-medium mb-4">Data Protection Officer</h3>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="dpo_name">DPO Name</Label>
                  <Input
                    id="dpo_name"
                    placeholder="DPO full name"
                    value={formData.dpo_name}
                    onChange={(e) => handleInputChange("dpo_name", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dpo_email">DPO Email</Label>
                  <Input
                    id="dpo_email"
                    type="email"
                    placeholder="dpo@company.com"
                    value={formData.dpo_email}
                    onChange={(e) => handleInputChange("dpo_email", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dpo_phone">DPO Phone</Label>
                  <Input
                    id="dpo_phone"
                    placeholder="Phone number"
                    value={formData.dpo_phone}
                    onChange={(e) => handleInputChange("dpo_phone", e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Additional Details */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="supervisory_authority">Supervisory Authority</Label>
                <Input
                  id="supervisory_authority"
                  placeholder="e.g., ICO, CNIL, etc."
                  value={formData.supervisory_authority}
                  onChange={(e) => handleInputChange("supervisory_authority", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="registration_number">Registration Number</Label>
                <Input
                  id="registration_number"
                  placeholder="Company registration number"
                  value={formData.registration_number}
                  onChange={(e) => handleInputChange("registration_number", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                placeholder="https://company.com"
                value={formData.website}
                onChange={(e) => handleInputChange("website", e.target.value)}
              />
            </div>

            {/* Module Configuration */}
            <div>
              <h3 className="text-lg font-medium mb-4">GDPR Modules</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {Object.entries(formData.module_config).map(([module, enabled]) => (
                  <div key={module} className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium capitalize">
                        {module.toUpperCase()}
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        {module === 'ropa' && 'Record of Processing Activities'}
                        {module === 'dpia' && 'Data Protection Impact Assessment'}
                        {module === 'dsr' && 'Data Subject Requests'}
                        {module === 'breach' && 'Data Breach Management'}
                        {module === 'vendor' && 'Third Party Management'}
                        {module === 'lia' && 'Legitimate Interest Assessment'}
                      </p>
                    </div>
                    <Switch
                      checked={enabled}
                      onCheckedChange={(checked) => handleModuleToggle(module, checked)}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Creating..." : "Create Workspace"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};