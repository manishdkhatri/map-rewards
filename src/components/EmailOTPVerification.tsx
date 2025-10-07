import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Building2, Mail, ArrowLeft, Smartphone } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { toast } from "sonner@2.0.3";

interface EmailOTPVerificationProps {
  onVerifySuccess: () => void;
  onBack: () => void;
  userEmail: string;
}

export function EmailOTPVerification({ onVerifySuccess, onBack, userEmail }: EmailOTPVerificationProps) {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!otp || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    setIsLoading(true);
    
    // Simulate API call for OTP verification
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Email verification successful!");
      onVerifySuccess();
    }, 1500);
  };

  const handleResendOTP = () => {
    toast.success("OTP resent to your email address!");
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
        
        {/* Overlay Content */}
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-white p-6 lg:p-8 xl:p-12">
          <div className="text-center max-w-md">
            <div className="mb-3 lg:mb-4 xl:mb-6">
              <div className="inline-flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 xl:w-16 xl:h-16 bg-white/20 backdrop-blur-sm rounded-lg mb-2 lg:mb-3 xl:mb-4">
                <Building2 className="h-5 w-5 lg:h-6 lg:w-6 xl:h-8 xl:w-8 text-white" />
              </div>
            </div>
            <h1 className="text-2xl lg:text-3xl xl:text-4xl mb-2 lg:mb-3 xl:mb-4">Welcome to Merchant Portal</h1>
            <p className="text-base lg:text-lg xl:text-xl text-white/90 leading-relaxed">
              Verify your email to continue setting up your account
            </p>
          </div>
        </div>
      </div>

      {/* Right side - OTP Verification Form */}
      <div className="w-full lg:w-1/2 flex flex-col min-h-0">
        <div className="flex-1 flex items-center justify-center p-3 sm:p-4 md:p-6 lg:p-8 overflow-auto">
          <div className="w-full max-w-sm sm:max-w-md">
            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-4 sm:mb-6">
              <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-primary rounded-lg mb-2 sm:mb-3">
                <Smartphone className="h-5 w-5 sm:h-6 sm:w-6 text-primary-foreground" />
              </div>
              <h1 className="text-lg sm:text-xl md:text-2xl text-foreground">Email Verification</h1>
              <p className="text-sm text-muted-foreground">Merchant Portal Setup</p>
            </div>

            <Card className="border-0 shadow-none lg:border lg:shadow-sm">
              <CardHeader className="text-center lg:text-left px-0 lg:px-6 pb-3 sm:pb-4 lg:pb-6">
                <CardTitle className="text-lg sm:text-xl lg:text-2xl flex items-center gap-2 justify-center lg:justify-start">
                  <Mail className="h-5 w-5 text-primary" />
                  Verify Your Email
                </CardTitle>
                <CardDescription className="text-sm">
                  We've sent a 6-digit verification code to your email address
                </CardDescription>
              </CardHeader>
              
              <CardContent className="px-0 lg:px-6">
                <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-blue-800 dark:text-blue-200">
                      Code sent to: <strong>{userEmail}</strong>
                    </span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="otp">Enter 6-Digit Code</Label>
                    <Input
                      id="otp"
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      placeholder="000000"
                      maxLength={6}
                      required
                      className="h-12 text-center tracking-widest text-lg"
                    />
                    <p className="text-xs text-muted-foreground text-center">
                      Enter the verification code sent to your email
                    </p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <Button 
                      type="submit" 
                      className="w-full h-10"
                      disabled={isLoading || otp.length !== 6}
                    >
                      {isLoading ? "Verifying..." : "Verify Email"}
                    </Button>

                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={onBack}
                        className="flex-1 h-10"
                      >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Login
                      </Button>
                      
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={handleResendOTP}
                        className="flex-1 h-10"
                      >
                        Resend Code
                      </Button>
                    </div>
                  </div>
                </form>

                <div className="mt-4 text-center">
                  <p className="text-xs text-muted-foreground">
                    Didn't receive the code? Check your spam folder or click resend
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