import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, Leaf, ChevronRight, Star, MapPin, 
  ShieldCheck, Truck, Zap, ArrowRight, Instagram, 
  Facebook, Twitter, Play, Plus, Search, Heart, Menu, X,
  Trash2, Minus, ChevronDown, CheckCircle2, CreditCard
} from 'lucide-react';

const App = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Tất cả');
  const [cartItems, setCartItems] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [cartBump, setCartBump] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = [
    { id: 'all', name: "Tất cả", icon: "🌈" },
    { id: 'cat1', name: "Rau Hữu Cơ", icon: "🥦" },
    { id: 'cat2', name: "Trái Cây", icon: "🍎" },
    { id: 'cat3', name: "Gia Vị", icon: "🌶️" },
    { id: 'cat4', name: "Thịt Sạch", icon: "🥩" },
  ];

  const allProducts = [
    { id: 1, category: "Trái Cây", name: "Táo Envy Premium", price: 185000, unit: "kg", tag: "Bán chạy", img: "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?q=80&w=500" },
    { id: 2, category: "Trái Cây", name: "Dâu Tây Đà Lạt", price: 240000, unit: "hộp", tag: "Mới về", img: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?q=80&w=500" },
    { id: 3, category: "Rau Hữu Cơ", name: "Súp Lơ Baby", price: 65000, unit: "túi", tag: "Organic", img: "https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?q=80&w=500" },
    { id: 4, category: "Gia Vị", name: "Mật Ong Rừng", price: 420000, unit: "chai", tag: "Sale", img: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=500" },
    { id: 5, category: "Rau Hữu Cơ", name: "Cải Kale Thủy Canh", price: 45000, unit: "túi", tag: "Dinh dưỡng", img: "https://images.unsplash.com/photo-1524179524541-1bb1ce411bb5?q=80&w=500" },
    { id: 6, category: "Thịt Sạch", name: "Thịt Bò Mỹ", price: 550000, unit: "kg", tag: "Cao cấp", img: "https://images.unsplash.com/photo-1558030006-450675393462?q=80&w=500" },
    { id: 7, category: "Trái Cây", name: "Nho Mẫu Đơn", price: 890000, unit: "chùm", tag: "Nhập khẩu", img: "https://images.unsplash.com/photo-1537640538966-79f369b41e8f?q=80&w=500" },
    { id: 8, category: "Thịt Sạch", name: "Ức Gà Phi Lê", price: 95000, unit: "kg", tag: "Eat Clean", img: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?q=80&w=500" },
    { id: 9, category: "Gia Vị", name: "Tương Ớt Thủ Công", price: 35000, unit: "chai", tag: "Gia truyền", img: "https://images.unsplash.com/photo-1581005615184-3000b0e01474?q=80&w=500" },
  ];

  const filteredProducts = activeCategory === 'Tất cả' 
    ? allProducts 
    : allProducts.filter(p => p.category === activeCategory);

  const addToCart = (product) => {
    const existing = cartItems.find(item => item.id === product.id);
    if (existing) {
      setCartItems(cartItems.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
    // Hiệu ứng thông báo giỏ hàng thay vì mở sidebar
    setCartBump(true);
    setTimeout(() => setCartBump(false), 300);
  };

  const updateQuantity = (id, delta) => {
    setCartItems(cartItems.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleOrder = (e) => {
    e.preventDefault();
    setOrderSuccess(true);
    setTimeout(() => {
      setOrderSuccess(false);
      setShowCheckout(false);
      setIsCartOpen(false);
      setCartItems([]);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 overflow-x-hidden">
      
      {/* Giỏ hàng Sidebar */}
      <div className={`fixed inset-0 z-[100] transition-all duration-500 ${isCartOpen ? 'visible' : 'invisible'}`}>
        <div className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-500 ${isCartOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => {setIsCartOpen(false); setShowCheckout(false);}} />
        <div className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl transition-transform duration-500 transform ${isCartOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}>
          
          <div className="p-6 border-b flex justify-between items-center bg-white sticky top-0 z-10">
            <h2 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-2">
              {showCheckout ? 'Thông tin giao hàng' : `Giỏ hàng (${cartItems.length})`}
            </h2>
            <button onClick={() => {setIsCartOpen(false); setShowCheckout(false);}} className="p-2 hover:bg-slate-100 rounded-full transition"><X size={24}/></button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6">
            {orderSuccess ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6 animate-bounce">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-2xl font-black mb-2">Đặt hàng thành công!</h3>
                <p className="text-slate-500">Chúng tôi sẽ liên hệ với bạn trong ít phút.</p>
              </div>
            ) : showCheckout ? (
              <form id="checkout-form" onSubmit={handleOrder} className="space-y-6 animate-fadeIn">
                <div className="bg-emerald-50 p-4 rounded-2xl flex items-center gap-3 mb-6">
                  <CreditCard className="text-emerald-600" />
                  <span className="text-sm font-bold text-emerald-800">Tổng thanh toán: {totalPrice.toLocaleString()}đ</span>
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Họ và tên</label>
                  <input required type="text" className="w-full bg-slate-50 border-none rounded-xl py-4 px-5 focus:ring-2 focus:ring-emerald-500 font-bold" placeholder="Nguyễn Văn A" />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Số điện thoại</label>
                  <input required type="tel" className="w-full bg-slate-50 border-none rounded-xl py-4 px-5 focus:ring-2 focus:ring-emerald-500 font-bold" placeholder="0901 234 567" />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Địa chỉ nhận hàng</label>
                  <textarea required className="w-full bg-slate-50 border-none rounded-xl py-4 px-5 focus:ring-2 focus:ring-emerald-500 font-bold min-h-[100px]" placeholder="Số nhà, tên đường, phường/xã..."></textarea>
                </div>
                <div className="pt-4">
                   <p className="text-xs text-slate-400 mb-4">* Hình thức thanh toán: COD (Giao hàng thu tiền tận nơi)</p>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                {cartItems.length === 0 ? (
                  <div className="py-20 flex flex-col items-center justify-center text-center opacity-40">
                    <ShoppingBag size={80} strokeWidth={1} className="mb-4" />
                    <p className="font-bold">Chưa có sản phẩm nào</p>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 group animate-fadeIn">
                      <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0">
                        <img src={item.img} className="w-full h-full object-cover" alt={item.name} />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="flex justify-between">
                          <h4 className="font-black text-slate-900 text-sm">{item.name}</h4>
                          <button onClick={() => updateQuantity(item.id, -item.quantity)} className="text-slate-300 hover:text-rose-500"><Trash2 size={16}/></button>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-3 bg-slate-100 px-3 py-1 rounded-full">
                            <button onClick={() => updateQuantity(item.id, -1)} className="hover:text-emerald-600"><Minus size={12}/></button>
                            <span className="text-xs font-black">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} className="hover:text-emerald-600"><Plus size={12}/></button>
                          </div>
                          <p className="text-emerald-600 font-black text-sm">{(item.price * item.quantity).toLocaleString()}đ</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {!orderSuccess && cartItems.length > 0 && (
            <div className="p-6 bg-white border-t space-y-4 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
              {showCheckout ? (
                <div className="flex gap-3">
                  <button onClick={() => setShowCheckout(false)} className="flex-1 bg-slate-100 text-slate-600 py-4 rounded-2xl font-black uppercase text-xs tracking-widest">Quay lại</button>
                  <button form="checkout-form" type="submit" className="flex-[2] bg-emerald-600 text-white py-4 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl shadow-emerald-900/10 transition-all active:scale-95">
                    Xác nhận đặt hàng
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Tổng cộng</span>
                    <span className="text-3xl font-black text-emerald-600 tracking-tighter">{totalPrice.toLocaleString()}đ</span>
                  </div>
                  <button onClick={() => setShowCheckout(true)} className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-emerald-600 transition-all active:scale-95 flex items-center justify-center gap-3">
                    Tiến hành thanh toán <ArrowRight size={18}/>
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Menu Drawer */}
      <div className={`fixed inset-0 z-[100] transition-all duration-500 lg:hidden ${isMenuOpen ? 'visible' : 'invisible'}`}>
        <div className={`absolute inset-0 bg-emerald-950/60 backdrop-blur-md transition-opacity duration-500 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setIsMenuOpen(false)} />
        <div className={`absolute left-0 top-0 h-full w-[80%] max-w-sm bg-white shadow-2xl transition-transform duration-500 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} flex flex-col`}>
          <div className="p-8 border-b flex justify-between items-center">
            <span className="text-xl font-black tracking-tighter uppercase">Danh mục</span>
            <button onClick={() => setIsMenuOpen(false)} className="p-2 bg-slate-100 rounded-full"><X size={20}/></button>
          </div>
          <div className="p-8 space-y-4 overflow-y-auto">
            {categories.map(cat => (
              <button 
                key={cat.id} 
                onClick={() => {setActiveCategory(cat.name); setIsMenuOpen(false); document.getElementById('product-section').scrollIntoView({behavior:'smooth'});}}
                className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${activeCategory === cat.name ? 'bg-emerald-600 text-white shadow-lg' : 'hover:bg-slate-50'}`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{cat.icon}</span>
                  <span className="font-black text-sm uppercase tracking-widest">{cat.name}</span>
                </div>
                <ChevronRight size={16} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsMenuOpen(true)} className={`p-2 rounded-xl transition-all ${scrolled ? 'bg-slate-100 text-slate-900 shadow-sm' : 'bg-white/10 text-white'}`}><Menu size={24} /></button>
            <div className="flex items-center gap-2 cursor-pointer hidden sm:flex">
              <div className="bg-emerald-600 p-2 rounded-xl shadow-lg shadow-emerald-600/20"><Leaf className="text-white w-5 h-5" /></div>
              <span className={`text-xl font-black tracking-tighter uppercase ${scrolled ? 'text-emerald-900' : 'text-white'}`}>FarmStore</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsCartOpen(true)}
              className={`p-2.5 rounded-full transition-all relative ${scrolled ? 'bg-emerald-600 text-white shadow-lg' : 'bg-white/10 text-white hover:bg-white/20'} ${cartBump ? 'scale-125 rotate-12' : 'scale-100'}`}
            >
              <ShoppingBag size={20} />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-[10px] flex items-center justify-center rounded-full font-black border-2 border-white shadow-sm">
                  {cartItems.reduce((a, b) => a + b.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?q=80&w=1920" className="w-full h-full object-cover scale-105" alt="Farm" />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full text-white">
          <h1 className="text-6xl md:text-8xl font-black leading-[0.85] mb-8 tracking-tighter animate-slideIn">CHỌN SẠCH <br /> <span className="text-emerald-400 italic">SỐNG KHỎE.</span></h1>
          <button onClick={() => document.getElementById('product-section').scrollIntoView({behavior:'smooth'})} className="bg-emerald-600 text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-emerald-500 transition-all shadow-2xl shadow-emerald-900/40">Khám phá ngay</button>
        </div>
      </section>

      {/* Category Filter Section - Re-aligned */}
      <section className="pt-24 pb-20 max-w-7xl mx-auto px-6" id="product-section">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 mb-16">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
               <span className="h-1 w-8 bg-emerald-600 rounded-full"></span>
               <span className="text-emerald-600 font-black uppercase tracking-[0.3em] text-[10px]">Cửa hàng trực tuyến</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-tight">Sản phẩm theo mục</h2>
          </div>
          
          <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar -mx-6 px-6 lg:mx-0 lg:px-0">
            {categories.map(cat => (
              <button 
                key={cat.id}
                onClick={() => setActiveCategory(cat.name)}
                className={`px-8 py-4 rounded-3xl font-black text-[10px] uppercase tracking-widest whitespace-nowrap transition-all flex items-center gap-3 border ${activeCategory === cat.name ? 'bg-emerald-600 text-white border-emerald-600 shadow-xl shadow-emerald-900/10' : 'bg-white text-slate-400 border-slate-100 hover:border-emerald-200 hover:text-emerald-600'}`}
              >
                <span className="text-lg">{cat.icon}</span> {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 min-h-[400px]">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((p) => (
              <div key={p.id} className="bg-white rounded-[2.5rem] p-5 shadow-sm hover:shadow-2xl transition-all duration-700 group border border-slate-50 animate-fadeIn relative">
                <div className="relative rounded-[2rem] overflow-hidden aspect-square mb-6 bg-slate-50">
                  <img src={p.img} className="w-full h-full object-cover group-hover:scale-110 transition duration-1000" alt={p.name} />
                  <div className="absolute top-4 left-4 bg-white/95 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider text-emerald-700 shadow-sm">
                    {p.tag}
                  </div>
                </div>
                <div className="px-2">
                  <p className="text-emerald-600 font-black text-[9px] uppercase tracking-widest mb-1">{p.category}</p>
                  <h3 className="text-xl font-black text-slate-900 mb-4 tracking-tight min-h-[56px] line-clamp-2">{p.name}</h3>
                  <div className="flex justify-between items-center bg-slate-50 p-4 rounded-3xl group-hover:bg-emerald-50 transition-colors">
                    <div>
                      <span className="text-xl font-black text-emerald-600 tracking-tighter">{p.price.toLocaleString()}đ</span>
                      <span className="text-[10px] text-slate-400 font-bold ml-1">/{p.unit}</span>
                    </div>
                    <button 
                      onClick={() => addToCart(p)} 
                      className="bg-slate-900 text-white p-3.5 rounded-2xl hover:bg-emerald-600 transition-all shadow-lg active:scale-90 hover:rotate-6"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center opacity-40">
              <Search size={60} className="mx-auto mb-4" />
              <p className="font-bold">Không tìm thấy sản phẩm trong mục này</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-white py-20 px-6 mt-20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-8">
            <Leaf className="text-emerald-400 w-8 h-8" />
            <span className="text-2xl font-black tracking-tighter uppercase">FarmStore</span>
          </div>
          <p className="text-slate-500 text-sm max-w-md mx-auto mb-12 font-medium">Hệ thống cung cấp nông sản sạch tiêu chuẩn quốc tế cho gia đình Việt.</p>
          <div className="flex justify-center gap-6 mb-12">
            {[Instagram, Facebook, Twitter].map((Icon, i) => (
              <button key={i} className="text-slate-500 hover:text-emerald-400 transition-colors p-2"><Icon size={24} /></button>
            ))}
          </div>
          <p className="text-[10px] text-slate-700 font-black uppercase tracking-[0.3em]">© 2024 Nông Sản Sạch Vietnam.</p>
        </div>
      </footer>

      <style>{`
        @keyframes slideIn { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-slideIn { animation: slideIn 1s ease-out forwards; }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-thumb { background: #10b981; border-radius: 10px; }
        .transition-all { transition-property: all; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 300ms; }
      `}</style>
    </div>
  );
};

export default App;

