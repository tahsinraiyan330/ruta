import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle2, Send, AlertCircle, FileText, SendHorizontal, Link2, UploadCloud, ChevronDown } from 'lucide-react';
import { Lead } from '../types';

interface ContactFormProps {
  onAddLead: (lead: Omit<Lead, 'id' | 'createdAt' | 'status'>) => void;
}

export default function ContactForm({ onAddLead }: ContactFormProps) {
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [projectType, setProjectType] = useState<any>('Home');
  const [sizeSqFt, setSizeSqFt] = useState<number>(30000);
  const [notes, setNotes] = useState('');
  const [uploadedFileLink, setUploadedFileLink] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !notes) {
      alert("Please fill in all mandatory fields (*).");
      return;
    }

    // Standard fee is derived based on 1 BDT/sq ft flat cost
    const estimatedCostBdt = sizeSqFt * 1.0;

    onAddLead({
      fullName,
      companyName: companyName || "Independent Elite Builder",
      email: email || "inquiry-form@client.com",
      phone,
      location: location || "Dhaka, Bangladesh",
      projectType,
      sizeSqFt,
      estimatedCostBdt,
      priority: sizeSqFt > 120000 ? 'High' : 'Medium',
      notes: uploadedFileLink 
        ? `${notes}\n[Attached Cloud File Link: ${uploadedFileLink}]`
        : `${notes}. (Submitted directly via Project Inquiry Form)`,
      uploadedFileLink: uploadedFileLink || undefined
    });

    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      // Reset form fields
      setFullName('');
      setCompanyName('');
      setEmail('');
      setPhone('');
      setLocation('');
      setNotes('');
      setUploadedFileLink('');
    }, 5000);
  };

  return (
    <section id="contact" className="py-24 bg-black text-white relative border-b border-zinc-800">
      <div className="absolute inset-0 blueprint-grid-dark opacity-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Block: Communication parameters */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <span className="px-3 py-1 bg-zinc-900 text-orange-500 text-xs font-mono uppercase tracking-wider rounded border border-zinc-800 inline-block mb-3">
                Principal Consultation Office
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tighter text-white font-display mb-4 leading-none">
                Safeguard Your Next Project
              </h2>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-sans">
                Secure uncompromised, zero-accident physical blueprint drafts (SLD, automation architecture, lightning protection, NFPA alarm routing matrix) directly with RUTA Engineering &amp; Automation, supervised by Engr. A. K. M. Rukon Uddin.
              </p>
            </div>

            {/* Direct coordinate links card list */}
            <div className="space-y-4 my-6">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-orange-500 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase font-mono text-zinc-550 text-zinc-500">Official Correspondence</h4>
                  <a href="mailto:rukonenger@gmail.com" className="block">
                    <p className="text-xs text-zinc-200 hover:text-orange-500 transition-colors">rukonenger@gmail.com</p>
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-orange-500 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase font-mono text-zinc-550 text-zinc-500">Corporate Phone Direct</h4>
                  <p className="text-xs text-zinc-200 hover:text-orange-500 transition-colors">+880 1730318552</p>
                  <p className="text-[10px] text-zinc-500 mt-0.5">Hours: Saturday - Thursday (9 AM - 6 PM BDT)</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-orange-500 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase font-mono text-zinc-550 text-zinc-500">Bureau Headquarter</h4>
                  <p className="text-xs text-zinc-200 hover:text-orange-500 transition-colors">Nuirani Shorok, Bottrish, Kishoreganj Sadar, Dhaka</p>
                </div>
              </div>
            </div>

            {/* Registration standard note */}
            <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
              <span className="text-[10px] font-mono tracking-wider text-orange-500 block mb-1 uppercase font-bold">REGISTRATION MEMORANDUM</span>
              <p className="text-[11px] text-zinc-400 leading-relaxed font-sans mt-1">
                Professional structural designs submitted carry full official seal of the Institution of Engineers, Bangladesh (IEB), and are guaranteed to clear all regulatory inspects.
              </p>
            </div>
          </div>

          {/* Right Block: Main inquiry submissions sheet */}
          <div className="lg:col-span-8 bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8">
            <h3 className="text-xl font-display font-medium text-white mb-6 flex items-center gap-2 uppercase tracking-wide">
              <FileText className="w-5 h-5 text-orange-500" />
              Comprehensive Project Inquiry
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-500 mb-1.5 font-bold">Authorized Sponsor Name *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Engr. Jahirul Islam"
                    className="w-full px-4 py-2.5 bg-black border border-zinc-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500 font-sans text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-500 mb-1.5 font-bold">Company Name / Estate title</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Nasir Glass Industries Group"
                    className="w-full px-4 py-2.5 bg-black border border-zinc-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500 font-sans text-sm text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-500 mb-1.5 font-bold">E-Mail Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="client@corporate-domain.com"
                    className="w-full px-4 py-2.5 bg-black border border-zinc-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500 font-sans text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-500 mb-1.5 font-bold">Contact Call Number *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +880 1711-xxxxxx"
                    className="w-full px-4 py-2.5 bg-black border border-zinc-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500 font-mono text-sm text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="sm:col-span-1">
                  <label className="block text-xs font-mono uppercase text-zinc-500 mb-1.5 font-bold">Project Physical Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Gazipur Bypass, Dhaka"
                    className="w-full px-4 py-2.5 bg-black border border-zinc-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500 font-sans text-sm text-white"
                  />
                </div>
                <div className="sm:col-span-1">
                  <label className="block text-xs font-mono uppercase text-zinc-500 mb-1.5 font-bold">Primary Design Focus</label>
                  <div className="relative">
                    <select
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value as any)}
                      className="w-full px-4 py-2.5 pr-10 bg-black border border-zinc-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500 font-sans text-sm text-white appearance-none cursor-pointer"
                    >
                      <option value="Home">Home</option>
                      <option value="Industrial Substation">Industrial Substation Layout</option>
                      <option value="Industrial Factory Grid">Industrial Factory Distribution Grid</option>
                      <option value="Commercial Complex">Commercial Multi-tenant Tower</option>
                      <option value="High-End Residential">Elite Residential Villa / Block</option>
                      <option value="Fire Safety & Detection Grid">NFPA-compliant Firealarm network</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-orange-500">
                      <ChevronDown className="w-4 h-4 text-orange-500/90" />
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-1">
                  <label className="block text-xs font-mono uppercase text-zinc-500 mb-1.5 font-bold">Covered Size Area (Sq.Ft) *</label>
                  <input
                    type="number"
                    required
                    value={sizeSqFt}
                    onChange={(e) => setSizeSqFt(Math.max(100, parseInt(e.target.value) || 0))}
                    className="w-full px-4 py-2.5 bg-black border border-zinc-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500 font-mono text-sm text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-zinc-500 mb-1.5 font-bold">Detailed Scope Requirements &amp; Loads *</label>
                <textarea
                  rows={4}
                  required
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Specify machine counts, substation needs, single line diagrams (SLD) validation requests, and estimated timeline goals."
                  className="w-full px-4 py-2.5 bg-black border border-zinc-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500 font-sans text-sm text-white"
                ></textarea>
              </div>

              {/* Uploaded File Link Section (Google Drive / CAD / Design drawings) */}
              <div className="p-4 sm:p-5 bg-black/70 border border-zinc-800 rounded-2xl space-y-2.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <label className="text-xs font-mono uppercase text-orange-500 font-bold flex items-center gap-1.5">
                    <Link2 className="w-4 h-4 text-orange-500" />
                    Uploaded File Link (Google Drive / Cloud Share)
                  </label>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">CAD • DWG • PDF • ZIP</span>
                </div>
                <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">
                  Provide your shareable cloud file link (Google Drive, Dropbox, OneDrive, or WeTransfer) for existing architectural plans, CAD layouts, or single line diagrams.
                </p>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                    <UploadCloud className="w-4 h-4 text-orange-500/80" />
                  </div>
                  <input
                    type="url"
                    value={uploadedFileLink}
                    onChange={(e) => setUploadedFileLink(e.target.value)}
                    placeholder="https://drive.google.com/drive/folders/... or https://dropbox.com/..."
                    className="w-full pl-10 pr-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500 font-mono text-xs text-zinc-200 placeholder:text-zinc-600"
                  />
                </div>
                {uploadedFileLink && (
                  <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400 pt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>Cloud link registered. Will be routed directly to Engr. Rukon's engineering review desk.</span>
                  </div>
                )}
              </div>

              {success ? (
                <div className="p-4 bg-zinc-950 border border-orange-500 text-orange-400 font-mono uppercase tracking-wider font-bold rounded-xl text-center flex items-center justify-center gap-2 text-xs animate-pulse">
                  <CheckCircle2 className="w-5 h-5 text-orange-500" />
                  Your design inquiry has been saved! RUTA Engineering &amp; Automation's active CRM workspace is successfully synchronized.
                </div>
              ) : (
                <button
                  type="submit"
                  className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-black font-display font-black uppercase tracking-widest text-xs rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <SendHorizontal className="w-4 h-4" />
                  Transmit Design Order to Scheduler Dashboard
                </button>
              )}
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
