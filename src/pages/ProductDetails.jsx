import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById, clearSelectedProduct } from '../redux/slices/productSlice';
import { addToCart } from '../redux/slices/cartSlice';
import Button from '../components/common/Button';
import Spinner from '../components/common/Spinner';
import { FiShoppingCart, FiCheck } from 'react-icons/fi';

/**
 * ProductDetails Page
 * Detailed product view with options and add to cart
 */
const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct: product, loading } = useSelector((state) => state.products);
  
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    dispatch(fetchProductById(id));
    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes?.[0] || '');
      setSelectedColor(product.colors?.[0] || '');
      setSelectedMaterial(product.materials?.[0] || '');
    }
  }, [product]);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        productId: product._id,
        quantity,
        size: selectedSize,
        color: selectedColor,
        material: selectedMaterial,
      })
    );
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <Link to="/products">
            <Button>Back to Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div>
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-4">
              <img
                src={product.images?.[0] || '/placeholder-product.jpg'}
                alt={product.name}
                className="w-full h-96 object-cover"
              />
            </div>
            {product.images?.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.slice(1, 5).map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`${product.name} ${index + 2}`}
                    className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-75 transition"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-4">
              <p className="text-primary-600 font-medium mb-2 capitalize">
                {product.category?.replace('-', ' ')}
              </p>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
              <p className="text-3xl font-bold text-gray-900 mb-4">
                ${product.basePrice?.toFixed(2)}
              </p>
              {product.stock > 0 ? (
                <p className="text-green-600 font-medium">In Stock ({product.stock} available)</p>
              ) : (
                <p className="text-red-600 font-medium">Out of Stock</p>
              )}
            </div>

            <div className="border-t border-b border-gray-200 py-6 mb-6">
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Options */}
            <div className="space-y-6 mb-8">
              {/* Size */}
              {product.sizes?.length > 0 && (
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Size
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 border rounded-lg font-medium transition ${
                          selectedSize === size
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color */}
              {product.colors?.length > 0 && (
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Color
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 border rounded-lg font-medium transition ${
                          selectedColor === color
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Material */}
              {product.materials?.length > 0 && (
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Material
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.materials.map((material) => (
                      <button
                        key={material}
                        onClick={() => setSelectedMaterial(material)}
                        className={`px-4 py-2 border rounded-lg font-medium transition ${
                          selectedMaterial === material
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {material}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Quantity
                </label>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                  >
                    -
                  </button>
                  <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={handleAddToCart}
                disabled={product.stock === 0 || addedToCart}
                className="flex items-center justify-center space-x-2"
              >
                {addedToCart ? (
                  <>
                    <FiCheck className="w-5 h-5" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <FiShoppingCart className="w-5 h-5" />
                    <span>Add to Cart</span>
                  </>
                )}
              </Button>

              {product.customizable && (
                <Link to="/custom-design">
                  <Button variant="outline" size="lg" fullWidth>
                    Customize This Product
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
