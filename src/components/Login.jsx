import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../api/auth';
import { useAuth } from '../context/AuthContext';
import './AuthForm.css';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Enter a valid email';
    if (!formData.password) newErrors.password = 'Password is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    setApiError('');

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      try {
        // Invokes the login authentication API to authenticate a user.
        const data = await loginUser(formData);
        login(data.user, data.token);
        navigate('/');
      } catch (err) {
        setApiError(err.message || 'Invalid email or password.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleReset = () => {
    setFormData({ email: '', password: '' });
    setErrors({});
  };

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit} noValidate>
        <h1>Login</h1>
        <p className="auth-subtext">
          Are you a new member? <Link to="/signup">Sign Up Here</Link>
        </p>

        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span className="error-text">{errors.email}</span>}

        <label htmlFor="password">Password</label>
        <div className="password-field">
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />
          <button
            type="button"
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
            aria-label="Toggle password visibility"
          >
            {showPassword ? '🙈' : '👁️'}
          </button>
        </div>
        {errors.password && <span className="error-text">{errors.password}</span>}

        {apiError && <span className="error-text">{apiError}</span>}

        <button type="submit" className="btn-submit" disabled={isSubmitting}>
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>
        <button type="reset" className="btn-reset" onClick={handleReset}>
          Reset
        </button>

        <Link to="/forgot-password" className="forgot-link">
          Forgot Password?
        </Link>
      </form>
    </div>
  );
}

export default Login;
