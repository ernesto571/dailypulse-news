import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";


const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5001"
    : "https://dailypulse-f8ra.onrender.com";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");
    } catch (error) {

      toast.error(error.response?.data?.message || error.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      axiosInstance.defaults.headers.common["Authorization"] = "";
      set({ authUser: null });
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  },

  //  Google Sign In
  googleSignIn: () => {
    console.log("🔗 Redirecting to Google OAuth");
    // Use the correct full URL that you tested
    const oauthUrl = `${BASE_URL}/api/auth/google`;
    console.log("Redirect URL:", oauthUrl);
    window.location.href = oauthUrl;
  },

  //  Handle OAuth success
  handleOAuthSuccess: async (token) => {
    try {
      console.log("🔄 Processing OAuth callback...");
      
      // If there's a token in URL, the backend should have set cookies
      // Just wait a moment for the auth state to settle
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Try to get the authenticated user
      try {
        const res = await axiosInstance.get("/auth/check");
        set({ authUser: res.data });
        toast.success("Logged in with Google successfully!");
        console.log("✅ Google OAuth successful");
        return true;
      } catch (authError) {
        console.log("Auth check failed:", authError);
      }
      
      // If checkAuth failed, try one more time after delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      try {
        const res = await axiosInstance.get("/auth/check");
        set({ authUser: res.data });
        toast.success("Logged in with Google successfully!");
        return true;
      } catch (finalError) {
        console.log("Final auth check failed:", finalError);
        toast.error("Failed to complete Google sign in" , finalError);
        return false;
      }
      
    } catch (error) {
      // console.log("Error in handleOAuthSuccess:", error);
      toast.error("Failed to authenticate with Google");
      return false;
    }
  },
}));