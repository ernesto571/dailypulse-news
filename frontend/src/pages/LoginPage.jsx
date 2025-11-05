import { useState } from "react";
import { CheckCircle, User, Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";

function LoginPage() {

  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // ✅ Get functions from store
  const { login, isLoggingIn, googleSignIn, authUser } = useAuthStore();

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Call login function from store
    await login(formData);
    navigate("/")
    
    // Check if user is authenticated after login attempt
    if (authUser) {
      navigate("/");
    }
  } // If login fails, the error will be shown via toast from the store

  return (
    <div className="h-screen bg-gray-100 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 h-[90%]">
        {/* Left Side */}
        <section className=" items-center justify-center px-8 hidden lg:flex">
          <div className="max-w-md w-full">
            <h1 className="text-5xl font-bold text-gray-800">DailyPulse</h1>

            <h3 className="text-2xl font-semibold my-5 text-gray-800">
              Welcome Back to Unlimited News
            </h3>

            <p className="mt-1 mb-3 font-semibold text-xl text-gray-800">
              Sign in to your <span className="text-red-800">DailyPulse</span> account to access:
            </p>

            <ul className="space-y-3 text-gray-700 font-medium">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-red-800 flex-shrink-0 mt-0.5" />
                <span>Your personalized "My Feed" with curated news</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-red-800 flex-shrink-0 mt-0.5" />
                <span>Bookmarked articles and reading history</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-red-800 flex-shrink-0 mt-0.5" />
                <span>Latest industry newsletters and updates</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-red-800 flex-shrink-0 mt-0.5" />
                <span>Global and local news coverage</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-red-800 flex-shrink-0 mt-0.5" />
                <span>Seamless access across all your devices</span>
              </li>
            </ul>

            <p className="text-sm text-gray-600 mt-6">
              By signing in, you agree to our{" "}
              <a href="/terms" className="text-red-700 underline hover:text-red-800">
                Terms & Conditions
              </a>{" "}
              and{" "}
              <a href="/privacy" className="text-red-700 underline hover:text-red-800">
                Privacy Policy
              </a>.
            </p>
          </div>
        </section>

        {/* Right Side - Registration Form */}
        <section className="grid grid-cols-1 justify-center bg-white px-8 max-h-[80%] mt-[10%] w-[70%] ml-[15%] rounded-[20px]">
          <div className="max-w-md w-full">
            <h1 className="text-[1.5rem] text-center  font-bold text-gray-800 my-6 ">Sign In</h1>

            <div className="space-y-5">
              
              {/* Email */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  "Sign in"
                )}
              </button>

              {/* Divider */}
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or</span>
                </div>
              </div>

              {/* Google Sign In Button */}
              <button
                onClick={googleSignIn}
                className="w-full flex items-center justify-center gap-3 py-2.5 px-4 bg-white border-[1px] border-gray-300 hover:border-gray-400 hover:shadow-md text-gray-700 font-semibold rounded-lg shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>

              {/* Login Link */}
              <p className="text-center text-sm text-gray-600 mt-4">
                Don't have a DailyPulse Account ?{" "}
                <a href="/register" className="text-red-700 font-medium hover:text-red-800 underline">
                  Register Here
                </a>
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default LoginPage;