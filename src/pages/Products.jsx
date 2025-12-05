import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, setFilters } from '../redux/slices/productSlice';
import ProductCard from '../components/product/ProductCard';
import Spinner from '../components/common/Spinner';
import Button from '../components/common/Button';

/**
 * Products Page
 * Product listing with category filter and search
 */
const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { products, loading, filters } = useSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { value: '', label: 'All Products' },
    { value: 'photo-print', label: 'Photo Prints' },
    { value: 'canvas', label: 'Canvas' },
    { value: 'poster', label: 'Posters' },
    { value: 'mug', label: 'Mugs' },
    { value: 'frame', label: 'Frames' },
    { value: 'other', label: 'Other' },
  ];

  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      dispatch(setFilters({ category }));
    }
  }, [searchParams, dispatch]);

  useEffect(() => {
    dispatch(fetchProducts(filters));
  }, [dispatch, filters]);

  const handleCategoryChange = (category) => {
    dispatch(setFilters({ category: category || null }));
    if (category) {
      setSearchParams({ category });
    } else {
      setSearchParams({});
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setFilters({ search: searchTerm }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Products</h1>
          <p className="text-gray-600 text-lg">
            Browse our collection of customizable printing products
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          {/* Search */}
          <form onSubmit={handleSearch} className="mb-6">
            <div className="flex gap-2">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <Button type="submit" variant="primary">
                Search
              </Button>
            </div>
          </form>

          {/* Category Filter */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => handleCategoryChange(cat.value)}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    filters.category === cat.value || (!filters.category && !cat.value)
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Spinner size="lg" />
          </div>
        ) : products.length > 0 ? (
          <>
            <div className="mb-4 text-gray-600">
              Showing {products.length} product{products.length !== 1 ? 's' : ''}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No Products Found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your filters or search term
            </p>
            <Button onClick={() => {
              dispatch(setFilters({ category: null, search: '' }));
              setSearchTerm('');
              setSearchParams({});
            }}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
