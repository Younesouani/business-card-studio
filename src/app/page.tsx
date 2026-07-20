'use client';

import React, { useState } from 'react';

export default function PortfolioStudio() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    package: 'vignette',
    vision: ''
  });

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    setLoading(true);
    setErrorMessage('');
    setSubmitted(false);

    try {
      const response = await fetch('/api/inquiry', {
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
        setErrorMessage(data.error || 'Submission failed on server.');
      }
    } catch (error) {
      setErrorMessage('Network error. Unable to send inquiry.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#fbfaf8', color: '#1c1917', minHeight: '100vh' }}>
      
      <header style={{ padding: '30px 0', borderBottom: '1px solid #e2e0da', marginBottom: '40px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '26px', fontWeight: 'normal', letterSpacing: '3px', textTransform: 'uppercase', color: '#1c1917', margin: 0 }}>
          ILYA STUDIO
        </h1>
        <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', color: '#78716c', marginTop: '8px' }}>
          Fine-Art Visual Curation & Storytelling
        </p>
      </header>

      <section style={{ marginBottom: '40px' }}>
        <p style={{ fontSize: '15px', lineHeight: '1.6', color: '#44403c', fontStyle: 'italic' }}>
          Capturing high-end, editorial event coverage and luxury private visual sessions. Every frame is treated as a distinct work of art, permanently capturing authentic elegance.
        </p>
      </section>

      <section id="reserve" style={{ padding: '20px 0', borderTop: '1px solid #e2e0da', marginBottom: '40px' }}>
        <div style={{ marginBottom: '24px' }}>
          <span style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '2px', color: '#a8a29e', fontWeight: 'bold' }}>Booking Hub</span>
          <h2 style={{ fontSize: '22px', fontWeight: 'normal', color: '#1c1917', marginTop: '4px' }}>Initiate Commission</h2>
        </div>

        <form onSubmit={handleFormSubmit} style={{ background: '#ffffff', padding: '24px', borderRadius: '8px', border: '1px solid #e2e0da' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            <div>
              <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#78716c', marginBottom: '6px', fontWeight: '600' }}>Your Full Name</label>
              <input 
                type="text" 
                required 
                value={formData.name} 
                onChange={(e) => setFormData({...formData, name: e.target.value})} 
                style={{ width: '100%', padding: '12px', background: '#fbfaf8', border: '1px solid #e2e0da', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box', color: '#1c1917' }} 
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#78716c', marginBottom: '6px', fontWeight: '600' }}>Email Address</label>
              <input 
                type="email" 
                required 
                value={formData.email} 
                onChange={(e) => setFormData({...formData, email: e.target.value})} 
                style={{ width: '100%', padding: '12px', background: '#fbfaf8', border: '1px solid #e2e0da', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box', color: '#1c1917' }} 
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#78716c', marginBottom: '6px', fontWeight: '600' }}>Desired Curation Package</label>
              <select 
                value={formData.package} 
                onChange={(e) => setFormData({...formData, package: e.target.value})} 
                style={{ width: '100%', padding: '12px', background: '#fbfaf8', border: '1px solid #e2e0da', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box', color: '#1c1917' }}
              >
                <option value="vignette">The Fine-Art Vignette (Photo Only)</option>
                <option value="editorial">The Complete Wedding Story (Hybrid Cinematic)</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#78716c', marginBottom: '6px', fontWeight: '600' }}>Tell Me About Your Vision</label>
              <textarea 
                rows={4} 
                required 
                placeholder="Location, styling cues, or timelines..." 
                value={formData.vision} 
                onChange={(e) => setFormData({...formData, vision: e.target.value})} 
                style={{ width: '100%', padding: '12px', background: '#fbfaf8', border: '1px solid #e2e0da', borderRadius: '4px', fontSize: '14px', resize: 'none', boxSizing: 'border-box', color: '#1c1917' }} 
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                cursor: loading ? 'not-allowed' : 'pointer',
                padding: '14px',
                backgroundColor: '#1c1917',
                color: '#ffffff',
                border: 'none',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                opacity: loading ? 0.6 : 1
              }}
            >
              {loading ? 'Sending Request...' : 'Securely Request Allocation'}
            </button>

            {errorMessage && (
              <div style={{ backgroundColor: '#fef2f2', color: '#991b1b', border: '1px solid #fca5a5', padding: '12px', borderRadius: '4px', fontSize: '13px', textAlign: 'center' }}>
                {errorMessage}
              </div>
            )}

            {submitted && (
              <div style={{ backgroundColor: '#f0fdf4', color: '#166534', border: '1px solid #bbf7d0', padding: '12px', borderRadius: '4px', fontSize: '13px', textAlign: 'center' }}>
                Transmission Encrypted. Your date request is pending validation!
              </div>
            )}
          </div>
        </form>
      </section>

      <footer style={{ textAlign: 'center', padding: '20px 0', borderTop: '1px solid #e2e0da', color: '#a8a29e', fontSize: '11px', letterSpacing: '1px' }}>
        © {new Date().getFullYear()} ILYA STUDIO. All Rights Reserved.
      </footer>

    </div>
  );
}

