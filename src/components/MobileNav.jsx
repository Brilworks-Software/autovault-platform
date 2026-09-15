import React from 'react';
import { useApp } from '../context/AppContext';
import { Home, Car, Gavel, Wrench, Sparkles } from 'lucide-react';

export const MobileNav = () => {
  const { activeTab, setActiveTab, currentRole, setIsOtpModalOpen } = useApp();

  return (
    <div className="mobile-bottom-nav">
      <button 
        className={`mobile-nav-item ${activeTab === 'home' ? 'active' : ''}`}
        onClick={() => setActiveTab('home')}
      >
        <Home size={20} />
        <span>Home</span>
      </button>

      <button 
        className={`mobile-nav-item ${activeTab === 'used-cars' ? 'active' : ''}`}
        onClick={() => setActiveTab('used-cars')}
      >
        <Car size={20} />
        <span>Used Cars</span>
      </button>

      <button 
        className={`mobile-nav-item ${activeTab === 'auctions' ? 'active' : ''}`}
        onClick={() => {
          if (currentRole === 'customer') {
            setIsOtpModalOpen(true);
          } else {
            setActiveTab('auctions');
          }
        }}
      >
        <Gavel size={20} />
        <span>Auctions</span>
      </button>

      <button 
        className={`mobile-nav-item ${activeTab === 'service' ? 'active' : ''}`}
        onClick={() => setActiveTab('service')}
      >
        <Wrench size={20} />
        <span>Service</span>
      </button>

      <button 
        className={`mobile-nav-item ${activeTab === 'new-cars' ? 'active' : ''}`}
        onClick={() => setActiveTab('new-cars')}
      >
        <Sparkles size={20} />
        <span>New Cars</span>
      </button>
    </div>
  );
};
