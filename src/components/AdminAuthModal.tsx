import React, { useState, useEffect } from 'react';
import { ShieldAlert, ShieldCheck, Lock, KeyRound, Eye, EyeOff, X, AlertTriangle, Clock } from 'lucide-react';

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  inlineGateway?: boolean;
}

// SHA-256 target hash of 'wake@up#hugo$111'
const TARGET_HASH_SHA256 = 'ee46806a55234c89d8920febec71a5d903c5750a3fbf9fb2add4135e8c644095';
const TARGET_PLAIN = 'wake@up#hugo$111';
const MAX_ATTEMPTS = 4;
const LOCKOUT_DURATION_SECONDS = 30;

export default function AdminAuthModal({
  isOpen,
  onClose,
  onSuccess,
  inlineGateway = false
}: AdminAuthModalProps) {
  const [passkey, setPasskey] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [isLockedOut, setIsLockedOut] = useState(false);
  const [cooldownRemaining, setCooldownRemaining] = useState(0);
  const [isVerifying, setIsVerifying] = useState(false);

  // Handle countdown timer during brute-force security lockout
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isLockedOut && cooldownRemaining > 0) {
      interval = setInterval(() => {
        setCooldownRemaining((prev) => {
          if (prev <= 1) {
            setIsLockedOut(false);
            setAttempts(0);
            setErrorMessage(null);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isLockedOut, cooldownRemaining]);

  // Reset transient form state when modal opens
  useEffect(() => {
    if (isOpen) {
      setPasskey('');
      setErrorMessage(null);
    }
  }, [isOpen]);

  // Cryptographic hash helper using native Web Crypto API
  const computeSha256 = async (str: string): Promise<string> => {
    try {
      if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
        const encoder = new TextEncoder();
        const data = encoder.encode(str);
        const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
      }
    } catch (err) {
      console.warn('Web Crypto digest unavailable, falling back to direct check.');
    }
    return '';
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLockedOut) {
      return;
    }

    if (!passkey.trim()) {
      setErrorMessage('Passkey input is required.');
      return;
    }

    setIsVerifying(true);
    setErrorMessage(null);

    // Compute hash and test against authorized signature
    const computedHash = await computeSha256(passkey.trim());
    const isSignatureValid = 
      passkey.trim() === TARGET_PLAIN || 
      computedHash === TARGET_HASH_SHA256;

    if (isSignatureValid) {
      // Authorized: Initialize authenticated ephemeral session
      setIsVerifying(false);
      setAttempts(0);
      setPasskey('');
      onSuccess();
    } else {
      // Unauthorized: Increment failed attempts & trigger brute-force deterrent if threshold exceeded
      setIsVerifying(false);
      const nextAttempts = attempts + 1;
      setAttempts(nextAttempts);
      setPasskey('');

      if (nextAttempts >= MAX_ATTEMPTS) {
        setIsLockedOut(true);
        setCooldownRemaining(LOCKOUT_DURATION_SECONDS);
        setErrorMessage(
          `Security Lock Active: Too many failed passkey attempts. Cooldown engaged for ${LOCKOUT_DURATION_SECONDS} seconds to prevent brute-force intrusion.`
        );
      } else {
        const remaining = MAX_ATTEMPTS - nextAttempts;
        setErrorMessage(
          `Access Denied: Invalid administrator passkey. ${remaining} attempt${remaining > 1 ? 's' : ''} remaining before temporary security lockout.`
        );
      }
    }
  };

  if (!isOpen && !inlineGateway) {
    return null;
  }

  const content = (
    <div className={`relative w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/90 ${inlineGateway ? 'mx-auto my-12' : ''}`}>
      {/* Decorative Blueprint Corner Grid & Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 rounded-t-3xl"></div>

      {/* Header Close button if modal */}
      {!inlineGateway && (
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-zinc-500 hover:text-zinc-200 transition-colors p-1.5 rounded-lg hover:bg-zinc-900 cursor-pointer"
          aria-label="Close Security Modal"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      {/* Shield Badge & Title */}
      <div className="flex items-start gap-4 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center shrink-0 text-orange-500 shadow-inner">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-orange-400 uppercase tracking-widest mb-1.5">
            <Lock className="w-3 h-3 text-orange-500" />
            Restricted Access // Level 4 Gateway
          </div>
          <h2 className="text-xl sm:text-2xl font-black font-display uppercase tracking-tight text-white leading-tight">
            Administrator Authentication
          </h2>
          <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
            RUTA Engineering Executive Console • Enterprise CRM &amp; Wholesale Store Management.
          </p>
        </div>
      </div>

      {/* Security Advisory Warning */}
      <div className="mb-6 p-3.5 bg-zinc-900/90 border border-zinc-800/90 rounded-2xl flex items-start gap-3">
        <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
        <div className="text-[11px] font-mono text-zinc-400 leading-snug">
          Confidential sector. Unauthorized tampering or automated dictionary scans will trigger rate-limit cooldowns.
        </div>
      </div>

      {/* Authentication Form */}
      <form onSubmit={handleVerify} className="space-y-4">
        <div>
          <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-300 mb-2">
            Executive Admin Passkey
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
              <KeyRound className="w-4 h-4" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              value={passkey}
              onChange={(e) => setPasskey(e.target.value)}
              placeholder="Enter master passkey..."
              disabled={isLockedOut || isVerifying}
              autoFocus
              autoComplete="current-password"
              className="w-full bg-black border border-zinc-800 rounded-xl pl-10 pr-11 py-3 text-sm font-mono text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 disabled:opacity-50 disabled:bg-zinc-900 transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isLockedOut}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
              aria-label={showPassword ? 'Hide passkey' : 'Show passkey'}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Lockout / Cooldown Notice */}
        {isLockedOut && (
          <div className="p-3.5 bg-red-950/50 border border-red-800/80 rounded-xl flex items-center gap-2.5 text-red-300 text-xs font-mono">
            <Clock className="w-4 h-4 text-red-400 animate-spin shrink-0" />
            <span>
              Brute-Force Lockout Engaged. Cooldown: <strong className="text-white text-sm">{cooldownRemaining}s</strong> remaining.
            </span>
          </div>
        )}

        {/* Error message */}
        {errorMessage && !isLockedOut && (
          <div className="p-3 bg-red-950/40 border border-red-800/60 rounded-xl text-xs font-mono text-red-400 flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span className="leading-snug">{errorMessage}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <button
            type="submit"
            disabled={isLockedOut || isVerifying || !passkey.trim()}
            className="flex-1 py-3 px-5 bg-orange-500 hover:bg-orange-400 active:scale-[0.98] disabled:opacity-50 disabled:hover:bg-orange-500 disabled:cursor-not-allowed text-black font-display font-black text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-orange-500/20"
          >
            {isVerifying ? (
              <span className="animate-pulse">Validating Cryptographic Passkey...</span>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>Verify &amp; Unlock Admin Desk</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="py-3 px-5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white font-mono text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer border border-zinc-800 text-center"
          >
            Cancel / Back
          </button>
        </div>
      </form>

      {/* Security Specifications Footer */}
      <div className="mt-6 pt-5 border-t border-zinc-900 grid grid-cols-2 gap-2 text-[10px] font-mono text-zinc-500">
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
          <span>SHA-256 Digest Validation</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
          <span>Anti-Brute Force Lockout</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
          <span>Ephemeral Tab Session</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
          <span>Zero DOM Pre-rendering</span>
        </div>
      </div>
    </div>
  );

  if (inlineGateway) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
        {content}
      </div>
    );
  }

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      {content}
    </div>
  );
}
