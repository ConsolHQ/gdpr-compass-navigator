
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
} from 'lucide-react';

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  href: string;
  badge?: number;
  submenu?: SidebarItem[];
}

interface SidebarProps {
  userRole: 'partner' | 'company' | 'admin';
  onNavigate: (path: string) => void;
  currentPath: string;
}

const partnerMenuItems: SidebarItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: Home, href: '/partner/dashboard' },
  { id: 'companies', label: 'Companies', icon: Users, href: '/partner/companies' },
  { id: 'users', label: 'User Management', icon: UserCheck, href: '/partner/users' },
  { id: 'reports', label: 'Reports', icon: BarChart, href: '/partner/reports' },
  { id: 'settings', label: 'Settings', icon: Settings, href: '/partner/settings' },
];

const companyMenuItems: SidebarItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: Home, href: '/company/dashboard' },
  { id: 'ropa', label: 'ROPA', icon: FileText, href: '/company/ropa', badge: 2 },
  { id: 'dpia', label: 'DPIA', icon: Shield, href: '/company/dpia', badge: 1 },
  { id: 'dsr', label: 'Data Subject Requests', icon: UserCheck, href: '/company/dsr', badge: 5 },
  { id: 'breaches', label: 'Data Breaches', icon: AlertTriangle, href: '/company/breaches' },
  { id: 'vendors', label: 'Third Parties', icon: Link, href: '/company/vendors' },
  { id: 'documents', label: 'Document Library', icon: Book, href: '/company/documents' },
  { 
    id: 'settings', 
    label: 'Settings', 
    icon: Settings, 
    href: '/company/settings',
    submenu: [
      { id: 'metadata', label: 'Meta Data', icon: Database, href: '/company/settings/metadata' },
      { id: 'data-dictionary', label: 'Data Dictionary', icon: Book, href: '/company/settings/data-dictionary' },
      { id: 'users', label: 'Users', icon: Users, href: '/company/settings/users' },
      { id: 'organisation', label: 'Organisation Setup', icon: Settings, href: '/company/settings/organisation' },
    ]
  },
];

const Sidebar = ({ userRole, onNavigate, currentPath }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['settings']);
  
  const menuItems = userRole === 'partner' ? partnerMenuItems : companyMenuItems;

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
      "w-full justify-start text-left hover:bg-slate-700 transition-colors",
      currentPath === item.href && "bg-slate-700 text-blue-400",
      isCollapsed && "px-2",
      isSubmenuItem && "pl-8 text-sm"
    );

    return (
      <div key={item.id}>
        <Button
          variant="ghost"
          className={itemClasses}
          onClick={() => hasSubmenu && !isCollapsed ? toggleSubmenu(item.id) : onNavigate(item.href)}
        >
          <item.icon className={cn("h-5 w-5", !isCollapsed && "mr-3")} />
          {!isCollapsed && (
            <>
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 ml-2">
                  {item.badge}
                </span>
              )}
              {hasSubmenu && (
                isExpanded ? <ChevronUp className="h-4 w-4 ml-2" /> : <ChevronDown className="h-4 w-4 ml-2" />
              )}
            </>
          )}
        </Button>
        
        {/* Render submenu items */}
        {hasSubmenu && isExpanded && !isCollapsed && (
          <div className="ml-4 space-y-1">
            {item.submenu!.map(subItem => renderMenuItem(subItem, true))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={cn(
      "bg-slate-900 text-white transition-all duration-300 flex flex-col",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-slate-700 flex items-center justify-between">
        {!isCollapsed && (
          <h2 className="font-semibold text-lg">
            {userRole === 'partner' ? 'Partner Portal' : 'Company Portal'}
          </h2>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-white hover:bg-slate-700"
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map(item => renderMenuItem(item))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-700">
        <div className={cn("text-xs text-slate-400", isCollapsed && "text-center")}>
          {!isCollapsed ? "GDPR Compliance v1.0" : "v1.0"}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
