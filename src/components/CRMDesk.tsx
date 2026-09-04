import { useState } from 'react';
import { Lead, LeadStatus, Product, StoreOrder, OrderStatus } from '../types';
import { 
  Database, UserCheck, ShieldAlert, Phone, Mail, MapPin, Ruler, CheckCircle, 
  Search, RefreshCw, Calendar, Clock, Eye, AlertCircle, TrendingUp, Plus, Trash2, ArrowUpRight,
  ShoppingBag, Building2, Lock
} from 'lucide-react';
import rutaLogo from '../assets/images/ruta_logo_1788542472103.jpg';
import AdminStoreManager from './AdminStoreManager';

interface CRMDeskProps {
  leads: Lead[];
  onUpdateLeadStatus: (id: string, newStatus: LeadStatus) => void;
  onDeleteLead: (id: string) => void;
  onAddCustomLead: (lead: Omit<Lead, 'id' | 'createdAt'>) => void;
  // Wholesale Market Store management props
  products: Product[];
  orders: StoreOrder[];
  onAddProduct: (product: Omit<Product, 'id'>) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onUpdateOrderStatus: (orderId: string, status: OrderStatus) => void;
  onDeleteOrder: (orderId: string) => void;
  defaultAdminSection?: 'leads' | 'store';
  onAdminLogout?: () => void;
}

