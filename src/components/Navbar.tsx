/**
 * ArtNexus - Navigation Bar Component
 * 
 * @author Prompt007dev
 * @created 2024
 * @description Main navigation component with responsive design and theme switching
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useTheme } from "@/components/theme-provider"
import { Moon, Sun } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Menu, X, User, LogOut, LayoutDashboard } from 'lucide-react';
import Logo from '@/components/Logo';

const linkClasses = "text-sm font-medium hover:text-artnexus-purple transition-colors";

const Navbar = () => {
  const location = useLocation();
  const [isSearchDialogOpen, setIsSearchDialogOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light');
  const isMobile = useIsMobile();
  const { user, signOut } = useAuth();

  useEffect(() => {
    setMounted(true);
    // Check if dark mode is active
    const isDarkMode = document.documentElement.classList.contains('dark');
    setCurrentTheme(isDarkMode ? 'dark' : 'light');
  }, []);

  const toggleTheme = () => {
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    setCurrentTheme(newTheme);
  }

  return (
    <header className="sticky top-0 z-40 bg-background border-b shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Logo size="small" className="mr-2" />
            <nav className="hidden md:flex items-center space-x-3 ml-2">
              <Link to="/" className={linkClasses}>Home</Link>
              <Link to="/discover" className={linkClasses}>Discover</Link>
              <Link to="/marketplace" className={linkClasses}>Marketplace</Link>
              <Link to="/ar-view/1" className={linkClasses}>Wall Preview</Link>
              <Link to="/ar-gallery" className={linkClasses}>AR Experience</Link>
              <Link to="/ar-models" className={linkClasses}>3D Viewer</Link>
              <Link to="/events" className={linkClasses}>Events</Link>
              <Link to="/art-classes" className={linkClasses}>Classes</Link>
            </nav>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSearchDialogOpen(true)}
              className="px-2"
            >
              <Search className="h-4 w-4" />
            </Button>

            <Button variant="ghost" size="sm" onClick={toggleTheme}>
              {mounted && (
                currentTheme === 'light' ? (
                  <Sun className="h-[1.2rem] w-[1.2rem]" />
                ) : (
                  <Moon className="h-[1.2rem] w-[1.2rem]" />
                )
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>

            {!isMobile && (
              <>
                {user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.user_metadata?.avatar_url} alt={user.user_metadata?.full_name || user.email} />
                          <AvatarFallback>{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">{user.user_metadata?.full_name || 'User'}</p>
                          <p className="text-xs leading-none text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to="/profile" className="cursor-pointer w-full">
                          <User className="mr-2 h-4 w-4" />
                          <span>Profile</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/dashboard" className="cursor-pointer w-full">
                          <LayoutDashboard className="mr-2 h-4 w-4" />
                          <span>Dashboard</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer text-red-500 focus:text-red-500">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="hidden md:flex"
                  >
                    <Link to="/login">Sign In</Link>
                  </Button>
                )}
              </>
            )}

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[85vw] sm:w-80 pt-10">
                <div className="flex items-center mb-6">
                  {user ? (
                    <>
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src={user.user_metadata?.avatar_url} alt={user.email} />
                        <AvatarFallback>{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{user.user_metadata?.full_name || 'User'}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </>
                  ) : (
                    <div>
                      <p className="text-sm font-medium">Guest User</p>
                      <p className="text-xs text-muted-foreground">Sign in to access more features</p>
                    </div>
                  )}
                </div>
                <nav className="grid gap-4 py-4">
                  <Link to="/" className={linkClasses + " flex items-center p-2 rounded-md hover:bg-muted"}>Home</Link>
                  <Link to="/discover" className={linkClasses + " flex items-center p-2 rounded-md hover:bg-muted"}>Discover</Link>
                  <Link to="/marketplace" className={linkClasses + " flex items-center p-2 rounded-md hover:bg-muted"}>Marketplace</Link>
                  <Link to="/ar-view/1" className={linkClasses + " flex items-center p-2 rounded-md hover:bg-muted"}>Wall Preview</Link>
                  <Link to="/ar-gallery" className={linkClasses + " flex items-center p-2 rounded-md hover:bg-muted"}>AR Experience</Link>
                  <Link to="/ar-models" className={linkClasses + " flex items-center p-2 rounded-md hover:bg-muted"}>3D Models</Link>
                  <Link to="/events" className={linkClasses + " flex items-center p-2 rounded-md hover:bg-muted"}>Events</Link>
                  <Link to="/art-classes" className={linkClasses + " flex items-center p-2 rounded-md hover:bg-muted"}>Classes</Link>
                  <Link to="/art-classes" className={linkClasses + " flex items-center p-2 rounded-md hover:bg-muted"}>Classes</Link>
                  {user ? (
                    <button
                      onClick={() => signOut()}
                      className={linkClasses + " flex items-center p-2 rounded-md hover:bg-muted w-full text-left text-red-500"}
                    >
                      Sign Out
                    </button>
                  ) : (
                    <Link to="/login" className={linkClasses + " flex items-center p-2 rounded-md hover:bg-muted"}>Sign In</Link>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      <Sheet open={isSearchDialogOpen} onOpenChange={setIsSearchDialogOpen}>
        <SheetContent className="top-0 w-full sm:max-w-full">
          <SheetHeader className="mt-10">
            <SheetTitle>Search</SheetTitle>
            <SheetDescription>
              Find artwork, artists, and more.
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <Input placeholder="Search ArtNexus..." className="h-10" />
          </div>
          <Button variant="outline" className="w-full mt-2" onClick={() => setIsSearchDialogOpen(false)}>
            Cancel
          </Button>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default Navbar;
