const RegistrationSuccess = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md p-8 mx-4 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-main">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="w-10 h-10 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path 
                  fillRule="evenodd" 
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                  clipRule="evenodd" 
                />
              </svg>
            </div>
          </div>
          
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            Registration Successful!
          </h2>
          
          <div className="space-y-3">
            <p className="text-gray-600">
              Thank you for registering with SaveDirectly. Your account credentials will be sent to your email address shortly.
            </p>
            
            <p className="text-sm text-gray-500">
              Please check your inbox (and spam folder) for login credentials and further instructions.
            </p>
          </div>

          <button 
            className="w-full px-4 py-2 mt-8 text-white transition-colors rounded-md md:w-1/2 bg-main hover:bg-orange-500"
            onClick={() => window.location.href = '/'}
          >
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationSuccess;
