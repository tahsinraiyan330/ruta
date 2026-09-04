import React from 'react';
import { Product, ProductCategory } from '../types';
import { ShoppingBag, ArrowRight, MessageSquare, Truck, ShieldCheck, Tag, Check, Zap } from 'lucide-react';

interface HomeAutomationProductsProps {
  products: Product[];
  onOpenStore: (category?: ProductCategory) => void;
}

export default function HomeAutomationProducts({ products, onOpenStore }: HomeAutomationProductsProps) {
  // 4 Featured categories for the homepage as requested by user
  const featuredCategories: { title: string; category: ProductCategory; desc: string; icon: string }[] = [
    {
      title: 'Industrial & Smart Lighting',
      category: 'Light',
      desc: 'High-bay factory LED fixtures, waterproof floodlights & smart COB downlights',
      icon: '💡'
    },
    {
      title: 'Ventilation & BLDC Fans',
      category: 'Fan',
      desc: 'Heavy-duty factory exhaust blowers & energy-saving 32W BLDC ceiling fans',
      icon: '🌀'
    },
    {
      title: 'Smart Switch & Sockets',
      category: 'Switch & Socket',
      desc: 'Capacitive tempered glass touch switches & IP66 industrial waterproof socket boxes',
      icon: '🔌'
    },
    {
      title: 'Security & Access Locks',
      category: 'Security Lock',
      desc: 'Biometric multi-point digital locks & 600lbs electromagnetic emergency egress locks',
      icon: '🔐'
    }
  ];

  // Pick one representative product per featured category
  const featuredProducts = featuredCategories.map(cat => {
    return products.find(p => p.category === cat.category) || products[0];
  });

  const handleWhatsAppOrder = (product: Product) => {
    const deliveryFee = Math.max(140, Math.ceil(product.weightKg * 140));
    const totalEst = product.wholesalePriceBdt * product.moq + deliveryFee;
    const text = `Hello RUTA Engineering Wholesale Market, I want to order:\n` +
      `📦 Product: ${product.name} (${product.brand})\n` +
      `📊 Quantity: ${product.moq} units (Wholesale MOQ)\n` +
      `💰 Unit Wholesale Rate: ৳${product.wholesalePriceBdt} BDT\n` +
      `⚖️ Weight: ${(product.weightKg * product.moq).toFixed(1)} kg\n` +
      `🚚 Delivery Rate: ৳140/kg (Est: ৳${deliveryFee} BDT)\n` +
      `💵 Estimated Total: ৳${totalEst} BDT\n\n` +
      `Please confirm stock availability and payment instructions.`;
    
    window.open(`https://wa.me/8801730318552?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="automation-products-preview" className="py-20 bg-zinc-950 border-t border-zinc-900 relative overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Badge & Title */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 text-orange-500 rounded-md text-xs font-mono uppercase tracking-wider mb-3">
              <ShoppingBag className="w-3.5 h-3.5" />
              DIRECT FACTORY WHOLESALE MARKET // NATIONWIDE DISPATCH
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-white uppercase tracking-tight">
              Automation Hardware &amp; Electrical Products
            </h2>
            <p className="text-zinc-400 text-sm mt-2 max-w-2xl font-sans">
              Supplying industrial complexes, contractors, and smart buildings with genuine factory-direct electrical hardware. Order directly via WhatsApp at certified wholesale rates.
            </p>
          </div>

          {/* Delivery Tariff Badge & Open Store CTA */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="px-4 py-2 bg-black border border-orange-500/40 rounded-xl flex items-center gap-2 text-xs font-mono text-zinc-300">
              <Truck className="w-4 h-4 text-orange-500" />
              <span>Courier Delivery: <strong className="text-orange-400">৳140 / KG</strong> (All Bangladesh)</span>
            </div>

            <button
              onClick={() => onOpenStore()}
              className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-black font-display font-black text-xs uppercase tracking-widest rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-orange-500/10"
            >
              <span>Explore Wholesale Market</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 4 Featured Category Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCategories.map((cat, idx) => {
            const product = featuredProducts[idx];
            if (!product) return null;

            return (
              <div
                key={cat.category}
                className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 flex flex-col justify-between hover:border-orange-500/60 transition-all group"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-2xl">{cat.icon}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 bg-black border border-zinc-800 text-orange-500 rounded uppercase font-bold">
                      Wholesale Tier
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-white text-base uppercase tracking-tight group-hover:text-orange-400 transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-[11px] text-zinc-400 mt-1 line-clamp-2 font-sans mb-4">
                    {cat.desc}
                  </p>

                  {/* Product Thumbnail & Details */}
                  <div className="relative rounded-xl overflow-hidden mb-4 border border-zinc-800 bg-black aspect-video">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/80 backdrop-blur-sm rounded text-[10px] font-mono text-zinc-300 border border-zinc-800">
                      ⚖️ {product.weightKg} kg / unit
                    </div>
                  </div>

                  <h4 className="text-xs font-bold text-white line-clamp-1 mb-2 font-sans">
                    {product.name}
                  </h4>

                  {/* Wholesale Pricing Tag */}
                  <div className="p-3 bg-black/70 rounded-xl border border-zinc-800/80 mb-4">
                    <div className="flex items-baseline justify-between">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase">Wholesale Rate</span>
                      <span className="text-[10px] font-mono text-zinc-500 line-through">৳{product.retailPriceBdt}</span>
                    </div>
                    <div className="flex items-baseline justify-between mt-0.5">
                      <div className="text-lg font-mono font-black text-orange-500">
                        ৳{product.wholesalePriceBdt.toLocaleString('en-US')}
                        <span className="text-[10px] text-zinc-400 font-sans font-normal ml-1">/ unit</span>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                        MOQ: {product.moq} pcs
                      </span>
                    </div>
                  </div>

                  {/* Top specifications snippet */}
                  <ul className="space-y-1 mb-4">
                    {product.specifications.slice(0, 2).map((spec, sIdx) => (
                      <li key={sIdx} className="text-[11px] text-zinc-400 flex items-start gap-1.5 font-sans">
                        <Check className="w-3 h-3 text-orange-500 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Actions: Order via WhatsApp or Browse Category */}
                <div className="space-y-2 pt-3 border-t border-zinc-800">
                  <button
                    onClick={() => handleWhatsAppOrder(product)}
                    className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 text-black font-display font-black text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5 fill-black" />
                    <span>Order via WhatsApp</span>
                  </button>

                  <button
                    onClick={() => onOpenStore(cat.category)}
                    className="w-full py-2 bg-zinc-950 hover:bg-black text-zinc-300 hover:text-white border border-zinc-800 rounded-lg text-[11px] font-mono uppercase tracking-wider flex items-center justify-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>View More in {cat.category}</span>
                    <ArrowRight className="w-3 h-3 text-orange-500" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Wholesale Assurance Strip */}
        <div className="mt-10 p-5 bg-black border border-zinc-800 rounded-2xl flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-zinc-400">
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-orange-500" />
            <span>Direct Manufacturer Sourcing: Zero Middleman Markup • Genuine Warranty Included</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-zinc-300">Delivery: <strong>৳140/kg flat</strong></span>
            <button
              onClick={() => onOpenStore()}
              className="text-orange-500 hover:text-orange-400 font-bold uppercase underline cursor-pointer"
            >
              See All 7 Product Categories &rarr;
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
