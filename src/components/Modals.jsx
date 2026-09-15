import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  PhoneCall, 
  MessageSquare, 
  CheckCircle2, 
  ShieldCheck, 
  Download, 
  Printer, 
  Car, 
  Fuel, 
  Gauge, 
  Sparkles, 
  Calendar, 
  Award, 
  Share2,
  Bell,
  Check
} from 'lucide-react';

// 1. Call Dealer Modal (Page 3: "calling us directly")
export const CallDealerModal = ({ car, onClose }) => {
  const [callbackRequested, setCallbackRequested] = useState(false);
  const [phone, setPhone] = useState('');

  if (!car) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" style={{ maxWidth: '440px' }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <PhoneCall size={20} color="#FF5722" />
            <h3 style={{ fontSize: '18px' }}>Contact Relationship Manager</h3>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>✕</button>
        </div>

        <div className="modal-body">
          <div style={{ display: 'flex', gap: '14px', alignItems: 'center', background: '#F8FAFC', padding: '12px 14px', borderRadius: '12px', marginBottom: '20px' }}>
            <img src={car.images[0]} alt={car.model} style={{ width: '64px', height: '48px', objectFit: 'cover', borderRadius: '8px' }} />
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A' }}>{car.make} {car.model}</div>
              <div style={{ fontSize: '12px', color: '#64748B' }}>{car.regNumber} • ₹{car.price.toLocaleString('en-IN')}</div>
            </div>
          </div>

          <div style={{ textAlign: 'center', padding: '16px', background: '#EFF6FF', borderRadius: '14px', marginBottom: '20px' }}>
            <div style={{ fontSize: '12px', color: '#1E40AF', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>
              Direct Dealership Hotline
            </div>
            <a 
              href="tel:+911149001200" 
              style={{ fontSize: '24px', fontWeight: 800, color: '#2563EB', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              <PhoneCall size={22} /> +91 11 4900 1200
            </a>
            <div style={{ fontSize: '11px', color: '#64748B', marginTop: '4px' }}>
              Available 9:00 AM - 9:00 PM (7 Days a week)
            </div>
          </div>

          {callbackRequested ? (
            <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', padding: '14px', borderRadius: '10px', color: '#065F46', textAlign: 'center', fontSize: '13px', fontWeight: 600 }}>
              ✓ Callback Scheduled! Our executive will call you within 2 minutes.
            </div>
          ) : (
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>
                Or Request Instant Free Callback:
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input 
                  type="tel"
                  placeholder="Enter 10-digit mobile"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  style={{ flex: 1, padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
                />
                <button 
                  className="btn-primary" 
                  style={{ padding: '10px 16px', fontSize: '13px' }}
                  onClick={() => setCallbackRequested(true)}
                >
                  Call Me Now
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// 2. Car Detailed Inspection Modal
export const CarDetailModal = ({ car, onClose, onCall, onBid }) => {
  if (!car) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" style={{ maxWidth: '780px' }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h3 style={{ fontSize: '20px' }}>{car.make} {car.model} ({car.year})</h3>
            <div style={{ fontSize: '12px', color: '#64748B' }}>{car.regNumber} • {car.location}</div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>✕</button>
        </div>

        <div className="modal-body">
          {/* Gallery */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '10px', marginBottom: '20px' }}>
            <img src={car.images[0]} alt="Car main" style={{ width: '100%', height: '260px', objectFit: 'cover', borderRadius: '12px' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {car.images[1] && <img src={car.images[1]} alt="Interior" style={{ width: '100%', height: '125px', objectFit: 'cover', borderRadius: '10px' }} />}
              {car.images[2] ? (
                <img src={car.images[2]} alt="Rear" style={{ width: '100%', height: '125px', objectFit: 'cover', borderRadius: '10px' }} />
              ) : (
                <div style={{ width: '100%', height: '125px', background: '#F1F5F9', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: '#64748B' }}>
                  Inspection Verified
                </div>
              )}
            </div>
          </div>

          {/* Quick Specs Bar */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', background: '#F8FAFC', padding: '14px', borderRadius: '12px', marginBottom: '20px', textAlign: 'center' }}>
            <div>
              <div style={{ fontSize: '11px', color: '#64748B' }}>KILOMETERS</div>
              <div style={{ fontSize: '14px', fontWeight: 800 }}>{car.mileage.toLocaleString('en-IN')} km</div>
            </div>
            <div>
              <div style={{ fontSize: '11px', color: '#64748B' }}>FUEL</div>
              <div style={{ fontSize: '14px', fontWeight: 800 }}>{car.fuel}</div>
            </div>
            <div>
              <div style={{ fontSize: '11px', color: '#64748B' }}>TRANSMISSION</div>
              <div style={{ fontSize: '14px', fontWeight: 800 }}>{car.transmission}</div>
            </div>
            <div>
              <div style={{ fontSize: '11px', color: '#64748B' }}>OWNERSHIP</div>
              <div style={{ fontSize: '14px', fontWeight: 800 }}>{car.owners}st Owner</div>
            </div>
          </div>

          {/* 200-Point Inspection Breakdown */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '14px', padding: '18px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={20} color="#059669" />
                <h4 style={{ fontSize: '16px' }}>AutoVault Certified 200-Point Evaluation</h4>
              </div>
              <span style={{ fontSize: '14px', fontWeight: 800, background: '#ECFDF5', color: '#059669', padding: '4px 10px', borderRadius: '8px' }}>
                {car.inspectionScore} / 10 Rated
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '13px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#059669' }}>
                <CheckCircle2 size={16} /> Engine & Transmission: Impeccable (No Leaks)
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#059669' }}>
                <CheckCircle2 size={16} /> Suspension & Steering: 100% Tested
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#059669' }}>
                <CheckCircle2 size={16} /> Electricals & AC: Factory Chill Verified
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#059669' }}>
                <CheckCircle2 size={16} /> Non-Accidental Chassis Certified
              </div>
            </div>
          </div>

          {/* Video inspection if available */}
          {car.videoUrl && (
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 700 }}>Inspection Video Walkthrough</h4>
                <span style={{ fontSize: '11px', color: '#059669', fontWeight: 700, background: '#ECFDF5', padding: '2px 8px', borderRadius: '6px' }}>
                  ✓ HD Video Verified
                </span>
              </div>
              <video 
                src={car.videoUrl} 
                controls 
                playsInline
                preload="auto"
                style={{ width: '100%', maxHeight: '240px', borderRadius: '10px', background: '#000', objectFit: 'contain' }}
              >
                Your browser does not support HTML5 video playback.
              </video>
            </div>
          )}

          {/* Pricing & Footer Actions */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '16px', borderTop: '1px solid #E2E8F0' }}>
            <div>
              <div style={{ fontSize: '12px', color: '#64748B' }}>Fixed Guaranteed Price</div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A' }}>₹{car.price.toLocaleString('en-IN')}</div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button className="btn-secondary" onClick={() => onCall(car)}>
                <PhoneCall size={16} color="#FF5722" /> Call Relationship Hub
              </button>
              <button className="btn-primary" onClick={() => onBid(car)}>
                Place Offer / Bid
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 3. New Car Brochure Printable PDF Modal (Page 6)
export const BrochureModal = ({ car, onClose }) => {
  if (!car) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" style={{ maxWidth: '640px' }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Download size={20} color="#2563EB" />
            <h3 style={{ fontSize: '18px' }}>Official Brochure: {car.make} {car.model}</h3>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>✕</button>
        </div>

        <div className="modal-body" id="printable-brochure">
          <div style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)', color: '#FFFFFF', padding: '24px', borderRadius: '16px', marginBottom: '20px', textAlign: 'center' }}>
            <img src={car.image} alt={car.model} style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '12px', marginBottom: '14px' }} />
            <h2 style={{ fontSize: '22px', marginBottom: '4px' }}>{car.make} {car.model}</h2>
            <p style={{ color: '#CBD5E1', fontSize: '13px' }}>{car.tagline}</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '20px', fontSize: '13px' }}>
            <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
              <strong>Powertrain:</strong> {car.specs.engine}
            </div>
            <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
              <strong>Peak Output:</strong> {car.specs.power}
            </div>
            <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
              <strong>Peak Torque:</strong> {car.specs.torque}
            </div>
            <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
              <strong>Safety Rating:</strong> {car.specs.safety}
            </div>
          </div>

          <h4 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '10px' }}>Official Variants & Ex-Showroom Pricing</h4>
          <div style={{ border: '1px solid #E2E8F0', borderRadius: '10px', overflow: 'hidden', marginBottom: '20px' }}>
            {car.variants.map((v, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', borderBottom: i < car.variants.length - 1 ? '1px solid #F1F5F9' : 'none', fontSize: '13px' }}>
                <span style={{ fontWeight: 600 }}>{v.name}</span>
                <span style={{ fontWeight: 800, color: '#0F172A' }}>{v.price}</span>
              </div>
            ))}
          </div>

          <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', padding: '12px 16px', borderRadius: '10px', fontSize: '12px', color: '#1E40AF', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span>Online Priority Token: <strong>₹21,000 only</strong></span>
            <span>Delivery: <strong>{car.waitingPeriod}</strong></span>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Close</button>
          <button className="btn-primary" onClick={() => window.print()}>
            <Printer size={16} /> Print / Save as PDF
          </button>
        </div>
      </div>
    </div>
  );
};

