import { X, Heart, ShoppingCart } from "lucide-react";
import type { Product } from "./data";

type WishlistDrawerProps = {
  open: boolean;
  onClose: () => void;
  items: Product[];
  onRemove: (product: Product) => void;
  onAddToCart: (product: Product) => void;
};

export function WishlistDrawer({ open, onClose, items, onRemove, onAddToCart }: WishlistDrawerProps) {
  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#e85d26]" />
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>Wishlist</h2>
            <span className="bg-[#e85d26] text-white text-xs font-bold px-2 py-0.5 rounded-full" style={{ fontFamily: "'Nunito', sans-serif" }}>
              {items.length}
            </span>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-muted transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <div className="w-20 h-20 bg-[#ede9e3] rounded-full flex items-center justify-center">
                <Heart className="w-8 h-8 text-muted-foreground" />
              </div>
              <div>
                <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>Nothing saved yet</p>
                <p className="text-sm text-muted-foreground mt-1" style={{ fontFamily: "'Nunito', sans-serif" }}>
                  Tap the heart on any product to save it here
                </p>
              </div>
            </div>
          ) : (
            items.map((p) => (
              <div key={p.id} className="flex gap-3 bg-[#f8f7f4] rounded-xl p-3">
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-[#ede9e3] flex-shrink-0">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm leading-snug line-clamp-2" style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700 }}>{p.name}</p>
                  <p className="text-[#e85d26] mt-1" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>${p.price.toFixed(2)}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => { onAddToCart(p); onRemove(p); }}
                      className="flex items-center gap-1.5 bg-[#1a1814] text-white text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-[#e85d26] transition-colors"
                      style={{ fontFamily: "'Nunito', sans-serif" }}
                    >
                      <ShoppingCart className="w-3 h-3" /> Add to Cart
                    </button>
                    <button
                      onClick={() => onRemove(p)}
                      className="text-muted-foreground hover:text-destructive transition-colors text-xs"
                      style={{ fontFamily: "'Nunito', sans-serif" }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
