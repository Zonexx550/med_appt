import { useState } from 'react';
import FindDoctorSearch from './FindDoctorSearch';
import DoctorCard from './DoctorCard';
import './Appointments.css';

function Appointments() {
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [isSearched, setIsSearched] = useState(false);

  const handleResults = (results, searched) => {
    setFilteredDoctors(results);
    setIsSearched(searched);
  };

  return (
    <div className="appointments-page">
      <FindDoctorSearch onResults={handleResults} />

      {isSearched && (
        <div className="doctor-results">
          <h2>{filteredDoctors.length} doctors available in</h2>
          <p>Book appointments with minimum wait-time &amp; verified doctor details</p>
          <div className="doctor-grid">
            {filteredDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Appointments;
