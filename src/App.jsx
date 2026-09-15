import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { MobileNav } from './components/MobileNav';
import { HomePage, InsurancePage } from './components/StaticPages';
import { UsedCarSection } from './components/UsedCarSection';
import { BrokerAuctionHub } from './components/BrokerAuctionHub';
import { CarServiceModule } from './components/CarServiceModule';
import { NewCarSection } from './components/NewCarSection';
import { AdminPanels } from './components/AdminPanels';
import { 
  OtpLoginModal 
} from './components/OtpLoginModal';
import { 
  CallDealerModal, 
  CarDetailModal, 
  BrochureModal, 
  ReceiptModal, 
  NotificationModal 
} from './components/Modals';
import './App.css';

const MainAppContent = () => {
  const { 
    activeTab, 
    setActiveTab, 
    isCallModalOpen, 
    setIsCallModalOpen, 
    selectedCarForCall, 
    setSelectedCarForCall, 
    selectedCarDetail, 
    setSelectedCarDetail,
    activeReceipt,
    setActiveReceipt
  } = useApp();

  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [selectedBrochureCar, setSelectedBrochureCar] = useState(null);

  return (
    <div className="app-container">
      {/* Top Navbar */}
      <Navbar onOpenNotifications={() => setIsNotificationOpen(true)} />

      {/* Main Content Area */}
      <main className="main-content">
        {activeTab === 'home' && (
          <HomePage 
            onExploreCars={() => setActiveTab('used-cars')}
            onBookService={() => setActiveTab('service')}
            onOpenAuctions={() => setActiveTab('auctions')}
          />
        )}

        {activeTab === 'used-cars' && (
          <UsedCarSection 
            onSelectCarDetail={(car) => setSelectedCarDetail(car)}
            onCallDealer={(car) => {
              setSelectedCarForCall(car);
              setIsCallModalOpen(true);
            }}
          />
        )}

        {activeTab === 'auctions' && (
          <BrokerAuctionHub 
            onSelectCarDetail={(car) => setSelectedCarDetail(car)}
          />
        )}

        {activeTab === 'service' && (
          <CarServiceModule />
        )}

        {activeTab === 'new-cars' && (
          <NewCarSection 
            onOpenBrochure={(car) => setSelectedBrochureCar(car)}
          />
        )}

        {activeTab === 'insurance' && (
          <InsurancePage />
        )}

        {activeTab === 'admin-panel' && (
          <AdminPanels />
        )}
      </main>

      {/* Global Modals */}
      <OtpLoginModal />

      {isCallModalOpen && (
        <CallDealerModal 
          car={selectedCarForCall} 
          onClose={() => setIsCallModalOpen(false)} 
        />
      )}

      {selectedCarDetail && (
        <CarDetailModal 
          car={selectedCarDetail} 
          onClose={() => setSelectedCarDetail(null)}
          onCall={(car) => {
            setSelectedCarDetail(null);
            setSelectedCarForCall(car);
            setIsCallModalOpen(true);
          }}
          onBid={() => {
            setSelectedCarDetail(null);
            setActiveTab('auctions');
          }}
        />
      )}

      {selectedBrochureCar && (
        <BrochureModal 
          car={selectedBrochureCar} 
          onClose={() => setSelectedBrochureCar(null)} 
        />
      )}

      {activeReceipt && (
        <ReceiptModal 
          receipt={activeReceipt} 
          onClose={() => setActiveReceipt(null)} 
        />
      )}

      {isNotificationOpen && (
        <NotificationModal 
          onClose={() => setIsNotificationOpen(false)} 
        />
      )}

      {/* Mobile Bottom Navigation */}
      <MobileNav />

      {/* Footer */}
      <footer style={{ background: '#0F172A', color: '#94A3B8', padding: '48px 20px 80px 20px', borderTop: '1px solid #1E293B', marginTop: 'auto' }}>
        <div style={{ maxWidth: '1380px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '32px', marginBottom: '32px' }}>
          <div>
            <div style={{ fontSize: '22px', fontWeight: 800, color: '#FFFFFF', marginBottom: '10px' }}>
              Auto<span style={{ color: '#FF5722' }}>Vault</span>
            </div>
            <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#94A3B8' }}>
              Next-generation digital automotive platform. Delivering transparent online buying, high-frequency live dealer bidding, and certified doorstep workshop care.
            </p>
          </div>

          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '15px', marginBottom: '12px' }}>Marketplace & Hubs</h4>
            <ul style={{ listStyle: 'none', fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>Certified Pre-Owned Cars</li>
              <li>New Car ₹21,000 Token Booking</li>
              <li>Doorstep 7-Stage Service Tracker</li>
              <li>Zero-Depreciation Insurance</li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '15px', marginBottom: '12px' }}>Channel Partners</h4>
            <ul style={{ listStyle: 'none', fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>Needbuster Daily Flash Auctions</li>
              <li>Cloud Stock 24/7 Bidding</li>
              <li>BidMaster 2-3x Daily Sessions</li>
              <li>Offline Broker Subscriptions</li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '15px', marginBottom: '12px' }}>Operations & Safety</h4>
            <p style={{ fontSize: '13px', lineHeight: 1.6 }}>
              Central Hotline: <strong>+91 11 4900 1200</strong><br />
              Email: <strong>partners@autovault.in</strong><br />
              All pre-owned vehicles backed by 1-Year Comprehensive Warranty and 7-Day Money Back Guarantee.
            </p>
          </div>
        </div>

        <div style={{ maxWidth: '1380px', margin: '0 auto', paddingTop: '24px', borderTop: '1px solid #1E293B', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', fontSize: '12px' }}>
          <div>© 2026 AutoVault India Technologies Pvt. Ltd. All rights reserved.</div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span>Option A: Auction MVP</span>
            <span>•</span>
            <span>Option B: + Service Pipeline</span>
            <span>•</span>
            <span>Option C: Full Platform</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
