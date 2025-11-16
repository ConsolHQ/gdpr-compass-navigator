
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Home,
  Users,
  Settings,
  FileText,
  Shield,
  AlertTriangle,
  Database,
  Book,
  UserCheck,
  Link,
  BarChart,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Building,
  Unlock,
  Sparkles,
  Bot,
  Zap,
  Target,
} from 'lucide-react';

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  href: string;
  badge?: number;
  submenu?: SidebarItem[];
}

interface CompanyAccess {
  id: string;
  name: string;
  hasAccess: boolean;
}

interface SidebarProps {
  userRole: 'partner' | 'company' | 'admin';
  onNavigate: (path: string) => void;
  currentPath: string;
  partnerCompanies?: CompanyAccess[];
  activeCompany?: CompanyAccess | null;
  onSwitchCompany?: (company: CompanyAccess) => void;
}

const partnerMenuItems: SidebarItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: Home, href: '/partner/dashboard' },
  { id: 'settings', label: 'Settings', icon: Settings, href: '/partner/settings' },
];

const companyMenuItems: SidebarItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: Home, href: '/company/dashboard' },
  { id: 'ropa', label: 'ROPA', icon: FileText, href: '/company/ropa', badge: 2 },
  { 
    id: 'assessments', 
    label: 'Assessments', 
    icon: Shield, 
    href: '/company/assessments',
    submenu: [
      { id: 'lia', label: 'LIA', icon: Shield, href: '/company/assessments/lia' },
      { id: 'dpia', label: 'DPIA', icon: Shield, href: '/company/assessments/dpia', badge: 1 },
    ]
  },
  { id: 'dsr', label: 'Data Subject Requests', icon: UserCheck, href: '/company/dsr', badge: 5 },
  { id: 'breaches', label: 'Data Breaches', icon: AlertTriangle, href: '/company/breaches' },
  { id: 'vendors', label: 'Third Parties', icon: Link, href: '/company/vendors' },
  { id: 'documents', label: 'Document Library', icon: Book, href: '/company/documents' },
  { 
    id: 'ai-assist', 
    label: 'AI Assist', 
    icon: Sparkles, 
    href: '/company/ai-assist',
    submenu: [
      { id: 'automation-center', label: 'Automation Center', icon: Bot, href: '/company/ai-assist/automation-center' },
      { id: 'workflow-builder', label: 'Workflow Builder', icon: Zap, href: '/company/ai-assist/workflow-builder' },
      { id: 'ai-insights', label: 'AI Insights', icon: Target, href: '/company/ai-assist/insights' },
    ]
  },
  {
    id: 'settings',
    label: 'Settings', 
    icon: Settings, 
    href: '/company/settings',
    submenu: [
      { id: 'metadata', label: 'Meta Data', icon: Database, href: '/company/settings/metadata' },
      { id: 'data-dictionary', label: 'Data Dictionary', icon: Book, href: '/company/settings/data-dictionary' },
      { id: 'im-systems', label: 'IM Systems', icon: Database, href: '/company/settings/im-systems' },
      { id: 'users', label: 'Users', icon: Users, href: '/company/settings/users' },
      { id: 'organisation', label: 'Organisation Setup', icon: Settings, href: '/company/settings/organisation' },
      { id: 'ai-integration', label: 'AI Integration', icon: Bot, href: '/company/settings/ai-integration' },
      { id: 'reports', label: 'Reports', icon: BarChart, href: '/company/settings/reports' },
    ]
  },
];

