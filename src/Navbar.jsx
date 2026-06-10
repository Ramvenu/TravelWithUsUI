import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  FaShoppingCart, FaSignOutAlt, FaSignInAlt,
  FaMapMarkerAlt, FaSearch,
} from "react-icons/fa";
import { useCart } from "./contexts/CartContext";
import { useAuth } from "./contexts/AuthContext";
import SideNav from "./SideNav";
import "./Navbar.css";

const CATEGORIES = ["All", "Monuments", "Devotional", "Nature", "Culture"];
const LOCATIONS  = ["Hyderabad", "Mumbai", "Delhi", "Bangalore", "Goa", "Jaipur", "Chennai"];

/* ── Hexagonal Compass Rose logo ── */
function Logo() {
  return (
    <svg width="44" height="50" viewBox="0 0 44 50" aria-hidden="true">
      <defs>
        <linearGradient id="hexG" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#1e3a5f" />
          <stop offset="100%" stopColor="#0c4a6e" />
        </linearGradient>
        <linearGradient id="arrowG" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%"   stopColor="#d97706" />
          <stop offset="100%" stopColor="#fbbf24" />
        </linearGradient>
      </defs>
      {/* Hexagon body */}
      <path d="M22 2 L41 13 L41 37 L22 48 L3 37 L3 13 Z"
            fill="url(#hexG)" stroke="#f59e0b" strokeWidth="1.5" />
      {/* Faint cross lines */}
      <line x1="22" y1="11" x2="22" y2="39" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" />
      <line x1="8"  y1="25" x2="36" y2="25" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" />
      {/* North arrow — gold/prominent */}
      <polygon points="22,11 25.5,23 22,20.5 18.5,23" fill="url(#arrowG)" />
      {/* S / E / W arrows — faint white */}
      <polygon points="22,39 25.5,27 22,29.5 18.5,27" fill="rgba(255,255,255,0.28)" />
      <polygon points="36,25 24,21.5 26,25 24,28.5"   fill="rgba(255,255,255,0.28)" />
      <polygon points="8,25  20,21.5 18,25 20,28.5"   fill="rgba(255,255,255,0.28)" />
      {/* Centre ring */}
      <circle cx="22" cy="25" r="4"   fill="#fbbf24" />
      <circle cx="22" cy="25" r="2.2" fill="#0b1f3a" />
      {/* N label */}
      <text x="22" y="9.5" textAnchor="middle"
            fill="#fbbf24" fontSize="5.5" fontWeight="800" fontFamily="Arial,sans-serif">N</text>
    </svg>
  );
}

