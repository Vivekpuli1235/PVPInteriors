import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || 'https://your-backend.onrender.com/api';

const Home = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [reviews, setReviews] = useState([]);

  // Form states
  const [reviewName, setReviewName] = useState('');
  const [reviewEmail, setReviewEmail] = useState('');
  const [reviewMessage, setReviewMessage] = useState('');

  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');

  // Fetch reviews on load
  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`${API_BASE}/reviews`);
      setReviews(res.data);
    } catch (err) {
      console.error('Error fetching reviews:', err);
    }
  };

  const submitReview = async (e) => {
    e.preventDefault();
    if (!reviewName || !reviewMessage) return alert('Name and review required.');
    try {
      await axios.post(`${API_BASE}/reviews`, {
        name: reviewName,
        email: reviewEmail,
        message: reviewMessage
      });
      alert('Thank you for your review!');
      setReviewName(''); setReviewEmail(''); setReviewMessage('');
      fetchReviews();
    } catch (err) {
      console.error(err);
      alert('Error submitting review');
    }
  };

  const submitContact = async (e) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) return alert('All fields required.');
    try {
      await axios.post(`${API_BASE}/contacts`, {
        name: contactName,
        email: contactEmail,
        message: contactMessage
      });
      alert('Message sent successfully!');
      setContactName(''); setContactEmail(''); setContactMessage('');
    } catch (err) {
      console.error(err);
      alert('Error sending message');
    }
  };

  return (
    <>
      <canvas id="particles"></canvas>
      <header>
        <nav>
          <div className="logo">
            <img src="https://res.cloudinary.com/dxr9wzza1/image/upload/v1758532338/Vinay_Puli-photoaidcom-cropped_ekhlht.png"
              height="40px" width="40px" alt="PVP Interiors Logo" />
            PVP interiors
          </div>

          <div className="hamburger" onClick={() => setNavOpen(!navOpen)}>☰</div>

          <div className={`nav-links ${navOpen ? 'show' : ''}`}>
            <a href="#home" className="active" onClick={() => setNavOpen(false)}>Home</a>
            <a href="#works" onClick={() => setNavOpen(false)}>Our Works</a>
            <a href="#reviews" onClick={() => setNavOpen(false)}>Reviews</a>
            <a href="#about" onClick={() => setNavOpen(false)}>About</a>
            <a href="#contact" onClick={() => setNavOpen(false)}>Get in Touch</a>
          </div>
        </nav>
      </header>

      <section className="hero" id="home">
        <div>
          <h1>Designing Dreams, Building Comfort</h1>
          <p>At PVP Interiors, we create inspiring residential and commercial spaces that combine creativity with functionality. Our designs adapt to your lifestyle and vision.</p>
          <button className="btn primary">View Portfolio</button>
          <button className="btn secondary" style={{ marginLeft: '12px' }}>Get Quote</button>
        </div>
        <img src="https://images.unsplash.com/photo-1615874959474-d609969a20ed?q=80&w=1200" style={{ width: '100%', borderRadius: '16px', border: '2px solid var(--accent)' }} alt="Hero" />
      </section>

      <section id="works">
        <h2 style={{ color: 'var(--accent)' }}>Our Works</h2>
        <div className="carousel">
          <div className="item"><img src="https://res.cloudinary.com/dxr9wzza1/image/upload/v1713071209/living_1_fin_1_j68ub1.jpg" alt="Living Room" /><h3>Living Room</h3></div>
          <div className="item"><img src="https://res.cloudinary.com/dxr9wzza1/image/upload/v1713073450/IMG_20240306_143259_t7nexy.jpg" alt="Bedroom" /><h3>Bed Room</h3></div>
          <div className="item"><img src="https://res.cloudinary.com/dxr9wzza1/image/upload/v1712941996/03_sx4kym.jpg" alt="Office Space" /><h3>Office Space</h3></div>
          <div className="item"><img src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1200" alt="Retail Design" /><h3>Retail Design</h3></div>
        </div>
      </section>

      <section id="reviews">
        <h2 style={{ color: 'var(--accent)', padding: '10px 0' }}>Review Us</h2>

        <div className="review" style={{ paddingRight: '20px' }}>
          <form className="review-form" onSubmit={submitReview}>
            <input type="text" placeholder="Full Name" value={reviewName} onChange={e => setReviewName(e.target.value)} required />
            <input type="email" placeholder="Email (Optional)" value={reviewEmail} onChange={e => setReviewEmail(e.target.value)} />
            <textarea rows="4" placeholder="Your Review" value={reviewMessage} onChange={e => setReviewMessage(e.target.value)} required></textarea>
            <button type="submit" className="btn primary">Submit</button>
          </form>
        </div>

        <h2 style={{ color: 'var(--accent)', marginTop: '10px' }}>Client Reviews</h2>
        <div className="grid">
          {reviews.length > 0 ? (
            reviews.map(r => (
              <div key={r._id} className="review">
                <h3>{r.name}</h3>
                <p>“{r.message}”</p>
              </div>
            ))
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>
      </section>

      <section id="about">
        <h2 style={{ color: 'var(--accent)' }}>About Us</h2>
        <div className="grid">
          <div className="card">
            <h3>About Founder & CEO</h3>
            <img className="img2020" src="https://res.cloudinary.com/dxr9wzza1/image/upload/v1758531727/Gemini_Generated_Image_iv6ls8iv6ls8iv6l-photoaidcom-cropped_qdyz4k.png" height="200px" width="200px" alt="CEO" />
            <p><b>Mr. Vinay Puli </b>is a passionate interior designer dedicated to crafting beautiful, functional, and personalized spaces. He believes your environment should reflect who you are, and he works closely with clients to bring their vision to life. From conceptual design to the final details, Vinay transforms houses into homes and offices into inspiring workplaces, ensuring every project tells a unique story.</p>
          </div>
          <div className="card">
            <p>Our team brings together expertise in design, architecture, and project management to ensure every space we design feels unique and alive.</p>
          </div>
        </div>
      </section>

      <section id="contact">
        <h2 style={{ color: 'var(--accent)' }}>Get in Touch</h2>
        <div className="contact-box">
          <div className="card">
            <p>Email: pvpinteriors@gmail.com</p>
            <p>Phone: +91 9967477442</p>
            <p>Address: Hyderabad, India</p>
          </div>
          <div className="card">
            <form onSubmit={submitContact}>
              <input type="text" placeholder="Full Name" value={contactName} onChange={e => setContactName(e.target.value)} required />
              <input type="email" placeholder="Email" value={contactEmail} onChange={e => setContactEmail(e.target.value)} required />
              <textarea rows="4" placeholder="Your Message" value={contactMessage} onChange={e => setContactMessage(e.target.value)} required></textarea>
              <button type="submit" className="btn primary">Send Message</button>
            </form>
          </div>
        </div>
      </section>

      <footer>
        © {new Date().getFullYear()} PVP Interiors — Crafted with Passion & Royalty
      </footer>
    </>
  );
};

export default Home;
