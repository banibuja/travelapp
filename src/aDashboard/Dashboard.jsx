import React, { useEffect, useState } from 'react';
import Menu from './Menu';
import { useNavigate, Outlet } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('');
  const [userCount, setUserCount] = useState(0);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get('http://localhost:5001/user', { withCredentials: true });
        if (response.data && response.data.user) {
          setRole(response.data.user.role);
          setIsLoggedIn(true);
        } else {
          throw new Error('No user data');
        }
      } catch (error) {
        setIsLoggedIn(false);
        navigate('/login');
      }
    };
    checkLoginStatus();
  }, [navigate]);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/users-count', { withCredentials: true });
        setUserCount(response.data.count);
      } catch (error) {
        console.error('Error fetching user count:', error);
      }
    };
    fetchUserCount();
  }, []);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Menu isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      {/* Main Content */}
      <div className={`transition-all duration-300 ${isCollapsed ? 'ml-20' : 'ml-72'}`}>
        {/* Top Bar */}
        <header className="sticky top-0 z-40 backdrop-blur-xl border-b border-gray-200"
          style={{ background: 'rgba(255, 255, 255, 0.9)' }}>
          <div className="px-8 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
              <p className="text-sm text-gray-500">Welcome back! Here's your overview.</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-700">Admin</p>
                <p className="text-xs text-gray-500 capitalize">{role}</p>
              </div>
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                style={{ background: 'linear-gradient(135deg, #f97316, #fb923c)' }}>
                A
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="rounded-2xl p-6 text-white shadow-lg transform hover:scale-105 transition-all duration-300"
              style={{ background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm font-medium">Total Users</p>
                  <p className="text-4xl font-bold mt-2">{userCount}</p>
                </div>
                <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
              </div>
              <p className="text-white/60 text-sm mt-4">Registered clients</p>
            </div>

            <div className="rounded-2xl p-6 text-white shadow-lg transform hover:scale-105 transition-all duration-300"
              style={{ background: 'linear-gradient(135deg, #f97316, #fb923c)' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm font-medium">Packages</p>
                  <p className="text-4xl font-bold mt-2">24</p>
                </div>
                <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
              </div>
              <p className="text-white/60 text-sm mt-4">Active travel packages</p>
            </div>

            <div className="rounded-2xl p-6 text-white shadow-lg transform hover:scale-105 transition-all duration-300"
              style={{ background: 'linear-gradient(135deg, #1e3a5f, #2d5a87)' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm font-medium">Destinations</p>
                  <p className="text-4xl font-bold mt-2">12</p>
                </div>
                <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <p className="text-white/60 text-sm mt-4">Popular destinations</p>
            </div>

            <div className="rounded-2xl p-6 text-white shadow-lg transform hover:scale-105 transition-all duration-300"
              style={{ background: 'linear-gradient(135deg, #10b981, #34d399)' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm font-medium">Bookings</p>
                  <p className="text-4xl font-bold mt-2">156</p>
                </div>
                <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
              </div>
              <p className="text-white/60 text-sm mt-4">This month</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Quick Actions</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Add Package', icon: '📦', to: '/dashboard/AddAranzhmanet', color: '#f97316' },
                  { label: 'Add User', icon: '👤', to: '/dashboard/AddUser', color: '#0ea5e9' },
                  { label: 'Add Country', icon: '🌍', to: '/dashboard/AddShtetin', color: '#1e3a5f' },
                  { label: 'View Logs', icon: '📋', to: '/dashboard/Logs', color: '#10b981' },
                ].map((action, idx) => (
                  <a
                    key={idx}
                    href={action.to}
                    className="flex flex-col items-center p-4 rounded-xl hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-gray-200"
                    style={{ background: `${action.color}10` }}
                  >
                    <span className="text-3xl mb-2">{action.icon}</span>
                    <span className="text-sm font-medium text-gray-700">{action.label}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-4">System Status</h2>
              <div className="space-y-4">
                {[
                  { label: 'Server', status: 'Online', color: '#10b981' },
                  { label: 'Database', status: 'Connected', color: '#10b981' },
                  { label: 'API', status: 'Active', color: '#10b981' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <span className="text-gray-600">{item.label}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ background: item.color }} />
                      <span className="text-sm font-medium" style={{ color: item.color }}>{item.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Outlet for nested routes */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
