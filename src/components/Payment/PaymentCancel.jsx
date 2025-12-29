import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const PaymentCancel = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const purchaseId = searchParams.get('purchase_id');

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Cancelled</h2>
        <p className="text-gray-600 mb-4">
          Your payment was cancelled. No charges were made.
        </p>
        {purchaseId && (
          <p className="text-sm text-gray-500 mb-4">Purchase ID: {purchaseId}</p>
        )}
        <div className="space-y-2">
          <button
            onClick={() => navigate('/')}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700"
          >
            Return to Home
          </button>
          <button
            onClick={() => navigate(-1)}
            className="w-full bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;

