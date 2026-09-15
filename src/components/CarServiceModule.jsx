import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Wrench, 
  Search, 
  Truck, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Camera, 
  Star, 
  Phone, 
  ShieldCheck, 
  ArrowRight, 
  AlertCircle, 
  ThumbsUp, 
  ThumbsDown, 
  PlusCircle, 
  MapPin,
  Car,
  Video
} from 'lucide-react';

export const CarServiceModule = () => {
  const { 
    optionTier, 
    setOptionTier, 
    serviceOrders, 
    activeServiceId, 
    setActiveServiceId, 
    bookNewService, 
    updateServiceStage, 
    handleEstimateResponse, 
    submitFeedback 
  } = useApp();

  // Search input
  const [searchReg, setSearchReg] = useState('DL-04-ER-9821');
  const [searchModel, setSearchModel] = useState('Maruti Suzuki Baleno Alpha 1.2');
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);

  // New service form state
  const [newReg, setNewReg] = useState('');
  const [newModel, setNewModel] = useState('');
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');

  // Feedback form state
  const [rating, setRating] = useState(5);
  const [wasOnTime, setWasOnTime] = useState('yes');
  const [wasClean, setWasClean] = useState('yes');
  const [comment, setComment] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  // Find active order
  const currentOrder = serviceOrders.find(o => o.id === activeServiceId) || serviceOrders[0];

  // 7 Stages definitions as handwritten in client notes
  const STAGES = [
    { title: 'Pickup Car', subtitle: 'Driver Allotment & Photo', icon: Truck },
    { title: 'Car Picked', subtitle: 'Odometer & Condition Check', icon: CheckCircle2 },
    { title: 'Reached Workshop', subtitle: 'Workshop Intake Photos', icon: MapPin },
    { title: 'Estimate Acceptance', subtitle: 'Cost Approval (Yes/No)', icon: FileText },
    { title: 'Service Happening', subtitle: 'Live Photo/Video Proof', icon: Wrench },
    { title: 'Car Moves to Drop', subtitle: 'Dispatched Return', icon: Car },
    { title: 'Customer Feedback', subtitle: 'Questions & Rating', icon: Star }
  ];

  const handleCreateBooking = (e) => {
    e.preventDefault();
    if (!newReg || !newModel) {
      alert('Please enter Car Number and Car Model');
      return;
    }
    const order = bookNewService(newReg, newModel, newName || 'Valued Customer', newPhone || '9876543210');
    setIsBookModalOpen(false);
    setNewReg('');
    setNewModel('');
    setNewName('');
    setNewPhone('');
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    submitFeedback(currentOrder.id, {
      rating,
      wasOnTime,
      wasClean,
      comment
    });
    setFeedbackSubmitted(true);
  };

  // Option A mode: Static informational presentation per client specification
  if (optionTier === 'A') {
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
              OPTION A SPECIFICATION MODE
            </div>
            <h2 style={{ fontSize: '24px', color: '#7C2D12', marginBottom: '6px' }}>
              Car Service Module is Static in Option A
            </h2>
            <p style={{ color: '#9A3412', fontSize: '14px', maxWidth: '650px' }}>
              Per your client's handwritten comparison matrix, the 7-stage interactive Car Service Tracking pipeline is enabled dynamically in <strong>Option B</strong> and <strong>Option C</strong>.
            </p>
          </div>
          <button 
            className="btn-primary"
            onClick={() => setOptionTier('B')}
            style={{ background: '#EA580C' }}
          >
            Switch to Option B to Test Live Pipeline <ArrowRight size={16} />
          </button>
        </div>

        {/* Static Informatory Showcase */}
        <div style={{ background: '#FFFFFF', borderRadius: '20px', padding: '40px', border: '1px solid #E2E8F0', textAlign: 'center' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '18px', background: '#EFF6FF', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px auto' }}>
            <Wrench size={32} />
          </div>
          <h3 style={{ fontSize: '26px', marginBottom: '12px' }}>AutoVault Doorstep Car Service & Maintenance</h3>
          <p style={{ color: '#64748B', maxWidth: '600px', margin: '0 auto 28px auto', fontSize: '15px' }}>
            Free doorstep pickup & drop, 100% OEM spare parts, transparent computerized diagnostics, and full warranty on all repairs.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', textAlign: 'left' }}>
            <div style={{ background: '#F8FAFC', padding: '20px', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
              <h4 style={{ fontSize: '16px', marginBottom: '6px', color: '#0F172A' }}>Periodic Maintenance</h4>
              <p style={{ fontSize: '13px', color: '#64748B' }}>Engine oil replacement, oil filter, air filter, spark plug cleaning, 40-point inspection.</p>
            </div>
            <div style={{ background: '#F8FAFC', padding: '20px', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
              <h4 style={{ fontSize: '16px', marginBottom: '6px', color: '#0F172A' }}>Dent & Paint Services</h4>
              <p style={{ fontSize: '13px', color: '#64748B' }}>Grade-A pressurized paint booth, computerized color matching, scratch and dent removal.</p>
            </div>
            <div style={{ background: '#F8FAFC', padding: '20px', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
              <h4 style={{ fontSize: '16px', marginBottom: '6px', color: '#0F172A' }}>Brakes & Suspension</h4>
              <p style={{ fontSize: '13px', color: '#64748B' }}>Brake pad replacement, disc skimming, caliper servicing, shock absorber repair.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Option B & C: Dynamic 7-Stage Live Tracking Pipeline
  return (
    <div>
      {/* Title & Lookup Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#ECFDF5', color: '#047857', padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px' }}>
            <span className="live-pulse-dot green" style={{ width: '6px', height: '6px' }}></span> Dynamic 7-Stage Service Active ({optionTier === 'B' ? 'Option B' : 'Option C'})
          </div>
          <h1 style={{ fontSize: '30px', color: '#0F172A', marginBottom: '6px' }}>
            Live Vehicle Service Tracker
          </h1>
          <p style={{ color: '#64748B', fontSize: '15px' }}>
            Real-time workshop transparency from doorstep pickup to final delivery drop.
          </p>
        </div>

        <button 
          className="btn-primary"
          onClick={() => setIsBookModalOpen(true)}
        >
          <PlusCircle size={16} /> Book New Car Service
        </button>
      </div>

      {/* Step 1 Input: Client handwritten note: "1. Enter car Number and car model" */}
      <div style={{ 
        background: '#FFFFFF', 
        border: '1px solid #E2E8F0', 
        borderRadius: '16px', 
        padding: '20px 24px', 
        marginBottom: '28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', flex: 1 }}>
          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '4px' }}>
              Car Registration Number
            </label>
            <div style={{ display: 'flex', alignItems: 'center', background: '#F8FAFC', border: '1.5px solid #CBD5E1', borderRadius: '8px', padding: '6px 12px', gap: '6px' }}>
              <span style={{ fontSize: '12px', fontWeight: 800, color: '#2563EB' }}>IND</span>
              <input 
                type="text" 
                value={searchReg} 
                onChange={e => setSearchReg(e.target.value)}
                style={{ border: 'none', background: 'transparent', outline: 'none', fontWeight: 800, fontSize: '15px', textTransform: 'uppercase', width: '140px' }} 
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '4px' }}>
              Car Make & Model
            </label>
            <input 
              type="text" 
              value={searchModel} 
              onChange={e => setSearchModel(e.target.value)}
              style={{ background: '#F8FAFC', border: '1.5px solid #CBD5E1', borderRadius: '8px', padding: '8px 14px', fontSize: '14px', fontWeight: 600, width: '260px', outline: 'none' }} 
            />
          </div>
        </div>

        {/* Demo Fast Forward Stepper Control */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 700 }}>Simulate Stage:</span>
          <select 
            value={currentOrder.currentStageIndex}
            onChange={(e) => updateServiceStage(currentOrder.id, Number(e.target.value))}
            style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '12px', background: '#F8FAFC', fontWeight: 600, cursor: 'pointer' }}
          >
            {STAGES.map((s, idx) => (
              <option key={idx} value={idx}>Stage {idx + 1}: {s.title}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Main 7-Stage Pipeline Tracker Card */}
      <div className="service-tracking-card">
        {/* Header with Car Details */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', paddingBottom: '20px', borderBottom: '1px solid #E2E8F0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#FFF3E0', color: '#FF5722', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Car size={26} />
            </div>
            <div>
              <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>
                Order #{currentOrder.id.toUpperCase()} • Booked on {currentOrder.bookingDate}
              </div>
              <h2 style={{ fontSize: '20px', color: '#0F172A' }}>
                {currentOrder.carModel} <span style={{ color: '#2563EB', fontWeight: 800 }}>({currentOrder.regNumber})</span>
              </h2>
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '11px', color: '#64748B' }}>Customer Name</div>
            <div style={{ fontSize: '14px', fontWeight: 700 }}>{currentOrder.customerName} ({currentOrder.customerPhone})</div>
          </div>
        </div>

        {/* 7-Step Horizontal Interactive Stepper */}
        <div className="pipeline-stepper">
          {STAGES.map((stg, idx) => {
            const isCompleted = idx < currentOrder.currentStageIndex;
            const isActive = idx === currentOrder.currentStageIndex;
            const Icon = stg.icon;

            return (
              <div 
                key={idx} 
                className={`step-node ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}`}
                onClick={() => updateServiceStage(currentOrder.id, idx)}
              >
                <div className="step-circle">
                  {isCompleted ? <CheckCircle2 size={24} /> : <Icon size={20} />}
                </div>
                <div className="step-label">
                  <div style={{ fontSize: '10px', textTransform: 'uppercase', opacity: 0.7 }}>Step {idx + 1}</div>
                  {stg.title}
                </div>
              </div>
            );
          })}
        </div>

        {/* Active Stage Content Area */}
        <div style={{ background: '#F8FAFC', borderRadius: '16px', padding: '28px', border: '1px solid #E2E8F0' }}>
          
          {/* STAGE 1: Pickup Car (driver allotment photo) */}
          {currentOrder.currentStageIndex === 0 && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#FF5722', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', marginBottom: '10px' }}>
                <Truck size={18} /> Stage 1: Doorstep Pickup Assigned
              </div>
              <h3 style={{ fontSize: '22px', marginBottom: '8px' }}>Valet Driver Allotment & Details</h3>
              <p style={{ color: '#64748B', fontSize: '14px', marginBottom: '22px' }}>
                Your dedicated AutoVault Valet has been assigned for safe contactless vehicle pickup.
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', background: '#FFFFFF', padding: '20px', borderRadius: '14px', border: '1px solid #CBD5E1', maxWidth: '520px' }}>
                <img 
                  src={currentOrder.driver.allotmentPhoto} 
                  alt="Driver" 
                  style={{ width: '74px', height: '74px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #FF5722' }} 
                />
                <div>
                  <h4 style={{ fontSize: '17px', color: '#0F172A' }}>{currentOrder.driver.name}</h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#F59E0B', fontSize: '13px', fontWeight: 700, margin: '3px 0' }}>
                    <Star size={15} fill="#F59E0B" /> {currentOrder.driver.rating} Valet Rating
                  </div>
                  <div style={{ fontSize: '13px', color: '#475569', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Phone size={14} color="#059669" /> {currentOrder.driver.phone}
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '20px' }}>
                <button 
                  className="btn-primary"
                  onClick={() => updateServiceStage(currentOrder.id, 1)}
                >
                  Confirm Pickup Completed <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STAGE 2: Car Picked */}
          {currentOrder.currentStageIndex === 1 && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#059669', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', marginBottom: '10px' }}>
                <CheckCircle2 size={18} /> Stage 2: Vehicle Handover Confirmed
              </div>
              <h3 style={{ fontSize: '22px', marginBottom: '8px' }}>Car In-Transit to Workshop</h3>
              <p style={{ color: '#64748B', fontSize: '14px', marginBottom: '20px' }}>
                Vehicle picked up successfully from customer location. Diagnostic intake log recorded.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', background: '#FFFFFF', padding: '20px', borderRadius: '14px', border: '1px solid #E2E8F0', marginBottom: '20px' }}>
                <div>
                  <div style={{ fontSize: '11px', color: '#64748B', textTransform: 'uppercase' }}>Pickup Timestamp</div>
                  <div style={{ fontSize: '15px', fontWeight: 700 }}>{currentOrder.pickupDetails.pickedAt}</div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: '#64748B', textTransform: 'uppercase' }}>Odometer Reading</div>
                  <div style={{ fontSize: '15px', fontWeight: 700 }}>{currentOrder.pickupDetails.odometer}</div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: '#64748B', textTransform: 'uppercase' }}>Fuel Gauge</div>
                  <div style={{ fontSize: '15px', fontWeight: 700 }}>{currentOrder.pickupDetails.fuelLevel}</div>
                </div>
              </div>

              <button className="btn-primary" onClick={() => updateServiceStage(currentOrder.id, 2)}>
                Vehicle Arrived at Workshop <ArrowRight size={16} />
              </button>
            </div>
          )}

          {/* STAGE 3: Car Reached Workshop (photos in app of car in workshop) */}
          {currentOrder.currentStageIndex === 2 && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#2563EB', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', marginBottom: '10px' }}>
                <Camera size={18} /> Stage 3: Workshop Intake & Inspection
              </div>
              <h3 style={{ fontSize: '22px', marginBottom: '8px' }}>Vehicle Check-in Photos at Mega Workshop</h3>
              <p style={{ color: '#64748B', fontSize: '14px', marginBottom: '20px' }}>
                {currentOrder.workshopDetails.hubName} • Arrived: {currentOrder.workshopDetails.arrivedAt}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginBottom: '24px' }}>
                {currentOrder.workshopDetails.workshopPhotos.map((photo, i) => (
                  <div key={i} style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid #CBD5E1' }}>
                    <img 
                      src={photo} 
                      alt={`Workshop Bay Check-in Photo #${i + 1}`} 
                      style={{ width: '100%', height: '180px', objectFit: 'cover' }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://images.unsplash.com/photo-1613214149922-f1809c99b414?auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                    <div style={{ padding: '10px 14px', background: '#FFFFFF', fontSize: '12px', fontWeight: 600, color: '#475569' }}>
                      Workshop Bay Check-in Photo #{i + 1}
                    </div>
                  </div>
                ))}
              </div>

              <button className="btn-primary" onClick={() => updateServiceStage(currentOrder.id, 3)}>
                Review Inspection & Cost Estimate <ArrowRight size={16} />
              </button>
            </div>
          )}

          {/* STAGE 4: Estimate Acceptance (Yes / No) - Client Handwritten Core Rule */}
          {currentOrder.currentStageIndex === 3 && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#D97706', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', marginBottom: '10px' }}>
                <FileText size={18} /> Stage 4: Estimate Cost Approval Required
              </div>
              <h3 style={{ fontSize: '22px', marginBottom: '8px' }}>Detailed Service & Parts Estimate</h3>
              <p style={{ color: '#64748B', fontSize: '14px', marginBottom: '22px' }}>
                Our technicians will not proceed with any replacement or repair without your explicit digital consent.
              </p>

              {/* Estimate Items Table */}
              <div style={{ background: '#FFFFFF', borderRadius: '14px', border: '1px solid #CBD5E1', overflow: 'hidden', marginBottom: '24px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                  <thead>
                    <tr style={{ background: '#F1F5F9', borderBottom: '1px solid #E2E8F0', textAlign: 'left' }}>
                      <th style={{ padding: '12px 18px', color: '#475569' }}>Item / Labor Description</th>
                      <th style={{ padding: '12px 18px', textAlign: 'right', color: '#475569' }}>Cost (INR)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentOrder.estimate.items.map((item, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #F1F5F9' }}>
                        <td style={{ padding: '12px 18px' }}>{item.desc}</td>
                        <td style={{ padding: '12px 18px', textAlign: 'right', fontWeight: 600 }}>₹{item.cost.toLocaleString('en-IN')}</td>
                      </tr>
                    ))}
                    <tr style={{ background: '#F8FAFC' }}>
                      <td style={{ padding: '10px 18px', color: '#64748B' }}>GST & Environmental Cess (18%)</td>
                      <td style={{ padding: '10px 18px', textAlign: 'right', color: '#64748B' }}>₹{currentOrder.estimate.taxes.toLocaleString('en-IN')}</td>
                    </tr>
                    <tr style={{ background: '#FFF7ED', borderTop: '2px solid #FED7AA' }}>
                      <td style={{ padding: '14px 18px', fontWeight: 800, fontSize: '16px', color: '#9A3412' }}>Total Approved Payable</td>
                      <td style={{ padding: '14px 18px', textAlign: 'right', fontWeight: 800, fontSize: '18px', color: '#C2410C' }}>
                        ₹{currentOrder.estimate.totalAmount.toLocaleString('en-IN')}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Accept / Reject Action Buttons (as handwritten: "Estimate acceptance (yes/no)") */}
              {currentOrder.estimateAccepted === null ? (
                <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                  <button 
                    className="btn-primary" 
                    style={{ background: '#059669', padding: '12px 24px', fontSize: '15px' }}
                    onClick={() => handleEstimateResponse(currentOrder.id, 'accepted')}
                  >
                    <ThumbsUp size={18} /> Yes, Accept & Proceed with Service
                  </button>
                  <button 
                    className="btn-secondary" 
                    style={{ color: '#DC2626', borderColor: '#FECACA', padding: '12px 24px', fontSize: '15px' }}
                    onClick={() => handleEstimateResponse(currentOrder.id, 'rejected')}
                  >
                    <ThumbsDown size={18} /> No, Reject Estimate & Request Callback
                  </button>
                </div>
              ) : currentOrder.estimateAccepted === 'accepted' ? (
                <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', padding: '14px 20px', borderRadius: '12px', color: '#065F46', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 700 }}>Estimate Accepted by You! Technicians have started work.</span>
                  <button className="btn-primary" onClick={() => updateServiceStage(currentOrder.id, 4)}>
                    View Live Service Media <ArrowRight size={16} />
                  </button>
                </div>
              ) : (
                <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', padding: '14px 20px', borderRadius: '12px', color: '#991B1B', fontWeight: 700 }}>
                  Estimate Rejected. Our Senior Service Advisor will call you within 15 minutes.
                </div>
              )}
            </div>
          )}

          {/* STAGE 5: Service Happening (see photo/video from backend) */}
          {currentOrder.currentStageIndex === 4 && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#7C3AED', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', marginBottom: '10px' }}>
                <Wrench size={18} /> Stage 5: Maintenance in Progress
              </div>
              <h3 style={{ fontSize: '22px', marginBottom: '8px' }}>Live Workshop Photographic & Video Proof</h3>
              <p style={{ color: '#64748B', fontSize: '14px', marginBottom: '20px' }}>
                {currentOrder.liveServiceProof.statusNote}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px', marginBottom: '24px' }}>
                {currentOrder.liveServiceProof.media.map((item, idx) => (
                  <div key={idx} style={{ background: '#FFFFFF', borderRadius: '14px', overflow: 'hidden', border: '1px solid #CBD5E1' }}>
                    <img 
                      src={item.url} 
                      alt={item.caption} 
                      style={{ width: '100%', height: '190px', objectFit: 'cover' }} 
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://images.unsplash.com/photo-1625047509168-a7026f36de04?auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                    <div style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#059669', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>
                        <CheckCircle2 size={14} /> Backend Verified Tech Upload
                      </div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: '#1E293B' }}>{item.caption}</div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="btn-primary" onClick={() => updateServiceStage(currentOrder.id, 5)}>
                Service Done - Dispatch Car for Delivery <ArrowRight size={16} />
              </button>
            </div>
          )}

          {/* STAGE 6: Car moves back to drop */}
          {currentOrder.currentStageIndex === 5 && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#2563EB', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', marginBottom: '10px' }}>
                <Car size={18} /> Stage 6: Return Transit Dispatched
              </div>
              <h3 style={{ fontSize: '22px', marginBottom: '8px' }}>Car is On The Way to Your Doorstep</h3>
              <p style={{ color: '#64748B', fontSize: '14px', marginBottom: '20px' }}>
                Quality testing passed! Valet driver is returning the serviced vehicle.
              </p>

              <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '14px', border: '1px solid #CBD5E1', maxWidth: '480px', marginBottom: '20px' }}>
                <div style={{ fontSize: '13px', color: '#64748B', marginBottom: '4px' }}>Return Delivery Valet</div>
                <div style={{ fontSize: '17px', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>{currentOrder.returnDelivery.driverName}</div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#059669', background: '#ECFDF5', padding: '8px 12px', borderRadius: '8px', display: 'inline-block' }}>
                  {currentOrder.returnDelivery.eta}
                </div>
              </div>

              <button className="btn-primary" onClick={() => updateServiceStage(currentOrder.id, 6)}>
                Vehicle Delivered - Complete Customer Feedback <ArrowRight size={16} />
              </button>
            </div>
          )}

          {/* STAGE 7: Customer Feedback (questions answers) */}
          {currentOrder.currentStageIndex === 6 && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#D97706', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', marginBottom: '10px' }}>
                <Star size={18} /> Stage 7: Post-Service Customer Feedback
              </div>
              <h3 style={{ fontSize: '22px', marginBottom: '8px' }}>How was your AutoVault Service Experience?</h3>
              <p style={{ color: '#64748B', fontSize: '14px', marginBottom: '22px' }}>
                Your feedback ensures top-tier quality standards for technicians and valets.
              </p>

              {feedbackSubmitted || currentOrder.feedback ? (
                <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', padding: '24px', borderRadius: '16px', textAlign: 'center', maxWidth: '520px' }}>
                  <CheckCircle2 size={40} color="#059669" style={{ margin: '0 auto 12px auto' }} />
                  <h4 style={{ fontSize: '18px', color: '#065F46', marginBottom: '6px' }}>Feedback Submitted Successfully!</h4>
                  <p style={{ fontSize: '14px', color: '#047857' }}>
                    Thank you for trusting AutoVault. A ₹500 discount voucher has been added to your account for your next booking!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFeedbackSubmit} style={{ background: '#FFFFFF', padding: '24px', borderRadius: '16px', border: '1px solid #CBD5E1', maxWidth: '540px' }}>
                  {/* Star Rating */}
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#1E293B', marginBottom: '8px' }}>
                      Overall Service Rating (1-5 Stars)
                    </label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setRating(star)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
                        >
                          <Star size={28} fill={star <= rating ? '#F59E0B' : 'none'} color="#F59E0B" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Question 1: Was on time? */}
                  <div style={{ marginBottom: '18px' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#1E293B', marginBottom: '6px' }}>
                      1. Was the pickup and return delivery punctual?
                    </label>
                    <div style={{ display: 'flex', gap: '16px' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', cursor: 'pointer' }}>
                        <input type="radio" name="ontime" checked={wasOnTime === 'yes'} onChange={() => setWasOnTime('yes')} /> Yes, on time
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', cursor: 'pointer' }}>
                        <input type="radio" name="ontime" checked={wasOnTime === 'no'} onChange={() => setWasOnTime('no')} /> Slight delay
                      </label>
                    </div>
                  </div>

                  {/* Question 2: Was car clean? */}
                  <div style={{ marginBottom: '18px' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#1E293B', marginBottom: '6px' }}>
                      2. Was the vehicle returned cleaned & washed satisfactorily?
                    </label>
                    <div style={{ display: 'flex', gap: '16px' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', cursor: 'pointer' }}>
                        <input type="radio" name="clean" checked={wasClean === 'yes'} onChange={() => setWasClean('yes')} /> Yes, spotless
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', cursor: 'pointer' }}>
                        <input type="radio" name="clean" checked={wasClean === 'no'} onChange={() => setWasClean('no')} /> Could be cleaner
                      </label>
                    </div>
                  </div>

                  {/* Comments */}
                  <div style={{ marginBottom: '22px' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#1E293B', marginBottom: '6px' }}>
                      Any specific notes for the mechanic or valet?
                    </label>
                    <textarea 
                      rows={3} 
                      value={comment}
                      onChange={e => setComment(e.target.value)}
                      placeholder="Great brake responsiveness, very polite valet..."
                      style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px', outline: 'none' }}
                    />
                  </div>

                  <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                    Submit Customer Feedback
                  </button>
                </form>
              )}
            </div>
          )}

        </div>
      </div>

      {/* Book New Service Modal */}
      {isBookModalOpen && (
        <div className="modal-overlay" onClick={() => setIsBookModalOpen(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontSize: '18px' }}>Book Doorstep Car Service</h3>
              <button onClick={() => setIsBookModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>✕</button>
            </div>
            <form onSubmit={handleCreateBooking}>
              <div className="modal-body">
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
                    Car Registration Number (e.g. MH-02-CD-9012)
                  </label>
                  <input 
                    type="text" 
                    value={newReg} 
                    onChange={e => setNewReg(e.target.value)}
                    placeholder="Enter registration number"
                    required
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1', textTransform: 'uppercase' }}
                  />
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
                    Car Make & Model (e.g. Honda City ZX CVT)
                  </label>
                  <input 
                    type="text" 
                    value={newModel} 
                    onChange={e => setNewModel(e.target.value)}
                    placeholder="Enter car model"
                    required
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>Customer Name</label>
                    <input 
                      type="text" 
                      value={newName} 
                      onChange={e => setNewName(e.target.value)}
                      placeholder="Your full name"
                      style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>Phone Number</label>
                    <input 
                      type="tel" 
                      value={newPhone} 
                      onChange={e => setNewPhone(e.target.value)}
                      placeholder="10-digit number"
                      style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                    />
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setIsBookModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Confirm Booking & Dispatch Valet</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
