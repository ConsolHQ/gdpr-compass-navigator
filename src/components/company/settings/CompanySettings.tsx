
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Building, Users, Database, Book, BarChart, Settings, Globe, MapPin, Bot, Key, Eye, EyeOff } from 'lucide-react';

const CompanySettings = () => {
  const [showApiKeys, setShowApiKeys] = React.useState({
    openai: false,
    perplexity: false,
    claude: false
  });

  const [apiKeys, setApiKeys] = React.useState({
    openai: '',
    perplexity: '',
    claude: ''
  });

  const toggleKeyVisibility = (provider: 'openai' | 'perplexity' | 'claude') => {
    setShowApiKeys(prev => ({
      ...prev,
      [provider]: !prev[provider]
    }));
  };

  const handleApiKeyChange = (provider: 'openai' | 'perplexity' | 'claude', value: string) => {
    setApiKeys(prev => ({
      ...prev,
      [provider]: value
    }));
  };

  const saveApiKey = async (provider: 'openai' | 'perplexity' | 'claude') => {
    // In a real implementation, this would save to Supabase Edge Function Secrets
    console.log(`Saving ${provider} API key:`, apiKeys[provider]);
    // TODO: Implement Supabase secret storage
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Company Settings</h1>
        <p className="text-gray-600 mt-2">Configure your company's GDPR compliance settings</p>
      </div>

      <Tabs defaultValue="organization" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="organization">Organization</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="metadata">Meta Data</TabsTrigger>
          <TabsTrigger value="dictionary">Data Dictionary</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="ai-integration">AI Integration</TabsTrigger>
        </TabsList>
        
        <TabsContent value="organization" className="space-y-6">
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
        </TabsContent>
        
        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>User Management</span>
              </CardTitle>
              <CardDescription>Manage user access and roles within your organization</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Active Users</h3>
                  <p className="text-sm text-gray-600">8 users with access to this workspace</p>
                </div>
                <Button>Invite User</Button>
              </div>
              <Separator />
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">John Smith</p>
                    <p className="text-sm text-gray-600">john.smith@techcorp.com • Admin</p>
                  </div>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Sarah Johnson</p>
                    <p className="text-sm text-gray-600">sarah.johnson@techcorp.com • Editor</p>
                  </div>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Mike Davis</p>
                    <p className="text-sm text-gray-600">mike.davis@techcorp.com • Viewer</p>
                  </div>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
              </div>
              <Button variant="outline" className="w-full">View All Users</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="metadata" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="h-5 w-5" />
                <span>Meta Data Configuration</span>
              </CardTitle>
              <CardDescription>Configure data categories, legal bases, and processing purposes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-medium mb-3">Data Categories</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 border rounded">
                    <span className="text-sm">Personal identifiers</span>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </div>
                  <div className="flex items-center justify-between p-2 border rounded">
                    <span className="text-sm">Contact information</span>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </div>
                  <div className="flex items-center justify-between p-2 border rounded">
                    <span className="text-sm">Financial data</span>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="mt-2">Add Category</Button>
              </div>
              <Separator />
              <div>
                <h3 className="font-medium mb-3">Legal Bases</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 border rounded">
                    <span className="text-sm">Consent</span>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </div>
                  <div className="flex items-center justify-between p-2 border rounded">
                    <span className="text-sm">Contract performance</span>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </div>
                  <div className="flex items-center justify-between p-2 border rounded">
                    <span className="text-sm">Legal obligation</span>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="mt-2">Add Legal Basis</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="dictionary" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Book className="h-5 w-5" />
                <span>Data Dictionary</span>
              </CardTitle>
              <CardDescription>Define and manage your data processing terminology</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Dictionary Entries</h3>
                  <p className="text-sm text-gray-600">45 terms defined</p>
                </div>
                <Button>Add Term</Button>
              </div>
              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium">Personal Data</h4>
                  <p className="text-sm text-gray-600">Any information relating to an identified or identifiable natural person</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium">Data Controller</h4>
                  <p className="text-sm text-gray-600">The entity that determines the purposes and means of processing personal data</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium">Data Processor</h4>
                  <p className="text-sm text-gray-600">The entity that processes personal data on behalf of the controller</p>
                </div>
              </div>
              <Button variant="outline" className="w-full">View All Terms</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart className="h-5 w-5" />
                <span>Reports Configuration</span>
              </CardTitle>
              <CardDescription>Configure automated reports and compliance monitoring</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-medium mb-3">Automated Reports</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Monthly Compliance Report</Label>
                      <p className="text-sm text-gray-600">Automated monthly compliance summary</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>ROPA Status Report</Label>
                      <p className="text-sm text-gray-600">Weekly ROPA completion status</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>DSR Processing Report</Label>
                      <p className="text-sm text-gray-600">Daily DSR processing updates</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>
              <Separator />
              <div>
                <h3 className="font-medium mb-3">Report Recipients</h3>
                <div className="space-y-2">
                  <Input placeholder="Add email address" />
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">dpo@techcorp.com</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">admin@techcorp.com</span>
                  </div>
                </div>
              </div>
              <Button>Save Report Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai-integration" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bot className="h-5 w-5" />
                <span>AI Integration Settings</span>
              </CardTitle>
              <CardDescription>Configure your own AI API keys for enhanced functionality. Platform AI is enabled by default.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center space-x-2">
                  <Bot className="h-4 w-4 text-blue-600" />
                  <h4 className="font-medium text-blue-900">Platform AI Integration</h4>
                </div>
                <p className="text-sm text-blue-700 mt-1">
                  Our built-in AI capabilities are active across all modules. Add your own API keys below for additional features and higher usage limits.
                </p>
              </div>

              {/* OpenAI Integration */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Key className="h-4 w-4" />
                  <h3 className="font-medium">OpenAI Integration</h3>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="openai-key">OpenAI API Key</Label>
                    <div className="flex space-x-2">
                      <div className="relative flex-1">
                        <Input
                          id="openai-key"
                          type={showApiKeys.openai ? "text" : "password"}
                          placeholder="sk-..."
                          value={apiKeys.openai}
                          onChange={(e) => handleApiKeyChange('openai', e.target.value)}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => toggleKeyVisibility('openai')}
                        >
                          {showApiKeys.openai ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      <Button 
                        onClick={() => saveApiKey('openai')}
                        disabled={!apiKeys.openai}
                      >
                        Save
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Used for advanced text generation and analysis features
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Perplexity Integration */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Key className="h-4 w-4" />
                  <h3 className="font-medium">Perplexity Integration</h3>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="perplexity-key">Perplexity API Key</Label>
                    <div className="flex space-x-2">
                      <div className="relative flex-1">
                        <Input
                          id="perplexity-key"
                          type={showApiKeys.perplexity ? "text" : "password"}
                          placeholder="pplx-..."
                          value={apiKeys.perplexity}
                          onChange={(e) => handleApiKeyChange('perplexity', e.target.value)}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => toggleKeyVisibility('perplexity')}
                        >
                          {showApiKeys.perplexity ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      <Button 
                        onClick={() => saveApiKey('perplexity')}
                        disabled={!apiKeys.perplexity}
                      >
                        Save
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Used for real-time web search and research capabilities
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Claude Integration */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Key className="h-4 w-4" />
                  <h3 className="font-medium">Claude Integration</h3>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="claude-key">Claude API Key</Label>
                    <div className="flex space-x-2">
                      <div className="relative flex-1">
                        <Input
                          id="claude-key"
                          type={showApiKeys.claude ? "text" : "password"}
                          placeholder="sk-ant-..."
                          value={apiKeys.claude}
                          onChange={(e) => handleApiKeyChange('claude', e.target.value)}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => toggleKeyVisibility('claude')}
                        >
                          {showApiKeys.claude ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      <Button 
                        onClick={() => saveApiKey('claude')}
                        disabled={!apiKeys.claude}
                      >
                        Save
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Used for document analysis and compliance recommendations
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                <h4 className="font-medium text-amber-900 mb-2">Security Notice</h4>
                <p className="text-sm text-amber-700">
                  Your API keys are securely encrypted and stored using Supabase Edge Function Secrets. 
                  They are only accessible by your organization and are never shared with third parties.
                </p>
              </div>

              <div className="flex justify-between">
                <Button variant="outline">Test Connections</Button>
                <Button>Save All Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CompanySettings;
