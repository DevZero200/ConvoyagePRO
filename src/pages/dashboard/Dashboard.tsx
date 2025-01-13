import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { DashboardHome } from './DashboardHome';
import { TransportsList } from './TransportsList';
import { QuotesList } from './QuotesList';
import { DashboardTracking } from './DashboardTracking';
import { NewOrder } from './NewOrder';
import { DashboardSidebar } from './DashboardSidebar';
import { DashboardHeader } from './DashboardHeader';

export function Dashboard() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="flex h-screen bg-accent">
      <DashboardSidebar 
        isMobileMenuOpen={isMobileMenuOpen} 
        setIsMobileMenuOpen={setIsMobileMenuOpen} 
      />

      <div className="flex-1 flex flex-col">
        <DashboardHeader 
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Routes>
            <Route index element={<DashboardHome />} />
            <Route path="new-order" element={<NewOrder />} />
            <Route path="transports" element={<TransportsList />} />
            <Route path="quotes" element={<QuotesList />} />
            <Route path="tracking" element={<DashboardTracking />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}