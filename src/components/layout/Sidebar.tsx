
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
  { id: 'metadata', label: 'Data Dictionary', icon: Database, href: '/company/metadata' },
  { id: 'users', label: 'Users & Roles', icon: Users, href: '/company/users' },
  { id: 'settings', label: 'Organization Settings', icon: Settings, href: '/company/settings' },
];

const Sidebar = ({ userRole, onNavigate, currentPath }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const menuItems = userRole === 'partner' ? partnerMenuItems : companyMenuItems;

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
        {menuItems.map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            className={cn(
              "w-full justify-start text-left hover:bg-slate-700 transition-colors",
              currentPath === item.href && "bg-slate-700 text-blue-400",
              isCollapsed && "px-2"
            )}
            onClick={() => onNavigate(item.href)}
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
              </>
            )}
          </Button>
        ))}
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
