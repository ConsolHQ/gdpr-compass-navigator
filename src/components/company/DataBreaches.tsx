
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertTriangle, Plus, Search, Clock, CheckCircle, Shield, Eye, Edit, FileText } from 'lucide-react';

interface DataBreachesProps {
  onNavigate?: (path: string) => void;
}

const DataBreaches: React.FC<DataBreachesProps> = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const breachIncidents = [
    {
      id: 'BREACH-001',
      title: 'Email Database Exposure',
      description: 'Unauthorized access to customer email database through compromised admin account',
      severity: 'High',
      status: 'Under Investigation',
      reportedDate: '2024-01-22',
      discoveredDate: '2024-01-21',
      affectedRecords: 1250,
      dataTypes: ['Email addresses', 'Names', 'Phone numbers'],
      reportedToAuthority: true,
      authorityReportDate: '2024-01-22',
      dataSubjectsNotified: false,
      investigator: 'Sarah Johnson',
      containmentStatus: 'In Progress',
      riskAssessment: 'Medium likelihood of harm',
    },
    {
      id: 'BREACH-002',
      title: 'Laptop Theft - HR Department',
      description: 'Company laptop containing employee data stolen from HR office',
      severity: 'Medium',
      status: 'Contained',
      reportedDate: '2024-01-15',
      discoveredDate: '2024-01-15',
      affectedRecords: 85,
      dataTypes: ['Employee records', 'Social security numbers', 'Bank details'],
      reportedToAuthority: true,
      authorityReportDate: '2024-01-16',
      dataSubjectsNotified: true,
      investigator: 'Mike Davis',
      containmentStatus: 'Complete',
      riskAssessment: 'Low likelihood of harm - encrypted device',
    },
    {
      id: 'BREACH-003',
      title: 'Website Form Vulnerability',
      description: 'SQL injection vulnerability exposed customer contact information',
      severity: 'Low',
      status: 'Resolved',
      reportedDate: '2024-01-10',
      discoveredDate: '2024-01-09',
      affectedRecords: 45,
      dataTypes: ['Contact forms', 'Email addresses', 'Message content'],
      reportedToAuthority: false,
      authorityReportDate: null,
      dataSubjectsNotified: true,
      investigator: 'John Smith',
      containmentStatus: 'Complete',
      riskAssessment: 'Minimal risk - limited data exposure',
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return 'destructive';
      case 'Medium': return 'default';
      case 'Low': return 'secondary';
      default: return 'outline';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Resolved': return 'default';
      case 'Contained': return 'secondary';
      case 'Under Investigation': return 'destructive';
      default: return 'outline';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Resolved': return CheckCircle;
      case 'Under Investigation': return AlertTriangle;
      default: return Clock;
    }
  };

  const filteredBreaches = breachIncidents.filter(breach =>
    breach.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    breach.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: breachIncidents.length,
    highSeverity: breachIncidents.filter(b => b.severity === 'High').length,
    underInvestigation: breachIncidents.filter(b => b.status === 'Under Investigation').length,
    resolved: breachIncidents.filter(b => b.status === 'Resolved').length,
  };

  const handleReportBreach = () => {
    if (onNavigate) {
      onNavigate('/company/breaches/report');
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Data Breaches</h1>
          <p className="text-gray-600 mt-2">Manage and track data breach incidents and regulatory reporting</p>
        </div>
        <Button className="bg-red-600 hover:bg-red-700" onClick={handleReportBreach}>
          <Plus className="mr-2 h-4 w-4" />
          Report Breach
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Incidents</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">High Severity</p>
                <p className="text-2xl font-bold text-red-600">{stats.highSeverity}</p>
              </div>
              <Shield className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Under Investigation</p>
                <p className="text-2xl font-bold text-orange-600">{stats.underInvestigation}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Resolved</p>
                <p className="text-2xl font-bold text-green-600">{stats.resolved}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
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
              placeholder="Search breach incidents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Breaches Table */}
      <Card>
        <CardHeader>
          <CardTitle>Breach Incidents</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Incident</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Affected Records</TableHead>
                <TableHead>Discovered</TableHead>
                <TableHead>Investigator</TableHead>
                <TableHead>Authority Reported</TableHead>
                <TableHead>Data Types</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBreaches.map((breach) => {
                const StatusIcon = getStatusIcon(breach.status);
                return (
                  <TableRow key={breach.id} className="border-l-4 border-l-red-500">
                    <TableCell>
                      <div>
                        <div className="font-medium">{breach.title}</div>
                        <div className="text-sm text-gray-500">{breach.id}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(breach.status)}>
                        <StatusIcon className="mr-1 h-3 w-3" />
                        {breach.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getSeverityColor(breach.severity)}>
                        {breach.severity}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="font-semibold text-red-600">
                        {breach.affectedRecords.toLocaleString()}
                      </div>
                    </TableCell>
                    <TableCell>{breach.discoveredDate}</TableCell>
                    <TableCell>{breach.investigator}</TableCell>
                    <TableCell>
                      <Badge variant={breach.reportedToAuthority ? 'default' : 'destructive'}>
                        {breach.reportedToAuthority ? 'Yes' : 'No'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {breach.dataTypes.slice(0, 2).map((type, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {type}
                          </Badge>
                        ))}
                        {breach.dataTypes.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{breach.dataTypes.length - 2}
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
                          <FileText className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {filteredBreaches.length === 0 && (
        <Card>
          <CardContent className="py-8 text-center">
            <Shield className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-lg font-medium">No breach incidents found</h3>
            <p className="text-gray-600">Breach incidents will be tracked here when reported.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DataBreaches;
