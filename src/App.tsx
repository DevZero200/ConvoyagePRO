import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/layout/header';
import { Footer } from './components/layout/footer';
import { Home } from './pages/home';
import { Quote } from './pages/quote';
import { Tracking } from './pages/tracking';
import { Dashboard } from './pages/dashboard/Dashboard';
import { Login } from './pages/login';
import { Register } from './pages/register';
import { PaymentPage } from './pages/payment/PaymentPage';
import { PaymentSuccess } from './pages/payment/PaymentSuccess';
import { PaymentCancel } from './pages/payment/PaymentCancel';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';

function AppContent() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

  return (
    <div className="min-h-screen bg-accent flex flex-col">
      {!isDashboard && <Header />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quote" element={<Quote />} />
          <Route path="/tracking" element={<Tracking />} />
          <Route path="/payment" element={<PaymentPage amount={100} />} />
          <Route path="/payment/success" element={<PaymentSuccess />} />
          <Route path="/payment/cancel" element={<PaymentCancel />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      {!isDashboard && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}