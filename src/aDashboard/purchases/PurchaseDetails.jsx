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
      fetchPurchaseDetails();
    } catch (error) {
      console.error('Error rejecting purchase:', error);
      setError('Failed to reject purchase.');
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
            {(purchase.status === 'pending' || (purchase.status === 'completed' && purchase.adminApproved === null)) && (
              <div className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Admin Actions</h3>
                <div className="flex space-x-4">
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
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PurchaseDetails;

