import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  Download, 
  CheckCircle2, 
  CreditCard, 
  ShieldCheck, 
  FileText, 
  ArrowRight, 
  Car, 
  Clock, 
  Layers,
  Fuel,
  Printer
} from 'lucide-react';

export const NewCarSection = ({ onOpenBrochure }) => {
  const { 
    optionTier, 
    setOptionTier, 
    newCars, 
    bookNewCarToken, 
    setActiveReceipt 
  } = useApp();

  const [selectedCarForBooking, setSelectedCarForBooking] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [buyerName, setBuyerName] = useState('Ananya Verma');
  const [buyerPhone, setBuyerPhone] = useState('9871100223');
  const [buyerCity, setBuyerCity] = useState('New Delhi');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpenBooking = (car) => {
    setSelectedCarForBooking(car);
    setSelectedVariant(car.variants[0].name);
    setSelectedColor(car.colors[0]);
  };

  const handleProcessPayment = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const booking = bookNewCarToken({
        carId: selectedCarForBooking.id,
        carName: `${selectedCarForBooking.make} ${selectedCarForBooking.model}`,
        variant: selectedVariant,
        color: selectedColor,
        customerName: buyerName,
        phone: buyerPhone,
        city: buyerCity,
        paymentMethod: paymentMethod.toUpperCase(),
        transactionId: 'TXN-' + Math.floor(100000000 + Math.random() * 900000000)
      });

      setIsSubmitting(false);
      setSelectedCarForBooking(null);
    }, 1200);
  };

  // Option A & B mode: Static showcase with switch CTA
  if (optionTier !== 'C') {
    return (
      <div>
        <div style={{
          background: '#FFF7ED',
          border: '1.5px solid #FDBA74',
          borderRadius: '16px',
          padding: '24px 30px',
          marginBottom: '28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#FFEDD5', color: '#C2410C', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 800, marginBottom: '8px' }}>
              OPTION C SPECIFICATION REQUIRED
            </div>
            <h2 style={{ fontSize: '24px', color: '#7C2D12', marginBottom: '6px' }}>
              New Car ₹21,000 Token Booking is Dynamic in Option C
            </h2>
            <p style={{ color: '#9A3412', fontSize: '14px', maxWidth: '650px' }}>
              Per your client's handwritten notes, Option C activates new car stock browsing, official brochure PDF downloads, instant ₹21,000 token payment, and digital receipt generation.
            </p>
          </div>
          <button 
            className="btn-primary"
            onClick={() => setOptionTier('C')}
            style={{ background: '#EA580C' }}
          >
            Switch to Option C to Test Token Booking <ArrowRight size={16} />
          </button>
        </div>

        {/* Static catalog preview */}
        <div className="cars-grid">
          {newCars.map(car => (
            <div key={car.id} className="car-card">
              <div className="car-card-img-wrapper">
                <img src={car.image} alt={car.model} className="car-card-img" />
                <span className="car-badge-pill bidmaster">New Launch</span>
              </div>
              <div className="car-card-body">
                <h3 className="car-title">{car.make} {car.model}</h3>
                <p style={{ fontSize: '12px', color: '#64748B', marginBottom: '12px' }}>{car.tagline}</p>
                <div className="car-pricing-row">
                  <div>
                    <div style={{ fontSize: '11px', color: '#64748B' }}>Starting Ex-Showroom</div>
                    <div className="price-main">₹{(car.startingPrice / 100000).toFixed(2)} Lakh</div>
                  </div>
                  <button className="btn-secondary" onClick={() => onOpenBrochure(car)}>
                    <Download size={14} /> Brochure
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Option C: Full Dynamic New Car Suite with Brochure & ₹21k Booking Token
  return (
    <div>
      {/* Title */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#ECFDF5', color: '#047857', padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px' }}>
            <span className="live-pulse-dot green" style={{ width: '6px', height: '6px' }}></span> Dynamic Booking Active (Option C)
          </div>
          <h1 style={{ fontSize: '30px', color: '#0F172A', marginBottom: '6px' }}>
            New Car Inventory & Instant Token Booking
          </h1>
          <p style={{ color: '#64748B', fontSize: '15px' }}>
            Reserve your new vehicle online with a refundable ₹21,000 token fee. Instant digital receipt issued.
          </p>
        </div>

        <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', padding: '8px 16px', borderRadius: '12px', color: '#1E40AF', fontSize: '13px', fontWeight: 600 }}>
          🔒 Client Notice: ₹21k Fixed Token Only (No Downpayment or Loan Paperwork Online)
        </div>
      </div>

      {/* New Cars Grid */}
      <div className="cars-grid">
        {newCars.map(car => (
          <div key={car.id} className="car-card card-hover-lift">
            <div className="car-card-img-wrapper" style={{ height: '210px' }}>
              <img src={car.image} alt={car.model} className="car-card-img" />
              <span className="car-badge-pill needbuster" style={{ background: '#2563EB' }}>
                Token: ₹21,000
              </span>

              <div className="inspection-score-badge" style={{ background: 'rgba(0,0,0,0.75)' }}>
                <Clock size={13} color="#FBBF24" />
                <span>Waiting: {car.waitingPeriod}</span>
              </div>
            </div>

            <div className="car-card-body">
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#FF5722', textTransform: 'uppercase', marginBottom: '2px' }}>
                {car.make} Flagship
              </div>
              <h3 className="car-title" style={{ fontSize: '19px' }}>{car.make} {car.model}</h3>
              <p style={{ fontSize: '12px', color: '#64748B', marginBottom: '14px', lineHeight: 1.4 }}>
                {car.tagline}
              </p>

              {/* Specs pill list */}
              <div style={{ background: '#F8FAFC', borderRadius: '10px', padding: '10px 12px', fontSize: '12px', color: '#334155', marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div><strong>Engine:</strong> {car.specs.engine}</div>
                <div><strong>Safety:</strong> {car.specs.safety}</div>
              </div>

              {/* Price & Actions */}
              <div className="car-pricing-row" style={{ marginTop: 'auto' }}>
                <div>
                  <div style={{ fontSize: '11px', color: '#64748B' }}>Starting Ex-Showroom</div>
                  <div className="price-main" style={{ color: '#0F172A' }}>
                    ₹{(car.startingPrice / 100000).toFixed(2)} Lakh
                  </div>
                </div>

                <button 
                  className="btn-secondary"
                  style={{ padding: '8px 12px', fontSize: '12px' }}
                  onClick={() => onOpenBrochure(car)}
                  title="Download Brochure PDF"
                >
                  <Download size={14} color="#2563EB" /> Brochure PDF
                </button>
              </div>

              <button 
                className="btn-primary" 
                style={{ width: '100%', justifyContent: 'center', marginTop: '12px', padding: '12px' }}
                onClick={() => handleOpenBooking(car)}
              >
                <Sparkles size={16} /> Book for ₹21,000 Token
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Online ₹21,000 Token Payment Modal */}
      {selectedCarForBooking && (
        <div className="modal-overlay" onClick={() => setSelectedCarForBooking(null)}>
          <div className="modal-card" style={{ maxWidth: '520px' }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h3 style={{ fontSize: '18px' }}>Book {selectedCarForBooking.make} {selectedCarForBooking.model}</h3>
                <div style={{ fontSize: '12px', color: '#64748B' }}>Fixed Token: ₹21,000 • 100% Refundable</div>
              </div>
              <button onClick={() => setSelectedCarForBooking(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>✕</button>
            </div>

            <form onSubmit={handleProcessPayment}>
              <div className="modal-body">
                {/* Select Variant */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Choose Variant
                  </label>
                  <select 
                    value={selectedVariant}
                    onChange={e => setSelectedVariant(e.target.value)}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '14px' }}
                  >
                    {selectedCarForBooking.variants.map((v, i) => (
                      <option key={i} value={v.name}>{v.name} ({v.price})</option>
                    ))}
                  </select>
                </div>

                {/* Choose Color */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Select Exterior Color
                  </label>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {selectedCarForBooking.colors.map((col, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedColor(col)}
                        style={{
                          background: selectedColor === col ? '#FF5722' : '#F1F5F9',
                          color: selectedColor === col ? '#FFFFFF' : '#334155',
                          border: '1px solid #CBD5E1',
                          padding: '6px 12px',
                          borderRadius: '8px',
                          fontSize: '12px',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                      >
                        {col}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Buyer Details */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>Full Name</label>
                    <input 
                      type="text" 
                      value={buyerName} 
                      onChange={e => setBuyerName(e.target.value)}
                      required
                      style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>Phone Number</label>
                    <input 
                      type="tel" 
                      value={buyerPhone} 
                      onChange={e => setBuyerPhone(e.target.value)}
                      required
                      style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
                    />
                  </div>
                </div>

                {/* Payment Breakdown Card */}
                <div style={{ background: '#FFF7ED', border: '1px solid #FFEDD5', borderRadius: '12px', padding: '14px', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#7C2D12', marginBottom: '4px' }}>
                    <span>Online Priority Token Amount:</span>
                    <strong style={{ fontSize: '16px', color: '#EA580C' }}>₹21,000</strong>
                  </div>
                  <div style={{ fontSize: '11px', color: '#9A3412' }}>
                    *Client Specification: Only booking amount payment online. Balance payment & registration completed at the delivery hub.
                  </div>
                </div>

                {/* Payment Gateway Selection */}
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '8px' }}>
                    Payment Mode
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('upi')}
                      style={{
                        padding: '10px',
                        borderRadius: '8px',
                        border: paymentMethod === 'upi' ? '2px solid #FF5722' : '1px solid #CBD5E1',
                        background: paymentMethod === 'upi' ? '#FFF3E0' : '#FFFFFF',
                        fontWeight: 700,
                        fontSize: '12px',
                        cursor: 'pointer'
                      }}
                    >
                      Instant UPI
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cards')}
                      style={{
                        padding: '10px',
                        borderRadius: '8px',
                        border: paymentMethod === 'cards' ? '2px solid #FF5722' : '1px solid #CBD5E1',
                        background: paymentMethod === 'cards' ? '#FFF3E0' : '#FFFFFF',
                        fontWeight: 700,
                        fontSize: '12px',
                        cursor: 'pointer'
                      }}
                    >
                      Credit / Debit Card
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('netbanking')}
                      style={{
                        padding: '10px',
                        borderRadius: '8px',
                        border: paymentMethod === 'netbanking' ? '2px solid #FF5722' : '1px solid #CBD5E1',
                        background: paymentMethod === 'netbanking' ? '#FFF3E0' : '#FFFFFF',
                        fontWeight: 700,
                        fontSize: '12px',
                        cursor: 'pointer'
                      }}
                    >
                      NetBanking
                    </button>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setSelectedCarForBooking(null)}>Cancel</button>
                <button type="submit" className="btn-primary" disabled={isSubmitting} style={{ minWidth: '180px', justifyContent: 'center' }}>
                  {isSubmitting ? 'Processing Payment...' : 'Pay ₹21,000 Token Now'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
