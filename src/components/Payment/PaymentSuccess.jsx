import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [verifying, setVerifying] = useState(true);
  const [verified, setVerified] = useState(false);
  const [purchase, setPurchase] = useState(null);

  useEffect(() => {
    const verifyPayment = async () => {
      const sessionId = searchParams.get('session_id');
      const purchaseId = searchParams.get('purchase_id');

      if (!sessionId) {
        setVerifying(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:5001/api/verify-payment?sessionId=${sessionId}`,
          { withCredentials: true }
        );

        if (response.data.status === 'completed') {
          setVerified(true);
          if (purchaseId) {
            const purchaseResponse = await axios.get(
              `http://localhost:5001/api/purchase/${purchaseId}`,
              { withCredentials: true }
            );
            setPurchase(purchaseResponse.data);
          }
        }
      } catch (error) {
        console.error('Error verifying payment:', error);
      } finally {
        setVerifying(false);
      }
    };

    verifyPayment();
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        {verifying ? (
          <>
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Verifying Payment...</h2>
            <p className="text-gray-600">Please wait while we confirm your payment</p>
          </>
        ) : verified ? (
          <>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
            <p className="text-gray-600 mb-4">Your booking has been confirmed</p>
            {purchase && (
              <div className="bg-gray-50 rounded-lg p-4 mb-4 text-left">
                <p className="text-sm text-gray-600">Purchase ID: {purchase.id}</p>
                <p className="text-sm text-gray-600">Amount: €{purchase.amount}</p>
              </div>
            )}
            <button
              onClick={() => navigate('/')}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700"
            >
              Return to Home
            </button>
          </>
        ) : (
          <>
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Status Unknown</h2>
            <p className="text-gray-600 mb-4">We couldn't verify your payment. Please contact support.</p>
            <button
              onClick={() => navigate('/')}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700"
            >
              Return to Home
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;

