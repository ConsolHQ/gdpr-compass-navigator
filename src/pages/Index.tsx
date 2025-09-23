import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Users, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">GDPR Compliance Platform</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive GDPR compliance management for companies and partner organizations
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          {/* Partner Account Option */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/partner')}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <Building2 className="h-8 w-8 text-primary" />
                <span>Partner Account</span>
              </CardTitle>
              <CardDescription className="text-base">
                Manage multiple client companies with multi-workspace support
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm">
                <li className="flex items-center space-x-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>Multi-workspace management</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>Client company isolation</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>Team collaboration tools</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>Task management system</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>Workspace-scoped metadata</span>
                </li>
              </ul>
              <div className="flex items-center justify-between pt-4">
                <span className="text-sm text-muted-foreground">For consultants & agencies</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          {/* Company Account Option */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/company')}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <Users className="h-8 w-8 text-primary" />
                <span>Company Account</span>
              </CardTitle>
              <CardDescription className="text-base">
                Direct company access for single organization compliance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm">
                <li className="flex items-center space-x-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>ROPA management</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>DPIA assessments</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>DSR handling</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>Breach notifications</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>AI-powered assistance</span>
                </li>
              </ul>
              <div className="flex items-center justify-between pt-4">
                <span className="text-sm text-muted-foreground">For individual companies</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            Choose your account type to get started with GDPR compliance management
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;