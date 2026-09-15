import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Smartphone, ShieldCheck, CheckCircle2, ArrowRight, UserCheck } from 'lucide-react';

export const OtpLoginModal = () => {
  const { isOtpModalOpen, setIsOtpModalOpen, loginWithOtp, currentUser } = useApp();
  const [phoneNumber, setPhoneNumber] = useState('9876543210');
  const [step, setStep] = useState('phone'); // 'phone' | 'otp'
  const [otpCode, setOtpCode] = useState(['5', '8', '2', '1']);
  const [selectedPersona, setSelectedPersona] = useState('broker');

  if (!isOtpModalOpen) return null;

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (phoneNumber.length < 10) {
      alert('Please enter a valid 10-digit mobile number');
      return;
    }
    setStep('otp');
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    // Resolve role based on selected demo persona or phone pattern
    let role = 'customer';
    let name = 'Verified User';

    if (selectedPersona === 'broker' || phoneNumber === '9876543210' || phoneNumber === '9811223344') {
      role = 'broker';
      name = 'Rajesh Malhotra (Channel Partner)';
    } else if (selectedPersona === 'employee' || phoneNumber === '9833001100') {
      role = 'employee';
      name = 'Vikrant Deshmukh (Inspector)';
    } else if (selectedPersona === 'master' || phoneNumber === '9999999999') {
      role = 'master';
      name = 'Kabir Singhal (Master Owner)';
    } else {
      name = 'Ananya Verma (Car Buyer)';
    }

    loginWithOtp(phoneNumber, role, name);
  };

  const selectPersona = (pRole, pPhone, pName) => {
    setSelectedPersona(pRole);
    setPhoneNumber(pPhone);
    setStep('otp');
  };

  return (
    <div className="modal-overlay" onClick={() => setIsOtpModalOpen(false)}>
      <div className="modal-card" style={{ maxWidth: '440px' }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Smartphone size={20} color="#FF5722" />
            <h3 style={{ fontSize: '18px' }}>Login via OTP</h3>
          </div>
          <button 
            onClick={() => setIsOtpModalOpen(false)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}
          >
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <p style={{ fontSize: '13px', color: '#64748B', marginBottom: '18px' }}>
            {step === 'phone' 
              ? 'Enter your mobile number to receive a secure 4-digit One-Time Password.' 
              : `OTP code sent to +91 ${phoneNumber}. (Auto-filled for demonstration)`}
          </p>

          {step === 'phone' ? (
            <form onSubmit={handleSendOtp}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
                  Mobile Number
                </label>
                <div style={{ display: 'flex', border: '1.5px solid #CBD5E1', borderRadius: '10px', overflow: 'hidden' }}>
                  <span style={{ background: '#F1F5F9', padding: '12px 14px', fontSize: '14px', fontWeight: 600, color: '#475569' }}>
                    +91
                  </span>
                  <input 
                    type="tel"
                    maxLength={10}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter 10-digit number"
                    style={{ flex: 1, border: 'none', outline: 'none', padding: '12px 14px', fontSize: '15px' }}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '12px' }}>
                Get OTP <ArrowRight size={16} />
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp}>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', margin: '20px 0 24px 0' }}>
                {otpCode.map((digit, idx) => (
                  <input 
                    key={idx}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => {
                      const newOtp = [...otpCode];
                      newOtp[idx] = e.target.value;
                      setOtpCode(newOtp);
                    }}
                    style={{
                      width: '54px',
                      height: '56px',
                      textAlign: 'center',
                      fontSize: '22px',
                      fontWeight: 800,
                      borderRadius: '12px',
                      border: '2px solid #FF5722',
                      background: '#FFF3E0',
                      color: '#0F172A',
                      outline: 'none'
                    }}
                  />
                ))}
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '13px' }}>
                Verify & Continue <ShieldCheck size={18} />
              </button>
            </form>
          )}

          {/* Quick Persona Switcher for Stakeholder / Pair Review */}
          <div style={{ marginTop: '24px', paddingTop: '18px', borderTop: '1px dashed #E2E8F0' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '10px' }}>
              ⚡ Instant Demo Profiles:
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <button 
                type="button"
                className="btn-secondary"
                style={{ fontSize: '11px', padding: '8px 10px', justifyContent: 'flex-start' }}
                onClick={() => selectPersona('broker', '9876543210', 'Rajesh Malhotra')}
              >
                <span>🤝 Broker / Partner</span>
              </button>
              <button 
                type="button"
                className="btn-secondary"
                style={{ fontSize: '11px', padding: '8px 10px', justifyContent: 'flex-start' }}
                onClick={() => selectPersona('customer', '9871100223', 'Ananya Verma')}
              >
                <span>👤 Customer Buyer</span>
              </button>
              <button 
                type="button"
                className="btn-secondary"
                style={{ fontSize: '11px', padding: '8px 10px', justifyContent: 'flex-start' }}
                onClick={() => selectPersona('employee', '9833001100', 'Vikrant Inspector')}
              >
                <span>📋 Employee Uploader</span>
              </button>
              <button 
                type="button"
                className="btn-secondary"
                style={{ fontSize: '11px', padding: '8px 10px', justifyContent: 'flex-start' }}
                onClick={() => selectPersona('master', '9999999999', 'Kabir Singhal (Owner)')}
              >
                <span>👑 Master / Owner</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
