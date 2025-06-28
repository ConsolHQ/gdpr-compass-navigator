
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
  Clock,
  Building2,
  User,
  Shield
} from 'lucide-react';
import CreateROPA from './CreateROPA';

const ROPA = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentView, setCurrentView] = useState('main');
  const [showCreateForm, setShowCreateForm] = useState(false);
  
  const ropaEntries = [
    {
      id: 'ROPA-001',
      name: 'Customer Data Management',
      description: 'Processing customer information for service delivery and support',
      department: 'Customer Service',
      status: 'Active',
      role: 'Controller',
      legalBasis: 'Legitimate Interest',
      dataSubjects: 'Customers',
      personalDataCategories: 'Contact Info, Transaction Data',
      specialCategory: false,
      lastUpdated: '2024-01-15',
      owner: 'Sarah Johnson',
      progress: 85,
    },
    {
      id: 'ROPA-002',
      name: 'Employee HR Records',
      description: 'Managing employee personal data for HR purposes',
      department: 'Human Resources',
      status: 'Active',
      role: 'Controller',
      legalBasis: 'Contract',
      dataSubjects: 'Employees',
      personalDataCategories: 'Personal Details, Employment Data',
      specialCategory: true,
      lastUpdated: '2024-01-12',
      owner: 'Mike Chen',
      progress: 92,
    },
    {
      id: 'ROPA-003',
      name: 'Marketing Analytics',
      description: 'Website visitor tracking and marketing analysis',
      department: 'Marketing',
      status: 'Review Required',
      role: 'Controller',
      legalBasis: 'Consent',
      dataSubjects: 'Website Visitors',
      personalDataCategories: 'Behavioral Data, IP Addresses',
      specialCategory: false,
      lastUpdated: '2023-12-20',
      owner: 'Emma Davis',
      progress: 67,
    },
    {
      id: 'ROPA-004',
      name: 'Vendor Management',
      description: 'Managing vendor and supplier information',
      department: 'Procurement',
      status: 'Draft',
      role: 'Processor',
      legalBasis: 'Legitimate Interest',
      dataSubjects: 'Business Contacts',
      personalDataCategories: 'Contact Information',
      specialCategory: false,
      lastUpdated: '2024-01-08',
      owner: 'Alex Thompson',
      progress: 43,
    },
    {
      id: 'ROPA-005',
      name: 'Customer Support Tickets',
      description: 'Processing customer support requests and communications',
      department: 'Support',
      status: 'Active',
      role: 'Controller',
      legalBasis: 'Contract',
      dataSubjects: 'Customers',
      personalDataCategories: 'Contact Info, Support History',
      specialCategory: false,
      lastUpdated: '2024-01-10',
      owner: 'Lisa Wang',
      progress: 78,
    },
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      'Active': 'default',
      'Review Required': 'secondary',
      'Draft': 'outline'
    } as const;
    
    return (
      <Badge variant={variants[status as keyof typeof variants] || 'outline'} className="text-xs">
        {status}
      </Badge>
    );
  };

  const getRoleIcon = (role: string) => {
    return role === 'Controller' ? 
      <Shield className="h-4 w-4 text-blue-600" /> : 
      <User className="h-4 w-4 text-gray-600" />;
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const filteredEntries = ropaEntries.filter(entry =>
    entry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.owner.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const availableViews = [
    { id: 'main', label: 'Main view' },
    { id: 'simple', label: 'Simple view' },
    { id: 'extended', label: 'Extended view' }
  ];

  if (showCreateForm) {
    return <CreateROPA onBack={() => setShowCreateForm(false)} />;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Register of Processing Activities</h1>
          <p className="text-gray-600 mt-1">{filteredEntries.length} processing activities</p>
        </div>
        <Button 
          className="bg-teal-600 hover:bg-teal-700"
          onClick={() => setShowCreateForm(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Create New ROPA
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
              placeholder="Search processing activities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-80"
            />
          </div>
          <Button variant="ghost" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="ghost" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Enhanced Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-b bg-gray-50">
                <TableHead className="w-12">
                  <input type="checkbox" className="rounded" />
                </TableHead>
                <TableHead className="font-semibold">Processing Activity</TableHead>
                <TableHead className="font-semibold">Department</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold">Role</TableHead>
                <TableHead className="font-semibold">Legal Basis</TableHead>
                <TableHead className="font-semibold">Data Subjects</TableHead>
                <TableHead className="font-semibold">Special Category</TableHead>
                <TableHead className="font-semibold">Progress</TableHead>
                <TableHead className="font-semibold">Owner</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEntries.map((entry) => (
                <TableRow key={entry.id} className="hover:bg-gray-50 transition-colors">
                  <TableCell>
                    <input type="checkbox" className="rounded" />
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <div className="space-y-1">
                      <div className="font-medium text-gray-900">{entry.name}</div>
                      <div className="text-sm text-gray-500 truncate">{entry.description}</div>
                      <div className="text-xs text-gray-400">ID: {entry.id}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Building2 className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{entry.department}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(entry.status)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getRoleIcon(entry.role)}
                      <span className="text-sm">{entry.role}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{entry.legalBasis}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{entry.dataSubjects}</span>
                  </TableCell>
                  <TableCell className="text-center">
                    {entry.specialCategory ? (
                      <AlertCircle className="h-4 w-4 text-amber-500 mx-auto" title="Special category data processed" />
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getProgressColor(entry.progress)}`}
                          style={{ width: `${entry.progress}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600 min-w-[3rem]">{entry.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{entry.owner}</span>
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

      {/* Empty State */}
      {filteredEntries.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No processing activities found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm ? 'Try adjusting your search terms.' : 'Get started by creating your first ROPA entry.'}
            </p>
            {!searchTerm && (
              <Button onClick={() => setShowCreateForm(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Create New ROPA
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ROPA;
