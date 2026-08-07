// Base URL for the backend API.
// Replace this with your actual backend endpoint (e.g. an Express/Node server).
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

/**
 * Registers a new user.
 * Expected backend endpoint: POST /api/register
 * Body: { role, name, phone, email, password }
 */
export async function registerUser(userData) {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Registration failed');
  }

  return response.json();
}

/**
 * Authenticates a user.
 * Expected backend endpoint: POST /api/auth/login
 * Body: { email, password }
 * Response: { token, user }
 */
export async function loginUser(credentials) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Login failed');
  }

  return response.json();
}

/**
 * Fetches the list of doctors, optionally filtered by specialty.
 * Expected backend endpoint: GET /api/doctors?specialty=...
 */
export async function fetchDoctors(specialty = '') {
  const url = specialty
    ? `${API_BASE_URL}/doctors?specialty=${encodeURIComponent(specialty)}`
    : `${API_BASE_URL}/doctors`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch doctors');
  }
  return response.json();
}
