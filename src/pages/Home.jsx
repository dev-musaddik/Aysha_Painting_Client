import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/slices/productSlice';
import ProductCard from '../components/product/ProductCard';
import { FiTruck, FiShield, FiHeart, FiArrowRight, FiStar, FiAward } from 'react-icons/fi';
import { useLanguage } from '../i18n/LanguageContext';

/**
 * Home Page - Dhaka Homemade Art Gallery Landing Page
 * Artistic gallery theme with featured artworks - Bilingual
 */
const Home = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { t } = useLanguage();

  useEffect(() => {
    dispatch(fetchProducts({ featured: true, limit: 6 }));
  }, [dispatch]);

  const featuredProducts = products.filter(p => p.featured).slice(0, 6);

  return (
    <div className="min-h-screen bg-cream">
      {/* Artistic Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-500 via-primary-400 to-accent-500">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 border-8 border-white rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 border-8 border-white rounded-lg rotate-12"></div>
          <div className="absolute top-1/2 left-1/3 w-48 h-48 border-8 border-white rounded-full"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left text-white animate-fade-in">
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-5 py-2 rounded-full mb-6 animate-slide-up">
                <FiStar className="w-4 h-4 text-accent-300" />
                <span className="text-sm font-sans font-medium">{t('heroBadge')}</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight animate-slide-up delay-100">
                {t('heroTitle')}
                <span className="block text-accent-300">
                  {t('heroSubtitle')}
                </span>
              </h1>

              {/* Subheading */}
              <p className="text-xl sm:text-2xl font-body text-white/90 mb-8 leading-relaxed animate-slide-up delay-200">
                {t('heroDescription')}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mb-10 animate-slide-up delay-300">
                <div className="text-center">
                  <div className="text-3xl font-display font-bold mb-1">500+</div>
                  <div className="text-sm font-sans text-white/80">{t('artworksCount')}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-display font-bold mb-1">100+</div>
                  <div className="text-sm font-sans text-white/80">{t('artistsCount')}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-display font-bold mb-1">2K+</div>
                  <div className="text-sm font-sans text-white/80">{t('artLoversCount')}</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-slide-up delay-400">
                <Link to="/products">
                  <button className="group px-8 py-4 bg-white text-primary-600 rounded-lg font-sans font-bold text-lg shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2">
                    <span>{t('exploreGallery')}</span>
                    <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <Link to="/custom-design">
                  <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-lg font-sans font-bold text-lg hover:bg-white/20 hover:scale-105 transition-all duration-300">
                    {t('commissionArtwork')}
                  </button>
                </Link>
              </div>
            </div>

            {/* Right Visual - Artwork Showcase */}
            <div className="relative animate-fade-in delay-500">
              <div className="relative z-10">
                <div className="relative group">
                  {/* Frame Effect */}
                  <div className="absolute -inset-6 bg-gradient-to-r from-accent-400 via-primary-300 to-secondary-400 rounded-3xl blur-2xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
                  
                  {/* Artwork Display */}
                  <div className="relative bg-white rounded-3xl p-8 shadow-2xl transform hover:scale-105 transition-all duration-500">
                    <div className="aspect-square rounded-2xl overflow-hidden border-8 border-accent-200 relative group">
                      {/* Main Artwork Image */}
                      <img 
                        src="/assets/hero_artwork_showcase.png" 
                        alt="Featured Artwork"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center p-6">
                        <div className="text-center text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                          <div className="text-2xl font-display font-bold mb-2">
                            {t('artworksCount')}
                          </div>
                          <div className="text-white/90 font-body">
                            {t('handpickedMasterpieces')}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Badge */}
                <div className="absolute -top-8 -left-8 bg-white rounded-2xl p-4 shadow-2xl animate-float">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-accent-500 rounded-full flex items-center justify-center">
                      <FiAward className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-sans font-bold text-charcoal">{t('authenticArt')}</div>
                      <div className="text-sm text-secondary-600">{t('artistsCount')}</div>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-8 -right-8 bg-white rounded-2xl p-4 shadow-2xl animate-float delay-500">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-secondary-500 rounded-full flex items-center justify-center">
                      <FiHeart className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-sans font-bold text-charcoal">{t('custom')}</div>
                      <div className="text-sm text-secondary-600">{t('supportArtists')}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#FAF7F2"/>
          </svg>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-display font-bold text-charcoal mb-4">{t('whyChooseUs')}</h2>
            <p className="text-xl font-body text-secondary-600">{t('supportingLocalArtists')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                image: '/assets/authentic_art_feature.png',
                title: t('authenticArt'),
                description: t('authenticArtDesc'),
                color: 'from-primary-500 to-primary-600'
              },
              {
                image: '/assets/quality_assured_feature.png',
                title: t('qualityAssured'),
                description: t('qualityAssuredDesc'),
                color: 'from-secondary-500 to-secondary-600'
              },
              {
                image: '/assets/safe_delivery_feature.png',
                title: t('safeDelivery'),
                description: t('safeDeliveryDesc'),
                color: 'from-accent-500 to-accent-600'
              },
              {
                image: '/assets/support_artists_feature.png',
                title: t('supportArtists'),
                description: t('supportArtistsDesc'),
                color: 'from-primary-400 to-secondary-500'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-slide-up border-2 border-primary-100"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Image Container */}
                <div className="relative h-48 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-10 group-hover:opacity-20 transition-opacity`}></div>
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-display font-bold text-charcoal mb-3">{feature.title}</h3>
                  <p className="text-secondary-600 font-body">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Artworks */}
      {featuredProducts.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-4xl font-display font-bold text-charcoal mb-4">{t('featuredArtworks')}</h2>
              <p className="text-xl font-body text-secondary-600">{t('handpickedMasterpieces')}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product, index) => (
                <div
                  key={product._id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link to="/products">
                <button className="px-8 py-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-lg font-sans font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                  {t('viewAllArtworks')}
                </button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-secondary-600 to-primary-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-display font-bold mb-6 animate-fade-in">
            {t('commissionYourArtwork')}
          </h2>
          <p className="text-xl mb-10 text-white/90 font-body animate-fade-in delay-100">
            {t('workWithArtists')}
          </p>
          <Link to="/custom-design">
            <button className="px-10 py-5 bg-white text-primary-600 rounded-lg font-sans font-bold text-xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 animate-fade-in delay-200">
              {t('startYourCommission')}
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
