# StayHealthy

StayHealthy is a medical appointment booking website built with React and Vite. Patients can sign up, log in, search for doctors by specialty, book appointments, leave reviews for past consultations, and manage their profile.

## Features

- **Navigation Bar** — persistent across every route, with links to Home, Appointments, Health Blog, and Reviews, plus Sign Up / Login (or Logout when authenticated).
- **Sign Up / Login** — forms with client-side validation, password visibility toggle, and API calls to a backend authentication service.
- **Appointment Booking** — search doctors by specialty (`FindDoctorSearch`), view results as doctor cards (`DoctorCard`), and book via a full appointment form (`AppointmentForm`: Name, Phone, Date, Time) or a quick Instant Consultation form (`AppointmentFormIC`: Name, Phone only). Includes cancel-appointment logic.
- **Reviews** — table of past consultations with a "Give Review" action (`GiveReviews`) that disables once a review has been submitted.
- **Notification** — an application-wide banner reminding the user of an upcoming appointment.
- **Profile** — view and edit your name and phone number (`ProfileCard`).

## Tech Stack

- React 19
- React Router DOM
- Vite

## Project Structure

```
src/
├── api/
│   └── auth.js            # register / login / fetchDoctors API calls
├── context/
│   └── AuthContext.jsx    # session state, login/logout
├── components/
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── SignUp.jsx
│   ├── Login.jsx
│   ├── Appointments.jsx
│   ├── FindDoctorSearch.jsx
│   ├── DoctorCard.jsx
│   ├── AppointmentForm.jsx
│   ├── AppointmentFormIC.jsx
│   ├── Reviews.jsx
│   ├── GiveReviews.jsx
│   ├── Notification.jsx
│   └── ProfileCard.jsx
├── App.jsx
└── main.jsx
```

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd stayhealthy
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure the API base URL** (optional)

   Create a `.env` file in the project root and point it at your backend:
   ```
   VITE_API_BASE_URL=http://localhost:5000/api
   ```
   If omitted, it defaults to `http://localhost:5000/api`.

4. **Run the development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`.

5. **Create a production build**
   ```bash
   npm run build
   ```
   The optimized static files are output to the `dist/` folder.

6. **Preview the production build locally**
   ```bash
   npm run preview
   ```

## Backend API Contract

The frontend expects the following endpoints from the backend:

| Method | Endpoint         | Body                                          | Response          |
|--------|------------------|------------------------------------------------|--------------------|
| POST   | `/api/register`  | `{ role, name, phone, email, password }`       | `{ user, token }`  |
| POST   | `/api/login`      | `{ email, password }`                          | `{ user, token }`  |
| GET    | `/api/doctors`    | query param `?specialty=`                      | `Doctor[]`          |

## Deployment

Deploy the contents of the `dist/` folder to any static hosting provider (Vercel, Netlify, GitHub Pages, etc.).
