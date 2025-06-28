
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  FileText, 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  MoreHorizontal,
  Settings,
  CheckCircle,
  AlertCircle,
  Clock
} from 'lucide-react';

const ROPA = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentView, setCurrentView] = useState('main');
  const [selectedColumns, setSelectedColumns] = useState([
    'name', 'progress', 'organizationalUnits', 'internalOwner', 'legalBasis', 'role', 'sensitiveData'
  ]);
  
  const ropaEntries = [
    {
      id: 'ROPA-001',
      name: 'Interviewing people',
      progress: 71,
      organizationalUnits: ['Responsum BE', 'Responsum - EU', 'Show more'],
      internalOwner: 'Stephanie',
      legalBasis: 'Legitimate interest',
      role: 'Controller',
      sensitiveData: true,
      status: 'Active',
      lastUpdated: '2024-01-15',
      purpose: 'Customer relationship management and service delivery',
      dataCategories: ['Personal identifiers', 'Contact information', 'Transaction data'],
      retention: '7 years',
      dataSubjects: 'Customers, prospects',
      thirdParties: 'CRM provider, Email service',
    },
    {
      id: 'ROPA-002',
      name: 'Website Analytics',
      progress: 71,
      organizationalUnits: ['Marketing', 'Internal IT'],
      internalOwner: '',
      legalBasis: 'Consent',
      role: 'Controller',
      sensitiveData: false,
      status: 'Review Required',
      lastUpdated: '2023-12-20',
      purpose: 'Website performance tracking and user behavior analysis',
      dataCategories: ['Behavioral data', 'Technical data'],
      retention: '2 years',
      dataSubjects: 'Website visitors',
      thirdParties: 'Analytics provider',
    },
    {
      id: 'ROPA-003',
      name: 'Benefits: GSM',
      progress: 57,
      organizationalUnits: ['Responsum - EU', 'CRM'],
      internalOwner: '-',
      legalBasis: 'Contract',
      role: 'Controller',
      sensitiveData: false,
      status: 'Draft',
      lastUpdated: '2024-01-10',
      purpose: 'Employee benefits management',
      dataCategories: ['Employment data', 'Contact information'],
      retention: '5 years',
      dataSubjects: 'Employees',
      thirdParties: 'Benefits provider',
    },
    {
      id: 'ROPA-004',
      name: 'Employee Contract signing',
      progress: 71,
      organizationalUnits: ['Responsum BE', 'Responsum - EU', 'Show more'],
      internalOwner: 'Alex',
      legalBasis: 'Legitimate interest',
      role: 'Controller',
      sensitiveData: false,
      status: 'Active',
      lastUpdated: '2024-01-12',
      purpose: 'Employee contract management and HR processes',
      dataCategories: ['Personal identifiers', 'Employment data'],
      retention: '10 years',
      dataSubjects: 'Employees, job applicants',
      thirdParties: 'HR system provider',
    },
    {
      id: 'ROPA-005',
      name: 'Whistle Blowing process',
      progress: 57,
      organizationalUnits: ['Responsum BE/Accounting', 'Personeelsbeleid'],
      internalOwner: 'Mofe Tonweh (mofe@res...)',
      legalBasis: 'Legal obligation',
      role: 'Processor',
      sensitiveData: true,
      status: 'Review Required',
      lastUpdated: '2024-01-08',
      purpose: 'Whistleblowing and compliance reporting',
      dataCategories: ['Personal identifiers', 'Sensitive data'],
      retention: '7 years',
      dataSubjects: 'Employees, third parties',
      thirdParties: 'Legal counsel, Compliance platform',
    },
  ];

  const getProgressColor = (progress: number) => {
    if (progress >= 70) return 'bg-green-500';
    if (progress >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'Review Required': return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'Draft': return <Clock className="h-4 w-4 text-gray-500" />;
      default: return null;
    }
  };

  const filteredEntries = ropaEntries.filter(entry =>
    entry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.purpose.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.internalOwner.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const availableViews = [
    { id: 'main', label: 'Main view' },
    { id: 'simple', label: 'Simple view' },
    { id: 'extended', label: 'Extended view' }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Register of processing activities</h1>
          <p className="text-gray-600 mt-1">{filteredEntries.length} items</p>
        </div>
        <Button className="bg-teal-600 hover:bg-teal-700">
          <Plus className="mr-2 h-4 w-4" />
          Create
        </Button>
      </div>

      {/* View Tabs and Filters */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Tabs value={currentView} onValueChange={setCurrentView} className="w-auto">
            <TabsList className="bg-gray-100">
              {availableViews.map((view) => (
                <TabsTrigger key={view.id} value={view.id} className="text-sm">
                  {view.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <Button variant="ghost" size="sm" className="text-gray-600">
            <Plus className="mr-2 h-4 w-4" />
            Add view
          </Button>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Button variant="ghost" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Add filter
          </Button>
          <Button variant="ghost" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-b">
                <TableHead className="w-12">
                  <input type="checkbox" className="rounded" />
                </TableHead>
                <TableHead className="font-medium">Name</TableHead>
                <TableHead className="font-medium">Progress</TableHead>
                <TableHead className="font-medium">Organizational units</TableHead>
                <TableHead className="font-medium">Internal owner</TableHead>
                <TableHead className="font-medium">Legal basis for processing</TableHead>
                <TableHead className="font-medium">Role in the processing activity</TableHead>
                <TableHead className="font-medium">Are sensitive data processed?</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEntries.map((entry) => (
                <TableRow key={entry.id} className="hover:bg-gray-50">
                  <TableCell>
                    <input type="checkbox" className="rounded" />
                  </TableCell>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(entry.status)}
                      <span>{entry.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getProgressColor(entry.progress)}`}
                          style={{ width: `${entry.progress}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600">{entry.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {entry.organizationalUnits.slice(0, 2).map((unit, index) => (
                        <div key={index} className="text-sm">
                          {unit}
                          {unit.includes('Show more') && (
                            <span className="text-blue-600 cursor-pointer"> {unit}</span>
                          )}
                        </div>
                      ))}
                      {entry.organizationalUnits.length > 2 && (
                        <button className="text-sm text-blue-600 hover:underline">
                          Show more
                        </button>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">
                      {entry.internalOwner || '-'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{entry.legalBasis}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {entry.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center">
                      {entry.sensitiveData ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

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
