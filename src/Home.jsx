import { useNavigate, useSearchParams } from "react-router-dom";
import { FaMapMarkerAlt, FaClock, FaStar, FaStarHalfAlt, FaRegStar, FaCheck } from "react-icons/fa";
import "./Home.css";
import { useCart } from "./contexts/CartContext";
import Navbar from "./Navbar";
import Footer from "./Footer";

const CAT_COLORS = {
  Monuments: { bg: "#fef3c7", text: "#d97706" },
  Devotional: { bg: "#fce7f3", text: "#be185d" },
  Nature:     { bg: "#d1fae5", text: "#065f46" },
  Culture:    { bg: "#dbeafe", text: "#1e40af" },
};

/* Wikimedia Commons FilePath redirect — no hash path needed, always resolves */
const W = (f) => `https://commons.wikimedia.org/wiki/Special:FilePath/${f}`;

const PLACES = [
  {
    id: 1, name: "Charminar", category: "Monuments",
    location: "Old City, Hyderabad", rating: 4.8, reviews: 12450,
    price: 1999, duration: "2–3 hrs", badge: "Most Popular",
    image: W("Charminar_at_Hyderabad_India.jpg"),
    desc: "The iconic 16th-century mosque — symbol of Hyderabad, built in 1591 by Sultan Muhammad Quli Qutb Shah. A stunning blend of Indo-Islamic architecture surrounded by the vibrant Laad Bazaar.",
    highlights: ["4 grand minarets & arches", "Laad Bazaar bangle market", "Evening illumination show"],
  },
  {
    id: 2, name: "Golconda Fort", category: "Monuments",
    location: "Ibrahim Bagh, Hyderabad", rating: 4.7, reviews: 9820,
    price: 2499, duration: "3–4 hrs", badge: "Heritage Site",
    image: W("Golconda_fort_India.jpg"),
    desc: "A magnificent medieval citadel with a world-famous acoustic system, once the global hub for diamond trade. The nightly light-and-sound show is an unmissable experience.",
    highlights: ["Acoustic clapping system", "Nightly light & sound show", "Panoramic city views"],
  },
  {
    id: 3, name: "Chowmahalla Palace", category: "Monuments",
    location: "Khilwat, Old City", rating: 4.6, reviews: 6230,
    price: 1799, duration: "2–3 hrs", badge: "",
    image: W("Chowmahalla_Palace.jpg"),
    desc: "Opulent seat of the Asaf Jahi Nizams featuring baroque and Indo-Saracenic architecture. Its vintage royal car collection and Durbar Hall leave every visitor awestruck.",
    highlights: ["Vintage royal car collection", "Magnificent Durbar Hall", "Pristine Mughal gardens"],
  },
  {
    id: 4, name: "Birla Mandir", category: "Devotional",
    location: "Naubat Pahad Hill, Hyderabad", rating: 4.9, reviews: 15100,
    price: 499, duration: "1–2 hrs", badge: "Free for Children",
    image: W("Birla_Mandir_Hyderabad.jpg"),
    desc: "A stunning white Rajasthani marble Venkateswara temple perched on a hill, offering breathtaking panoramic views of Hussain Sagar and the city skyline at dusk.",
    highlights: ["Gleaming white marble architecture", "Hilltop panoramic views", "Serene meditation area"],
  },
  {
    id: 5, name: "Chilkur Balaji Temple", category: "Devotional",
    location: "Chilkur, Hyderabad", rating: 4.8, reviews: 8720,
    price: 299, duration: "1–2 hrs", badge: "Visa Balaji",
    image: W("Chilkur_Balaji_Temple.jpg"),
    desc: "Known as the 'Visa Balaji' temple — millions visit this 500-year-old Vaishnava shrine for blessings for foreign travel. Unique for having no donation box or prasadam charges.",
    highlights: ["Ancient 500-year-old shrine", "No donation box policy", "Circumambulation ritual"],
  },
  {
    id: 6, name: "Mecca Masjid", category: "Devotional",
    location: "Charminar Area, Hyderabad", rating: 4.7, reviews: 7350,
    price: 199, duration: "1 hr", badge: "",
    image: W("Mecca_Masjid_Hyderabad.jpg"),
    desc: "One of India's oldest and largest mosques, built in 1694. Bricks sourced directly from Mecca were used in the central arch, lending the mosque its iconic and sacred name.",
    highlights: ["Bricks from Mecca", "Capacity 10,000 worshippers", "15 arches of granite"],
  },
  {
    id: 7, name: "Hussain Sagar Lake", category: "Nature",
    location: "Tank Bund Road, Hyderabad", rating: 4.5, reviews: 18920,
    price: 999, duration: "2–3 hrs", badge: "Family Favourite",
    image: W("Hussain_Sagar.jpg"),
    desc: "A heart-shaped lake from 1562, home to the iconic 18-metre monolithic Buddha statue on the Rock of Gibraltar island. Enjoy speedboat rides and glittering lakeshore gardens.",
    highlights: ["Giant Buddha statue island", "Speedboat & cruise rides", "Lumbini Park & NTR Garden"],
  },
  {
    id: 8, name: "KBR National Park", category: "Nature",
    location: "Jubilee Hills, Hyderabad", rating: 4.6, reviews: 5410,
    price: 599, duration: "2–3 hrs", badge: "Eco Retreat",
    image: W("KBR_National_Park_Hyderabad.jpg"),
    desc: "A 390-acre urban forest and biodiversity reserve in the heart of the city. Perfect for morning treks, bird watching, and a refreshing escape from the urban bustle.",
    highlights: ["600+ plant species", "100+ bird species", "Morning trek trails"],
  },
  {
    id: 9, name: "Nehru Zoological Park", category: "Nature",
    location: "Mir Alam Tank Road, Hyderabad", rating: 4.4, reviews: 11200,
    price: 1299, duration: "4–5 hrs", badge: "",
    image: W("Nehru_Zoological_Park.jpg"),
    desc: "One of India's largest zoos spanning 380 acres with over 1,500 animals including Bengal tigers, African lions, giraffes, and Asian elephants. A full-day family adventure.",
    highlights: ["Tiger & lion safari zone", "Butterfly park", "Toy train ride"],
  },
  {
    id: 10, name: "Salar Jung Museum", category: "Culture",
    location: "Dar-ul-Shifa, Hyderabad", rating: 4.7, reviews: 9340,
    price: 1799, duration: "3–4 hrs", badge: "National Museum",
    image: W("Salar_Jung_Museum.jpg"),
    desc: "One of three National Museums of India, housing Nawab Salar Jung III's priceless collection of art, antiques, manuscripts, and sculptures gathered from across the world.",
    highlights: ["Famous Musical Clock show", "Veiled Rebecca sculpture", "Priceless jade collection"],
  },
  {
    id: 11, name: "Ramoji Film City", category: "Culture",
    location: "Hayathnagar, Hyderabad", rating: 4.8, reviews: 22100,
    price: 3499, duration: "Full Day", badge: "Guinness Record",
    image: W("Ramoji_Film_City.jpg"),
    desc: "World's largest integrated film studio complex (Guinness certified), spanning 1666 acres with themed entertainment zones, 50+ daily live shows, and Bollywood studio tours.",
    highlights: ["50+ live shows daily", "Bollywood studio tours", "1666-acre themed campus"],
  },
  {
    id: 12, name: "Laad Bazaar", category: "Culture",
    location: "Near Charminar, Hyderabad", rating: 4.5, reviews: 6800,
    price: 799, duration: "2–3 hrs", badge: "",
    image: W("Laad_Bazaar.jpg"),
    desc: "A 400-year-old street bazaar near Charminar, sparkling with lacquer bangles, natural pearls, bridal wear, and traditional Hyderabadi street food at every turn.",
    highlights: ["Famous lacquer bangle shops", "Pearl & gold jewellery", "Hyderabadi street food"],
  },
];

