import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash, FaArrowLeft, FaCheckCircle } from 'react-icons/fa';
import { useCart } from './contexts/CartContext';
import Navbar from './Navbar';
import Footer from './Footer';

const TOUR_FEE = 500;

function Cart() {
  const { cart, removeFromCart, updateQty, clearCart, totalItems, totalPrice } = useCart();
  const [booked, setBooked] = useState(false);
  const navigate = useNavigate();

  const handleBook = () => {
    setBooked(true);
    clearCart();
    setTimeout(() => navigate('/'), 3000);
  };

  if (booked) {
    return (
      <div style={{ minHeight: '100vh', background: '#f1f5f9' }}>
        <Navbar activePage="cart" />
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
          <div className="text-center bg-white rounded-4 shadow p-5" style={{ maxWidth: '420px' }}>
            <FaCheckCircle style={{ fontSize: '4rem', color: '#0ea5e9' }} className="mb-3" />
            <h2 className="fw-bold mb-2" style={{ color: '#333' }}>Booking Confirmed!</h2>
            <p style={{ color: '#666', fontSize: '14px' }}>
              Your trip has been booked successfully. You'll receive a confirmation shortly.
            </p>
            <p style={{ color: '#999', fontSize: '12px' }}>Redirecting to home...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div style={{ minHeight: '100vh', background: '#f1f5f9' }}>
        <Navbar activePage="cart" />
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
          <div className="text-center bg-white rounded-4 shadow p-5" style={{ maxWidth: '380px' }}>
            <div style={{ fontSize: '4rem' }} className="mb-3">🧳</div>
            <h3 className="fw-semibold mb-2" style={{ color: '#333' }}>Your trip cart is empty</h3>
            <p className="mb-4" style={{ color: '#666', fontSize: '13px' }}>Add places to start planning your trip!</p>
            <Link to="/" className="btn btn-gradient px-4">EXPLORE PLACES</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f1f5f9' }}>
      <Navbar activePage="cart" />
      {/* Page title bar */}
      <div className="bg-white shadow-sm px-4 py-3 d-flex align-items-center gap-3">
        <button className="btn btn-link p-0 link-accent" onClick={() => navigate('/')}>
          <FaArrowLeft />
        </button>
        <h5 className="mb-0 fw-semibold" style={{ color: '#333' }}>
          My Trip Cart <span style={{ color: '#0284c7', fontSize: '15px' }}>({totalItems} {totalItems === 1 ? 'place' : 'places'})</span>
        </h5>
      </div>

      <div className="container-fluid px-3 px-md-5 py-4">
        <div className="row g-4">
          {/* Cart items */}
          <div className="col-12 col-lg-8">
            {cart.map((item) => (
              <div key={item.name} className="bg-white rounded-3 shadow-sm mb-3 p-3 d-flex gap-3 align-items-start">
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: '100px', height: '80px', objectFit: 'cover', borderRadius: '10px', flexShrink: 0 }}
                />
                <div className="flex-grow-1">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <h6 className="fw-semibold mb-1" style={{ color: '#333' }}>{item.name}</h6>
                      <p className="mb-2" style={{ color: '#888', fontSize: '12px' }}>{item.desc}</p>
                    </div>
                    <button
                      className="btn btn-link p-0 ms-2"
                      style={{ color: '#e74c3c' }}
                      onClick={() => removeFromCart(item.name)}
                      title="Remove"
                    >
                      <FaTrash />
                    </button>
                  </div>

                  <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                    {/* Qty controls */}
                    <div className="d-flex align-items-center gap-2">
                      <button className="cart-qty-btn" onClick={() => updateQty(item.name, -1)}>−</button>
                      <span className="fw-semibold" style={{ minWidth: '24px', textAlign: 'center' }}>{item.qty}</span>
                      <button className="cart-qty-btn" onClick={() => updateQty(item.name, 1)}>+</button>
                      <span style={{ color: '#888', fontSize: '12px' }}>person{item.qty > 1 ? 's' : ''}</span>
                    </div>

                    <div className="text-end">
                      <div className="fw-bold" style={{ color: '#9c4dff', fontSize: '16px' }}>
                        ₹{(item.price * item.qty).toLocaleString('en-IN')}
                      </div>
                      <div style={{ color: '#aaa', fontSize: '11px' }}>₹{item.price.toLocaleString('en-IN')}/person</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Price summary */}
          <div className="col-12 col-lg-4">
            <div className="bg-white rounded-3 shadow-sm p-4" style={{ position: 'sticky', top: '20px' }}>
              <h6 className="fw-bold mb-3 pb-2 border-bottom" style={{ color: '#888', letterSpacing: '1px', fontSize: '13px' }}>
                PRICE DETAILS
              </h6>

              {cart.map(item => (
                <div key={item.name} className="d-flex justify-content-between mb-2" style={{ fontSize: '13px', color: '#555' }}>
                  <span>{item.name} × {item.qty}</span>
                  <span>₹{(item.price * item.qty).toLocaleString('en-IN')}</span>
                </div>
              ))}

              <div className="d-flex justify-content-between mb-2 pt-2 border-top" style={{ fontSize: '13px', color: '#555' }}>
                <span>Tour arrangement fee</span>
                <span>₹{TOUR_FEE}</span>
              </div>

              <div className="d-flex justify-content-between fw-bold pt-2 border-top" style={{ fontSize: '15px', color: '#333' }}>
                <span>Total Amount</span>
                <span style={{ color: '#9c4dff' }}>₹{(totalPrice + TOUR_FEE).toLocaleString('en-IN')}</span>
              </div>

              <p className="mt-2 mb-3" style={{ color: '#4caf50', fontSize: '12px', fontWeight: 600 }}>
                ✓ You're saving ₹{Math.round(totalPrice * 0.1).toLocaleString('en-IN')} on this trip!
              </p>

              <button className="btn btn-gradient w-100" onClick={handleBook}>
                PROCEED TO BOOK
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Cart;
