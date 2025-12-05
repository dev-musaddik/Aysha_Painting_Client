import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { FiShoppingCart, FiUser, FiMenu, FiX, FiLogOut } from 'react-icons/fi';
import { logout } from '../../redux/slices/authSlice';
import { useLanguage } from '../../i18n/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

/**
 * Navbar Component - Dhaka Homemade Art Gallery
 * Artistic navigation with gallery branding and bilingual support
 */
const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { itemCount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { name: t('gallery'), path: '/' },
    { name: t('artworks'), path: '/products' },
    { name: t('commissionArt'), path: '/custom-design' },
  ];

  return (
    <nav className="bg-cream shadow-lg sticky top-0 z-50 border-b-2 border-primary-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
              <span className="text-white font-bold text-2xl">🎨</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-display font-bold text-primary-600">
                {t('heroTitle')}
              </span>
              <span className="text-sm font-sans text-secondary-600 -mt-1">
                {t('heroSubtitle')}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-charcoal hover:text-primary-600 font-sans font-medium transition-colors relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="hidden md:block">
              <LanguageSwitcher />
            </div>

            {/* Cart Icon */}
            <Link to="/cart" className="relative p-2 hover:bg-primary-50 rounded-full transition">
              <FiShoppingCart className="w-6 h-6 text-charcoal" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {user ? (
              <div className="hidden md:flex items-center space-x-4">
                <Link
                  to="/profile"
                  className="flex items-center space-x-2 text-charcoal hover:text-primary-600 transition"
                >
                  <FiUser className="w-5 h-5" />
                  <span className="font-sans font-medium">{user.name}</span>
                </Link>
                <Link
                  to="/orders"
                  className="text-charcoal hover:text-primary-600 font-sans font-medium transition"
                >
                  {t('myPurchases')}
                </Link>
                {user.role === 'admin' && (
                  <Link
                    to="/admin/dashboard"
                    className="px-4 py-2 bg-secondary-500 text-white rounded-lg hover:bg-secondary-600 transition font-sans font-medium"
                  >
                    {t('galleryAdmin')}
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="p-2 hover:bg-primary-50 rounded-full transition"
                  title={t('logout')}
                >
                  <FiLogOut className="w-5 h-5 text-charcoal" />
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-charcoal hover:text-primary-600 font-sans font-medium transition"
                >
                  {t('login')}
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition font-sans font-medium shadow-md"
                >
                  {t('joinGallery')}
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-primary-50 rounded-full transition"
            >
              {mobileMenuOpen ? (
                <FiX className="w-6 h-6 text-charcoal" />
              ) : (
                <FiMenu className="w-6 h-6 text-charcoal" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-primary-200 animate-slide-up bg-cream">
            {/* Language Switcher Mobile */}
            <div className="mb-4 flex justify-center">
              <LanguageSwitcher />
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-3 text-charcoal hover:text-primary-600 font-sans font-medium transition"
              >
                {link.name}
              </Link>
            ))}
            {user ? (
              <>
                <Link
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-3 text-charcoal hover:text-primary-600 font-sans font-medium transition"
                >
                  {t('profile')}
                </Link>
                <Link
                  to="/orders"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-3 text-charcoal hover:text-primary-600 font-sans font-medium transition"
                >
                  {t('myPurchases')}
                </Link>
                {user.role === 'admin' && (
                  <Link
                    to="/admin/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-3 text-secondary-600 hover:text-secondary-700 font-sans font-medium transition"
                  >
                    {t('galleryAdmin')}
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="block w-full text-left py-3 text-primary-600 hover:text-primary-700 font-sans font-medium transition"
                >
                  {t('logout')}
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-3 text-charcoal hover:text-primary-600 font-sans font-medium transition"
                >
                  {t('login')}
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-3 text-primary-600 hover:text-primary-700 font-sans font-medium transition"
                >
                  {t('joinGallery')}
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
