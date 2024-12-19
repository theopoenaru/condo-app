import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Inbox, Mail, LayoutDashboard, Settings } from 'lucide-react';
import Layout from './components/Layout';
import DashboardPage from './pages/Dashboard';
import InboxPage from './pages/Inbox';
import FeedPage from './pages/Feed';
import AdminPage from './pages/Admin';
import { Toaster } from '@/components/ui/toaster';

export const navigationItems = [
  { name: 'Inbox', path: '/inbox', icon: Inbox },
  { name: 'Feed', path: '/feed', icon: Mail },
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Admin', path: '/admin', icon: Settings },
];

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/inbox" replace />} />
          <Route path="inbox" element={<InboxPage />} />
          <Route path="feed" element={<FeedPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="admin" element={<AdminPage />} />
        </Route>
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;