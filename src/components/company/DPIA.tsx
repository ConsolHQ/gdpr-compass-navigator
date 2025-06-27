
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
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
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Data Protection Impact Assessments</h1>
          <p className="text-gray-600 mt-2">Assess and mitigate privacy risks for high-risk processing activities</p>
        </div>
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

      {/* DPIA Assessments */}
      <div className="space-y-4">
        {filteredAssessments.map((assessment) => {
          const StatusIcon = getStatusIcon(assessment.status);
          return (
            <Card key={assessment.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <CardTitle className="text-lg">{assessment.title}</CardTitle>
                      <Badge variant={getRiskColor(assessment.riskLevel)}>
                        {assessment.riskLevel} Risk
                      </Badge>
                      <Badge variant={getStatusColor(assessment.status)}>
                        <StatusIcon className="mr-1 h-3 w-3" />
                        {assessment.status}
                      </Badge>
                    </div>
                    <CardDescription>{assessment.description}</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Progress */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Progress</span>
                      <span className="text-sm text-gray-600">{assessment.progress}%</span>
                    </div>
                    <Progress value={assessment.progress} className="h-2" />
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">DPIA ID</label>
                      <p className="text-sm">{assessment.id}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Due Date</label>
                      <p className="text-sm">{assessment.dueDate}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Assessor</label>
                      <p className="text-sm">{assessment.assessor}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Last Updated</label>
                      <p className="text-sm">{assessment.lastUpdated}</p>
                    </div>
                  </div>

                  {/* Data Types */}
                  <div>
                    <label className="text-sm font-medium text-gray-600">Data Types</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {assessment.dataTypes.map((type, index) => (
                        <Badge key={index} variant="outline">{type}</Badge>
                      ))}
                    </div>
                  </div>

                  {/* Risks */}
                  <div>
                    <label className="text-sm font-medium text-gray-600">Identified Risks</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {assessment.risks.map((risk, index) => (
                        <Badge key={index} variant="secondary">{risk}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

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
