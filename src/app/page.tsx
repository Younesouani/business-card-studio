'use client';

import React, { useState, useEffect } from 'react';
import { 
  Camera, 
  Film, 
  ArrowRight, 
  Sparkles,
  Lock,
  CheckCircle,
  Menu,
  X
} from 'lucide-react';

export default function PortfolioStudio() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [runtimeCrash, setRuntimeCrash] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    package: 'vignette',
    vision: ''
  });

  useEffect(() => {
    const handleGlobalError = (event: ErrorEvent) => {
      setRuntimeCrash(`Hydration/Runtime Error: ${event.message}`);
    };
    window.addEventListener('error', handleGlobalError);
    return () => window.removeEventListener('error', handleGlobalError);
  }, []);

  const executeSubmission = async () => {
    if (!formData.name || !formData.email || !formData.vision) {
      setErrorMessage('Please fill out all required fields.');
      return;
    }

    setLoading(true);
    setErrorMessage('');
    setSubmitted(false);

    try {
      const baseHost = typeof window !== 'undefined' ? window.location.origin : '';
      const targetUrl = `${baseHost}/api/inquiry`;
      
      const response = await fetch(targetUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', package: 'vignette', vision: '' });
      } else {
        setErrorMessage(data.error || 'Submission failed on server side.');
      }
    } catch (error: any) {
      setErrorMessage(error?.message || 'Network error. Connection could not be established.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#fbfaf8', color: '#1c1917', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      
      {runtimeCrash && (
        <div style={{ background: '#7f1d1d', color: '#fef2f2', padding: '16px', position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999, fontSize: '12px', wordBreak: 'break-all', fontFamily: 'monospace', borderBottom: '2px solid #ef4444' }}>
          ⚠️ CRITICAL CLIENT CRASH IN BUNDLE:<br/>{runtimeCrash}
        </div>
      )}

      {/* Navigation Header */}
      <nav style={{ borderBottom: '1px solid #e2e0da', backgroundColor: 'rgba(251, 250, 248, 0.8)', backdropFilter: 'blur(8px)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          
          <div style={{ flex: 1 }}>
            <span style={{ fontSize: '20px', fontWeight: 'normal', letterSpacing: '4px', textTransform: 'uppercase', color: '#1c1917' }}>
              ILYA STUDIO
            </span>
          </div>

          {/* Cleaned: Removed invalid md: prefix fields */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            <a href="#philosophy" style={{ textDecoration: 'none', color: '#44403c', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px' }}>Philosophy</a>
            <a href="#curation" style={{ textDecoration: 'none', color: '#44403c', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px' }}>Offerings</a>
            <a href="#reserve" style={{ textDecoration: 'none', backgroundColor: '#1c1917', color: '#ffffff', padding: '10px 20px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 'bold', borderRadius: '2px' }}>Book Commission</a>
          </div>
        </div>
      </nav>

      {/* Hero Header Section */}
      <header id="philosophy" style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 24px 60px 24px', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#f2f0ea', padding: '6px 14px', borderRadius: '30px', marginBottom: '24px', border: '1px solid #e2e0da' }}>
          <Sparkles size={14} style={{ color: '#78716c' }} />
          <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '2px', color: '#44403c', fontWeight: '600' }}>Available Internationally</span>
        </div>
        <h1 style={{ fontSize: '38px', fontWeight: 'normal', letterSpacing: '-1px', lineHeight: '1.2', color: '#1c1917', maxWidth: '800px', margin: '0 auto 24px auto' }}>
          Fine-Art Visual Curation & Editorial Storytelling
        </h1>
        <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#57534e', maxWidth: '600px', margin: '0 auto', fontStyle: 'italic' }}>
          Capturing high-end, luxury event coverage and private visual sessions. Every single frame is handled as a distinct work of fine art, permanently capturing authentic elegance.
        </p>
      </header>

      {/* Services Portfolio Tiers Block */}
      <section id="curation" style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px 60px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '3px', color: '#a8a29e', fontWeight: 'bold' }}>Curation Packages</span>
          <h2 style={{ fontSize: '28px', fontWeight: 'normal', color: '#1c1917', marginTop: '6px' }}>Available Tiers</h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          {/* Tier Option 1 */}
          <div style={{ background: '#ffffff', padding: '40px 32px', borderRadius: '4px', border: '1px solid #e2e0da' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{ background: '#fbfaf8', padding: '12px', borderRadius: '4px', border: '1px solid #e2e0da' }}>
                <Camera style={{ width: '24px', height: '24px', color: '#44403c' }} />
              </div>
              <div>
                <h3 style={{ fontSize: '18px', margin: 0, fontWeight: 'normal', color: '#1c1917' }}>The Fine-Art Vignette</h3>
                <span style={{ fontSize: '11px', textTransform: 'uppercase', color: '#78716c', letterSpacing: '1px' }}>Static Curation</span>
              </div>
            </div>
            <p style={{ fontSize: '14px', color: '#57534e', lineHeight: '1.6', marginBottom: '24px' }}>
              Premium static asset logging configuration. Explicitly tailored for editorial bridal portraits, destination couple engagements, and premium fashion style layout logs.
            </p>
            <a href="#reserve" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', color: '#1c1917' }}>
              Select Layout Framework <ArrowRight size={14} />
            </a>
          </div>

          {/* Tier Option 2 */}
          <div style={{ background: '#ffffff', padding: '40px 32px', borderRadius: '4px', border: '1px solid #e2e0da' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{ background: '#fbfaf8', padding: '12px', borderRadius: '4px', border: '1px solid #e2e0da' }}>
                <Film style={{ width: '24px', height: '24px', color: '#44403c' }} />
              </div>
              <div>
                <h3 style={{ fontSize: '18px', margin: 0, fontWeight: 'normal', color: '#1c1917' }}>The Complete Wedding Story</h3>
                <span style={{ fontSize: '11px', textTransform: 'uppercase', color: '#78716c', letterSpacing: '1px' }}>Hybrid Cinematic</span>
              </div>
            </div>
            <p style={{ fontSize: '14px', color: '#57534e', lineHeight: '1.6', marginBottom: '24px' }}>
              Comprehensive multi-lens media management configuration. Immersive hybrid filmmaking paired with high-end editorial photo spreads chronicling your timeline end-to-end.
            </p>
            <a href="#reserve" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', color: '#1c1917' }}>
              Select Layout Framework <ArrowRight size={14} />
            </a>
          </div>

        </div>
      </section>

      {/* Formless Secure Inquiry Module Hub */}
      <section id="reserve" style={{ borderTop: '1px solid #e2e0da', backgroundColor: '#ffffff', padding: '80px 24px' }}>
        <div style={{ maxWidth: '650px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: '#fbfaf8', padding: '6px 12px', borderRadius: '4px', border: '1px solid #e2e0da', marginBottom: '12px' }}>
              <Lock size={12} style={{ color: '#16a34a' }} />
              <span style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '1px', color: '#166534', fontWeight: 'bold' }}>Resend Verified Transmission Pipeline</span>
            </div>
            <h2 style={{ fontSize: '32px', fontWeight: 'normal', color: '#1c1917', margin: 0 }}>Initiate Commission</h2>
            <p style={{ fontSize: '14px', color: '#6b6661', marginTop: '8px' }}>Provide your timeline coordination constraints to reserve allocation privileges.</p>
          </div>

          <div style={{ background: '#fbfaf8', padding: '32px', borderRadius: '6px', border: '1px solid #e2e0da' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              <div>
                <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#78716c', marginBottom: '8px', fontWeight: '600' }}>Your Full Name</label>
                <input 
                  type="text" 
                  placeholder="E.g., Alexander Mercer"
                  value={formData.name} 
                  onChange={(e) => setFormData({...formData, name: e.target.value})} 
                  style={{ width: '100%', padding: '14px', background: '#ffffff', border: '1px solid #e2e0da', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box', color: '#1c1917' }} 
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#78716c', marginBottom: '8px', fontWeight: '600' }}>Email Address</label>
                <input 
                  type="email" 
                  placeholder="name@domain.com"
                  value={formData.email} 
                  onChange={(e) => setFormData({...formData, email: e.target.value})} 
                  style={{ width: '100%', padding: '14px', background: '#ffffff', border: '1px solid #e2e0da', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box', color: '#1c1917' }} 
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#78716c', marginBottom: '8px', fontWeight: '600' }}>Desired Curation Package</label>
                <select 
                  value={formData.package} 
                  onChange={(e) => setFormData({...formData, package: e.target.value})} 
                  style={{ width: '100%', padding: '14px', background: '#ffffff', border: '1px solid #e2e0da', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box', color: '#1c1917' }}
                >
                  <option value="vignette">The Fine-Art Vignette (Photo Only)</option>
                  <option value="editorial">The Complete Wedding Story (Hybrid Cinematic)</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#78716c', marginBottom: '8px', fontWeight: '600' }}>Tell Me About Your Creative Vision</label>
                <textarea 
                  rows={5} 
                  placeholder="Specify location dynamics, aesthetic direction preferences, scheduling profiles..." 
                  value={formData.vision} 
                  onChange={(e) => setFormData({...formData, vision: e.target.value})} 
                  style={{ width: '100%', padding: '14px', background: '#ffffff', border: '1px solid #e2e0da', borderRadius: '4px', fontSize: '14px', resize: 'none', boxSizing: 'border-box', color: '#1c1917', lineHeight: '1.5' }} 
                />
              </div>

              <button
                type="button"
                disabled={loading}
                onClick={executeSubmission}
                style={{
                  width: '100%',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  padding: '16px',
                  backgroundColor: '#1c1917',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  opacity: loading ? 0.6 : 1,
                  transition: 'background-color 0.2s, opacity 0.2s',
                  marginTop: '10px'
                }}
              >
                {loading ? 'Transmitting Request...' : 'Securely Request Allocation'}
              </button>

              {errorMessage && (
                <div style={{ backgroundColor: '#fef2f2', color: '#991b1b', border: '1px solid #fca5a5', padding: '14px', borderRadius: '4px', fontSize: '13px', textAlign: 'center', lineHeight: '1.4' }}>
                  {errorMessage}
                </div>
              )}

              {submitted && (
                <div style={{ backgroundColor: '#f0fdf4', color: '#166534', border: '1px solid #bbf7d0', padding: '16px', borderRadius: '4px', fontSize: '13px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', lineHeight: '1.4' }}>
                  <CheckCircle style={{ width: '18px', height: '18px', color: '#166534', flexShrink: 0 }} /> Transmission Encrypted. Your date request is pending validation!
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <footer style={{ borderTop: '1px solid #e2e0da', textAlign: 'center', padding: '40px 24px', color: '#a8a29e', fontSize: '11px', letterSpacing: '2px', backgroundColor: '#fbfaf8' }}>


        © {new Date().getFullYear()} ILYA STUDIO. ALL RIGHTS RESERVED...
      </footer>

    </div>
  );
}

