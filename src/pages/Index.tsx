
import React, { useState } from 'react';
import LoginForm from '@/components/auth/LoginForm';
import SignUpForm from '@/components/auth/SignUpForm';
import OrganizationSetup from '@/components/onboarding/OrganizationSetup';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import PartnerDashboard from '@/components/dashboard/PartnerDashboard';
import CompanyDashboard from '@/components/dashboard/CompanyDashboard';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'partner' | 'company' | 'admin';
  avatar?: string;
}

interface Organization {
  id: string;
  name: string;
  industry: string;
  country: string;
}

type AppState = 'login' | 'signup' | 'onboarding' | 'dashboard';

const Index = () => {
  const [appState, setAppState] = useState<AppState>('login');
  const [user, setUser] = useState<User | null>(null);
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [currentPath, setCurrentPath] = useState('/dashboard');

  // Mock authentication
  const handleLogin = (email: string, password: string) => {
    console.log('Login attempt:', { email, password });
    // Mock user data
    const mockUser: User = {
      id: '1',
      name: 'John Doe',
      email: email,
      role: email.includes('partner') ? 'partner' : 'company',
    };
    setUser(mockUser);
    setCurrentPath(mockUser.role === 'partner' ? '/partner/dashboard' : '/company/dashboard');
    setAppState('dashboard');
  };

  const handleSignUp = (signUpData: any) => {
    console.log('Sign up attempt:', signUpData);
    const mockUser: User = {
      id: '1',
      name: `${signUpData.firstName} ${signUpData.lastName}`,
      email: signUpData.email,
      role: signUpData.accountType,
    };
    setUser(mockUser);
    setAppState('onboarding');
  };

  const handleOrganizationSetup = (orgData: any) => {
    console.log('Organization setup:', orgData);
    const mockOrg: Organization = {
      id: '1',
      name: orgData.name,
      industry: orgData.industry,
      country: orgData.country,
    };
    setOrganization(mockOrg);
    setCurrentPath(user?.role === 'partner' ? '/partner/dashboard' : '/company/dashboard');
    setAppState('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setOrganization(null);
    setCurrentPath('/');
    setAppState('login');
  };

  const handleNavigate = (path: string) => {
    setCurrentPath(path);
    console.log('Navigating to:', path);
  };

  const handleNavigateToCompany = (companyId: string) => {
    console.log('Navigating to company:', companyId);
    setCurrentPath(`/partner/companies/${companyId}`);
  };

  // Auth states
  if (appState === 'login') {
    return (
      <LoginForm
        onLogin={handleLogin}
        onForgotPassword={() => console.log('Forgot password')}
        onSignUp={() => setAppState('signup')}
      />
    );
  }

  if (appState === 'signup') {
    return (
      <SignUpForm
        onSignUp={handleSignUp}
        onLogin={() => setAppState('login')}
      />
    );
  }

  if (appState === 'onboarding') {
    return (
      <OrganizationSetup
        onNext={handleOrganizationSetup}
        userType={user?.role || 'company'}
      />
    );
  }

  // Main app layout
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {user && (
        <Sidebar
          userRole={user.role}
          onNavigate={handleNavigate}
          currentPath={currentPath}
        />
      )}
      
      <div className="flex-1 flex flex-col">
        <Header user={user || undefined} onLogout={handleLogout} />
        
        <main className="flex-1 overflow-auto">
          {user?.role === 'partner' ? (
            <PartnerDashboard onNavigateToCompany={handleNavigateToCompany} />
          ) : (
            <CompanyDashboard onNavigate={handleNavigate} />
          )}
        </main>
      </div>
    </div>
  );
};

export default Index;
