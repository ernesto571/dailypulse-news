import { createContext, useContext, useState, useEffect } from "react";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

const BookmarkContext = createContext();

export const BookmarkProvider = ({children}) => {

    const [bookmarks, setBookmarks] = useState([]);

    // Load bookmarks from backend when component mounts
    useEffect(() => {
        const fetchBookmarks = async () => {
        try {
            const { data } = await axiosInstance.get("/bookmarks");
            // console.log("Fetched bookmarks:", data);
            setBookmarks(data);
        } catch (error) {
            console.error("Error fetching bookmarks:", error);
        }
        };

        fetchBookmarks();
    }, []);

    // add to bookmark
    const addToBookmark = async (article) => {
        const loadingToast = toast.loading("Adding to bookmarks...");
        
        // Immediate optimistic update
        const tempBookmark = { 
            ...article,
            _id: `temp-${Date.now()}`
        };
        setBookmarks(prev => [...prev, tempBookmark]);
        
        try {
            const { data } = await axiosInstance.post("/bookmarks", article);
            
            toast.dismiss(loadingToast);
            toast.success("Added to bookmarks");
            
            // Replace entire state with backend data
            setBookmarks(data);
        } catch (error) {
            toast.dismiss(loadingToast);
            setBookmarks(prev => prev.filter(b => b._id !== tempBookmark._id));
            toast.error("Failed to add bookmark. Please, make sure you are logged in.");
        }
    };

    const removeFromBookmark = async (articleUrl) => {
        const loadingToast = toast.loading("Removing from bookmarks...");
        
        // FIXED: Use b.url instead of b.article?.url
        setBookmarks(prev => prev.filter(b => b.url !== articleUrl));
        
        try {
            const encodedURL = encodeURIComponent(articleUrl);
            const { data } = await axiosInstance.delete(`/bookmarks/${encodedURL}`);
            
            toast.dismiss(loadingToast);
            toast.success("Removed from bookmarks");
            
            // Use backend response as source of truth
            setBookmarks(data.bookmarks || data);
        } catch (error) {
            toast.dismiss(loadingToast);
            // On error, refetch bookmarks to ensure UI matches backend
            try {
                const { data } = await axiosInstance.get("/bookmarks");
                setBookmarks(data);
            } catch (fetchError) {
                console.error("Error refetching bookmarks:", fetchError);
            }
            toast.error("Failed to remove bookmark");
        }
    };

    return (
        <BookmarkContext.Provider
          value={{ bookmarks, addToBookmark, removeFromBookmark }}>
          {children}
        </BookmarkContext.Provider>
      );

}

export const useBookmark = () => useContext(BookmarkContext);