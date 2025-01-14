import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/layout/header';
import { Footer } from './components/layout/footer';
import { Home } from './pages/Home';
import { Quote } from './pages/Quote';
import { Tracking } from './pages/Tracking';
import { Dashboard } from './pages/dashboard/Dashboard';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
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
          {/* Routes principales */}
          <Route path="/" element={<Home />} />
          <Route path="/quote" element={<Quote />} />
          <Route path="/tracking" element={<Tracking />} />
          
          {/* Routes de paiement */}
          <Route path="/payment/success" element={<PaymentSuccess />} />
          <Route path="/payment/cancel" element={<PaymentCancel />} />
          
          {/* Routes d'authentification */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Dashboard protégé */}
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

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;