import { useState } from 'react';
import './AppointmentForm.css';

/**
 * AppointmentForm
 * Full appointment booking form used from the DoctorCard "Book Appointment" action.
 * Fields: Name, Phone Number, Date, Time.
 */
function AppointmentForm({ doctor, onClose, onConfirm }) {
  const [formData, setFormData] = useState({ name: '', phone: '', date: '', time: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.date) newErrors.date = 'Please select a date';
    if (!formData.time) newErrors.time = 'Please select a time';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      // Store the upcoming appointment so the Notification component can pick it up.
      sessionStorage.setItem(
        'upcoming-appointment',
        JSON.stringify({ doctorName: doctor.name, date: formData.date, time: formData.time })
      );
      onConfirm(formData);
      onClose();
    }
  };

  return (
    <div className="appt-modal-backdrop" onClick={onClose}>
      <form className="appt-modal" onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
        <h3>Book Appointment with {doctor.name}</h3>

        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <span className="error-text">{errors.name}</span>}

        <label htmlFor="phone">Phone Number</label>
        <input
          id="phone"
          name="phone"
          type="tel"
          placeholder="Enter your phone number"
          value={formData.phone}
          onChange={handleChange}
        />
        {errors.phone && <span className="error-text">{errors.phone}</span>}

        <label htmlFor="date">Date</label>
        <input id="date" name="date" type="date" value={formData.date} onChange={handleChange} />
        {errors.date && <span className="error-text">{errors.date}</span>}

        <label htmlFor="time">Time</label>
        <input id="time" name="time" type="time" value={formData.time} onChange={handleChange} />
        {errors.time && <span className="error-text">{errors.time}</span>}

        <div className="appt-modal-actions">
          <button type="button" className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn-confirm">
            Confirm Booking
          </button>
        </div>
      </form>
    </div>
  );
}

export default AppointmentForm;