// 4. Digital Receipt Modal for ₹21,000 Token Payment (Page 6)
export const ReceiptModal = ({ receipt, onClose }) => {
  if (!receipt) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" style={{ maxWidth: '560px' }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle2 size={22} color="#059669" />
            <h3 style={{ fontSize: '18px' }}>Digital Booking Receipt</h3>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>✕</button>
        </div>

        <div className="modal-body">
          <div className="receipt-container">
            <div className="receipt-stamp">CONFIRMED</div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#FF5722', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Car size={22} />
              </div>
              <div>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>AutoVault India Pvt Ltd</div>
                <div style={{ fontSize: '11px', color: '#64748B' }}>GSTIN: 07AABCA1234F1Z8 • Official Tax Invoice & Token Receipt</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', padding: '14px 0', borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0', marginBottom: '16px', fontSize: '12px' }}>
              <div>
                <div style={{ color: '#64748B' }}>Receipt Number:</div>
                <div style={{ fontWeight: 800, color: '#0F172A' }}>{receipt.bookingId}</div>
              </div>
              <div>
                <div style={{ color: '#64748B' }}>Date & Timestamp:</div>
                <div style={{ fontWeight: 600 }}>{receipt.timestamp}</div>
              </div>
              <div>
                <div style={{ color: '#64748B' }}>Customer Name:</div>
                <div style={{ fontWeight: 700 }}>{receipt.customerName} ({receipt.phone})</div>
              </div>
              <div>
                <div style={{ color: '#64748B' }}>Delivery Hub City:</div>
                <div style={{ fontWeight: 600 }}>{receipt.city}</div>
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '12px', color: '#64748B', marginBottom: '4px' }}>Booked Vehicle Lot:</div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A' }}>{receipt.carName}</div>
              <div style={{ fontSize: '13px', color: '#2563EB', fontWeight: 600 }}>Variant: {receipt.variant} • Color: {receipt.color}</div>
            </div>

            <div style={{ background: '#F8FAFC', borderRadius: '10px', padding: '14px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '6px' }}>
                <span>Online Booking Token Paid:</span>
                <strong style={{ fontSize: '18px', color: '#059669' }}>₹{receipt.tokenAmount.toLocaleString('en-IN')}</strong>
              </div>
              <div style={{ fontSize: '11px', color: '#64748B' }}>
                Payment Method: {receipt.paymentMethod} • Txn Ref: {receipt.transactionId}
              </div>
            </div>

            <div style={{ fontSize: '11px', color: '#94A3B8', lineHeight: 1.5, textAlign: 'center' }}>
              *This digital token receipt confirms your priority allotment queue. Balance vehicle price, insurance, and road tax registration are payable prior to delivery at your regional AutoVault Hub.
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Close</button>
          <button className="btn-primary" onClick={() => window.print()}>
            <Printer size={16} /> Print Official Receipt
          </button>
        </div>
      </div>
    </div>
  );
};

