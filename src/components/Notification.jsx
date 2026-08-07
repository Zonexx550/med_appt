import { useState, useEffect } from 'react';
import './Notification.css';

/**
 * Notification
 * Reminds users about their appointment booking on a particular date and time.
 * Uses the useEffect hook so the check runs once when the app loads and the
 * notification banner appears on every page (rendered at the App level).
 */
function Notification() {
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const upcomingAppointment = JSON.parse(
      sessionStorage.getItem('upcoming-appointment') || 'null'
    );

    if (upcomingAppointment) {
      setNotification(
        `Reminder: You have an appointment with ${upcomingAppointment.doctorName} on ${upcomingAppointment.date} at ${upcomingAppointment.time}.`
      );
    }
  }, []);

  if (!notification) return null;

  return (
    <div className="notification-banner">
      <span>🔔 {notification}</span>
      <button className="notification-close" onClick={() => setNotification(null)}>
        ✕
      </button>
    </div>
  );
}

export default Notification;
