import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Eye, EyeOff, Mail, Lock, User, Building } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { z } from 'zod';
import EmailVerification from './EmailVerification';

const signUpSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(50, "First name must be less than 50 characters"),
  lastName: z.string().trim().min(1, "Last name is required").max(50, "Last name must be less than 50 characters"),
  email: z.string().trim().min(1, "Email is required").email("Please enter a valid email address").max(255, "Email must be less than 255 characters"),
  password: z.string().min(8, "Password must be at least 8 characters long").max(100, "Password must be less than 100 characters"),
  confirmPassword: z.string(),
  accountType: z.enum(['company', 'partner'], { required_error: "Please select an account type" }),
  companyName: z.string().trim().max(100, "Company name must be less than 100 characters").optional()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
}).refine((data) => {
  if (data.accountType === 'company' && (!data.companyName || data.companyName.trim() === '')) {
    return false;
  }
  return true;
}, {
  message: "Company name is required for company accounts",
  path: ["companyName"],
});

interface SignUpFormProps {
  onSignUp: (userId: string, accountType: 'company' | 'partner') => void;
  onLogin: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSignUp, onLogin }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    accountType: '' as 'company' | 'partner' | '',
    companyName: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showVerification, setShowVerification] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState('');
  const [verificationLoading, setVerificationLoading] = useState(false);
  const [verificationError, setVerificationError] = useState('');
  const [pendingUserData, setPendingUserData] = useState<{
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    accountType: 'company' | 'partner';
    companyName?: string;
  } | null>(null);

  const handleVerifyEmail = async (code: string) => {
    if (!pendingUserData) return;
    
    setVerificationLoading(true);
    setVerificationError('');

    try {
      // Verify the OTP
      const { data, error } = await supabase.auth.verifyOtp({
        email: pendingUserData.email,
        token: code,
        type: 'email'
      });

      if (error) throw error;

      if (data.user) {
        // Now sign up the user with password
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email: pendingUserData.email,
          password: pendingUserData.password,
          options: {
            data: {
              first_name: pendingUserData.firstName,
              last_name: pendingUserData.lastName,
              account_type: pendingUserData.accountType,
              company_name: pendingUserData.companyName || null
            }
          }
        });

        if (signUpError) throw signUpError;

        if (signUpData.user) {
          toast({
            title: "Account created successfully!",
            description: "You can now sign in to your account.",
          });
          onSignUp(signUpData.user.id, pendingUserData.accountType);
        }
      }
    } catch (error) {
      setVerificationError(error instanceof Error ? error.message : "Verification failed");
    } finally {
      setVerificationLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!pendingUserData) return;

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: pendingUserData.email,
        options: {
          shouldCreateUser: true,
          data: {
            first_name: pendingUserData.firstName,
            last_name: pendingUserData.lastName,
            account_type: pendingUserData.accountType,
            company_name: pendingUserData.companyName || null
          }
        }
      });

      if (error) throw error;

      toast({
        title: "Code resent!",
        description: "Please check your email for the new verification code.",
      });
    } catch (error) {
      toast({
        title: "Failed to resend code",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  const handleBackToSignUp = () => {
    setShowVerification(false);
    setPendingUserData(null);
    setVerificationEmail('');
    setVerificationError('');
  };

  if (showVerification) {
    return (
      <EmailVerification
        email={verificationEmail}
        onVerify={handleVerifyEmail}
        onResendCode={handleResendCode}
        onBack={handleBackToSignUp}
        loading={verificationLoading}
        error={verificationError}
      />
    );
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      // Validate form data
      const validatedData = signUpSchema.parse(formData);
      
      // Store the user data for after verification
      setPendingUserData({
        email: validatedData.email,
        password: validatedData.password,
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        accountType: validatedData.accountType,
        companyName: validatedData.companyName
      });
      
      // Send OTP for email verification
      const { error } = await supabase.auth.signInWithOtp({
        email: validatedData.email,
        options: {
          shouldCreateUser: true,
          data: {
            first_name: validatedData.firstName,
            last_name: validatedData.lastName,
            account_type: validatedData.accountType,
            company_name: validatedData.companyName || null
          }
        }
      });

      if (error) throw error;

      // Show verification screen
      setVerificationEmail(validatedData.email);
      setShowVerification(true);
      toast({
        title: "Verification code sent!",
        description: "Please check your email for the 6-digit verification code.",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        toast({
          title: "Sign up failed",
          description: error instanceof Error ? error.message : "An unexpected error occurred",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-slate-900">Create Account</CardTitle>
          <CardDescription>Get started with GDPR Compliance</CardDescription>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {/* Account Type Selection */}
            <div className="space-y-3">
              <Label>I am signing up as:</Label>
              <RadioGroup
                value={formData.accountType}
                onValueChange={(value) => handleInputChange('accountType', value)}
                className="grid grid-cols-2 gap-4"
              >
                <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-slate-50">
                  <RadioGroupItem value="company" id="company" />
                  <Label htmlFor="company" className="cursor-pointer flex items-center">
                    <Building className="h-4 w-4 mr-2" />
                    <div>
                      <div className="font-medium">Company</div>
                      <div className="text-xs text-muted-foreground">Direct compliance management</div>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-slate-50">
                  <RadioGroupItem value="partner" id="partner" />
                  <Label htmlFor="partner" className="cursor-pointer flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    <div>
                      <div className="font-medium">Partner</div>
                      <div className="text-xs text-muted-foreground">Manage multiple clients</div>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
              {errors.accountType && <p className="text-sm text-red-500">{errors.accountType}</p>}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="pl-10"
                  />
                </div>
                {errors.firstName && <p className="text-sm text-red-500">{errors.firstName}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                />
                {errors.lastName && <p className="text-sm text-red-500">{errors.lastName}</p>}
              </div>
            </div>

            {/* Company Name (for company accounts) */}
            {formData.accountType === 'company' && (
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <div className="relative">
                  <Building className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="companyName"
                    placeholder="Your Company Name"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    className="pl-10"
                  />
                </div>
                {errors.companyName && <p className="text-sm text-red-500">{errors.companyName}</p>}
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@company.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="pl-10"
                />
              </div>
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a strong password (min. 8 characters)"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="pl-10 pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className="pl-10 pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-3">
            <Button 
              type="submit" 
              className="w-full" 
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
            
            <div className="text-center text-sm text-slate-600">
              Already have an account?{' '}
              <Button
                type="button"
                variant="link"
                className="p-0 h-auto text-blue-600 hover:text-blue-800"
                onClick={onLogin}
              >
                Sign in here
              </Button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default SignUpForm;