import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PartnerDashboard from '@/components/partner/PartnerDashboard';
import WorkspaceCreation from '@/components/partner/WorkspaceCreation';
import TaskManagement from '@/components/partner/TaskManagement';
import WorkspaceSwitcher from '@/components/partner/WorkspaceSwitcher';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Calendar,
  Home,
  Settings,
  Users,
  Building2,
  ArrowLeft
} from 'lucide-react';

type ViewType = 'dashboard' | 'create-workspace' | 'tasks' | 'settings';

const PartnerMain: React.FC = () => {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [currentWorkspaceId, setCurrentWorkspaceId] = useState<string | undefined>();

  const handleNavigateToWorkspace = (workspaceId: string) => {
    setCurrentWorkspaceId(workspaceId);
    // Could navigate to workspace-specific view here
  };

  const handleCreateWorkspace = () => {
    setCurrentView('create-workspace');
  };

  const handleWorkspaceCreated = (workspaceId: string) => {
    setCurrentWorkspaceId(workspaceId);
    setCurrentView('dashboard');
  };

  const handleWorkspaceChange = (workspaceId: string) => {
    setCurrentWorkspaceId(workspaceId);
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
  };

  const renderNavigation = () => (
    <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-6">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Main
          </Button>
          
          <Separator orientation="vertical" className="h-6" />
          
          <WorkspaceSwitcher
            currentWorkspaceId={currentWorkspaceId}
            onWorkspaceChange={handleWorkspaceChange}
            onCreateWorkspace={handleCreateWorkspace}
          />
        </div>
        
        <div className="ml-auto flex items-center space-x-4">
          <nav className="flex items-center space-x-1">
            <Button
              variant={currentView === 'dashboard' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setCurrentView('dashboard')}
              className="gap-2"
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Button>
            
            <Button
              variant={currentView === 'tasks' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setCurrentView('tasks')}
              className="gap-2"
            >
              <Calendar className="h-4 w-4" />
              Tasks
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="gap-2"
            >
              <Users className="h-4 w-4" />
              Members
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="gap-2"
            >
              <Settings className="h-4 w-4" />
              Settings
            </Button>
          </nav>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <PartnerDashboard
            onNavigateToWorkspace={handleNavigateToWorkspace}
            onCreateWorkspace={handleCreateWorkspace}
          />
        );
      
      case 'create-workspace':
        return (
          <WorkspaceCreation
            onBack={handleBackToDashboard}
            onSuccess={handleWorkspaceCreated}
          />
        );
      
      case 'tasks':
        return (
          <TaskManagement workspaceId={currentWorkspaceId} />
        );
      
      default:
        return (
          <PartnerDashboard
            onNavigateToWorkspace={handleNavigateToWorkspace}
            onCreateWorkspace={handleCreateWorkspace}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {renderNavigation()}
      <main className="flex-1">
        {renderContent()}
      </main>
    </div>
  );
};

export default PartnerMain;