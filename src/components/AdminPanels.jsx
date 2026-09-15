import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  LayoutDashboard, 
  Upload, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  XCircle, 
  Users, 
  TrendingUp, 
  BarChart3, 
  Lock, 
  ShieldCheck, 
  PlusCircle, 
  Gavel, 
  Phone, 
  FileText,
  AlertCircle
} from 'lucide-react';

export const AdminPanels = () => {
  const { 
    cars, 
    addCar, 
    updateCar, 
    deleteCar, 
    acceptBid, 
    currentRole, 
    setCurrentRole, 
    brokers, 
    updateBrokerSubscription 
  } = useApp();

  const [activeAdminTab, setActiveAdminTab] = useState('inventory'); // 'inventory' | 'bids' | 'stats' | 'brokers'
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New car upload form state
  const [make, setMake] = useState('Maruti Suzuki');
  const [model, setModel] = useState('Brezza ZXi Plus AT');
  const [year, setYear] = useState(2022);
  const [regNumber, setRegNumber] = useState('DL-08-CZ-3311');
  const [mileage, setMileage] = useState(24000);
  const [fuel, setFuel] = useState('Petrol');
  const [transmission, setTransmission] = useState('Automatic');
  const [price, setPrice] = useState(980000);
  const [reservePrice, setReservePrice] = useState(940000);
  const [category, setCategory] = useState('bidmaster');
  const [inspectionScore, setInspectionScore] = useState(9.2);
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1000&q=80');
  const [videoUrl, setVideoUrl] = useState('https://raw.githubusercontent.com/intel-iot-devkit/sample-videos/master/car-detection.mp4');

  const handleUploadCar = (e) => {
    e.preventDefault();
    addCar({
      make,
      model,
      year: Number(year),
      regNumber: regNumber.toUpperCase(),
      mileage: Number(mileage),
      fuel,
      transmission,
      owners: 1,
      location: 'Delhi Regional Hub',
      price: Number(price),
      reservePrice: Number(reservePrice),
      category,
      inspectionScore: Number(inspectionScore),
      images: [imageUrl],
      videoUrl,
      features: ['Touchscreen', 'Alloy Wheels', 'Rear Camera', 'Cruise Control']
    });

    setIsAddModalOpen(false);
    alert('Car vehicle lot uploaded successfully and published to inventory!');
  };

  // Compute auction statistics
  const totalBidsCount = cars.reduce((sum, c) => sum + (c.bids?.length || 0), 0);
  const acceptedAuctions = cars.filter(c => c.status === 'accepted').length;
  const acceptanceRate = cars.length > 0 ? Math.round((acceptedAuctions / cars.length) * 100) : 0;
  const totalVolume = cars.reduce((sum, c) => sum + (c.highestBid || 0), 0);

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span className={`role-tag ${currentRole}`}>{currentRole === 'master' ? 'Master / Owner Admin' : 'Employee Portal'}</span>
            <span style={{ fontSize: '13px', color: '#64748B' }}>Role-Based Access Control</span>
          </div>
          <h1 style={{ fontSize: '30px', color: '#0F172A' }}>
            {currentRole === 'master' ? 'Master Business Owner Command Center' : 'Employee Operations & Inspection Hub'}
          </h1>
        </div>

        {/* Persona quick switch buttons */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            className={`btn-secondary ${currentRole === 'employee' ? 'active' : ''}`}
            onClick={() => setCurrentRole('employee')}
            style={currentRole === 'employee' ? { background: '#F3E8FF', borderColor: '#7E22CE', color: '#7E22CE', fontWeight: 700 } : {}}
          >
            Switch to Employee View
          </button>
          <button 
            className={`btn-secondary ${currentRole === 'master' ? 'active' : ''}`}
            onClick={() => setCurrentRole('master')}
            style={currentRole === 'master' ? { background: '#FEE2E2', borderColor: '#DC2626', color: '#DC2626', fontWeight: 700 } : {}}
          >
            Switch to Master Owner View
          </button>
        </div>
      </div>

      {/* Client Note Rule Banner */}
      {currentRole === 'employee' && (
        <div style={{
          background: '#FDF4FF',
          border: '1.5px solid #E879F9',
          borderRadius: '14px',
          padding: '14px 20px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <Lock size={22} color="#A21CAF" />
          <div>
            <div style={{ fontSize: '14px', fontWeight: 800, color: '#86198F' }}>
              Employee Restrictions Enforced (Client Specification)
            </div>
            <div style={{ fontSize: '12px', color: '#A21CAF' }}>
              Employees can upload vehicle details, inspect photos/videos, and manage offline broker subscriptions. <strong>Edit and Delete operations are strictly restricted to Master Owner.</strong>
            </div>
          </div>
        </div>
      )}

      {/* Admin Tabs */}
      <div className="auction-categories-nav" style={{ marginBottom: '24px' }}>
        <button 
          className={`category-tab-btn ${activeAdminTab === 'inventory' ? 'active' : ''}`}
          onClick={() => setActiveAdminTab('inventory')}
        >
          <LayoutDashboard size={16} /> Inventory Stock ({cars.length})
        </button>

        <button 
          className={`category-tab-btn ${activeAdminTab === 'bids' ? 'active' : ''}`}
          onClick={() => setActiveAdminTab('bids')}
        >
          <Gavel size={16} /> Live Bids & Results
        </button>

        <button 
          className={`category-tab-btn ${activeAdminTab === 'stats' ? 'active' : ''}`}
          onClick={() => setActiveAdminTab('stats')}
        >
          <BarChart3 size={16} /> Auction Statistics
        </button>

        <button 
          className={`category-tab-btn ${activeAdminTab === 'brokers' ? 'active' : ''}`}
          onClick={() => setActiveAdminTab('brokers')}
        >
          <Users size={16} /> Broker Offline Subscriptions
        </button>
      </div>

      {/* TAB 1: INVENTORY & CAR UPLOAD */}
      {activeAdminTab === 'inventory' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '18px' }}>Active Vehicle Lots</h3>
            <button className="btn-primary" onClick={() => setIsAddModalOpen(true)}>
              <PlusCircle size={16} /> Upload Car Details / Photos / Videos
            </button>
          </div>

          <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', textAlign: 'left' }}>
                  <th style={{ padding: '12px 18px', color: '#475569' }}>Car Model & Reg</th>
                  <th style={{ padding: '12px 18px', color: '#475569' }}>Auction Category</th>
                  <th style={{ padding: '12px 18px', color: '#475569' }}>Listed Price</th>
                  <th style={{ padding: '12px 18px', color: '#475569' }}>Reserve (Threshold)</th>
                  <th style={{ padding: '12px 18px', color: '#475569' }}>Highest Bid</th>
                  <th style={{ padding: '12px 18px', textAlign: 'right', color: '#475569' }}>Permissions / Actions</th>
                </tr>
              </thead>
              <tbody>
                {cars.map(car => (
                  <tr key={car.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '14px 18px' }}>
                      <div style={{ fontWeight: 700, color: '#0F172A' }}>{car.make} {car.model}</div>
                      <div style={{ fontSize: '11px', color: '#64748B' }}>{car.regNumber} • {car.year} • {car.fuel}</div>
                    </td>
                    <td style={{ padding: '14px 18px' }}>
                      <span className={`car-badge-pill ${car.category}`} style={{ position: 'static' }}>
                        {car.category.toUpperCase()}
                      </span>
                    </td>
                    <td style={{ padding: '14px 18px', fontWeight: 600 }}>
                      ₹{car.price.toLocaleString('en-IN')}
                    </td>
                    <td style={{ padding: '14px 18px', color: '#475569' }}>
                      ₹{car.reservePrice?.toLocaleString('en-IN')}
                    </td>
                    <td style={{ padding: '14px 18px', fontWeight: 700, color: '#2563EB' }}>
                      ₹{car.highestBid?.toLocaleString('en-IN') || 'No Bids'}
                    </td>
                    <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                      {currentRole === 'master' ? (
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                          <button 
                            className="btn-secondary" 
                            style={{ padding: '6px 10px', fontSize: '11px' }}
                            onClick={() => {
                              const newPrice = prompt('Enter updated price:', car.price);
                              if (newPrice) updateCar(car.id, { price: Number(newPrice) });
                            }}
                          >
                            <Edit3 size={12} /> Edit
                          </button>
                          <button 
                            className="btn-secondary" 
                            style={{ padding: '6px 10px', fontSize: '11px', color: '#DC2626', borderColor: '#FECACA' }}
                            onClick={() => {
                              if (confirm(`Delete ${car.model}?`)) deleteCar(car.id);
                            }}
                          >
                            <Trash2 size={12} /> Delete
                          </button>
                        </div>
                      ) : (
                        <span style={{ fontSize: '11px', color: '#94A3B8', fontStyle: 'italic', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <Lock size={12} /> No Edit / Delete (Employee)
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: LIVE BIDS & ACCEPTANCE */}
      {activeAdminTab === 'bids' && (
        <div>
          <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>Real-Time Bid Results & Buyer Acceptance</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px' }}>
            {cars.map(car => (
              <div key={car.id} style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748B' }}>{car.regNumber}</span>
                  <span className={`car-badge-pill ${car.category}`} style={{ position: 'static' }}>{car.category}</span>
                </div>
                <h4 style={{ fontSize: '16px', marginBottom: '4px' }}>{car.make} {car.model}</h4>
                <div style={{ fontSize: '12px', color: '#64748B', marginBottom: '14px' }}>
                  Seller Reserve: ₹{car.reservePrice?.toLocaleString('en-IN')}
                </div>

                <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '10px', marginBottom: '14px' }}>
                  <div style={{ fontSize: '11px', color: '#64748B', textTransform: 'uppercase', marginBottom: '6px' }}>
                    Active Bid Stream ({car.bids?.length || 0} bids)
                  </div>
                  {car.bids && car.bids.length > 0 ? (
                    car.bids.map(b => (
                      <div key={b.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid #E2E8F0', fontSize: '13px' }}>
                        <div>
                          <strong>{b.brokerName}</strong> ({b.brokerPhone})
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontWeight: 800, color: '#059669' }}>₹{b.amount.toLocaleString('en-IN')}</span>
                          {currentRole === 'master' && car.status !== 'accepted' && (
                            <button 
                              className="btn-primary"
                              style={{ padding: '4px 8px', fontSize: '11px', background: '#059669' }}
                              onClick={() => acceptBid(car.id, b.id)}
                            >
                              Accept Bid
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div style={{ color: '#94A3B8', fontSize: '12px', fontStyle: 'italic' }}>No bids placed yet on this lot</div>
                  )}
                </div>

                {car.status === 'accepted' && (
                  <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', padding: '8px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 700, color: '#065F46', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CheckCircle2 size={16} /> Deal Accepted & Confirmed with Winner
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: AUCTION ACCEPTANCE STATISTICS (Page 7 in Notes) */}
      {activeAdminTab === 'stats' && (
        <div>
          <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>Auction Acceptance & Performance Analytics</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '18px', marginBottom: '28px' }}>
            <div style={{ background: '#FFFFFF', padding: '22px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Acceptance Rate</div>
              <div style={{ fontSize: '32px', fontWeight: 800, color: '#059669', margin: '6px 0' }}>{acceptanceRate}%</div>
              <div style={{ fontSize: '12px', color: '#64748B' }}>{acceptedAuctions} of {cars.length} lots accepted</div>
            </div>

            <div style={{ background: '#FFFFFF', padding: '22px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Total Bids Placed</div>
              <div style={{ fontSize: '32px', fontWeight: 800, color: '#2563EB', margin: '6px 0' }}>{totalBidsCount}</div>
              <div style={{ fontSize: '12px', color: '#64748B' }}>Across Needbuster & BidMaster</div>
            </div>

            <div style={{ background: '#FFFFFF', padding: '22px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Gross Auction Volume</div>
              <div style={{ fontSize: '32px', fontWeight: 800, color: '#FF5722', margin: '6px 0' }}>
                ₹{(totalVolume / 10000000).toFixed(2)} Cr
              </div>
              <div style={{ fontSize: '12px', color: '#64748B' }}>Realization threshold index</div>
            </div>

            <div style={{ background: '#FFFFFF', padding: '22px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Active Channel Partners</div>
              <div style={{ fontSize: '32px', fontWeight: 800, color: '#7C3AED', margin: '6px 0' }}>{brokers.length}</div>
              <div style={{ fontSize: '12px', color: '#64748B' }}>Verified offline subscription</div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: BROKER OFFLINE SUBSCRIPTIONS MANAGER */}
      {activeAdminTab === 'brokers' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '18px' }}>Channel Partner Subscriptions (Handled Offline)</h3>
              <p style={{ fontSize: '13px', color: '#64748B' }}>
                Client Note: "Subscription model can be added by employee. Subscription of brokers is offline."
              </p>
            </div>
          </div>

          <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', textAlign: 'left' }}>
                  <th style={{ padding: '12px 18px', color: '#475569' }}>Broker / Company</th>
                  <th style={{ padding: '12px 18px', color: '#475569' }}>Phone Number</th>
                  <th style={{ padding: '12px 18px', color: '#475569' }}>Subscription Type</th>
                  <th style={{ padding: '12px 18px', color: '#475569' }}>Inactivity Status</th>
                  <th style={{ padding: '12px 18px', color: '#475569' }}>Status</th>
                  <th style={{ padding: '12px 18px', textAlign: 'right', color: '#475569' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {brokers.map(b => (
                  <tr key={b.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '14px 18px' }}>
                      <div style={{ fontWeight: 700 }}>{b.name}</div>
                      <div style={{ fontSize: '11px', color: '#64748B' }}>{b.companyName}</div>
                    </td>
                    <td style={{ padding: '14px 18px', fontWeight: 600 }}>+91 {b.phone}</td>
                    <td style={{ padding: '14px 18px' }}>{b.subscriptionType}</td>
                    <td style={{ padding: '14px 18px' }}>
                      {b.lastParticipatedDaysAgo > 2 ? (
                        <span style={{ color: '#D97706', fontWeight: 700 }}>⚠️ Inactive ({b.lastParticipatedDaysAgo} days)</span>
                      ) : (
                        <span style={{ color: '#059669', fontWeight: 600 }}>Active Bidder</span>
                      )}
                    </td>
                    <td style={{ padding: '14px 18px' }}>
                      <span className={`role-tag ${b.subscriptionStatus === 'active' ? 'customer' : 'broker'}`}>
                        {b.subscriptionStatus.toUpperCase()}
                      </span>
                    </td>
                    <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                      <button 
                        className="btn-secondary"
                        style={{ padding: '6px 12px', fontSize: '11px' }}
                        onClick={() => {
                          const nextStatus = b.subscriptionStatus === 'active' ? 'pending' : 'active';
                          updateBrokerSubscription(b.id, nextStatus);
                        }}
                      >
                        Toggle to {b.subscriptionStatus === 'active' ? 'Pending' : 'Active'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Upload Car Details Modal (Both Employee & Master Owner can access per Page 7) */}
      {isAddModalOpen && (
        <div className="modal-overlay" onClick={() => setIsAddModalOpen(false)}>
          <div className="modal-card" style={{ maxWidth: '640px' }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontSize: '18px' }}>Upload Vehicle Details, Photos & Inspection Videos</h3>
              <button onClick={() => setIsAddModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>✕</button>
            </div>
            <form onSubmit={handleUploadCar}>
              <div className="modal-body">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>Make (Brand)</label>
                    <input type="text" value={make} onChange={e => setMake(e.target.value)} required style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #CBD5E1' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>Model & Trim</label>
                    <input type="text" value={model} onChange={e => setModel(e.target.value)} required style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #CBD5E1' }} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>Reg Number</label>
                    <input type="text" value={regNumber} onChange={e => setRegNumber(e.target.value)} required style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #CBD5E1', textTransform: 'uppercase' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>Year</label>
                    <input type="number" value={year} onChange={e => setYear(e.target.value)} required style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #CBD5E1' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>Mileage (KM)</label>
                    <input type="number" value={mileage} onChange={e => setMileage(e.target.value)} required style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #CBD5E1' }} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>Auction Category</label>
                    <select value={category} onChange={e => setCategory(e.target.value)} style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #CBD5E1' }}>
                      <option value="needbuster">Needbuster (Daily Exclusive)</option>
                      <option value="bidmaster">BidMaster (2-3x / Day)</option>
                      <option value="cloud">Cloud (24/7 Stock)</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>Inspection Rating (/10)</label>
                    <input type="number" step="0.1" value={inspectionScore} onChange={e => setInspectionScore(e.target.value)} style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #CBD5E1' }} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>Listed Price (₹)</label>
                    <input type="number" value={price} onChange={e => setPrice(e.target.value)} required style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #CBD5E1' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>Seller Reserve Price (₹)</label>
                    <input type="number" value={reservePrice} onChange={e => setReservePrice(e.target.value)} required style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #CBD5E1' }} />
                  </div>
                </div>

                <div style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>Car Photo URL</label>
                  <input type="url" value={imageUrl} onChange={e => setImageUrl(e.target.value)} style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #CBD5E1' }} />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>Video Inspection Tour URL</label>
                  <input type="url" value={videoUrl} onChange={e => setVideoUrl(e.target.value)} style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #CBD5E1' }} />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setIsAddModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Upload to Auction Lot</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
