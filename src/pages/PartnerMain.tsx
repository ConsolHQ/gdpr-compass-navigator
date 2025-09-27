import React, { useState } from "react";
import PartnerDashboard from "@/components/dashboard/PartnerDashboard";
import { WorkspaceCreation } from "@/components/partner/WorkspaceCreation";
import { WorkspaceSwitcher } from "@/components/partner/WorkspaceSwitcher";
import TaskManagement from "@/components/partner/TaskManagement";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Home, 
  Building2, 
  Users, 
  Settings, 
  CheckSquare,
  Menu
} from "lucide-react";

type ViewType = 'dashboard' | 'workspaces' | 'tasks' | 'settings' | 'create-workspace';

const PartnerMain = () => {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [currentWorkspaceId, setCurrentWorkspaceId] = useState<string | undefined>();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleWorkspaceCreated = (workspaceId: string) => {
    setCurrentWorkspaceId(workspaceId);
    setCurrentView('dashboard');
  };

  const handleWorkspaceChange = (workspaceId: string) => {
    setCurrentWorkspaceId(workspaceId);
  };

  const navigation = [
    { id: 'dashboard', name: 'Dashboard', icon: Home },
    { id: 'workspaces', name: 'Workspaces', icon: Building2 },
    { id: 'tasks', name: 'Tasks', icon: CheckSquare },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <PartnerDashboard />;
      case 'workspaces':
        return <div className="p-6">Workspaces view coming soon...</div>;
      case 'tasks':
        return <TaskManagement workspaceId={currentWorkspaceId} />;
      case 'settings':
        return <div className="p-6">Settings view coming soon...</div>;
      case 'create-workspace':
        return (
          <WorkspaceCreation
            onWorkspaceCreated={handleWorkspaceCreated}
            onCancel={() => setCurrentView('dashboard')}
          />
        );
      default:
        return <PartnerDashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-card border-r transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6">
            <h2 className="text-xl font-bold">Partner Portal</h2>
          </div>

          {/* Workspace Switcher */}
          <div className="px-4 mb-4">
            <WorkspaceSwitcher
              currentWorkspaceId={currentWorkspaceId}
              onWorkspaceChange={handleWorkspaceChange}
              onCreateWorkspace={() => setCurrentView('create-workspace')}
            />
          </div>

          <Separator />

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-2">
            {navigation.map((item) => (
              <Button
                key={item.id}
                variant={currentView === item.id ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => {
                  setCurrentView(item.id as ViewType);
                  setSidebarOpen(false);
                }}
              >
                <item.icon className="mr-3 h-4 w-4" />
                {item.name}
              </Button>
            ))}
          </nav>

          {/* User info */}
          <div className="p-4 border-t">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-xs font-medium text-primary-foreground">PA</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Partner Admin</p>
                <p className="text-xs text-muted-foreground">admin@partner.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-card border-b px-4 py-3 flex items-center justify-between lg:hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">Partner Portal</h1>
          <div></div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default PartnerMain;