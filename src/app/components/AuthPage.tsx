import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Check } from "lucide-react";

type AuthMode = "login" | "signup";

type User = {
  name: string;
  email: string;
};

type AuthPageProps = {
  mode: AuthMode;
  onAuth: (user: User) => void;
  onSwitchMode: (mode: AuthMode) => void;
};

export function AuthPage({ mode, onAuth, onSwitchMode }: AuthPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((err) => ({ ...err, [key]: "" }));
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (mode === "signup" && !form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Enter a valid email";
    if (!form.password) errs.password = "Password is required";
    else if (form.password.length < 6) errs.password = "At least 6 characters";
    if (mode === "signup" && form.password !== form.confirm) errs.confirm = "Passwords don't match";
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onAuth({
        name: mode === "signup" ? form.name : form.email.split("@")[0],
        email: form.email,
      });
    }, 1000);
  };

  const passwordStrength = () => {
    const p = form.password;
    if (!p) return null;
    if (p.length < 6) return { level: 0, label: "Too short", color: "bg-red-400" };
    if (p.length < 8) return { level: 1, label: "Weak", color: "bg-orange-400" };
    const hasUpper = /[A-Z]/.test(p);
    const hasNum = /[0-9]/.test(p);
    const hasSpecial = /[^A-Za-z0-9]/.test(p);
    const score = [hasUpper, hasNum, hasSpecial].filter(Boolean).length;
    if (score === 3) return { level: 3, label: "Strong", color: "bg-green-500" };
    if (score >= 1) return { level: 2, label: "Fair", color: "bg-yellow-400" };
    return { level: 1, label: "Weak", color: "bg-orange-400" };
  };

  const strength = passwordStrength();

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left panel — decorative */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-[#1a1814] p-12 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#e85d26] rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#e85d26] rounded-full translate-x-1/3 translate-y-1/3" />
        </div>

        {/* Logo */}
        <div className="relative flex items-center gap-2.5">
          <div className="w-9 h-9 bg-[#e85d26] rounded-lg flex items-center justify-center">
            <span className="text-white font-black" style={{ fontFamily: "'Playfair Display', serif" }}>S</span>
          </div>
          <span className="text-white text-2xl" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>
            ShopLux
          </span>
        </div>

        {/* Center content */}
        <div className="relative">
          <h2 className="text-white leading-tight mb-4" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: "2.8rem" }}>
            {mode === "login" ? (
              <>Welcome<br />back.</>
            ) : (
              <>Start your<br />journey.</>
            )}
          </h2>
          <p className="text-white/50 leading-relaxed" style={{ fontFamily: "'Nunito', sans-serif" }}>
            {mode === "login"
              ? "Sign in to access your orders, wishlist, and a personalized shopping experience."
              : "Join thousands of happy shoppers and discover curated products across fashion, tech, home, and beauty."}
          </p>

          {/* Feature bullets */}
          <div className="mt-8 flex flex-col gap-3">
            {[
              "Free shipping on orders over $50",
              "Easy 30-day returns",
              "Exclusive member deals & early access",
            ].map((text) => (
              <div key={text} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#e85d26]/20 border border-[#e85d26]/40 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-[#e85d26]" />
                </div>
                <span className="text-white/60 text-sm" style={{ fontFamily: "'Nunito', sans-serif" }}>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Product image strip */}
        <div className="relative flex gap-3">
          {[
            "https://images.unsplash.com/photo-1576188973526-0e5d7047b0cf?w=200&h=200&fit=crop",
            "https://images.unsplash.com/photo-1515940175183-6798529cb860?w=200&h=200&fit=crop",
            "https://images.unsplash.com/photo-1580870069867-74c57ee1bb07?w=200&h=200&fit=crop",
          ].map((src, i) => (
            <div key={i} className="w-20 h-20 rounded-xl overflow-hidden opacity-60">
              <img src={src} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* Mobile logo */}
        <div className="lg:hidden flex items-center gap-2 mb-10">
          <div className="w-8 h-8 bg-[#e85d26] rounded-lg flex items-center justify-center">
            <span className="text-white font-black text-sm" style={{ fontFamily: "'Playfair Display', serif" }}>S</span>
          </div>
          <span className="text-xl" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>ShopLux</span>
        </div>

        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-[#1a1814]" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: "1.9rem" }}>
              {mode === "login" ? "Sign in" : "Create account"}
            </h1>
            <p className="text-muted-foreground mt-1 text-sm" style={{ fontFamily: "'Nunito', sans-serif" }}>
              {mode === "login"
                ? "Enter your credentials to access your account"
                : "Fill in the details below to get started"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {mode === "signup" && (
              <div>
                <label className="block text-sm font-semibold text-[#1a1814] mb-1.5" style={{ fontFamily: "'Nunito', sans-serif" }}>
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Alex Johnson"
                    value={form.name}
                    onChange={set("name")}
                    className={`w-full pl-11 pr-4 py-3 rounded-xl border bg-white text-sm focus:outline-none transition-colors ${
                      errors.name ? "border-destructive focus:border-destructive" : "border-border focus:border-[#e85d26]"
                    }`}
                    style={{ fontFamily: "'Nunito', sans-serif" }}
                  />
                </div>
                {errors.name && <p className="text-destructive text-xs mt-1" style={{ fontFamily: "'Nunito', sans-serif" }}>{errors.name}</p>}
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-[#1a1814] mb-1.5" style={{ fontFamily: "'Nunito', sans-serif" }}>
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  placeholder="alex@example.com"
                  value={form.email}
                  onChange={set("email")}
                  className={`w-full pl-11 pr-4 py-3 rounded-xl border bg-white text-sm focus:outline-none transition-colors ${
                    errors.email ? "border-destructive focus:border-destructive" : "border-border focus:border-[#e85d26]"
                  }`}
                  style={{ fontFamily: "'Nunito', sans-serif" }}
                />
              </div>
              {errors.email && <p className="text-destructive text-xs mt-1" style={{ fontFamily: "'Nunito', sans-serif" }}>{errors.email}</p>}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-semibold text-[#1a1814]" style={{ fontFamily: "'Nunito', sans-serif" }}>Password</label>
                {mode === "login" && (
                  <button type="button" className="text-xs text-[#e85d26] font-semibold hover:underline" style={{ fontFamily: "'Nunito', sans-serif" }}>
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={set("password")}
                  className={`w-full pl-11 pr-12 py-3 rounded-xl border bg-white text-sm focus:outline-none transition-colors ${
                    errors.password ? "border-destructive focus:border-destructive" : "border-border focus:border-[#e85d26]"
                  }`}
                  style={{ fontFamily: "'Nunito', sans-serif" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-[#1a1814] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-destructive text-xs mt-1" style={{ fontFamily: "'Nunito', sans-serif" }}>{errors.password}</p>}

              {/* Password strength (signup only) */}
              {mode === "signup" && strength && (
                <div className="mt-2">
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all ${i < strength.level ? strength.color : "bg-muted"}`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1" style={{ fontFamily: "'Nunito', sans-serif" }}>
                    Password strength: <span className="font-semibold">{strength.label}</span>
                  </p>
                </div>
              )}
            </div>

            {mode === "signup" && (
              <div>
                <label className="block text-sm font-semibold text-[#1a1814] mb-1.5" style={{ fontFamily: "'Nunito', sans-serif" }}>
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type={showConfirm ? "text" : "password"}
                    placeholder="••••••••"
                    value={form.confirm}
                    onChange={set("confirm")}
                    className={`w-full pl-11 pr-12 py-3 rounded-xl border bg-white text-sm focus:outline-none transition-colors ${
                      errors.confirm ? "border-destructive focus:border-destructive" : "border-border focus:border-[#e85d26]"
                    }`}
                    style={{ fontFamily: "'Nunito', sans-serif" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-[#1a1814] transition-colors"
                  >
                    {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.confirm && <p className="text-destructive text-xs mt-1" style={{ fontFamily: "'Nunito', sans-serif" }}>{errors.confirm}</p>}
              </div>
            )}

            {mode === "signup" && (
              <div className="flex items-start gap-3 mt-1">
                <input
                  type="checkbox"
                  id="terms"
                  className="mt-0.5 w-4 h-4 rounded border-border accent-[#e85d26] cursor-pointer"
                  required
                />
                <label htmlFor="terms" className="text-xs text-muted-foreground cursor-pointer leading-relaxed" style={{ fontFamily: "'Nunito', sans-serif" }}>
                  I agree to the{" "}
                  <span className="text-[#e85d26] font-semibold hover:underline cursor-pointer">Terms of Service</span>
                  {" "}and{" "}
                  <span className="text-[#e85d26] font-semibold hover:underline cursor-pointer">Privacy Policy</span>
                </label>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full flex items-center justify-center gap-2 bg-[#1a1814] hover:bg-[#e85d26] text-white py-3.5 rounded-xl font-semibold text-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ fontFamily: "'Nunito', sans-serif" }}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {mode === "login" ? "Sign In" : "Create Account"}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-1">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground font-medium" style={{ fontFamily: "'Nunito', sans-serif" }}>or continue with</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* Social buttons */}
            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  label: "Google",
                  icon: (
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  ),
                },
                {
                  label: "Apple",
                  icon: (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98l-.09.06c-.22.14-2.18 1.3-2.16 3.88.03 3.05 2.65 4.07 2.68 4.08l-.07.12zM13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                    </svg>
                  ),
                },
              ].map(({ label, icon }) => (
                <button
                  key={label}
                  type="button"
                  className="flex items-center justify-center gap-2 border border-border bg-white hover:bg-muted py-2.5 rounded-xl text-sm font-semibold transition-colors text-[#1a1814]"
                  style={{ fontFamily: "'Nunito', sans-serif" }}
                >
                  {icon}
                  {label}
                </button>
              ))}
            </div>
          </form>

          {/* Switch mode */}
          <p className="text-center text-sm text-muted-foreground mt-6" style={{ fontFamily: "'Nunito', sans-serif" }}>
            {mode === "login" ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => onSwitchMode(mode === "login" ? "signup" : "login")}
              className="text-[#e85d26] font-bold hover:underline"
            >
              {mode === "login" ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
