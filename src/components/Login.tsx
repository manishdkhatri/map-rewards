import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { CreditCard, Eye, EyeOff, Building2, Mail, ArrowLeft, Smartphone, CheckCircle } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { toast } from "sonner@2.0.3";

interface LoginProps {
  onLogin: () => void;
  onTempLogin?: (email: string, password: string) => void;
}

export function Login({ onLogin, onTempLogin }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Forgot password state
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [empId, setEmpId] = useState("");
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [isForgotPasswordLoading, setIsForgotPasswordLoading] = useState(false);
  const [forgotPasswordSent, setForgotPasswordSent] = useState(false);

  // OTP state
  const [isOtpOpen, setIsOtpOpen] = useState(false);
  const [otp, setOtp] = useState("");
  const [isOtpLoading, setIsOtpLoading] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    
    // Check if this is a temporary login (demo credentials)
    if (onTempLogin && email === "temp@merchant.com" && password === "temp123") {
      setTimeout(() => {
        setIsLoading(false);
        toast.success("Temporary login detected! Proceeding to email verification...");
        onTempLogin(email, password);
      }, 1000);
      return;
    }
    
    // Regular login flow
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Login successful!");
      onLogin();
    }, 1000);
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!empId || !forgotPasswordEmail) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(forgotPasswordEmail)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsForgotPasswordLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsForgotPasswordLoading(false);
      setIsForgotPasswordOpen(false);
      setIsOtpOpen(true);
      toast.success("OTP sent to your mobile number!");
    }, 1500);
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!otp || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    setIsOtpLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsOtpLoading(false);
      setIsOtpOpen(false);
      setIsSuccessOpen(true);
      
      // Reset all form states after showing success
      setTimeout(() => {
        setIsSuccessOpen(false);
        setEmpId("");
        setForgotPasswordEmail("");
        setOtp("");
      }, 3000);
    }, 1500);
  };

  const handleForgotPasswordClose = () => {
    setIsForgotPasswordOpen(false);
    setForgotPasswordSent(false);
    setEmpId("");
    setForgotPasswordEmail("");
  };

  const handleOtpClose = () => {
    setIsOtpOpen(false);
    setOtp("");
  };

  const handleSuccessClose = () => {
    setIsSuccessOpen(false);
    setEmpId("");
    setForgotPasswordEmail("");
    setOtp("");
  };

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
        
        {/* Overlay Content - Responsive positioning */}
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-white p-6 lg:p-8 xl:p-12">
          <div className="text-center max-w-md">
            <div className="mb-3 lg:mb-4 xl:mb-6">
              <div className="inline-flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 xl:w-16 xl:h-16 bg-white/20 backdrop-blur-sm rounded-lg mb-2 lg:mb-3 xl:mb-4">
                <Building2 className="h-5 w-5 lg:h-6 lg:w-6 xl:h-8 xl:w-8 text-white" />
              </div>
            </div>
            <h1 className="text-2xl lg:text-3xl xl:text-4xl mb-2 lg:mb-3 xl:mb-4">Welcome to Merchant Portal</h1>
            <p className="text-base lg:text-lg xl:text-xl text-white/90 leading-relaxed">
              Manage your e-commerce business with our comprehensive merchant management platform
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col min-h-0">
        <div className="flex-1 flex items-center justify-center p-3 sm:p-4 md:p-6 lg:p-8 overflow-auto">
          <div className="w-full max-w-sm sm:max-w-md">
            {/* Mobile Logo - More compact */}
            <div className="lg:hidden text-center mb-4 sm:mb-6">
              <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-primary rounded-lg mb-2 sm:mb-3">
                <CreditCard className="h-5 w-5 sm:h-6 sm:w-6 text-primary-foreground" />
              </div>
              <h1 className="text-lg sm:text-xl md:text-2xl text-foreground">Merchant Portal</h1>
              <p className="text-sm text-muted-foreground">E-Commerce Platform</p>
            </div>

            <Card className="border-0 shadow-none lg:border lg:shadow-sm">
              <CardHeader className="text-center lg:text-left px-0 lg:px-6 pb-3 sm:pb-4 lg:pb-6">
                <CardTitle className="text-lg sm:text-xl lg:text-2xl">Sign in to your account</CardTitle>
                <CardDescription className="text-sm">
                  Enter your credentials to access the merchant portal
                </CardDescription>
              </CardHeader>
              
              <CardContent className="px-0 lg:px-6">
                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="email">Email address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      className="h-9 sm:h-10"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                        className="h-9 sm:h-10 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 flex items-center justify-center w-9 sm:w-10 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-end text-sm">
                    <Dialog open={isForgotPasswordOpen} onOpenChange={setIsForgotPasswordOpen}>
                      <DialogTrigger asChild>
                        <button
                          type="button"
                          className="text-sm text-primary hover:underline"
                        >
                          Forgot password?
                        </button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            <Mail className="h-5 w-5 text-primary" />
                            {forgotPasswordSent ? "Check Your Email" : "Reset Password"}
                          </DialogTitle>
                          <DialogDescription>
                            {forgotPasswordSent 
                              ? "We've sent password reset instructions to your email address."
                              : "Enter your Employee ID and email address to proceed with password reset."
                            }
                          </DialogDescription>
                        </DialogHeader>
                        
                        {!forgotPasswordSent ? (
                          <form onSubmit={handleForgotPassword} className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="empId">Employee ID</Label>
                              <Input
                                id="empId"
                                type="text"
                                value={empId}
                                onChange={(e) => setEmpId(e.target.value)}
                                placeholder="Enter your Employee ID"
                                required
                                className="h-10"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="forgot-email">Email address</Label>
                              <Input
                                id="forgot-email"
                                type="email"
                                value={forgotPasswordEmail}
                                onChange={(e) => setForgotPasswordEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                                className="h-10"
                              />
                            </div>
                            
                            <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 space-y-2 space-y-reverse sm:space-y-0">
                              <Button
                                type="button"
                                variant="outline"
                                onClick={handleForgotPasswordClose}
                                className="h-10"
                              >
                                Cancel
                              </Button>
                              <Button 
                                type="submit" 
                                disabled={isForgotPasswordLoading}
                                className="h-10"
                              >
                                {isForgotPasswordLoading ? "Processing..." : "Proceed"}
                              </Button>
                            </div>
                          </form>
                        ) : (
                          <div className="space-y-4">
                            <div className="flex items-center justify-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                              <div className="text-center">
                                <Mail className="h-8 w-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
                                <p className="text-sm text-green-800 dark:text-green-200">
                                  Password reset link sent to:
                                </p>
                                <p className="text-sm font-medium text-green-900 dark:text-green-100">
                                  {forgotPasswordEmail}
                                </p>
                              </div>
                            </div>
                            
                            <div className="text-xs text-muted-foreground text-center">
                              Didn't receive the email? Check your spam folder or contact support.
                            </div>
                            
                            <Button 
                              onClick={handleForgotPasswordClose}
                              className="w-full h-10"
                              variant="outline"
                            >
                              <ArrowLeft className="h-4 w-4 mr-2" />
                              Back to Login
                            </Button>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-9 sm:h-10"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign in"}
                  </Button>
                </form>

                <div className="mt-3 sm:mt-4 text-center">
                  <p className="text-xs text-muted-foreground">
                    Demo: admin@merchant.com / password123
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    New User Setup: temp@merchant.com / temp123
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* OTP Dialog */}
      <Dialog open={isOtpOpen} onOpenChange={setIsOtpOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Smartphone className="h-5 w-5 text-primary" />
              Mobile OTP Verification
            </DialogTitle>
            <DialogDescription>
              Enter the 6-digit OTP sent to your registered mobile number.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleOtpSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="otp">Enter OTP</Label>
              <Input
                id="otp"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="000000"
                maxLength={6}
                required
                className="h-10 text-center tracking-widest text-lg"
              />
              <p className="text-xs text-muted-foreground text-center">
                Please enter the 6-digit code sent to your mobile
              </p>
            </div>
            
            <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 space-y-2 space-y-reverse sm:space-y-0">
              <Button
                type="button"
                variant="outline"
                onClick={handleOtpClose}
                className="h-10"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isOtpLoading || otp.length !== 6}
                className="h-10"
              >
                {isOtpLoading ? "Verifying..." : "Submit OTP"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={isSuccessOpen} onOpenChange={setIsSuccessOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Password Reset Successful
            </DialogTitle>
            <DialogDescription>
              Your password reset request has been processed successfully.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="flex items-center justify-center p-6 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-center">
                <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400 mx-auto mb-3" />
                <p className="text-sm text-green-800 dark:text-green-200">
                  Temporary password has been sent to given email address.
                </p>
              </div>
            </div>
            
            <div className="text-xs text-muted-foreground text-center">
              Please check your email for the temporary password and change it after logging in.
            </div>
            
            <Button 
              onClick={handleSuccessClose}
              className="w-full h-10"
            >
              Continue to Login
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}