import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { searchNews } from "../services/BackendNewsApi";
import NewsCardSkeleton from "../components/skeleton/NewsCardSkeleton";
import Footer from "../components/Footer";
import { getRelativeTime } from "../lib/utils";
import { useBookmark } from "../contexts/BookmarkContext";
import { Bookmark, BookmarkIcon } from "lucide-react";

function SearchResult(){

    const start = 0;
    const [searchParams] = useSearchParams();
    const newsQuery = searchParams.get("q");
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visibleCount, setVisibleCount] = useState(8); // start with 8
    const { bookmarks, addToBookmark, removeFromBookmark } = useBookmark();

    // Check if article is bookmarked
    const isBookmarked = (articleUrl) => {
        return bookmarks.some(bookmark => bookmark.url === articleUrl);
    };

    // Handle bookmark click
    const handleBookmarkClick = (e, article) => {
        e.stopPropagation();
        if (isBookmarked(article.url)) {
        removeFromBookmark(article.url);
        } else {
        addToBookmark(article);
        }
    };

    // Bookmark icon component
    const BookmarkButton = ({ article, className = "" }) => (
        <button 
        onClick={(e) => handleBookmarkClick(e, article)}
        className={`absolute top-3 right-3 bg-black bg-opacity-50 hover:bg-opacity-70 p-2 rounded-full transition-all ${className}`}>
        {isBookmarked(article.url) ? (
            <BookmarkIcon className="w-5 h-5 text-white fill-red-600" />
        ) : (
            <Bookmark className="w-5 h-5 text-white" />
        )}
        </button>
    );

  
    useEffect(() => {
      if (newsQuery) {
        setLoading(true);
        searchNews(newsQuery).then((results) => {
          setNews(results || []);
          setLoading(false);
        });
      }
    }, [newsQuery]);

    const handleShowMore = () => {
        // show up to 56 articles total
        setVisibleCount((prev) => Math.min(prev + 8, 56));
    };

    

    if (loading) {
        return (
          <div className="max-h-screen">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
              {[...Array(6)].map((_, i) => (
                <NewsCardSkeleton key={i} />
              ))}
            </div>
          </div>
        );
    }

    if (news.length === 0) {
        return (
          <div className="p-6">
            <Header />
            <p className="text-gray-500">No news found for "{newsQuery}"</p>
          </div>
        );
    }

    return(
        <div className="max-h-screen">
        <div className="w-[98%] lg:w-[94%] mx-auto">
            <h1 className="text-[1.5rem] font-bold text-gray-700 py-5">SEARCH RESULTS FOR "{newsQuery}"</h1>

            <div className="grid grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-10 border-solid border-t-[2px] border-black">
                {/* left side */}
                <div className="col-span-1 flex flex-col  ">
                    {news.slice(start, start+2).map((article, index) => (
                        <div key={index} className="overflow-hidden border-solid border-b-[1px] border-gray-200 mt-8">
                            <div className="relative">
                                <img 
                                src={article.urlToImage} 
                                alt={article.title} 
                                className="w-full h-[10rem] object-cover hover:opacity-85 cursor-pointer" 
                                onClick={() => window.open(article.url, "_blank")} 
                                />
                                <BookmarkButton article={article} />
                            </div>
                            <h3
                                className="font-bold text-[1.1rem] my-2 hover:underline hover:cursor-pointer text-gray-900"
                                onClick={() => window.open(article.url, "_blank")}>
                                {article.title}
                            </h3>
                            <p className="text-gray-700 text-[0.9rem] hidden lg:flex mb-1">
                                {article.description}
                            </p>
                            <p className="text-gray-500 text-sm mb-2 ">
                                {getRelativeTime(article.publishedAt)}
                            </p>
                        </div>
                    ))}
                </div>
                {/* center side */}
                <div className="col-span-2">
                    {news.slice(start+2, start+3).map((article, index) => (
                        <div key={index} className="overflow-hidden mt-8">
                            <div className="relative">
                                <img 
                                src={article.urlToImage} 
                                alt={article.title} 
                                className="w-full h-[22rem] lg:h-[28rem] object-cover hover:opacity-85 cursor-pointer"                  onClick={() => window.open(article.url, "_blank")} 
                                />
                                <BookmarkButton article={article} />
                            </div>
                            <h3
                                className="font-bold text-[1.6rem] my-2 hover:underline hover:cursor-pointer text-gray-900"
                                onClick={() => window.open(article.url, "_blank")}>
                                {article.title}
                            </h3>
                            <p className="text-gray-700  mb-1">
                                {article.description}
                            </p>
                            <p className="text-gray-500 text-sm mb-2 ">
                                {getRelativeTime(article.publishedAt)}
                            </p>
                        </div>
                    ))}
                </div>
                <div className="col-span-1 hidden lg:flex flex-col gap-3 ">
                    {news.slice(start+3, start+5).map((article, index) => (
                        <div key={index} className="overflow-hidden mt-8 border-solid border-b-[1px] border-gray-200">
                            <div className="relative">
                                <img 
                                src={article.urlToImage} 
                                alt={article.title} 
                                className="w-full h-[10rem] object-cover hover:opacity-85 cursor-pointer" 
                                onClick={() => window.open(article.url, "_blank")} 
                                />
                                <BookmarkButton article={article} />
                            </div>                                  
                            <h3
                                className="font-bold text-[1.1rem] my-2 hover:underline hover:cursor-pointer text-gray-900"
                                onClick={() => window.open(article.url, "_blank")}>
                                {article.title}
                            </h3>
                            <p className="text-gray-700 text-[0.9rem] mb-1">
                                {article.description}
                            </p>
                            <p className="text-gray-500 text-sm mb-2 ">
                                {getRelativeTime(article.publishedAt)}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* bottom */}
            <div className=" border-solid border-y-[3px] border-gray-900 my-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-7 mt-8 mb-6">
                    {news.slice(start+5, visibleCount+1 ).map((article, index) => (
                        <div key={index} className="overflow-hidden border-solid border-b-[1px] border-gray-200">
                            <div className="relative">
                                <img 
                                src={article.urlToImage} 
                                alt={article.title} 
                                className="w-full h-[10rem] object-cover hover:opacity-85 cursor-pointer" 
                                onClick={() => window.open(article.url, "_blank")} 
                                />
                                <BookmarkButton article={article} />
                            </div>
                            <h3
                                className="font-bold text-[1.1rem] my-2 hover:underline hover:cursor-pointer text-gray-900"
                                onClick={() => window.open(article.url, "_blank")}>
                                {article.title}
                            </h3>
                            <p className="text-gray-700 hidden lg:flex text-[0.9rem] mb-3">
                                {article.description}
                            </p>
                            
                        </div>
                    ))}
                </div>
            </div>

            {/* Show more button */}
            {visibleCount < 56 && news.length > visibleCount && (
                <div className="mt-4 text-center">
                <button
                    onClick={handleShowMore}
                    className="px-4 py-2 bg-red-800 text-white rounded-[10px] hover:bg-red-900">
                    Load More news
                </button>
                </div>
            )}
        
        </div>

        <Footer/>
    </div>
    )

}
export default SearchResult