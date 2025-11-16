
import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Breadcrumb, 
  BreadcrumbList, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbPage, 
  BreadcrumbSeparator 
} from '@/components/ui/breadcrumb';
import { LogOut, Bell, Building } from 'lucide-react';

interface CompanyAccess {
  id: string;
  name: string;
  hasAccess: boolean;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: 'partner' | 'company';
  avatar?: string;
}

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface HeaderProps {
  user?: User;
  onLogout: () => void;
  activeCompany?: CompanyAccess | null;
  title?: string;
  breadcrumbs?: BreadcrumbItem[];
  onNavigate?: (path: string) => void;
}

const Header = ({ user, onLogout, activeCompany, title, breadcrumbs, onNavigate }: HeaderProps) => {
  if (!user) return null;

  return (
    <header className="bg-background border-b border-border px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex flex-col space-y-2">
          {breadcrumbs && breadcrumbs.length > 0 && (
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbs.map((crumb, index) => (
                  <React.Fragment key={index}>
                    <BreadcrumbItem>
                      {crumb.href && index < breadcrumbs.length - 1 ? (
                        <BreadcrumbLink 
                          asChild
                          className="cursor-pointer"
                          onClick={() => onNavigate?.(crumb.href!)}
                        >
                          <span>{crumb.label}</span>
                        </BreadcrumbLink>
                      ) : (
                        <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                      )}
                    </BreadcrumbItem>
                    {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                  </React.Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          )}
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold text-foreground">
              {title || 'Dashboard'}
            </h1>
            {user.role === 'partner' && activeCompany && (
              <div className="flex items-center text-sm text-foreground bg-accent px-3 py-1.5 rounded-full border border-border shadow-sm">
                <Building className="h-4 w-4 mr-2 text-primary" />
                <span className="font-medium">Working on: {activeCompany.name}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="hover:bg-accent transition-all duration-base">
            <Bell className="h-5 w-5 text-foreground" />
          </Button>
          
          <div className="flex items-center space-x-3 px-3 py-1 rounded-lg hover:bg-accent transition-all duration-base">
            <Avatar className="h-9 w-9 ring-2 ring-primary/20">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="hidden md:block">
              <div className="text-sm font-semibold text-foreground">{user.name}</div>
              <div className="text-xs text-muted-foreground capitalize">{user.role}</div>
            </div>
          </div>

          <Button variant="ghost" size="sm" onClick={onLogout} className="hover:bg-destructive/10 hover:text-destructive transition-all duration-base">
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
