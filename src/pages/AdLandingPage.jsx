import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import api from '../redux/api/apiService';
import Spinner from '../components/common/Spinner';
import { useRef } from 'react';
import { FiCheck, FiShoppingCart, FiTruck, FiShield, FiAward, FiStar, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import GuestCheckoutForm from '../components/common/GuestCheckoutForm';

/**
 * Ad Landing Page - Standalone page for Facebook ads
 * No navbar/footer - optimized for conversions
 */
const AdLandingPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [landingPage, setLandingPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const checkoutRef = useRef(null);

  const scrollToCheckout = () => {
    checkoutRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    fetchLandingPage();
  }, [slug]);

  const fetchLandingPage = async () => {
    try {
      const response = await api.get(`/api/landing-pages/${slug}`);
      setLandingPage(response.data.landingPage);
    } catch (error) {
      console.error('Failed to fetch landing page:', error);
    } finally {
      setLoading(false);
    }
  };



  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!landingPage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h1>
          <p className="text-gray-600">This landing page doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  const { product } = landingPage;
  const displayPrice = landingPage.specialPrice || product.basePrice;
  const hasDiscount = landingPage.originalPrice && landingPage.specialPrice;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* ADVERTISEMENT SECTION */}
      <section className="relative overflow-hidden">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Headline */}
          <div className="text-center mb-8 sm:mb-12 animate-fade-in">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight">
              {landingPage.headline}
            </h1>
            {landingPage.subheadline && (
              <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto">
                {landingPage.subheadline}
              </p>
            )}
          </div>

          {/* Product Images */}
          <div className="mb-12 animate-slide-up">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl max-w-4xl mx-auto">
              <img
                src={landingPage.images?.[0] || product.images?.[0]}
                alt={product.name}
                className="w-full h-auto"
              />
              {hasDiscount && (
                <div className="absolute top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg">
                  {landingPage.discount}% OFF
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="max-w-4xl mx-auto mb-12">
            <p className="text-lg sm:text-xl text-gray-700 leading-relaxed text-center">
              {landingPage.description}
            </p>
          </div>

          {/* Features */}
          {landingPage.features && landingPage.features.length > 0 && (
            <div className="max-w-4xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Why You'll Love It
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {landingPage.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 bg-white p-4 rounded-lg shadow-sm"
                  >
                    <FiCheck className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Benefits */}
          {landingPage.benefits && landingPage.benefits.length > 0 && (
            <div className="max-w-4xl mx-auto mb-16">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {landingPage.benefits.slice(0, 3).map((benefit, index) => {
                  const icons = [FiTruck, FiShield, FiAward];
                  const Icon = icons[index] || FiCheck;
                  const colors = ['bg-blue-100 text-blue-600', 'bg-green-100 text-green-600', 'bg-purple-100 text-purple-600'];
                  
                  return (
                    <div key={index} className="text-center p-6 bg-white rounded-xl shadow-md transform hover:-translate-y-1 transition-transform duration-300">
                      <div className={`w-16 h-16 ${colors[index]} rounded-full flex items-center justify-center mx-auto mb-4`}>
                        <Icon className="w-8 h-8" />
                      </div>
                      <p className="text-gray-700 font-medium text-lg">{benefit}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Testimonials Section (Mock Data for now, can be dynamic later) */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">What Our Customers Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { name: "Sarah Ahmed", text: "Absolutely love the quality! The colors are so vibrant and it looks perfect in my living room.", rating: 5 },
                { name: "Rahim Uddin", text: "Fast delivery and excellent packaging. Highly recommended for art lovers.", rating: 5 }
              ].map((review, idx) => (
                <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex text-yellow-400 mb-2">
                    {[...Array(review.rating)].map((_, i) => <FiStar key={i} fill="currentColor" />)}
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{review.text}"</p>
                  <p className="font-bold text-gray-900">- {review.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                { q: "How long does delivery take?", a: "Inside Dhaka: 2-3 days. Outside Dhaka: 3-5 days." },
                { q: "Can I return the product?", a: "Yes, we have a 7-day return policy if the product is damaged or incorrect." },
                { q: "Is the payment secure?", a: "Absolutely! We offer Cash on Delivery so you pay only when you receive the product." }
              ].map((faq, idx) => (
                <details key={idx} className="bg-white rounded-lg shadow-sm group">
                  <summary className="flex justify-between items-center p-4 cursor-pointer font-medium text-gray-900 list-none">
                    <span>{faq.q}</span>
                    <span className="transition group-open:rotate-180">
                      <FiChevronDown />
                    </span>
                  </summary>
                  <div className="px-4 pb-4 text-gray-600">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PURCHASE SECTION */}
      <section ref={checkoutRef} className="bg-gradient-to-b from-gray-50 to-gray-100 py-12 sm:py-16 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Get Yours Today!
            </h2>
            <p className="text-xl text-gray-600">
              Limited stock available. Order now to secure yours.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Product Summary Side */}
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 sticky top-8">
              <div className="flex items-center justify-center space-x-4 mb-6">
                {hasDiscount && (
                  <span className="text-2xl text-gray-400 line-through">
                    ${landingPage.originalPrice.toFixed(2)}
                  </span>
                )}
                <span className="text-5xl font-bold text-primary-600">
                  ${displayPrice.toFixed(2)}
                </span>
              </div>
              
              {hasDiscount && (
                <div className="text-center mb-6">
                  <span className="bg-red-100 text-red-600 px-4 py-1 rounded-full font-bold text-sm">
                    SAVE ${(landingPage.originalPrice - landingPage.specialPrice).toFixed(2)}
                  </span>
                </div>
              )}

              {/* Urgency */}
              {landingPage.urgencyText && (
                <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 mb-8 text-center animate-pulse">
                  <p className="text-red-600 font-bold text-lg">
                    ⚡ {landingPage.urgencyText}
                  </p>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="mb-8">
                <label className="block text-gray-700 font-medium mb-3 text-center">
                  Select Quantity
                </label>
                <div className="flex items-center justify-center space-x-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 bg-gray-100 rounded-full font-bold text-xl hover:bg-gray-200 transition flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="text-3xl font-bold w-16 text-center text-gray-800">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 bg-gray-100 rounded-full font-bold text-xl hover:bg-gray-200 transition flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 text-center text-sm text-gray-600 border-t border-gray-100 pt-6">
                <div>
                  <FiShield className="w-8 h-8 mx-auto mb-2 text-green-500" />
                  <span className="block font-medium">Secure Payment</span>
                </div>
                <div>
                  <FiTruck className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                  <span className="block font-medium">Fast Delivery</span>
                </div>
                <div>
                  <FiAward className="w-8 h-8 mx-auto mb-2 text-purple-500" />
                  <span className="block font-medium">Premium Quality</span>
                </div>
              </div>
            </div>

            {/* Guest Checkout Form Side */}
            <div>
              <GuestCheckoutForm 
                product={landingPage.product} 
                quantity={quantity}
                onSuccess={async () => {
                   // Track conversion on success
                   try {
                     await api.post(`/api/landing-pages/${slug}/conversion`);
                   } catch (e) {
                     console.error("Conversion tracking failed", e);
                   }
                   // Navigate handled by component or we can override here
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] sm:hidden z-50">
        <button
          onClick={scrollToCheckout}
          className="w-full bg-gradient-to-r from-primary-600 to-primary-500 text-white py-3.5 rounded-xl font-bold flex items-center justify-center space-x-2 shadow-lg active:scale-95 transition-transform"
        >
          <FiShoppingCart className="w-5 h-5" />
          <span>Buy Now - ${(displayPrice * quantity).toFixed(2)}</span>
        </button>
      </div>
    </div>
  );
};

export default AdLandingPage;
