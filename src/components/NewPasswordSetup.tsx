import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Building2, Lock, Eye, EyeOff, CheckCircle, ArrowLeft } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { toast } from "sonner@2.0.3";

interface NewPasswordSetupProps {
  onPasswordSetSuccess: () => void;
  onBack: () => void;
  userName: string;
}

export function NewPasswordSetup({ onPasswordSetSuccess, onBack, userName }: NewPasswordSetupProps) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validatePassword = (password: string) => {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasNonalphas = /\W/.test(password);
    
    return {
      minLength,
      hasUpperCase,
      hasLowerCase,
      hasNumbers,
      hasNonalphas,
      isValid: minLength && hasUpperCase && hasLowerCase && hasNumbers && hasNonalphas
    };
  };

  const passwordValidation = validatePassword(newPassword);
  const passwordsMatch = newPassword === confirmPassword && confirmPassword.length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!passwordValidation.isValid) {
      toast.error("Please ensure your password meets all requirements");
      return;
    }

    if (!passwordsMatch) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);
    
    // Simulate API call for password setup
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Password set successfully! Redirecting to login...");
      setTimeout(() => {
        onPasswordSetSuccess();
      }, 1500);
    }, 1500);
  };

  const ValidationItem = ({ isValid, text }: { isValid: boolean; text: string }) => (
    <div className={`flex items-center gap-2 text-xs ${isValid ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`}>
      <CheckCircle className={`h-3 w-3 ${isValid ? 'text-green-600' : 'text-muted-foreground'}`} />
      <span>{text}</span>
    </div>
  );

  return (
    <div className="h-dvh flex overflow-hidden">
      {/* Left side - Merchant Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-primary/70 z-10" />
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1686397141115-320ba1631f62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBidXNpbmVzcyUyMG1lcmNoYW50JTIwc3RvcmV8ZW58MXx8fHwxNzU1NzYxMjUzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Modern business merchant store"
          className="w-full h-full object-cover"
        />
        
        {/* Overlay Content */}
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-white p-6 lg:p-8 xl:p-12">
          <div className="text-center max-w-md">
            <div className="mb-3 lg:mb-4 xl:mb-6">
              <div className="inline-flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 xl:w-16 xl:h-16 bg-white/20 backdrop-blur-sm rounded-lg mb-2 lg:mb-3 xl:mb-4">
                <Building2 className="h-5 w-5 lg:h-6 lg:w-6 xl:h-8 xl:w-8 text-white" />
              </div>
            </div>
            <h1 className="text-2xl lg:text-3xl xl:text-4xl mb-2 lg:mb-3 xl:mb-4">Secure Your Account</h1>
            <p className="text-base lg:text-lg xl:text-xl text-white/90 leading-relaxed">
              Create a strong password to protect your merchant portal
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Password Setup Form */}
      <div className="w-full lg:w-1/2 flex flex-col min-h-0">
        <div className="flex-1 flex items-center justify-center p-3 sm:p-4 md:p-6 lg:p-8 overflow-auto">
          <div className="w-full max-w-sm sm:max-w-md">
            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-4 sm:mb-6">
              <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-primary rounded-lg mb-2 sm:mb-3">
                <Lock className="h-5 w-5 sm:h-6 sm:w-6 text-primary-foreground" />
              </div>
              <h1 className="text-lg sm:text-xl md:text-2xl text-foreground">Create Password</h1>
              <p className="text-sm text-muted-foreground">Merchant Portal Setup</p>
            </div>

            <Card className="border-0 shadow-none lg:border lg:shadow-sm">
              <CardHeader className="text-center lg:text-left px-0 lg:px-6 pb-3 sm:pb-4 lg:pb-6">
                <CardTitle className="text-lg sm:text-xl lg:text-2xl flex items-center gap-2 justify-center lg:justify-start">
                  <Lock className="h-5 w-5 text-primary" />
                  Create New Password
                </CardTitle>
                <CardDescription className="text-sm">
                  Welcome {userName}! Please create a secure password for your account
                </CardDescription>
              </CardHeader>
              
              <CardContent className="px-0 lg:px-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <div className="relative">
                      <Input
                        id="new-password"
                        type={showNewPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter your new password"
                        required
                        className="h-10 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute inset-y-0 right-0 flex items-center justify-center w-10 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <div className="relative">
                      <Input
                        id="confirm-password"
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm your new password"
                        required
                        className="h-10 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 flex items-center justify-center w-10 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {confirmPassword.length > 0 && (
                      <div className={`text-xs ${passwordsMatch ? 'text-green-600' : 'text-destructive'}`}>
                        {passwordsMatch ? '✓ Passwords match' : '✗ Passwords do not match'}
                      </div>
                    )}
                  </div>

                  {/* Password Requirements */}
                  <div className="space-y-2 p-3 bg-muted/30 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-2">Password must contain:</p>
                    <div className="space-y-1">
                      <ValidationItem isValid={passwordValidation.minLength} text="At least 8 characters" />
                      <ValidationItem isValid={passwordValidation.hasUpperCase} text="One uppercase letter" />
                      <ValidationItem isValid={passwordValidation.hasLowerCase} text="One lowercase letter" />
                      <ValidationItem isValid={passwordValidation.hasNumbers} text="One number" />
                      <ValidationItem isValid={passwordValidation.hasNonalphas} text="One special character" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <Button 
                      type="submit" 
                      className="w-full h-10"
                      disabled={isLoading || !passwordValidation.isValid || !passwordsMatch}
                    >
                      {isLoading ? "Setting Password..." : "Set Password"}
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      onClick={onBack}
                      className="w-full h-10"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to Verification
                    </Button>
                  </div>
                </form>

                <div className="mt-4 text-center">
                  <p className="text-xs text-muted-foreground">
                    After setting your password, you'll be redirected to the login page
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}