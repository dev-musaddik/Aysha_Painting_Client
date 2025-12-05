import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/slices/productSlice';
import { addToCart } from '../redux/slices/cartSlice';
import ImageUploader from '../components/preview/ImageUploader';
import MockupCanvas from '../components/preview/MockupCanvas';
import Button from '../components/common/Button';
import api from '../redux/api/apiService';

/**
 * CustomDesign Page
 * Upload image and preview on product mockups
 */
const CustomDesign = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.auth);

  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [mockupType, setMockupType] = useState('t-shirt');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [imagePosition, setImagePosition] = useState({ x: 150, y: 150 });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts({ customizable: true }));
  }, [dispatch]);

  useEffect(() => {
    if (products.length > 0 && !selectedProduct) {
      setSelectedProduct(products[0]);
      setMockupType(products[0].category || 't-shirt');
    }
  }, [products, selectedProduct]);

  const handleImageUpload = (file, preview) => {
    setUploadedFile(file);
    setUploadedImage(preview);
  };

  const handleProductChange = (product) => {
    setSelectedProduct(product);
    setMockupType(product.category || 't-shirt');
  };

  const handleAddToCart = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!uploadedFile || !selectedProduct) {
      alert('Please select a product and upload an image');
      return;
    }

    setUploading(true);

    try {
      // Upload image to server
      const formData = new FormData();
      formData.append('image', uploadedFile);

      const { data } = await api.post('/api/upload/user', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Add to cart with custom design
      dispatch(
        addToCart({
          productId: selectedProduct._id,
          quantity: 1,
          customDesign: {
            imageUrl: data.imageUrl,
            position: imagePosition,
          },
        })
      );

      navigate('/cart');
    } catch (error) {
      alert('Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Create Custom Design</h1>
          <p className="text-gray-600 text-lg">
            Upload your image and see it on your chosen product
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Upload and Product Selection */}
          <div className="space-y-6">
            {/* Image Upload */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Upload Your Design</h2>
              <ImageUploader
                onImageUpload={handleImageUpload}
                currentImage={uploadedImage}
              />
            </div>

            {/* Product Selection */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Select Product</h2>
              <div className="grid grid-cols-2 gap-4">
                {products.filter(p => p.customizable).map((product) => (
                  <button
                    key={product._id}
                    onClick={() => handleProductChange(product)}
                    className={`p-4 border-2 rounded-lg transition ${
                      selectedProduct?._id === product._id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <img
                      src={product.images?.[0] || '/placeholder-product.jpg'}
                      alt={product.name}
                      className="w-full h-32 object-cover rounded-lg mb-2"
                    />
                    <p className="font-medium text-gray-900 text-sm">{product.name}</p>
                    <p className="text-primary-600 font-bold">${product.basePrice.toFixed(2)}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Preview */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Preview</h2>
              <MockupCanvas
                mockupType={mockupType}
                uploadedImage={uploadedImage}
                onPositionChange={setImagePosition}
              />
            </div>

            {/* Add to Cart */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Ready to Order?</h3>
              {selectedProduct && (
                <div className="mb-4">
                  <p className="text-gray-700 mb-2">
                    <span className="font-medium">Product:</span> {selectedProduct.name}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${selectedProduct.basePrice.toFixed(2)}
                  </p>
                </div>
              )}
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={handleAddToCart}
                disabled={!uploadedImage || !selectedProduct}
                loading={uploading}
              >
                Add to Cart
              </Button>
              {!uploadedImage && (
                <p className="text-sm text-gray-500 mt-2 text-center">
                  Please upload an image to continue
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomDesign;
