import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock,
  FaFacebookF, FaTwitter, FaInstagram, FaYoutube,
  FaArrowUp, FaPaperPlane, FaStar,
} from "react-icons/fa";
import "./Footer.css";

const QUICK_LINKS = [
  { label: "🏠 Home",         path: "/" },
  { label: "📍 Places",        path: "/places" },
  { label: "🖼️ Gallery",       path: "/gallery" },
  { label: "📞 Contact Us",    path: "/contact" },
  { label: "🎒 Trip Cart",     path: "/cart" },
  { label: "🏷️ Offers & Deals",path: "/" },
  { label: "❓ Help & FAQs",   path: "/contact" },
];

const DESTINATIONS = [
  "Charminar",
  "Golconda Fort",
  "Hussain Sagar Lake",
  "Ramoji Film City",
  "Birla Mandir",
  "Salar Jung Museum",
  "KBR National Park",
  "Laad Bazaar",
  "Qutb Shahi Tombs",
  "Nehru Zoological Park",
];

const SERVICES = [
  "Tour Packages",
  "Adventure Sports",
  "Hotel Booking",
  "Flight Booking",
  "Travel Insurance",
  "Visa Assistance",
  "Food Tours",
  "Photography Tours",
  "Cultural Experiences",
  "Travel Guide",
];

const SOCIALS = [
  { icon: <FaFacebookF />, label: "Facebook",  href: "#", color: "#1877f2" },
  { icon: <FaTwitter />,   label: "Twitter",   href: "#", color: "#1da1f2" },
  { icon: <FaInstagram />, label: "Instagram", href: "#", color: "#e1306c" },
  { icon: <FaYoutube />,   label: "YouTube",   href: "#", color: "#ff0000" },
];

/* ── Back-to-Top: vertical bar + circle button ── */
function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className={`btt-wrap${visible ? " btt-show" : ""}`} onClick={scrollTop} title="Back to top" role="button" aria-label="Back to top">
      <div className="btt-bar" />
      <button className="btt-btn" tabIndex={visible ? 0 : -1}>
        <FaArrowUp />
      </button>
    </div>
  );
}

/* ── Main Footer component ── */
export default function Footer() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) { setSubscribed(true); setEmail(""); }
  };

  return (
    <>
      <footer className="ft-root">

        {/* ── Newsletter Strip ── */}
        <div className="ft-newsletter">
          <div className="ft-nl-left">
            <span className="ft-nl-icon">✉️</span>
            <div>
              <p className="ft-nl-title">Get Exclusive Travel Deals</p>
              <p className="ft-nl-sub">Join 50,000+ travellers — Hyderabad insider tips, early-bird offers &amp; more.</p>
            </div>
          </div>
          {subscribed ? (
            <p className="ft-nl-thanks">🎉 Thanks! You're on the list.</p>
          ) : (
            <form className="ft-nl-form" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="ft-nl-input"
              />
              <button type="submit" className="ft-nl-btn">
                <FaPaperPlane /> Subscribe
              </button>
            </form>
          )}
        </div>

        {/* ── Main 5-Column Grid ── */}
        <div className="ft-grid">

          {/* Col 1 — Brand */}
          <div className="ft-col ft-col-brand">
            <div className="ft-brand-logo">
              <span className="ft-brand-compass">🧭</span>
              <div>
                <span className="ft-brand-name">
                  <span className="ft-bn-hyd">HYD</span><span className="ft-bn-vista">VISTA</span>
                </span>
                <span className="ft-brand-tag">Explore Hyderabad</span>
              </div>
            </div>
            <p className="ft-brand-desc">
              Your ultimate guide to Hyderabad's rich heritage, vibrant culture, and natural wonders.
              Curated experiences for every kind of traveller.
            </p>
            <div className="ft-rating">
              {[1,2,3,4,5].map(i => <FaStar key={i} className={i <= 4 ? "ft-star-fill" : "ft-star-half"} />)}
              <span>4.9 · Rated by 50,000+ Travellers</span>
            </div>
            <div className="ft-socials">
              {SOCIALS.map(s => (
                <a key={s.label} href={s.href} className="ft-social-icon"
                   aria-label={s.label} style={{ "--sc": s.color }}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Quick Links */}
          <div className="ft-col">
            <h4 className="ft-col-title">Quick Links</h4>
            <ul className="ft-links">
              {QUICK_LINKS.map(l => (
                <li key={l.label}>
                  <button className="ft-link" onClick={() => navigate(l.path)}>{l.label}</button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Popular Destinations */}
          <div className="ft-col">
            <h4 className="ft-col-title">Popular Destinations</h4>
            <ul className="ft-links">
              {DESTINATIONS.map(d => (
                <li key={d}>
                  <button className="ft-link" onClick={() => navigate("/places")}>📍 {d}</button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Travel Services */}
          <div className="ft-col">
            <h4 className="ft-col-title">Travel Services</h4>
            <ul className="ft-links">
              {SERVICES.map(s => (
                <li key={s}>
                  <button className="ft-link" onClick={() => navigate("/places")}>→ {s}</button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5 — Contact */}
          <div className="ft-col">
            <h4 className="ft-col-title">Contact Us</h4>
            <ul className="ft-contact-list">
              <li>
                <FaMapMarkerAlt className="ft-ci" />
                <span>12, Tourism Plaza, MG Road,<br />Hyderabad, Telangana – 500001</span>
              </li>
              <li>
                <FaPhone className="ft-ci" />
                <span>+91 98765 43210<br />+91 04028 112233</span>
              </li>
              <li>
                <FaEnvelope className="ft-ci" />
                <span>support@hydvista.in<br />bookings@hydvista.in</span>
              </li>
              <li>
                <FaClock className="ft-ci" />
                <span>Mon – Sat: 9:00 AM – 7:00 PM<br />Sunday: 10:00 AM – 4:00 PM</span>
              </li>
            </ul>

            <div className="ft-badges">
              <span className="ft-badge">✅ Govt. Approved</span>
              <span className="ft-badge">🏆 Best Tour Operator 2024</span>
            </div>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="ft-bottom">
          <p className="ft-copy">© 2024 HydVista Tourism. All rights reserved. Made with ❤️ in Hyderabad.</p>
          <div className="ft-bottom-links">
            <button className="ft-bl" onClick={() => navigate("/contact")}>Privacy Policy</button>
            <span className="ft-dot">·</span>
            <button className="ft-bl" onClick={() => navigate("/contact")}>Terms of Service</button>
            <span className="ft-dot">·</span>
            <button className="ft-bl" onClick={() => navigate("/contact")}>Sitemap</button>
          </div>
        </div>

      </footer>

      {/* ── Back-to-Top ── */}
      <BackToTop />
    </>
  );
}
