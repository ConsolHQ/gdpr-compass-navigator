import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Building, AlertTriangle, CheckCircle, Plus, BarChart } from 'lucide-react';

interface PartnerDashboardProps {
  onNavigateToCompany?: (companyId: string) => void;
}

const PartnerDashboard = ({ onNavigateToCompany }: PartnerDashboardProps) => {
  const stats = [
    { label: 'Total Companies', value: '12', icon: Building, color: 'text-blue-600' },
    { label: 'Active Users', value: '48', icon: Users, color: 'text-green-600' },
    { label: 'Pending Tasks', value: '23', icon: AlertTriangle, color: 'text-orange-600' },
    { label: 'Completed Tasks', value: '156', icon: CheckCircle, color: 'text-emerald-600' },
  ];

  const recentCompanies = [
    { name: 'TechCorp Ltd', users: 8, status: 'Active', lastActivity: '2 hours ago' },
    { name: 'DataFlow Inc', users: 12, status: 'Active', lastActivity: '5 hours ago' },
    { name: 'SecureBank', users: 15, status: 'Setup', lastActivity: '1 day ago' },
    { name: 'HealthSystem', users: 6, status: 'Active', lastActivity: '3 days ago' },
  ];

  const recentActivities = [
    { company: 'TechCorp Ltd', action: 'ROPA updated', time: '30 min ago', type: 'update' },
    { company: 'DataFlow Inc', action: 'New DPIA created', time: '2 hours ago', type: 'create' },
    { company: 'SecureBank', action: 'User invited', time: '4 hours ago', type: 'invite' },
    { company: 'HealthSystem', action: 'Data breach reported', time: '1 day ago', type: 'alert' },
  ];

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Partner Dashboard</h1>
          <p className="text-muted-foreground mt-2">Manage your client companies and GDPR compliance</p>
        </div>
        <Button className="transition-all duration-base hover:scale-105">
          <Plus className="mr-2 h-4 w-4" />
          Add Company
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card 
              key={stat.label} 
              className="transition-all duration-base hover:shadow-lg hover:-translate-y-1 cursor-pointer group"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardDescription className="transition-colors duration-fast group-hover:text-primary">{stat.label}</CardDescription>
                  <IconComponent className={`h-5 w-5 ${stat.color} transition-transform duration-base group-hover:scale-110`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Companies */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Companies</CardTitle>
            <CardDescription>Latest company activities and status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentCompanies.map((company) => (
                <div key={company.name} className="flex items-center justify-between p-4 border border-border rounded-lg bg-surface/30 transition-all duration-base hover:shadow-md hover:border-primary/30 hover:bg-surface/60 cursor-pointer group">
                  <div>
                    <h4 className="font-medium text-foreground transition-colors duration-fast group-hover:text-primary">{company.name}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{company.users} users • {company.lastActivity}</p>
                  </div>
                  <Badge variant={company.status === 'Active' ? 'default' : 'secondary'} className="transition-all duration-fast">
                    {company.status}
                  </Badge>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 transition-all duration-base hover:bg-primary/5">
              View All Companies
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest actions across all companies</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 border border-border rounded-lg bg-surface/30 transition-all duration-base hover:shadow-md hover:border-primary/20 hover:bg-surface/60 cursor-pointer">
                  <div className={`w-2 h-2 rounded-full mt-2 transition-transform duration-base hover:scale-125 ${
                    activity.type === 'alert' ? 'bg-destructive' : 
                    activity.type === 'create' ? 'bg-success' : 
                    activity.type === 'update' ? 'bg-primary' :
                    'bg-neutral-400'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{activity.company}</p>
                    <p className="text-sm text-muted-foreground mt-1">{activity.action}</p>
                    <p className="text-xs text-muted-foreground/70 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 transition-all duration-base hover:bg-primary/5">
              View All Activities
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PartnerDashboard;
