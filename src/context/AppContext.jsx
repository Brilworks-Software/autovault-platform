import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  INITIAL_USED_CARS, 
  INITIAL_NEW_CARS, 
  INITIAL_SERVICE_ORDERS, 
  INITIAL_BROKERS,
  OUTLET_HUBS 
} from '../data/mockData';
import confetti from 'canvas-confetti';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Option Tier: 'A', 'B', or 'C' (Matches client's notebook options!)
  const [optionTier, setOptionTier] = useState('C');
  
  // Role: 'customer' | 'broker' | 'employee' | 'master'
  const [currentRole, setCurrentRole] = useState('customer');
  const [currentUser, setCurrentUser] = useState({
    name: 'Ananya Verma',
    phone: '9871100223',
    role: 'customer'
  });

  // Current active navigation tab
  const [activeTab, setActiveTab] = useState('home');

  // Main state entities
  const [cars, setCars] = useState(INITIAL_USED_CARS);
  const [newCars, setNewCars] = useState(INITIAL_NEW_CARS);
  const [serviceOrders, setServiceOrders] = useState(INITIAL_SERVICE_ORDERS);
  const [activeServiceId, setActiveServiceId] = useState('srv-901');
  const [brokers, setBrokers] = useState(INITIAL_BROKERS);
  const [wishlist, setWishlist] = useState(['car-101', 'car-103']);
  
  // Booked new cars receipts list
  const [tokenBookings, setTokenBookings] = useState([
    {
      bookingId: 'AV-BK-2026-9041',
      carId: 'new-201',
      carName: 'Mahindra XUV 700 AX7 Luxury Pack',
      variant: 'AX7L AWD Luxury Pack',
      color: 'Midnight Black',
      customerName: 'Ananya Verma',
      phone: '9871100223',
      city: 'New Delhi',
      tokenAmount: 21000,
      paymentMethod: 'UPI / NetBanking',
      transactionId: 'TXN-UPI-984218840',
      timestamp: '2026-09-14 11:24 AM',
      status: 'Confirmed'
    }
  ]);

  // Notifications (SMS / WhatsApp / System alerts simulation)
  const [notifications, setNotifications] = useState([
    {
      id: 'n1',
      type: 'whatsapp',
      sender: 'AutoVault Bidding Engine',
      title: 'Near Acceptance Alert! 🔥',
      message: 'Your bid on Hyundai Creta (DL-01-CA-9921) is only ₹20,000 away from the seller reserve price! Add funds or increase bid now.',
      timestamp: '5 mins ago',
      read: false
    },
    {
      id: 'n2',
      type: 'sms',
      sender: '+91-AUTOVLT',
      title: 'Auction Inactivity Reminder',
      message: 'Notice: You haven’t participated in BidMaster rounds in the last 2 days. High demand stock is live now!',
      timestamp: '1 hour ago',
      read: false
    }
  ]);

  // Modals visibility
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [selectedCarForCall, setSelectedCarForCall] = useState(null);
  const [selectedCarDetail, setSelectedCarDetail] = useState(null);
  const [isNewCarCheckoutOpen, setIsNewCarCheckoutOpen] = useState(false);
  const [selectedNewCar, setSelectedNewCar] = useState(null);
  const [activeReceipt, setActiveReceipt] = useState(null);

  // Helper trigger notification
  const triggerNotification = (title, message, type = 'whatsapp') => {
    const newNotif = {
      id: 'notif-' + Date.now(),
      type,
      sender: type === 'whatsapp' ? 'AutoVault WhatsApp Bot' : 'AutoVault SMS Gateway',
      title,
      message,
      timestamp: 'Just now',
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // Toggle Heart / Wishlist
  const toggleWishlist = (carId) => {
    setWishlist(prev => 
      prev.includes(carId) ? prev.filter(id => id !== carId) : [...prev, carId]
    );
  };

  // Switch / Login with OTP
  const loginWithOtp = (phone, role, name) => {
    setCurrentUser({ phone, role, name });
    setCurrentRole(role);
    setIsOtpModalOpen(false);

    // If logged in as Broker, client note says: "Bidmaster section is opens in old car section itself"
    if (role === 'broker') {
      setActiveTab('auctions');
      triggerNotification(
        'Broker Portal Unlocked 🚀', 
        `Welcome ${name}! Access granted to Needbuster, Cloud, and BidMaster auctions.`,
        'whatsapp'
      );
    } else if (role === 'employee' || role === 'master') {
      setActiveTab('admin-panel');
    } else {
      setActiveTab('used-cars');
    }
  };

  const logout = () => {
    setCurrentRole('customer');
    setCurrentUser({
      name: 'Guest Customer',
      phone: '9871100223',
      role: 'customer'
    });
    setActiveTab('home');
  };

  // Place a Bid on an Old Car
  const placeBid = (carId, bidAmount) => {
    const car = cars.find(c => c.id === carId);
    if (!car) return { success: false, message: 'Car not found' };

    const newBid = {
      id: 'bid-' + Date.now(),
      brokerName: currentUser.name || 'Channel Partner',
      brokerPhone: currentUser.phone,
      amount: Number(bidAmount),
      timestamp: 'Just now'
    };

    setCars(prevCars => prevCars.map(c => {
      if (c.id === carId) {
        const updatedBids = [newBid, ...(c.bids || [])];
        const newHighest = Math.max(c.highestBid || 0, Number(bidAmount));
        return {
          ...c,
          bids: updatedBids,
          highestBid: newHighest
        };
      }
      return c;
    }));

    // Check near acceptance rule from client's notes:
    // "if Bid is Near the acceptence then also Reminder is given to add funds"
    if (car.reservePrice && (car.reservePrice - bidAmount <= 30000) && (bidAmount < car.reservePrice)) {
      triggerNotification(
        'Near Seller Acceptance!',
        `Your bid of ₹${Number(bidAmount).toLocaleString('en-IN')} on ${car.make} ${car.model} is very close to acceptance (under ₹30k gap). Increase bid or add funds to guarantee win!`,
        'whatsapp'
      );
    }

    confetti({ particleCount: 35, spread: 60, origin: { y: 0.7 } });
    return { success: true };
  };

  // Master Admin: Accept Bid
  const acceptBid = (carId, bidId) => {
    const car = cars.find(c => c.id === carId);
    const winningBid = car?.bids?.find(b => b.id === bidId);

    setCars(prev => prev.map(c => {
      if (c.id === carId) {
        return { ...c, status: 'accepted', winningBid };
      }
      return c;
    }));

    if (winningBid) {
      triggerNotification(
        '🎉 AUCTION ACCEPTANCE CONFIRMED',
        `Congratulations ${winningBid.brokerName}! Your bid of ₹${winningBid.amount.toLocaleString('en-IN')} for ${car.make} ${car.model} (${car.regNumber}) has been ACCEPTED by Owner. Dispatch & document team will call you shortly.`,
        'sms'
      );
    }

    confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
  };

  // Add Car (Allowed for both Employee and Owner/Master)
  const addCar = (newCarData) => {
    const newCar = {
      ...newCarData,
      id: 'car-' + Date.now(),
      bids: [],
      highestBid: 0,
      status: 'live',
      auctionEndTime: Date.now() + 1000 * 60 * 60 * 8
    };
    setCars(prev => [newCar, ...prev]);
    return newCar;
  };

  // Update Car (Allowed ONLY for Master/Owner; Blocked for Employee per client rule)
  const updateCar = (carId, updatedData) => {
    if (currentRole === 'employee') {
      alert('Permission Denied: Employees can only upload cars. Edit/Delete requires Master Owner access.');
      return false;
    }
    setCars(prev => prev.map(c => c.id === carId ? { ...c, ...updatedData } : c));
    return true;
  };

  // Delete Car (Allowed ONLY for Master/Owner; Blocked for Employee per client rule)
  const deleteCar = (carId) => {
    if (currentRole === 'employee') {
      alert('Permission Denied: Employees cannot delete listings. Contact Master Owner.');
      return false;
    }
    setCars(prev => prev.filter(c => c.id !== carId));
    return true;
  };

  // Car Service Actions (Option B & C)
  const bookNewService = (regNumber, carModel, customerName, customerPhone) => {
    const newOrder = {
      id: 'srv-' + (900 + serviceOrders.length + 1),
      regNumber: regNumber.toUpperCase(),
      carModel,
      customerName,
      customerPhone,
      bookingDate: new Date().toISOString().split('T')[0],
      currentStageIndex: 0, // Starts at 0: Pickup Car
      estimateAccepted: null,
      driver: {
        name: 'Suresh Rawat (AutoVault Valet)',
        phone: '+91 98110 44229',
        rating: 4.85,
        allotmentPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
        assignedTime: 'Just now'
      },
      pickupDetails: {
        pickedAt: 'Scheduled today',
        odometer: '35,000 km',
        fuelLevel: '80%',
        pickupNotes: 'Car assigned to driver for doorstep pickup'
      },
      workshopDetails: {
        hubName: 'AutoVault Central Workshop Hub',
        arrivedAt: 'Pending',
        workshopPhotos: [
          'https://images.unsplash.com/photo-1613214149922-f1809c99b414?auto=format&fit=crop&w=800&q=80'
        ]
      },
      estimate: {
        items: [
          { desc: 'Comprehensive Periodic Service & Oil Replacement', cost: 3200 },
          { desc: 'Complete 30-Point Computerized Diagnostic Scan', cost: 750 },
          { desc: 'Brake Inspection & Cleaning', cost: 600 }
        ],
        taxes: 820,
        totalAmount: 5370
      },
      liveServiceProof: {
        statusNote: 'Valet dispatched for vehicle intake',
        media: []
      },
      returnDelivery: {
        driverName: 'Suresh Rawat',
        eta: 'By evening 06:00 PM',
        status: 'Scheduled'
      },
      feedback: null
    };

    setServiceOrders(prev => [newOrder, ...prev]);
    setActiveServiceId(newOrder.id);
    return newOrder;
  };

  const updateServiceStage = (orderId, stageIndex) => {
    setServiceOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        return { ...order, currentStageIndex: stageIndex };
      }
      return order;
    }));
  };

  const handleEstimateResponse = (orderId, decision) => {
    setServiceOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        const nextStage = decision === 'accepted' ? 4 : 3; // Advance to stage 4 (service happening) if accepted
        return { 
          ...order, 
          estimateAccepted: decision,
          currentStageIndex: nextStage
        };
      }
      return order;
    }));

    if (decision === 'accepted') {
      confetti({ particleCount: 50, spread: 70 });
      triggerNotification(
        'Service Estimate Approved ✅',
        'Thank you! Our technicians have initiated the approved service work. You can view live workshop photos/videos in the app.',
        'whatsapp'
      );
    }
  };

  const submitFeedback = (orderId, feedbackData) => {
    setServiceOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        return { ...order, feedback: feedbackData };
      }
      return order;
    }));
    confetti({ particleCount: 60, spread: 80 });
  };

  // New Car ₹21,000 Online Token Booking (Option C)
  const bookNewCarToken = (bookingData) => {
    const newBooking = {
      bookingId: 'AV-BK-2026-' + Math.floor(1000 + Math.random() * 9000),
      ...bookingData,
      tokenAmount: 21000,
      timestamp: new Date().toLocaleString(),
      status: 'Confirmed'
    };

    setTokenBookings(prev => [newBooking, ...prev]);
    setActiveReceipt(newBooking);
    confetti({ particleCount: 120, spread: 90, origin: { y: 0.5 } });

    triggerNotification(
      'New Car Token Booking Successful! 🎉',
      `Booking ID: ${newBooking.bookingId}. Your ₹21,000 token payment for ${newBooking.carName} (${newBooking.variant}) has been confirmed! Digital receipt generated.`,
      'whatsapp'
    );

    return newBooking;
  };

  // Broker Offline Subscription Update (Owner/Employee panel)
  const updateBrokerSubscription = (brokerId, newStatus) => {
    setBrokers(prev => prev.map(b => {
      if (b.id === brokerId) {
        return {
          ...b,
          subscriptionStatus: newStatus,
          validUntil: newStatus === 'active' ? '2027-03-31' : 'Pending Approval'
        };
      }
      return b;
    }));
  };

  return (
    <AppContext.Provider value={{
      optionTier,
      setOptionTier,
      currentRole,
      setCurrentRole,
      currentUser,
      activeTab,
      setActiveTab,
      cars,
      newCars,
      serviceOrders,
      activeServiceId,
      setActiveServiceId,
      brokers,
      wishlist,
      tokenBookings,
      notifications,
      outlets: OUTLET_HUBS,
      isOtpModalOpen,
      setIsOtpModalOpen,
      isCallModalOpen,
      setIsCallModalOpen,
      selectedCarForCall,
      setSelectedCarForCall,
      selectedCarDetail,
      setSelectedCarDetail,
      isNewCarCheckoutOpen,
      setIsNewCarCheckoutOpen,
      selectedNewCar,
      setSelectedNewCar,
      activeReceipt,
      setActiveReceipt,
      toggleWishlist,
      loginWithOtp,
      logout,
      placeBid,
      acceptBid,
      addCar,
      updateCar,
      deleteCar,
      bookNewService,
      updateServiceStage,
      handleEstimateResponse,
      submitFeedback,
      bookNewCarToken,
      updateBrokerSubscription,
      triggerNotification
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
