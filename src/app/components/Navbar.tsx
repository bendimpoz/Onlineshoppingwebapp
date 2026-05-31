import { useState } from "react";
import { ShoppingCart, Search, Heart, Menu, X, LogIn, UserPlus, LogOut, ChevronDown } from "lucide-react";
import type { AuthUser } from "../App";

type NavbarProps = {
  cartCount: number;
  wishlistCount: number;
  onCartOpen: () => void;
  onWishlistOpen: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onViewChange: (view: "shop" | "orders") => void;
  currentView: string;
  user: AuthUser | null;
  onLoginClick: () => void;
  onSignupClick: () => void;
  onLogout: () => void;
};

export function Navbar({
  cartCount,
  wishlistCount,
  onCartOpen,
  onWishlistOpen,
  searchQuery,
  onSearchChange,
  onViewChange,
  currentView,
  user,
  onLoginClick,
  onSignupClick,
  onLogout,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#1a1814] text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => onViewChange("shop")}
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 bg-[#e85d26] rounded flex items-center justify-center">
              <span className="text-white font-black text-sm" style={{ fontFamily: "'Playfair Display', serif" }}>S</span>
            </div>
            <span className="text-xl tracking-tight" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>
              ShopLux
            </span>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <button
              onClick={() => onViewChange("shop")}
              className={`transition-colors hover:text-[#e85d26] ${currentView === "shop" ? "text-[#e85d26]" : "text-white/80"}`}
            >
              Shop
            </button>
            <button
              onClick={() => onViewChange("orders")}
              className={`transition-colors hover:text-[#e85d26] ${currentView === "orders" ? "text-[#e85d26]" : "text-white/80"}`}
            >
              My Orders
            </button>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex items-center flex-1 max-w-sm mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-white/10 border border-white/10 rounded-full pl-9 pr-4 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#e85d26] transition-colors"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              className="md:hidden text-white/70 hover:text-white transition-colors"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={onWishlistOpen}
              className="relative text-white/70 hover:text-white transition-colors"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#e85d26] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>
            <button
              onClick={onCartOpen}
              className="relative text-white/70 hover:text-white transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#e85d26] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Auth area */}
            {user ? (
              <div className="relative hidden md:block">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/15 transition-colors rounded-full pl-1 pr-3 py-1"
                >
                  <div className="w-7 h-7 rounded-full bg-[#e85d26] flex items-center justify-center text-white text-xs font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-white text-sm font-semibold" style={{ fontFamily: "'Nunito', sans-serif" }}>
                    {user.name.split(" ")[0]}
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 text-white/60 transition-transform ${userMenuOpen ? "rotate-180" : ""}`} />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-xl border border-border overflow-hidden z-50">
                    <div className="px-4 py-3 border-b border-border">
                      <p className="text-sm font-bold text-[#1a1814]" style={{ fontFamily: "'Nunito', sans-serif" }}>{user.name}</p>
                      <p className="text-xs text-muted-foreground truncate" style={{ fontFamily: "'Nunito', sans-serif" }}>{user.email}</p>
                    </div>
                    <button
                      onClick={() => { setUserMenuOpen(false); onLogout(); }}
                      className="w-full flex items-center gap-2.5 px-4 py-3 text-sm text-destructive hover:bg-red-50 transition-colors"
                      style={{ fontFamily: "'Nunito', sans-serif" }}
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <button
                  onClick={onLoginClick}
                  className="flex items-center gap-1.5 text-white/80 hover:text-white text-sm font-semibold transition-colors px-2"
                  style={{ fontFamily: "'Nunito', sans-serif" }}
                >
                  <LogIn className="w-4 h-4" />
                  Sign In
                </button>
                <button
                  onClick={onSignupClick}
                  className="flex items-center gap-1.5 bg-[#e85d26] hover:bg-[#d14f1c] text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors"
                  style={{ fontFamily: "'Nunito', sans-serif" }}
                >
                  <UserPlus className="w-4 h-4" />
                  Sign Up
                </button>
              </div>
            )}

            <button
              className="md:hidden text-white/70 hover:text-white transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        {searchOpen && (
          <div className="md:hidden pb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-white/10 border border-white/10 rounded-full pl-9 pr-4 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#e85d26]"
              />
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 py-3 flex flex-col gap-3 text-sm font-medium">
            <button
              onClick={() => { onViewChange("shop"); setMobileMenuOpen(false); }}
              className="text-left text-white/80 hover:text-[#e85d26] transition-colors"
            >
              Shop
            </button>
            <button
              onClick={() => { onViewChange("orders"); setMobileMenuOpen(false); }}
              className="text-left text-white/80 hover:text-[#e85d26] transition-colors"
            >
              My Orders
            </button>
            <div className="border-t border-white/10 pt-3 flex flex-col gap-2">
              {user ? (
                <>
                  <div className="flex items-center gap-2 pb-1">
                    <div className="w-7 h-7 rounded-full bg-[#e85d26] flex items-center justify-center text-white text-xs font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-white/80 text-sm font-semibold" style={{ fontFamily: "'Nunito', sans-serif" }}>{user.name}</span>
                  </div>
                  <button
                    onClick={() => { onLogout(); setMobileMenuOpen(false); }}
                    className="text-left text-red-400 hover:text-red-300 transition-colors flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => { onLoginClick(); setMobileMenuOpen(false); }}
                    className="text-left text-white/80 hover:text-[#e85d26] transition-colors flex items-center gap-2"
                  >
                    <LogIn className="w-4 h-4" /> Sign In
                  </button>
                  <button
                    onClick={() => { onSignupClick(); setMobileMenuOpen(false); }}
                    className="text-left text-white/80 hover:text-[#e85d26] transition-colors flex items-center gap-2"
                  >
                    <UserPlus className="w-4 h-4" /> Create Account
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
