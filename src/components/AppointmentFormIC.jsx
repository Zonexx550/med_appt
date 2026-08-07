import { useState } from 'react';
import './AppointmentForm.css';

/**
 * AppointmentFormIC
 * "Instant Consultation" quick-booking form.
 * Only includes the Name and Phone Number fields, for a faster booking flow
 * than the full AppointmentForm (which also asks for Date and Time).
 */
function AppointmentFormIC({ doctor, onClose, onConfirm }) {
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      onConfirm(formData);
      onClose();
    }
  };

  return (
    <div className="appt-modal-backdrop" onClick={onClose}>
      <form className="appt-modal" onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
        <h3>Instant Consultation with {doctor.name}</h3>

        <label htmlFor="ic-name">Name</label>
        <input
          id="ic-name"
          name="name"
          type="text"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <span className="error-text">{errors.name}</span>}

        <label htmlFor="ic-phone">Phone Number</label>
        <input
          id="ic-phone"
          name="phone"
          type="tel"
          placeholder="Enter your phone number"
          value={formData.phone}
          onChange={handleChange}
        />
        {errors.phone && <span className="error-text">{errors.phone}</span>}

        <div className="appt-modal-actions">
          <button type="button" className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn-confirm">
            Connect Now
          </button>
        </div>
      </form>
    </div>
  );
}

export default AppointmentFormIC;