export default function Navbar({ activePage }) {
  const [searchParams] = useSearchParams();
  const [search,   setSearch]   = useState(searchParams.get("q")   || "");
  const [category, setCategory] = useState(searchParams.get("cat") || "All");
  const [location, setLocation] = useState("Hyderabad");

  const navigate       = useNavigate();
  const { totalItems } = useCart();
  const { user, logout } = useAuth();

  const goSearch = (e) => {
    e?.preventDefault();
    const p = new URLSearchParams();
    if (search.trim())      p.set("q",   search.trim());
    if (category !== "All") p.set("cat", category);
    navigate(`/?${p.toString()}`);
  };

  const goCategory = (cat) => {
    setCategory(cat);
    const p = new URLSearchParams();
    if (cat !== "All") p.set("cat", cat);
    navigate(`/?${p.toString()}`);
  };

  return (
    <div className="nx-wrap">

      {/* ═══════ ROW 1 — Dark Command Bar ═══════ */}
      <header className="nx-bar">

        {/* LEFT — hamburger + compass logo + brand */}
        <div className="nx-left">
          <SideNav />
          <div className="nx-logo" onClick={() => navigate("/")}>
            <Logo />
            <div className="nx-brand-block">
              <span className="nx-brand">
                <span className="nx-b-hyd">HYD</span><span className="nx-b-vista">VISTA</span>
              </span>
              <span className="nx-tagline">EXPLORE · HYDERABAD</span>
            </div>
          </div>
        </div>

        {/* CENTRE — floating search pill + location */}
        <div className="nx-center">
          <form className="nx-search" onSubmit={goSearch}>
            <select
              className="nx-search-cat"
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
            <span className="nx-search-rule" />
            <input
              type="text"
              className="nx-search-input"
              placeholder="Search monuments, lakes, culture spots…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <button type="submit" className="nx-search-btn" aria-label="Search">
              <FaSearch />
            </button>
          </form>

          <div className="nx-dest">
            <FaMapMarkerAlt className="nx-pin" />
            <div>
              <span className="nx-dest-label">Destination</span>
              <select className="nx-dest-sel" value={location} onChange={e => setLocation(e.target.value)}>
                {LOCATIONS.map(l => <option key={l}>{l}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* RIGHT — cart + auth */}
        <div className="nx-right">
          <button className="nx-cart" onClick={() => navigate("/cart")}>
            <span className="nx-cart-ico">
              <FaShoppingCart />
              {totalItems > 0 && <span className="nx-cart-dot">{totalItems}</span>}
            </span>
            <span className="nx-cart-txt">Trip Cart</span>
          </button>

          {user ? (
            <div className="nx-user">
              <span className="nx-user-name">👤 {user.username || "Traveller"}</span>
              <button className="nx-logout" onClick={() => { logout(); navigate("/login"); }}>
                <FaSignOutAlt /> Sign Out
              </button>
            </div>
          ) : (
            <button className="nx-signin" onClick={() => navigate("/login")}>
              <FaSignInAlt />
              <span className="nx-signin-txt">
                <small>Hello, Guest</small>
                <strong>Sign In</strong>
              </span>
            </button>
          )}
        </div>
      </header>

      {/* ═══════ ROW 2 — Capsule Nav Strip ═══════ */}
      <nav className="nx-strip">
        {/* Page links */}
        <div className="nx-strip-group">
          <button className={`nx-pill${activePage === "home"    ? " nx-pill-on" : ""}`} onClick={() => navigate("/")}>🏠 Home</button>
          <button className={`nx-pill${activePage === "places"  ? " nx-pill-on" : ""}`} onClick={() => navigate("/places")}>📍 Places</button>
          <button className={`nx-pill${activePage === "gallery" ? " nx-pill-on" : ""}`} onClick={() => navigate("/gallery")}>🖼️ Gallery</button>
          <button className={`nx-pill${activePage === "contact" ? " nx-pill-on" : ""}`} onClick={() => navigate("/contact")}>📞 Contact</button>
        </div>

        <span className="nx-stripe" />

        {/* Category shortcuts */}
        <div className="nx-strip-group">
          <button className="nx-pill nx-pill-cat" onClick={() => goCategory("Monuments")}>
            <span className="nx-cat-dot" style={{ background: "#d97706" }} />🏛️ Monuments
          </button>
          <button className="nx-pill nx-pill-cat" onClick={() => goCategory("Devotional")}>
            <span className="nx-cat-dot" style={{ background: "#db2777" }} />🛕 Devotional
          </button>
          <button className="nx-pill nx-pill-cat" onClick={() => goCategory("Nature")}>
            <span className="nx-cat-dot" style={{ background: "#059669" }} />🌿 Nature
          </button>
          <button className="nx-pill nx-pill-cat" onClick={() => goCategory("Culture")}>
            <span className="nx-cat-dot" style={{ background: "#3b82f6" }} />🎭 Culture
          </button>
        </div>

        <span className="nx-stripe" />

        {/* Utility */}
        <div className="nx-strip-group">
          <button className={`nx-pill${activePage === "cart" ? " nx-pill-on" : ""}`} onClick={() => navigate("/cart")}>🎒 Trip Cart</button>
          <button className="nx-pill" onClick={() => navigate("/contact")}>❓ Help</button>
        </div>
      </nav>

    </div>
  );
}
