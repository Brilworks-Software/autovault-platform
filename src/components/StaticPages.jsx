import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Building2, 
  MapPin, 
  ShieldCheck, 
  Car, 
  Wrench, 
  Gavel, 
  Sparkles, 
  Phone, 
  Mail, 
  Award, 
  Clock, 
  ChevronRight, 
  CheckCircle2,
  Send
} from 'lucide-react';

export const HomePage = ({ onExploreCars, onBookService, onOpenAuctions }) => {
  const { outlets, optionTier, setOptionTier } = useApp();
  const [selectedCity, setSelectedCity] = useState('All');

  const filteredOutlets = selectedCity === 'All' 
    ? outlets 
    : outlets.filter(o => o.city.toLowerCase() === selectedCity.toLowerCase());

  return (
    <div>
      {/* Hero Banner */}
      <div className="hero-banner">
        <div className="hero-glow"></div>
        <div className="hero-badge">
          <Sparkles size={14} /> India's Most Trusted Auto Marketplace & Auction Engine
        </div>
        <h1 className="hero-title">
          Drive Quality. Bid Transparency. <span>Experience Trust.</span>
        </h1>
        <p className="hero-subtitle">
          India's premier digital automotive ecosystem. Certified 200-point inspected pre-owned cars, high-frequency live dealer auctions, and 7-stage doorstep maintenance.
        </p>

        <div className="hero-action-row">
          <button className="btn-primary" style={{ padding: '14px 24px', fontSize: '15px' }} onClick={onExploreCars}>
            <Car size={18} /> Browse Certified Cars
          </button>
          <button className="btn-secondary" style={{ padding: '14px 24px', fontSize: '15px', background: 'rgba(255,255,255,0.15)', color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.25)' }} onClick={onOpenAuctions}>
            <Gavel size={18} /> Partner Auction Arena
          </button>
        </div>
      </div>

      {/* Quick Action Interactive Tiles */}
      <div className="quick-tiles-grid">
        <div className="quick-tile" onClick={onExploreCars}>
          <div className="quick-tile-icon" style={{ background: '#FFF3E0', color: '#FF5722' }}>
            <Car size={26} />
          </div>
          <div>
            <h3 style={{ fontSize: '17px', marginBottom: '4px', color: '#0F172A' }}>Buy Used Cars</h3>
            <p style={{ fontSize: '13px', color: '#64748B' }}>
              AutoVault certified inventory with comprehensive 200-point inspection check.
            </p>
          </div>
        </div>

        <div className="quick-tile" onClick={onOpenAuctions}>
          <div className="quick-tile-icon" style={{ background: '#EFF6FF', color: '#2563EB' }}>
            <Gavel size={26} />
          </div>
          <div>
            <h3 style={{ fontSize: '17px', marginBottom: '4px', color: '#0F172A' }}>Broker Bidding Hub</h3>
            <p style={{ fontSize: '13px', color: '#64748B' }}>
              Needbuster (1/day), Cloud (24/7) & BidMaster (2-3x/day) auctions.
            </p>
          </div>
        </div>

        <div className="quick-tile" onClick={onBookService}>
          <div className="quick-tile-icon" style={{ background: '#ECFDF5', color: '#059669' }}>
            <Wrench size={26} />
          </div>
          <div>
            <h3 style={{ fontSize: '17px', marginBottom: '4px', color: '#0F172A' }}>Doorstep Car Service</h3>
            <p style={{ fontSize: '13px', color: '#64748B' }}>
              Valet pickup, workshop intake proof, estimate approval, and live tracker.
            </p>
          </div>
        </div>
      </div>

      {/* Outlets / Hub Locations (Page 3 client note: "location of outlets") */}
      <div style={{ marginBottom: '48px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px', marginBottom: '20px' }}>
          <div>
            <h2 style={{ fontSize: '24px', color: '#0F172A', marginBottom: '4px' }}>
              Flagship Experience Hubs & Outlets
            </h2>
            <p style={{ color: '#64748B', fontSize: '14px' }}>
              Visit our mega hubs for test drives, live appraisals, and delivery handovers.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            {['All', 'New Delhi', 'Gurugram', 'Mumbai', 'Bengaluru', 'Hyderabad'].map((city) => (
              <button
                key={city}
                className={`btn-secondary ${selectedCity === city ? 'active' : ''}`}
                style={{ padding: '6px 14px', fontSize: '12px', borderRadius: '20px', background: selectedCity === city ? '#0F172A' : '#FFFFFF', color: selectedCity === city ? '#FFFFFF' : '#334155' }}
                onClick={() => setSelectedCity(city)}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '18px' }}>
          {filteredOutlets.map((outlet, i) => (
            <div key={i} style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '22px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#2563EB', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px' }}>
                  <MapPin size={15} /> {outlet.city}
                </div>
                <h3 style={{ fontSize: '17px', color: '#0F172A', marginBottom: '8px' }}>{outlet.name}</h3>
                <p style={{ fontSize: '13px', color: '#64748B', marginBottom: '14px', lineHeight: 1.5 }}>
                  {outlet.address}
                </p>
                <div style={{ background: '#F8FAFC', padding: '8px 12px', borderRadius: '8px', fontSize: '12px', color: '#475569', marginBottom: '16px' }}>
                  <strong>Facilities:</strong> {outlet.servicesHandled}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '14px', borderTop: '1px solid #F1F5F9' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Phone size={14} color="#FF5722" /> {outlet.phone}
                </span>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#059669', background: '#ECFDF5', padding: '4px 10px', borderRadius: '12px' }}>
                  {outlet.carsInStock}+ Cars Available
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Owner's Message & Company Journey (Page 3 client note: "owners message, journey etc. Informatory only - static") */}
      <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '20px', padding: '36px', marginBottom: '40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#FFF3E0', color: '#EA580C', padding: '4px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '12px' }}>
              <Award size={14} /> Founder's Message & Philosophy
            </div>
            <h2 style={{ fontSize: '26px', color: '#0F172A', marginBottom: '14px' }}>
              "Transforming India’s Automotive Ecosystem with Absolute Integrity"
            </h2>
            <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.7, marginBottom: '14px' }}>
              We started AutoVault with a singular promise: eliminating the uncertainty, hidden defects, and opaque negotiations that have burdened car buyers and fleet partners for decades.
            </p>
            <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.7, marginBottom: '20px' }}>
              Whether you are an individual buying your family’s next car, an authorized channel partner bidding on high-frequency lots, or a vehicle owner tracking your scheduled service in real-time — our transparent digital systems keep you in total control.
            </p>

            <div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A' }}>Kabir Singhal</div>
              <div style={{ fontSize: '12px', color: '#64748B' }}>Founder & Managing Director, AutoVault Group</div>
            </div>
          </div>

          {/* Journey Timeline */}
          <div style={{ background: '#F8FAFC', borderRadius: '16px', padding: '24px', border: '1px solid #E2E8F0' }}>
            <h3 style={{ fontSize: '18px', marginBottom: '18px', color: '#0F172A' }}>Our Journey & Milestones</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '14px' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#EFF6FF', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '12px', flexShrink: 0 }}>
                  2021
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '14px' }}>Inception & First Inspection Hub</div>
                  <p style={{ fontSize: '12px', color: '#64748B' }}>Launched operations in Delhi NCR with 200-point computerized diagnostics.</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#FEF3C7', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '12px', flexShrink: 0 }}>
                  2023
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '14px' }}>Proprietary Dealer Bidding Hub Launch</div>
                  <p style={{ fontSize: '12px', color: '#64748B' }}>Introduced Needbuster daily specials and BidMaster real-time auction engine.</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#ECFDF5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '12px', flexShrink: 0 }}>
                  2026
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '14px' }}>Pan-India Expansion & 7-Stage Service</div>
                  <p style={{ fontSize: '12px', color: '#64748B' }}>Active across 5 metropolitan regions with doorstep pickup and new car online token booking.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const InsurancePage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [carNumber, setCarNumber] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      {/* Title */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#F1F5F9', color: '#475569', padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px' }}>
          Static Informatory Module (All Options A, B, C)
        </div>
        <h1 style={{ fontSize: '30px', color: '#0F172A', marginBottom: '6px' }}>
          Comprehensive Auto Insurance & Instant Claims
        </h1>
        <p style={{ color: '#64748B', fontSize: '15px' }}>
          Partnered with India's top general insurance underwriters for cashless claim settlement across 5,000+ garages.
        </p>
      </div>

      {/* Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '36px' }}>
        <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#EFF6FF', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
            <ShieldCheck size={24} />
          </div>
          <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>Zero Depreciation Cover</h3>
          <p style={{ fontSize: '13px', color: '#64748B', lineHeight: 1.5 }}>
            Complete 100% claim payout on fiber, metal, and plastic parts without depreciation deductions.
          </p>
        </div>

        <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#ECFDF5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
            <Wrench size={24} />
          </div>
          <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>Cashless Claims at 5,000+ Garages</h3>
          <p style={{ fontSize: '13px', color: '#64748B', lineHeight: 1.5 }}>
            Drive into any AutoVault workshop or partner network bay for instant cashless repairs and priority surveyor inspection.
          </p>
        </div>

        <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#FFF3E0', color: '#EA580C', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
            <Clock size={24} />
          </div>
          <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>24x7 Roadside Assistance (RSA)</h3>
          <p style={{ fontSize: '13px', color: '#64748B', lineHeight: 1.5 }}>
            Towing, flat tire support, battery jumpstart, and emergency fuel delivered across national highways and city routes.
          </p>
        </div>
      </div>

      {/* Lead Form */}
      <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '20px', padding: '32px', maxWidth: '680px', margin: '0 auto' }}>
        <h3 style={{ fontSize: '20px', color: '#0F172A', marginBottom: '8px', textAlign: 'center' }}>
          Renew Insurance or Get Instant Free Quote
        </h3>
        <p style={{ color: '#64748B', fontSize: '14px', textAlign: 'center', marginBottom: '24px' }}>
          Save up to 85% on premium with maximum No Claim Bonus (NCB) transfer.
        </p>

        {submitted ? (
          <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '14px', padding: '24px', textAlign: 'center', color: '#065F46' }}>
            <CheckCircle2 size={36} style={{ margin: '0 auto 10px auto' }} />
            <h4 style={{ fontSize: '17px', marginBottom: '4px' }}>Quote Request Received!</h4>
            <p style={{ fontSize: '13px' }}>
              Our insurance advisor will WhatsApp customized policy quotes within 10 minutes.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '18px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>Car Registration Number</label>
                <input 
                  type="text" 
                  value={carNumber} 
                  onChange={e => setCarNumber(e.target.value)} 
                  placeholder="e.g. DL-01-AB-1234" 
                  required
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #CBD5E1', fontSize: '14px', textTransform: 'uppercase' }} 
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>Mobile Number</label>
                <input 
                  type="tel" 
                  value={phone} 
                  onChange={e => setPhone(e.target.value)} 
                  placeholder="10-digit number" 
                  required
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #CBD5E1', fontSize: '14px' }} 
                />
              </div>
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '12px' }}>
              <Send size={16} /> Get Free Insurance Quotes on WhatsApp
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
