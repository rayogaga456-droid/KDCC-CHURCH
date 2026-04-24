import "./Home.css";

const sermons = [
  { title: "Who Is Jesus", pastor: " Pastor Maxwell E. Ogaga", date: "Apr 20, 2026", tag: "Faith" },
  { title: "The Power of Prayer", pastor: "Pastor Maxwell E. Ogaga", date: "Apr 13, 2026", tag: "Prayer" },
  { title: "Don't Drop The Ball On Your Watch", pastor: " Pastor Mary L. Ogaga", date: "Apr 6, 2026", tag: "Dilligence" },
];

const events = [
  { title: "Sunday Service", date: "Every Sunday", time: "8:00 AM & 10:00 AM", branch: "Both Branches" },
  { title: "Mid-Week Bible Study", date: "Every Wednesday", time: "6:00 PM", branch: "Bonny Island" },
  { title: "Mid-week Bible study", date: "Every Thursdaay", time: "6:00 PM", branch: "Port Harcourt" },
];

function Home() {
  return (
    <div className="home">

      {/* NAVBAR */}
      <nav className="navbar">
        <h2 className="nav-logo">KDCC</h2>
        <div className="nav-links">
          <a href="#hero">Home</a>
          <a href="#sermons">Sermons</a>
          <a href="#events">Events</a>
          <a href="#branches">Branches</a>
          <a href="#prayer" className="nav-cta">Prayer Request</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero" id="hero">
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="hero-tag">Kingdom Development Christian Centre</p>
          <h1>Raising Kingdom<br /><span className="hero-accent">Diplomats</span></h1>
          <p className="hero-sub">Welcome to KDCC Bonny & Port Harcourt — a community built on Faith, Love, and Family.</p>
          <div className="hero-btns">
            <a href="#sermons" className="btn-gold">Watch Sermons</a>
            <a href="#prayer" className="btn-outline">Send a Prayer</a>
          </div>
        </div>
        <div className="hero-scroll">↓ Scroll</div>
      </section>

      {/* STATS STRIP */}
      <section className="stats-strip">
        <div className="stat"><span>2</span><p>Branches</p></div>
        <div className="stat"><span>10+</span><p>Years of Ministry</p></div>
        <div className="stat"><span>200+</span><p>Members</p></div>
        <div className="stat"><span>Weekly</span><p>Bible Study</p></div>
      </section>

      {/* SERMONS */}
      <section className="section" id="sermons">
        <div className="section-header">
          <h2>Recent <span className="gold">Sermons</span></h2>
          <p>Be transformed by the Word of God</p>
        </div>
        <div className="cards-grid">
          {sermons.map((s, i) => (
            <div className="sermon-card" key={i}>
              <span className="tag">{s.tag}</span>
              <h3>{s.title}</h3>
              <p className="pastor">{s.pastor}</p>
              <p className="date">{s.date}</p>
              <button className="play-btn">▶ Watch Now</button>
            </div>
          ))}
        </div>
      </section>

      {/* EVENTS */}
      <section className="section dark-section" id="events">
        <div className="section-header light">
          <h2>Upcoming <span className="gold">Events</span></h2>
          <p>Join us and grow together</p>
        </div>
        <div className="events-list">
          {events.map((e, i) => (
            <div className="event-row" key={i}>
              <div className="event-date-box">
                <span>{e.date}</span>
                <small>{e.time}</small>
              </div>
              <div className="event-info">
                <h3>{e.title}</h3>
                <p>📍 {e.branch}</p>
              </div>
              <button className="event-btn">Join</button>
            </div>
          ))}
        </div>
      </section>

      {/* BRANCHES */}
      <section className="section" id="branches">
        <div className="section-header">
          <h2>Our <span className="gold">Branches</span></h2>
          <p>Find a home near you</p>
        </div>
        <div className="branches-grid">
          <div className="branch-card">
            <div className="branch-icon">⚓</div>
            <h3>KDCC Bonny</h3>
            <p>Bonny Island, Rivers State</p>
            <p>Sunday: 8:00 AM & 10:30 AM</p>
            <button className="btn-gold small">Get Directions</button>
          </div>
          <div className="branch-card">
            <div className="branch-icon">🌊</div>
            <h3>KDCC Port Harcourt</h3>
            <p>Port Harcourt, Rivers State</p>
            <p>Sunday: 8:00 AM & 10:30 AM</p>
            <button className="btn-gold small">Get Directions</button>
          </div>
        </div>
      </section>

      {/* PRAYER */}
      <section className="section prayer-section" id="prayer">
        <div className="prayer-inner">
          <h2>Send a <span className="gold">Prayer Request</span></h2>
          <p>We believe in the power of prayer. Share your needs with us.</p>
          <div className="prayer-form">
            <input placeholder="Your Name" />
            <input placeholder="Your Email" />
            <textarea placeholder="Share your prayer request..." rows="4" />
            <button className="btn-gold">🙏 Submit Request</button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <h3>KDCC</h3>
        <p>Kingdom Development Christian Centre — Raising Kingdom Diplomats</p>
        <p className="footer-copy">© 2026 KDCC. All rights reserved.</p>
      </footer>

    </div>
  );
}

export default Home;
