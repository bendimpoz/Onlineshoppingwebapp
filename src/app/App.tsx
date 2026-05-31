import { useState, useMemo } from "react";
import { SlidersHorizontal, ChevronDown } from "lucide-react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { ProductCard } from "./components/ProductCard";
import { CartDrawer } from "./components/CartDrawer";
import { WishlistDrawer } from "./components/WishlistDrawer";
import { QuickViewModal } from "./components/QuickViewModal";
import { CheckoutModal } from "./components/CheckoutModal";
import { OrdersView } from "./components/OrdersView";
import { AuthPage } from "./components/AuthPage";
import { PRODUCTS, CATEGORIES, type Product } from "./components/data";

export type CartItem = Product & { qty: number };
export type AuthUser = { name: string; email: string };

type SortOption = "featured" | "price-asc" | "price-desc" | "rating";

export default function App() {
  const [authView, setAuthView] = useState<"login" | "signup" | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [view, setView] = useState<"shop" | "orders">("shop");
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1600]);
  const [showFilters, setShowFilters] = useState(false);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) return prev.map((i) => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const updateQty = (id: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) => i.id === id ? { ...i, qty: i.qty + delta } : i)
        .filter((i) => i.qty > 0)
    );
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const toggleWishlist = (product: Product) => {
    setWishlist((prev) =>
      prev.find((p) => p.id === product.id)
        ? prev.filter((p) => p.id !== product.id)
        : [...prev, product]
    );
  };

  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }

    if (selectedCategory !== "All") {
      list = list.filter((p) => p.category === selectedCategory);
    }

    list = list.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    switch (sortBy) {
      case "price-asc": list.sort((a, b) => a.price - b.price); break;
      case "price-desc": list.sort((a, b) => b.price - a.price); break;
      case "rating": list.sort((a, b) => b.rating - a.rating); break;
    }

    return list;
  }, [searchQuery, selectedCategory, sortBy, priceRange]);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  if (authView) {
    return (
      <AuthPage
        mode={authView}
        onAuth={(u) => { setUser(u); setAuthView(null); }}
        onSwitchMode={setAuthView}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background" style={{ fontFamily: "'Nunito', sans-serif" }}>
      <Navbar
        cartCount={cartCount}
        wishlistCount={wishlist.length}
        onCartOpen={() => setCartOpen(true)}
        onWishlistOpen={() => setWishlistOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onViewChange={(v) => setView(v)}
        currentView={view}
        user={user}
        onLoginClick={() => setAuthView("login")}
        onSignupClick={() => setAuthView("signup")}
        onLogout={() => setUser(null)}
      />

      {view === "orders" ? (
        <OrdersView />
      ) : (
        <>
          <Hero onShopNow={() => {
            document.getElementById("products-section")?.scrollIntoView({ behavior: "smooth" });
          }} />

          {/* Category pills */}
          <div className="bg-white border-b border-border sticky top-16 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-3 overflow-x-auto scrollbar-hide">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                    selectedCategory === cat
                      ? "bg-[#1a1814] text-white shadow-sm"
                      : "bg-[#f0ede8] text-[#1a1814] hover:bg-[#ede9e3]"
                  }`}
                  style={{ fontFamily: "'Nunito', sans-serif" }}
                >
                  {cat}
                </button>
              ))}
              <div className="ml-auto flex-shrink-0">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-border text-sm font-semibold hover:bg-muted transition-colors"
                  style={{ fontFamily: "'Nunito', sans-serif" }}
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                </button>
              </div>
            </div>

            {/* Expanded filters */}
            {showFilters && (
              <div className="border-t border-border bg-[#f8f7f4]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center gap-6">
                  {/* Sort */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-muted-foreground" style={{ fontFamily: "'Nunito', sans-serif" }}>Sort:</span>
                    <div className="relative">
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as SortOption)}
                        className="appearance-none bg-white border border-border rounded-full px-4 py-1.5 pr-8 text-sm font-semibold focus:outline-none focus:border-[#e85d26] cursor-pointer"
                        style={{ fontFamily: "'Nunito', sans-serif" }}
                      >
                        <option value="featured">Featured</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="rating">Top Rated</option>
                      </select>
                      <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>

                  {/* Price range */}
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-muted-foreground" style={{ fontFamily: "'Nunito', sans-serif" }}>Price:</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min={0} max={priceRange[1]}
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
                        className="w-20 bg-white border border-border rounded-lg px-2 py-1 text-sm focus:outline-none focus:border-[#e85d26]"
                        style={{ fontFamily: "'Nunito', sans-serif" }}
                      />
                      <span className="text-muted-foreground text-sm">–</span>
                      <input
                        type="number"
                        min={priceRange[0]} max={1600}
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                        className="w-24 bg-white border border-border rounded-lg px-2 py-1 text-sm focus:outline-none focus:border-[#e85d26]"
                        style={{ fontFamily: "'Nunito', sans-serif" }}
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => { setPriceRange([0, 1600]); setSortBy("featured"); setSelectedCategory("All"); }}
                    className="text-sm text-[#e85d26] font-semibold hover:underline"
                    style={{ fontFamily: "'Nunito', sans-serif" }}
                  >
                    Reset All
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Products grid */}
          <section id="products-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: "1.5rem" }}>
                  {selectedCategory === "All" ? "All Products" : selectedCategory}
                </h2>
                <p className="text-sm text-muted-foreground mt-0.5" style={{ fontFamily: "'Nunito', sans-serif" }}>
                  {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"} found
                </p>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
                <div className="w-16 h-16 bg-[#ede9e3] rounded-full flex items-center justify-center text-2xl">🔍</div>
                <div>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>No products found</p>
                  <p className="text-sm text-muted-foreground mt-1" style={{ fontFamily: "'Nunito', sans-serif" }}>Try adjusting your filters or search query</p>
                </div>
                <button
                  onClick={() => { setSearchQuery(""); setSelectedCategory("All"); setPriceRange([0, 1600]); }}
                  className="bg-[#e85d26] text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-[#d14f1c] transition-colors"
                  style={{ fontFamily: "'Nunito', sans-serif" }}
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={addToCart}
                    onToggleWishlist={toggleWishlist}
                    isWishlisted={wishlist.some((p) => p.id === product.id)}
                    onQuickView={setQuickViewProduct}
                  />
                ))}
              </div>
            )}
          </section>

          {/* Footer */}
          <footer className="bg-[#1a1814] text-white mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="col-span-2 md:col-span-1">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 bg-[#e85d26] rounded flex items-center justify-center">
                    <span className="text-white font-black text-xs" style={{ fontFamily: "'Playfair Display', serif" }}>S</span>
                  </div>
                  <span className="text-lg" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>ShopLux</span>
                </div>
                <p className="text-white/50 text-sm leading-relaxed" style={{ fontFamily: "'Nunito', sans-serif" }}>
                  Your premium destination for fashion, electronics, home goods, and beauty.
                </p>
              </div>
              {[
                { title: "Shop", links: ["Fashion", "Electronics", "Home", "Beauty", "Sale"] },
                { title: "Help", links: ["FAQ", "Shipping", "Returns", "Track Order", "Contact"] },
                { title: "Company", links: ["About Us", "Careers", "Press", "Sustainability", "Blog"] },
              ].map(({ title, links }) => (
                <div key={title}>
                  <h4 className="text-sm font-bold uppercase tracking-wider mb-3 text-white/80" style={{ fontFamily: "'Nunito', sans-serif" }}>{title}</h4>
                  <ul className="flex flex-col gap-2">
                    {links.map((l) => (
                      <li key={l}>
                        <a href="#" className="text-white/40 text-sm hover:text-[#e85d26] transition-colors" style={{ fontFamily: "'Nunito', sans-serif" }}>
                          {l}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="border-t border-white/10 py-5 text-center">
              <p className="text-white/30 text-xs" style={{ fontFamily: "'Nunito', sans-serif" }}>
                © 2026 ShopLux. All rights reserved.
              </p>
            </div>
          </footer>
        </>
      )}

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onUpdateQty={updateQty}
        onRemove={removeFromCart}
        onCheckout={() => { setCartOpen(false); setCheckoutOpen(true); }}
      />

      <WishlistDrawer
        open={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        items={wishlist}
        onRemove={toggleWishlist}
        onAddToCart={(p) => { addToCart(p); setCartOpen(true); setWishlistOpen(false); }}
      />

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={(p) => { addToCart(p); setQuickViewProduct(null); }}
        onToggleWishlist={toggleWishlist}
        isWishlisted={quickViewProduct ? wishlist.some((p) => p.id === quickViewProduct.id) : false}
      />

      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        items={cart}
        onPlaceOrder={() => { setCart([]); setCheckoutOpen(false); }}
      />
    </div>
  );
}
