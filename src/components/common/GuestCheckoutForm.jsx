import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../redux/api/apiService';
import Input from './Input';
import Button from './Button';
import { FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

const GuestCheckoutForm = ({ product, quantity, onSuccess }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
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
        items: [{
          product: product._id,
          quantity: quantity,
          // Add default size/color if needed or pass from props
        }],
        shippingAddress,
        deliveryCharge,
        paymentMethod: 'Cash on Delivery',
      };

      const { data } = await api.post('/api/orders/guest', orderData);
      
      setSuccess(true);
      if (onSuccess) {
        onSuccess(data.data);
      } else {
        // Default behavior: redirect to tracking
        setTimeout(() => {
            navigate(`/orders/track/${data.data._id}`);
        }, 1500);
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center animate-fade-in">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FiCheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-green-800 mb-2">Order Placed Successfully!</h3>
        <p className="text-green-700 mb-4">
          Thank you for your order. You will be redirected to the tracking page shortly.
        </p>
        <div className="animate-pulse text-green-600 font-medium">
          Redirecting...
        </div>
      </div>
    );
  }

  const totalProductPrice = (product.specialPrice || product.basePrice) * quantity;
  const grandTotal = totalProductPrice + deliveryCharge;

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
        <h3 className="text-xl font-bold text-gray-800">Express Checkout</h3>
        <p className="text-sm text-gray-500">No login required</p>
      </div>

      <div className="p-6 sm:p-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3">
            <FiAlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            name="fullName"
            value={shippingAddress.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />

          <Input
            label="Phone Number"
            name="phone"
            type="tel"
            value={shippingAddress.phone}
            onChange={handleChange}
            placeholder="01XXXXXXXXX"
            required
          />

          <Input
            label="Address"
            name="address"
            value={shippingAddress.address}
            onChange={handleChange}
            placeholder="House/Flat, Road, Area"
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="City"
              name="city"
              value={shippingAddress.city}
              onChange={handleChange}
              placeholder="e.g., Dhaka"
              required
            />

            <Input
              label="Postal Code"
              name="postalCode"
              value={shippingAddress.postalCode}
              onChange={handleChange}
              placeholder="e.g., 1200"
              required
            />
          </div>

          {/* Delivery Area Selection */}
          <div className="pt-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Delivery Area
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleDeliveryAreaChange('inside')}
                className={`p-3 border rounded-lg transition text-left ${
                  deliveryArea === 'inside'
                    ? 'border-primary-500 bg-primary-50 ring-1 ring-primary-500'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-medium text-gray-900">Inside Dhaka</div>
                <div className="text-sm text-gray-500">৳{DELIVERY_CHARGES.inside}</div>
              </button>
              <button
                type="button"
                onClick={() => handleDeliveryAreaChange('outside')}
                className={`p-3 border rounded-lg transition text-left ${
                  deliveryArea === 'outside'
                    ? 'border-primary-500 bg-primary-50 ring-1 ring-primary-500'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-medium text-gray-900">Outside Dhaka</div>
                <div className="text-sm text-gray-500">৳{DELIVERY_CHARGES.outside}</div>
              </button>
            </div>
          </div>

          {/* Order Summary in Form */}
          <div className="mt-6 bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Subtotal ({quantity} items)</span>
              <span className="font-medium">৳{totalProductPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Delivery Charge</span>
              <span className="font-medium">৳{deliveryCharge.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-200 mt-2">
              <span>Total to Pay</span>
              <span className="text-primary-600">৳{grandTotal.toFixed(2)}</span>
            </div>
            <div className="mt-2 text-xs text-center text-gray-500">
              Cash on Delivery
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={loading}
            className="mt-4 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
          >
            Confirm Order - ৳{grandTotal.toFixed(2)}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default GuestCheckoutForm;
