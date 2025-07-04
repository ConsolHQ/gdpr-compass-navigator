
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Shield, Plus, Search, AlertTriangle, CheckCircle, Clock, Eye, Edit } from 'lucide-react';

const DPIA = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const dpiaAssessments = [
    {
      id: 'DPIA-001',
      title: 'Customer Analytics Platform',
      description: 'Implementation of new customer behavior analytics system',
      riskLevel: 'High',
      status: 'In Progress',
      progress: 65,
      dueDate: '2024-02-15',
      assessor: 'John Smith',
      lastUpdated: '2024-01-20',
      dataTypes: ['Behavioral data', 'Personal preferences', 'Transaction history'],
      risks: ['Profiling', 'Automated decision-making', 'Third-party access'],
    },
    {
      id: 'DPIA-002',
      title: 'Employee Monitoring System',
      description: 'Deployment of workplace productivity monitoring tools',
      riskLevel: 'High',
      status: 'Review Required',
      progress: 90,
      dueDate: '2024-01-25',
      assessor: 'Sarah Johnson',
      lastUpdated: '2024-01-18',
      dataTypes: ['Activity logs', 'Communication data', 'Location data'],
      risks: ['Surveillance', 'Privacy intrusion', 'Employee rights'],
    },
    {
      id: 'DPIA-003',
      title: 'Marketing Automation Upgrade',
      description: 'Enhanced personalization features for marketing campaigns',
      riskLevel: 'Medium',
      status: 'Completed',
      progress: 100,
      dueDate: '2024-01-10',
      assessor: 'Mike Davis',
      lastUpdated: '2024-01-10',
      dataTypes: ['Contact information', 'Purchase history', 'Website behavior'],
      risks: ['Consent management', 'Data accuracy', 'Opt-out mechanisms'],
    },
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'High': return 'destructive';
      case 'Medium': return 'default';
      case 'Low': return 'secondary';
      default: return 'outline';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'default';
      case 'In Progress': return 'secondary';
      case 'Review Required': return 'destructive';
      case 'Draft': return 'outline';
      default: return 'outline';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed': return CheckCircle;
      case 'In Progress': return Clock;
      case 'Review Required': return AlertTriangle;
      default: return Clock;
    }
  };

  const filteredAssessments = dpiaAssessments.filter(assessment =>
    assessment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    assessment.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div></div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New DPIA
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search DPIA assessments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* DPIA Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total DPIAs</p>
                <p className="text-2xl font-bold">{dpiaAssessments.length}</p>
              </div>
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">High Risk</p>
                <p className="text-2xl font-bold text-red-600">
                  {dpiaAssessments.filter(d => d.riskLevel === 'High').length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-orange-600">
                  {dpiaAssessments.filter(d => d.status === 'In Progress').length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-green-600">
                  {dpiaAssessments.filter(d => d.status === 'Completed').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* DPIA Table */}
      <Card>
        <CardHeader>
          <CardTitle>DPIA Assessments</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Risk Level</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Assessor</TableHead>
                <TableHead>Data Types</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAssessments.map((assessment) => {
                const StatusIcon = getStatusIcon(assessment.status);
                return (
                  <TableRow key={assessment.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{assessment.title}</div>
                        <div className="text-sm text-gray-500">{assessment.id}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(assessment.status)}>
                        <StatusIcon className="mr-1 h-3 w-3" />
                        {assessment.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getRiskColor(assessment.riskLevel)}>
                        {assessment.riskLevel}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm">{assessment.progress}%</div>
                        <Progress value={assessment.progress} className="h-2 w-16" />
                      </div>
                    </TableCell>
                    <TableCell>{assessment.dueDate}</TableCell>
                    <TableCell>{assessment.assessor}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {assessment.dataTypes.slice(0, 2).map((type, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {type}
                          </Badge>
                        ))}
                        {assessment.dataTypes.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{assessment.dataTypes.length - 2}
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
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {filteredAssessments.length === 0 && (
        <Card>
          <CardContent className="py-8 text-center">
            <Shield className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-lg font-medium">No DPIA assessments found</h3>
            <p className="text-gray-600">Create your first Data Protection Impact Assessment.</p>
            <Button className="mt-4">
              <Plus className="mr-2 h-4 w-4" />
              Create DPIA
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DPIA;
