
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Building, Plus, Search, FileText, AlertTriangle, CheckCircle, Clock, Eye, Edit, Link } from 'lucide-react';

const ThirdParties = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const thirdParties = [
    {
      id: 'TP-001',
      name: 'CloudCRM Solutions Ltd',
      type: 'Data Processor',
      category: 'CRM Platform',
      status: 'Active',
      contractStatus: 'Valid',
      relationship: 'Processor',
      dpuSigned: true,
      dpuDate: '2023-06-15',
      contractExpiry: '2025-06-14',
      dataTypes: ['Customer names', 'Email addresses', 'Phone numbers', 'Purchase history'],
      purposes: ['Customer relationship management', 'Sales analytics'],
      location: 'European Union',
      riskLevel: 'Low',
      lastReview: '2024-01-10',
      contact: 'legal@cloudcrm.com',
      website: 'https://cloudcrm.com',
    },
    {
      id: 'TP-002',
      name: 'Global Analytics Inc',
      type: 'Data Processor',
      category: 'Analytics Platform',
      status: 'Active',
      contractStatus: 'Expiring Soon',
      relationship: 'Processor',
      dpuSigned: true,
      dpuDate: '2022-03-20',
      contractExpiry: '2024-03-19',
      dataTypes: ['Website behavior', 'IP addresses', 'Device information'],
      purposes: ['Website analytics', 'User behavior analysis'],
      location: 'United States',
      riskLevel: 'Medium',
      lastReview: '2023-12-15',
      contact: 'privacy@globalanalytics.com',
      website: 'https://globalanalytics.com',
    },
    {
      id: 'TP-003',
      name: 'SecurePay Systems',
      type: 'Data Processor',
      category: 'Payment Processor',
      status: 'Active',
      contractStatus: 'Valid',
      relationship: 'Processor',
      dpuSigned: true,
      dpuDate: '2023-09-10',
      contractExpiry: '2026-09-09',
      dataTypes: ['Payment information', 'Billing addresses', 'Transaction data'],
      purposes: ['Payment processing', 'Fraud prevention'],
      location: 'European Union',
      riskLevel: 'High',
      lastReview: '2024-01-05',
      contact: 'compliance@securepay.com',
      website: 'https://securepay.com',
    },
    {
      id: 'TP-004',
      name: 'MailStream Marketing',
      type: 'Data Processor',
      category: 'Email Marketing',
      status: 'Under Review',
      contractStatus: 'Pending',
      relationship: 'Processor',
      dpuSigned: false,
      dpuDate: null,
      contractExpiry: null,
      dataTypes: ['Email addresses', 'Marketing preferences', 'Engagement data'],
      purposes: ['Email marketing', 'Campaign analytics'],
      location: 'United Kingdom',
      riskLevel: 'Medium',
      lastReview: '2024-01-20',
      contact: 'dpo@mailstream.co.uk',
      website: 'https://mailstream.co.uk',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'default';
      case 'Under Review': return 'secondary';
      case 'Inactive': return 'outline';
      default: return 'outline';
    }
  };

  const getContractStatusColor = (status: string) => {
    switch (status) {
      case 'Valid': return 'default';
      case 'Expiring Soon': return 'destructive';
      case 'Pending': return 'secondary';
      case 'Expired': return 'destructive';
      default: return 'outline';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'High': return 'destructive';
      case 'Medium': return 'default';
      case 'Low': return 'secondary';
      default: return 'outline';
    }
  };

  const filteredThirdParties = thirdParties.filter(tp =>
    tp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tp.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tp.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: thirdParties.length,
    active: thirdParties.filter(tp => tp.status === 'Active').length,
    highRisk: thirdParties.filter(tp => tp.riskLevel === 'High').length,
    expiringContracts: thirdParties.filter(tp => tp.contractStatus === 'Expiring Soon').length,
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div></div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Third Party
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Third Parties</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <Building className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-2xl font-bold text-green-600">{stats.active}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">High Risk</p>
                <p className="text-2xl font-bold text-red-600">{stats.highRisk}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Expiring Contracts</p>
                <p className="text-2xl font-bold text-orange-600">{stats.expiringContracts}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search third parties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Third Parties Table */}
      <Card>
        <CardHeader>
          <CardTitle>Third Party Vendors</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Contract Status</TableHead>
                <TableHead>Risk Level</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>DPA Signed</TableHead>
                <TableHead>Data Types</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredThirdParties.map((tp) => (
                <TableRow key={tp.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{tp.name}</div>
                      <div className="text-sm text-gray-500">{tp.id}</div>
                    </div>
                  </TableCell>
                  <TableCell>{tp.category}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(tp.status)}>{tp.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getContractStatusColor(tp.contractStatus)}>
                      {tp.contractStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getRiskColor(tp.riskLevel)}>
                      {tp.riskLevel}
                    </Badge>
                  </TableCell>
                  <TableCell>{tp.location}</TableCell>
                  <TableCell>
                    <Badge variant={tp.dpuSigned ? 'default' : 'destructive'}>
                      {tp.dpuSigned ? 'Yes' : 'No'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {tp.dataTypes.slice(0, 2).map((type, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {type}
                        </Badge>
                      ))}
                      {tp.dataTypes.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{tp.dataTypes.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Link className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {filteredThirdParties.length === 0 && (
        <Card>
          <CardContent className="py-8 text-center">
            <Building className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-lg font-medium">No third parties found</h3>
            <p className="text-gray-600">Add your first third-party processor or vendor.</p>
            <Button className="mt-4">
              <Plus className="mr-2 h-4 w-4" />
              Add Third Party
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ThirdParties;
