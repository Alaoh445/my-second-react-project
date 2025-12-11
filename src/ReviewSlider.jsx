import React, { useEffect, useState } from 'react';
import './index.css';

const reviews = [
  {
    text: "Amazing experience! Highly recommend NatureQuest.",
    author: "Ada",
    rating: 5,
  },
  {
    text: "The RV was super clean and comfy. Will book again!",
    author: "Tunde",
    rating: 4,
  },
  {
    text: "Loved the trip planning support. Made everything smooth.",
    author: "Chika",
    rating: 5,
  },
  {
    text: "Great value for money. The kids had a blast!",
    author: "Emeka",
    rating: 4,
  },
  {
    text: "Customer service was top-notch. Felt very cared for.",
    author: "Nneka",
    rating: 5,
  },
];

const ReviewSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <section className="testimonial-section">
      <div className="testimonial-container">
        <div className="testimonial-heading">
          <h2 style={{fontWeight: 500,}}>What People Say<br/> About Us</h2>
        </div>
        <div className="testimonial-carousel">
          <div className="testimonial-slide">
            <p className='text'>"{reviews[currentIndex].text}"</p>
            <p className="author">— {reviews[currentIndex].author}</p>
            <div className="stars">
              {Array.from({ length: 5 }, (_, i) => (
                <span key={i} className={i < reviews[currentIndex].rating ? 'filled' : ''}>★</span>
              ))}
            </div>
            <div className="navigation">
                 <button onClick={handlePrev} className="next-button">‹</button>
              {reviews.map((_, i) => (
                <span
                  key={i}
                  className={`dot ${i === currentIndex ? 'active' : ''}`}
                  onClick={() => setCurrentIndex(i)}
                ></span>
              ))}
              <button onClick={handleNext} className="next-button">›</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewSlider;
