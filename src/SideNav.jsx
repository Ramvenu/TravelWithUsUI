import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import { FaTimes, FaBars, FaChevronDown } from "react-icons/fa";
import "./SideNav.css";

/* ─────────────────────────────────────────
   Menu data — sections → items → sub-groups
───────────────────────────────────────── */
const SECTIONS = [
  {
    title: "DISCOVER",
    accent: "#f59e0b",
    items: [
      {
        icon: "🗺️", label: "Destinations",
        sub: [
          { heading: "India", links: ["Rajasthan – The Royal State","Kerala – God's Own Country","Goa – Sun, Sand & Sea","Himachal Pradesh – Land of Snow","Tamil Nadu – Temple Trail","Uttarakhand – Dev Bhoomi","Kashmir – Paradise on Earth","Andaman & Nicobar Islands","Hyderabad – City of Pearls","Mumbai – The Dream City"] },
          { heading: "International", links: ["Europe – Cultural Capitals","South-East Asia – Tropical Bliss","Middle East – Desert Adventures","North America – Grand Tours","Australia & New Zealand","Japan – Land of the Rising Sun","Maldives – Ocean Paradise","Thailand – The Golden Land","Dubai – City of Wonders","Sri Lanka – Pearl of the Indian Ocean"] },
          { heading: "Hyderabad Local", links: ["Charminar & Old City","Golconda Fort","Ramoji Film City","Hussain Sagar Lake","Birla Mandir","Salar Jung Museum","Nehru Zoological Park","Qutb Shahi Tombs"] },
        ],
      },
      {
        icon: "🎒", label: "Travel Packages",
        sub: [
          { heading: "By Type", links: ["Honeymoon Packages","Family Packages","Group Tours","Solo Travel","Senior Citizen Tours","Student Tours"] },
          { heading: "By Budget", links: ["Budget Travel (Under ₹10,000)","Mid-Range (₹10k – ₹30k)","Premium (₹30k – ₹60k)","Luxury (₹60k+)"] },
          { heading: "Special Packages", links: ["Weekend Getaways","Long Weekends","Holiday Special","Festival Tours","Pilgrimage Packages","Wildlife Safari Packages"] },
        ],
      },
    ],
  },
  {
    title: "ADVENTURE",
    accent: "#10b981",
    items: [
      {
        icon: "🏔️", label: "Adventure & Sports",
        sub: [
          { heading: "Land Adventures",  links: ["Trekking & Hiking","Mountain Biking","Rock Climbing","Camping & Bonfire","Desert Safari","Jungle Walks"] },
          { heading: "Water Adventures", links: ["River Rafting","Scuba Diving","Snorkelling","Kayaking & Canoeing","Water Sports (Goa / Andaman)","Surfing"] },
          { heading: "Aerial Adventures",links: ["Paragliding","Bungee Jumping","Zip-lining","Hot Air Balloon","Skydiving"] },
        ],
      },
      {
        icon: "🏨", label: "Hotels & Stays",
        sub: [
          { heading: "Stay Types",   links: ["Luxury 5-Star Hotels","Budget Hotels","Beach Resorts","Hill Station Resorts","Heritage & Palace Hotels","Eco Lodges"] },
          { heading: "Unique Stays", links: ["Homestays","Backpacker Hostels","Tree Houses","Houseboats (Kerala)","Glamping","Cave Hotels"] },
        ],
      },
      {
        icon: "✈️", label: "Travel Services",
        sub: [
          { heading: "Transportation",    links: ["Flight Booking","Train Booking","Bus Booking","Car Rentals","Airport Transfers","Cab & Taxi Services"] },
          { heading: "Travel Essentials", links: ["Travel Insurance","Visa Assistance","Forex & Currency Exchange","SIM Card & Roaming","Luggage Storage"] },
        ],
      },
    ],
  },
  {
    title: "CULTURE & MORE",
    accent: "#818cf8",
    items: [
      {
        icon: "🏛️", label: "Cultural & Heritage",
        sub: [
          { heading: "Heritage Sites", links: ["UNESCO World Heritage Sites","Forts & Palaces","Temples & Pilgrimage","Ancient Caves & Ruins","Colonial Architecture"] },
          { heading: "Experiences",    links: ["Art & Craft Tours","Classical Dance Shows","Music & Cultural Festivals","Village & Rural Tours","Photography Tours","Spiritual Retreats"] },
        ],
      },
      {
        icon: "🍛", label: "Food & Cuisine",
        sub: [
          { heading: "Food Experiences", links: ["Food Tours – Hyderabad","Street Food Walks","Biryani Trail","Coastal Seafood Tours","Rajasthani Thali Experience","South Indian Breakfast Trail"] },
          { heading: "Learn & Cook",     links: ["Cooking Classes","Chef's Table Dining","Restaurant Guides","Local Home Dining"] },
        ],
      },
      {
        icon: "📖", label: "Travel Guides",
        sub: [
          { heading: "Before You Go", links: ["Visa Information","Best Time to Visit","Packing Tips & Checklist","Weather Guide","Currency & Budget Planning","Health & Vaccinations"] },
          { heading: "On the Road",   links: ["Safety Tips","Local Transport Guide","Language & Phrases","Cultural Do's & Don'ts","Emergency Contacts"] },
        ],
      },
    ],
  },
  {
    title: "QUICK LINKS",
    accent: "#fb923c",
    items: [
      { icon: "🏷️", label: "Offers & Deals", path: "/" },
      { icon: "🖼️", label: "Gallery",         path: "/gallery" },
      { icon: "📍", label: "Places",           path: "/places" },
      { icon: "📞", label: "Contact Us",       path: "/contact" },
      { icon: "❓", label: "Help & FAQs",      path: "/" },
    ],
  },
];

