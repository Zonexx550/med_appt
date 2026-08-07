import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './ProfileCard.css';

/**
 * ProfileCard
 * Displays the logged-in user's profile details and lets them edit their
 * name and phone number. Saving triggers a re-render by updating state
 * (and the persisted session data) with the new profile details.
 */
function ProfileCard() {
  const { user } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
  });
  const [draft, setDraft] = useState(profile);

  const handleEditClick = () => {
    setDraft(profile);
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setDraft({ ...draft, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Updating state here triggers the Profile component to re-render
    // with the newly saved name and phone number.
    setProfile(draft);
    setIsEditing(false);

    const storedUser = JSON.parse(sessionStorage.getItem('auth-user') || '{}');
    sessionStorage.setItem(
      'auth-user',
      JSON.stringify({ ...storedUser, name: draft.name, phone: draft.phone })
    );
  };

  const handleCancel = () => {
    setDraft(profile);
    setIsEditing(false);
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-avatar">👤</div>

        {!isEditing ? (
          <>
            <h2>{profile.name || 'Your Name'}</h2>
            <p className="profile-detail">📞 {profile.phone || 'No phone number added'}</p>
            <p className="profile-detail">✉️ {profile.email || 'No email on file'}</p>
            <button className="btn-edit-profile" onClick={handleEditClick}>
              Edit Profile
            </button>
          </>
        ) : (
          <form className="profile-edit-form" onSubmit={handleSave}>
            <label htmlFor="profile-name">Name</label>
            <input
              id="profile-name"
              name="name"
              type="text"
              value={draft.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />

            <label htmlFor="profile-phone">Phone</label>
            <input
              id="profile-phone"
              name="phone"
              type="tel"
              value={draft.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
            />

            <div className="profile-edit-actions">
              <button type="button" className="btn-cancel" onClick={handleCancel}>
                Cancel
              </button>
              <button type="submit" className="btn-save">
                Save
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default ProfileCard;
