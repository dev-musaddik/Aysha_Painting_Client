import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ProtectedRoute from './utils/ProtectedRoute';
import AdminRoute from './utils/AdminRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import OrderHistory from './pages/OrderHistory';
import OrderTracking from './pages/OrderTracking';
import CustomDesign from './pages/CustomDesign';

// Admin Pages
import Dashboard from './pages/admin/Dashboard';
import ProductManagement from './pages/admin/ProductManagement';
import OrderManagement from './pages/admin/OrderManagement';

/**
 * Main App Component with Artistic Effects
 */
function App() {
  useEffect(() => {
    // Custom cursor trail effect
    const cursorTrail = document.createElement('div');
    cursorTrail.className = 'cursor-trail';
    document.body.appendChild(cursorTrail);

    let mouseX = 0;
    let mouseY = 0;
    let trailX = 0;
    let trailY = 0;

    const moveCursor = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animateTrail = () => {
      trailX += (mouseX - trailX) * 0.1;
      trailY += (mouseY - trailY) * 0.1;
      
      cursorTrail.style.left = trailX - 20 + 'px';
      cursorTrail.style.top = trailY - 20 + 'px';
      
      requestAnimationFrame(animateTrail);
    };

    document.addEventListener('mousemove', moveCursor);
    animateTrail();

    // Click ripple effect
    const createRipple = (e) => {
      const ripple = document.createElement('div');
      ripple.className = 'ripple';
      ripple.style.left = e.clientX - 10 + 'px';
      ripple.style.top = e.clientY - 10 + 'px';
      document.body.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    };

    document.addEventListener('click', createRipple);

    // Sparkle effect on hover over buttons
    const addSparkles = (e) => {
      if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = e.clientX + (Math.random() - 0.5) * 20 + 'px';
        sparkle.style.top = e.clientY + (Math.random() - 0.5) * 20 + 'px';
        document.body.appendChild(sparkle);

        setTimeout(() => {
          sparkle.remove();
        }, 1500);
      }
    };

    document.addEventListener('mousemove', addSparkles);

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('click', createRipple);
      document.removeEventListener('mousemove', addSparkles);
      cursorTrail.remove();
    };
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/custom-design" element={<CustomDesign />} />

            {/* Protected Routes */}
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <OrderHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/track/:orderId"
              element={
                <ProtectedRoute>
                  <OrderTracking />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <AdminRoute>
                  <Dashboard />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/products"
              element={
                <AdminRoute>
                  <ProductManagement />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/orders"
              element={
                <AdminRoute>
                  <OrderManagement />
                </AdminRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