const CAT_ICONS = { Monuments:"🏛️", Devotional:"🛕", Nature:"🌿", Culture:"🎭" };
const CAT_GRAD  = {
  Monuments: "#92400e,#d97706", Devotional: "#831843,#db2777",
  Nature:    "#064e3b,#059669", Culture:    "#1e3a8a,#3b82f6",
};
function imgFallback(e, name, category) {
  e.target.onerror = null;
  const [c1, c2] = (CAT_GRAD[category] || "#0369a1,#0ea5e9").split(",");
  const icon = CAT_ICONS[category] || "🗺️";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="700" height="460">
    <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${c1}"/><stop offset="100%" stop-color="${c2}"/>
    </linearGradient></defs>
    <rect width="700" height="460" fill="url(%23g)"/>
    <text x="350" y="185" text-anchor="middle" font-size="68" font-family="serif">${icon}</text>
    <text x="350" y="262" text-anchor="middle" fill="white" font-size="22" font-weight="700" font-family="Arial,sans-serif">${name}</text>
    <text x="350" y="295" text-anchor="middle" fill="rgba(255,255,255,0.72)" font-size="13" font-family="Arial,sans-serif">Hyderabad · ${category}</text>
  </svg>`;
  e.target.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function StarRating({ rating }) {
  return (
    <span className="hm-stars">
      {[1, 2, 3, 4, 5].map(i =>
        i <= Math.floor(rating)  ? <FaStar key={i} /> :
        i - rating < 1           ? <FaStarHalfAlt key={i} /> :
                                   <FaRegStar key={i} />
      )}
    </span>
  );
}

export default function Home() {
  const [searchParams] = useSearchParams();
  const { cart, addToCart, totalItems } = useCart();
  const navigate = useNavigate();

  const q   = searchParams.get("q")   || "";
  const cat = searchParams.get("cat") || "All";

  const inCart = (name) => cart.some(i => i.name === name);

  const filtered = PLACES.filter(p => {
    const matchQ = !q ||
      p.name.toLowerCase().includes(q.toLowerCase()) ||
      p.desc.toLowerCase().includes(q.toLowerCase()) ||
      p.location.toLowerCase().includes(q.toLowerCase()) ||
      p.category.toLowerCase().includes(q.toLowerCase());
    const matchCat = cat === "All" || p.category === cat;
    return matchQ && matchCat;
  });

  const isFiltered = q !== "" || cat !== "All";

  const clearFilters = () => navigate("/");

  return (
    <div className="home-container">
      <Navbar activePage="home" />

      {/* ── Hero Banner (compact) ── */}
      {!isFiltered && (
        <section className="hm-hero">
          <div className="hm-hero-inner">
            <span className="hm-hero-chip">🌟 Discover & Explore</span>
            <h1>Welcome to HydVista</h1>
            <p>Hyderabad's finest tourist experiences — monuments, nature, culture &amp; spirituality</p>
            <div className="hm-hero-stats">
              <div className="hm-stat"><strong>{PLACES.length}+</strong><span>Destinations</span></div>
              <div className="hm-stat-div" />
              <div className="hm-stat"><strong>4</strong><span>Categories</span></div>
              <div className="hm-stat-div" />
              <div className="hm-stat"><strong>50K+</strong><span>Happy Visitors</span></div>
            </div>
          </div>
        </section>
      )}

      {/* ── Places Body ── */}
      <main className="home-body">

        {/* Result header */}
        <div className="hb-header">
          {isFiltered ? (
            <>
              <h2 className="hb-title">
                {filtered.length} result{filtered.length !== 1 ? "s" : ""}
                {q   && <> for <em>"{q}"</em></>}
                {cat !== "All" && <> in <em>{cat}</em></>}
              </h2>
              <button className="hb-clear" onClick={clearFilters}>✕ Clear filters</button>
            </>
          ) : (
            <h2 className="hb-title">Popular Destinations in Hyderabad</h2>
          )}
        </div>

        {/* Cards grid */}
        {filtered.length > 0 ? (
          <div className="hb-grid">
            {filtered.map(place => {
              const col   = CAT_COLORS[place.category];
              const added = inCart(place.name);
              return (
                <article className="hm-card" key={place.id}>

                  <div className="hmc-img-wrap">
                    <img src={place.image} alt={place.name} loading="lazy" onError={(e) => imgFallback(e, place.name, place.category)} />
                    {place.badge && <span className="hmc-top-badge">{place.badge}</span>}
                    <span className="hmc-cat-badge" style={{ background: col.bg, color: col.text }}>
                      {place.category}
                    </span>
                  </div>

                  <div className="hmc-body">
                    <h3 className="hmc-name">{place.name}</h3>

                    <div className="hmc-meta">
                      <span className="hmc-loc"><FaMapMarkerAlt /> {place.location}</span>
                      <span className="hmc-dur"><FaClock /> {place.duration}</span>
                    </div>

                    <div className="hmc-rating">
                      <StarRating rating={place.rating} />
                      <span className="hmc-rnum">{place.rating}</span>
                      <span className="hmc-reviews">({place.reviews.toLocaleString("en-IN")})</span>
                    </div>

                    <p className="hmc-desc">{place.desc}</p>

                    <ul className="hmc-highlights">
                      {place.highlights.map((h, i) => (
                        <li key={i}><FaCheck className="hmc-check" /> {h}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="hmc-footer">
                    <div className="hmc-price">
                      <span className="hmc-from">From</span>
                      <span className="hmc-amount">₹{place.price.toLocaleString("en-IN")}</span>
                      <span className="hmc-unit">/person</span>
                    </div>
                    <button
                      className={`hmc-cart-btn${added ? " added" : ""}`}
                      onClick={() => addToCart(place)}
                    >
                      {added ? "✓ Added" : "+ Add to Trip"}
                    </button>
                  </div>

                </article>
              );
            })}
          </div>
        ) : (
          <div className="hb-empty">
            <div className="hb-empty-icon">🔍</div>
            <h3>No places found</h3>
            <p>Try a different keyword or select a different category.</p>
            <button className="hb-clear" onClick={clearFilters}>Clear filters</button>
          </div>
        )}
      </main>

      {/* Floating cart bar */}
      {totalItems > 0 && (
        <div className="cart-floater" onClick={() => navigate("/cart")}>
          <span>{totalItems} {totalItems === 1 ? "place" : "places"} in trip</span>
          <span className="cart-floater-cta">View Trip Cart →</span>
        </div>
      )}

      <Footer />
    </div>
  );
}
