
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';

interface LoginFormProps {
  onLogin: (email: string, password: string) => void;
  onForgotPassword: () => void;
  onSignUp: () => void;
  loading?: boolean;
  error?: string;
}

const LoginForm = ({ onLogin, onForgotPassword, onSignUp, loading, error }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-surface via-background to-surface-secondary p-4 animate-fade-in">
      <Card className="w-full max-w-md shadow-lg hover:shadow-xl transition-all duration-base">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-foreground">Welcome Back</CardTitle>
          <CardDescription>Sign in to your GDPR Compliance account</CardDescription>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive" className="animate-scale-in">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground transition-colors duration-fast" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground transition-colors duration-fast" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent transition-all duration-fast"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            
            <Button
              type="button"
              variant="link"
              className="p-0 h-auto text-sm text-primary hover:text-primary/80 transition-colors duration-fast"
              onClick={onForgotPassword}
            >
              Forgot your password?
            </Button>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-3">
            <Button type="submit" className="w-full transition-all duration-base hover:scale-105" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
            
            <div className="text-center text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Button
                type="button"
                variant="link"
                className="p-0 h-auto text-primary hover:text-primary/80 transition-colors duration-fast"
                onClick={onSignUp}
              >
                Sign up here
              </Button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default LoginForm;
