import { X, Star, ShoppingCart, Heart, Check } from "lucide-react";
import { useState } from "react";
import type { Product } from "./data";

type QuickViewModalProps = {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (p: Product) => void;
  onToggleWishlist: (p: Product) => void;
  isWishlisted: boolean;
};

export function QuickViewModal({ product, onClose, onAddToCart, onToggleWishlist, isWishlisted }: QuickViewModalProps) {
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden pointer-events-auto animate-in fade-in zoom-in-95 duration-200">
          <div className="grid grid-cols-2 max-sm:grid-cols-1">
            {/* Image */}
            <div className="relative bg-[#ede9e3] aspect-square max-sm:aspect-video">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              {product.badge && (
                <span
                  className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold ${
                    product.badge === "Sale" ? "bg-[#e85d26] text-white" : product.badge === "New" ? "bg-[#1a1814] text-white" : "bg-amber-400 text-[#1a1814]"
                  }`}
                  style={{ fontFamily: "'Nunito', sans-serif" }}
                >
                  {product.badge}
                </span>
              )}
            </div>

            {/* Details */}
            <div className="p-6 flex flex-col gap-4 relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-muted transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div>
                <span className="text-xs text-[#e85d26] font-bold uppercase tracking-wider" style={{ fontFamily: "'Nunito', sans-serif" }}>
                  {product.category}
                </span>
                <h2 className="mt-1 text-[#1a1814] leading-tight" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: "1.35rem" }}>
                  {product.name}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className={`w-4 h-4 ${s <= Math.round(product.rating) ? "text-amber-400 fill-amber-400" : "text-gray-200"}`} />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground" style={{ fontFamily: "'Nunito', sans-serif" }}>
                  {product.rating} · {product.reviews} reviews
                </span>
              </div>

              <p className="text-muted-foreground text-sm leading-relaxed" style={{ fontFamily: "'Nunito', sans-serif" }}>
                {product.description}
              </p>

              <div className="flex items-center gap-3">
                <span className="text-2xl text-[#1a1814]" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800 }}>
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-sm text-muted-foreground line-through" style={{ fontFamily: "'Nunito', sans-serif" }}>
                      ${product.originalPrice.toFixed(2)}
                    </span>
                    <span className="text-xs bg-[#e85d26]/10 text-[#e85d26] font-bold px-2 py-0.5 rounded-full" style={{ fontFamily: "'Nunito', sans-serif" }}>
                      -{discount}%
                    </span>
                  </>
                )}
              </div>

              <div className="flex gap-3 mt-auto">
                <button
                  onClick={handleAdd}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-full font-semibold text-sm transition-all ${
                    added ? "bg-green-500 text-white" : "bg-[#1a1814] hover:bg-[#e85d26] text-white"
                  }`}
                  style={{ fontFamily: "'Nunito', sans-serif" }}
                >
                  {added ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
                  {added ? "Added to Cart!" : "Add to Cart"}
                </button>
                <button
                  onClick={() => onToggleWishlist(product)}
                  className={`p-3 rounded-full border transition-all ${
                    isWishlisted ? "border-[#e85d26] bg-[#e85d26] text-white" : "border-border hover:border-[#e85d26] hover:text-[#e85d26]"
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
