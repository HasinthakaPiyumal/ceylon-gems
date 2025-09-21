import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { Provider } from "react-redux"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { store } from "@/store"
import { CartProvider } from "@/context/CartContext"
import AuthProvider from "@/context/AuthProvider"
import Cart from "@/components/Cart"
import Login from "@/pages/Login"
import Signup from "@/pages/Signup"
import Home from "@/pages/Home"
import Shop from "@/pages/Shop"
import About from "@/pages/About"
import Contact from "@/pages/Contact"
import CustomOrder from "@/pages/CustomOrder"
import ProductDetails from "@/pages/ProductDetails"
import AccessDenied from "@/pages/AccessDenied"

// Admin Pages
import AdminDashboard from "@/admin/pages/Dashboard"
import AdminProducts from "@/admin/pages/Products"
import AdminOrders from "@/admin/pages/Orders"
import AdminCustomers from "@/admin/pages/Customers"
import AdminAnalytics from "@/admin/pages/Analytics"
import AdminSettings from "@/admin/pages/Settings"
import ProtectedRoute from "@/components/ProtectedRoute"
import AdminRoute from "@/components/AdminRoute"
import GemsAdmin from "@/pages/GemsAdmin"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <AuthProvider>
            <Router>
              <Cart />
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/home" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/gems/:id" element={<ProductDetails />} />
                <Route path="/custom" element={<CustomOrder />} />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <div>Profile Page</div>
                  </ProtectedRoute>
                } />
                <Route path="/cart" element={
                  <ProtectedRoute>
                    <div>Profile Page</div>
                  </ProtectedRoute>
                } />
                <Route path="/access-denied" element={<AccessDenied />} />
                {/* Admin Routes - Restricted to users with ADMIN role */}
                <Route path="/admin" element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                } />
                <Route path="/admin/products" element={
                  <AdminRoute>
                    <AdminProducts />
                  </AdminRoute>
                } />
                <Route path="/admin/gems" element={
                  <AdminRoute>
                    <GemsAdmin />
                  </AdminRoute>
                } />
                <Route path="/admin/orders" element={
                  <AdminRoute>
                    <AdminOrders />
                  </AdminRoute>
                } />
                <Route path="/admin/customers" element={
                  <AdminRoute>
                    <AdminCustomers />
                  </AdminRoute>
                } />
                <Route path="/admin/analytics" element={
                  <AdminRoute>
                    <AdminAnalytics />
                  </AdminRoute>
                } />
                <Route path="/admin/settings" element={
                  <AdminRoute>
                    <AdminSettings />
                  </AdminRoute>
                } />
                <Route path="/" element={<Navigate to="/home" replace />} />
                <Route path="*" element={<Navigate to="/home" replace />} />
              </Routes>
            </Router>
          </AuthProvider>
        </CartProvider>
      </QueryClientProvider>
    </Provider>
  )
}

export default App