export default function CRMDesk({ 
  leads, 
  onUpdateLeadStatus, 
  onDeleteLead, 
  onAddCustomLead,
  products,
  orders,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onUpdateOrderStatus,
  onDeleteOrder,
  defaultAdminSection = 'leads',
  onAdminLogout
}: CRMDeskProps) {
  const [adminSection, setAdminSection] = useState<'leads' | 'store'>(defaultAdminSection);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(leads[0] || null);

  // Stats calculators
  const totalLeads = leads.length;
  const projectInDesign = leads.filter(l => l.status === 'Design Phase').length;
  const deliveredCompletions = leads.filter(l => l.status === 'Delivered').length;
  const totalContractPipelineValue = leads.reduce((sum, lead) => sum + lead.estimatedCostBdt, 0);

  // Status option lists
  const statusOptions: LeadStatus[] = [
    'New Inquiry',
    'In Consultation',
    'Quote Generated',
    'Site Visit Scheduled',
    'Design Phase',
    'Review & Approval',
    'Delivered'
  ];

  // Filtering Logic
  const filteredLeads = leads.filter(l => {
    const matchesSearch = 
      l.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      l.companyName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      l.notes.toLowerCase().includes(searchTerm.toLowerCase()) || 
      l.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || l.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <main className="min-h-screen bg-zinc-950 text-white py-10 relative">
      <div className="absolute inset-0 blueprint-grid-dark opacity-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* CRM Dashboard Banner */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pb-6 border-b border-zinc-800">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 flex items-center justify-center shrink-0 shadow-md hidden sm:flex">
              <img
                src={rutaLogo}
                alt="RUTA Engineering &amp; Automation Logo"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-900 border border-zinc-800 text-orange-500 text-xs font-mono uppercase tracking-wider rounded-md mb-2">
                <Database className="w-3.5 h-3.5" />
                RUTA Engineering &amp; Automation Workspace
              </div>
              <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter text-white font-display leading-none">
                Enterprise Lead CRM &amp; Project Scheduler
              </h1>
            </div>
          </div>

          {/* Core financial pipeline summary */}
          <div className="flex flex-col sm:flex-row gap-4 bg-black p-4 border border-zinc-800 rounded-xl">
            <div>
              <div className="text-[10px] font-mono text-zinc-550 uppercase">National Pipeline Value</div>
              <div className="text-2xl font-display font-black text-orange-500">
                Tk {totalContractPipelineValue.toLocaleString()} BDT
              </div>
            </div>
            <div className="sm:border-l sm:border-zinc-800 sm:pl-4">
              <div className="text-[10px] font-mono text-zinc-550 uppercase">Design Pipeline Capacity</div>
              <div className="text-md text-zinc-300 font-bold mt-1">
                {totalLeads} Projects Recorded
              </div>
            </div>
          </div>
        </div>

        {/* Master Admin Section Switcher Bar & Lock Session Button */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 p-1.5 bg-zinc-900 border border-zinc-800 rounded-2xl">
            <button
              onClick={() => setAdminSection('leads')}
              className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                adminSection === 'leads'
                  ? 'bg-orange-500 text-black font-bold shadow-md shadow-orange-500/20'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Blueprint Leads ({leads.length})</span>
            </button>

            <button
              onClick={() => setAdminSection('store')}
              className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                adminSection === 'store'
                  ? 'bg-orange-500 text-black font-bold shadow-md shadow-orange-500/20'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Wholesale Market &amp; Orders ({orders.length})</span>
              <span className="px-1.5 py-0.5 bg-black/60 rounded text-[10px] font-mono text-orange-400 border border-zinc-800">
                {products.length} Products
              </span>
            </button>
          </div>

          {onAdminLogout && (
            <button
              onClick={onAdminLogout}
              className="flex items-center gap-2 px-4 py-2.5 bg-red-950/40 hover:bg-red-900/60 text-red-400 hover:text-red-300 border border-red-900/80 rounded-xl text-xs font-mono uppercase tracking-wider font-bold transition-all cursor-pointer shadow-md"
              title="Lock admin session and purge credentials"
            >
              <Lock className="w-4 h-4 text-red-400" />
              <span>Lock Admin Session</span>
            </button>
          )}
        </div>

        {/* Dynamic Admin View */}
        {adminSection === 'store' ? (
          <AdminStoreManager
            products={products}
            orders={orders}
            onAddProduct={onAddProduct}
            onUpdateProduct={onUpdateProduct}
            onDeleteProduct={onDeleteProduct}
            onUpdateOrderStatus={onUpdateOrderStatus}
            onDeleteOrder={onDeleteOrder}
          />
        ) : (
          <>
            {/* Action Widgets Indicators Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-zinc-900 p-4 border border-zinc-800 rounded-xl">
            <div className="text-[10px] font-mono text-zinc-500 uppercase mb-1">New Incoming Orders</div>
            <div className="text-xl font-display font-black text-white">
              {leads.filter(l => l.status === 'New Inquiry').length} leads
            </div>
            <p className="text-[10px] text-zinc-400 leading-snug mt-1.5 font-sans">Waiting for initial consultation review.</p>
          </div>
          <div className="bg-zinc-900 p-4 border border-zinc-800 rounded-xl">
            <div className="text-[10px] font-mono text-zinc-500 uppercase mb-1">Active Site Surveys</div>
            <div className="text-xl font-display font-black text-orange-500">
              {leads.filter(l => l.status === 'Site Visit Scheduled').length} Pending
            </div>
            <p className="text-[10px] text-zinc-400 leading-snug mt-1.5 font-sans">Survey scheduling slots in Gazipur &amp; Chittagong.</p>
          </div>
          <div className="bg-zinc-900 p-4 border border-zinc-800 rounded-xl">
            <div className="text-[10px] font-mono text-zinc-500 uppercase mb-1">Under Blueprint Draft</div>
            <div className="text-xl font-display font-black text-orange-500">
              {projectInDesign} Factories
            </div>
            <p className="text-[10px] text-zinc-400 leading-snug mt-1.5 font-sans">CAD structures, single line analysis phase.</p>
          </div>
          <div className="bg-zinc-900 p-4 border border-zinc-800 rounded-xl">
            <div className="text-[10px] font-mono text-zinc-500 uppercase mb-1">Delivered Compliance Blueprints</div>
            <div className="text-xl font-display font-black text-orange-400">
              {deliveredCompletions} Approved
            </div>
            <p className="text-[10px] text-zinc-400 leading-snug mt-1.5 font-sans">Archived designs certified by IEB standards.</p>
          </div>
        </div>

        {/* Main Work Splitter: Pipeline Workspace and Site Schedules */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-10">
          
          {/* Left Column: Pipelines List (Col-span 7) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              
              {/* Search & Filter widgets bar */}
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-6 pb-6 border-b border-zinc-800">
                <div className="w-full sm:w-80 relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                    <Search className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    placeholder="Search by company, name, location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-black border border-zinc-800 rounded-lg text-xs leading-none focus:outline-none focus:ring-1 focus:ring-orange-500 text-white font-mono"
                  />
                </div>
                <div className="flex gap-2 items-center w-full sm:w-auto">
                  <span className="text-xs text-zinc-400 shrink-0 font-mono">Stage:</span>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full sm:w-auto px-3 py-2 bg-black border border-zinc-800 rounded-lg text-xs text-zinc-350 focus:outline-none"
                  >
                    <option value="All">All Pipelines</option>
                    {statusOptions.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Table List of leads */}
              {filteredLeads.length === 0 ? (
                <div className="text-center py-16 text-zinc-500 border border-dashed border-zinc-800 rounded-xl">
                  <AlertCircle className="w-10 h-10 text-zinc-650 mx-auto mb-3" />
                  <p className="text-sm font-sans mb-1 font-bold uppercase tracking-wider">No matched leads or submissions found</p>
                  <p className="text-xs text-zinc-400">Modify your search filters or submit a new quote calculator query.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-sans">
                    <thead>
                      <tr className="border-b border-zinc-800 text-zinc-500 font-mono uppercase text-[10px]">
                        <th className="py-3 px-4">Sponsor &amp; Agency / Complex</th>
                        <th className="py-3 px-4">Service Category</th>
                        <th className="py-3 px-4">Size (Sq.Ft)</th>
                        <th className="py-3 px-4">Design Fee</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Utility</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-850">
                      {filteredLeads.map((lead) => {
                        const isSelected = selectedLead?.id === lead.id;
                        return (
                          <tr 
                            key={lead.id} 
                            onClick={() => setSelectedLead(lead)}
                            className={`hover:bg-zinc-850 cursor-pointer transition-all ${
                              isSelected ? 'bg-black border-l-2 border-l-orange-500' : ''
                            }`}
                          >
                            <td className="py-3.5 px-4">
                              <div className="font-display font-black text-white uppercase tracking-tight text-sm">{lead.fullName}</div>
                              <div className="text-[10px] text-zinc-500 leading-snug">{lead.companyName}</div>
                            </td>
                            <td className="py-3.5 px-4 text-zinc-300 font-medium">
                              {lead.projectType}
                            </td>
                            <td className="py-3.5 px-4 font-mono text-[11px] text-zinc-400">
                              {lead.sizeSqFt.toLocaleString()} sq ft
                            </td>
                            <td className="py-3.5 px-4 font-mono font-black text-orange-500">
                              Tk {lead.estimatedCostBdt.toLocaleString()}
                            </td>
                            <td className="py-3.5 px-4">
                              <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-black uppercase ${
                                lead.status === 'Delivered' 
                                  ? 'bg-orange-500 text-black border border-orange-500'
                                  : lead.status === 'Design Phase'
                                  ? 'bg-zinc-850 text-orange-500 border border-zinc-800'
                                  : lead.status === 'Site Visit Scheduled'
                                  ? 'bg-red-950 text-red-500 border border-red-800'
                                  : 'bg-black text-zinc-400 border border-zinc-800'
                              }`}>
                                {lead.status}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onDeleteLead(lead.id);
                                  if (selectedLead?.id === lead.id) {
                                    setSelectedLead(null);
                                  }
                                }}
                                className="text-zinc-500 hover:text-red-500 p-1.5 rounded transition-colors cursor-pointer"
                                title="Remove Lead Logs"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}

            </div>

            {/* Project Agenda list (Scheduling board) */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <h3 className="text-md font-display font-medium text-white mb-4 flex items-center gap-1.5 uppercase tracking-wide">
                <Calendar className="w-4 h-4 text-orange-500" />
                Engineering Site Agenda Calendar &amp; Task Tracker
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {leads.filter(l => l.scheduleDate).map((lead) => (
                  <div key={lead.id} className="p-4 bg-black border border-zinc-800 rounded-xl space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] uppercase font-mono font-bold text-orange-500 flex items-center gap-1">
                        <Clock className="w-3" />
                        {lead.scheduleDate}
                      </span>
                      <span className="text-[9px] font-mono bg-zinc-900 text-zinc-400 border border-zinc-800 px-1.5 rounded uppercase">
                        {lead.status}
                      </span>
                    </div>
                    <h4 className="text-xs font-display font-black uppercase text-white line-clamp-1">{lead.scheduledTask}</h4>
                    <p className="text-[11px] text-zinc-400 leading-snug font-sans">
                      <strong>Target Complex:</strong> {lead.companyName} at {lead.location}
                    </p>
                    <p className="text-[11px] text-zinc-550 text-zinc-500 italic mt-1 pb-1 font-sans">
                      Contact: {lead.phone}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Lead Admin Inspector Sheet (Col-span 5) */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            {selectedLead ? (
              <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl space-y-5">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-md font-display font-bold text-white uppercase tracking-tight">Lead Workspace</h3>
                    <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mt-0.5">Record ID: {selectedLead.id.substring(0, 8)}...</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold tracking-tight ${
                    selectedLead.priority === 'High' 
                      ? 'bg-red-950 text-red-500 border border-red-800'
                      : 'bg-black text-zinc-400 border border-zinc-850'
                  }`}>
                    {selectedLead.priority} Priority
                  </span>
                </div>

                {/* Main coordinates */}
                <div className="bg-black p-4 border border-zinc-800 rounded-xl space-y-3">
                  <div className="flex items-start gap-2.5 text-xs text-zinc-300 font-sans">
                    <UserCheck className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-extrabold text-white text-sm uppercase">{selectedLead.fullName}</div>
                      <div className="text-[11px] text-zinc-400 font-mono mt-0.5">{selectedLead.companyName}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-zinc-300 font-mono">
                    <Phone className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                    <span>{selectedLead.phone}</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-zinc-300 font-sans">
                    <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                    <span>{selectedLead.location}</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-zinc-300 font-mono">
                    <Ruler className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                    <span>{selectedLead.sizeSqFt.toLocaleString()} SQFT Covered</span>
                  </div>
                </div>

                {/* Substantive comments logs */}
                <div className="space-y-1.5">
                  <h4 className="text-[10px] font-mono text-zinc-500 uppercase">Consulting Notes logs</h4>
                  <div className="p-3.5 bg-black border border-zinc-800 rounded-xl text-xs text-zinc-300 min-h-20 leading-relaxed font-sans">
                    {selectedLead.notes}
                  </div>
                </div>

                {/* Attached CAD / Design Cloud Link */}
                {selectedLead.uploadedFileLink && (
                  <div className="space-y-1.5">
                    <h4 className="text-[10px] font-mono text-orange-500 uppercase font-bold flex items-center gap-1">
                      <ArrowUpRight className="w-3.5 h-3.5 text-orange-500" />
                      Client CAD / Cloud File Link
                    </h4>
                    <a
                      href={selectedLead.uploadedFileLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-black border border-orange-500/40 hover:border-orange-500 rounded-xl text-xs text-orange-400 hover:text-orange-300 flex items-center justify-between transition-colors group"
                    >
                      <span className="truncate max-w-[220px] font-mono text-[11px]">{selectedLead.uploadedFileLink}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-orange-500" />
                    </a>
                  </div>
                )}

                {/* Action parameters: Transition status */}
                <div className="space-y-2.5 pt-4 border-t border-zinc-800">
                  <label className="block text-[10px] font-mono text-zinc-500 uppercase font-black">Shift Pipeline Stage</label>
                  <div className="grid grid-cols-2 gap-2">
                    {statusOptions.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => {
                          onUpdateLeadStatus(selectedLead.id, opt);
                          setSelectedLead(prev => prev ? { ...prev, status: opt } : null);
                        }}
                        className={`py-2 px-2.5 rounded text-[10px] font-black tracking-wide text-center uppercase cursor-pointer transition-all ${
                          selectedLead.status === opt
                            ? 'bg-orange-500 text-black font-black'
                            : 'bg-black border border-zinc-800 text-zinc-500 hover:text-white hover:bg-zinc-850'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-orange-500/10 p-3.5 border border-orange-500/30 rounded-xl text-[11px] leading-relaxed text-zinc-300 font-mono uppercase">
                  <strong className="text-orange-500">Standard rate flat quote:</strong> SQFT ({selectedLead.sizeSqFt.toLocaleString()}) * 1 BDT = Tk {selectedLead.estimatedCostBdt.toLocaleString()} BDT total design scope.
                </div>

              </div>
            ) : (
              <div className="bg-zinc-900 p-8 border border-zinc-800 rounded-2xl text-center text-zinc-500 uppercase tracking-wider font-mono text-xs">
                <p>Select a lead from the pipeline list to begin auditing blueprints and schedules.</p>
              </div>
            )}
          </div>

        </div>
        </>
        )}

      </div>
    </main>
  );
}
