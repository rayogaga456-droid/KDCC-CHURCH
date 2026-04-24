import "./Home.css";

function Home() {
  return (
    <div className="home">

      <nav className="navbar">
        <h2>KDCC</h2>
        <div className="nav-links">
          <span>Home</span>
          <span>Prayer</span>
          <span>Events</span>
        </div>
      </nav>

      <section className="hero">
        <h1>Raising Kingdom Diplomats</h1>
        <p>Welcome to KDCC Bonny & Port Harcourt</p>
      </section>

    </div>
  );
}

export default Home;