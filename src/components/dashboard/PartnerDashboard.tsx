
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building, Users, AlertTriangle, TrendingUp, Plus, Eye } from 'lucide-react';

interface Company {
  id: string;
  name: string;
  industry: string;
  healthScore: number;
  activeIssues: number;
  lastActivity: string;
  status: 'active' | 'inactive' | 'pending';
}

const mockCompanies: Company[] = [
  {
    id: '1',
    name: 'ACME Corporation',
    industry: 'Technology',
    healthScore: 85,
    activeIssues: 2,
    lastActivity: '2 hours ago',
    status: 'active',
  },
  {
    id: '2',
    name: 'Global Healthcare Inc',
    industry: 'Healthcare',
    healthScore: 92,
    activeIssues: 0,
    lastActivity: '1 day ago',
    status: 'active',
  },
  {
    id: '3',
    name: 'FinTech Solutions',
    industry: 'Finance',
    healthScore: 78,
    activeIssues: 5,
    lastActivity: '3 hours ago',
    status: 'active',
  },
];

interface PartnerDashboardProps {
  onNavigateToCompany: (companyId: string) => void;
}

const PartnerDashboard = ({ onNavigateToCompany }: PartnerDashboardProps) => {
  const getHealthScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 75) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-gray-100 text-gray-800',
      pending: 'bg-yellow-100 text-yellow-800',
    };
    return variants[status as keyof typeof variants] || variants.pending;
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Partner Dashboard</h1>
        <p className="text-slate-600">Manage and monitor your client companies</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Companies</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">143</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Issues</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">7</div>
            <p className="text-xs text-muted-foreground">Require immediate attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Health Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">85%</div>
            <p className="text-xs text-muted-foreground">+3% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Companies List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Companies</CardTitle>
              <CardDescription>Manage your client companies and their compliance status</CardDescription>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Company
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockCompanies.map((company) => (
              <div key={company.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Building className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">{company.name}</h3>
                    <p className="text-sm text-slate-600">{company.industry}</p>
                    <p className="text-xs text-slate-500">Last activity: {company.lastActivity}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className={`text-sm font-medium px-2 py-1 rounded ${getHealthScoreColor(company.healthScore)}`}>
                      {company.healthScore}%
                    </div>
                    <p className="text-xs text-slate-500 mt-1">Health Score</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-sm font-medium text-slate-900">{company.activeIssues}</div>
                    <p className="text-xs text-slate-500 mt-1">Issues</p>
                  </div>
                  
                  <Badge className={getStatusBadge(company.status)}>
                    {company.status}
                  </Badge>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onNavigateToCompany(company.id)}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PartnerDashboard;
