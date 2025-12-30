import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Menu from '../Menu';

function PurchaseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [purchase, setPurchase] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const [showRefundModal, setShowRefundModal] = useState(false);

  useEffect(() => {
    fetchPurchaseDetails();
  }, [id]);

  const fetchPurchaseDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5001/api/purchase/${id}`, { withCredentials: true });
      setPurchase(response.data);
    } catch (error) {
      console.error('Error fetching purchase details:', error);
      setError('Failed to load purchase details.');
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
      refunded: 'bg-orange-100 text-orange-800 border-orange-200',
    };
    return statusColors[status] || statusColors.pending;
  };

  const handleApprove = async () => {
    try {
      await axios.put(`http://localhost:5001/api/purchases/${id}/approve`, {}, { withCredentials: true });
      fetchPurchaseDetails();
    } catch (error) {
      console.error('Error approving purchase:', error);
      setError('Failed to approve purchase.');
    }
  };

  const handleReject = async () => {
    try {
      await axios.put(`http://localhost:5001/api/purchases/${id}/reject`, {}, { withCredentials: true });
      setMessage('Purchase rejected successfully!');
      fetchPurchaseDetails();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error rejecting purchase:', error);
      setMessage('Failed to reject purchase.');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleRefund = async () => {
    try {
      const response = await axios.put(`http://localhost:5001/api/purchases/${id}/refund`, {}, { withCredentials: true });
      setMessage('Refund processed successfully!');
      setShowRefundModal(false);
      fetchPurchaseDetails();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error refunding purchase:', error);
      const errorMessage = error.response?.data?.error || 'Failed to process refund.';
      setMessage(errorMessage);
      setShowRefundModal(false);
      setTimeout(() => setMessage(''), 5000);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const parsePackageDetails = (packageDetails) => {
    try {
      return typeof packageDetails === 'string' ? JSON.parse(packageDetails) : packageDetails;
    } catch {
      return {};
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Menu isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        <div className={`transition-all duration-300 ${isCollapsed ? 'ml-20' : 'ml-72'} p-8`}>
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500"></div>
              <p className="mt-4 text-gray-500">Loading purchase details...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !purchase) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Menu isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        <div className={`transition-all duration-300 ${isCollapsed ? 'ml-20' : 'ml-72'} p-8`}>
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12">
            <div className="text-center">
              <p className="text-red-600 mb-4">{error || 'Purchase not found'}</p>
              <button
                onClick={() => navigate('/dashboard/purchases')}
                className="px-6 py-2 rounded-xl text-white font-semibold"
                style={{ background: 'linear-gradient(135deg, #0ea5e9, #38bdf8)' }}
              >
                Back to Purchases
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const packageDetails = parsePackageDetails(purchase.packageDetails);

  return (
    <div className="min-h-screen bg-gray-50">
      <Menu isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div className={`transition-all duration-300 ${isCollapsed ? 'ml-20' : 'ml-72'} p-8`}>
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="px-8 py-6" style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #2d5a87 100%)' }}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => navigate('/dashboard/purchases')}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                </button>
                <div>
                  <h2 className="text-2xl font-bold text-white">Purchase Details</h2>
                  <p className="text-cyan-200 text-sm">Purchase ID: #{purchase.id}</p>
                </div>
              </div>
              <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${getStatusBadge(purchase.status)}`}>
                {purchase.status.toUpperCase()}
              </span>
            </div>
          </div>

          {message && (
            <div className={`mx-8 mt-6 p-4 rounded-xl text-center font-medium ${message.includes('Error') || message.includes('Failed') 
              ? 'bg-red-50 text-red-600 border border-red-200'
              : 'bg-green-50 text-green-600 border border-green-200'
              }`}>
              {message}
            </div>
          )}

          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Purchase Information */}
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Purchase Information</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Purchase ID:</span>
                      <span className="font-semibold text-gray-800">#{purchase.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Amount:</span>
                      <span className="font-semibold text-green-600">€{parseFloat(purchase.amount).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Currency:</span>
                      <span className="font-semibold text-gray-800 uppercase">{purchase.currency}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusBadge(purchase.status)}`}>
                        {purchase.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Admin Approved:</span>
                      {purchase.adminApproved === true ? (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 border border-green-200">
                          ✓ Approved
                        </span>
                      ) : purchase.adminApproved === false ? (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800 border border-red-200">
                          ✗ Rejected
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Payment Method:</span>
                      <span className="font-semibold text-gray-800 capitalize">{purchase.paymentMethod || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Created At:</span>
                      <span className="font-semibold text-gray-800">{formatDate(purchase.createdAt)}</span>
                    </div>
                    {purchase.updatedAt && purchase.updatedAt !== purchase.createdAt && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Updated At:</span>
                        <span className="font-semibold text-gray-800">{formatDate(purchase.updatedAt)}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* User Information */}
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">User Information</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-gray-600">Name:</span>
                      <p className="font-semibold text-gray-800">
                        {purchase.user?.firstName} {purchase.user?.lastName}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-600">Email:</span>
                      <p className="font-semibold text-gray-800">{purchase.user?.email}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Username:</span>
                      <p className="font-semibold text-gray-800">{purchase.user?.username || 'N/A'}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">User ID:</span>
                      <p className="font-semibold text-gray-800">#{purchase.user?.id}</p>
                    </div>
                  </div>
                </div>

                {/* Package Information */}
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Package Information</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-gray-600">Package Title:</span>
                      <p className="font-semibold text-gray-800">
                        {packageDetails.titulli || purchase.aranzhmanet?.titulli || 'N/A'}
                      </p>
                    </div>
                    {packageDetails.shteti && (
                      <div>
                        <span className="text-gray-600">Country:</span>
                        <p className="font-semibold text-gray-800">{packageDetails.shteti}</p>
                      </div>
                    )}
                    {packageDetails.nrPersonave && (
                      <div>
                        <span className="text-gray-600">Travelers:</span>
                        <p className="font-semibold text-gray-800">{packageDetails.nrPersonave} Adults</p>
                      </div>
                    )}
                    {packageDetails.nrNeteve && (
                      <div>
                        <span className="text-gray-600">Nights:</span>
                        <p className="font-semibold text-gray-800">{packageDetails.nrNeteve} Nights</p>
                      </div>
                    )}
                    {packageDetails.data && (
                      <div>
                        <span className="text-gray-600">Date:</span>
                        <p className="font-semibold text-gray-800">{packageDetails.data}</p>
                      </div>
                    )}
                    {purchase.aranzhmaniId && (
                      <div>
                        <span className="text-gray-600">Package ID:</span>
                        <p className="font-semibold text-gray-800">#{purchase.aranzhmaniId}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Admin Actions */}
            <div className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Admin Actions</h3>
              <div className="flex flex-wrap gap-4">
                {(purchase.status === 'pending' || (purchase.status === 'completed' && purchase.adminApproved === null)) && (
                  <>
                    <button
                      onClick={handleApprove}
                      className="px-6 py-3 rounded-xl text-white font-semibold hover:scale-105 transition-transform"
                      style={{ background: 'linear-gradient(135deg, #10b981, #34d399)' }}
                    >
                      ✓ Approve Purchase
                    </button>
                    <button
                      onClick={handleReject}
                      className="px-6 py-3 rounded-xl text-white font-semibold hover:scale-105 transition-transform"
                      style={{ background: 'linear-gradient(135deg, #ef4444, #f87171)' }}
                    >
                      ✗ Reject Purchase
                    </button>
                  </>
                )}
                {(purchase.status === 'completed' || purchase.status === 'refused') && purchase.status !== 'refunded' && purchase.stripePaymentIntentId && (
                  <button
                    onClick={() => setShowRefundModal(true)}
                    className="px-6 py-3 rounded-xl text-white font-semibold hover:scale-105 transition-transform"
                    style={{ background: 'linear-gradient(135deg, #f59e0b, #fbbf24)' }}
                  >
                    💰 Refund Purchase
                  </button>
                )}
                {purchase.status === 'refunded' && (
                  <div className="px-6 py-3 rounded-xl bg-gray-200 text-gray-600 font-semibold">
                    ✓ Already Refunded
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Refund Confirmation Modal */}
      {showRefundModal && purchase && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
            <div className="px-8 py-6" style={{ background: 'linear-gradient(135deg, #f59e0b, #fbbf24)' }}>
              <h2 className="text-2xl font-bold text-white">Confirm Refund</h2>
            </div>
            
            <div className="p-8">
              <div className="mb-6">
                <p className="text-gray-600 mb-4">Are you sure you want to refund this purchase?</p>
                <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-700 font-medium">Refund Amount:</span>
                    <span className="text-3xl font-bold text-orange-600">€{parseFloat(purchase.amount).toFixed(2)}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    This amount will be refunded to the customer's original payment method.
                  </p>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-yellow-800">
                  <strong>Note:</strong> This action cannot be undone. The refund will be processed immediately.
                </p>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => setShowRefundModal(false)}
                  className="flex-1 px-6 py-3 rounded-xl text-gray-700 font-semibold bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRefund}
                  className="flex-1 px-6 py-3 rounded-xl text-white font-semibold hover:scale-105 transition-transform"
                  style={{ background: 'linear-gradient(135deg, #f59e0b, #fbbf24)' }}
                >
                  Confirm Refund
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PurchaseDetails;

