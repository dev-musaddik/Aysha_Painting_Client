import PropTypes from 'prop-types';
import { useLanguage } from '../../i18n/LanguageContext';

/**
 * Enhanced Button Component with Artistic Effects - Bilingual
 * Reusable button with multiple variants, sizes, and artistic animations
 */
const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled = false,
  onClick,
  type = 'button',
  className = '',
}) => {
  const { t } = useLanguage();
  
  const baseStyles = 'font-sans font-semibold rounded-lg transition-all duration-300 transform hover:-translate-y-1 active:scale-95 relative overflow-hidden group';

  const variants = {
    primary: 'bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 shadow-artistic hover:shadow-3xl animate-glow-pulse',
    secondary: 'bg-gradient-to-r from-secondary-500 to-secondary-600 text-white hover:from-secondary-600 hover:to-secondary-700 shadow-artistic hover:shadow-3xl',
    accent: 'bg-gradient-to-r from-accent-500 to-accent-600 text-white hover:from-accent-600 hover:to-accent-700 shadow-artistic hover:shadow-3xl',
    outline: 'border-2 border-primary-500 text-primary-600 hover:bg-primary-50 hover:border-primary-600 artistic-border',
    ghost: 'text-primary-600 hover:bg-primary-50 paint-stroke',
    danger: 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-2xl',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClass = disabled || loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover-glow';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${widthClass}
        ${disabledClass}
        ${className}
      `}
    >
      {/* Shimmer effect overlay */}
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
      
      {/* Button content */}
      <span className="relative z-10 flex items-center justify-center space-x-2">
        {loading ? (
          <>
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span>{t('loading')}</span>
          </>
        ) : (
          children
        )}
      </span>

      {/* Artistic corner decorations */}
      {variant === 'primary' && (
        <>
          <span className="absolute top-0 left-0 w-2 h-2 bg-accent-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
          <span className="absolute bottom-0 right-0 w-2 h-2 bg-accent-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
        </>
      )}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'accent', 'outline', 'ghost', 'danger']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  fullWidth: PropTypes.bool,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  className: PropTypes.string,
};

export default Button;
