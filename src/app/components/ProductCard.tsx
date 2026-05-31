import { useState } from "react";
import { Star, Heart, ShoppingCart, Eye } from "lucide-react";
import type { Product } from "./data";

type ProductCardProps = {
  product: Product;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
  onQuickView: (product: Product) => void;
};

export function ProductCard({ product, onAddToCart, onToggleWishlist, isWishlisted, onQuickView }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const [addedFeedback, setAddedFeedback] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(product);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 1200);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div
      className="group bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-[#ede9e3] aspect-[4/5]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badge */}
        {product.badge && (
          <span
            className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold ${
              product.badge === "Sale"
                ? "bg-[#e85d26] text-white"
                : product.badge === "New"
                ? "bg-[#1a1814] text-white"
                : "bg-amber-400 text-[#1a1814]"
            }`}
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            {product.badge}
          </span>
        )}

        {/* Discount */}
        {discount && (
          <span className="absolute top-3 right-3 bg-white/90 text-[#e85d26] text-xs font-bold px-2 py-1 rounded-full">
            -{discount}%
          </span>
        )}

        {/* Wishlist */}
        <button
          onClick={() => onToggleWishlist(product)}
          className={`absolute top-3 ${product.badge ? "right-3 top-10 mt-1" : "right-3"} p-2 rounded-full transition-all shadow-sm ${
            isWishlisted
              ? "bg-[#e85d26] text-white"
              : "bg-white/90 text-[#1a1814] hover:bg-[#e85d26] hover:text-white"
          } ${discount ? "top-12" : ""}`}
          style={{ top: product.badge && discount ? "auto" : undefined, bottom: product.badge && discount ? "auto" : undefined }}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`} />
        </button>

        {/* Hover overlay actions */}
        <div
          className={`absolute inset-x-0 bottom-0 p-3 flex gap-2 transition-all duration-300 ${
            hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <button
            onClick={handleAddToCart}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              addedFeedback
                ? "bg-green-500 text-white"
                : "bg-[#1a1814] text-white hover:bg-[#e85d26]"
            }`}
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            <ShoppingCart className="w-4 h-4" />
            {addedFeedback ? "Added!" : "Add to Cart"}
          </button>
          <button
            onClick={() => onQuickView(product)}
            className="p-2.5 rounded-xl bg-white text-[#1a1814] hover:bg-[#f0ede8] transition-colors"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <span className="text-xs text-[#e85d26] font-semibold uppercase tracking-wider" style={{ fontFamily: "'Nunito', sans-serif" }}>
          {product.category}
        </span>
        <h3 className="text-[#1a1814] leading-snug line-clamp-2" style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.95rem" }}>
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                className={`w-3.5 h-3.5 ${s <= Math.round(product.rating) ? "text-amber-400 fill-amber-400" : "text-gray-300"}`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground" style={{ fontFamily: "'Nunito', sans-serif" }}>
            {product.rating} ({product.reviews})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mt-auto pt-1">
          <span className="text-[#1a1814]" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.15rem" }}>
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-muted-foreground line-through" style={{ fontFamily: "'Nunito', sans-serif" }}>
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
