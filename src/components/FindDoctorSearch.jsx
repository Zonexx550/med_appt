import { useState } from 'react';
import './DoctorSearch.css';

// Local fallback dataset used when no backend is connected yet.
const ALL_DOCTORS = [
  { id: 1, name: 'Dr. Jiao Yang', specialty: 'Dentist', experience: 9, rating: 4, avatar: '👩‍⚕️' },
  { id: 2, name: 'Dr. Denis Raj', specialty: 'Dentist', experience: 24, rating: 4, avatar: '👨‍⚕️' },
  { id: 3, name: 'Dr. Lyn Christie', specialty: 'Dentist', experience: 11, rating: 3, avatar: '👨‍⚕️' },
  { id: 4, name: 'Dr. John Doe', specialty: 'Cardiology', experience: 15, rating: 5, avatar: '👨‍⚕️' },
  { id: 5, name: 'Dr. Jane Smith', specialty: 'Dermatology', experience: 7, rating: 4, avatar: '👩‍⚕️' },
];

/**
 * FindDoctorSearch
 * Implements doctor search functionality in the Appointment Booking component.
 * In production this would call fetchDoctors(specialty) from ../api/auth (or a
 * dedicated doctors API) instead of filtering the local ALL_DOCTORS array.
 */
function FindDoctorSearch({ onResults }) {
  const [searchText, setSearchText] = useState('');
  const [isSearched, setIsSearched] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();

    if (searchText.trim() === '') {
      setIsSearched(false);
      onResults([], false);
      return;
    }

    const filtered = ALL_DOCTORS.filter((doctor) =>
      doctor.specialty.toLowerCase().includes(searchText.toLowerCase())
    );

    setIsSearched(true);
    onResults(filtered, true);
  };

  return (
    <div className="search-card">
      <h2>Find a doctor at your own ease</h2>
      <div className="search-illustration">🩺</div>
      <form className="search-bar" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search doctors by specialty"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button type="submit" aria-label="Search">
          🔍
        </button>
      </form>
      {isSearched && searchText.trim() === '' && (
        <p className="search-hint">Enter a specialty to search.</p>
      )}
    </div>
  );
}

export default FindDoctorSearch;
