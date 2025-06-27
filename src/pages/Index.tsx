
import React, { useState } from 'react';
import LoginForm from '@/components/auth/LoginForm';
import SignUpForm from '@/components/auth/SignUpForm';
import EmailVerification from '@/components/auth/EmailVerification';
import OrganizationSetup from '@/components/onboarding/OrganizationSetup';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import PartnerDashboard from '@/components/dashboard/PartnerDashboard';
import CompanyDashboard from '@/components/dashboard/CompanyDashboard';
import ROPA from '@/components/company/ROPA';
import DPIA from '@/components/company/DPIA';
import DSR from '@/components/company/DSR';
import DataBreaches from '@/components/company/DataBreaches';
import ThirdParties from '@/components/company/ThirdParties';
import DocumentLibrary from '@/components/company/DocumentLibrary';
import CompanySettings from '@/components/company/settings/CompanySettings';
import PartnerSettings from '@/components/partner/PartnerSettings';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'partner' | 'company';
  avatar?: string;
}

interface Organization {
  id: string;
  name: string;
  industry: string;
  country: string;
}

type AppState = 'login' | 'signup' | 'verification' | 'onboarding' | 'dashboard';

const Index = () => {
  const [appState, setAppState] = useState<AppState>('login');
  const [user, setUser] = useState<User | null>(null);
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [currentPath, setCurrentPath] = useState('/dashboard');
  const [pendingUserData, setPendingUserData] = useState<any>(null);

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
    setPendingUserData(signUpData);
    setAppState('verification');
  };

  const handleEmailVerification = (code: string) => {
    console.log('Email verification with code:', code);
    // Mock verification success
    if (pendingUserData) {
      const mockUser: User = {
        id: '1',
        name: `${pendingUserData.firstName} ${pendingUserData.lastName}`,
        email: pendingUserData.email,
        role: pendingUserData.accountType,
      };
      setUser(mockUser);
      setAppState('onboarding');
    }
  };

  const handleResendCode = () => {
    console.log('Resending verification code to:', pendingUserData?.email);
    // Mock resend code functionality
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
    setPendingUserData(null);
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

  // Function to render the correct screen based on currentPath
  const renderCurrentScreen = () => {
    if (!user) return null;

    switch (currentPath) {
      // Partner routes
      case '/partner/dashboard':
        return <PartnerDashboard onNavigateToCompany={handleNavigateToCompany} />;
      case '/partner/settings':
        return <PartnerSettings />;
      
      // Company routes
      case '/company/dashboard':
        return <CompanyDashboard onNavigate={handleNavigate} />;
      case '/company/ropa':
        return <ROPA />;
      case '/company/dpia':
        return <DPIA />;
      case '/company/dsr':
        return <DSR />;
      case '/company/breaches':
        return <DataBreaches />;
      case '/company/vendors':
        return <ThirdParties />;
      case '/company/documents':
        return <DocumentLibrary />;
      case '/company/settings':
      case '/company/settings/metadata':
      case '/company/settings/data-dictionary':
      case '/company/settings/users':
      case '/company/settings/organisation':
      case '/company/settings/reports':
        return <CompanySettings />;
      
      default:
        // Default to dashboard based on user role
        if (user.role === 'partner') {
          return <PartnerDashboard onNavigateToCompany={handleNavigateToCompany} />;
        } else {
          return <CompanyDashboard onNavigate={handleNavigate} />;
        }
    }
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

  if (appState === 'verification') {
    return (
      <EmailVerification
        email={pendingUserData?.email || ''}
        onVerify={handleEmailVerification}
        onResendCode={handleResendCode}
        onBack={() => setAppState('signup')}
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
          {renderCurrentScreen()}
        </main>
      </div>
    </div>
  );
};

export default Index;
