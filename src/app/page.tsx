'use client';

import React, { useState } from 'react';
import { Mail, Phone, ExternalLink, Heart, Clock, Award, CheckCircle } from 'lucide-react';
import Image from 'next/image';

export default function WeddingPortfolioWebsite() {
  const [formData, setFormData] = useState({ name: '', email: '', date: '', package: 'editorial', vision: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const portfolioItems = [
    { id: 1, title: 'The Atlas Mountain Elopement', type: 'Photography', url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80', desc: 'Editorial bridal portraiture.' },
    { id: 2, title: 'Golden Hour Vows', type: 'Photography', url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80', desc: 'Cinematic warm lighting frames.' },
    { id: 3, title: 'Elegance in Motion', type: 'Cinematography', url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80', desc: '4K Premium highlight captures.' },
    { id: 4, title: 'Midnight Celebrations', type: 'Photography', url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80', desc: 'Candid archival aesthetics.' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSubmitted(false);

    if (!formData.name || !formData.email || !formData.vision) {
      setErrorMessage('Please fill out all fields before submitting.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          package: formData.package === 'editorial' ? 'The Complete Wedding Story (Hybrid Cinematic)' : 'The Fine-Art Vignette (Photo Only)',
          vision: formData.vision
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', date: '', package: 'editorial', vision: '' });
      } else {
        setErrorMessage(data.error || 'A server-side error occurred.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Network request failed. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#faf9f6', minHeight: '100vh', fontFamily: 'sans-serif' }}>

      {/* Navigation Header */}
      <nav style={{ borderBottom: '1px solid #e2e0da', padding: '20px', backgroundColor: 'rgba(250, 249, 246, 0.9)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '18px', fontWeight: '700', letterSpacing: '1px', color: '#1c1917' }}>Ilyas Ouani</span>
            <span style={{ fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: '#78716c', marginTop: '2px' }}>Wedding Fine-Art</span>
          </div>
        </div>
      </nav>

      {/* Main Layout Container Constraints */}
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px', boxSizing: 'border-box' }}>

        {/* Hero Section */}
        <header style={{ padding: '60px 0 40px 0', textAlign: 'center' }}>
          <div style={{ color: '#a8a29e', marginBottom: '16px' }}>
            <Heart style={{ width: '20px', height: '20px', margin: '0 auto' }} />
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: 'normal', color: '#1c1917', lineHeight: '1.3', marginBottom: '16px' }}>
            Capturing the poetry of your eternal moments.
          </h1>
          <p style={{ fontSize: '13px', color: '#6b6661', lineHeight: '1.6', marginBottom: '32px' }}>
            Premium wedding, engagement, and private cinematic storytelling based in Morocco. Delivering high-end international portrait matrices.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <a href="#work" style={{ backgroundColor: '#1c1917', color: '#ffffff', padding: '12px 24px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '1px' }}>View Portfolios</a>
            <a href="#reserve" style={{ backgroundColor: 'transparent', color: '#1c1917', border: '1px solid #1c1917', padding: '12px 24px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '1px' }}>Check Availability</a>
          </div>
        </header>

        {/* Portfolio Gallery Grid Element */}
        <section id="work" style={{ paddingTop: '20px' }}>
          <div style={{ borderTop: '1px solid #e2e0da', paddingTop: '32px', marginBottom: '24px' }}>
            <span style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '2px', color: '#a8a29e', fontWeight: 'bold' }}>Curation</span>
            <h2 style={{ fontSize: '22px', fontWeight: 'normal', color: '#1c1917', margin: '4px 0 0 0' }}>Selected Visual Proofs</h2>
          </div>

          {portfolioItems.map((item) => (
            <div key={item.id} style={{ backgroundColor: '#ffffff', border: '1px solid #e2e0da', borderRadius: '8px', overflow: 'hidden', marginBottom: '32px' }}>
              <div style={{ position: 'relative', width: '100%', aspectRatio: '1.5', overflow: 'hidden' }}>
                <Image
                  src={item.url}
                  alt={item.title}
                  fill
                  sizes="(max-w-md): 100vw, 600px"
                  priority={item.id <= 2}
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ fontSize: '15px', margin: 0, color: '#1c1917', fontWeight: '600' }}>{item.title}</h3>
                  <p style={{ fontSize: '12px', margin: '4px 0 0 0', color: '#78716c' }}>{item.desc}</p>
                </div>
                <span style={{ fontSize: '9px', backgroundColor: '#f5f4f0', color: '#44403c', padding: '3px 8px', borderRadius: '4px', textTransform: 'uppercase', fontWeight: 'bold' }}>
                  {item.type}
                </span>
              </div>
            </div>
          ))}
        </section>

        {/* Live Streaming Feed */}
        <section id="live" style={{ padding: '32px 24px', backgroundColor: '#1c1917', borderRadius: '8px', marginBottom: '40px', color: '#ffffff' }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <span style={{ background: 'rgba(244, 63, 94, 0.15)', color: '#fb7185', padding: '4px 12px', borderRadius: '20px', fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Live Monitoring Suite
            </span>
            <h2 style={{ fontSize: '22px', color: '#ffffff', fontWeight: 'normal', marginTop: '16px' }}>On-Air Integration Hub</h2>
          </div>

          <a href="https://instagram.com/ilyas.ouani" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '6px', textDecoration: 'none', marginBottom: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(to top right, #f59e0b, #ec4899)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 'bold', color: '#fff' }}>IG</div>
              <div>
                <h4 style={{ margin: 0, fontSize: '13px', color: '#ffffff' }}>Instagram Live Feed</h4>
                <p style={{ margin: 0, fontSize: '11px', color: '#a8a29e' }}>@ilyas.ouani</p>
              </div>
            </div>
            <ExternalLink style={{ width: '14px', height: '14px', color: '#78716c' }} />
          </a>
        </section>

        {/* Investment Options */}
        <section id="services" style={{ padding: '20px 0', borderTop: '1px solid #e2e0da' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <span style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '2px', color: '#a8a29e', fontWeight: 'bold' }}>Investment</span>
            <h2 style={{ fontSize: '22px', fontWeight: 'normal', color: '#1c1917', marginTop: '4px' }}>Production Packages</h2>
          </div>

          <div style={{ background: '#fff', border: '1px solid #e2e0da', borderRadius: '8px', padding: '24px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <h3 style={{ fontSize: '16px', margin: 0, color: '#1c1917', fontWeight: '600' }}>The Fine-Art Vignette</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid #f5f4f0', paddingTop: '16px' }}>
              <div style={{ fontSize: '12px', color: '#44403c', display: 'flex', gap: '8px', alignItems: 'center' }}>
                <Clock style={{ width: '12px', height: '12px', color: '#a8a29e' }} /> Up to 8 Hours Continuous Coverage
              </div>
            </div>
          </div>
        </section>

        {/* Secure Booking Inquiry Hub */}
        <section id="reserve" style={{ padding: '20px 0', borderTop: '1px solid #e2e0da', marginBottom: '40px' }}>
          <div style={{ marginBottom: '24px' }}>
            <span style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '2px', color: '#a8a29e', fontWeight: 'bold' }}>Booking Hub</span>
            <h2 style={{ fontSize: '22px', fontWeight: 'normal', color: '#1c1917', marginTop: '4px' }}>Initiate Commission</h2>
          </div>

          <form onSubmit={handleSubmit} style={{ background: '#ffffff', padding: '24px', borderRadius: '8px', border: '1px solid #e2e0da' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#78716c', marginBottom: '6px', fontWeight: '600' }}>Your Full Name</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} style={{ width: '100%', padding: '12px', background: '#fbfaf8', border: '1px solid #e2e0da', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box', color: '#1c1917' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#78716c', marginBottom: '6px', fontWeight: '600' }}>Email Address</label>
                <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} style={{ width: '100%', padding: '12px', background: '#fbfaf8', border: '1px solid #e2e0da', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box', color: '#1c1917' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#78716c', marginBottom: '6px', fontWeight: '600' }}>Desired Curation Package</label>
                <select value={formData.package} onChange={(e) => setFormData({...formData, package: e.target.value})} style={{ width: '100%', padding: '12px', background: '#fbfaf8', border: '1px solid #e2e0da', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box', color: '#1c1917' }}>
                  <option value="vignette">The Fine-Art Vignette (Photo Only)</option>
                  <option value="editorial">The Complete Wedding Story (Hybrid Cinematic)</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#78716c', marginBottom: '6px', fontWeight: '600' }}>Tell Me About Your Vision</label>
                <textarea rows={4} placeholder="Location, styling cues, or timelines..." value={formData.vision} onChange={(e) => setFormData({...formData, vision: e.target.value})} style={{ width: '100%', padding: '12px', background: '#fbfaf8', border: '1px solid #e2e0da', borderRadius: '4px', fontSize: '14px', resize: 'none', boxSizing: 'border-box', color: '#1c1917' }} />
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
                <div style={{ backgroundColor: '#f0fdf4', color: '#166534', border: '1px solid #bbf7d0', padding: '12px', borderRadius: '4px', fontSize: '13px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <CheckCircle style={{ width: '16px', height: '16px', color: '#166534' }} /> Transmission Encrypted. Your date request is pending validation!
                </div>
              )}
            </div>
          </form>

          <div style={{ position: 'relative', margin: '24px 0 12px 0', textAlign: 'center' }}>
            <span style={{ fontSize: '10px', textTransform: 'uppercase', color: '#a8a29e', background: '#ffffff', padding: '0 8px', position: 'relative', zIndex: 2, letterSpacing: '1px' }}>
              OR CONNECT INSTANTLY
            </span>
            <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', backgroundColor: '#e2e0da', zIndex: 1 }} />
          </div>

          <a
            href="https://wa.me/+212638713194"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              width: '100%', textAlign: 'center', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', border: '1px solid #25d366', color: '#1c1917', padding: '14px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '1px'
            }}
          >
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#25d366' }} />
            Open Direct WhatsApp Chat
          </a>
        </section>

      </div>

      <footer style={{ borderTop: '1px solid #e2e0da', backgroundColor: '#f5f4f0', padding: '24px', textAlign: 'center', fontSize: '11px', color: '#a8a29e' }}>
        <p>© 2026 Ilyas Ouani Fine-Art. All layout architecture explicitly preserved.</p>
      </footer>
    </div>
  );
}

