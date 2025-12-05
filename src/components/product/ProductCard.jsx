import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice';
import { FiShoppingCart, FiHeart } from 'react-icons/fi';
import { useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';

/**
 * Enhanced ProductCard Component with Artistic Effects - Bilingual
 * Displays product information with hover effects and animations
 */
const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { t } = useLanguage();
  const [isLiked, setIsLiked] = useState(false);
  const [showAddedFeedback, setShowAddedFeedback] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    dispatch(addToCart({ productId: product._id, quantity: 1 }));
    
    // Show feedback animation
    setShowAddedFeedback(true);
    setTimeout(() => setShowAddedFeedback(false), 2000);
  };

  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <Link to={`/products/${product._id}`}>
      <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-3xl transition-all duration-500 overflow-hidden card-tilt artistic-border hover-glow">
        {/* Image Container with Zoom Effect */}
        <div className="relative aspect-square overflow-hidden bg-cream image-zoom">
          <img
            src={product.images?.[0] || '/placeholder-product.jpg'}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2"
          />
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* Featured Badge */}
          {product.featured && (
            <div className="absolute top-4 left-4 bg-gradient-to-r from-accent-500 to-accent-600 text-white px-4 py-2 rounded-full text-sm font-sans font-bold shadow-lg animate-bounce-slow">
              ⭐ {t('featured')}
            </div>
          )}

          {/* Stock Badge */}
          {product.stock === 0 && (
            <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-sans font-bold shadow-lg">
              {t('soldOut')}
            </div>
          )}

          {/* Like Button */}
          <button
            onClick={handleLike}
            className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg"
          >
            <FiHeart
              className={`w-6 h-6 transition-all duration-300 ${
                isLiked ? 'fill-red-500 text-red-500 scale-125' : 'text-charcoal'
              }`}
            />
          </button>

          {/* Quick Add to Cart */}
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary-500 to-accent-500 text-white px-6 py-3 rounded-full font-sans font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 active:scale-95 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed animate-glow-pulse"
          >
            <FiShoppingCart className="w-5 h-5" />
            <span>{t('addToCart')}</span>
          </button>

          {/* Added Feedback */}
          {showAddedFeedback && (
            <div className="absolute inset-0 bg-primary-500/90 flex items-center justify-center animate-fade-in">
              <div className="text-white text-center">
                <div className="text-5xl mb-2 animate-bounce-slow">✓</div>
                <div className="font-display font-bold text-xl">{t('addedToCart')}</div>
              </div>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-6 relative">
          {/* Decorative corner */}
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-primary-100 to-transparent rounded-bl-full opacity-50"></div>

          {/* Category */}
          <div className="mb-2">
            <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-sans font-semibold uppercase tracking-wide">
              {product.category}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-display font-bold text-charcoal mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors paint-stroke">
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-secondary-600 text-sm font-body mb-4 line-clamp-2">
            {product.description}
          </p>

          {/* Price and Stock */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-display font-bold gradient-text">
                ৳{product.basePrice?.toFixed(2)}
              </div>
              <div className="text-xs text-secondary-500 font-sans">
                {product.stock > 0 ? `${product.stock} ${t('inStock')}` : t('outOfStock')}
              </div>
            </div>

            {/* Customizable Badge */}
            {product.customizable && (
              <div className="bg-gradient-to-r from-secondary-500 to-secondary-600 text-white px-3 py-1 rounded-full text-xs font-sans font-bold shadow-md">
                🎨 {t('custom')}
              </div>
            )}
          </div>

          {/* Hover indicator */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-accent-500 to-secondary-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
        </div>
      </div>
    </Link>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    basePrice: PropTypes.number.isRequired,
    images: PropTypes.arrayOf(PropTypes.string),
    category: PropTypes.string.isRequired,
    stock: PropTypes.number.isRequired,
    customizable: PropTypes.bool,
    featured: PropTypes.bool,
  }).isRequired,
};

export default ProductCard;
