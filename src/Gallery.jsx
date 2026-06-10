import { useState, useEffect, useCallback } from "react";
import Footer from "./Footer";
import {
  FaTimes, FaChevronLeft, FaChevronRight,
  FaMapMarkerAlt, FaExpand,
} from "react-icons/fa";
import Navbar from "./Navbar";
import "./Gallery.css";

const CATEGORIES = ["All", "Monuments", "Devotional", "Nature", "Culture"];

const CATEGORY_COLORS = {
  Monuments: { bg: "#fef3c7", text: "#d97706", dot: "#f59e0b" },
  Devotional: { bg: "#fce7f3", text: "#be185d", dot: "#ec4899" },
  Nature:     { bg: "#d1fae5", text: "#065f46", dot: "#10b981" },
  Culture:    { bg: "#dbeafe", text: "#1e40af", dot: "#3b82f6" },
};

const W = (f) => `https://commons.wikimedia.org/wiki/Special:FilePath/${f}`;
const CAT_ICONS = { Monuments:"🏛️", Devotional:"🛕", Nature:"🌿", Culture:"🎭" };
const CAT_GRAD  = {
  Monuments:"#92400e,#d97706", Devotional:"#831843,#db2777",
  Nature:"#064e3b,#059669",    Culture:"#1e3a8a,#3b82f6",
};
function imgFallback(e, name, category) {
  e.target.onerror = null;
  const [c1,c2] = (CAT_GRAD[category]||"#0369a1,#0ea5e9").split(",");
  const icon = CAT_ICONS[category]||"🗺️";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="530">
    <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${c1}"/><stop offset="100%" stop-color="${c2}"/>
    </linearGradient></defs>
    <rect width="800" height="530" fill="url(%23g)"/>
    <text x="400" y="215" text-anchor="middle" font-size="72" font-family="serif">${icon}</text>
    <text x="400" y="300" text-anchor="middle" fill="white" font-size="26" font-weight="700" font-family="Arial,sans-serif">${name}</text>
    <text x="400" y="340" text-anchor="middle" fill="rgba(255,255,255,0.72)" font-size="15" font-family="Arial,sans-serif">Hyderabad · ${category}</text>
  </svg>`;
  e.target.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

const photos = [
  { id:1,  name:"Charminar",          category:"Monuments", location:"Old City, Hyderabad",            orient:"landscape",
    desc:"The iconic 16th-century mosque and monument — the symbol of Hyderabad, built in 1591 by Sultan Muhammad Quli Qutb Shah.",
    image: W("Charminar_at_Hyderabad_India.jpg") },
  { id:2,  name:"Birla Mandir",       category:"Devotional", location:"Naubat Pahad Hill, Hyderabad",  orient:"portrait",
    desc:"A stunning white marble Venkateswara temple perched on a hill, offering breathtaking views of the city and Hussain Sagar.",
    image: W("Birla_Mandir_Hyderabad.jpg") },
  { id:3,  name:"Golconda Fort",      category:"Monuments", location:"Ibrahim Bagh, Hyderabad",        orient:"landscape",
    desc:"A magnificent 16th-century fort known for its acoustic system, diamond trade history, and the famous light-and-sound show.",
    image: W("Golconda_fort_India.jpg") },
  { id:4,  name:"Mecca Masjid",       category:"Devotional", location:"Charminar, Hyderabad",          orient:"portrait",
    desc:"One of the oldest and largest mosques in India, built in 1694. Bricks from Mecca were used in the central arch, hence the name.",
    image: W("Mecca_Masjid_Hyderabad.jpg") },
  { id:5,  name:"Hussain Sagar Lake", category:"Nature",    location:"Tank Bund Road, Hyderabad",      orient:"landscape",
    desc:"A heart-shaped lake built in 1562, home to the iconic 18-metre monolithic Buddha statue standing on the Rock of Gibraltar island.",
    image: W("Hussain_Sagar.jpg") },
  { id:6,  name:"Chowmahalla Palace", category:"Monuments", location:"Khilwat, Old City",              orient:"portrait",
    desc:"The opulent seat of the Asaf Jahi dynasty, built in the 18th century. A spectacular complex of courtyards and halls.",
    image: W("Chowmahalla_Palace.jpg") },
  { id:7,  name:"Chilkur Balaji Temple", category:"Devotional", location:"Chilkur, Hyderabad",         orient:"landscape",
    desc:"Known as the 'Visa Balaji' temple, millions of devotees visit this ancient Vaishnava shrine seeking blessings for foreign travel.",
    image: W("Chilkur_Balaji_Temple.jpg") },
  { id:8,  name:"KBR National Park",  category:"Nature",    location:"Jubilee Hills, Hyderabad",       orient:"landscape",
    desc:"A lush 390-acre urban forest and biodiversity hotspot in the heart of the city, home to deer, birds, and exotic flora.",
    image: W("KBR_National_Park_Hyderabad.jpg") },
  { id:9,  name:"Ramoji Film City",   category:"Culture",   location:"Hayathnagar, Hyderabad",         orient:"portrait",
    desc:"The world's largest integrated film studio complex spanning 1666 acres — a UNESCO-certified attraction and entertainment hub.",
    image: W("Ramoji_Film_City.jpg") },
  { id:10, name:"Qutb Shahi Tombs",   category:"Monuments", location:"Ibrahim Bagh, Hyderabad",        orient:"landscape",
    desc:"A UNESCO tentative World Heritage site — grand domed mausoleums of the Qutb Shahi dynasty surrounded by lush gardens.",
    image: W("Qutb_Shahi_tombs_Hyderabad.jpg") },
  { id:11, name:"Salar Jung Museum",  category:"Culture",   location:"Dar-ul-Shifa, Hyderabad",        orient:"landscape",
    desc:"One of India's largest museums, housing a priceless collection of art, antiques, and artifacts from across the world.",
    image: W("Salar_Jung_Museum.jpg") },
  { id:12, name:"Gandipet Lake",      category:"Nature",    location:"Osman Sagar, Hyderabad",         orient:"portrait",
    desc:"A scenic reservoir built across the Musi River in 1920, surrounded by rocky hills — a perfect weekend getaway from the city.",
    image: W("Osmansagar.jpg") },
  { id:13, name:"Keesaragutta Temple",category:"Devotional", location:"Keesara, Hyderabad",            orient:"portrait",
    desc:"An ancient hilltop Lord Shiva temple surrounded by dense forest, especially crowded during Maha Shivaratri festival.",
    image: W("Keesaragutta.jpg") },
  { id:14, name:"Necklace Road",      category:"Culture",   location:"Tank Bund, Hyderabad",           orient:"landscape",
    desc:"A stunning 3-km stretch along Hussain Sagar, glittering with lights at night — the lifestyle hub of the city.",
    image: W("Necklace_Road_Hyderabad.jpg") },
  { id:15, name:"Laad Bazaar",        category:"Culture",   location:"Near Charminar, Hyderabad",      orient:"landscape",
    desc:"A 400-year-old street market famous for its dazzling lacquer bangles, pearls, and traditional Hyderabadi jewellery.",
    image: W("Laad_Bazaar.jpg") },
  { id:16, name:"Nehru Zoological Park", category:"Nature", location:"Mir Alam Tank Road, Hyderabad",  orient:"portrait",
    desc:"One of India's largest zoos spanning 380 acres, home to over 1,500 animals including tigers, lions, giraffes, and elephants.",
    image: W("Nehru_Zoological_Park.jpg") },
  { id:17, name:"Sanghi Temple",      category:"Devotional", location:"Hayathnagar, Hyderabad",        orient:"landscape",
    desc:"A magnificent hilltop temple complex dedicated to Lord Venkateswara, offering a panoramic view and peaceful atmosphere.",
    image: W("Sanghi_Temple.jpg") },
  { id:18, name:"Paigah Tombs",       category:"Monuments", location:"Santosh Nagar, Hyderabad",      orient:"portrait",
    desc:"Exquisitely carved marble mausoleums of the Paigah nobles — a hidden architectural gem rarely visited by tourists.",
    image: W("Paigah_Tombs.jpg") },
];

export default function Gallery() {

  const [activeCategory, setActiveCategory] = useState("All");
  const [lightbox, setLightbox] = useState(null); // index into filtered array

  const filtered = activeCategory === "All"
    ? photos
    : photos.filter(p => p.category === activeCategory);

  const openLightbox = (idx) => setLightbox(idx);
  const closeLightbox = () => setLightbox(null);

  const goPrev = useCallback(() => {
    setLightbox(i => (i - 1 + filtered.length) % filtered.length);
  }, [filtered.length]);

  const goNext = useCallback(() => {
    setLightbox(i => (i + 1) % filtered.length);
  }, [filtered.length]);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e) => {
      if (e.key === "Escape")     closeLightbox();
      if (e.key === "ArrowLeft")  goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, goPrev, goNext]);

  const activeLightboxPhoto = lightbox !== null ? filtered[lightbox] : null;

  return (
    <div className="gallery-wrapper">

      {/* ── Navbar ── */}
      <Navbar activePage="gallery" />

      {/* ── Hero ── */}
      <section className="gallery-hero">
        <div className="gallery-hero-inner">
          <span className="gallery-tag">📸 Photo Gallery</span>
          <h1>Hyderabad Through the Lens</h1>
          <p>Explore the beauty, heritage, and spirituality of the City of Pearls through our curated photo collection.</p>
          <div className="gallery-stats">
            <div className="gstat"><strong>{photos.length}</strong><span>Photos</span></div>
            <div className="gstat-divider" />
            <div className="gstat"><strong>4</strong><span>Categories</span></div>
            <div className="gstat-divider" />
            <div className="gstat"><strong>18</strong><span>Locations</span></div>
          </div>
        </div>
      </section>

      {/* ── Filter Tabs ── */}
      <div className="gallery-filters">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`filter-btn${activeCategory === cat ? " active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat === "All"       && "🌐 "}
            {cat === "Monuments" && "🏛️ "}
            {cat === "Devotional"&& "🛕 "}
            {cat === "Nature"    && "🌿 "}
            {cat === "Culture"   && "🎭 "}
            {cat}
            <span className="filter-count">
              {cat === "All" ? photos.length : photos.filter(p => p.category === cat).length}
            </span>
          </button>
        ))}
      </div>

      {/* ── Masonry Grid ── */}
      <div className="gallery-masonry">
        {filtered.map((photo, idx) => {
          const col = CATEGORY_COLORS[photo.category];
          return (
            <div
              key={photo.id}
              className={`gallery-item ${photo.orient}`}
              onClick={() => openLightbox(idx)}
            >
              <img src={photo.image} alt={photo.name} loading="lazy" onError={(e) => imgFallback(e, photo.name, photo.category)} />

              <div className="gallery-overlay">
                <span className="gallery-cat-badge" style={{ background: col.bg, color: col.text }}>
                  <span className="cat-dot" style={{ background: col.dot }} />
                  {photo.category}
                </span>
                <div className="gallery-info">
                  <h3>{photo.name}</h3>
                  <p><FaMapMarkerAlt className="me-1" style={{ fontSize: "10px" }} />{photo.location}</p>
                </div>
                <div className="gallery-expand"><FaExpand /></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Lightbox ── */}
      {activeLightboxPhoto && (
        <div className="lightbox-backdrop" onClick={closeLightbox}>
          <div className="lightbox-modal" onClick={e => e.stopPropagation()}>

            <button className="lb-close" onClick={closeLightbox}><FaTimes /></button>
            <button className="lb-arrow lb-prev" onClick={goPrev}><FaChevronLeft /></button>
            <button className="lb-arrow lb-next" onClick={goNext}><FaChevronRight /></button>

            <div className="lb-image-wrap">
              <img src={activeLightboxPhoto.image} alt={activeLightboxPhoto.name} onError={(e) => imgFallback(e, activeLightboxPhoto.name, activeLightboxPhoto.category)} />
            </div>

            <div className="lb-info">
              <div>
                <span
                  className="lb-badge"
                  style={{
                    background: CATEGORY_COLORS[activeLightboxPhoto.category].bg,
                    color: CATEGORY_COLORS[activeLightboxPhoto.category].text,
                  }}
                >
                  {activeLightboxPhoto.category}
                </span>
                <h2>{activeLightboxPhoto.name}</h2>
                <p className="lb-location">
                  <FaMapMarkerAlt style={{ marginRight: 5, color: "#9c4dff" }} />
                  {activeLightboxPhoto.location}
                </p>
                <p className="lb-desc">{activeLightboxPhoto.desc}</p>
              </div>
              <div className="lb-counter">
                {lightbox + 1} / {filtered.length}
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
