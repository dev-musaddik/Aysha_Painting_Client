import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteProduct, createProduct, updateProduct } from '../../redux/slices/productSlice';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import Spinner from '../../components/common/Spinner';
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';

/**
 * Product Management Page (Admin)
 * CRUD operations for products
 */
const ProductManagement = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'photo-print',
    basePrice: '',
    stock: '',
    images: [],
    customizable: true,
    featured: false,
  });

  useEffect(() => {
    dispatch(fetchProducts({}));
  }, [dispatch]);

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      category: product.category,
      basePrice: product.basePrice,
      stock: product.stock,
      images: product.images || [],
      customizable: product.customizable,
      featured: product.featured || false,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = {
      ...formData,
      basePrice: parseFloat(formData.basePrice),
      stock: parseInt(formData.stock),
    };

    if (editingProduct) {
      dispatch(updateProduct({ productId: editingProduct._id, productData }));
    } else {
      dispatch(createProduct(productData));
    }

    setIsModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      description: '',
      category: 'photo-print',
      basePrice: '',
      stock: '',
      images: [],
      customizable: true,
      featured: false,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Product Management</h1>
          <Button
            onClick={() => {
              resetForm();
              setIsModalOpen(true);
            }}
            className="flex items-center space-x-2"
          >
            <FiPlus className="w-5 h-5" />
            <span>Add Product</span>
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Spinner size="lg" />
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded object-cover"
                            src={product.images?.[0] || '/placeholder-product.jpg'}
                            alt={product.name}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary-100 text-primary-800 capitalize">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${product.basePrice.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.stock}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEdit(product)}
                        className="text-primary-600 hover:text-primary-900 mr-4"
                      >
                        <FiEdit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <FiTrash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Add/Edit Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            resetForm();
          }}
          title={editingProduct ? 'Edit Product' : 'Add New Product'}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Product Name"
              name="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="photo-print">Photo Print</option>
                <option value="canvas">Canvas</option>
                <option value="poster">Poster</option>
                <option value="mug">Mug</option>
                <option value="frame">Frame</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Base Price"
                type="number"
                step="0.01"
                name="basePrice"
                value={formData.basePrice}
                onChange={(e) => setFormData({ ...formData, basePrice: e.target.value })}
                required
              />

              <Input
                label="Stock"
                type="number"
                name="stock"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                required
              />
            </div>

            {/* Image Upload Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Images
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={async (e) => {
                  const files = Array.from(e.target.files);
                  if (files.length === 0) return;

                  // Show uploading state
                  const uploadingImages = files.map(f => URL.createObjectURL(f));
                  setFormData({ ...formData, uploadingImages });

                  try {
                    const uploadedUrls = [];
                    
                    for (const file of files) {
                      const formDataUpload = new FormData();
                      formDataUpload.append('image', file);

                      const response = await fetch('/api/upload', {
                        method: 'POST',
                        headers: {
                          'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        },
                        body: formDataUpload,
                      });

                      const data = await response.json();
                      if (data.success) {
                        uploadedUrls.push(data.imageUrl);
                      }
                    }

                    setFormData({
                      ...formData,
                      images: [...(formData.images || []), ...uploadedUrls],
                      uploadingImages: null,
                    });
                  } catch (error) {
                    console.error('Upload failed:', error);
                    alert('Failed to upload images');
                    setFormData({ ...formData, uploadingImages: null });
                  }
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                Upload product images (automatically optimized). Large images will be resized.
              </p>
              
              {/* Display uploaded images */}
              {formData.images && formData.images.length > 0 && (
                <div className="mt-3 grid grid-cols-4 gap-2">
                  {formData.images.map((url, index) => (
                    <div key={index} className="relative">
                      <img
                        src={url}
                        alt={`Product ${index + 1}`}
                        className="w-full h-20 object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newImages = formData.images.filter((_, i) => i !== index);
                          setFormData({ ...formData, images: newImages });
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Show uploading state */}
              {formData.uploadingImages && (
                <div className="mt-3">
                  <p className="text-sm text-primary-600">Uploading and optimizing images...</p>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.customizable}
                  onChange={(e) => setFormData({ ...formData, customizable: e.target.checked })}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">Customizable</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">Featured</span>
              </label>
            </div>

            <div className="flex space-x-4 pt-4">
              <Button type="submit" variant="primary" fullWidth>
                {editingProduct ? 'Update Product' : 'Create Product'}
              </Button>
              <Button
                type="button"
                variant="outline"
                fullWidth
                onClick={() => {
                  setIsModalOpen(false);
                  resetForm();
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default ProductManagement;
