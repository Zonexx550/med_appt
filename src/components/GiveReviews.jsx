import { useState } from 'react';
import './Reviews.css';

/**
 * GiveReviews
 * Review form shown when a patient clicks "Give Review" for a consultation.
 * Includes: patient name input, star rating selector, feedback textarea,
 * and disables the triggering "Give Review" button once a review is submitted.
 */
function GiveReviews({ consultation, onClose, onSubmit }) {
  const [patientName, setPatientName] = useState('');
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(consultation.id, { patientName, rating, feedback });
    onClose();
  };

  return (
    <div className="review-modal-backdrop" onClick={onClose}>
      <form className="review-modal" onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
        <h3>Review for {consultation.doctorName}</h3>

        <label htmlFor="patientName">Your Name</label>
        <input
          id="patientName"
          type="text"
          placeholder="Enter your name"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          required
        />

        <label>Rating</label>
        <div className="star-rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={star <= rating ? 'star filled' : 'star'}
              onClick={() => setRating(star)}
            >
              ★
            </span>
          ))}
        </div>

        <label htmlFor="feedback">Your Feedback</label>
        <textarea
          id="feedback"
          placeholder="Write your feedback about the consultation..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          rows={4}
          required
        />

        <div className="review-modal-actions">
          <button type="button" className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn-submit-review">
            Submit Review
          </button>
        </div>
      </form>
    </div>
  );
}

export default GiveReviews;
