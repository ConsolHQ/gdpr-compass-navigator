import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Building2, 
  Users, 
  AlertTriangle, 
  Calendar, 
  Plus,
  ArrowRight,
  Activity,
  CheckCircle,
  Clock,
  ExternalLink
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface PartnerDashboardProps {
  onNavigateToWorkspace?: (workspaceId: string) => void;
  onCreateWorkspace?: () => void;
}

interface Workspace {
  id: string;
  name: string;
  company_name: string;
  status: string;
  created_at: string;
  module_config: any;
}

interface DashboardStats {
  totalWorkspaces: number;
  activeWorkspaces: number;
  totalTasks: number;
  overdueTasks: number;
}

const PartnerDashboard: React.FC<PartnerDashboardProps> = ({
  onNavigateToWorkspace,
  onCreateWorkspace
}) => {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalWorkspaces: 0,
    activeWorkspaces: 0,
    totalTasks: 0,
    overdueTasks: 0
  });
  const [recentActivities, setRecentActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch workspaces
      const { data: workspacesData } = await supabase
        .from('workspaces')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      if (workspacesData) {
        setWorkspaces(workspacesData);
        
        // Calculate stats
        const totalWorkspaces = workspacesData.length;
        const activeWorkspaces = workspacesData.filter(w => w.status === 'active').length;
        
        setStats({
          totalWorkspaces,
          activeWorkspaces,
          totalTasks: 0, // Will be updated when tasks are fetched
          overdueTasks: 0
        });
      }

      // Mock recent activities for now
      setRecentActivities([
        {
          id: '1',
          type: 'workspace_created',
          message: 'New workspace "TechCorp UK" created',
          timestamp: new Date().toISOString(),
          workspace: 'TechCorp UK'
        },
        {
          id: '2',
          type: 'task_completed',
          message: 'DPIA assessment completed for DataFlow Ltd',
          timestamp: new Date(Date.now() - 86400000).toISOString(),
          workspace: 'DataFlow Ltd'
        }
      ]);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success text-success-foreground';
      case 'inactive': return 'bg-muted text-muted-foreground';
      case 'archived': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const handleWorkspaceClick = (workspaceId: string) => {
    if (onNavigateToWorkspace) {
      onNavigateToWorkspace(workspaceId);
    }
  };

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-semibold">Partner Dashboard</h1>
            <p className="text-muted-foreground">Manage your client workspaces and compliance activities</p>
          </div>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-8 bg-muted rounded w-1/2"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold">Partner Dashboard</h1>
          <p className="text-muted-foreground">Manage your client workspaces and compliance activities</p>
        </div>
        <Button onClick={onCreateWorkspace} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Workspace
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Total Workspaces</p>
                <p className="text-2xl font-semibold">{stats.totalWorkspaces}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-success" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Active Workspaces</p>
                <p className="text-2xl font-semibold">{stats.activeWorkspaces}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Total Tasks</p>
                <p className="text-2xl font-semibold">{stats.totalTasks}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Overdue Tasks</p>
                <p className="text-2xl font-semibold">{stats.overdueTasks}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Workspaces */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Building2 className="h-5 w-5" />
              <span>Recent Workspaces</span>
            </CardTitle>
            <CardDescription>Your recently created client workspaces</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {workspaces.length === 0 ? (
              <div className="text-center py-8">
                <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No workspaces yet</p>
                <Button onClick={onCreateWorkspace} variant="outline" className="mt-2">
                  Create Your First Workspace
                </Button>
              </div>
            ) : (
              workspaces.map((workspace) => (
                <div key={workspace.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent cursor-pointer"
                     onClick={() => handleWorkspaceClick(workspace.id)}>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium">{workspace.name}</h4>
                      <Badge className={getStatusColor(workspace.status)}>
                        {workspace.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{workspace.company_name}</p>
                    <p className="text-xs text-muted-foreground">
                      Created {new Date(workspace.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </div>
              ))
            )}
            {workspaces.length > 0 && (
              <Button variant="outline" className="w-full">
                View All Workspaces
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5" />
              <span>Recent Activities</span>
            </CardTitle>
            <CardDescription>Latest activities across all workspaces</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.length === 0 ? (
              <div className="text-center py-8">
                <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No recent activities</p>
              </div>
            ) : (
              recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                  <div className="flex-shrink-0">
                    {activity.type === 'workspace_created' ? (
                      <Building2 className="h-4 w-4 text-primary" />
                    ) : activity.type === 'task_completed' ? (
                      <CheckCircle className="h-4 w-4 text-success" />
                    ) : (
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  <div className="space-y-1 flex-1">
                    <p className="text-sm">{activity.message}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">
                        {new Date(activity.timestamp).toLocaleDateString()}
                      </p>
                      <Badge variant="outline" className="text-xs">
                        {activity.workspace}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))
            )}
            <Button variant="outline" className="w-full">
              View All Activities
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PartnerDashboard;