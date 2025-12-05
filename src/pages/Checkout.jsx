import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import api from '../redux/api/apiService';
import { clearCart } from '../redux/slices/cartSlice';
import { useLanguage } from '../i18n/LanguageContext';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Spinner from '../components/common/Spinner';

/**
 * Checkout Page
 * Order placement with Cash on Delivery and Dhaka delivery charges
 */
const Checkout = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, total } = useSelector((state) => state.cart);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [shippingAddress, setShippingAddress] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Bangladesh',
  });

  const [deliveryArea, setDeliveryArea] = useState('inside'); // 'inside' or 'outside' Dhaka
  const [deliveryCharge, setDeliveryCharge] = useState(60);

  // Delivery charges
  const DELIVERY_CHARGES = {
    inside: 60,  // Inside Dhaka
    outside: 120, // Outside Dhaka
  };

  useEffect(() => {
    // Auto-detect delivery area based on city
    const city = shippingAddress.city.toLowerCase();
    if (city.includes('dhaka') || city.includes('ঢাকা')) {
      setDeliveryArea('inside');
      setDeliveryCharge(DELIVERY_CHARGES.inside);
    } else if (city && city !== '') {
      setDeliveryArea('outside');
      setDeliveryCharge(DELIVERY_CHARGES.outside);
    }
  }, [shippingAddress.city]);

  const handleChange = (e) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value,
    });
  };

  const handleDeliveryAreaChange = (area) => {
    setDeliveryArea(area);
    setDeliveryCharge(DELIVERY_CHARGES[area]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const orderData = {
        items: items.map(item => ({
          product: item.product._id,
          quantity: item.quantity,
          size: item.size,
          color: item.color,
          material: item.material,
          customDesign: item.customDesign,
        })),
        shippingAddress,
        deliveryCharge,
        paymentMethod: 'Cash on Delivery',
      };

      const { data } = await api.post('/api/orders', orderData);
      
      // Clear cart after successful order
      dispatch(clearCart());
      
      // Navigate to order tracking
      navigate(`/orders/track/${data.data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  const grandTotal = total + deliveryCharge;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">{t('checkout')}</h1>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Shipping Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('shippingInformation')}</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label={t('fullName')}
                  name="fullName"
                  value={shippingAddress.fullName}
                  onChange={handleChange}
                  required
                />

                <Input
                  label={t('phoneNumber')}
                  name="phone"
                  type="tel"
                  value={shippingAddress.phone}
                  onChange={handleChange}
                  placeholder="01XXXXXXXXX"
                  required
                />

                <Input
                  label={t('address')}
                  name="address"
                  value={shippingAddress.address}
                  onChange={handleChange}
                  placeholder="House/Flat, Road, Area"
                  required
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label={t('city')}
                    name="city"
                    value={shippingAddress.city}
                    onChange={handleChange}
                    placeholder="e.g., Dhaka, Chittagong"
                    required
                  />

                  <Input
                    label={t('postalCode')}
                    name="postalCode"
                    value={shippingAddress.postalCode}
                    onChange={handleChange}
                    placeholder="e.g., 1200"
                    required
                  />
                </div>

                <Input
                  label="Country"
                  name="country"
                  value={shippingAddress.country}
                  onChange={handleChange}
                  disabled
                />

                {/* Delivery Area Selection */}
                <div className="pt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    {t('deliveryArea')}
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => handleDeliveryAreaChange('inside')}
                      className={`p-4 border-2 rounded-lg transition ${
                        deliveryArea === 'inside'
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <p className="font-semibold text-gray-900">{t('insideDhaka')}</p>
                      <p className="text-sm text-gray-600">৳{DELIVERY_CHARGES.inside} {t('deliveryCharge')}</p>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeliveryAreaChange('outside')}
                      className={`p-4 border-2 rounded-lg transition ${
                        deliveryArea === 'outside'
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <p className="font-semibold text-gray-900">{t('outsideDhaka')}</p>
                      <p className="text-sm text-gray-600">৳{DELIVERY_CHARGES.outside} {t('deliveryCharge')}</p>
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  loading={loading}
                  className="mt-6"
                >
                  {t('placeOrder')} ({t('cashOnDelivery')})
                </Button>
              </form>
            </div>

            {/* Payment Method Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="font-semibold text-blue-900 mb-2">💵 {t('cashOnDelivery')}</h3>
              <p className="text-blue-800 text-sm">
                {t('cashOnDeliveryDesc') || 'Pay with cash when your order is delivered to your doorstep. No advance payment required!'}
              </p>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('orderSummary')}</h2>

              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item._id} className="flex justify-between text-sm">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{item.product.name}</p>
                      <p className="text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium text-gray-900">
                      ৳{(item.product.basePrice * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>{t('subtotal')}</span>
                  <span className="font-medium">৳{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>{t('deliveryCharge')}</span>
                  <span className="font-medium">
                    ৳{deliveryCharge.toFixed(2)}
                    <span className="text-xs ml-1">
                      ({deliveryArea === 'inside' ? t('insideDhaka') : t('outsideDhaka')})
                    </span>
                  </span>
                </div>
                <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t">
                  <span>{t('total')}</span>
                  <span>৳{grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{t('paymentMethod') || 'Payment Method'}:</span>
                  <span className="font-semibold text-green-600">{t('cashOnDelivery')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
