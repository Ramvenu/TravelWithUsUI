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
          </p>

        </div>
      </div>
    </div>
  );
}

export default Register;
