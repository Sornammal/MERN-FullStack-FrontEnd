import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProfilePage from "./pages/ProfilePage";
import { useAuth } from "./context/AuthContext";
import { useEffect } from "react";
import { setAuthToken } from "./client/axios";

// PrivateRoute component
function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function App() {
  const { user } = useAuth();

  useEffect(() => {
    setAuthToken(user?.token);
  }, [user?.token]);


  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Main content */}
      <main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-12 bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Products list page */}
          <Route path="/products" element={<Products />} />

          {/* Product detail page */}
          <Route path="/products/:id" element={<ProductDetail />} />

          <Route path="/cart" element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>

          } />

          <Route
            path="/checkout"
            element={
              <PrivateRoute>
                <Checkout />
              </PrivateRoute>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />

          <Route path="*" element={<h1 className="text-center text-2xl font-bold mt-10">404 - Page Not Found</h1>} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
