import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useAuth } from "@/hooks/useAuth"
import { UserMenu } from "@/components/auth/UserMenu"
import { AuthModal } from "@/components/auth/AuthModal"
import { ThemeToggle } from "@/components/ui/theme-toggle"

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [authModal, setAuthModal] = useState<{ isOpen: boolean; userType: "creator" | "client" }>({
    isOpen: false,
    userType: "creator"
  })
  const { user } = useAuth()

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)
  
  const openAuthModal = (userType: "creator" | "client") => {
    setAuthModal({ isOpen: true, userType })
  }
  
  const closeAuthModal = () => {
    setAuthModal({ isOpen: false, userType: "creator" })
  }

  return (
    <header className="w-full border-b border-border/50 bg-background/80 backdrop-blur-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/home" className="flex items-center space-x-3 text-2xl font-bold text-foreground hover:text-primary transition-colors">
              <div className="w-8 h-8 bg-foreground rounded-sm flex items-center justify-center">
                <svg width="20" height="16" viewBox="0 0 24 20" fill="none" className="text-background">
                  <path d="M9 12l2 2 4-4m5-2v8a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h7l5 5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="15" cy="8" r="3" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <rect x="2" y="10" width="4" height="6" rx="1" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
              </div>
              <span className="font-montserrat font-bold">
                CineHub<span className="text-primary">LK</span>
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" asChild className="font-open-sans font-medium">
              <a href="/home">Home</a>
            </Button>
            <Button variant="ghost" asChild className="font-open-sans font-medium">
              <a href="/about">About</a>
            </Button>
            <Button variant="ghost" asChild className="font-open-sans font-medium">
              <a href="/events">Events</a>
            </Button>
            <Button variant="ghost" asChild className="font-open-sans font-medium">
              <a href="/explore">Explore</a>
            </Button>
            <Button variant="ghost" asChild className="font-open-sans font-medium">
              <a href="/contact">Contact Us</a>
            </Button>
            
            <ThemeToggle />
            
            {user ? (
              <UserMenu />
            ) : (
              <>
                <Button 
                  variant="secondary-outline"
                  onClick={() => openAuthModal("creator")}
                >
                  For Creators
                </Button>

                <Button 
                  variant="secondary-outline"
                  onClick={() => openAuthModal("client")}
                >
                  For Clients
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMobileMenu}
              className="text-foreground"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "md:hidden transition-all duration-300 ease-in-out overflow-hidden",
            isMobileMenuOpen ? "max-h-96 pb-4" : "max-h-0"
          )}
        >
          <div className="space-y-3 pt-4">
            <a
              href="/home"
              className="block px-4 py-2 text-sm font-medium text-foreground hover:bg-accent/50 rounded-md transition-colors"
            >
              Home
            </a>
            <a
              href="/about"
              className="block px-4 py-2 text-sm font-medium text-foreground hover:bg-accent/50 rounded-md transition-colors"
            >
              About
            </a>
            <a
              href="/events"
              className="block px-4 py-2 text-sm font-medium text-foreground hover:bg-accent/50 rounded-md transition-colors"
            >
              Events
            </a>
            <a
              href="/explore"
              className="block px-4 py-2 text-sm font-medium text-foreground hover:bg-accent/50 rounded-md transition-colors"
            >
              Explore
            </a>
            <a
              href="/contact"
              className="block px-4 py-2 text-sm font-medium text-foreground hover:bg-accent/50 rounded-md transition-colors"
            >
              Contact Us
            </a>
            {user ? (
              <div className="flex justify-center pt-2">
                <UserMenu />
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground px-2">Account</p>
                  <div className="space-y-1">
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => openAuthModal("creator")}
                    >
                      Creator Login/Register
                    </Button>
                    <Button
                      variant="ghost" 
                      className="w-full justify-start"
                      onClick={() => openAuthModal("client")}
                    >
                      Client Login/Register
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Auth Modal */}
      <AuthModal
        isOpen={authModal.isOpen}
        onClose={closeAuthModal}
        userType={authModal.userType}
      />
    </header>
  )
}