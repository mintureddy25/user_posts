export default function Login() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const handleFacebookLogin = () => {
    window.location.href = `${apiUrl}/auth/facebook`;
  };

  const handleGoogleLogin = () => {
    window.location.href = `${apiUrl}/auth/google`;
  };

  return (
    <div className="relative bg-gray-900">
      <div className="relative h-screen overflow-hidden bg-indigo-600">
        <img
          alt="Background"
          src="https://images.unsplash.com/photo-1525130413817-d45c1d127c42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1920&q=60&blend=6366F1&sat=-100&blend-mode=multiply"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>

      <div className="absolute inset-0 flex items-center justify-center py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-3xl w-full p-8">
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center">
            Start Your Journey! Sign In Now
          </p>
    
          <div className="mt-8 flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 justify-center">
            {/* Google Login Button */}
            <button 
              onClick={handleGoogleLogin} 
              className="flex items-center bg-white border border-gray-300 rounded-lg shadow-md max-w-xs px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 w-full sm:w-auto justify-center"
            >
              <svg
                className="h-6 w-6 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="-0.5 0 48 48"
              >
                <g fill="none" fillRule="evenodd">
                  <path
                    fill="#FBBC05"
                    d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                  />
                  <path
                    fill="#EB4335"
                    d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                  />
                  <path
                    fill="#34A853"
                    d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                  />
                  <path
                    fill="#4285F4"
                    d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                  />
                </g>
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* Facebook Login Button */}
            <button 
  onClick={handleFacebookLogin} 
  className="flex items-center bg-white border border-gray-300 rounded-lg shadow-md max-w-xs px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 w-full sm:w-auto justify-center"
>
  <svg
    className="h-6 w-6 mr-2"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M22.675 0H1.325C0.59 0 0 0.59 0 1.325v21.351C0 23.41 0.59 24 1.325 24h11.494v-9.294H9.799v-3.622h3.02V8.411c0-3.008 1.788-4.684 4.54-4.684 1.318 0 2.684.246 2.684.246v2.96h-1.511c-1.486 0-1.961.921-1.961 1.857v2.335h3.33l-0.533 3.622h-2.797V24h5.493c.735 0 1.325-.59 1.325-1.325V1.325C24 .59 23.41 0 22.675 0z"
      fill="#4460A0"
    />
  </svg>
  <span>Continue with Facebook</span>
</button>

          </div>
        </div>
      </div>
    </div>
  );
}
