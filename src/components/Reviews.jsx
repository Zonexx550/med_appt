import { useState } from 'react';
import GiveReviews from './GiveReviews';
import './Reviews.css';

const CONSULTATIONS = [
  { id: 1, doctorName: 'Dr. John Doe', speciality: 'Cardiology' },
  { id: 2, doctorName: 'Dr. Jane Smith', speciality: 'Dermatology' },
  { id: 3, doctorName: 'Dr. Amir Khan', speciality: 'Pediatrics' },
];

function Reviews() {
  const [activeConsultation, setActiveConsultation] = useState(null);
  const [reviewedIds, setReviewedIds] = useState([]);

  const handleReviewSubmit = (id) => {
    setReviewedIds((prev) => [...prev, id]);
  };

  return (
    <div className="reviews-page">
      <h1>Reviews</h1>
      <table className="reviews-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Doctor Name</th>
            <th>Doctor Speciality</th>
            <th>Provide Review</th>
            <th>Review Given</th>
          </tr>
        </thead>
        <tbody>
          {CONSULTATIONS.map((c, index) => (
            <tr key={c.id}>
              <td>{index + 1}</td>
              <td>{c.doctorName}</td>
              <td>{c.speciality}</td>
              <td>
                {/* Give Review button disables once a review has been submitted */}
                <button
                  className="btn-give-review"
                  onClick={() => setActiveConsultation(c)}
                  disabled={reviewedIds.includes(c.id)}
                >
                  Give Review
                </button>
              </td>
              <td>{reviewedIds.includes(c.id) ? '✅ Yes' : '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {activeConsultation && (
        <GiveReviews
          consultation={activeConsultation}
          onClose={() => setActiveConsultation(null)}
          onSubmit={handleReviewSubmit}
        />
      )}
    </div>
  );
}

export default Reviews;
