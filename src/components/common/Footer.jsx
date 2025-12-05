import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin, FiFacebook, FiInstagram, FiTwitter } from 'react-icons/fi';
import { useLanguage } from '../../i18n/LanguageContext';

/**
 * Footer Component - Dhaka Homemade Art Gallery
 * Artistic footer with gallery information - Bilingual
 */
const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-charcoal text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Gallery Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">🎨</span>
              </div>
              <div>
                <h3 className="text-xl font-display font-bold text-white">{t('heroTitle')}</h3>
                <p className="text-sm text-primary-300 font-sans">{t('heroSubtitle')}</p>
              </div>
            </div>
            <p className="text-gray-300 font-body text-sm leading-relaxed">
              {t('celebratingArtistry')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-display font-semibold mb-4 text-accent-300">{t('explore')}</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-primary-300 transition font-sans text-sm">
                  {t('galleryHome')}
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-300 hover:text-primary-300 transition font-sans text-sm">
                  {t('browseArtworks')}
                </Link>
              </li>
              <li>
                <Link to="/custom-design" className="text-gray-300 hover:text-primary-300 transition font-sans text-sm">
                  {t('commissionArt')}
                </Link>
              </li>
              <li>
                <Link to="/orders" className="text-gray-300 hover:text-primary-300 transition font-sans text-sm">
                  {t('myPurchases')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Artist Info */}
          <div>
            <h4 className="text-lg font-display font-semibold mb-4 text-accent-300">{t('forArtists')}</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/signup" className="text-gray-300 hover:text-primary-300 transition font-sans text-sm">
                  {t('joinGallery')}
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary-300 transition font-sans text-sm">
                  {t('artistGuidelines')}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary-300 transition font-sans text-sm">
                  {t('submissionProcess')}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary-300 transition font-sans text-sm">
                  {t('artistSupport')}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-display font-semibold mb-4 text-accent-300">{t('contactUs')}</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <FiMapPin className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300 font-sans text-sm">
                  Dhaka, Bangladesh
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <FiPhone className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <a href="tel:+8801234567890" className="text-gray-300 hover:text-primary-300 transition font-sans text-sm">
                  +880 1234-567890
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <FiMail className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <a href="mailto:gallery@dhakahomemade.art" className="text-gray-300 hover:text-primary-300 transition font-sans text-sm">
                  gallery@dhakahomemade.art
                </a>
              </li>
            </ul>

            {/* Social Media */}
            <div className="mt-6">
              <h5 className="text-sm font-sans font-semibold mb-3 text-accent-300">{t('followUs')}</h5>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary-500 transition"
                  aria-label="Facebook"
                >
                  <FiFacebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary-500 transition"
                  aria-label="Instagram"
                >
                  <FiInstagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary-500 transition"
                  aria-label="Twitter"
                >
                  <FiTwitter className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm font-sans">
              © {new Date().getFullYear()} {t('copyright')}
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-primary-300 transition text-sm font-sans">
                {t('privacyPolicy')}
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-300 transition text-sm font-sans">
                {t('termsOfService')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
