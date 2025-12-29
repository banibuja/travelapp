import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Menu from '../Menu';

function PurchasesTable() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [purchases, setPurchases] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPurchases();
  }, []);

  const fetchPurchases = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5001/api/purchases', { withCredentials: true });
      console.log('Purchases response:', response.data);
      if (response.data && response.data.length > 0) {
        console.log('First purchase user data:', response.data[0].user);
      }
      setPurchases(response.data);
    } catch (error) {
      console.error('Error fetching purchases:', error);
      setMessage('Error loading purchases.');
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      completed: 'bg-green-100 text-green-800 border-green-200',
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      failed: 'bg-red-100 text-red-800 border-red-200',
      cancelled: 'bg-gray-100 text-gray-800 border-gray-200',
      refused: 'bg-red-100 text-red-800 border-red-200',
    };
    return statusColors[status] || statusColors.pending;
  };

  const handleApprove = async (id) => {
    try {
      await axios.put(`http://localhost:5001/api/purchases/${id}/approve`, {}, { withCredentials: true });
      setMessage('Purchase approved successfully!');
      fetchPurchases();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error approving purchase:', error);
      setMessage('Error approving purchase.');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.put(`http://localhost:5001/api/purchases/${id}/reject`, {}, { withCredentials: true });
      setMessage('Purchase rejected successfully!');
      fetchPurchases();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error rejecting purchase:', error);
      setMessage('Error rejecting purchase.');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleViewDetails = (purchaseId) => {
    navigate(`/dashboard/purchases/${purchaseId}`);
  };

  const parsePackageDetails = (packageDetails) => {
    try {
      return typeof packageDetails === 'string' ? JSON.parse(packageDetails) : packageDetails;
    } catch {
      return {};
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Menu isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div className={`transition-all duration-300 ${isCollapsed ? 'ml-20' : 'ml-72'} p-8`}>
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="px-8 py-6" style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #2d5a87 100%)' }}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #10b981, #34d399)' }}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Purchases</h2>
                  <p className="text-cyan-200 text-sm">{purchases.length} total purchases</p>
                </div>
              </div>
            </div>
          </div>

          {message && (
            <div className={`mx-8 mt-6 p-4 rounded-xl text-center font-medium ${message.includes('Error') ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-green-50 text-green-600 border border-green-200'}`}>
              {message}
            </div>
          )}

          <div className="p-8">
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500"></div>
                <p className="mt-4 text-gray-500">Loading purchases...</p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto rounded-xl border border-gray-200">
                  <table className="w-full">
                    <thead>
                      <tr style={{ background: 'linear-gradient(135deg, #f8fafc, #f1f5f9)' }}>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">ID</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">User</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Package</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Amount</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Status</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Admin Approved</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Date</th>
                        <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {purchases.map((purchase) => {
                        const packageDetails = parsePackageDetails(purchase.packageDetails);
                        return (
                          <tr key={purchase.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4">
                              <span className="font-semibold text-gray-800">#{purchase.id}</span>
                            </td>
                            <td className="px-6 py-4">
                              <div>
                                {purchase.user ? (
                                  <>
                                    <p className="font-semibold text-gray-800">
                                      {purchase.user.firstName || purchase.user.username || 'N/A'} {purchase.user.lastName || ''}
                                    </p>
                                    <p className="text-sm text-gray-500">{purchase.user.email || 'N/A'}</p>
                                  </>
                                ) : (
                                  <>
                                    <p className="font-semibold text-gray-800">User ID: #{purchase.userId}</p>
                                    <p className="text-sm text-gray-500">User not found</p>
                                  </>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div>
                                <p className="font-semibold text-gray-800">
                                  {packageDetails.titulli || purchase.aranzhmanet?.titulli || 'N/A'}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {packageDetails.shteti || 'N/A'}
                                </p>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="text-green-600 font-semibold">
                                €{parseFloat(purchase.amount).toFixed(2)}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusBadge(purchase.status)}`}>
                                {purchase.status.toUpperCase()}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              {purchase.adminApproved === true ? (
                                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 border border-green-200">
                                  ✓ Approved
                                </span>
                              ) : purchase.adminApproved === false ? (
                                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800 border border-red-200">
                                  ✗ Rejected
                                </span>
                              ) : (
                                <span className="text-gray-400 text-sm">-</span>
                              )}
                            </td>
                            <td className="px-6 py-4">
                              <span className="text-gray-600 text-sm">{formatDate(purchase.createdAt)}</span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center justify-center space-x-2">
                                <button
                                  onClick={() => handleViewDetails(purchase.id)}
                                  className="px-3 py-1.5 rounded-lg text-white text-sm font-semibold hover:scale-105 transition-transform"
                                  style={{ background: 'linear-gradient(135deg, #0ea5e9, #38bdf8)' }}
                                >
                                  Details
                                </button>
                                {(purchase.status === 'pending' || (purchase.status === 'completed' && purchase.adminApproved === null)) && (
                                  <>
                                    <button
                                      onClick={() => handleApprove(purchase.id)}
                                      className="px-3 py-1.5 rounded-lg text-white text-sm font-semibold hover:scale-105 transition-transform"
                                      style={{ background: 'linear-gradient(135deg, #10b981, #34d399)' }}
                                    >
                                      Approve
                                    </button>
                                    <button
                                      onClick={() => handleReject(purchase.id)}
                                      className="px-3 py-1.5 rounded-lg text-white text-sm font-semibold hover:scale-105 transition-transform"
                                      style={{ background: 'linear-gradient(135deg, #ef4444, #f87171)' }}
                                    >
                                      Reject
                                    </button>
                                  </>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                {purchases.length === 0 && (
                  <div className="text-center py-12">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    <p className="mt-4 text-gray-400 text-lg">No purchases found</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PurchasesTable;

