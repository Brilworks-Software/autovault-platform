import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Car,
  Wrench,
  Sparkles,
  ShieldCheck,
  Gavel,
  LayoutDashboard,
  Heart,
  Bell,
  User,
  PhoneCall,
  Layers,
  ChevronDown,
  LogOut,
  SlidersHorizontal,
  Home
} from 'lucide-react';

export const Navbar = ({ onOpenNotifications }) => {
  const {
    optionTier,
    setOptionTier,
    currentRole,
    setCurrentRole,
    currentUser,
    activeTab,
    setActiveTab,
    wishlist,
    notifications,
    setIsOtpModalOpen,
    logout,
    loginWithOtp
  } = useApp();

  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="header-wrapper">
      {/* Top Demo Tier & Role Switcher Bar */}
      <div className="top-demo-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: '#94A3B8' }}>
            <Layers size={14} color="#FF5722" /> Client Proposal Scope:
          </span>
          <div className="tier-selector">
            <button
              className={`tier-btn ${optionTier === 'A' ? 'active' : ''}`}
              onClick={() => setOptionTier('A')}
              title="Option A: Old Car & Bidding Dynamic only. Everything else static."
            >
              Option A (Auction MVP)
            </button>
            <button
              className={`tier-btn ${optionTier === 'B' ? 'active' : ''}`}
              onClick={() => setOptionTier('B')}
              title="Option B: Adds 7-Stage Dynamic Car Service Pipeline"
            >
              Option B (+ Service)
            </button>
            <button
              className={`tier-btn ${optionTier === 'C' ? 'active' : ''}`}
              onClick={() => setOptionTier('C')}
              title="Option C: Full Suite (+ New Car ₹21k Online Token Booking)"
            >
              Option C (Full Suite)
            </button>
          </div>
        </div>

        {/* Role Quick Switcher for Pair Demo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ color: '#94A3B8', fontSize: '11px' }}>Current View:</span>
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
              style={{
                background: '#1E293B',
                color: '#F8FAFC',
                border: '1px solid #334155',
                padding: '4px 10px',
                borderRadius: '8px',
                fontSize: '11px',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer'
              }}
            >
              <span className={`role-tag ${currentRole}`}>{currentRole}</span>
              <span>{currentUser.name.split(' ')[0]}</span>
              <ChevronDown size={12} />
            </button>

            {isRoleDropdownOpen && (
              <div style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: '6px',
                background: '#1E293B',
                border: '1px solid #334155',
                borderRadius: '10px',
                padding: '8px',
                minWidth: '220px',
                zIndex: 1000,
                boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
              }}>
                <div style={{ padding: '6px 8px', fontSize: '10px', color: '#94A3B8', textTransform: 'uppercase', fontWeight: 700 }}>
                  Switch Demo Persona:
                </div>
                <button
                  style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', color: '#F8FAFC', padding: '8px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                  onClick={() => { loginWithOtp('9871100223', 'customer', 'Ananya Verma'); setIsRoleDropdownOpen(false); }}
                >
                  <span>👤 Customer / Buyer</span>
                  <span className="role-tag customer">Client</span>
                </button>
                <button
                  style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', color: '#F8FAFC', padding: '8px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                  onClick={() => { loginWithOtp('9876543210', 'broker', 'Rajesh Malhotra'); setIsRoleDropdownOpen(false); }}
                >
                  <span>🤝 Broker / Partner</span>
                  <span className="role-tag broker">Bidding</span>
                </button>
                <button
                  style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', color: '#F8FAFC', padding: '8px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                  onClick={() => { loginWithOtp('9833001100', 'employee', 'Vikrant (Inspector)'); setIsRoleDropdownOpen(false); }}
                >
                  <span>📋 Employee (Upload)</span>
                  <span className="role-tag employee">No Delete</span>
                </button>
                <button
                  style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', color: '#F8FAFC', padding: '8px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                  onClick={() => { loginWithOtp('9999999999', 'master', 'Kabir Singhal (Owner)'); setIsRoleDropdownOpen(false); }}
                >
                  <span>👑 Master / Owner</span>
                  <span className="role-tag master">Full Admin</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="navbar-main">
        {/* Brand Logo */}
        <div className="brand-logo" onClick={() => setActiveTab('home')}>
          <div className="brand-icon-box">
            <Car size={24} />
          </div>
          <div>
            <div className="brand-name">Auto<span>Vault</span></div>
            <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 600, letterSpacing: '0.2px' }}>
              Automotive Platform
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav>
          <ul className="nav-links">
            <li>
              <button
                className={`nav-link-btn ${activeTab === 'home' ? 'active' : ''}`}
                onClick={() => setActiveTab('home')}
              >
                <Home size={16} /> Home
              </button>
            </li>
            <li>
              <button
                className={`nav-link-btn ${activeTab === 'used-cars' ? 'active' : ''}`}
                onClick={() => setActiveTab('used-cars')}
              >
                <Car size={16} /> Used Cars
              </button>
            </li>

            {/* Broker Auction Section (Dynamic in All options per client note) */}
            <li>
              <button
                className={`nav-link-btn ${activeTab === 'auctions' ? 'active' : ''}`}
                onClick={() => {
                  if (currentRole === 'customer') {
                    // Prompt OTP modal for Broker Login
                    setIsOtpModalOpen(true);
                  } else {
                    setActiveTab('auctions');
                  }
                }}
              >
                <Gavel size={16} /> Broker Bidding
                <span className="live-pulse-dot" style={{ width: '7px', height: '7px' }}></span>
              </button>
            </li>

            {/* Car Service Tracking Module (Option B & C dynamic) */}
            <li>
              <button
                className={`nav-link-btn ${activeTab === 'service' ? 'active' : ''}`}
                onClick={() => setActiveTab('service')}
              >
                <Wrench size={16} /> Car Service
                {optionTier === 'A' && <span className="static-pill">Static</span>}
              </button>
            </li>

            {/* New Car Booking Module (Option C dynamic) */}
            <li>
              <button
                className={`nav-link-btn ${activeTab === 'new-cars' ? 'active' : ''}`}
                onClick={() => setActiveTab('new-cars')}
              >
                <Sparkles size={16} /> New Cars (₹21k Token)
                {optionTier !== 'C' && <span className="static-pill">Static</span>}
              </button>
            </li>

            {/* Insurance Section (Static in all options) */}
            <li>
              <button
                className={`nav-link-btn ${activeTab === 'insurance' ? 'active' : ''}`}
                onClick={() => setActiveTab('insurance')}
              >
                <ShieldCheck size={16} /> Insurance
                <span className="static-pill">Static</span>
              </button>
            </li>

            {/* Admin / Employee Panels */}
            {(currentRole === 'employee' || currentRole === 'master') && (
              <li>
                <button
                  className={`nav-link-btn ${activeTab === 'admin-panel' ? 'active' : ''}`}
                  onClick={() => setActiveTab('admin-panel')}
                >
                  <LayoutDashboard size={16} /> {currentRole === 'master' ? 'Owner Admin' : 'Employee Hub'}
                </button>
              </li>
            )}
          </ul>
        </nav>

        {/* Right Actions */}
        <div className="navbar-actions">
          {/* Wishlist button */}
          <button
            className="icon-btn-circle"
            title="Wishlisted Cars"
            onClick={() => setActiveTab('used-cars')}
          >
            <Heart size={18} />
            {wishlist.length > 0 && <span className="badge-counter">{wishlist.length}</span>}
          </button>

          {/* Notifications Simulator (SMS / WhatsApp) */}
          <button
            className="icon-btn-circle"
            title="SMS & WhatsApp Alerts"
            onClick={onOpenNotifications}
          >
            <Bell size={18} />
            {unreadCount > 0 && <span className="badge-counter">{unreadCount}</span>}
          </button>

          {/* Role / Login Button */}
          {currentUser.phone ? (
            <button
              className="btn-secondary"
              style={{ padding: '8px 14px', fontSize: '13px' }}
              onClick={() => setIsOtpModalOpen(true)}
            >
              <User size={15} />
              <span>{currentUser.name.split(' ')[0]}</span>
            </button>
          ) : (
            <button
              className="btn-primary"
              onClick={() => setIsOtpModalOpen(true)}
            >
              <User size={15} /> OTP Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
