import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminSidebar = () => {
  const { logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'bg-blue-700' : '';
  };

  return (
    <div className="bg-blue-800 text-white w-64 min-h-screen p-4">
      <div className="text-2xl font-bold mb-8 text-center">Admin Portal</div>
      <nav>
        <ul className="space-y-2">
          <li>
            <Link 
              to="/admin-dashboard" 
              className={`block px-4 py-2 rounded-md hover:bg-blue-700 ${isActive('/admin-dashboard')}`}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link 
              to="/admin/users" 
              className={`block px-4 py-2 rounded-md hover:bg-blue-700 ${isActive('/admin/users')}`}
            >
              Manage Users
            </Link>
          </li>
          <li>
            <Link 
              to="/admin/events" 
              className={`block px-4 py-2 rounded-md hover:bg-blue-700 ${isActive('/admin/events')}`}
            >
              Manage Events
            </Link>
          </li>
          <li>
            <Link 
              to="/admin/approvals" 
              className={`block px-4 py-2 rounded-md hover:bg-blue-700 ${isActive('/admin/approvals')}`}
            >
              Payment Approvals
            </Link>
          </li>
          <li>
            <Link 
              to="/managefeedback" 
              className={`block px-4 py-2 rounded-md hover:bg-blue-700 ${isActive('/managefeedback')}`}
            >
              Manage Feedback
            </Link>
          </li>
          <li>
            <button 
              onClick={logout}
              className="block w-full text-left px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminSidebar;
