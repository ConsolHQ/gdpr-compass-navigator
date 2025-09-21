import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { 
  Settings, 
  Database, 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  Upload, 
  Download,
  Plus,
  Search,
  Link2
} from 'lucide-react';
import { CopilotPanel } from '@/components/ai/CopilotPanel';
import { ConfidenceBadge } from '@/components/ai/ConfidenceBadge';
import { SourceChip } from '@/components/ai/SourceChip';

export const OrganizationSettings: React.FC = () => {
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  const [copilotContext, setCopilotContext] = useState('');
  const [isSchemaDiscoveryOpen, setIsSchemaDiscoveryOpen] = useState(false);
  
  const [templateSuggestions] = useState([
    {
      id: '1',
      title: 'Add Data Controller Information Section',
      description: 'GDPR requires clear identification of the data controller. This section is missing from your ROPA template.',
      confidence: 'high' as const,
      source: 'GDPR Article 13(1)(a)',
      action: () => console.log('Add controller section')
    },
    {
      id: '2',
      title: 'Include Legal Basis Justification',
      description: 'Your DPIA template should include detailed legal basis justification for each processing activity.',
      confidence: 'medium' as const,
      source: 'GDPR Article 35(7)',
      action: () => console.log('Add legal basis section')
    }
  ]);

  const [detectedFields] = useState([
    {
      name: 'users.email',
      type: 'personal',
      sensitivity: 'medium',
      confidence: 'high' as const,
      category: 'Contact Information',
      suggestedRetention: '2 years after account closure'
    },
    {
      name: 'medical_records.diagnosis',
      type: 'special-category',
      sensitivity: 'critical',
      confidence: 'high' as const,
      category: 'Health Data',
      suggestedRetention: '10 years as per medical law'
    },
    {
      name: 'analytics.user_id',
      type: 'pseudonymous',
      sensitivity: 'low',
      confidence: 'medium' as const,
      category: 'Analytics',
      suggestedRetention: '13 months'
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Organization Settings</h1>
          <p className="text-muted-foreground">Configure your organization's privacy compliance settings</p>
        </div>
      </div>

      <Tabs defaultValue="templates" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="schema-discovery">Schema Discovery</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="policies">Policies</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Template Configuration</h2>
              <p className="text-sm text-muted-foreground">
                AI-powered template optimization for compliance requirements
              </p>
            </div>
            <Button onClick={() => {
              setCopilotContext('template-optimization');
              setIsCopilotOpen(true);
            }}>
              <Settings className="h-4 w-4 mr-2" />
              Template AI Assistant
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  ROPA Template
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Industry Standard Compliance</span>
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                    98% Complete
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <Label>Template Version</Label>
                  <Select defaultValue="gdpr-standard">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gdpr-standard">GDPR Standard v2.1</SelectItem>
                      <SelectItem value="gdpr-healthcare">GDPR Healthcare v1.8</SelectItem>
                      <SelectItem value="gdpr-financial">GDPR Financial v1.5</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Button size="sm" variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Import
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  DPIA Template
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Regulatory Alignment</span>
                  <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                    85% Complete
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <Label>Jurisdiction</Label>
                  <Select defaultValue="eu">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="eu">European Union</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="ch">Switzerland</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Button size="sm" variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Import
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Template Suggestions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
                Template Improvement Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {templateSuggestions.map((suggestion, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h4 className="font-medium">{suggestion.title}</h4>
                      <p className="text-sm text-muted-foreground">{suggestion.description}</p>
                      <div className="flex items-center gap-2">
                        <ConfidenceBadge confidence={suggestion.confidence} size="sm" />
                        <SourceChip 
                          source={{
                            type: 'gdpr-article',
                            reference: suggestion.source
                          }}
                          size="sm"
                        />
                      </div>
                    </div>
                    <Button size="sm" onClick={suggestion.action}>
                      Apply
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schema-discovery" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Schema Discovery</h2>
              <p className="text-sm text-muted-foreground">
                Automatically detect and classify data fields from your systems
              </p>
            </div>
            <Dialog open={isSchemaDiscoveryOpen} onOpenChange={setIsSchemaDiscoveryOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Connect New System
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Connect Database/Storage System</DialogTitle>
                </DialogHeader>
                <SchemaDiscoveryWizard onClose={() => setIsSchemaDiscoveryOpen(false)} />
              </DialogContent>
            </Dialog>
          </div>

          {/* Connected Systems */}
          <Card>
            <CardHeader>
              <CardTitle>Connected Systems</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Database className="h-8 w-8 text-blue-600" />
                    <div>
                      <h4 className="font-medium">PostgreSQL - User Database</h4>
                      <p className="text-sm text-muted-foreground">Last scanned: 2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Connected
                    </Badge>
                    <Button size="sm" variant="outline">
                      Rescan
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Database className="h-8 w-8 text-orange-600" />
                    <div>
                      <h4 className="font-medium">MongoDB - Analytics</h4>
                      <p className="text-sm text-muted-foreground">Last scanned: 1 day ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Connected
                    </Badge>
                    <Button size="sm" variant="outline">
                      Rescan
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detected Fields */}
          <Card>
            <CardHeader>
              <CardTitle>Detected Fields & Classifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {detectedFields.map((field, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <code className="font-mono text-sm bg-muted px-2 py-1 rounded">
                          {field.name}
                        </code>
                        <Badge variant="outline" className={
                          field.type === 'special-category' 
                            ? 'bg-red-50 text-red-700 border-red-200'
                            : field.type === 'personal'
                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                            : 'bg-purple-50 text-purple-700 border-purple-200'
                        }>
                          {field.type.replace('-', ' ').toUpperCase()}
                        </Badge>
                        <ConfidenceBadge confidence={field.confidence} size="sm" />
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Link to Activities
                        </Button>
                        <Button size="sm">
                          Add to Dictionary
                        </Button>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium">Category:</span> {field.category} • 
                      <span className="font-medium ml-2">Suggested Retention:</span> {field.suggestedRetention}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations">
          <Card>
            <CardHeader>
              <CardTitle>System Integrations</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Configure integrations with external systems and APIs.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="policies">
          <Card>
            <CardHeader>
              <CardTitle>Organization Policies</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Define organization-wide privacy policies and guidelines.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <CopilotPanel
        isOpen={isCopilotOpen}
        onClose={() => setIsCopilotOpen(false)}
        title="Template Configuration Assistant"
        context={copilotContext}
        suggestions={templateSuggestions}
      />
    </div>
  );
};

const SchemaDiscoveryWizard: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [connectionType, setConnectionType] = useState('');

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Connection Type</Label>
        <Select value={connectionType} onValueChange={setConnectionType}>
          <SelectTrigger>
            <SelectValue placeholder="Select database type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="postgresql">PostgreSQL</SelectItem>
            <SelectItem value="mysql">MySQL</SelectItem>
            <SelectItem value="mongodb">MongoDB</SelectItem>
            <SelectItem value="snowflake">Snowflake</SelectItem>
            <SelectItem value="bigquery">BigQuery</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Host</Label>
          <Input placeholder="database.example.com" />
        </div>
        <div className="space-y-2">
          <Label>Port</Label>
          <Input placeholder="5432" />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Database Name</Label>
        <Input placeholder="production_db" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Username</Label>
          <Input placeholder="readonly_user" />
        </div>
        <div className="space-y-2">
          <Label>Password</Label>
          <Input type="password" placeholder="••••••••" />
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button>
          <Link2 className="h-4 w-4 mr-2" />
          Connect & Scan
        </Button>
      </div>
    </div>
  );
};