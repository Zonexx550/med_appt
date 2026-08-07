import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <span className="logo-icon">🩺</span>
        <span className="logo-text">StayHealthy</span>
      </div>

      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/appointments">Appointments</Link>
        </li>
        <li>
          <Link to="/health-blog">Health Blog</Link>
        </li>
        <li>
          <Link to="/reviews">Reviews</Link>
        </li>
        {isAuthenticated && (
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        )}
      </ul>

      <div className="navbar-actions">
        {isAuthenticated ? (
          <>
            <span className="navbar-username">Hi, {user?.name || 'User'}</span>
            <button className="btn btn-outline" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/signup" className="btn btn-outline">
              Sign Up
            </Link>
            <Link to="/login" className="btn btn-outline">
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
