import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import type { CartItem } from "../App";

type CartDrawerProps = {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQty: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
  onCheckout: () => void;
};

export function CartDrawer({ open, onClose, items, onUpdateQty, onRemove, onCheckout }: CartDrawerProps) {
  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#e85d26]" />
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>
              Your Cart
            </h2>
            <span className="bg-[#1a1814] text-white text-xs font-bold px-2 py-0.5 rounded-full" style={{ fontFamily: "'Nunito', sans-serif" }}>
              {items.reduce((s, i) => s + i.qty, 0)}
            </span>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-muted transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <div className="w-20 h-20 bg-[#ede9e3] rounded-full flex items-center justify-center">
                <ShoppingBag className="w-8 h-8 text-muted-foreground" />
              </div>
              <div>
                <p className="text-[#1a1814]" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>Your cart is empty</p>
                <p className="text-sm text-muted-foreground mt-1" style={{ fontFamily: "'Nunito', sans-serif" }}>Add some products to get started</p>
              </div>
              <button
                onClick={onClose}
                className="bg-[#e85d26] text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-[#d14f1c] transition-colors"
                style={{ fontFamily: "'Nunito', sans-serif" }}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-3 bg-[#f8f7f4] rounded-xl p-3">
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-[#ede9e3] flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm leading-snug line-clamp-2" style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700 }}>{item.name}</p>
                  <p className="text-[#e85d26] mt-1" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>${item.price.toFixed(2)}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2 bg-white rounded-full px-2 py-1 border border-border">
                      <button
                        onClick={() => onUpdateQty(item.id, -1)}
                        className="w-5 h-5 flex items-center justify-center text-muted-foreground hover:text-[#1a1814] transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-semibold w-4 text-center" style={{ fontFamily: "'Nunito', sans-serif" }}>{item.qty}</span>
                      <button
                        onClick={() => onUpdateQty(item.id, 1)}
                        className="w-5 h-5 flex items-center justify-center text-muted-foreground hover:text-[#1a1814] transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <button
                      onClick={() => onRemove(item.id)}
                      className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border p-5 flex flex-col gap-4">
            <div className="flex flex-col gap-2 text-sm" style={{ fontFamily: "'Nunito', sans-serif" }}>
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span>{shipping === 0 ? <span className="text-green-600 font-semibold">Free</span> : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between font-bold text-[#1a1814] text-base border-t border-border pt-2 mt-1">
                <span>Total</span>
                <span style={{ fontFamily: "'Playfair Display', serif" }}>${total.toFixed(2)}</span>
              </div>
            </div>
            {subtotal < 50 && (
              <p className="text-xs text-center text-muted-foreground bg-[#f0ede8] rounded-lg p-2" style={{ fontFamily: "'Nunito', sans-serif" }}>
                Add ${(50 - subtotal).toFixed(2)} more for <span className="text-green-600 font-semibold">free shipping</span>
              </p>
            )}
            <button
              onClick={onCheckout}
              className="w-full bg-[#1a1814] hover:bg-[#e85d26] text-white py-3.5 rounded-full font-semibold transition-all"
              style={{ fontFamily: "'Nunito', sans-serif" }}
            >
              Checkout — ${total.toFixed(2)}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
