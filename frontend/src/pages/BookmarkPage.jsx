import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {  Bookmark, BookmarkIcon } from "lucide-react";
import Footer from "../components/Footer";
import { useBookmark } from "../contexts/BookmarkContext";
import { getRelativeTime } from "../lib/utils";
import NewsCardSkeleton from "../components/skeleton/NewsCardSkeleton";

function BookmarkPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { bookmarks, removeFromBookmark } = useBookmark();

  useEffect(() => {
    // Simulate loading time for bookmarks
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {[...Array(6)].map((_, i) => (
            <NewsCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (bookmarks.length === 0) {
    return (
      <div className="max-h-screen mt-20">
        <div className="text-center justify-items-center pt-[131px] pb-[200px]">
          <Bookmark className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <p className="text-gray-500 text-lg mb-4">Your bookmarks are empty</p>
          <p className="text-gray-400 mb-6">
            Start saving articles to read them later
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-red-600 text-white px-6 py-2 rounded-[10px] hover:bg-red-700">
            Browse Articles
          </button>
        </div>
        <Footer/>
      </div>
    );
  }

  return (
    <div className="max-h-screen mt-15">
      <div className="w-[94%] lg:w-[94%] mx-auto">
        <h1 className="text-[1.5rem] font-bold text-gray-700 py-4">MY BOOKMARKS</h1>

        <div className="grid grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-10 border-solid border-t-[2px] border-black">
          {/* left side */}
          <div className="col-span-1 flex flex-col gap-3">
            {bookmarks.slice(0, 2).map((bookmark, index) => (
              <div key={index} className="overflow-hidden border-solid border-b-[1px] border-gray-200 mt-8 relative">
                <img 
                  src={bookmark.urlToImage} 
                  alt={bookmark.title} 
                  className="w-full h-[10rem] object-cover hover:opacity-85 cursor-pointer" 
                  onClick={() => window.open(bookmark.url, "_blank")} 
                />
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFromBookmark(bookmark.url);
                  }}
                  className="absolute top-3 right-3 bg-black bg-opacity-50 hover:bg-opacity-70 p-2 rounded-full transition-all">
                  <BookmarkIcon className="w-5 h-5 text-white fill-red-600" />
                </button>
                <h3
                  className="font-bold text-[1.1rem] my-2 hover:underline hover:cursor-pointer text-gray-900"
                  onClick={() => window.open(bookmark.url, "_blank")}>
                  {bookmark.title}
                </h3>
                <p className="text-gray-700 hidden lg:flex text-[0.9rem] mb-1">
                  {bookmark.description}
                </p>
                <p className="text-gray-500 text-sm mb-2">
                  {getRelativeTime(bookmark.publishedAt)}
                </p>
              </div>
            ))}
          </div>

          {/* center side */}
          <div className="col-span-2">
            {bookmarks.slice(2, 3).map((bookmark, index) => (
              <div key={index} className="overflow-hidden mt-8 relative">
                <img 
                  src={bookmark.urlToImage} 
                  alt={bookmark.title} 
                  className="w-full h-[22rem] lg:h-[28rem] object-cover hover:opacity-85 cursor-pointer" 
                  onClick={() => window.open(bookmark.url, "_blank")} 
                />
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFromBookmark(bookmark.url);
                  }}
                  className="absolute top-3 right-3 bg-black bg-opacity-50 hover:bg-opacity-70 p-2 rounded-full transition-all"
                >
                  <BookmarkIcon className="w-5 h-5 text-white fill-red-600" />
                </button>
                <h3
                  className="font-bold text-[1.6rem] my-2 hover:underline hover:cursor-pointer text-gray-900"
                  onClick={() => window.open(bookmark.url, "_blank")}>
                  {bookmark.title}
                </h3>
                <p className="text-gray-700 mb-1">
                  {bookmark.description}
                </p>
              </div>
            ))}
          </div>

          {/* right side- dont show for medium screen */}
          <div className="col-span-1 hidden lg:flex flex-col gap-3">
            {bookmarks.slice(3, 5).map((bookmark, index) => (
              <div key={index} className="overflow-hidden mt-8 border-solid border-b-[1px] border-gray-200 relative">
                <img 
                  src={bookmark.urlToImage} 
                  alt={bookmark.title} 
                  className="w-full h-[10rem] object-cover hover:opacity-85 cursor-pointer" 
                  onClick={() => window.open(bookmark.url, "_blank")} 
                />
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFromBookmark(bookmark.url);
                  }}
                  className="absolute top-3 right-3 bg-black bg-opacity-50 hover:bg-opacity-70 p-2 rounded-full transition-all"
                >
                  <BookmarkIcon className="w-5 h-5 text-white fill-red-600" />
                </button>
                <h3
                  className="font-bold text-[1.1rem] my-2 hover:underline hover:cursor-pointer text-gray-900"
                  onClick={() => window.open(bookmark.url, "_blank")}>
                  {bookmark.title}
                </h3>
                <p className="text-gray-700 text-[0.9rem] mb-1">
                  {bookmark.description}
                </p>
                <p className="text-gray-500 text-sm mb-2">
                  {getRelativeTime(bookmark.publishedAt)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* bottom section for remaining bookmarks for only lage screen */}
        {bookmarks.length > 5 && (
          <div className="border-solid border-y-[3px] hidden lg:flex border-gray-900 my-8">
            <div className="grid grid-cols-4 gap-7 mt-8 mb-6">
              {bookmarks.slice(5).map((bookmark, index) => (
                <div key={index} className="overflow-hidden border-solid border-b-[1px] border-gray-200 relative">
                  <img 
                    src={bookmark.urlToImage} 
                    alt={bookmark.title} 
                    className="w-full h-[10rem] object-cover hover:opacity-85 cursor-pointer" 
                    onClick={() => window.open(bookmark.url, "_blank")} 
                  />
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromBookmark(bookmark.url);
                    }}
                    className="absolute top-3 right-3 bg-black bg-opacity-50 hover:bg-opacity-70 p-2 rounded-full transition-all"
                  >
                    <BookmarkIcon className="w-5 h-5 text-white fill-red-600" />
                  </button>
                  <h3
                    className="font-bold text-[1.1rem] my-2 hover:underline hover:cursor-pointer text-gray-900"
                    onClick={() => window.open(bookmark.url, "_blank")}>
                    {bookmark.title}
                  </h3>
                  <p className="text-gray-700 text-[0.9rem] mb-3">
                    {bookmark.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* dont show for large screen */}
        {bookmarks.length > 3 && (
          <div className="border-solid lg:hidden border-y-[3px] border-gray-900 my-8">
            <div className="grid grid-cols-2 gap-7 mt-8 mb-6">
              {bookmarks.slice(3).map((bookmark, index) => (
                <div key={index} className="overflow-hidden border-solid border-b-[1px] border-gray-200 relative">
                  <img 
                    src={bookmark.urlToImage} 
                    alt={bookmark.title} 
                    className="w-full h-[10rem] object-cover hover:opacity-85 cursor-pointer" 
                    onClick={() => window.open(bookmark.url, "_blank")} 
                  />
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromBookmark(bookmark.url);
                    }}
                    className="absolute top-3 right-3 bg-black bg-opacity-50 hover:bg-opacity-70 p-2 rounded-full transition-all"
                  >
                    <BookmarkIcon className="w-5 h-5 text-white fill-red-600" />
                  </button>
                  <h3
                    className="font-bold text-[1.1rem] my-2 hover:underline hover:cursor-pointer text-gray-900"
                    onClick={() => window.open(bookmark.url, "_blank")}>
                    {bookmark.title}
                  </h3>
                  <p className="text-gray-700 hidden lg:flex text-[0.9rem] mb-3">
                    {bookmark.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
      <Footer/>
    </div>
  );
}

export default BookmarkPage;