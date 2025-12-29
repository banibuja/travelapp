import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || 'pk_test_51Q...');

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const [packageData, setPackageData] = useState(null);

  useEffect(() => {
    // Get user info
    const checkUser = async () => {
      try {
        const response = await axios.get('http://localhost:5001/user', { withCredentials: true });
        if (response.status === 200) {
          setUserId(response.data.user.id);
        } else {
          navigate('/login', { state: { from: location.pathname } });
        }
      } catch (error) {
        navigate('/login', { state: { from: location.pathname } });
      }
    };

    // Get package data from location state
    if (location.state && location.state.packageData) {
      setPackageData(location.state.packageData);
    } else {
      // If no package data, redirect back
      navigate('/');
    }

    checkUser();
  }, [navigate, location]);

  const handlePayment = async () => {
    if (!userId || !packageData) {
      setError('Missing user or package information');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Remove imageBase64 from packageData before sending to reduce request size
      // The image will be fetched from database in backend if needed
      const { imageBase64, ...packageDataWithoutImage } = packageData;
      
      // Create checkout session
      const response = await axios.post(
        'http://localhost:5001/api/create-checkout-session',
        {
          userId,
          aranzhmaniId: packageData.id || null,
          packageDetails: packageDataWithoutImage,
        },
        { withCredentials: true }
      );

      const { sessionId, url } = response.data;

      // Redirect to Stripe Checkout using the URL directly
      if (url) {
        window.location.href = url;
      } else if (sessionId) {
        // Fallback to redirectToCheckout if URL is not provided
        const stripe = await stripePromise;
        const { error: stripeError } = await stripe.redirectToCheckout({
          sessionId,
        });

        if (stripeError) {
          setError(stripeError.message);
          setLoading(false);
        }
      } else {
        setError('No checkout URL or session ID received');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      const errorMessage = error.response?.data?.error || error.response?.data?.message || error.message || 'Failed to create payment session';
      setError(errorMessage);
      setLoading(false);
    }
  };

  if (!packageData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No package information found</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Complete Your Payment</h1>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                {error}
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-8">
              {/* Package Summary */}
              <div>
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Package Details</h2>
                <div className="space-y-4">
                  {packageData.imageBase64 && (
                    <img
                      src={`data:image/jpeg;base64,${packageData.imageBase64}`}
                      alt={packageData.titulli}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  )}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{packageData.titulli}</h3>
                    <p className="text-gray-600">{packageData.shteti}</p>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><strong>Travelers:</strong> {packageData.nrPersonave} Adults</p>
                    <p><strong>Nights:</strong> {packageData.nrNeteve} Nights</p>
                    <p><strong>Room Type:</strong> {packageData.llojiDhomes}</p>
                    <p><strong>Service:</strong> {packageData.sherbimi}</p>
                    {packageData.airport && (
                      <p><strong>Airport:</strong> {packageData.airport}</p>
                    )}
                    {packageData.busStation && (
                      <p><strong>Bus Station:</strong> {packageData.busStation}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Payment Summary */}
              <div>
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Payment Summary</h2>
                <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Package Price</span>
                    <span className="font-semibold">€{packageData.cmimi}.00</span>
                  </div>
                  <div className="border-t pt-4 flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>€{packageData.cmimi}.00</span>
                  </div>
                </div>

                <button
                  onClick={handlePayment}
                  disabled={loading}
                  className="w-full mt-6 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? 'Processing...' : 'Proceed to Payment'}
                </button>

                <p className="mt-4 text-xs text-gray-500 text-center">
                  Secure payment powered by Stripe
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;

