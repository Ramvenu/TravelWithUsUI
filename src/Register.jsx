import { useState } from "react";
import { Link } from 'react-router-dom';
import LeftPanel from "./LeftPanel";

function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone Number is required";
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Registration successful:", formData);
    }
  };

  const fields = [
    { name: 'fullName',        type: 'text',     placeholder: 'Full Name' },
    { name: 'username',        type: 'text',     placeholder: 'Username' },
    { name: 'email',           type: 'email',    placeholder: 'Email Address' },
    { name: 'phone',           type: 'tel',      placeholder: 'Phone Number' },
    { name: 'password',        type: 'password', placeholder: 'Password' },
    { name: 'confirmPassword', type: 'password', placeholder: 'Confirm Password' },
  ];

  return (
<<<<<<< HEAD
    <div className="d-flex vh-100 overflow-hidden">
      <LeftPanel
        title="Travel With Us"
        description="Discover amazing destinations and create unforgettable memories."
      />

      <div
        className="col-12 col-md-7 d-flex justify-content-center align-items-center bg-light"
        style={{ overflowY: 'auto' }}
      >
        <div className="bg-white rounded-4 shadow p-4 my-4" style={{ width: '100%', maxWidth: '500px' }}>

          <h2 className="text-center mb-4 fw-semibold" style={{ color: '#333' }}>
            Create Account
          </h2>

          {fields.map(({ name, type, placeholder }) => (
            <div key={name} className="position-relative mb-3">
              {errors[name] && <span className="error-text">{errors[name]}</span>}
              <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={formData[name]}
                onChange={handleChange}
                className={`input-underline w-100${errors[name] ? ' error-input' : ''}`}
              />
            </div>
          ))}

          <button className="btn btn-gradient w-100 mt-2" onClick={handleRegister}>
            REGISTER
          </button>

          <p className="text-center mt-3 mb-0" style={{ color: '#666', fontSize: '13px' }}>
            Already have an account?{' '}
            <Link to="/login" className="link-accent">Login</Link>
=======
    <div className="auth-container">
      <LeftPanel 
        title="Travel With Us" 
        description="Discover amazing destinations and create unforgettable memories."
      />

      <div className="auth-right">
        <div className="auth-card">
          <h2>Create Account</h2>
          <div className="form-group">
            <input 
              type="text" 
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className={`auth-input ${errors.fullName ? 'is-invalid' : ''}`}
            />
            {errors.fullName && <span className="error-text">{errors.fullName}</span>}
          </div>
          
          <div className="form-group">
            <input 
              type="text" 
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className={`auth-input ${errors.username ? 'is-invalid' : ''}`}
            />
            {errors.username && <span className="error-text">{errors.username}</span>}
          </div>
          
          <div className="form-group">
            <input 
              type="email" 
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className={`auth-input ${errors.email ? 'is-invalid' : ''}`}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>
          
          <div className="form-group">
            <input 
              type="tel" 
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className={`auth-input ${errors.phone ? 'is-invalid' : ''}`}
            />
            {errors.phone && <span className="error-text">{errors.phone}</span>}
          </div>
          
          <div className="form-group">
            <input 
              type="password" 
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={`auth-input ${errors.password ? 'is-invalid' : ''}`}
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>
          
          <div className="form-group">
            <input 
              type="password" 
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`auth-input ${errors.confirmPassword ? 'is-invalid' : ''}`}
            />
            {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
          </div>
          
          <button className="btn auth-btn" onClick={handleRegister}>
            REGISTER
          </button>
          <p className="auth-footer">
            Already have an account? <Link to="/login">Login</Link>
>>>>>>> be9a2dd477809db787db02d5762bdd08a03ce316
          </p>

        </div>
      </div>
    </div>
  );
}

export default Register;
