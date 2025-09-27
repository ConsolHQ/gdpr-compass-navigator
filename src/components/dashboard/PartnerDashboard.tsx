import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Plus, Building2, Users, Calendar, AlertTriangle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface PartnerDashboardProps {
  onNavigateToCompany?: (companyId: string) => void;
}

const PartnerDashboard = ({ onNavigateToCompany }: PartnerDashboardProps) => {
  const [workspaces, setWorkspaces] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalWorkspaces: 0,
    activeUsers: 0,
    pendingTasks: 0,
    recentActivities: 0
  });

  useEffect(() => {
    fetchWorkspaces();
    fetchStats();
  }, []);

  const fetchWorkspaces = async () => {
    try {
      const { data, error } = await supabase
        .from('workspaces')
        .select(`
          *,
          workspace_members(count),
          tasks(count)
        `)
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(6);

      if (error) throw error;
      setWorkspaces(data || []);
    } catch (error) {
      console.error('Error fetching workspaces:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const [workspacesResult, membersResult, tasksResult] = await Promise.all([
        supabase.from('workspaces').select('id', { count: 'exact' }).eq('status', 'active'),
        supabase.from('workspace_members').select('id', { count: 'exact' }),
        supabase.from('tasks').select('id', { count: 'exact' }).eq('status', 'pending')
      ]);

      setStats({
        totalWorkspaces: workspacesResult.count || 0,
        activeUsers: membersResult.count || 0,
        pendingTasks: tasksResult.count || 0,
        recentActivities: 15 // Mock data for now
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const statsCards = [
    {
      title: "Total Workspaces",
      value: stats.totalWorkspaces,
      description: "Active client companies",
      icon: Building2,
      color: "text-blue-600"
    },
    {
      title: "Active Users",
      value: stats.activeUsers,
      description: "Across all workspaces",
      icon: Users,
      color: "text-green-600"
    },
    {
      title: "Pending Tasks",
      value: stats.pendingTasks,
      description: "Require attention",
      icon: Calendar,
      color: "text-orange-600"
    },
    {
      title: "Recent Activities",
      value: stats.recentActivities,
      description: "Last 7 days",
      icon: AlertTriangle,
      color: "text-purple-600"
    }
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Partner Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your client workspaces and GDPR compliance activities
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Workspace
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Workspaces */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Workspaces</CardTitle>
            <CardDescription>Your latest client companies</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {workspaces.map((workspace) => (
                <div key={workspace.id} className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarFallback>
                      {workspace.company_name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {workspace.company_name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {workspace.sector || 'No sector specified'}
                    </p>
                  </div>
                  <Badge variant="outline">{workspace.status}</Badge>
                </div>
              ))}
              {workspaces.length === 0 && (
                <p className="text-sm text-muted-foreground">No workspaces found</p>
              )}
            </div>
            <Button variant="ghost" className="w-full mt-4">
              View All Workspaces
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest actions across all workspaces</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">New ROPA created</p>
                  <p className="text-sm text-muted-foreground">Acme Corp • 2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">DPIA completed</p>
                  <p className="text-sm text-muted-foreground">Tech Solutions • 4 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Task assigned</p>
                  <p className="text-sm text-muted-foreground">Global Inc • 6 hours ago</p>
                </div>
              </div>
            </div>
            <Button variant="ghost" className="w-full mt-4">
              View All Activities
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PartnerDashboard;