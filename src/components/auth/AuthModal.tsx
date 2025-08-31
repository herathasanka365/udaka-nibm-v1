import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Lock, User, Building2 } from "lucide-react";
import loginBackground from "@/assets/login-background.jpg";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  userType: "creator" | "client";
}

interface LoginForm {
  email: string;
  password: string;
}

interface CreatorRegisterForm {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  portfolioLink: string;
  agreedToTerms: boolean;
}

interface ClientRegisterForm {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  companyName: string;
  agreedToTerms: boolean;
}

export function AuthModal({ isOpen, onClose, userType }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const [loginForm, setLoginForm] = useState<LoginForm>({
    email: "",
    password: ""
  });

  const [creatorRegisterForm, setCreatorRegisterForm] = useState<CreatorRegisterForm>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    portfolioLink: "",
    agreedToTerms: false
  });

  const [clientRegisterForm, setClientRegisterForm] = useState<ClientRegisterForm>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    agreedToTerms: false
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!loginForm.email || !loginForm.password) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Placeholder for authentication logic
      console.log(`Logging in ${userType}:`, loginForm);
      
      toast({
        title: "Login Successful!",
        description: `Welcome back! Redirecting to your ${userType} dashboard.`,
      });

      // Redirect to dashboard
      window.location.href = `/dashboard/${userType}`;
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreatorRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!creatorRegisterForm.fullName || !creatorRegisterForm.email || 
        !creatorRegisterForm.password || !creatorRegisterForm.confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    if (creatorRegisterForm.password !== creatorRegisterForm.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    if (!creatorRegisterForm.agreedToTerms) {
      toast({
        title: "Error",
        description: "Please agree to the terms and conditions.",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log("Creator registration:", creatorRegisterForm);
      
      toast({
        title: "Registration Successful!",
        description: "Please check your email for verification. You'll be redirected to your dashboard.",
      });

      // Redirect to dashboard
      setTimeout(() => {
        window.location.href = "/dashboard/creator";
      }, 2000);
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "An error occurred during registration. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClientRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!clientRegisterForm.fullName || !clientRegisterForm.email || 
        !clientRegisterForm.password || !clientRegisterForm.confirmPassword ||
        !clientRegisterForm.companyName) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    if (clientRegisterForm.password !== clientRegisterForm.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    if (!clientRegisterForm.agreedToTerms) {
      toast({
        title: "Error",
        description: "Please agree to the terms and conditions.",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log("Client registration:", clientRegisterForm);
      
      toast({
        title: "Registration Successful!",
        description: "Please check your email for verification. You'll be redirected to your dashboard.",
      });

      // Redirect to dashboard
      setTimeout(() => {
        window.location.href = "/dashboard/client";
      }, 2000);
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "An error occurred during registration. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForms = () => {
    setLoginForm({ email: "", password: "" });
    setCreatorRegisterForm({
      fullName: "", email: "", password: "", confirmPassword: "", portfolioLink: "", agreedToTerms: false
    });
    setClientRegisterForm({
      fullName: "", email: "", password: "", confirmPassword: "", companyName: "", agreedToTerms: false
    });
    setActiveTab("login");
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const handleClose = () => {
    resetForms();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent 
        className="max-w-md mx-auto bg-background border-border shadow-xl"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${loginBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="bg-background/95 backdrop-blur-sm rounded-lg p-6">
          <DialogHeader className="text-center mb-6">
            <div className="flex items-center justify-center mb-4">
              {userType === "creator" ? (
                <User className="w-8 h-8 text-primary" />
              ) : (
                <Building2 className="w-8 h-8 text-primary" />
              )}
            </div>
            <DialogTitle className="text-2xl font-bold text-foreground">
              {userType === "creator" ? "Creator Portal" : "Client Portal"}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              {userType === "creator" 
                ? "Access your creative dashboard and portfolio" 
                : "Manage your projects and find talent"
              }
            </DialogDescription>
          </DialogHeader>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            {/* Login Tab */}
            <TabsContent value="login">
              <Card className="border-0 shadow-none">
                <CardContent className="p-0 space-y-4">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">Email Address</Label>
                      <Input
                        id="login-email"
                        type="email"
                        value={loginForm.email}
                        onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="login-password">Password</Label>
                      <div className="relative">
                        <Input
                          id="login-password"
                          type={showPassword ? "text" : "password"}
                          value={loginForm.password}
                          onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                          placeholder="Enter your password"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                          aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                          Signing In...
                        </>
                      ) : (
                        <>
                          <Lock className="w-4 h-4 mr-2" />
                          Sign In
                        </>
                      )}
                    </Button>
                  </form>

                  <div className="text-center text-sm">
                    <a href="#" className="text-primary hover:underline">
                      Forgot your password?
                    </a>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Register Tab */}
            <TabsContent value="register">
              <Card className="border-0 shadow-none">
                <CardContent className="p-0 space-y-4">
                  {userType === "creator" ? (
                    <form onSubmit={handleCreatorRegister} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="creator-name">Full Name *</Label>
                        <Input
                          id="creator-name"
                          type="text"
                          value={creatorRegisterForm.fullName}
                          onChange={(e) => setCreatorRegisterForm(prev => ({ ...prev, fullName: e.target.value }))}
                          placeholder="Enter your full name"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="creator-email">Email Address *</Label>
                        <Input
                          id="creator-email"
                          type="email"
                          value={creatorRegisterForm.email}
                          onChange={(e) => setCreatorRegisterForm(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="Enter your email"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="creator-portfolio">Portfolio Link</Label>
                        <Input
                          id="creator-portfolio"
                          type="url"
                          value={creatorRegisterForm.portfolioLink}
                          onChange={(e) => setCreatorRegisterForm(prev => ({ ...prev, portfolioLink: e.target.value }))}
                          placeholder="https://your-portfolio.com"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-2">
                          <Label htmlFor="creator-password">Password *</Label>
                          <div className="relative">
                            <Input
                              id="creator-password"
                              type={showPassword ? "text" : "password"}
                              value={creatorRegisterForm.password}
                              onChange={(e) => setCreatorRegisterForm(prev => ({ ...prev, password: e.target.value }))}
                              placeholder="Password"
                              required
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                              onClick={() => setShowPassword(!showPassword)}
                              aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                              {showPassword ? (
                                <EyeOff className="h-3 w-3" />
                              ) : (
                                <Eye className="h-3 w-3" />
                              )}
                            </Button>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="creator-confirm-password">Confirm *</Label>
                          <div className="relative">
                            <Input
                              id="creator-confirm-password"
                              type={showConfirmPassword ? "text" : "password"}
                              value={creatorRegisterForm.confirmPassword}
                              onChange={(e) => setCreatorRegisterForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                              placeholder="Confirm"
                              required
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                            >
                              {showConfirmPassword ? (
                                <EyeOff className="h-3 w-3" />
                              ) : (
                                <Eye className="h-3 w-3" />
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="creator-terms"
                          checked={creatorRegisterForm.agreedToTerms}
                          onCheckedChange={(checked) => 
                            setCreatorRegisterForm(prev => ({ ...prev, agreedToTerms: checked as boolean }))
                          }
                          required
                        />
                        <Label htmlFor="creator-terms" className="text-sm">
                          I agree to the{" "}
                          <a href="#" className="text-primary hover:underline">
                            Terms & Conditions
                          </a>
                        </Label>
                      </div>

                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                            Creating Account...
                          </>
                        ) : (
                          "Create Creator Account"
                        )}
                      </Button>
                    </form>
                  ) : (
                    <form onSubmit={handleClientRegister} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="client-name">Full Name *</Label>
                        <Input
                          id="client-name"
                          type="text"
                          value={clientRegisterForm.fullName}
                          onChange={(e) => setClientRegisterForm(prev => ({ ...prev, fullName: e.target.value }))}
                          placeholder="Enter your full name"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="client-email">Email Address *</Label>
                        <Input
                          id="client-email"
                          type="email"
                          value={clientRegisterForm.email}
                          onChange={(e) => setClientRegisterForm(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="Enter your email"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="client-company">Company Name *</Label>
                        <Input
                          id="client-company"
                          type="text"
                          value={clientRegisterForm.companyName}
                          onChange={(e) => setClientRegisterForm(prev => ({ ...prev, companyName: e.target.value }))}
                          placeholder="Enter your company name"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-2">
                          <Label htmlFor="client-password">Password *</Label>
                          <div className="relative">
                            <Input
                              id="client-password"
                              type={showPassword ? "text" : "password"}
                              value={clientRegisterForm.password}
                              onChange={(e) => setClientRegisterForm(prev => ({ ...prev, password: e.target.value }))}
                              placeholder="Password"
                              required
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                              onClick={() => setShowPassword(!showPassword)}
                              aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                              {showPassword ? (
                                <EyeOff className="h-3 w-3" />
                              ) : (
                                <Eye className="h-3 w-3" />
                              )}
                            </Button>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="client-confirm-password">Confirm *</Label>
                          <div className="relative">
                            <Input
                              id="client-confirm-password"
                              type={showConfirmPassword ? "text" : "password"}
                              value={clientRegisterForm.confirmPassword}
                              onChange={(e) => setClientRegisterForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                              placeholder="Confirm"
                              required
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                            >
                              {showConfirmPassword ? (
                                <EyeOff className="h-3 w-3" />
                              ) : (
                                <Eye className="h-3 w-3" />
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="client-terms"
                          checked={clientRegisterForm.agreedToTerms}
                          onCheckedChange={(checked) => 
                            setClientRegisterForm(prev => ({ ...prev, agreedToTerms: checked as boolean }))
                          }
                          required
                        />
                        <Label htmlFor="client-terms" className="text-sm">
                          I agree to the{" "}
                          <a href="#" className="text-primary hover:underline">
                            Terms & Conditions
                          </a>
                        </Label>
                      </div>

                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                            Creating Account...
                          </>
                        ) : (
                          "Create Client Account"
                        )}
                      </Button>
                    </form>
                  )}

                  <div className="text-center text-xs text-muted-foreground">
                    <p>Email verification will be sent after registration</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}