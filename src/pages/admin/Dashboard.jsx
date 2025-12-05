import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../redux/api/apiService';
import { useLanguage } from '../../i18n/LanguageContext';
import Spinner from '../../components/common/Spinner';
import { FiPackage, FiShoppingBag, FiUsers, FiDollarSign, FiExternalLink } from 'react-icons/fi';

/**
 * Admin Dashboard Page
 * Overview with analytics and quick stats
 */
const Dashboard = () => {
  const { t } = useLanguage();
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [ordersRes, productsRes, userStatsRes] = await Promise.all([
        api.get('/api/orders/admin/all'),
        api.get('/api/products'),
        api.get('/api/auth/admin/stats'),
      ]);

      setStats({
        totalProducts: productsRes.data.count || 0,
        totalOrders: ordersRes.data.count || 0,
        totalRevenue: ordersRes.data.totalRevenue || 0,
        totalUsers: userStatsRes.data.totalUsers || 0,
      });
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: t('totalProducts'),
      value: stats.totalProducts,
      icon: <FiPackage className="w-8 h-8" />,
      color: 'bg-blue-500',
      link: '/admin/products',
    },
    {
      title: t('totalOrders'),
      value: stats.totalOrders,
      icon: <FiShoppingBag className="w-8 h-8" />,
      color: 'bg-green-500',
      link: '/admin/orders',
    },
    {
      title: t('totalRevenue'),
      value: `$${stats.totalRevenue.toFixed(2)}`,
      icon: <FiDollarSign className="w-8 h-8" />,
      color: 'bg-purple-500',
      link: '/admin/orders',
    },
    {
      title: t('totalUsers'),
      value: stats.totalUsers,
      icon: <FiUsers className="w-8 h-8" />,
      color: 'bg-orange-500',
      link: '/admin/users',
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">{t('adminDashboard')}</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <Link
              key={index}
              to={stat.link}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`${stat.color} text-white p-4 rounded-lg`}>
                  {stat.icon}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('quickActions')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              to="/admin/products"
              className="p-4 border-2 border-primary-500 rounded-lg hover:bg-primary-50 transition text-center"
            >
              <FiPackage className="w-8 h-8 mx-auto mb-2 text-primary-600" />
              <p className="font-medium text-gray-900">{t('manageProducts')}</p>
            </Link>
            <Link
              to="/admin/orders"
              className="p-4 border-2 border-green-500 rounded-lg hover:bg-green-50 transition text-center"
            >
              <FiShoppingBag className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <p className="font-medium text-gray-900">{t('manageOrders')}</p>
            </Link>
            <Link
              to="/admin/users"
              className="p-4 border-2 border-orange-500 rounded-lg hover:bg-orange-50 transition text-center"
            >
              <FiUsers className="w-8 h-8 mx-auto mb-2 text-orange-600" />
              <p className="font-medium text-gray-900">{t('manageUsers')}</p>
            </Link>
            <Link
              to="/admin/landing-pages"
              className="p-4 border-2 border-purple-500 rounded-lg hover:bg-purple-50 transition text-center"
            >
              <FiExternalLink className="w-8 h-8 mx-auto mb-2 text-purple-600" />
              <p className="font-medium text-gray-900">Landing Pages</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
