
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Plus, Search, Filter, Eye, Edit, Trash2 } from 'lucide-react';

const ROPA = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const ropaEntries = [
    {
      id: 'ROPA-001',
      title: 'Customer Data Processing',
      purpose: 'Customer relationship management and service delivery',
      dataCategories: ['Personal identifiers', 'Contact information', 'Transaction data'],
      legalBasis: 'Contract performance',
      retention: '7 years',
      status: 'Active',
      lastUpdated: '2024-01-15',
      dataSubjects: 'Customers, prospects',
      thirdParties: 'CRM provider, Email service',
    },
    {
      id: 'ROPA-002', 
      title: 'Employee HR Processing',
      purpose: 'Human resources management and payroll',
      dataCategories: ['Personal identifiers', 'Employment data', 'Financial data'],
      legalBasis: 'Legal obligation',
      retention: '10 years',
      status: 'Review Required',
      lastUpdated: '2023-12-20',
      dataSubjects: 'Employees, job applicants',
      thirdParties: 'Payroll provider, Background check service',
    },
    {
      id: 'ROPA-003',
      title: 'Marketing Communications',
      purpose: 'Direct marketing and newsletter distribution',
      dataCategories: ['Contact information', 'Behavioral data'],
      legalBasis: 'Consent',
      retention: '2 years or until withdrawal',
      status: 'Draft',
      lastUpdated: '2024-01-10',
      dataSubjects: 'Subscribers, website visitors',
      thirdParties: 'Email marketing platform, Analytics provider',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'default';
      case 'Review Required': return 'destructive';
      case 'Draft': return 'secondary';
      default: return 'outline';
    }
  };

  const filteredEntries = ropaEntries.filter(entry =>
    entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.purpose.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Records of Processing Activities</h1>
          <p className="text-gray-600 mt-2">Manage your data processing activities and compliance records</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New ROPA Entry
        </Button>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search ROPA entries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* ROPA Entries */}
      <div className="space-y-4">
        {filteredEntries.map((entry) => (
          <Card key={entry.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-3">
                    <CardTitle className="text-lg">{entry.title}</CardTitle>
                    <Badge variant={getStatusColor(entry.status)}>{entry.status}</Badge>
                  </div>
                  <CardDescription className="mt-2">{entry.purpose}</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="overview" className="w-full">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="data">Data Details</TabsTrigger>
                  <TabsTrigger value="legal">Legal Basis</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">ROPA ID</label>
                      <p className="text-sm">{entry.id}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Last Updated</label>
                      <p className="text-sm">{entry.lastUpdated}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Data Subjects</label>
                      <p className="text-sm">{entry.dataSubjects}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Retention Period</label>
                      <p className="text-sm">{entry.retention}</p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="data" className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Data Categories</label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {entry.dataCategories.map((category, index) => (
                        <Badge key={index} variant="outline">{category}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Third Parties</label>
                    <p className="text-sm mt-1">{entry.thirdParties}</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="legal" className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Legal Basis</label>
                    <p className="text-sm mt-1">{entry.legalBasis}</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEntries.length === 0 && (
        <Card>
          <CardContent className="py-8 text-center">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-lg font-medium">No ROPA entries found</h3>
            <p className="text-gray-600">Get started by creating your first ROPA entry.</p>
            <Button className="mt-4">
              <Plus className="mr-2 h-4 w-4" />
              Create ROPA Entry
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ROPA;
