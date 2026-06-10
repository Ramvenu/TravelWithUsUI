import { useState } from "react";
import Footer from "./Footer";
import {
  FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock,
  FaFacebookF, FaTwitter, FaInstagram, FaYoutube,
  FaPaperPlane, FaCheckCircle,
} from "react-icons/fa";
import Navbar from "./Navbar";
import "./Contact.css";

export default function Contact() {

  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", subject: "", message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(er => ({ ...er, [name]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!formData.name.trim())    e.name    = "Name is required";
    if (!formData.email.trim())   e.email   = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
                                  e.email   = "Enter a valid email";
    if (!formData.phone.trim())   e.phone   = "Phone is required";
    else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, "")))
                                  e.phone   = "Enter a valid 10-digit number";
    if (!formData.subject.trim()) e.subject = "Subject is required";
    if (!formData.message.trim()) e.message = "Message is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <div className="contact-wrapper">

      {/* ── Navbar ── */}
      <Navbar activePage="contact" />

      {/* ── Hero Banner ── */}
      <section className="contact-hero">
        <div className="contact-hero-content">
          <h1>Get In Touch</h1>
          <p>We'd love to hear from you. Reach out to plan your perfect Hyderabad trip.</p>
        </div>
      </section>

      {/* ── Info Cards ── */}
      <section className="contact-info-strip">
        <div className="info-card">
          <div className="info-icon"><FaPhone /></div>
          <h4>Call Us</h4>
          <p>+91 98765 43210</p>
          <p>+91 04028 112233</p>
        </div>
        <div className="info-card">
          <div className="info-icon"><FaEnvelope /></div>
          <h4>Email Us</h4>
          <p>support@hydvista.in</p>
          <p>bookings@hydvista.in</p>
        </div>
        <div className="info-card">
          <div className="info-icon"><FaMapMarkerAlt /></div>
          <h4>Visit Us</h4>
          <p>12, Tourism Plaza, MG Road</p>
          <p>Hyderabad, Telangana – 500001</p>
        </div>
        <div className="info-card">
          <div className="info-icon"><FaClock /></div>
          <h4>Working Hours</h4>
          <p>Mon – Sat: 9:00 AM – 7:00 PM</p>
          <p>Sunday: 10:00 AM – 4:00 PM</p>
        </div>
      </section>

      {/* ── Main Content: Form + Map ── */}
      <section className="contact-main">

        {/* Contact Form */}
        <div className="contact-form-box">
          <h2>Send Us a Message</h2>
          <p className="form-subtitle">Fill in the details below and our team will respond within 24 hours.</p>

          {submitted && (
            <div className="success-banner">
              <FaCheckCircle className="me-2" />
              Thank you! Your message has been sent. We'll get back to you soon.
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <div className={`cf-group${errors.name ? " has-error" : ""}`}>
                <label>Full Name <span>*</span></label>
                <input type="text" name="name" placeholder="Your full name"
                  value={formData.name} onChange={handleChange} />
                {errors.name && <span className="cf-error">{errors.name}</span>}
              </div>
              <div className={`cf-group${errors.email ? " has-error" : ""}`}>
                <label>Email Address <span>*</span></label>
                <input type="email" name="email" placeholder="your@email.com"
                  value={formData.email} onChange={handleChange} />
                {errors.email && <span className="cf-error">{errors.email}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className={`cf-group${errors.phone ? " has-error" : ""}`}>
                <label>Phone Number <span>*</span></label>
                <input type="tel" name="phone" placeholder="10-digit mobile number"
                  value={formData.phone} onChange={handleChange} />
                {errors.phone && <span className="cf-error">{errors.phone}</span>}
              </div>
              <div className={`cf-group${errors.subject ? " has-error" : ""}`}>
                <label>Subject <span>*</span></label>
                <select name="subject" value={formData.subject} onChange={handleChange}>
                  <option value="">Select a topic</option>
                  <option value="Booking Inquiry">Booking Inquiry</option>
                  <option value="Tour Packages">Tour Packages</option>
                  <option value="Payment Issue">Payment Issue</option>
                  <option value="Cancellation">Cancellation / Refund</option>
                  <option value="General Query">General Query</option>
                  <option value="Feedback">Feedback</option>
                </select>
                {errors.subject && <span className="cf-error">{errors.subject}</span>}
              </div>
            </div>

            <div className={`cf-group${errors.message ? " has-error" : ""}`}>
              <label>Message <span>*</span></label>
              <textarea name="message" rows={5} placeholder="Describe your query in detail..."
                value={formData.message} onChange={handleChange} />
              {errors.message && <span className="cf-error">{errors.message}</span>}
            </div>

            <button type="submit" className="cf-submit-btn">
              <FaPaperPlane className="me-2" /> Send Message
            </button>
          </form>
        </div>

        {/* Map + Quick Support */}
        <div className="contact-map-box">
          <h2>Our Location</h2>
          <p className="form-subtitle">Find us at our Hyderabad office near Charminar.</p>

          <div className="map-frame">
            <iframe
              title="HydVista Office Location"
              src="https://maps.google.com/maps?q=Charminar,Hyderabad,Telangana&t=&z=15&ie=UTF8&iwloc=&output=embed"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Quick Support */}
          <div className="quick-support">
            <h3>Quick Support</h3>
            <ul>
              <li>
                <FaPhone className="qs-icon" />
                <div>
                  <strong>Toll Free Helpline</strong>
                  <span>1800-123-4567 (9 AM – 9 PM)</span>
                </div>
              </li>
              <li>
                <FaEnvelope className="qs-icon" />
                <div>
                  <strong>Email Support</strong>
                  <span>support@hydvista.in</span>
                </div>
              </li>
              <li>
                <FaMapMarkerAlt className="qs-icon" />
                <div>
                  <strong>Head Office</strong>
                  <span>12, Tourism Plaza, MG Road, Hyderabad – 500001</span>
                </div>
              </li>
            </ul>

            <div className="social-row">
              <span>Follow Us</span>
              <div className="social-links">
                <a href="#" aria-label="Facebook"><FaFacebookF /></a>
                <a href="#" aria-label="Twitter"><FaTwitter /></a>
                <a href="#" aria-label="Instagram"><FaInstagram /></a>
                <a href="#" aria-label="YouTube"><FaYoutube /></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
