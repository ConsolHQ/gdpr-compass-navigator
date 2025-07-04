
import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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

interface HeaderProps {
  user?: User;
  onLogout: () => void;
  activeCompany?: CompanyAccess | null;
}

const Header = ({ user, onLogout, activeCompany }: HeaderProps) => {
  if (!user) return null;

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold text-gray-900">
            Register of Processing Activities
          </h1>
          {user.role === 'partner' && activeCompany && (
            <div className="flex items-center text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
              <Building className="h-4 w-4 mr-2" />
              <span>Working on: {activeCompany.name}</span>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm">
            <Bell className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center space-x-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="hidden md:block">
              <div className="text-sm font-medium text-gray-900">{user.name}</div>
              <div className="text-xs text-gray-500 capitalize">{user.role}</div>
            </div>
          </div>

          <Button variant="ghost" size="sm" onClick={onLogout}>
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