/* ─────────────────────────────────────────
   Accordion item — supports 2 levels
───────────────────────────────────────── */
function AccItem({ item, onClose, navigate }) {
  const [open, setOpen] = useState(false);

  if (!item.sub) {
    return (
      <button
        className="snav-item"
        onClick={() => { if (item.path) { navigate(item.path); onClose(); } }}
      >
        <span className="snav-item-icon">{item.icon}</span>
        <span className="snav-item-label">{item.label}</span>
      </button>
    );
  }

  return (
    <div className="snav-item-group">
      <button
        className={`snav-item snav-item-exp${open ? " snav-item-active" : ""}`}
        onClick={() => setOpen(v => !v)}
      >
        <span className="snav-item-icon">{item.icon}</span>
        <span className="snav-item-label">{item.label}</span>
        <FaChevronDown className={`snav-chevron${open ? " snav-chevron-up" : ""}`} />
      </button>

      {/* Accordion body — CSS grid animation */}
      <div className={`snav-acc-body${open ? " snav-acc-open" : ""}`}>
        <div className="snav-acc-inner">
          {item.sub.map((group) => (
            <div key={group.heading} className="snav-sub-group">
              <span className="snav-sub-heading">{group.heading}</span>
              {group.links.map((link) => (
                <button key={link} className="snav-link" onClick={onClose}>{link}</button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Main SideNav component
───────────────────────────────────────── */
export default function SideNav() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const openNav  = () => setOpen(true);
  const closeNav = () => setOpen(false);

  return (
    <>
      {/* ── Trigger button (lives in the dark navbar) ── */}
      <button className="snav-trigger" onClick={openNav} aria-label="Open navigation menu">
        <FaBars className="snav-trigger-icon" />
        <span className="snav-trigger-txt">Explore</span>
      </button>

      {/* ── Backdrop ── */}
      {open && <div className="snav-backdrop" onClick={closeNav} />}

      {/* ── Drawer ── */}
      <aside className={`snav-drawer${open ? " snav-drawer-open" : ""}`} aria-hidden={!open}>

        {/* Header */}
        <header className="snav-head">
          <div className="snav-head-brand">
            <span className="snav-head-compass" aria-hidden="true">🧭</span>
            <div className="snav-head-text">
              <span className="snav-head-name">HydVista</span>
              <span className="snav-head-sub">
                {user ? `Hello, ${user.username || "Traveller"}` : "Discover Hyderabad"}
              </span>
            </div>
          </div>
          <button className="snav-close-btn" onClick={closeNav} aria-label="Close menu">
            <FaTimes />
          </button>
        </header>

        {/* Scrollable content */}
        <div className="snav-scroll">
          {SECTIONS.map((section) => (
            <section key={section.title} className="snav-section">
              <div className="snav-section-title" style={{ color: section.accent, borderColor: section.accent }}>
                {section.title}
              </div>
              {section.items.map((item) => (
                <AccItem
                  key={item.label}
                  item={item}
                  onClose={closeNav}
                  navigate={navigate}
                />
              ))}
            </section>
          ))}
        </div>

        {/* Footer */}
        <footer className="snav-foot">
          <span>© 2024 HydVista Tourism · Hyderabad</span>
        </footer>
      </aside>
    </>
  );
}
