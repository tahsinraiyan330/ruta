import { useState, useEffect } from 'react';
import { Lead, LeadStatus, Product, ProductCategory, StoreOrder, OrderStatus } from './types';
import { initialLeads } from './data';
import { initialProducts, initialStoreOrders } from './storeData';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HomeAutomationProducts from './components/HomeAutomationProducts';
import WholesaleMarketPage from './components/WholesaleMarketPage';
import SLDVisualizer from './components/SLDVisualizer';
import EngineeringToolkit from './components/EngineeringToolkit';
import AutomationCapabilities from './components/AutomationCapabilities';
import AuditChecklist from './components/AuditChecklist';
import LossVisualizer from './components/LossVisualizer';
import QuoteCalculator from './components/QuoteCalculator';
import ContactForm from './components/ContactForm';
import CRMDesk from './components/CRMDesk';
import QuickActionBar from './components/QuickActionBar';
import Footer from './components/Footer';
import AdminAuthModal from './components/AdminAuthModal';
import { Sparkles, X } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'store' | 'crm'>('home');
  const [selectedCategoryForStore, setSelectedCategoryForStore] = useState<ProductCategory | 'All'>('All');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<StoreOrder[]>([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notifMessage, setNotifMessage] = useState('');

  // Security: Admin authentication & Ephemeral session state
  const [isAdminAuthModalOpen, setIsAdminAuthModalOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      const stored = sessionStorage.getItem('rukon_admin_auth_session');
      if (stored) {
        const parsed = JSON.parse(stored);
        // Valid for 4 hours (14,400,000 ms)
        if (parsed.authenticated && Date.now() - parsed.timestamp < 14400000) {
          return true;
        }
      }
    } catch (e) {
      // Fallback
    }
    return false;
  });

  // Initial load from LocalStorage or fall back to pre-populated mock leads, products, and orders
  useEffect(() => {
    // 1. Leads
    const savedLeads = localStorage.getItem('rukon_crm_leads');
    if (savedLeads) {
      try {
        setLeads(JSON.parse(savedLeads));
      } catch (e) {
        setLeads(initialLeads);
      }
    } else {
      setLeads(initialLeads);
      localStorage.setItem('rukon_crm_leads', JSON.stringify(initialLeads));
    }

    // 2. Store Products
    const savedProducts = localStorage.getItem('rukon_store_products');
    if (savedProducts) {
      try {
        setProducts(JSON.parse(savedProducts));
      } catch (e) {
        setProducts(initialProducts);
      }
    } else {
      setProducts(initialProducts);
      localStorage.setItem('rukon_store_products', JSON.stringify(initialProducts));
    }

    // 3. Store Orders
    const savedOrders = localStorage.getItem('rukon_store_orders');
    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders));
      } catch (e) {
        setOrders(initialStoreOrders);
      }
    } else {
      setOrders(initialStoreOrders);
      localStorage.setItem('rukon_store_orders', JSON.stringify(initialStoreOrders));
    }
  }, []);

  // Sync leads back to LocalStorage
  const saveLeadsToStorage = (updatedLeads: Lead[]) => {
    setLeads(updatedLeads);
    localStorage.setItem('rukon_crm_leads', JSON.stringify(updatedLeads));
  };

  // Sync products back to LocalStorage
  const saveProductsToStorage = (updatedProducts: Product[]) => {
    setProducts(updatedProducts);
    localStorage.setItem('rukon_store_products', JSON.stringify(updatedProducts));
  };

  // Sync orders back to LocalStorage
  const saveOrdersToStorage = (updatedOrders: StoreOrder[]) => {
    setOrders(updatedOrders);
    localStorage.setItem('rukon_store_orders', JSON.stringify(updatedOrders));
  };

  // Add a new lead from calculated quote or the inquiry form
  const handleAddLead = (newLeadData: Omit<Lead, 'id' | 'createdAt' | 'status'>) => {
    const freshLead: Lead = {
      ...newLeadData,
      id: `lead-${Date.now()}`,
      status: 'New Inquiry',
      createdAt: new Date().toISOString()
    };

    const updated = [freshLead, ...leads];
    saveLeadsToStorage(updated);

    // Render screen toast notifications on new submission
    setNotifMessage(`New Inquiry submitted successfully! Lead: ${freshLead.fullName} (${freshLead.companyName}). Added to Pipeline.`);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 7000);
  };

  // Change lead status in CRM pipeline
  const handleUpdateLeadStatus = (id: string, newStatus: LeadStatus) => {
    const updated = leads.map(l => {
      if (l.id === id) {
        let scheduledTask = l.scheduledTask;
        let scheduleDate = l.scheduleDate;
        if (newStatus === 'Site Visit Scheduled' && !l.scheduleDate) {
          scheduleDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
          scheduledTask = `Site survey & sensor count audit - ${l.location}`;
        }
        return { ...l, status: newStatus, scheduleDate, scheduledTask };
      }
      return l;
    });
    saveLeadsToStorage(updated);
  };

  // Delete lead
  const handleDeleteLead = (id: string) => {
    const updated = leads.filter(l => l.id !== id);
    saveLeadsToStorage(updated);
  };

  // Add custom lead directly in the CRM window
  const handleAddCustomLead = (customLead: Omit<Lead, 'id' | 'createdAt'>) => {
    const freshLead: Lead = {
      ...customLead,
      id: `lead-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    const updated = [freshLead, ...leads];
    saveLeadsToStorage(updated);
  };

  // --- PRODUCT MANAGEMENT HANDLERS (Admin CRUD) ---
  const handleAddProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}`
    };
    const updated = [newProduct, ...products];
    saveProductsToStorage(updated);
    setNotifMessage(`New product "${newProduct.name}" added to Wholesale Market catalog!`);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 5000);
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    const updated = products.map(p => p.id === updatedProduct.id ? updatedProduct : p);
    saveProductsToStorage(updated);
    setNotifMessage(`Product "${updatedProduct.name}" updated successfully.`);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 5000);
  };

  const handleDeleteProduct = (productId: string) => {
    const target = products.find(p => p.id === productId);
    const updated = products.filter(p => p.id !== productId);
    saveProductsToStorage(updated);
    setNotifMessage(`Product ${target ? `"${target.name}"` : ''} deleted from store catalog.`);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 5000);
  };

  // --- ORDER MANAGEMENT HANDLERS (Place, Confirm, Delete) ---
  const handlePlaceOrder = (order: StoreOrder) => {
    const updated = [order, ...orders];
    saveOrdersToStorage(updated);
    setNotifMessage(`Order #${order.id} placed for ${order.customerName}! ৳${order.totalAmountBdt.toLocaleString()} BDT.`);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 6000);
  };

  const handleUpdateOrderStatus = (orderId: string, status: OrderStatus) => {
    const updated = orders.map(o => o.id === orderId ? { ...o, status } : o);
    saveOrdersToStorage(updated);
    setNotifMessage(`Order #${orderId} status updated to: ${status}.`);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 5000);
  };

  const handleDeleteOrder = (orderId: string) => {
    const updated = orders.filter(o => o.id !== orderId);
    saveOrdersToStorage(updated);
    setNotifMessage(`Order #${orderId} record deleted.`);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 4000);
  };

  // Open store with pre-selected category
  const handleOpenStore = (cat?: ProductCategory) => {
    setSelectedCategoryForStore(cat || 'All');
    setCurrentView('store');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Admin Authentication security handlers
  const handleAdminAuthSuccess = () => {
    try {
      sessionStorage.setItem(
        'rukon_admin_auth_session',
        JSON.stringify({
          authenticated: true,
          timestamp: Date.now(),
          scope: 'admin_executive'
        })
      );
    } catch (e) {
      // Storage available
    }
    setIsAdminAuthenticated(true);
    setIsAdminAuthModalOpen(false);
    setCurrentView('crm');
    setNotifMessage('Level 4 clearance verified. Administrator session active.');
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 4000);
  };

  const handleAdminLogout = () => {
    try {
      sessionStorage.removeItem('rukon_admin_auth_session');
    } catch (e) {
      // Storage available
    }
    setIsAdminAuthenticated(false);
    setIsAdminAuthModalOpen(false);
    setCurrentView('home');
    setNotifMessage('Admin session securely locked. Credentials purged from memory.');
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 4000);
  };

  const handleOpenAdminLogin = () => {
    setIsAdminAuthModalOpen(true);
  };

  // Safe scrolling handlers
  const scrollToSection = (id: string) => {
    setCurrentView('home');
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col justify-between selection:bg-orange-500 selection:text-black">
      
      {/* Visual Navigation Header */}
      <Navbar 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
        leadsCount={leads.length}
        ordersCount={orders.length}
        isAdminAuthenticated={isAdminAuthenticated}
        onOpenAdminLogin={handleOpenAdminLogin}
        onAdminLogout={handleAdminLogout}
      />

      {/* Screen Notifications Toast */}
      {showNotification && (
        <div className="fixed top-20 right-4 sm:right-6 z-50 max-w-sm sm:max-w-md bg-zinc-900 border-2 border-orange-500 p-4 rounded-2xl shadow-2xl flex items-start gap-3 text-white transition-all transform">
          <div className="p-2 bg-orange-500 rounded-full text-black">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <h4 className="text-xs font-mono font-black tracking-wider text-orange-500 uppercase">SYS_UPDATE // Live Event</h4>
            <p className="text-xs text-zinc-300 mt-1 leading-snug">{notifMessage}</p>
          </div>
          <button 
            onClick={() => setShowNotification(false)}
            className="text-zinc-400 hover:text-orange-500 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Floating Admin Passkey Authentication Dialog */}
      <AdminAuthModal
        isOpen={isAdminAuthModalOpen}
        onClose={() => setIsAdminAuthModalOpen(false)}
        onSuccess={handleAdminAuthSuccess}
      />

      {/* Main Container Switch with Strict Zero-Data Leakage Route Shield */}
      {currentView === 'crm' ? (
        isAdminAuthenticated ? (
          <CRMDesk 
            leads={leads} 
            onUpdateLeadStatus={handleUpdateLeadStatus} 
            onDeleteLead={handleDeleteLead}
            onAddCustomLead={handleAddCustomLead}
            products={products}
            orders={orders}
            onAddProduct={handleAddProduct}
            onUpdateProduct={handleUpdateProduct}
            onDeleteProduct={handleDeleteProduct}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onDeleteOrder={handleDeleteOrder}
            onAdminLogout={handleAdminLogout}
          />
        ) : (
          <AdminAuthModal
            isOpen={true}
            inlineGateway={true}
            onClose={() => setCurrentView('home')}
            onSuccess={handleAdminAuthSuccess}
          />
        )
      ) : currentView === 'store' ? (
        <WholesaleMarketPage 
          products={products}
          onPlaceOrder={handlePlaceOrder}
          onBackToHome={() => setCurrentView('home')}
          initialCategory={selectedCategoryForStore}
        />
      ) : (
        <main id="main-content" className="flex-1">
          {/* Engineering Banner Portfolio Page */}
          <Hero 
            onQuoteClick={() => scrollToSection('quote-calc')} 
            onInquiryClick={() => scrollToSection('contact')} 
          />

          {/* User Request: Automation Products section with 4 featured categories placed BEFORE SLD Visualizer */}
          <HomeAutomationProducts 
            products={products}
            onOpenStore={handleOpenStore}
          />

          {/* Interactive Single Line Diagram (SLD) & Automation Schematic Simulator */}
          <SLDVisualizer />

          {/* Real-World Engineering Utility Suite (Cable, Transformer, PFI Calculators) */}
          <EngineeringToolkit />

          {/* Industrial Automation & SCADA Solutions Division */}
          <AutomationCapabilities />

          {/* Certified Engineering Blueprint & Risk Defense */}
          <LossVisualizer />

          {/* Factory Safety & Pre-Audit Compliance Matrix (Accord/RSC/DIFE) */}
          <AuditChecklist />

          {/* Pricing Catalog & Live Quote Calculator */}
          <QuoteCalculator onAddLead={handleAddLead} />

          {/* Secure Transmission Contact Desk */}
          <ContactForm onAddLead={handleAddLead} />

          {/* Floating Emergency & WhatsApp Direct Bar */}
          <QuickActionBar />
        </main>
      )}

      {/* Global Authoritative Footer */}
      <Footer />
      
    </div>
  );
}
