import { useState, useRef, useEffect } from "react";
import { FaUser, FaLock, FaPhone, FaFacebookF, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import LeftPanel from "./LeftPanel";
import { useAuth } from "./contexts/AuthContext";

/* ─── OTP input: 6 individual boxes ─── */
function OTPInput({ value, onChange }) {
  const inputs = useRef([]);

  const handleKey = (e, i) => {
    if (e.key === 'Backspace') {
      const next = [...value];
      next[i] = '';
      onChange(next);
      if (i > 0) inputs.current[i - 1]?.focus();
    }
  };

  const handleChange = (e, i) => {
    const ch = e.target.value.replace(/\D/, '').slice(-1);
    const next = [...value];
    next[i] = ch;
    onChange(next);
    if (ch && i < 5) inputs.current[i + 1]?.focus();
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const digits = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6).split('');
    const next = Array(6).fill('');
    digits.forEach((d, i) => { next[i] = d; });
    onChange(next);
    const focusIdx = Math.min(digits.length, 5);
    inputs.current[focusIdx]?.focus();
  };

  return (
    <div className="d-flex gap-2 justify-content-center my-3">
      {value.map((digit, i) => (
        <input
          key={i}
          ref={el => inputs.current[i] = el}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={e => handleChange(e, i)}
          onKeyDown={e => handleKey(e, i)}
          onPaste={handlePaste}
          className="otp-box"
        />
      ))}
    </div>
  );
}

