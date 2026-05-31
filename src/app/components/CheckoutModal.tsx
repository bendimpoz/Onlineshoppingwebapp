import { useState } from "react";
import { X, CreditCard, Check, Package } from "lucide-react";
import type { CartItem } from "../App";

type CheckoutModalProps = {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  onPlaceOrder: () => void;
};

type Step = "details" | "payment" | "success";

export function CheckoutModal({ open, onClose, items, onPlaceOrder }: CheckoutModalProps) {
  const [step, setStep] = useState<Step>("details");
  const [form, setForm] = useState({
    name: "Alex Johnson",
    email: "alex@example.com",
    address: "42 Maple Street",
    city: "New York",
    zip: "10001",
    card: "4242 4242 4242 4242",
    expiry: "12/28",
    cvv: "123",
  });

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  if (!open) return null;

  const handlePlaceOrder = () => {
    setStep("success");
    setTimeout(() => {
      onPlaceOrder();
      setStep("details");
      onClose();
    }, 2500);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm" onClick={step !== "success" ? onClose : undefined} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg pointer-events-auto overflow-hidden">
          {step === "success" ? (
            <div className="flex flex-col items-center justify-center p-12 gap-5 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="w-10 h-10 text-green-500" />
              </div>
              <div>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: "1.5rem" }}>Order Placed!</h2>
                <p className="text-muted-foreground mt-2 text-sm" style={{ fontFamily: "'Nunito', sans-serif" }}>
                  Your order has been confirmed. You'll receive a confirmation email shortly.
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground" style={{ fontFamily: "'Nunito', sans-serif" }}>
                <Package className="w-4 h-4 text-[#e85d26]" />
                Estimated delivery: 3–5 business days
              </div>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-border">
                <div>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800 }}>Checkout</h2>
                  <div className="flex items-center gap-2 mt-1">
                    {(["details", "payment"] as Step[]).map((s, i) => (
                      <div key={s} className="flex items-center gap-2">
                        {i > 0 && <div className="w-6 h-px bg-border" />}
                        <div className={`flex items-center gap-1.5 text-xs font-semibold ${step === s ? "text-[#e85d26]" : "text-muted-foreground"}`} style={{ fontFamily: "'Nunito', sans-serif" }}>
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === s ? "bg-[#e85d26] text-white" : "bg-muted text-muted-foreground"}`}>
                            {i + 1}
                          </div>
                          {s === "details" ? "Shipping" : "Payment"}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <button onClick={onClose} className="p-1.5 rounded-full hover:bg-muted transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 flex flex-col gap-4 max-h-[60vh] overflow-y-auto">
                {step === "details" ? (
                  <>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="col-span-2">
                        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider" style={{ fontFamily: "'Nunito', sans-serif" }}>Full Name</label>
                        <input
                          className="mt-1 w-full bg-[#f8f7f4] border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#e85d26] transition-colors"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          style={{ fontFamily: "'Nunito', sans-serif" }}
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider" style={{ fontFamily: "'Nunito', sans-serif" }}>Email</label>
                        <input
                          className="mt-1 w-full bg-[#f8f7f4] border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#e85d26] transition-colors"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          style={{ fontFamily: "'Nunito', sans-serif" }}
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider" style={{ fontFamily: "'Nunito', sans-serif" }}>Street Address</label>
                        <input
                          className="mt-1 w-full bg-[#f8f7f4] border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#e85d26] transition-colors"
                          value={form.address}
                          onChange={(e) => setForm({ ...form, address: e.target.value })}
                          style={{ fontFamily: "'Nunito', sans-serif" }}
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider" style={{ fontFamily: "'Nunito', sans-serif" }}>City</label>
                        <input
                          className="mt-1 w-full bg-[#f8f7f4] border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#e85d26] transition-colors"
                          value={form.city}
                          onChange={(e) => setForm({ ...form, city: e.target.value })}
                          style={{ fontFamily: "'Nunito', sans-serif" }}
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider" style={{ fontFamily: "'Nunito', sans-serif" }}>ZIP Code</label>
                        <input
                          className="mt-1 w-full bg-[#f8f7f4] border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#e85d26] transition-colors"
                          value={form.zip}
                          onChange={(e) => setForm({ ...form, zip: e.target.value })}
                          style={{ fontFamily: "'Nunito', sans-serif" }}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="bg-[#f8f7f4] rounded-xl p-4 flex flex-col gap-2 mb-2">
                      <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground" style={{ fontFamily: "'Nunito', sans-serif" }}>Order Summary</p>
                      {items.map((i) => (
                        <div key={i.id} className="flex justify-between text-sm" style={{ fontFamily: "'Nunito', sans-serif" }}>
                          <span className="text-muted-foreground line-clamp-1 flex-1 mr-2">{i.name} ×{i.qty}</span>
                          <span className="font-semibold">${(i.price * i.qty).toFixed(2)}</span>
                        </div>
                      ))}
                      <div className="border-t border-border pt-2 mt-1 flex justify-between font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <CreditCard className="w-4 h-4 text-[#e85d26]" />
                        <span className="text-sm font-bold" style={{ fontFamily: "'Nunito', sans-serif" }}>Card Details</span>
                      </div>
                      <div className="flex flex-col gap-3">
                        <div>
                          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider" style={{ fontFamily: "'Nunito', sans-serif" }}>Card Number</label>
                          <input
                            className="mt-1 w-full bg-[#f8f7f4] border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#e85d26] transition-colors"
                            value={form.card}
                            onChange={(e) => setForm({ ...form, card: e.target.value })}
                            style={{ fontFamily: "'Nunito', sans-serif" }}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider" style={{ fontFamily: "'Nunito', sans-serif" }}>Expiry</label>
                            <input
                              className="mt-1 w-full bg-[#f8f7f4] border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#e85d26] transition-colors"
                              value={form.expiry}
                              onChange={(e) => setForm({ ...form, expiry: e.target.value })}
                              style={{ fontFamily: "'Nunito', sans-serif" }}
                            />
                          </div>
                          <div>
                            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider" style={{ fontFamily: "'Nunito', sans-serif" }}>CVV</label>
                            <input
                              className="mt-1 w-full bg-[#f8f7f4] border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#e85d26] transition-colors"
                              value={form.cvv}
                              onChange={(e) => setForm({ ...form, cvv: e.target.value })}
                              style={{ fontFamily: "'Nunito', sans-serif" }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="px-6 pb-6">
                {step === "details" ? (
                  <button
                    onClick={() => setStep("payment")}
                    className="w-full bg-[#1a1814] hover:bg-[#e85d26] text-white py-3.5 rounded-full font-semibold transition-all"
                    style={{ fontFamily: "'Nunito', sans-serif" }}
                  >
                    Continue to Payment
                  </button>
                ) : (
                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep("details")}
                      className="px-5 py-3.5 rounded-full border border-border hover:bg-muted font-semibold text-sm transition-colors"
                      style={{ fontFamily: "'Nunito', sans-serif" }}
                    >
                      Back
                    </button>
                    <button
                      onClick={handlePlaceOrder}
                      className="flex-1 bg-[#e85d26] hover:bg-[#d14f1c] text-white py-3.5 rounded-full font-semibold transition-all"
                      style={{ fontFamily: "'Nunito', sans-serif" }}
                    >
                      Place Order — ${total.toFixed(2)}
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
