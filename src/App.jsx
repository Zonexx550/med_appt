import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Notification from './components/Notification';
import Hero from './components/Hero';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Appointments from './components/Appointments';
import Reviews from './components/Reviews';
import ProfileCard from './components/ProfileCard';
import './App.css';

function Home() {
  return <Hero />;
}

function Placeholder({ title }) {
  return (
    <div style={{ padding: '80px 20px', textAlign: 'center' }}>
      <h2>{title}</h2>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        {/* Notification is rendered here so it has application-wide visibility
            on every route, not just a single page. */}
        <Notification />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/health-blog" element={<Placeholder title="Health Blog" />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<ProfileCard />} />
          <Route path="/forgot-password" element={<Placeholder title="Forgot Password" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
