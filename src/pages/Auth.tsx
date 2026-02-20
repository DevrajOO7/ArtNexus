import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from "sonner";
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const Auth = () => {
  const location = useLocation();
  const [isSignIn, setIsSignIn] = useState(location.pathname === '/login');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Update the mode when the URL changes
    setIsSignIn(location.pathname === '/login');
  }, [location.pathname]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignIn) {
        // Sign In Logic
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) throw error;

        toast.success("Welcome back!", {
          description: "You have successfully signed in.",
        });
        navigate('/');
      } else {
        // Sign Up Logic
        const { error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              full_name: formData.name,
            },
          },
        });

        if (error) throw error;

        toast.success("Account created!", {
          description: "Please check your email to verify your account.",
        });

        if (!error) {
          // Create profile entry
          // Note: This is ideally handled by a database trigger, but we can do a fallback check
          // or just let the user proceed.
        }
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      toast.error("Authentication failed", {
        description: error.message || "An unexpected error occurred",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Design */}
      <div className="absolute inset-0 bg-gradient-to-br from-artnexus-purple/10 to-artnexus-purple/5">
        <div className="absolute inset-0 bg-white/5 opacity-10" />
        <div className="absolute top-0 left-0 w-72 h-72 bg-artnexus-purple/20 rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-artnexus-purple/20 rounded-full filter blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <Card className="w-full bg-background/95 backdrop-blur-sm border-artnexus-purple/20">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center text-artnexus-purple">
              {isSignIn ? 'Welcome Back' : 'Join ArtNexus'}
            </CardTitle>
            <CardDescription className="text-center">
              {isSignIn
                ? 'Sign in to continue your artistic journey'
                : 'Create an account to explore the world of art'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isSignIn && (
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    required={!isSignIn}
                    className="border-artnexus-purple/20 focus:border-artnexus-purple"
                  />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="border-artnexus-purple/20 focus:border-artnexus-purple"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="border-artnexus-purple/20 focus:border-artnexus-purple pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-artnexus-purple hover:bg-artnexus-purple/90"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isSignIn ? 'Signing In...' : 'Creating Account...'}
                  </>
                ) : (
                  isSignIn ? 'Sign In' : 'Create Account'
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-center">
              {isSignIn ? "Don't have an account?" : "Already have an account?"}{' '}
              <Button
                variant="link"
                className="p-0 h-auto text-artnexus-purple hover:text-artnexus-purple/80"
                onClick={() => setIsSignIn(!isSignIn)}
              >
                {isSignIn ? 'Sign up' : 'Sign in'}
              </Button>
            </div>
            <div className="text-sm text-center text-muted-foreground">
              By continuing, you agree to our{' '}
              <Link to="/terms" className="text-artnexus-purple hover:underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="text-artnexus-purple hover:underline">
                Privacy Policy
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
