import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import AdminSidebar from './AdminSidebar';

const AdminDashboard = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [stats, setStats] = useState({
    eventCount: 0,
    userCount: 0,
    attendeeCount: 0,
    pendingPayments: 0
  });
  const [loading, setLoading] = useState(true);
  const [pendingPayments, setPendingPayments] = useState([]);

  useEffect(() => {
    fetchStats();
    fetchPendingPayments();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5001/api/admin/stats', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setStats(res.data);
    } catch (error) {
      console.error('Error fetching admin stats:', error);
      enqueueSnackbar('Failed to load statistics', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const fetchPendingPayments = async () => {
    try {
      // This would be a real API call in production:
      // const token = localStorage.getItem('token');
      // const res = await axios.get('http://localhost:5001/api/admin/pending-payments', {
      //   headers: { Authorization: `Bearer ${token}` }
      // });
      // setPendingPayments(res.data.payments);
      
      // For now using mock data
      setTimeout(() => {
        setPendingPayments([
          {
            id: 'pay_123456',
            amount: 1500,
            cardHolder: 'John Doe',
            timestamp: '2023-07-15T14:30:00Z',
            event: {
              id: 'evt_1',
              name: 'Tech Conference 2023'
            },
            user: {
              id: 'usr_1',
              name: 'John Doe',
              email: 'john@example.com'
            }
          },
          {
            id: 'pay_123457',
            amount: 2500,
            cardHolder: 'Jane Smith',
            timestamp: '2023-07-16T10:15:00Z',
            event: {
              id: 'evt_2',
              name: 'Music Festival'
            },
            user: {
              id: 'usr_2',
              name: 'Jane Smith',
              email: 'jane@example.com'
            }
          }
        ]);
      }, 1000);
    } catch (error) {
      console.error('Error fetching pending payments:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex">
        <AdminSidebar />
        <div className="flex-1 p-10">
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Admin Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Events</p>
                <p className="text-xl font-bold">{stats.eventCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600">Registered Users</p>
                <p className="text-xl font-bold">{stats.userCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Attendees</p>
                <p className="text-xl font-bold">{stats.attendeeCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600">Pending Payments</p>
                <p className="text-xl font-bold">{pendingPayments.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pending Payments Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Pending Payment Approvals</h2>
            <Link to="/admin/approvals" className="text-blue-600 hover:text-blue-800 font-medium text-sm">
              View All
            </Link>
          </div>

          {pendingPayments.length === 0 ? (
            <p className="text-gray-600">No pending payments to approve.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Event
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {pendingPayments.slice(0, 5).map((payment) => (
                    <tr key={payment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{payment.user.name}</div>
                        <div className="text-sm text-gray-500">{payment.user.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{payment.event.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">LKR {payment.amount.toFixed(2)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(payment.timestamp).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Other dashboard components */}
      </div>
    </div>
  );
};

export default AdminDashboard;
