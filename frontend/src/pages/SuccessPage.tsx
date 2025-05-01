import { useLocation } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const SuccessPage = () => {
  const location = useLocation();
  const response = location.state; // Get the response from location state

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="h-12 w-12 text-green-500" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Success!</h2>
        <p className="text-gray-600 mb-4">
          Your job assessment questions are being generated. You'll be notified when they're ready.
        </p>
        {/* You can access the response here and display any relevant info */}
        <div>
          <h3 className="font-medium text-gray-800">Response Data:</h3>
          <pre className="text-sm text-gray-700">{JSON.stringify(response)}</pre>
        </div>
        <Link to="/" className="text-blue-600 hover:underline">Go back to the homepage</Link>
      </div>
    </div>
  );
};

export default SuccessPage;
