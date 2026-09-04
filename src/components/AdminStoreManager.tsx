import React, { useState } from 'react';
import { Product, ProductCategory, StoreOrder, OrderStatus } from '../types';
import { 
  ShoppingBag, 
  Truck, 
  Package, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  X, 
  Search, 
  ExternalLink, 
  MessageSquare, 
  Tag, 
  Scale, 
  AlertCircle, 
  Check, 
  Filter,
  DollarSign
} from 'lucide-react';

interface AdminStoreManagerProps {
  products: Product[];
  orders: StoreOrder[];
  onAddProduct: (product: Omit<Product, 'id'>) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onUpdateOrderStatus: (orderId: string, status: OrderStatus) => void;
  onDeleteOrder: (orderId: string) => void;
}

export default function AdminStoreManager({
  products,
  orders,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onUpdateOrderStatus,
  onDeleteOrder
}: AdminStoreManagerProps) {
  const [activeTab, setActiveTab] = useState<'orders' | 'products'>('orders');
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('All');

  const [productSearch, setProductSearch] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState<string>('All');

  // Modal states
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // New product form state
  const [name, setName] = useState('');
  const [category, setCategory] = useState<ProductCategory>('Light');
  const [wholesalePriceBdt, setWholesalePriceBdt] = useState<number>(1500);
  const [retailPriceBdt, setRetailPriceBdt] = useState<number>(2200);
  const [weightKg, setWeightKg] = useState<number>(1.0);
  const [moq, setMoq] = useState<number>(5);
  const [brand, setBrand] = useState('RUTA Automation');
  const [inStock, setInStock] = useState(true);
  const [stockCount, setStockCount] = useState<number>(50);
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1565814636199-ae8133055c1c?w=600&auto=format&fit=crop&q=80');
  const [description, setDescription] = useState('');
  const [specsInput, setSpecsInput] = useState('Industrial Grade\nSurge Protection 6kV\nIP65 Waterproof');

  const allCategories: ProductCategory[] = [
    'Light',
    'Fan',
    'Switch & Socket',
    'Security Lock',
    'CCTV Camera',
    'Smart Camera',
    'Fire Alarm Detection & Protective Device'
  ];

  // Stats
  const totalOrdersCount = orders.length;
  const pendingOrdersCount = orders.filter(o => o.status === 'Pending').length;
  const confirmedOrdersCount = orders.filter(o => o.status === 'Confirmed' || o.status === 'Shipped').length;
  const totalRevenueBdt = orders.reduce((sum, o) => sum + o.totalAmountBdt, 0);
  const totalWeightShippedKg = orders.reduce((sum, o) => sum + o.totalWeightKg, 0);

  // Filtered orders
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
      order.customerName.toLowerCase().includes(orderSearch.toLowerCase()) ||
      order.customerPhone.includes(orderSearch) ||
      order.deliveryAddress.toLowerCase().includes(orderSearch.toLowerCase());
    const matchesStatus = orderStatusFilter === 'All' || order.status === orderStatusFilter;
    return matchesSearch && matchesStatus;
  });

  // Filtered products
  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      product.brand.toLowerCase().includes(productSearch.toLowerCase());
    const matchesCategory = productCategoryFilter === 'All' || product.category === productCategoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Handle Add Product Submit
  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const specs = specsInput
      .split('\n')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    onAddProduct({
      name,
      category,
      wholesalePriceBdt: Number(wholesalePriceBdt),
      retailPriceBdt: Number(retailPriceBdt),
      weightKg: Number(weightKg),
      moq: Number(moq),
      brand,
      inStock,
      stockCount: Number(stockCount),
      imageUrl: imageUrl || 'https://images.unsplash.com/photo-1565814636199-ae8133055c1c?w=600&auto=format&fit=crop&q=80',
      description,
      specifications: specs.length > 0 ? specs : ['Certified Standard Compliance']
    });

    setIsAddProductOpen(false);
    resetProductForm();
  };

  // Handle Edit Product Submit
  const handleUpdateProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    onUpdateProduct(editingProduct);
    setEditingProduct(null);
  };

  const resetProductForm = () => {
    setName('');
    setCategory('Light');
    setWholesalePriceBdt(1500);
    setRetailPriceBdt(2200);
    setWeightKg(1.0);
    setMoq(5);
    setBrand('RUTA Automation');
    setInStock(true);
    setStockCount(50);
    setDescription('');
    setSpecsInput('Industrial Grade\nSurge Protection 6kV\nIP65 Waterproof');
  };

  // WhatsApp client confirmation link
  const generateCustomerWhatsAppLink = (order: StoreOrder) => {
    const cleanPhone = order.customerPhone.replace(/[^0-9]/g, '');
    const phoneWithCountry = cleanPhone.startsWith('880') 
      ? cleanPhone 
      : cleanPhone.startsWith('0') 
      ? `880${cleanPhone.slice(1)}` 
      : `880${cleanPhone}`;

    const text = `Hello ${order.customerName},\n` +
      `This is Engr. Rukon Uddin from RUTA Engineering Wholesale Market.\n` +
      `Your Wholesale Order #${order.id} is currently: *${order.status.toUpperCase()}*.\n\n` +
      `📦 Items: ${order.items.map(i => `${i.productName} (x${i.quantity})`).join(', ')}\n` +
      `⚖️ Weight: ${order.totalWeightKg} kg\n` +
      `🚚 Courier Delivery: ৳${order.deliveryFeeBdt} BDT (৳140/kg)\n` +
      `💰 Total Amount: ৳${order.totalAmountBdt.toLocaleString()} BDT\n` +
      `📍 Destination: ${order.deliveryAddress}\n\n` +
      `Thank you for purchasing directly from our factory wholesale division!`;

    return `https://wa.me/${phoneWithCountry}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="space-y-8">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-mono uppercase mb-2">
            <span>Wholesale Orders</span>
            <ShoppingBag className="w-4 h-4 text-orange-500" />
          </div>
          <div className="text-2xl font-display font-black text-white">{totalOrdersCount} Orders</div>
          <p className="text-[11px] text-zinc-500 mt-1 font-sans">
            <strong className="text-orange-400">{pendingOrdersCount}</strong> awaiting confirmation
          </p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-mono uppercase mb-2">
            <span>Consignment Revenue</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-display font-black text-emerald-400">৳{totalRevenueBdt.toLocaleString()} BDT</div>
          <p className="text-[11px] text-zinc-500 mt-1 font-sans">Gross wholesale invoice volume</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-mono uppercase mb-2">
            <span>Dispatched Weight</span>
            <Scale className="w-4 h-4 text-orange-500" />
          </div>
          <div className="text-2xl font-display font-black text-white">{totalWeightShippedKg.toFixed(1)} KG</div>
          <p className="text-[11px] text-zinc-500 mt-1 font-sans">
            Courier rate applied: <strong className="text-orange-400">৳140 / KG</strong>
          </p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-mono uppercase mb-2">
            <span>Products in Catalog</span>
            <Package className="w-4 h-4 text-orange-500" />
          </div>
          <div className="text-2xl font-display font-black text-white">{products.length} Items</div>
          <p className="text-[11px] text-zinc-500 mt-1 font-sans">Across 7 certified hardware categories</p>
        </div>
      </div>

      {/* Control Tabs: Orders Management vs Products Catalog */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div className="flex items-center gap-2 bg-black p-1 rounded-xl border border-zinc-800">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-5 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'orders'
                ? 'bg-orange-500 text-black font-bold shadow-md shadow-orange-500/20'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Customer Orders ({orders.length})</span>
            {pendingOrdersCount > 0 && (
              <span className="px-1.5 py-0.2 bg-red-500 text-white rounded-full text-[10px]">
                {pendingOrdersCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`px-5 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'products'
                ? 'bg-orange-500 text-black font-bold shadow-md shadow-orange-500/20'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Manage Products ({products.length})</span>
          </button>
        </div>

        {activeTab === 'products' && (
          <button
            onClick={() => setIsAddProductOpen(true)}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-black font-display font-black text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Upload New Product</span>
          </button>
        )}
      </div>

      {/* TAB 1: CUSTOMER ORDERS MANAGEMENT */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          {/* Order Search & Filters */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={orderSearch}
                onChange={(e) => setOrderSearch(e.target.value)}
                placeholder="Search orders by ID, customer name, phone, or location..."
                className="w-full pl-10 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs font-sans text-white focus:outline-none focus:border-orange-500"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {['All', 'Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'].map(status => (
                <button
                  key={status}
                  onClick={() => setOrderStatusFilter(status)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase transition-colors whitespace-nowrap cursor-pointer ${
                    orderStatusFilter === status
                      ? 'bg-zinc-800 text-orange-400 font-bold border border-orange-500/40'
                      : 'bg-zinc-900/60 text-zinc-400 hover:text-white border border-zinc-800'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Orders Table / Cards List */}
          {filteredOrders.length === 0 ? (
            <div className="p-12 text-center bg-zinc-900 border border-zinc-800 rounded-2xl">
              <ShoppingBag className="w-8 h-8 text-zinc-600 mx-auto mb-2" />
              <h4 className="text-sm font-bold text-white uppercase font-display">No Orders Found</h4>
              <p className="text-xs text-zinc-500 mt-1">Orders placed via the Wholesale Market store will appear here for confirmation and dispatch tracking.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map(order => (
                <div
                  key={order.id}
                  className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 hover:border-zinc-700 transition-colors"
                >
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 pb-4 border-b border-zinc-800">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-black text-sm text-orange-400">
                          #{order.id}
                        </span>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase font-bold border ${
                          order.status === 'Pending' ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
                          order.status === 'Confirmed' ? 'bg-blue-500/10 text-blue-400 border-blue-500/30' :
                          order.status === 'Shipped' ? 'bg-purple-500/10 text-purple-400 border-purple-500/30' :
                          order.status === 'Delivered' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                          'bg-red-500/10 text-red-400 border-red-500/30'
                        }`}>
                          {order.status}
                        </span>
                        <span className="text-[11px] font-mono text-zinc-500">
                          {new Date(order.orderDate).toLocaleDateString()} at {new Date(order.orderDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>

                      <div className="text-sm font-bold text-white mt-1">
                        {order.customerName} • <span className="font-mono text-zinc-400">{order.customerPhone}</span>
                      </div>
                      <div className="text-xs text-zinc-400 font-sans mt-0.5">
                        📍 {order.deliveryAddress}
                      </div>
                    </div>

                    {/* Order Financial & Weight Totals */}
                    <div className="flex flex-wrap items-center gap-4 bg-black/60 px-4 py-2.5 rounded-xl border border-zinc-800">
                      <div>
                        <div className="text-[10px] font-mono text-zinc-500 uppercase">Weight</div>
                        <div className="text-xs font-mono font-bold text-white">{order.totalWeightKg} KG</div>
                      </div>
                      <div className="border-l border-zinc-800 pl-4">
                        <div className="text-[10px] font-mono text-zinc-500 uppercase">Delivery (৳140/kg)</div>
                        <div className="text-xs font-mono font-bold text-orange-400">৳{order.deliveryFeeBdt.toLocaleString()}</div>
                      </div>
                      <div className="border-l border-zinc-800 pl-4">
                        <div className="text-[10px] font-mono text-zinc-500 uppercase">Grand Total</div>
                        <div className="text-sm font-mono font-black text-emerald-400">৳{order.totalAmountBdt.toLocaleString()} BDT</div>
                      </div>
                    </div>
                  </div>

                  {/* Order Items Breakdown */}
                  <div className="py-3">
                    <div className="text-[11px] font-mono text-zinc-500 uppercase mb-2">Ordered Hardware Items:</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="p-2 bg-black/40 rounded-lg border border-zinc-800/80 text-xs">
                          <div className="font-bold text-zinc-200 truncate">{item.productName}</div>
                          <div className="text-[11px] font-mono text-zinc-400 flex justify-between mt-1">
                            <span>Qty: <strong>{item.quantity} pcs</strong></span>
                            <span className="text-orange-400">৳{(item.unitPriceBdt * item.quantity).toLocaleString()}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    {order.notes && (
                      <div className="text-[11px] font-sans text-zinc-400 mt-2 italic bg-zinc-950/40 p-2 rounded border border-zinc-800/50">
                        Note: {order.notes}
                      </div>
                    )}
                  </div>

                  {/* Actions Bar: Confirm, Ship, WhatsApp, Delete */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-zinc-800">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono text-zinc-500 uppercase">Status Action:</span>
                      
                      {order.status !== 'Confirmed' && (
                        <button
                          onClick={() => onUpdateOrderStatus(order.id, 'Confirmed')}
                          className="px-3 py-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/40 rounded text-[11px] font-mono uppercase font-bold cursor-pointer"
                        >
                          Confirm Order
                        </button>
                      )}

                      {order.status !== 'Shipped' && (
                        <button
                          onClick={() => onUpdateOrderStatus(order.id, 'Shipped')}
                          className="px-3 py-1 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 border border-purple-500/40 rounded text-[11px] font-mono uppercase font-bold cursor-pointer"
                        >
                          Mark Shipped
                        </button>
                      )}

                      {order.status !== 'Delivered' && (
                        <button
                          onClick={() => onUpdateOrderStatus(order.id, 'Delivered')}
                          className="px-3 py-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/40 rounded text-[11px] font-mono uppercase font-bold cursor-pointer"
                        >
                          Mark Delivered
                        </button>
                      )}

                      {order.status !== 'Cancelled' && (
                        <button
                          onClick={() => onUpdateOrderStatus(order.id, 'Cancelled')}
                          className="px-3 py-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded text-[11px] font-mono uppercase cursor-pointer"
                        >
                          Cancel
                        </button>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Contact on WhatsApp */}
                      <a
                        href={generateCustomerWhatsAppLink(order)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-black font-mono text-[11px] uppercase font-bold rounded-lg flex items-center gap-1.5 transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5 fill-black" />
                        <span>Chat on WhatsApp</span>
                      </a>

                      {/* Delete */}
                      <button
                        onClick={() => {
                          if (confirm(`Delete order #${order.id} record?`)) {
                            onDeleteOrder(order.id);
                          }
                        }}
                        className="p-1.5 text-zinc-500 hover:text-red-400 transition-colors cursor-pointer"
                        title="Delete order"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: PRODUCTS CATALOG MANAGEMENT */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          {/* Search & Category Filter */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                placeholder="Search products by title or brand..."
                className="w-full pl-10 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs font-sans text-white focus:outline-none focus:border-orange-500"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {['All', ...allCategories].map(cat => (
                <button
                  key={cat}
                  onClick={() => setProductCategoryFilter(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase transition-colors whitespace-nowrap cursor-pointer ${
                    productCategoryFilter === cat
                      ? 'bg-orange-500 text-black font-bold'
                      : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map(product => (
              <div
                key={product.id}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex flex-col justify-between hover:border-zinc-700 transition-colors"
              >
                <div>
                  <div className="relative rounded-xl overflow-hidden bg-black aspect-video mb-3 border border-zinc-800">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 px-2 py-0.5 bg-black/80 rounded text-[9px] font-mono text-orange-400 uppercase">
                      {product.category}
                    </div>
                    <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/80 rounded text-[10px] font-mono text-zinc-300">
                      ⚖️ {product.weightKg} kg
                    </div>
                  </div>

                  <div className="text-[10px] font-mono text-zinc-500 uppercase">{product.brand}</div>
                  <h4 className="text-sm font-bold text-white uppercase line-clamp-1 mb-2">
                    {product.name}
                  </h4>

                  <div className="p-3 bg-black/60 rounded-xl border border-zinc-800/80 mb-3 space-y-1 text-xs font-mono">
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Wholesale Rate:</span>
                      <span className="text-orange-400 font-bold">৳{product.wholesalePriceBdt.toLocaleString()} BDT</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Retail Ref:</span>
                      <span className="text-zinc-400 line-through">৳{product.retailPriceBdt.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Stock Count:</span>
                      <span className={product.inStock ? 'text-emerald-400' : 'text-red-400'}>
                        {product.inStock ? `${product.stockCount} in stock` : 'Out of stock'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Edit and Delete Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-3 border-t border-zinc-800">
                  <button
                    onClick={() => setEditingProduct(product)}
                    className="py-2 bg-zinc-950 hover:bg-black text-zinc-300 hover:text-white border border-zinc-800 rounded-lg text-xs font-mono uppercase flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-orange-500" />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => {
                      if (confirm(`Delete product "${product.name}"?`)) {
                        onDeleteProduct(product.id);
                      }
                    }}
                    className="py-2 bg-zinc-950 hover:bg-red-500/20 text-zinc-400 hover:text-red-400 border border-zinc-800 rounded-lg text-xs font-mono uppercase flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL: UPLOAD NEW PRODUCT */}
      {isAddProductOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-zinc-800">
              <h3 className="font-display font-black text-lg text-white uppercase tracking-tight flex items-center gap-2">
                <Plus className="w-5 h-5 text-orange-500" />
                <span>Upload New Wholesale Product</span>
              </h3>
              <button
                onClick={() => setIsAddProductOpen(false)}
                className="text-zinc-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4">
              <div>
                <label className="block text-[10px] font-mono uppercase text-zinc-400 mb-1">Product Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Industrial High Bay LED Light 200W"
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-zinc-400 mb-1">Category *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ProductCategory)}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-white focus:outline-none focus:border-orange-500 cursor-pointer"
                  >
                    {allCategories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase text-zinc-400 mb-1">Brand Name *</label>
                  <input
                    type="text"
                    required
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    placeholder="e.g. RUTA Lumina / Tuya / Dahua"
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-orange-400 mb-1">Wholesale (BDT) *</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={wholesalePriceBdt}
                    onChange={(e) => setWholesalePriceBdt(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase text-zinc-400 mb-1">Retail (BDT)</label>
                  <input
                    type="number"
                    min={1}
                    value={retailPriceBdt}
                    onChange={(e) => setRetailPriceBdt(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase text-orange-400 mb-1">Weight (KG) *</label>
                  <input
                    type="number"
                    step="0.05"
                    required
                    min={0.05}
                    value={weightKg}
                    onChange={(e) => setWeightKg(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-orange-500"
                  />
                  <span className="text-[9px] text-zinc-500 font-mono">140 BDT/kg calc</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-zinc-400 mb-1">Min Order Qty (MOQ)</label>
                  <input
                    type="number"
                    min={1}
                    value={moq}
                    onChange={(e) => setMoq(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase text-zinc-400 mb-1">Stock Count</label>
                  <input
                    type="number"
                    min={0}
                    value={stockCount}
                    onChange={(e) => setStockCount(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-zinc-400 mb-1">Image URL</label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-zinc-400 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Key features, applications, and suitability..."
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-white focus:outline-none focus:border-orange-500"
                ></textarea>
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-zinc-400 mb-1">
                  Specifications (One per line)
                </label>
                <textarea
                  rows={3}
                  value={specsInput}
                  onChange={(e) => setSpecsInput(e.target.value)}
                  placeholder="Line 1: 150W Output&#10;Line 2: IP65 Waterproof&#10;Line 3: 5-Year Warranty"
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-orange-500"
                ></textarea>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsAddProductOpen(false)}
                  className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-lg text-xs font-mono uppercase cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-black font-display font-black text-xs uppercase tracking-wider rounded-lg cursor-pointer"
                >
                  Upload Product to Store
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT PRODUCT */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-zinc-800">
              <h3 className="font-display font-black text-lg text-white uppercase tracking-tight flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-orange-500" />
                <span>Edit Product Details</span>
              </h3>
              <button
                onClick={() => setEditingProduct(null)}
                className="text-zinc-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateProductSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-mono uppercase text-zinc-400 mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-zinc-400 mb-1">Category</label>
                  <select
                    value={editingProduct.category}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value as ProductCategory })}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-white focus:outline-none focus:border-orange-500 cursor-pointer"
                  >
                    {allCategories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase text-zinc-400 mb-1">Brand</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.brand}
                    onChange={(e) => setEditingProduct({ ...editingProduct, brand: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-orange-400 mb-1">Wholesale Rate (BDT)</label>
                  <input
                    type="number"
                    required
                    value={editingProduct.wholesalePriceBdt}
                    onChange={(e) => setEditingProduct({ ...editingProduct, wholesalePriceBdt: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase text-zinc-400 mb-1">Retail (BDT)</label>
                  <input
                    type="number"
                    value={editingProduct.retailPriceBdt}
                    onChange={(e) => setEditingProduct({ ...editingProduct, retailPriceBdt: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase text-orange-400 mb-1">Weight (KG)</label>
                  <input
                    type="number"
                    step="0.05"
                    required
                    value={editingProduct.weightKg}
                    onChange={(e) => setEditingProduct({ ...editingProduct, weightKg: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-zinc-400 mb-1">Stock Count</label>
                  <input
                    type="number"
                    value={editingProduct.stockCount}
                    onChange={(e) => setEditingProduct({ 
                      ...editingProduct, 
                      stockCount: Number(e.target.value),
                      inStock: Number(e.target.value) > 0
                    })}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase text-zinc-400 mb-1">MOQ</label>
                  <input
                    type="number"
                    value={editingProduct.moq}
                    onChange={(e) => setEditingProduct({ ...editingProduct, moq: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-zinc-400 mb-1">Image URL</label>
                <input
                  type="url"
                  value={editingProduct.imageUrl}
                  onChange={(e) => setEditingProduct({ ...editingProduct, imageUrl: e.target.value })}
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-zinc-400 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={editingProduct.description}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-white focus:outline-none focus:border-orange-500"
                ></textarea>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-lg text-xs font-mono uppercase cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-black font-display font-black text-xs uppercase tracking-wider rounded-lg cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
