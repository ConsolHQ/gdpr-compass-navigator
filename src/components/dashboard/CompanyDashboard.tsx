import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { FileText, Shield, Users, AlertTriangle, Clock, CheckCircle } from 'lucide-react';

interface CompanyDashboardProps {
  onNavigate?: (path: string) => void;
}

const CompanyDashboard = ({ onNavigate }: CompanyDashboardProps) => {
  const complianceStats = [
    { label: 'ROPA Entries', value: '12', total: '15', progress: 80, icon: FileText },
    { label: 'DPIA Assessments', value: '8', total: '10', progress: 80, icon: Shield },
    { label: 'Pending DSRs', value: '5', total: '8', progress: 62, icon: Users },
    { label: 'Open Breaches', value: '1', total: '3', progress: 33, icon: AlertTriangle },
  ];

  const recentTasks = [
    { title: 'Update Marketing ROPA', type: 'ROPA', priority: 'High', dueDate: 'Today', status: 'pending' },
    { title: 'Complete HR DPIA', type: 'DPIA', priority: 'Medium', dueDate: 'Tomorrow', status: 'in-progress' },
    { title: 'Process Data Deletion Request', type: 'DSR', priority: 'High', dueDate: 'Today', status: 'pending' },
    { title: 'Review Third-Party Agreement', type: 'Vendor', priority: 'Low', dueDate: 'Next Week', status: 'pending' },
  ];

  const complianceScore = 78;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Company Dashboard</h1>
          <p className="text-gray-600 mt-2">GDPR Compliance Overview</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{complianceScore}%</div>
            <div className="text-sm text-gray-600">Compliance Score</div>
          </div>
          <Button>Quick Actions</Button>
        </div>
      </div>

      {/* Compliance Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Compliance Overview</CardTitle>
          <CardDescription>Current status of your GDPR compliance activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {complianceStats.map((stat) => {
              const IconComponent = stat.icon;
              return (
                <div key={stat.label} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <IconComponent className="h-4 w-4 text-gray-600" />
                      <span className="text-sm font-medium">{stat.label}</span>
                    </div>
                    <span className="text-sm text-gray-600">{stat.value}/{stat.total}</span>
                  </div>
                  <Progress value={stat.progress} className="h-2" />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Tasks */}
        <Card>
          <CardHeader>
            <CardTitle>Priority Tasks</CardTitle>
            <CardDescription>Tasks requiring immediate attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTasks.map((task, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{task.title}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline" className="text-xs">{task.type}</Badge>
                      <span className="text-xs text-gray-600">Due: {task.dueDate}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={task.priority === 'High' ? 'destructive' : task.priority === 'Medium' ? 'default' : 'secondary'}>
                      {task.priority}
                    </Badge>
                    {task.status === 'pending' ? (
                      <Clock className="h-4 w-4 text-orange-500" />
                    ) : (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Tasks
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common GDPR compliance tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-20 flex flex-col">
                <FileText className="h-6 w-6 mb-2" />
                <span className="text-sm">New ROPA</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col">
                <Shield className="h-6 w-6 mb-2" />
                <span className="text-sm">New DPIA</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col">
                <Users className="h-6 w-6 mb-2" />
                <span className="text-sm">Process DSR</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col">
                <AlertTriangle className="h-6 w-6 mb-2" />
                <span className="text-sm">Report Breach</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CompanyDashboard;
