import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './components/Home';
import Login from './User/Login';
import Register from './User/Register';
import UserDashboard from './User/UserDashboard';
import AdminDashboard from './User/AdminDashboard';
import AdminUsers from './User/AdminUsers';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import PaymentCart from './pages/payment/PaymentCart';
import PendingApproval from './pages/payment/PendingApproval'; // Add this import
import PaymentApproval from './pages/admin/PaymentApproval'; // Add this import
import Feedback from './pages/feedback/feedback';
import Managefeedback from './pages/feedback/managefeedback';
import Feedbackview from './pages/feedback/feedbackview';

// Import Event Components
import CreateEvent from './Events/CreateEvent';
import MyEvents from './Events/MyEvents';
import AdminEvents from './Events/AdminEvents';
import EventDetail from './Events/EventDetail';
import BrowseEvents from './Events/BrowseEvents';
import EventRegistration from './Events/EventRegistration';

const App = () => {
  const location = useLocation();
  const hideHeader = ['/admin-dashboard', '/admin/events', '/admin/users', '/admin/approvals'].includes(location.pathname);

  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        {!hideHeader && <Header />}
        <main className="flex-grow">
          <Routes>
            {/* Public routes */}
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/payment' element={<PaymentCart />} />
            <Route path='/pending-approval' element={<PendingApproval />} /> {/* Add this route */}
            <Route path='/events' element={<BrowseEvents />} />
            <Route path='/events/:id' element={<EventDetail />} /> {/* Make sure this is outside of ProtectedRoute */}
            { <Route path='/feedback' element={<Feedback />} /> }
            { <Route path='/managefeedback' element={<Managefeedback />} /> }
            { <Route path='/feedbackview' element={<Feedbackview />} /> }

            {/* User routes */}
            <Route element={<ProtectedRoute />}>
              <Route path='/dashboard' element={<UserDashboard />} />
              <Route path='/create-event' element={<CreateEvent />} />
              <Route path='/my-events' element={<MyEvents />} />
              <Route path='/events/:id/edit' element={<CreateEvent />} />
              <Route path="/events/:id/register" element={<EventRegistration />} />
            </Route>
            
            {/* Admin routes */}
            <Route element={<ProtectedRoute adminOnly={true} />}>
              <Route path='/admin-dashboard' element={<AdminDashboard />} />
              <Route path='/admin/users' element={<AdminUsers />} />
              <Route path='/admin/events' element={<AdminEvents />} />
              <Route path='/admin/approvals' element={<PaymentApproval />} /> {/* Update this route */}
              <Route path='/admin/events/:id' element={<EventDetail />} />
            </Route>
          </Routes>
        </main>
      </div>
    </AuthProvider>
  );
};

export default App;
