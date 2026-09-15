import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Gavel, 
  Flame, 
  Clock, 
  Sparkles, 
  AlertTriangle, 
  ShieldAlert, 
  CheckCircle2, 
  TrendingUp, 
  ArrowUpRight, 
  Wallet, 
  PhoneCall, 
  MessageSquare, 
  Timer,
  Info
} from 'lucide-react';

export const BrokerAuctionHub = ({ onSelectCarDetail }) => {
  const { 
    cars, 
    placeBid, 
    currentUser, 
    brokers, 
    triggerNotification 
  } = useApp();

  const [activeCategory, setActiveCategory] = useState('needbuster'); // 'needbuster' | 'bidmaster' | 'cloud'
  const [customBidAmount, setCustomBidAmount] = useState({});

  // Lookup broker profile for current user
  const brokerProfile = brokers.find(b => b.phone === currentUser.phone) || brokers[0];

  // Inactivity check: Client handwritten rule: "Auto generated Reminders for people who have not participated in Bidmaster above 2 days"
  const isInactiveOver2Days = brokerProfile?.lastParticipatedDaysAgo > 2;

  // Filter cars for active auction tab
  const auctionCars = cars.filter(car => car.category === activeCategory);

  const handlePlaceIncrement = (car, incAmount) => {
    const currentHighest = car.highestBid || car.price * 0.9;
    const newBid = currentHighest + incAmount;
    placeBid(car.id, newBid);
  };

  const handleCustomBid = (car) => {
    const amount = customBidAmount[car.id];
    if (!amount || isNaN(amount) || Number(amount) <= (car.highestBid || 0)) {
      alert(`Please enter an amount higher than current highest bid of ₹${(car.highestBid || 0).toLocaleString('en-IN')}`);
      return;
    }
    placeBid(car.id, Number(amount));
    setCustomBidAmount(prev => ({ ...prev, [car.id]: '' }));
  };

  return (
    <div>
      {/* Top Broker Arena Banner */}
      <div className="auction-hub-header">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.12)', padding: '5px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 700, color: '#FDE047', marginBottom: '12px' }}>
              <Gavel size={14} /> Official Channel Partner Bidding Arena
            </div>
            <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>
              Real-Time Automotive Bidding Portal
            </h1>
            <p style={{ color: '#CBD5E1', fontSize: '15px', maxWidth: '650px' }}>
              Welcome, <strong style={{ color: '#FFFFFF' }}>{brokerProfile?.companyName || currentUser.name}</strong>. Access live inventory lots, place instant bids, and secure units directly from fleet intake.
            </p>
          </div>

          {/* Offline Subscription Status Card (per client note: "Subscription of Brokers to this app is offline") */}
          <div style={{ 
            background: 'rgba(255, 255, 255, 0.08)', 
            backdropFilter: 'blur(10px)', 
            border: '1px solid rgba(255, 255, 255, 0.15)', 
            borderRadius: '16px', 
            padding: '16px 20px', 
            minWidth: '260px' 
          }}>
            <div style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
              Broker Membership (Managed Offline)
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span className={`live-pulse-dot ${brokerProfile?.subscriptionStatus === 'active' ? 'green' : ''}`}></span>
              <span style={{ fontSize: '16px', fontWeight: 800, color: brokerProfile?.subscriptionStatus === 'active' ? '#34D399' : '#FBBF24' }}>
                {brokerProfile?.subscriptionStatus === 'active' ? 'Active VIP Partner' : 'Offline Verification Pending'}
              </span>
            </div>
            <div style={{ fontSize: '12px', color: '#CBD5E1' }}>
              Tier: {brokerProfile?.subscriptionType}
            </div>
          </div>
        </div>
      </div>

      {/* Auto-Generated Inactivity Reminder Alert (per client note) */}
      {isInactiveOver2Days && (
        <div style={{ 
          background: '#FEF3C7', 
          border: '1.5px solid #F59E0B', 
          borderRadius: '14px', 
          padding: '14px 20px', 
          marginBottom: '24px',
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <AlertTriangle size={22} color="#D97706" />
            <div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#92400E' }}>
                Automated Inactivity Reminder: No Bids Placed in {brokerProfile.lastParticipatedDaysAgo} Days
              </div>
              <div style={{ fontSize: '12px', color: '#B45309' }}>
                Per AutoVault policy, inactive channel partners risk losing early lot allocations. Participate in today's rounds to retain priority status!
              </div>
            </div>
          </div>
          <button 
            className="btn-primary" 
            style={{ background: '#D97706', padding: '8px 14px', fontSize: '12px' }}
            onClick={() => setActiveCategory('bidmaster')}
          >
            Enter Live BidMaster Round
          </button>
        </div>
      )}

      {/* Bidding Category Switcher (Needbuster, Cloud, Bidmaster) */}
      <div className="auction-categories-nav">
        <button 
          className={`category-tab-btn ${activeCategory === 'needbuster' ? 'active' : ''}`}
          onClick={() => setActiveCategory('needbuster')}
        >
          <Flame size={18} color="#EF4444" />
          <span>Needbuster</span>
          <span style={{ fontSize: '11px', background: '#FEE2E2', color: '#991B1B', padding: '2px 8px', borderRadius: '10px' }}>
            High Demand • Once a Day
          </span>
        </button>

        <button 
          className={`category-tab-btn ${activeCategory === 'cloud' ? 'active' : ''}`}
          onClick={() => setActiveCategory('cloud')}
        >
          <Sparkles size={18} color="#059669" />
          <span>Cloud Stock</span>
          <span style={{ fontSize: '11px', background: '#D1FAE5', color: '#065F46', padding: '2px 8px', borderRadius: '10px' }}>
            24/7 Continuous Bidding
          </span>
        </button>

        <button 
          className={`category-tab-btn ${activeCategory === 'bidmaster' ? 'active' : ''}`}
          onClick={() => setActiveCategory('bidmaster')}
        >
          <Clock size={18} color="#2563EB" />
          <span>BidMaster Auctions</span>
          <span style={{ fontSize: '11px', background: '#DBEAFE', color: '#1E40AF', padding: '2px 8px', borderRadius: '10px' }}>
            2-3 Times a Day
          </span>
        </button>
      </div>

      {/* Category Description Bar */}
      <div style={{ 
        background: '#FFFFFF', 
        border: '1px solid #E2E8F0', 
        borderRadius: '12px', 
        padding: '12px 18px', 
        fontSize: '13px', 
        color: '#475569', 
        marginBottom: '22px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
        <Info size={16} color="#FF5722" />
        {activeCategory === 'needbuster' && (
          <span><strong>Needbuster Category:</strong> Prime, fast-moving inventory open once per day. Top bidder secures right of first acceptance.</span>
        )}
        {activeCategory === 'cloud' && (
          <span><strong>Cloud Category:</strong> Browse and bid anytime around the clock across all old car inventory lots.</span>
        )}
        {activeCategory === 'bidmaster' && (
          <span><strong>BidMaster Category:</strong> Rapid scheduled flash bidding sessions running 2 to 3 times every day with immediate acceptance calls.</span>
        )}
      </div>

      {/* Auction Inventory Grid */}
      <div className="cars-grid">
        {auctionCars.map(car => {
          const currentHigh = car.highestBid || car.price * 0.9;
          const isNearAcceptance = car.reservePrice && (car.reservePrice - currentHigh <= 30000) && (currentHigh < car.reservePrice);
          const isAccepted = car.status === 'accepted';

          return (
            <div key={car.id} className="car-card" style={{ borderColor: isNearAcceptance ? '#F59E0B' : '#E2E8F0' }}>
              {/* Image & Lot Tag */}
              <div className="car-card-img-wrapper">
                <img src={car.images[0]} alt={car.model} className="car-card-img" />
                <span className={`car-badge-pill ${car.category}`}>
                  {car.auctionRound}
                </span>

                <div className="inspection-score-badge">
                  <ShieldAlert size={14} color="#10B981" />
                  <span>{car.inspectionScore} / 10 Inspection</span>
                </div>
              </div>

              {/* Body */}
              <div className="car-card-body">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748B' }}>{car.regNumber}</span>
                  <span style={{ fontSize: '11px', color: '#EF4444', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Timer size={13} /> Closes in 45m
                  </span>
                </div>

                <h3 className="car-title">{car.make} {car.model} ({car.year})</h3>
                <div className="car-specs-row">
                  <span>{car.mileage.toLocaleString('en-IN')} km</span>
                  <span className="spec-dot-divider"></span>
                  <span>{car.fuel}</span>
                  <span className="spec-dot-divider"></span>
                  <span>{car.transmission}</span>
                </div>

                {/* Near Acceptance Reminder Banner (per client note!) */}
                {isNearAcceptance && (
                  <div style={{
                    background: '#FFFBEB',
                    border: '1px solid #FCD34D',
                    borderRadius: '8px',
                    padding: '8px 10px',
                    fontSize: '11px',
                    fontWeight: 700,
                    color: '#92400E',
                    marginBottom: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <TrendingUp size={14} color="#D97706" />
                    <span>🔥 Bid is near seller acceptance! Add funds to close deal.</span>
                  </div>
                )}

                {/* Accepted Status */}
                {isAccepted && (
                  <div style={{
                    background: '#ECFDF5',
                    border: '1px solid #A7F3D0',
                    borderRadius: '8px',
                    padding: '8px 10px',
                    fontSize: '12px',
                    fontWeight: 800,
                    color: '#065F46',
                    marginBottom: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <CheckCircle2 size={16} color="#059669" />
                    <span>BID ACCEPTED BY OWNER! Dispatch pending.</span>
                  </div>
                )}

                {/* Bidding Control Panel */}
                <div style={{ background: '#F8FAFC', padding: '14px', borderRadius: '12px', border: '1px solid #E2E8F0', marginTop: 'auto' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '12px', color: '#64748B' }}>Current Highest:</span>
                    <span style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
                      ₹{currentHigh.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {/* Quick Bid Increment Buttons */}
                  <div className="bid-increment-pills">
                    <button 
                      className="bid-inc-btn" 
                      onClick={() => handlePlaceIncrement(car, 5000)}
                      disabled={isAccepted}
                    >
                      +₹5,000
                    </button>
                    <button 
                      className="bid-inc-btn" 
                      onClick={() => handlePlaceIncrement(car, 10000)}
                      disabled={isAccepted}
                    >
                      +₹10,000
                    </button>
                    <button 
                      className="bid-inc-btn" 
                      onClick={() => handlePlaceIncrement(car, 25000)}
                      disabled={isAccepted}
                    >
                      +₹25,000
                    </button>
                  </div>

                  {/* Custom Bid Input */}
                  <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                    <input 
                      type="number"
                      placeholder={`Min ₹${(currentHigh + 5000).toLocaleString('en-IN')}`}
                      value={customBidAmount[car.id] || ''}
                      onChange={e => setCustomBidAmount({ ...customBidAmount, [car.id]: e.target.value })}
                      style={{
                        flex: 1,
                        padding: '8px 10px',
                        borderRadius: '8px',
                        border: '1px solid #CBD5E1',
                        fontSize: '12px',
                        outline: 'none'
                      }}
                      disabled={isAccepted}
                    />
                    <button 
                      className="btn-primary" 
                      style={{ padding: '8px 14px', fontSize: '12px' }}
                      onClick={() => handleCustomBid(car)}
                      disabled={isAccepted}
                    >
                      Place Bid
                    </button>
                  </div>
                </div>

                {/* Bidding History Preview */}
                {car.bids && car.bids.length > 0 && (
                  <div style={{ marginTop: '12px', fontSize: '11px', color: '#64748B' }}>
                    <span style={{ fontWeight: 600 }}>Recent Bids: </span>
                    {car.bids.slice(0, 2).map((b, i) => (
                      <span key={i} style={{ marginRight: '8px' }}>
                        {b.brokerName.split(' ')[0]}: ₹{(b.amount / 100000).toFixed(2)}L
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
