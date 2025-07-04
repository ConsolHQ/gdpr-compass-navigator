
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
import IncidentReporting from '@/components/company/IncidentReporting';
import ThirdParties from '@/components/company/ThirdParties';
import DocumentLibrary from '@/components/company/DocumentLibrary';
import OrganizationSettings from '@/components/company/settings/OrganizationSettings';
import UserManagement from '@/components/company/settings/UserManagement';
import MetadataSettings from '@/components/company/settings/MetadataSettings';
import DataDictionary from '@/components/company/settings/DataDictionary';
import ReportsSettings from '@/components/company/settings/ReportsSettings';
import PartnerSettings from '@/components/partner/PartnerSettings';
import CreateDSR from '@/components/company/CreateDSR';
import CreateThirdParty from '@/components/company/CreateThirdParty';
import CreateDocument from '@/components/company/CreateDocument';

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

interface CompanyAccess {
  id: string;
  name: string;
  hasAccess: boolean;
}

type AppState = 'login' | 'signup' | 'verification' | 'onboarding' | 'dashboard';

const Index = () => {
  const [appState, setAppState] = useState<AppState>('login');
  const [user, setUser] = useState<User | null>(null);
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [currentPath, setCurrentPath] = useState('/dashboard');
  const [pendingUserData, setPendingUserData] = useState<any>(null);
  
  // For partners: track which companies they have access to and current active company
  const [partnerCompanies, setPartnerCompanies] = useState<CompanyAccess[]>([]);
  const [activeCompany, setActiveCompany] = useState<CompanyAccess | null>(null);

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
    
    if (mockUser.role === 'partner') {
      // Mock companies the partner has access to
      const mockCompanies: CompanyAccess[] = [
        { id: '1', name: 'TechCorp Ltd', hasAccess: true },
        { id: '2', name: 'DataFlow Inc', hasAccess: true },
        { id: '3', name: 'SecureBank', hasAccess: false },
        { id: '4', name: 'HealthSystem', hasAccess: true },
      ];
      setPartnerCompanies(mockCompanies);
      setCurrentPath('/partner/dashboard');
    } else {
      setCurrentPath('/company/dashboard');
    }
    
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
    setPartnerCompanies([]);
    setActiveCompany(null);
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

  // Handle partner switching between company workspaces
  const handleSwitchCompany = (company: CompanyAccess) => {
    if (!company.hasAccess) {
      console.log('Requesting access to company:', company.name);
      // In real app, this would trigger an access request
      return;
    }
    
    setActiveCompany(company);
    setCurrentPath('/company/dashboard');
    console.log('Switched to company workspace:', company.name);
  };

  // Get page title and breadcrumbs based on current path
  const getPageInfo = () => {
    const pathSegments = currentPath.split('/').filter(Boolean);
    
    if (user?.role === 'partner' && !activeCompany && currentPath.startsWith('/partner')) {
      switch (currentPath) {
        case '/partner/dashboard':
          return { title: 'Partner Dashboard', breadcrumbs: [] };
        case '/partner/settings':
          return { title: 'Partner Settings', breadcrumbs: [{ label: 'Dashboard', href: '/partner/dashboard' }, { label: 'Settings' }] };
        default:
          return { title: 'Partner Dashboard', breadcrumbs: [] };
      }
    }

    // Company routes
    switch (currentPath) {
      case '/company/dashboard':
        return { title: 'Dashboard', breadcrumbs: [] };
      case '/company/ropa':
        return { title: 'Register of Processing Activities', breadcrumbs: [] };
      case '/company/dpia':
        return { title: 'Data Protection Impact Assessments', breadcrumbs: [] };
      case '/company/dsr':
        return { title: 'Data Subject Requests', breadcrumbs: [] };
      case '/company/breaches':
        return { title: 'Data Breaches', breadcrumbs: [] };
      case '/company/breaches/report':
        return { title: 'Report Incident', breadcrumbs: [{ label: 'Data Breaches', href: '/company/breaches' }, { label: 'Report Incident' }] };
      case '/company/dsr/new':
        return { title: 'New Data Subject Request', breadcrumbs: [{ label: 'Data Subject Requests', href: '/company/dsr' }, { label: 'New Request' }] };
      case '/company/vendors/new':
        return { title: 'Add Third Party', breadcrumbs: [{ label: 'Third Party Management', href: '/company/vendors' }, { label: 'Add Third Party' }] };
      case '/company/documents/new':
        return { title: 'Add Document', breadcrumbs: [{ label: 'Document Library', href: '/company/documents' }, { label: 'Add Document' }] };
      case '/company/vendors':
        return { title: 'Third Party Management', breadcrumbs: [] };
      case '/company/documents':
        return { title: 'Document Library', breadcrumbs: [] };
      case '/company/settings':
        return { title: 'Company Settings', breadcrumbs: [] };
      case '/company/settings/metadata':
        return { title: 'Metadata Management', breadcrumbs: [{ label: 'Settings', href: '/company/settings' }, { label: 'Metadata' }] };
      case '/company/settings/data-dictionary':
        return { title: 'Data Dictionary', breadcrumbs: [{ label: 'Settings', href: '/company/settings' }, { label: 'Data Dictionary' }] };
      case '/company/settings/users':
        return { title: 'User Management', breadcrumbs: [{ label: 'Settings', href: '/company/settings' }, { label: 'Users' }] };
      case '/company/settings/organisation':
        return { title: 'Organisation Settings', breadcrumbs: [{ label: 'Settings', href: '/company/settings' }, { label: 'Organisation' }] };
      case '/company/settings/reports':
        return { title: 'Reports & Analytics', breadcrumbs: [{ label: 'Settings', href: '/company/settings' }, { label: 'Reports' }] };
      default:
        return { title: 'Dashboard', breadcrumbs: [] };
    }
  };

  // Function to render the correct screen based on currentPath
  const renderCurrentScreen = () => {
    if (!user) return null;

    // If partner hasn't selected a company workspace yet, show partner dashboard
    if (user.role === 'partner' && !activeCompany && currentPath.startsWith('/partner')) {
      switch (currentPath) {
        case '/partner/dashboard':
          return <PartnerDashboard onNavigateToCompany={handleNavigateToCompany} />;
        case '/partner/settings':
          return <PartnerSettings />;
        default:
          return <PartnerDashboard onNavigateToCompany={handleNavigateToCompany} />;
      }
    }

    // Company routes (used by both company users and partners in company workspace)
    switch (currentPath) {
      case '/company/dashboard':
        return <CompanyDashboard onNavigate={handleNavigate} />;
      case '/company/ropa':
        return <ROPA />;
      case '/company/dpia':
        return <DPIA />;
      case '/company/dsr':
        return <DSR onNavigate={handleNavigate} />;
      case '/company/breaches':
        return <DataBreaches onNavigate={handleNavigate} />;
      case '/company/breaches/report':
        return <IncidentReporting />;
      case '/company/dsr/new':
        return <CreateDSR onBack={() => handleNavigate('/company/dsr')} />;
      case '/company/vendors':
        return <ThirdParties onNavigate={handleNavigate} />;
      case '/company/vendors/new':
        return <CreateThirdParty onBack={() => handleNavigate('/company/vendors')} />;
      case '/company/documents':
        return <DocumentLibrary onNavigate={handleNavigate} />;
      case '/company/documents/new':
        return <CreateDocument onBack={() => handleNavigate('/company/documents')} />;
      case '/company/vendors':
        return <ThirdParties />;
      case '/company/documents':
        return <DocumentLibrary />;
      case '/company/settings/metadata':
        return <MetadataSettings />;
      case '/company/settings/data-dictionary':
        return <DataDictionary />;
      case '/company/settings/users':
        return <UserManagement />;
      case '/company/settings/organisation':
        return <OrganizationSettings />;
      case '/company/settings/reports':
        return <ReportsSettings />;
      
      default:
        // Default to dashboard based on user role and context
        if (user.role === 'partner') {
          if (activeCompany) {
            return <CompanyDashboard onNavigate={handleNavigate} />;
          } else {
            return <PartnerDashboard onNavigateToCompany={handleNavigateToCompany} />;
          }
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
          partnerCompanies={partnerCompanies}
          activeCompany={activeCompany}
          onSwitchCompany={handleSwitchCompany}
        />
      )}
      
      <div className="flex-1 flex flex-col">
        <Header 
          user={user || undefined} 
          onLogout={handleLogout}
          activeCompany={activeCompany}
          title={getPageInfo().title}
          breadcrumbs={getPageInfo().breadcrumbs}
          onNavigate={handleNavigate}
        />
        
        <main className="flex-1 overflow-auto">
          {renderCurrentScreen()}
        </main>
      </div>
    </div>
  );
};

export default Index;
