import { useState } from 'react';
import AppointmentForm from './AppointmentForm';
import AppointmentFormIC from './AppointmentFormIC';
import './DoctorCard.css';

/**
 * DoctorCard
 * Displays doctor information and handles booking / cancelling an appointment.
 */
function DoctorCard({ doctor }) {
  const { name, specialty, experience, rating, avatar } = doctor;

  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showICForm, setShowICForm] = useState(false);
  const [booking, setBooking] = useState(null); // holds confirmed appointment details

  const handleConfirmBooking = (formData) => {
    setBooking(formData);
  };

  const handleCancelAppointment = () => {
    // Cancel appointment logic: clears the booking state and any related
    // notification data so the details are fully removed for the user.
    setBooking(null);
    sessionStorage.removeItem('upcoming-appointment');
  };

  return (
    <div className="doctor-card">
      <div className="doctor-avatar">{avatar}</div>
      <h3>{name}</h3>
      <p className="doctor-specialty">{specialty}</p>
      <p className="doctor-experience">{experience} years experience</p>
      <p className="doctor-rating">
        Ratings: {'⭐'.repeat(rating)}
        {'☆'.repeat(5 - rating)}
      </p>

      {booking ? (
        <div className="doctor-card-booked">
          <p className="booked-info">
            ✅ Booked for {booking.date || 'today'} {booking.time ? `at ${booking.time}` : ''}
          </p>
          <button className="btn-cancel-appt" onClick={handleCancelAppointment}>
            Cancel Appointment
          </button>
        </div>
      ) : (
        <>
          <button className="btn-book" onClick={() => setShowBookingForm(true)}>
            Book Appointment
            <span>No Booking Fee</span>
          </button>
          <button className="btn-instant" onClick={() => setShowICForm(true)}>
            Instant Consultation
          </button>
        </>
      )}

      {showBookingForm && (
        <AppointmentForm
          doctor={doctor}
          onClose={() => setShowBookingForm(false)}
          onConfirm={handleConfirmBooking}
        />
      )}

      {showICForm && (
        <AppointmentFormIC
          doctor={doctor}
          onClose={() => setShowICForm(false)}
          onConfirm={handleConfirmBooking}
        />
      )}
    </div>
  );
}

export default DoctorCard;
