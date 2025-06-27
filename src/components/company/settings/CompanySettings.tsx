
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Building, Users, Database, Book, BarChart, Settings, Globe, MapPin } from 'lucide-react';

const CompanySettings = () => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Company Settings</h1>
        <p className="text-gray-600 mt-2">Configure your company's GDPR compliance settings</p>
      </div>

      <Tabs defaultValue="organization" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="organization">Organization</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="metadata">Meta Data</TabsTrigger>
          <TabsTrigger value="dictionary">Data Dictionary</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
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
      </Tabs>
    </div>
  );
};

export default CompanySettings;
