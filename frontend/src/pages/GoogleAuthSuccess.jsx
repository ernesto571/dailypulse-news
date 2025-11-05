import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore.js";
import { Loader2 } from "lucide-react";

function OAuthSuccess() {
  const navigate = useNavigate();
  const { handleOAuthSuccess } = useAuthStore();

  useEffect(() => {
    const completeOAuth = async () => {
      try {
        // Get token from URL params if needed
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");
        
        // Use handleOAuthSuccess to process the OAuth login
        const success = await handleOAuthSuccess(token);
        
        if (success) {
          // Redirect to home page on success
          navigate("/");
        } else {
          // Redirect to login on failure
          navigate("/login");
        }
        
      } catch (error) {
        console.error("OAuth error:", error);
        navigate("/login");
      }
    };

    completeOAuth();
  }, [navigate, handleOAuthSuccess]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <Loader2 className="w-12 h-12 animate-spin mx-auto text-red-600" />
        <p className="mt-4 text-gray-700 font-medium">Completing sign in...</p>
      </div>
    </div>
  );
}

export default OAuthSuccess;