const Sidebar = ({ 
  userRole, 
  onNavigate, 
  currentPath, 
  partnerCompanies = [], 
  activeCompany, 
  onSwitchCompany 
}: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['settings']);
  const [showCompanyDropdown, setShowCompanyDropdown] = useState(false);
  
  // Show company menu if user is a company user OR if partner has selected a company workspace
  const showCompanyMenu = userRole === 'company' || (userRole === 'partner' && activeCompany);
  const menuItems = showCompanyMenu ? companyMenuItems : partnerMenuItems;

  const toggleSubmenu = (menuId: string) => {
    setExpandedMenus(prev => 
      prev.includes(menuId) 
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    );
  };

  const isSubmenuExpanded = (menuId: string) => expandedMenus.includes(menuId);

  const renderMenuItem = (item: SidebarItem, isSubmenuItem = false) => {
    const hasSubmenu = item.submenu && item.submenu.length > 0;
    const isExpanded = isSubmenuExpanded(item.id);
    const itemClasses = cn(
      "w-full justify-start text-left transition-all duration-base",
      "hover:bg-sidebar-accent hover:shadow-sm rounded-md",
      currentPath === item.href && "bg-sidebar-accent-hover text-primary font-medium shadow-sm border-l-2 border-primary",
      isCollapsed && "px-2 justify-center",
      isSubmenuItem && "pl-8 text-sm py-2"
    );

    return (
      <div key={item.id}>
        <Button
          variant="ghost"
          className={itemClasses}
          onClick={() => hasSubmenu && !isCollapsed && !isSubmenuItem ? toggleSubmenu(item.id) : onNavigate(item.href)}
        >
          <item.icon className={cn("h-5 w-5", !isCollapsed && "mr-3")} />
          {!isCollapsed && (
            <>
              <span className="flex-1 font-medium">{item.label}</span>
              {item.badge && (
                <span className="bg-destructive text-destructive-foreground text-xs font-semibold rounded-full px-2 py-0.5 ml-2 shadow-sm">
                  {item.badge}
                </span>
              )}
              {hasSubmenu && (
                isExpanded ? <ChevronUp className="h-4 w-4 ml-2 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 ml-2 text-muted-foreground" />
              )}
            </>
          )}
        </Button>
        
        {/* Render submenu items */}
        {hasSubmenu && isExpanded && !isCollapsed && (
          <div className="ml-4 mt-1 space-y-1 border-l-2 border-border pl-2">
            {item.submenu!.map(subItem => renderMenuItem(subItem, true))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={cn(
      "bg-sidebar text-sidebar-foreground transition-all duration-smooth flex flex-col shadow-xl border-r border-sidebar-border",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border flex items-center justify-between bg-sidebar/95 backdrop-blur-sm">
        {!isCollapsed && (
          <div className="flex flex-col flex-1">
            {userRole === 'partner' && activeCompany ? (
              <div className="relative">
                <Button
                  variant="ghost"
                  onClick={() => setShowCompanyDropdown(!showCompanyDropdown)}
                  className="w-full justify-between text-left hover:bg-sidebar-accent transition-all duration-base p-2 rounded-md"
                >
                  <div className="flex items-center">
                    <Building className="h-5 w-5 mr-2 text-primary" />
                    <span className="font-semibold text-sm truncate">{activeCompany.name}</span>
                  </div>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </Button>
                
                {showCompanyDropdown && (
                  <div className="absolute top-full left-0 right-0 bg-card border border-border rounded-md mt-1 py-1 z-50 shadow-xl">
                    {partnerCompanies.map((company) => (
                      <Button
                        key={company.id}
                        variant="ghost"
                        onClick={() => {
                          if (onSwitchCompany) onSwitchCompany(company);
                          setShowCompanyDropdown(false);
                        }}
                        className="w-full justify-start text-left hover:bg-accent transition-all duration-base px-3 py-2 text-sm rounded-sm"
                        disabled={!company.hasAccess}
                      >
                        <div className="flex items-center w-full">
                          <Building className="h-4 w-4 mr-2 text-primary" />
                          <span className="flex-1 truncate font-medium">{company.name}</span>
                          {!company.hasAccess && <Unlock className="h-4 w-4 ml-2 text-muted-foreground" />}
                        </div>
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <h2 className="text-lg font-bold text-sidebar-foreground">
                {userRole === 'partner' ? 'Partner Portal' : 'Company Portal'}
              </h2>
            )}
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-sidebar-foreground hover:bg-sidebar-accent transition-all duration-base rounded-md"
        >
          {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </Button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {menuItems.map(item => renderMenuItem(item))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border bg-sidebar/95 backdrop-blur-sm">
        <div className={cn("text-xs text-muted-foreground font-medium", isCollapsed && "text-center")}>
          {!isCollapsed ? "GDPR Compliance v1.0" : "v1.0"}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
