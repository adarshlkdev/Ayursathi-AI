import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, User, LogOut, Home, FilePlus, History, Award, Activity, LucideStethoscope, Pill, Leaf, Heart } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Check if the current route is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/90 backdrop-blur-md shadow-md py-3' 
        : 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 py-4'
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <div className={`p-2 rounded-full bg-white text-teal-500`}>
            <img src='/favicon.png' alt="Logo" className="h-6 w-6" />
          </div>
          <span className={`text-2xl font-bold ${isScrolled ? 'gradient-text' : 'text-white'}`}>
            AyurSathi
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:space-x-1">
          {user ? (
            <>
              <Link 
                to="/dashboard" 
                className={`px-4 py-2 rounded-lg transition-all ${
                  isActive('/dashboard')
                    ? isScrolled ? 'bg-teal-100 text-teal-700' : 'bg-white/20 text-white'
                    : isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                }`}
              >
                <div className="flex items-center space-x-1">
                  <Home size={18} />
                  <span>Dashboard</span>
                </div>
              </Link>
              
              <Link 
                to="/diagnose" 
                className={`px-4 py-2 rounded-lg transition-all ${
                  isActive('/diagnose')
                    ? isScrolled ? 'bg-teal-100 text-teal-700' : 'bg-white/20 text-white'
                    : isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                }`}
              >
                <div className="flex items-center space-x-1">
                  <Activity size={18} />
                  <span>New Diagnosis</span>
                </div>
              </Link>              <Link 
                to="/history" 
                className={`px-4 py-2 rounded-lg transition-all ${
                  isActive('/history')
                    ? isScrolled ? 'bg-teal-100 text-teal-700' : 'bg-white/20 text-white'
                    : isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                }`}
              >
                <div className="flex items-center space-x-1">
                  <History size={18} />
                  <span>History</span>
                </div>
              </Link>

              <Link 
                to="/ayurvedic-guidance" 
                className={`px-4 py-2 rounded-lg transition-all ${
                  isActive('/ayurvedic-guidance')
                    ? isScrolled ? 'bg-teal-100 text-teal-700' : 'bg-white/20 text-white'
                    : isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                }`}
              >
                <div className="flex items-center space-x-1">
                  <Leaf size={18} />
                  <span>Ayurveda</span>
                </div>
              </Link>

              <Link 
                to="/traditional-remedies" 
                className={`px-4 py-2 rounded-lg transition-all ${
                  isActive('/traditional-remedies')
                    ? isScrolled ? 'bg-teal-100 text-teal-700' : 'bg-white/20 text-white'
                    : isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                }`}
              >
                <div className="flex items-center space-x-1">
                  <Heart size={18} />
                  <span>Remedies</span>
                </div>
              </Link>

              <Link 
                to="/medications" 
                className={`px-4 py-2 rounded-lg transition-all ${
                  isActive('/medications')
                    ? isScrolled ? 'bg-teal-100 text-teal-700' : 'bg-white/20 text-white'
                    : isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                }`}
              >
                <div className="flex items-center space-x-1">
                  <Pill size={18} />
                  <span>Medications</span>
                </div>
              </Link>
              
              <Link 
                to="/profile" 
                className={`px-4 py-2 rounded-lg transition-all ${
                  isActive('/profile')
                    ? isScrolled ? 'bg-teal-100 text-teal-700' : 'bg-white/20 text-white'
                    : isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                }`}
              >
                <div className="flex items-center space-x-1">
                  <User size={18} />
                  <span>Profile</span>
                </div>
              </Link>
              
              <button
                onClick={handleLogout}
                className={`ml-2 px-4 py-2 rounded-lg transition-all ${
                  isScrolled 
                    ? 'bg-gray-200 hover:bg-gray-300 text-gray-700' 
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                <div className="flex items-center space-x-1">
                  <LogOut size={18} />
                  <span>Log Out</span>
                </div>
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className={`px-4 py-2 rounded-lg transition-all ${
                  isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                }`}
              >
                Login
              </Link>
              <Link
                to="/register"
                className={`px-5 py-2 rounded-lg transition-all ${
                  isScrolled 
                    ? 'btn-modern-primary' 
                    : 'bg-white text-teal-600 hover:bg-teal-50'
                }`}
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`p-2 rounded-lg ${
              isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
            }`}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className={`md:hidden mt-4 pt-4 px-6 pb-4 ${
          isScrolled ? 'border-t border-gray-100' : 'border-t border-white/10'
        }`}>
          <div className="flex flex-col space-y-2">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                    isScrolled 
                      ? 'hover:bg-gray-100 text-gray-700' 
                      : 'text-white hover:bg-white/10'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Home size={18} />
                  <span>Dashboard</span>
                </Link>
                <Link
                  to="/diagnose"
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                    isScrolled 
                      ? 'hover:bg-gray-100 text-gray-700' 
                      : 'text-white hover:bg-white/10'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Activity size={18} />
                  <span>New Diagnosis</span>
                </Link>                <Link
                  to="/history"
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                    isScrolled 
                      ? 'hover:bg-gray-100 text-gray-700' 
                      : 'text-white hover:bg-white/10'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <History size={18} />
                  <span>History</span>
                </Link>
                <Link
                  to="/ayurvedic-guidance"
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                    isScrolled 
                      ? 'hover:bg-gray-100 text-gray-700' 
                      : 'text-white hover:bg-white/10'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Leaf size={18} />
                  <span>Ayurvedic Guidance</span>
                </Link>
                <Link
                  to="/traditional-remedies"
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                    isScrolled 
                      ? 'hover:bg-gray-100 text-gray-700' 
                      : 'text-white hover:bg-white/10'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Heart size={18} />
                  <span>Traditional Remedies</span>
                </Link>
                <Link
                  to="/medications"
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                    isScrolled 
                      ? 'hover:bg-gray-100 text-gray-700' 
                      : 'text-white hover:bg-white/10'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Pill size={18} />
                  <span>Medications</span>
                </Link>
                <Link
                  to="/profile"
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                    isScrolled 
                      ? 'hover:bg-gray-100 text-gray-700' 
                      : 'text-white hover:bg-white/10'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User size={18} />
                  <span>Profile</span>
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                    isScrolled 
                      ? 'hover:bg-gray-100 text-gray-700 mt-4' 
                      : 'text-white hover:bg-white/10 mt-4 border border-white/30'
                  }`}
                >
                  <LogOut size={18} />
                  <span>Log Out</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-lg ${
                    isScrolled 
                      ? 'hover:bg-gray-100 text-gray-700' 
                      : 'text-white hover:bg-white/10'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-lg mt-2 ${
                    isScrolled 
                      ? 'btn-modern-primary' 
                      : 'bg-white text-teal-600 hover:bg-teal-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