// 5. Notifications Stream Modal (WhatsApp & SMS alerts simulator per client notes)
export const NotificationModal = ({ onClose }) => {
  const { notifications } = useApp();

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" style={{ maxWidth: '480px' }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Bell size={20} color="#FF5722" />
            <h3 style={{ fontSize: '18px' }}>Automated Reminders & Alerts</h3>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>✕</button>
        </div>

        <div className="modal-body" style={{ maxHeight: '420px', overflowY: 'auto' }}>
          <p style={{ fontSize: '12px', color: '#64748B', marginBottom: '16px' }}>
            Live simulation of WhatsApp, SMS, and Auction notification engine (matching Page 3, 5, 7 client notes).
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {notifications.map((n) => (
              <div key={n.id} style={{ 
                background: n.type === 'whatsapp' ? '#F0FDF4' : '#EFF6FF', 
                border: n.type === 'whatsapp' ? '1px solid #BBF7D0' : '1px solid #BFDBFE', 
                borderRadius: '12px', 
                padding: '14px' 
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ 
                    fontSize: '11px', 
                    fontWeight: 800, 
                    color: n.type === 'whatsapp' ? '#16A34A' : '#2563EB',
                    textTransform: 'uppercase'
                  }}>
                    {n.type === 'whatsapp' ? '💬 WhatsApp Cloud API' : '📱 SMS Gateway'}
                  </span>
                  <span style={{ fontSize: '11px', color: '#94A3B8' }}>{n.timestamp}</span>
                </div>
                <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', marginBottom: '4px' }}>{n.title}</h4>
                <p style={{ fontSize: '13px', color: '#334155', lineHeight: 1.4 }}>{n.message}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-primary" onClick={onClose}>Close Alerts</button>
        </div>
      </div>
    </div>
  );
};
