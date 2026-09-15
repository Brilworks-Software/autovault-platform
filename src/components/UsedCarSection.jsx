import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Search, 
  Filter, 
  Heart, 
  PhoneCall, 
  Fuel, 
  Gauge, 
  Sparkles, 
  ShieldCheck, 
  Gavel, 
  CheckCircle2, 
  Flame, 
  Clock, 
  SlidersHorizontal,
  ChevronRight,
  Eye
} from 'lucide-react';

export const UsedCarSection = ({ onSelectCarDetail, onCallDealer }) => {
  const { 
    cars, 
    wishlist, 
    toggleWishlist, 
    currentRole, 
    setActiveTab, 
    setIsOtpModalOpen 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all'); // 'all' | 'needbuster' | 'cloud' | 'bidmaster'
  const [selectedFuel, setSelectedFuel] = useState('all');
  const [selectedTransmission, setSelectedTransmission] = useState('all');

  const filteredCars = cars.filter(car => {
    const matchesSearch = car.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          car.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          car.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || car.category === selectedCategory;
    const matchesFuel = selectedFuel === 'all' || car.fuel.toLowerCase() === selectedFuel.toLowerCase();
    const matchesTrans = selectedTransmission === 'all' || car.transmission.toLowerCase() === selectedTransmission.toLowerCase();

    return matchesSearch && matchesCategory && matchesFuel && matchesTrans;
  });

  return (
    <div>
      {/* Header & Category Filter Banner */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px', marginBottom: '16px' }}>
          <div>
            <h1 style={{ fontSize: '30px', color: '#0F172A', marginBottom: '6px' }}>
              Certified Pre-Owned Cars
            </h1>
            <p style={{ color: '#64748B', fontSize: '15px' }}>
              AutoVault Certified Assured • 200-Point Inspection • 1-Year Warranty Included
            </p>
          </div>

          {/* Broker Auction Portal Banner */}
          {currentRole === 'broker' ? (
            <div style={{ 
              background: 'linear-gradient(135deg, #1E1B4B 0%, #312E81 100%)', 
              color: '#FFFFFF', 
              padding: '12px 20px', 
              borderRadius: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              boxShadow: '0 4px 15px rgba(49, 46, 129, 0.3)'
            }}>
              <div>
                <div style={{ fontSize: '11px', color: '#A5B4FC', fontWeight: 700, textTransform: 'uppercase' }}>
                  Channel Partner Portal Active
                </div>
                <div style={{ fontSize: '14px', fontWeight: 700 }}>
                  Live Bidding is Unlocked for You
                </div>
              </div>
              <button 
                className="btn-primary"
                style={{ background: '#F59E0B', color: '#0F172A', fontWeight: 700, padding: '8px 14px', fontSize: '13px' }}
                onClick={() => setActiveTab('auctions')}
              >
                Go to Auction Hub <ChevronRight size={14} />
              </button>
            </div>
          ) : (
            <button 
              className="btn-secondary"
              onClick={() => setIsOtpModalOpen(true)}
              style={{ borderColor: '#CBD5E1' }}
            >
              <Gavel size={16} color="#FF5722" /> Broker / Channel Partner Login
            </button>
          )}
        </div>

        {/* Client's 3 Bidding / Stock Categories Filter Bar */}
        <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '8px' }}>
          <button 
            className={`category-tab-btn ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('all')}
          >
            All Available Stock ({cars.length})
          </button>
          <button 
            className={`category-tab-btn ${selectedCategory === 'needbuster' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('needbuster')}
            style={selectedCategory === 'needbuster' ? { background: '#EF4444', borderColor: '#EF4444' } : {}}
          >
            <Flame size={16} color={selectedCategory === 'needbuster' ? '#FFF' : '#EF4444'} />
            Needbuster (High Demand • 1/Day)
          </button>
          <button 
            className={`category-tab-btn ${selectedCategory === 'bidmaster' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('bidmaster')}
            style={selectedCategory === 'bidmaster' ? { background: '#2563EB', borderColor: '#2563EB' } : {}}
          >
            <Clock size={16} color={selectedCategory === 'bidmaster' ? '#FFF' : '#2563EB'} />
            BidMaster (Live Auction • 2-3x/Day)
          </button>
          <button 
            className={`category-tab-btn ${selectedCategory === 'cloud' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('cloud')}
            style={selectedCategory === 'cloud' ? { background: '#059669', borderColor: '#059669' } : {}}
          >
            <Sparkles size={16} color={selectedCategory === 'cloud' ? '#FFF' : '#059669'} />
            Cloud (Continuous 24/7 Stock)
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div style={{ 
        background: '#FFFFFF', 
        padding: '16px 20px', 
        borderRadius: '16px', 
        border: '1px solid #E2E8F0',
        marginBottom: '26px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        flexWrap: 'wrap'
      }}>
        <div style={{ flex: 1, minWidth: '240px', display: 'flex', alignItems: 'center', gap: '10px', background: '#F8FAFC', padding: '10px 14px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
          <Search size={18} color="#94A3B8" />
          <input 
            type="text"
            placeholder="Search by Make, Model (Creta, City, Nexon...) or City..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '14px' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <select 
            value={selectedFuel} 
            onChange={e => setSelectedFuel(e.target.value)}
            style={{ padding: '10px 14px', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '13px', background: '#FFFFFF', cursor: 'pointer', outline: 'none' }}
          >
            <option value="all">All Fuel Types</option>
            <option value="petrol">Petrol</option>
            <option value="diesel">Diesel</option>
            <option value="electric">Electric (EV)</option>
          </select>

          <select 
            value={selectedTransmission} 
            onChange={e => setSelectedTransmission(e.target.value)}
            style={{ padding: '10px 14px', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '13px', background: '#FFFFFF', cursor: 'pointer', outline: 'none' }}
          >
            <option value="all">All Transmissions</option>
            <option value="automatic">Automatic</option>
            <option value="manual">Manual</option>
          </select>
        </div>
      </div>

      {/* Cars Grid */}
      {filteredCars.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', background: '#FFFFFF', borderRadius: '18px', border: '1px solid #E2E8F0' }}>
          <p style={{ fontSize: '18px', fontWeight: 600, color: '#475569', marginBottom: '8px' }}>No vehicles matched your filters</p>
          <button className="btn-secondary" onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setSelectedFuel('all'); setSelectedTransmission('all'); }}>
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="cars-grid">
          {filteredCars.map(car => {
            const isWishlisted = wishlist.includes(car.id);

            return (
              <div key={car.id} className="car-card card-hover-lift">
                {/* Image Section */}
                <div className="car-card-img-wrapper">
                  <img src={car.images[0]} alt={car.model} className="car-card-img" />
                  
                  {/* Category Pill */}
                  <span className={`car-badge-pill ${car.category}`}>
                    {car.category === 'needbuster' && '🔥 Needbuster'}
                    {car.category === 'bidmaster' && '⏱️ BidMaster'}
                    {car.category === 'cloud' && '☁️ Cloud Stock'}
                  </span>

                  {/* Heart / Wishlist Button (as handwritten by client) */}
                  <button 
                    className={`heart-btn ${isWishlisted ? 'active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(car.id);
                    }}
                    title="Express interest (Heart)"
                  >
                    <Heart size={18} fill={isWishlisted ? '#EF4444' : 'none'} />
                  </button>

                  {/* Inspection Score */}
                  <div className="inspection-score-badge">
                    <ShieldCheck size={14} color="#10B981" />
                    <span>{car.inspectionScore} / 10 Inspection</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="car-card-body">
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '2px' }}>
                    {car.year} • {car.location}
                  </div>
                  <h3 className="car-title">{car.make} {car.model}</h3>

                  <div className="car-specs-row">
                    <span>{car.mileage.toLocaleString('en-IN')} km</span>
                    <span className="spec-dot-divider"></span>
                    <span>{car.fuel}</span>
                    <span className="spec-dot-divider"></span>
                    <span>{car.transmission}</span>
                    <span className="spec-dot-divider"></span>
                    <span>{car.owners} Owner</span>
                  </div>

                  {/* Bidding indicator for brokers */}
                  {car.bids && car.bids.length > 0 && (
                    <div style={{ 
                      background: '#FFF7ED', 
                      border: '1px solid #FFEDD5', 
                      borderRadius: '8px', 
                      padding: '6px 10px', 
                      fontSize: '12px', 
                      color: '#C2410C', 
                      fontWeight: 600,
                      marginBottom: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      <span>Highest Bid: ₹{car.highestBid.toLocaleString('en-IN')}</span>
                      <span>({car.bids.length} bids)</span>
                    </div>
                  )}

                  {/* Price Row */}
                  <div className="car-pricing-row">
                    <div>
                      <div style={{ fontSize: '11px', color: '#64748B' }}>Fixed Price</div>
                      <div className="price-main">₹{car.price.toLocaleString('en-IN')}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '10px', color: '#10B981', fontWeight: 700 }}>₹{Math.round(car.price / 60).toLocaleString('en-IN')}/mo EMI</div>
                      <div style={{ fontSize: '10px', color: '#94A3B8' }}>Zero Downpayment</div>
                    </div>
                  </div>

                  {/* Actions: Direct Call & Heart/Bid */}
                  <div className="car-card-actions">
                    <button 
                      className="btn-secondary" 
                      style={{ padding: '8px 10px', fontSize: '13px', justifyContent: 'center' }}
                      onClick={() => onCallDealer(car)}
                    >
                      <PhoneCall size={14} color="#FF5722" /> Call Us
                    </button>

                    {currentRole === 'broker' ? (
                      <button 
                        className="btn-primary"
                        style={{ padding: '8px 10px', fontSize: '13px', justifyContent: 'center', background: '#0F172A' }}
                        onClick={() => setActiveTab('auctions')}
                      >
                        <Gavel size={14} /> Bid Now
                      </button>
                    ) : (
                      <button 
                        className="btn-primary"
                        style={{ padding: '8px 10px', fontSize: '13px', justifyContent: 'center' }}
                        onClick={() => onSelectCarDetail(car)}
                      >
                        <Eye size={14} /> View Details
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
