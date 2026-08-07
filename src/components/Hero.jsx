import './Hero.css';

function Hero() {
  return (
    <section className="hero">
      <div className="hero-blob blob-left"></div>
      <div className="hero-blob blob-right"></div>

      <div className="hero-content">
        <h1>
          Your Health
          <br />
          <span className="highlight">Our Responsibility</span>
        </h1>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque at quae ducimus.
          Suscipit omnis quibusdam non cum rem voluptatem!
        </p>
        <button className="btn-primary">Get Started</button>
      </div>
    </section>
  );
}

export default Hero;
