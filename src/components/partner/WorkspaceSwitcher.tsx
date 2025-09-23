import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Building2, ChevronDown, Plus, Settings } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Workspace {
  id: string;
  name: string;
  company_name: string;
  status: string;
}

interface WorkspaceSwitcherProps {
  currentWorkspaceId?: string;
  onWorkspaceChange?: (workspaceId: string) => void;
  onCreateWorkspace?: () => void;
  onManageWorkspaces?: () => void;
}

const WorkspaceSwitcher: React.FC<WorkspaceSwitcherProps> = ({
  currentWorkspaceId,
  onWorkspaceChange,
  onCreateWorkspace,
  onManageWorkspaces
}) => {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  useEffect(() => {
    if (currentWorkspaceId && workspaces.length > 0) {
      const workspace = workspaces.find(w => w.id === currentWorkspaceId);
      setCurrentWorkspace(workspace || null);
    }
  }, [currentWorkspaceId, workspaces]);

  const fetchWorkspaces = async () => {
    try {
      const { data, error } = await supabase
        .from('workspaces')
        .select('id, name, company_name, status')
        .eq('status', 'active')
        .order('name');

      if (error) throw error;
      setWorkspaces(data || []);
    } catch (error) {
      console.error('Error fetching workspaces:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleWorkspaceSelect = (workspace: Workspace) => {
    setCurrentWorkspace(workspace);
    if (onWorkspaceChange) {
      onWorkspaceChange(workspace.id);
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

  if (loading) {
    return (
      <Button variant="ghost" disabled className="gap-2">
        <Building2 className="h-4 w-4" />
        <span>Loading...</span>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="gap-2 max-w-[250px] justify-start">
          <Building2 className="h-4 w-4 flex-shrink-0" />
          <div className="flex-1 text-left truncate">
            {currentWorkspace ? (
              <div className="space-y-1">
                <div className="font-medium truncate">{currentWorkspace.name}</div>
                <div className="text-xs text-muted-foreground truncate">
                  {currentWorkspace.company_name}
                </div>
              </div>
            ) : (
              <span>Select Workspace</span>
            )}
          </div>
          <ChevronDown className="h-4 w-4 flex-shrink-0" />
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent className="w-80" align="start">
        <DropdownMenuLabel>Workspaces</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {workspaces.length === 0 ? (
          <div className="p-4 text-center">
            <Building2 className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground mb-2">No workspaces yet</p>
            <Button size="sm" onClick={onCreateWorkspace} className="gap-2">
              <Plus className="h-3 w-3" />
              Create First Workspace
            </Button>
          </div>
        ) : (
          <>
            {workspaces.map((workspace) => (
              <DropdownMenuItem
                key={workspace.id}
                onClick={() => handleWorkspaceSelect(workspace)}
                className={`p-3 cursor-pointer ${
                  currentWorkspace?.id === workspace.id ? 'bg-accent' : ''
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="space-y-1 flex-1">
                    <div className="font-medium">{workspace.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {workspace.company_name}
                    </div>
                  </div>
                  <Badge className={`ml-2 ${getStatusColor(workspace.status)}`}>
                    {workspace.status}
                  </Badge>
                </div>
              </DropdownMenuItem>
            ))}
            
            <DropdownMenuSeparator />
            
            <DropdownMenuItem onClick={onCreateWorkspace} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Workspace
            </DropdownMenuItem>
            
            {onManageWorkspaces && (
              <DropdownMenuItem onClick={onManageWorkspaces} className="gap-2">
                <Settings className="h-4 w-4" />
                Manage Workspaces
              </DropdownMenuItem>
            )}
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default WorkspaceSwitcher;