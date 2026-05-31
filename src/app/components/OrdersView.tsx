import { Package, ChevronRight, Truck, CheckCircle2, Clock } from "lucide-react";

type Order = {
  id: string;
  date: string;
  status: "Delivered" | "Shipped" | "Processing";
  total: number;
  items: { name: string; image: string; qty: number; price: number }[];
};

const MOCK_ORDERS: Order[] = [
  {
    id: "ORD-2026-00142",
    date: "May 28, 2026",
    status: "Delivered",
    total: 218.98,
    items: [
      { name: "Nike Air Force 1 Hoodie Set", image: "https://images.unsplash.com/photo-1576188973526-0e5d7047b0cf?w=200&h=200&fit=crop", qty: 1, price: 89.99 },
      { name: "White Knit Sweater", image: "https://images.unsplash.com/photo-1621198059871-0d5f9b449233?w=200&h=200&fit=crop", qty: 2, price: 64.0 },
    ],
  },
  {
    id: "ORD-2026-00138",
    date: "May 20, 2026",
    status: "Shipped",
    total: 129.0,
    items: [
      { name: "Sony Wireless Headphones", image: "https://images.unsplash.com/photo-1515940175183-6798529cb860?w=200&h=200&fit=crop", qty: 1, price: 129.0 },
    ],
  },
  {
    id: "ORD-2026-00131",
    date: "May 10, 2026",
    status: "Processing",
    total: 78.0,
    items: [
      { name: "Skincare Essentials Kit", image: "https://images.unsplash.com/photo-1580870069867-74c57ee1bb07?w=200&h=200&fit=crop", qty: 1, price: 78.0 },
    ],
  },
];

const STATUS_CONFIG = {
  Delivered: { icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50", label: "Delivered" },
  Shipped: { icon: Truck, color: "text-blue-600", bg: "bg-blue-50", label: "Shipped" },
  Processing: { icon: Clock, color: "text-amber-600", bg: "bg-amber-50", label: "Processing" },
};

export function OrdersView() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-8">
        <h1 className="text-[#1a1814]" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: "2rem" }}>My Orders</h1>
        <p className="text-muted-foreground mt-1" style={{ fontFamily: "'Nunito', sans-serif" }}>Track and manage your recent purchases</p>
      </div>

      {MOCK_ORDERS.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
          <div className="w-20 h-20 bg-[#ede9e3] rounded-full flex items-center justify-center">
            <Package className="w-8 h-8 text-muted-foreground" />
          </div>
          <div>
            <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>No orders yet</p>
            <p className="text-sm text-muted-foreground" style={{ fontFamily: "'Nunito', sans-serif" }}>Your order history will appear here</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {MOCK_ORDERS.map((order) => {
            const { icon: Icon, color, bg, label } = STATUS_CONFIG[order.status];
            return (
              <div key={order.id} className="bg-white rounded-2xl shadow-sm overflow-hidden border border-border">
                {/* Order Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs text-muted-foreground" style={{ fontFamily: "'Nunito', sans-serif" }}>Order ID</span>
                    <span className="font-bold text-sm" style={{ fontFamily: "'Nunito', sans-serif" }}>{order.id}</span>
                  </div>
                  <div className="flex flex-col gap-0.5 text-center">
                    <span className="text-xs text-muted-foreground" style={{ fontFamily: "'Nunito', sans-serif" }}>Date</span>
                    <span className="text-sm" style={{ fontFamily: "'Nunito', sans-serif" }}>{order.date}</span>
                  </div>
                  <div className="flex flex-col gap-0.5 items-end">
                    <span className="text-xs text-muted-foreground" style={{ fontFamily: "'Nunito', sans-serif" }}>Total</span>
                    <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>${order.total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Status bar */}
                <div className={`flex items-center gap-2 px-5 py-2.5 ${bg}`}>
                  <Icon className={`w-4 h-4 ${color}`} />
                  <span className={`text-sm font-semibold ${color}`} style={{ fontFamily: "'Nunito', sans-serif" }}>{label}</span>
                </div>

                {/* Items */}
                <div className="divide-y divide-border">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-4 px-5 py-4">
                      <div className="w-14 h-14 rounded-xl overflow-hidden bg-[#ede9e3] flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold line-clamp-1" style={{ fontFamily: "'Nunito', sans-serif" }}>{item.name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5" style={{ fontFamily: "'Nunito', sans-serif" }}>Qty: {item.qty}</p>
                      </div>
                      <span className="text-sm font-semibold" style={{ fontFamily: "'Nunito', sans-serif" }}>${(item.price * item.qty).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
