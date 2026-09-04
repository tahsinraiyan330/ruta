import React, { useState } from 'react';
import { Product, ProductCategory, StoreOrder, StoreOrderItem } from '../types';
import { 
  ShoppingBag, 
  Truck, 
  MessageSquare, 
  Search, 
  Filter, 
  Check, 
  Plus, 
  Minus, 
  Trash2, 
  X, 
  ArrowLeft, 
  CheckCircle2, 
  ExternalLink, 
  Tag, 
  ShieldCheck, 
  Scale, 
  Phone, 
  MapPin, 
  User, 
  HelpCircle 
} from 'lucide-react';

interface WholesaleMarketPageProps {
  products: Product[];
  onPlaceOrder: (order: StoreOrder) => void;
  onBackToHome: () => void;
  initialCategory?: ProductCategory | 'All';
}

export default function WholesaleMarketPage({
  products,
  onPlaceOrder,
  onBackToHome,
  initialCategory = 'All'
}: WholesaleMarketPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  // Cart state
  const [cart, setCart] = useState<{ [productId: string]: number }>({});
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Order checkout modal fields
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [orderSubmittedSuccess, setOrderSubmittedSuccess] = useState(false);

  // Selected product detail modal
  const [inspectProduct, setInspectProduct] = useState<Product | null>(null);

  const categories: (ProductCategory | 'All')[] = [
    'All',
    'Light',
    'Fan',
    'Switch & Socket',
    'Security Lock',
    'CCTV Camera',
    'Smart Camera',
    'Fire Alarm Detection & Protective Device'
  ];

  // Filter products
  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStock = !inStockOnly || p.inStock;
    return matchesCategory && matchesSearch && matchesStock;
  });

  // Cart Calculations
  const cartItems: (StoreOrderItem & { product: Product })[] = Object.entries(cart)
    .map(([productId, qty]) => {
      const quantity = Number(qty);
      const product = products.find(p => p.id === productId);
      if (!product || quantity <= 0) return null;
      return {
        productId,
        productName: product.name,
        category: product.category,
        quantity,
        unitPriceBdt: product.wholesalePriceBdt,
        weightKg: product.weightKg,
        product
      };
    })
    .filter(Boolean) as (StoreOrderItem & { product: Product })[];

  const cartTotalWeightKg = cartItems.reduce((acc, item) => acc + (item.weightKg * item.quantity), 0);
  const cartSubtotalBdt = cartItems.reduce((acc, item) => acc + (item.unitPriceBdt * item.quantity), 0);
  // 140 BDT delivery per KG, minimum 140 BDT if items exist
  const cartDeliveryFeeBdt = cartItems.length > 0 ? Math.max(140, Math.ceil(cartTotalWeightKg * 140)) : 0;
  const cartTotalAmountBdt = cartSubtotalBdt + cartDeliveryFeeBdt;
  const cartTotalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Cart actions
  const addToCart = (product: Product, quantityToAdd = 1) => {
    setCart(prev => {
      const current = prev[product.id] || 0;
      const next = current + (current === 0 ? product.moq : quantityToAdd);
      return { ...prev, [product.id]: next };
    });
  };

  const updateCartQuantity = (productId: string, newQty: number) => {
    setCart(prev => {
      const updated = { ...prev };
      if (newQty <= 0) {
        delete updated[productId];
      } else {
        updated[productId] = newQty;
      }
      return updated;
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => {
      const updated = { ...prev };
      delete updated[productId];
      return updated;
    });
  };

  // Instant single-product WhatsApp Order
  const handleInstantWhatsAppOrder = (product: Product) => {
    const minQty = product.moq;
    const estWeight = product.weightKg * minQty;
    const estDelivery = Math.max(140, Math.ceil(estWeight * 140));
    const estTotal = (product.wholesalePriceBdt * minQty) + estDelivery;

    const message = `*WHOLESALE ORDER INQUIRY - RUTA ENGINEERING*\n\n` +
      `📦 *Item:* ${product.name}\n` +
      `🏷️ *Category:* ${product.category}\n` +
      `🏭 *Brand:* ${product.brand}\n` +
      `📊 *Wholesale Quantity:* ${minQty} units (MOQ)\n` +
      `💰 *Wholesale Rate:* ৳${product.wholesalePriceBdt.toLocaleString()} BDT / unit\n` +
      `⚖️ *Package Weight:* ${estWeight.toFixed(2)} kg\n` +
      `🚚 *Courier Delivery (৳140/kg):* ৳${estDelivery.toLocaleString()} BDT\n` +
      `💵 *Estimated Total:* ৳${estTotal.toLocaleString()} BDT\n\n` +
      `Please confirm invoice and shipment schedule.`;

    window.open(`https://wa.me/8801730318552?text=${encodeURIComponent(message)}`, '_blank');
  };

  // Complete Bulk Cart WhatsApp Checkout & Save to Admin Panel
  const handleCheckoutViaWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;
    if (!customerName || !customerPhone || !deliveryAddress) {
      alert('Please provide your name, phone number, and delivery address.');
      return;
    }

    const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: StoreOrder = {
      id: orderId,
      customerName,
      customerPhone,
      deliveryAddress,
      items: cartItems.map(item => ({
        productId: item.productId,
        productName: item.productName,
        category: item.category,
        quantity: item.quantity,
        unitPriceBdt: item.unitPriceBdt,
        weightKg: item.weightKg
      })),
      totalWeightKg: Number(cartTotalWeightKg.toFixed(2)),
      subtotalBdt: cartSubtotalBdt,
      deliveryFeeBdt: cartDeliveryFeeBdt,
      totalAmountBdt: cartTotalAmountBdt,
      status: 'Pending',
      orderDate: new Date().toISOString(),
      notes: orderNotes
    };

    // Save to CRM / Admin store
    onPlaceOrder(newOrder);

    // Format WhatsApp order payload
    let itemsText = '';
    cartItems.forEach((item, index) => {
      const lineWeight = (item.weightKg * item.quantity).toFixed(2);
      const lineSubtotal = (item.unitPriceBdt * item.quantity).toLocaleString();
      itemsText += `${index + 1}. *${item.productName}*\n   Qty: ${item.quantity} pcs × ৳${item.unitPriceBdt} = ৳${lineSubtotal} | Wt: ${lineWeight} kg\n`;
    });

    const whatsappMessage = `*NEW WHOLESALE MARKET ORDER #${orderId}*\n` +
      `═══════════════════════════\n` +
      `👤 *Client Name:* ${customerName}\n` +
      `📱 *Phone Number:* ${customerPhone}\n` +
      `📍 *Delivery Address:* ${deliveryAddress}\n` +
      (orderNotes ? `📝 *Notes:* ${orderNotes}\n` : '') +
      `═══════════════════════════\n` +
      `📋 *ORDERED ITEMS:*\n${itemsText}` +
      `═══════════════════════════\n` +
      `⚖️ *Total Consignment Weight:* ${cartTotalWeightKg.toFixed(2)} kg\n` +
      `📦 *Items Subtotal:* ৳${cartSubtotalBdt.toLocaleString()} BDT\n` +
      `🚚 *Courier Fee (৳140 / kg):* ৳${cartDeliveryFeeBdt.toLocaleString()} BDT\n` +
      `💰 *GRAND TOTAL PAYABLE:* ৳${cartTotalAmountBdt.toLocaleString()} BDT\n\n` +
      `Kindly confirm dispatch via SA Paribahan / Sundarban Courier service.`;

    // Clear cart and show notification
    setOrderSubmittedSuccess(true);
    setCart({});
    setTimeout(() => {
      window.open(`https://wa.me/8801730318552?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
    }, 400);
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-orange-500 selection:text-black pt-6 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Sticky Navigation Bar with Cart Access */}
        <div id="wholesale-top-bar" className="sticky top-[72px] z-30 py-3 bg-black/90 backdrop-blur-md border-b border-zinc-800/80 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 mb-6 flex items-center justify-between gap-4 transition-all">
          <button
            id="wholesale-back-to-bureau-button"
            onClick={onBackToHome}
            className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 rounded-lg text-xs font-mono uppercase transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-orange-500" />
            <span>Back to Engineering Bureau</span>
          </button>

          {/* Top Bar Cart Trigger */}
          <button
            id="wholesale-top-cart-button"
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 px-3.5 py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-orange-500/40 hover:border-orange-500 text-white font-display font-black text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-md"
          >
            <ShoppingBag className="w-4 h-4 text-orange-500" />
            <span>Cart</span>
            {cartTotalItemsCount > 0 && (
              <span className="px-1.5 py-0.5 bg-orange-500 text-black rounded-full text-[10px] font-mono font-bold">
                {cartTotalItemsCount}
              </span>
            )}
            {cartSubtotalBdt > 0 && (
              <span className="hidden sm:inline border-l border-zinc-700 pl-2 font-mono text-[11px] text-orange-400">
                ৳{cartSubtotalBdt.toLocaleString()}
              </span>
            )}
          </button>
        </div>

        {/* Wholesale Market Hero Banner */}
        <div id="wholesale-hero-banner" className="relative bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-10 mb-10 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-black border border-orange-500/30 text-orange-500 rounded-md text-xs font-mono uppercase tracking-wider mb-4">
              <Tag className="w-3.5 h-3.5" />
              AUTHENTIC WHOLESALE MARKET // B2B BULK CATALOG
            </div>

            <h1 className="text-3xl sm:text-5xl font-display font-black text-white uppercase tracking-tight leading-none mb-3">
              RUTA Wholesale Market
            </h1>

            <p className="text-zinc-300 text-sm sm:text-base font-sans leading-relaxed mb-6">
              Industrial and commercial grade electrical hardware, automation components, CCTV, smart locks, and fire protection equipment at tier-1 distributor prices. Instant nationwide order dispatch via WhatsApp.
            </p>

            {/* Wholesale Delivery Rule Banner */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-zinc-800">
              <div className="p-3 bg-black/60 rounded-xl border border-zinc-800 flex items-center gap-3">
                <Truck className="w-5 h-5 text-orange-500 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-white uppercase">Delivery Tariff</div>
                  <div className="text-[11px] font-mono text-orange-400">৳140 BDT / KG (All BD)</div>
                </div>
              </div>

              <div className="p-3 bg-black/60 rounded-xl border border-zinc-800 flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-white uppercase">WhatsApp Orders</div>
                  <div className="text-[11px] font-mono text-emerald-400">Instant One-Click Quote</div>
                </div>
              </div>

              <div className="p-3 bg-black/60 rounded-xl border border-zinc-800 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-orange-500 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-white uppercase">Engineer Verified</div>
                  <div className="text-[11px] font-mono text-zinc-400">Engr. Rukon Uddin Certified</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filters Bar & Search */}
        <div className="space-y-4 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products by name, brand, or specs..."
                className="w-full pl-10 pr-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs font-sans text-white focus:outline-none focus:border-orange-500 placeholder:text-zinc-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* In-Stock Filter Toggle */}
            <div className="flex items-center gap-4 text-xs font-mono">
              <label className="flex items-center gap-2 text-zinc-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="accent-orange-500 rounded cursor-pointer"
                />
                <span>In-Stock Only</span>
              </label>

              <span className="text-zinc-600">|</span>
              <span className="text-zinc-400">Showing <strong className="text-white">{filteredProducts.length}</strong> Products</span>
            </div>
          </div>

          {/* 7 Categories Pill Navigation */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-orange-500 text-black font-bold shadow-md shadow-orange-500/20'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="p-12 text-center bg-zinc-900 border border-zinc-800 rounded-2xl">
            <Filter className="w-8 h-8 text-zinc-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white uppercase font-display">No Wholesale Products Found</h3>
            <p className="text-xs text-zinc-400 mt-1">Try clearing your search query or selecting a different category.</p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); setInStockOnly(false); }}
              className="mt-4 px-4 py-2 bg-orange-500 text-black font-display font-bold text-xs uppercase rounded-lg cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const inCartQty = cart[product.id] || 0;
              return (
                <div
                  key={product.id}
                  className="bg-zinc-900 border border-zinc-800 hover:border-orange-500/50 rounded-2xl p-4 flex flex-col justify-between transition-all group"
                >
                  <div>
                    {/* Image Card Container */}
                    <div className="relative rounded-xl overflow-hidden bg-black aspect-video mb-3 border border-zinc-800/80">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />

                      {/* Weight Badge */}
                      <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/80 backdrop-blur-sm rounded text-[10px] font-mono text-zinc-300 border border-zinc-800 flex items-center gap-1">
                        <Scale className="w-3 h-3 text-orange-500" />
                        <span>{product.weightKg} kg</span>
                      </div>

                      {/* Category Badge */}
                      <div className="absolute top-2 right-2 px-2 py-0.5 bg-zinc-950/80 backdrop-blur-sm rounded text-[9px] font-mono text-orange-400 border border-zinc-800 uppercase">
                        {product.category}
                      </div>

                      {/* Stock badge */}
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-black/70 flex items-center justify-center text-red-400 font-mono text-xs uppercase font-bold">
                          Out of Stock
                        </div>
                      )}
                    </div>

                    {/* Brand & Name */}
                    <div className="text-[10px] font-mono uppercase text-zinc-500 font-bold mb-0.5">
                      {product.brand}
                    </div>
                    <h3 className="font-display font-bold text-white text-sm uppercase tracking-tight line-clamp-2 mb-2 group-hover:text-orange-400 transition-colors">
                      {product.name}
                    </h3>

                    {/* Pricing Box */}
                    <div className="p-3 bg-black/70 rounded-xl border border-zinc-800/80 mb-3">
                      <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500">
                        <span>Wholesale Rate</span>
                        <span className="line-through">Retail: ৳{product.retailPriceBdt.toLocaleString()}</span>
                      </div>
                      <div className="flex items-baseline justify-between mt-1">
                        <div className="text-xl font-mono font-black text-orange-500">
                          ৳{product.wholesalePriceBdt.toLocaleString()}
                          <span className="text-[10px] font-sans font-normal text-zinc-400 ml-1">/ unit</span>
                        </div>
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                          MOQ: {product.moq} pcs
                        </span>
                      </div>
                      <div className="text-[10px] font-mono text-zinc-400 mt-1 flex items-center justify-between pt-1 border-t border-zinc-900">
                        <span>Est. Delivery: ৳{Math.max(140, Math.ceil(product.weightKg * 140))}</span>
                        <span className="text-zinc-500">(৳140/kg)</span>
                      </div>
                    </div>

                    {/* Top Specs Snippet */}
                    <div className="space-y-1 mb-4">
                      {product.specifications.slice(0, 2).map((spec, i) => (
                        <div key={i} className="text-[11px] text-zinc-400 flex items-start gap-1.5 font-sans">
                          <Check className="w-3 h-3 text-orange-500 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="space-y-2 pt-3 border-t border-zinc-800">
                    <div className="grid grid-cols-2 gap-2">
                      {/* Add to Cart / Quantity adjuster */}
                      {inCartQty > 0 ? (
                        <div className="flex items-center justify-between bg-black border border-orange-500 rounded-lg px-2 py-1.5 text-xs font-mono">
                          <button
                            onClick={() => updateCartQuantity(product.id, inCartQty - 1)}
                            className="text-zinc-400 hover:text-white cursor-pointer"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="font-bold text-orange-400">{inCartQty} in cart</span>
                          <button
                            onClick={() => updateCartQuantity(product.id, inCartQty + 1)}
                            className="text-zinc-400 hover:text-white cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => addToCart(product)}
                          className="py-2 bg-zinc-950 hover:bg-black text-white hover:text-orange-400 border border-zinc-800 rounded-lg text-[11px] font-mono uppercase tracking-wider flex items-center justify-center gap-1 transition-colors cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5 text-orange-500" />
                          <span>Add to Cart</span>
                        </button>
                      )}

                      {/* Inspect details */}
                      <button
                        onClick={() => setInspectProduct(product)}
                        className="py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 rounded-lg text-[11px] font-mono uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        Specs &amp; Info
                      </button>
                    </div>

                    {/* Instant WhatsApp Order */}
                    <button
                      onClick={() => handleInstantWhatsAppOrder(product)}
                      className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 text-black font-display font-black text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5 fill-black" />
                      <span>Order via WhatsApp</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Product Inspect Modal */}
        {inspectProduct && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-zinc-950 border border-zinc-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative">
              <button
                onClick={() => setInspectProduct(null)}
                className="absolute top-4 right-4 sm:top-5 sm:right-5 z-30 w-10 h-10 rounded-full bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-white flex items-center justify-center shadow-2xl backdrop-blur-md cursor-pointer transition-all hover:scale-105"
                title="Close"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div className="rounded-2xl overflow-hidden bg-black border border-zinc-800 aspect-square">
                  <img
                    src={inspectProduct.imageUrl}
                    alt={inspectProduct.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-orange-500 uppercase font-bold tracking-widest">
                      {inspectProduct.brand} • {inspectProduct.category}
                    </span>
                    <h2 className="text-xl font-display font-black text-white uppercase tracking-tight mt-1 mb-2">
                      {inspectProduct.name}
                    </h2>
                    <p className="text-xs text-zinc-400 leading-relaxed font-sans mb-4">
                      {inspectProduct.description}
                    </p>
                  </div>

                  <div className="p-4 bg-zinc-900 rounded-xl border border-zinc-800">
                    <div className="flex justify-between text-xs font-mono text-zinc-400 mb-1">
                      <span>Wholesale Rate:</span>
                      <span className="text-lg font-black text-orange-500">৳{inspectProduct.wholesalePriceBdt.toLocaleString()} BDT</span>
                    </div>
                    <div className="flex justify-between text-xs font-mono text-zinc-400 mb-1">
                      <span>Unit Weight:</span>
                      <span className="text-white font-bold">{inspectProduct.weightKg} kg</span>
                    </div>
                    <div className="flex justify-between text-xs font-mono text-zinc-400 mb-1">
                      <span>Delivery (৳140/kg):</span>
                      <span className="text-orange-400">৳{Math.max(140, Math.ceil(inspectProduct.weightKg * 140))} BDT</span>
                    </div>
                    <div className="flex justify-between text-xs font-mono text-zinc-400 pt-2 border-t border-zinc-800">
                      <span>Minimum Wholesale Qty:</span>
                      <span className="text-emerald-400 font-bold">{inspectProduct.moq} pcs</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Detailed Specs list */}
              <div className="mb-6">
                <h4 className="text-xs font-mono uppercase text-zinc-400 font-bold mb-2">Technical Specifications:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {inspectProduct.specifications.map((spec, i) => (
                    <div key={i} className="p-2.5 bg-zinc-900/60 rounded-lg border border-zinc-800/80 text-xs text-zinc-300 flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-zinc-800">
                <button
                  onClick={() => {
                    addToCart(inspectProduct);
                    setInspectProduct(null);
                  }}
                  className="w-full py-3 bg-zinc-900 hover:bg-zinc-800 text-white font-mono uppercase text-xs rounded-xl flex items-center justify-center gap-2 border border-zinc-800 cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-orange-500" />
                  <span>Add to Wholesale Cart</span>
                </button>

                <button
                  onClick={() => {
                    handleInstantWhatsAppOrder(inspectProduct);
                    setInspectProduct(null);
                  }}
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-black font-display font-black uppercase text-xs tracking-wider rounded-xl flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 fill-black" />
                  <span>Order Now via WhatsApp</span>
                </button>
              </div>

            </div>
          </div>
        )}

        {/* Cart Drawer / Modal */}
        {isCartOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end">
            <div className="bg-zinc-950 border-l border-zinc-800 w-full max-w-xl h-full flex flex-col justify-between overflow-y-auto p-6 relative">
              
              <div>
                {/* Cart Header */}
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-zinc-800">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-orange-500" />
                    <h3 className="font-display font-black text-lg text-white uppercase tracking-tight">
                      Wholesale Cart
                    </h3>
                    <span className="text-xs font-mono text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                      {cartTotalItemsCount} pcs
                    </span>
                  </div>

                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="p-1.5 text-zinc-400 hover:text-white rounded-lg bg-zinc-900 border border-zinc-800 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Notification toast if just submitted */}
                {orderSubmittedSuccess && (
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl mb-6 flex items-start gap-3 text-emerald-400 text-xs">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-mono uppercase font-bold">Order Registered &amp; WhatsApp Opened!</strong>
                      Your order has been recorded into the Admin CRM desk and forwarded directly to Engr. Rukon's dispatch team.
                    </div>
                  </div>
                )}

                {/* Empty Cart state */}
                {cartItems.length === 0 ? (
                  <div className="py-16 text-center text-zinc-500">
                    <ShoppingBag className="w-12 h-12 mx-auto mb-3 text-zinc-700" />
                    <p className="text-sm font-display font-bold uppercase">Your wholesale cart is empty</p>
                    <p className="text-xs text-zinc-600 mt-1">Browse products and add items to generate a consolidated wholesale shipment.</p>
                  </div>
                ) : (
                  <div className="space-y-4 mb-8">
                    {/* Items List */}
                    {cartItems.map((item) => (
                      <div
                        key={item.productId}
                        className="p-3.5 bg-zinc-900 border border-zinc-800 rounded-xl flex items-start justify-between gap-3"
                      >
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-white uppercase truncate font-sans">
                            {item.productName}
                          </h4>
                          <div className="text-[11px] font-mono text-orange-400 mt-0.5">
                            ৳{item.unitPriceBdt.toLocaleString()} × {item.quantity} = <strong>৳{(item.unitPriceBdt * item.quantity).toLocaleString()} BDT</strong>
                          </div>
                          <div className="text-[10px] font-mono text-zinc-500 mt-0.5 flex items-center gap-2">
                            <span>Weight: {(item.weightKg * item.quantity).toFixed(2)} kg</span>
                            <span>•</span>
                            <span>{item.category}</span>
                          </div>
                        </div>

                        {/* Quantity Counter */}
                        <div className="flex items-center gap-2 shrink-0">
                          <div className="flex items-center bg-black border border-zinc-800 rounded-lg px-2 py-1 text-xs font-mono">
                            <button
                              onClick={() => updateCartQuantity(item.productId, item.quantity - 1)}
                              className="text-zinc-400 hover:text-white cursor-pointer px-1"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-bold text-white px-2">{item.quantity}</span>
                            <button
                              onClick={() => updateCartQuantity(item.productId, item.quantity + 1)}
                              className="text-zinc-400 hover:text-white cursor-pointer px-1"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.productId)}
                            className="p-1.5 text-zinc-500 hover:text-red-400 transition-colors cursor-pointer"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}

                    {/* Weight & Delivery Fee Breakdown Box */}
                    <div className="p-4 bg-black rounded-xl border border-zinc-800 space-y-2 text-xs font-mono">
                      <div className="flex justify-between text-zinc-400">
                        <span>Consolidated Weight:</span>
                        <span className="text-white font-bold">{cartTotalWeightKg.toFixed(2)} KG</span>
                      </div>
                      <div className="flex justify-between text-zinc-400">
                        <span>Items Subtotal:</span>
                        <span className="text-white">৳{cartSubtotalBdt.toLocaleString()} BDT</span>
                      </div>
                      <div className="flex justify-between text-orange-400">
                        <span className="flex items-center gap-1">
                          <Truck className="w-3.5 h-3.5" />
                          Delivery Fee (৳140/kg flat):
                        </span>
                        <span className="font-bold">৳{cartDeliveryFeeBdt.toLocaleString()} BDT</span>
                      </div>
                      <div className="pt-2 border-t border-zinc-800 flex justify-between text-sm font-bold text-white">
                        <span>Estimated Total:</span>
                        <span className="text-orange-500 text-base">৳{cartTotalAmountBdt.toLocaleString()} BDT</span>
                      </div>
                    </div>

                    {/* Client Destination Form */}
                    <form onSubmit={handleCheckoutViaWhatsApp} className="space-y-3 pt-2">
                      <h4 className="text-xs font-mono uppercase text-orange-500 font-bold">
                        Delivery Destination Details:
                      </h4>

                      <div>
                        <input
                          type="text"
                          required
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          placeholder="Your Name / Company Name *"
                          className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs font-sans text-white focus:outline-none focus:border-orange-500"
                        />
                      </div>

                      <div>
                        <input
                          type="tel"
                          required
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          placeholder="Phone Number (e.g. 01711223344) *"
                          className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-orange-500"
                        />
                      </div>

                      <div>
                        <textarea
                          required
                          rows={2}
                          value={deliveryAddress}
                          onChange={(e) => setDeliveryAddress(e.target.value)}
                          placeholder="Complete Delivery Address & Nearest Courier Branch *"
                          className="w-full px-3.5 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs font-sans text-white focus:outline-none focus:border-orange-500"
                        ></textarea>
                      </div>

                      <div>
                        <input
                          type="text"
                          value={orderNotes}
                          onChange={(e) => setOrderNotes(e.target.value)}
                          placeholder="Special instructions or urgency notes (optional)"
                          className="w-full px-3.5 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs font-sans text-white focus:outline-none focus:border-orange-500"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full mt-3 py-3 bg-emerald-500 hover:bg-emerald-600 text-black font-display font-black text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-lg shadow-emerald-500/20"
                      >
                        <MessageSquare className="w-4 h-4 fill-black" />
                        <span>Confirm &amp; Send Order to WhatsApp</span>
                      </button>
                    </form>
                  </div>
                )}
              </div>

              {/* Cart Footer note */}
              <div className="pt-4 border-t border-zinc-800 text-[10px] font-mono text-zinc-500 text-center">
                RUTA Engineering Wholesale • Orders confirmed within 30 minutes • Delivery in 24-48 Hours
              </div>

            </div>
          </div>
        )}

        {/* Fixed Small Cart Floating Icon (Floats persistently on screen when scrolling) */}
        {!isCartOpen && (
          <aside 
            id="wholesale-floating-cart-container" 
            aria-label="Floating cart trigger" 
            className="fixed bottom-6 right-6 z-40"
          >
            <button
              id="wholesale-floating-cart-button"
              onClick={() => setIsCartOpen(true)}
              aria-label={`Open Wholesale Cart with ${cartTotalItemsCount} items`}
              className="flex items-center gap-2.5 px-4 py-3 bg-orange-500 hover:bg-orange-400 active:scale-95 text-black font-display font-black text-xs uppercase tracking-wider rounded-full shadow-2xl shadow-orange-500/40 border-2 border-black/30 hover:shadow-orange-500/60 transition-all cursor-pointer group"
            >
              <div className="relative flex items-center justify-center">
                <ShoppingBag className="w-4 h-4 transition-transform group-hover:scale-110" />
                {cartTotalItemsCount > 0 && (
                  <span className="absolute -top-3 -right-3 px-1.5 py-0.5 bg-black text-orange-400 border border-orange-500/80 rounded-full text-[10px] font-mono font-black min-w-[18px] text-center shadow-md">
                    {cartTotalItemsCount}
                  </span>
                )}
              </div>
              <span className="font-bold">Cart</span>
              {cartSubtotalBdt > 0 && (
                <span className="border-l border-black/30 pl-2 font-mono text-[11px] font-bold">
                  ৳{cartSubtotalBdt.toLocaleString()}
                </span>
              )}
            </button>
          </aside>
        )}

      </div>
    </div>
  );
}
