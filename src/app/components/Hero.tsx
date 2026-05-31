import { ArrowRight, Truck, ShieldCheck, RotateCcw } from "lucide-react";

type HeroProps = {
  onShopNow: () => void;
};

export function Hero({ onShopNow }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-[#1a1814]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div className="text-white">
            <div className="inline-flex items-center gap-2 bg-[#e85d26]/20 border border-[#e85d26]/30 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#e85d26] animate-pulse" />
              <span className="text-[#e85d26] text-sm font-medium">New Collection 2026</span>
            </div>
            <h1
              className="text-5xl lg:text-7xl leading-none mb-6 text-white"
              style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800 }}
            >
              Shop
              <br />
              <span className="text-[#e85d26]">Smarter.</span>
              <br />
              Live Better.
            </h1>
            <p className="text-white/60 text-lg mb-8 max-w-md leading-relaxed" style={{ fontFamily: "'Nunito', sans-serif" }}>
              Discover curated collections across fashion, electronics, home, and beauty — all in one place.
            </p>
            <div className="flex items-center gap-4 flex-wrap">
              <button
                onClick={onShopNow}
                className="inline-flex items-center gap-2 bg-[#e85d26] hover:bg-[#d14f1c] text-white px-8 py-3.5 rounded-full font-semibold transition-all hover:gap-3"
                style={{ fontFamily: "'Nunito', sans-serif" }}
              >
                Shop Now <ArrowRight className="w-4 h-4" />
              </button>
              <div className="text-white/40 text-sm" style={{ fontFamily: "'Nunito', sans-serif" }}>
                12,000+ products
              </div>
            </div>

            {/* Trust badges */}
            <div className="mt-12 grid grid-cols-3 gap-4">
              {[
                { icon: Truck, label: "Free Shipping", sub: "Orders over $50" },
                { icon: ShieldCheck, label: "Secure Pay", sub: "256-bit SSL" },
                { icon: RotateCcw, label: "Easy Returns", sub: "30-day policy" },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-white/70">
                    <Icon className="w-4 h-4 text-[#e85d26]" />
                    <span className="text-xs font-semibold" style={{ fontFamily: "'Nunito', sans-serif" }}>{label}</span>
                  </div>
                  <span className="text-white/40 text-xs pl-6" style={{ fontFamily: "'Nunito', sans-serif" }}>{sub}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hero image grid */}
          <div className="hidden lg:grid grid-cols-2 gap-3 h-[520px]">
            <div className="rounded-2xl overflow-hidden bg-[#2a2620]">
              <img
                src="https://images.unsplash.com/photo-1576188973526-0e5d7047b0cf?w=500&h=600&fit=crop&auto=format"
                alt="Fashion products"
                className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="grid grid-rows-2 gap-3">
              <div className="rounded-2xl overflow-hidden bg-[#2a2620]">
                <img
                  src="https://images.unsplash.com/photo-1515940175183-6798529cb860?w=500&h=280&fit=crop&auto=format"
                  alt="Electronics"
                  className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
                />
              </div>
              <div className="rounded-2xl overflow-hidden bg-[#2a2620]">
                <img
                  src="https://images.unsplash.com/photo-1580870069867-74c57ee1bb07?w=500&h=280&fit=crop&auto=format"
                  alt="Beauty products"
                  className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