/* ─── Resend countdown timer ─── */
function ResendTimer({ seconds, onResend }) {
  const [left, setLeft] = useState(seconds);
  useEffect(() => {
    if (left <= 0) return;
    const t = setTimeout(() => setLeft(l => l - 1), 1000);
    return () => clearTimeout(t);
  }, [left]);

  if (left > 0)
    return <p className="text-center" style={{ color: '#888', fontSize: '12px' }}>Resend OTP in 0:{String(left).padStart(2, '0')}</p>;

  return (
    <p className="text-center" style={{ fontSize: '12px' }}>
      Didn't receive it?{' '}
      <button className="btn btn-link p-0 link-accent" style={{ fontSize: '12px' }}
        onClick={() => { setLeft(seconds); onResend(); }}>Resend OTP</button>
    </p>
  );
}

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  /* tabs: 'email' | 'phone' */
  const [tab, setTab] = useState('email');

  /* email form */
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});
  const [remember, setRemember] = useState(false);

  /* phone / OTP */
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [otpStep, setOtpStep] = useState(false);
  const [demoOtp, setDemoOtp] = useState('');
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [otpError, setOtpError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(er => ({ ...er, [name]: '' }));
  };

  const validateEmail = () => {
    const e = {};
    if (!formData.username.trim()) e.username = 'Username is required';
    if (!formData.password.trim()) e.password = 'Password is required';
    setErrors(e);
    return !Object.keys(e).length;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!validateEmail()) return;
    login({ username: formData.username, method: 'email' }, remember);
    navigate('/');
  };

  const handleSendOtp = () => {
    if (!/^\d{10}$/.test(phone)) { setPhoneError('Enter a valid 10-digit number'); return; }
    setPhoneError('');
    const code = String(Math.floor(100000 + Math.random() * 900000));
    setDemoOtp(code);
    setOtp(Array(6).fill(''));
    setOtpStep(true);
  };

  const handleVerifyOtp = () => {
    const entered = otp.join('');
    if (entered.length < 6) { setOtpError('Please enter the complete OTP'); return; }
    if (entered !== demoOtp) { setOtpError('Incorrect OTP. Please try again.'); return; }
    login({ phone, method: 'phone' }, remember);
    navigate('/');
  };

  const divider = (
    <div className="d-flex align-items-center gap-2 my-3">
      <hr className="flex-grow-1 m-0" />
      <span style={{ color: '#aaa', fontSize: '12px', whiteSpace: 'nowrap' }}>OR</span>
      <hr className="flex-grow-1 m-0" />
    </div>
  );

  const socialButtons = (
    <>
      {divider}
      <button className="btn social-google-btn w-100 mb-2">
        <FaGoogle className="me-2" style={{ color: '#DB4437' }} /> Continue with Google
      </button>
      <button className="btn social-fb-btn w-100">
        <FaFacebookF className="me-2" style={{ color: '#1877F2' }} /> Continue with Facebook
      </button>
    </>
  );

  const signupLink = (
    <div className="text-center border-top pt-3 mt-3">
      <span style={{ color: '#666', fontSize: '12px' }}>New user? </span>
      <Link to="/register" className="link-accent fw-bold" style={{ fontSize: '13px' }}>CREATE ACCOUNT</Link>
    </div>
  );

  return (
    <div className="d-flex vh-100 overflow-hidden">
      <LeftPanel
        title="Welcome Back"
        description="Login to continue exploring amazing travel destinations and creating unforgettable memories with us."
      />

      <div className="col-12 col-md-7 d-flex justify-content-center align-items-center bg-light overflow-y-auto">
        <div className="bg-white rounded-4 shadow p-4" style={{ width: '100%', maxWidth: '480px' }}>

          <h1 className="text-center mb-3 fw-semibold" style={{ fontSize: '1.6rem', color: '#333' }}>Login</h1>

          {/* Tab switcher */}
          <div className="login-tabs mb-4">
            <button className={`login-tab${tab === 'email' ? ' active' : ''}`} onClick={() => { setTab('email'); setOtpStep(false); }}>
              <FaUser className="me-1" style={{ fontSize: '12px' }} /> Email
            </button>
            <button className={`login-tab${tab === 'phone' ? ' active' : ''}`} onClick={() => { setTab('phone'); setOtpStep(false); }}>
              <FaPhone className="me-1" style={{ fontSize: '12px' }} /> Phone
            </button>
          </div>

          {/* ── Email tab ── */}
          {tab === 'email' && (
            <>
              <div className="mb-3 position-relative">
                <label className="form-label fw-medium" style={{ fontSize: '13px', color: '#333' }}>Username</label>
                {errors.username && <span className="error-text">{errors.username}</span>}
                <div className={`input-icon-wrapper${errors.username ? ' error' : ''}`}>
                  <FaUser className="icon" />
                  <input type="text" name="username" placeholder="Type your username"
                    value={formData.username} onChange={handleChange} />
                </div>
              </div>

              <div className="mb-2 position-relative">
                <label className="form-label fw-medium" style={{ fontSize: '13px', color: '#333' }}>Password</label>
                {errors.password && <span className="error-text">{errors.password}</span>}
                <div className={`input-icon-wrapper${errors.password ? ' error' : ''}`}>
                  <FaLock className="icon" />
                  <input type="password" name="password" placeholder="Type your password"
                    value={formData.password} onChange={handleChange} />
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center mb-3">
                <label className="d-flex align-items-center gap-2" style={{ cursor: 'pointer', fontSize: '13px', color: '#555' }}>
                  <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)}
                    style={{ accentColor: '#9c4dff' }} />
                  Remember me
                </label>
                <Link to="/forgot-password" className="link-accent" style={{ fontSize: '12px' }}>Forgot password?</Link>
              </div>

              <button className="btn btn-gradient w-100 mb-1" onClick={handleLogin}>LOGIN</button>
              {socialButtons}
              {signupLink}
            </>
          )}

          {/* ── Phone tab ── */}
          {tab === 'phone' && !otpStep && (
            <>
              <div className="mb-3 position-relative">
                <label className="form-label fw-medium" style={{ fontSize: '13px', color: '#333' }}>Mobile Number</label>
                {phoneError && <span className="error-text">{phoneError}</span>}
                <div className={`input-icon-wrapper${phoneError ? ' error' : ''}`}>
                  <span style={{ color: '#9c4dff', fontWeight: 600, fontSize: '13px', marginRight: '8px', flexShrink: 0 }}>+91</span>
                  <input type="tel" placeholder="10-digit mobile number" maxLength={10}
                    value={phone}
                    onChange={e => { setPhone(e.target.value.replace(/\D/, '')); setPhoneError(''); }} />
                </div>
              </div>

              <button className="btn btn-gradient w-100 mb-1" onClick={handleSendOtp}>SEND OTP</button>
              {socialButtons}
              {signupLink}
            </>
          )}

          {/* ── OTP step ── */}
          {tab === 'phone' && otpStep && (
            <>
              <button className="btn btn-link p-0 link-accent mb-3" style={{ fontSize: '13px' }}
                onClick={() => setOtpStep(false)}>← Change Number</button>

              <p className="text-center mb-0" style={{ color: '#333', fontSize: '14px', fontWeight: 500 }}>Enter OTP</p>
              <p className="text-center mb-1" style={{ color: '#888', fontSize: '12px' }}>
                Sent to <strong>+91 {phone}</strong>
              </p>

              <div className="text-center mb-1 py-2 rounded-2" style={{ background: '#f0e6ff', fontSize: '12px', color: '#7c3aed' }}>
                Demo OTP: <strong style={{ letterSpacing: '4px' }}>{demoOtp}</strong>
              </div>

              <OTPInput value={otp} onChange={setOtp} />

              {otpError && <p className="text-center mb-2" style={{ color: '#e74c3c', fontSize: '12px' }}>{otpError}</p>}

              <ResendTimer seconds={60} onResend={() => { setDemoOtp(String(Math.floor(100000 + Math.random() * 900000))); setOtp(Array(6).fill('')); }} />

              <button className="btn btn-gradient w-100 mt-2" onClick={handleVerifyOtp}>VERIFY OTP</button>
              {signupLink}
            </>
          )}

        </div>
      </div>
    </div>
  );
}
