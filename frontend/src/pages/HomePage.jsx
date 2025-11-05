import { useEffect, useState } from "react";
import { getTopHeadlines, getOnlyDailyPulse, getGeneralNews, getBusinessNews, getSportsNews, getHealthNews, getTechnologyNews, getArtsNews, getCryptoNews, getEntertainmentNews} from "../services/BackendNewsApi";
import NewsCardSkeleton from "../components/skeleton/NewsCardSkeleton";
import { getRelativeTime } from "../lib/utils";
import { Link } from "react-router-dom";
import { ChevronRight, Bookmark, BookmarkIcon } from "lucide-react";
import Footer from "../components/Footer";
import { useBookmark } from "../contexts/BookmarkContext";

function HomePage() {
  const [topHeadline, setTopHeadline] = useState([]);
  const [DailyPulse, setDailyPulse] = useState([]);
  const [general, setGeneral] = useState([]);
  const [business, setBusiness] = useState([]);
  const [sport, setSport] = useState([]);
  const [health, setHealth] = useState([]);
  const [crypto, setCrypto] = useState([]);
  const [techNews, setTechNews] = useState([]);
  const [artNews, setArtNews] = useState([]);
  const [entertainment, setEntertainment] = useState([]);
  const [loading, setLoading] = useState(true);
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
      className={`absolute top-3 right-3 bg-black bg-opacity-50 hover:bg-opacity-70 p-2 rounded-full transition-all ${className}`}
    >
      {isBookmarked(article.url) ? (
        <BookmarkIcon className="w-5 h-5 text-white fill-red-600" />
      ) : (
        <Bookmark className="w-5 h-5 text-white" />
      )}
    </button>
  );

  useEffect(() => {
    const fetchTopHeadline = async () => {
      try {
        const articles = await getTopHeadlines();
        setTopHeadline(articles);
      } catch (error) {
        console.error("Error fetching top headlines:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTopHeadline();
  }, []);

  // fetch from news hub
  useEffect(() => {
    const fetchDailyPulse = async () => {
      try {
        const articles = await getOnlyDailyPulse();
        setDailyPulse(articles);
      } catch (error) {
        console.error("Error fetching only from news hub:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDailyPulse();
  }, []);

  // fetch general news
  useEffect(() => {
    const fetchGeneralNews = async () => {
      try {
        const articles = await getGeneralNews();
        setGeneral(articles);
      } catch (error) {
        console.error("Error fetching general news:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGeneralNews();
  }, []);

  // fetch business news
  useEffect(() => {
    const fetchBusinessNews = async () => {
      try {
        const articles = await getBusinessNews();
        setBusiness(articles);
      } catch (error) {
        console.error("Error fetching business news:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBusinessNews();
  }, []);

  // fetch sports news
  useEffect(() => {
    const fetchSportNews = async () => {
      try {
        const articles = await getSportsNews();
        setSport(articles);
      } catch (error) {
        console.error("Error fetching sport news:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSportNews();
  }, []);

  // fetch health news
  useEffect(() => {
    const fetchHealthNews = async () => {
      try {
        const articles = await getHealthNews();
        setHealth(articles);
      } catch (error) {
        console.error("Error fetching health news:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHealthNews();
  }, []);

  // fetch crypto news
  useEffect(() => {
    const fetchCryptoNews = async () => {
      try {
        const articles = await getCryptoNews();
        setCrypto(articles);
      } catch (error) {
        console.error("Error fetching crypto news:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCryptoNews();
  }, []);

  // fetch tech news
    useEffect(() => {
    const fetchTechNews = async () => {
      try {
        const articles = await getTechnologyNews();
        setTechNews(articles);
      } catch (error) {
        console.error("Error fetching tech news:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTechNews();
  }, [])

  // fetch arts news
    useEffect(() => {
    const fetchArtNews = async () => {
      try {
        const articles = await getArtsNews();
        setArtNews(articles);
      } catch (error) {
        console.error("Error fetching arts news:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchArtNews();
  }, [])

  // fetch entertainment news
  useEffect(() => {
    const fetchEntertainment = async () => {
      try {
        const articles = await getEntertainmentNews();
        setEntertainment(articles);
      } catch (error) {
        console.error("Error fetching entertainment news:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEntertainment();
  }, [])


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

  return (
    <div className="max-h-screen mt-[5rem]">
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 w-[98%] lg:w-[94%] mx-auto ">
        {/* Left side - Main article (spans 2 columns) */}
        <div className="md:col-span-1 lg:col-span-2">
          {topHeadline.slice(0, 1).map((article, index) => (
            <div key={index} className="overflow-hidden">
              <h3
                className="font-bold text-[1.2rem]  lg:text-[1.7rem] mb-2 hover:underline hover:cursor-pointer text-gray-900"
                onClick={() => window.open(article.url, "_blank")}>
                {article.title}
              </h3>
              <p className="text-gray-700 text-[0.9rem] mb-1">
                {article.description}
              </p>
              <p className="text-gray-500 text-sm mb-2">
                {getRelativeTime(article.publishedAt)}
              </p>
              <div className="relative">
                <img 
                  src={article.urlToImage} 
                  alt={article.title} 
                  className="w-full h-[20rem] lg:h-[28rem] object-cover hover:opacity-85 cursor-pointer" 
                  onClick={() => window.open(article.url, "_blank")} 
                />
                <BookmarkButton article={article} />
              </div>
            </div>
          ))}
        </div>

        {/* Right side - 4 smaller articles */}
        <div className=" lg:col-span-1 flex flex-col gap-4 lg:mt-[3rem] md:mt-1">
          {topHeadline.slice(1, 6).map((article, index) => (
            <div
              key={index}
              className="overflow-hidden pb-4 border-solid border-b-[1px] border-gray-200">
              <h3
                className="font-bold text-[1.1rem] mb-2 hover:underline hover:cursor-pointer text-gray-900"
                onClick={() => window.open(article.url, "_blank")}>
                {article.title}
              </h3>
              <p className="text-gray-500 text-sm mb-2">
                {getRelativeTime(article.publishedAt)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* more top stories */}
      <div className="border-solid border-t-[1px] border-gray-900 w-[94%] mx-auto mt-10">
        <h1 className="my-5 text-gray-900 text-[1.2rem] font-bold">More Top Stories</h1>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-9">
          {topHeadline.slice(6, 10).map((article, index) => (
            <div key={index} className="overflow-hidden pb-4 relative">
              <img src={article.urlToImage} alt={article.title} className="w-full h-[10rem] lg:h-[13rem] object-cover hover:opacity-85 cursor-pointer" onClick={() => window.open(article.url, "_blank")} />
              <BookmarkButton article={article} />
              <h3 className="font-bold text-[1.1rem] my-2 hover:underline hover:cursor-pointer text-gray-900" onClick={() => window.open(article.url, "_blank")} >
                {article.title}
              </h3>
              <p className="text-gray-500 text-sm mb-2">
                {getRelativeTime(article.publishedAt)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* only from DailyPulse */}
      <div className="border-solid border-t-[1px] border-gray-900 w-[94%] mx-auto mt-5">
        <h1 className="my-5 text-gray-900 text-[1.2rem] font-bold">Only From DailyPulse</h1>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-9">
          {DailyPulse.slice(0, 3).map((article, index) => (
            <div key={index} className="overflow-hidden pb-4 relative">
              <img src={article.urlToImage} alt={article.title} className="w-full h-[15rem] object-cover hover:opacity-85 cursor-pointer" onClick={() => window.open(article.url, "_blank")} />
              <BookmarkButton article={article} />
              <h3 className="font-bold text-[1.1rem] my-2 hover:underline hover:cursor-pointer text-gray-900" onClick={() => window.open(article.url, "_blank")} >
                {article.title}
              </h3>
              <p className="text-gray-500 text-sm mb-2">
                {getRelativeTime(article.publishedAt)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* only from general news */}
      <div className="bg-black mt-5">
        <div className="w-[94%] mx-auto">
          <br />
          <h1 className="text-white text-[1.2rem] font-bold border-solid border-t-[2px] pt-5 pb-6 border-white">More News</h1>
          <div className="grid grid-cols-3 lg:grid-cols-4 gap-4">
            {/* left side */}
            <div className="col-span-1">
              {general.slice(0, 1).map((article, index) => (
                <div key={index} className="overflow-hidden  lg:mt-10 border-solid border-b-[1px] border-white">
                  <h3 className="font-bold text-[1.2rem] my-2 hover:underline hover:cursor-pointer text-white" onClick={() => window.open(article.url, "_blank")} >
                    {article.title}
                  </h3>
                  <p className="text-gray-400 text-[0.9rem] mb-1">
                    {article.description}
                  </p>
                  <p className="text-gray-400 text-sm mb-5">
                    {getRelativeTime(article.publishedAt)}
                  </p>
                </div>
              ))}
            </div>

            {/* middle (image) */}
            <div className="col-span-2 relative">
              {general.slice(0, 1).map((article, index) => (
                <div key={index} className="overflow-hidden pb-4">
                  <img src={article.urlToImage} alt={article.title} className="w-full h-[20rem] lg:h-[28rem] mt-3 lg:mt-0 object-cover hover:opacity-85 cursor-pointer" onClick={() => window.open(article.url, "_blank")} />
                  <BookmarkButton article={article} />
                </div>
              ))}
            </div>

            {/* Right side */}
            <div className="col-span-1 hidden lg:flex">
              {general.slice(1, 2).map((article, index) => (
                <div key={index} className="overflow-hidden border-solid border-b-[1px] border-white relative">
                  <img src={article.urlToImage} alt={article.title} className="w-full h-[10rem] object-cover hover:opacity-85 cursor-pointer" onClick={() => window.open(article.url, "_blank")} />
                  <BookmarkButton article={article} />
                  <h3
                    className="font-bold text-[1.1rem] my-2 hover:underline hover:cursor-pointer text-white"
                    onClick={() => window.open(article.url, "_blank")} >
                    {article.title}
                  </h3>
                  <p className="text-gray-400 text-[0.9rem] mb-1">
                    {article.description}
                  </p>
                  <p className="text-gray-400 text-sm mb-5">
                    {getRelativeTime(article.publishedAt)}
                  </p>
                </div>
              ))}
            </div> 
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-9 mt-10">
            {general.slice(2, 6).map((article, index) => (
              <div key={index} className="overflow-hidden pb-4 relative">
                <img src={article.urlToImage} alt={article.title} className="w-full h-[10rem] lg:h-[13rem] object-cover hover:opacity-85 cursor-pointer" onClick={() => window.open(article.url, "_blank")} />
                <BookmarkButton article={article} />
                <h3 className="font-bold text-[1.1rem] my-2 hover:underline hover:cursor-pointer text-white" onClick={() => window.open(article.url, "_blank")} >
                  {article.title}
                </h3>
                <p className="text-gray-400 text-sm mb-2">
                  {getRelativeTime(article.publishedAt)}
                </p>
              </div>
            ))}
          </div>

          
        </div>
      </div>

      <div className="border-solid border-t-[1px] border-gray-900 mt-10">
        
        {/* world of business */}
        <div className="border-solid border-t-[2px] border-gray-900 mt-14 w-[94%] mx-auto">
          <Link to='/business' className="flex mt-3 text-[1.2rem] font-bold text-gray-900 hover:underline">WORLD OF BUSINESS  <ChevronRight size={25} className=" mt-[2px]"/></Link>

          <div className="grid grid-cols-3 gap-8 mt-8 lg:mt-5">
            {/* left side */}
            <div className="col-span-2 relative">
              {business.slice(0, 1).map((article, index) => (
                <div key={index} className="overflow-hidden">
                  <img src={article.urlToImage} alt={article.title} className="w-full h-[20rem] lg:h-[28rem] object-cover hover:opacity-90 cursor-pointer" onClick={() => window.open(article.url, "_blank")} />
                  <BookmarkButton article={article} />
                </div>
              ))}
            </div>
            {/* right side */}
            <div className="col-span-1">
              {business.slice(0, 1).map((article, index) => (
                <div key={index} className="mt-2 lg:mt-7 overflow-hidden">                    
                  <h3
                    className="font-bold text-[1.2rem]  lg:text-[1.7rem] mb-2 hover:underline hover:cursor-pointer text-gray-900"
                    onClick={() => window.open(article.url, "_blank")}>
                    {article.title}
                  </h3>
                  <p className="text-gray-700hidden lg:flex text-[0.9rem] mb-1">
                    {article.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Health and wellness */}
        <div className="border-solid border-t-[2px] border-gray-900 mt-14 w-[94%] mx-auto">
          <h1 className="mt-3 text-[1.2rem] font-bold text-gray-900">HEALTH AND WELLNESS</h1>

          <div className="grid grid-cols-3 gap-9 mt-7">
            {health.slice(0, 3).map((article, index) => (
              <div key={index} className="overflow-hidden relative">
                <img src={article.urlToImage} alt={article.title} className="w-full h-[10rem] lg:h-[13rem] object-cover hover:opacity-90 cursor-pointer" onClick={() => window.open(article.url, "_blank")}/>
                <BookmarkButton article={article} />
                <h3
                  className="font-bold text-[1.2rem] my-2 hover:underline hover:cursor-pointer text-gray-900"
                  onClick={() => window.open(article.url, "_blank")}>
                  {article.title}
                </h3>
                <p className="text-gray-700 hidden lg:flex text-[0.9rem] mb-1">
                  {article.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* World of cryptocurrency */}
        <div className="border-solid border-t-[2px] border-gray-900 mt-14 w-[94%] mx-auto">
          <Link to='/crypto' className="flex mt-3 text-[1.2rem] font-bold text-gray-900 hover:underline">WORLD OF CRYPTOCURRENCY  <ChevronRight size={25} className=" mt-[2px]"/></Link>

          <div className="grid grid-cols-3 gap-10 mt-8 lg:mt-5">
            {/* LEFT SIDE */}
            <div className="col-span-1">
              {crypto.slice(0, 1).map((article, index) => (
                <div key={index} className="overflow-hidden mt-2 lg:mt-10">
                  <h3
                    className="font-bold text-[1.2rem]  lg:text-[1.7rem] mb-2 hover:underline hover:cursor-pointer text-gray-900"
                    onClick={() => window.open(article.url, "_blank")}>
                    {article.title}
                  </h3>
                  <p className="text-gray-700 text-[0.9rem] mb-1">
                    {article.description}
                  </p>
                </div>
              ))}
            </div>

            {/* right side */}
            <div className="col-span-2 relative">
              {crypto.slice(0, 1).map((article, index) => (
                <div key={index} className="overflow-hidden">
                  <img src={article.urlToImage} alt={article.title} className="w-full h-[20rem] lg:h-[28rem] object-cover hover:opacity-90 cursor-pointer" onClick={() => window.open(article.url, "_blank")} />
                  <BookmarkButton article={article} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* category list 1*/}
      <div className="border-solid border-t-[1px] border-gray-900 mt-[2.8rem]">
        <div className="grid grid-cols-2 lg:grid-cols-3 mt-10 w-[94%] mx-auto gap-8">
          {/* Business category */}
          <div className="border-solid border-t-[2px] border-gray-900">
            <Link to='/business' className="flex mt-3 text-[1.2rem] font-bold text-gray-900 hover:underline"> BUSINESS  <ChevronRight size={25} className=" mt-[2px]"/></Link>
            {/* top */}
            {business.slice(1, 2).map((article, index) => (
              <div key={index} className="overflow-hidden mt-4 relative">
                <img src={article.urlToImage} alt={article.title} className="w-full h-[10rem] lg:h-[13rem] object-cover hover:opacity-90 cursor-pointer" onClick={() => window.open(article.url, "_blank")} />
                <BookmarkButton article={article} />
                <h3
                  className="font-bold text-[1.1rem] my-2 hover:underline hover:cursor-pointer text-gray-900"
                  onClick={() => window.open(article.url, "_blank")}>
                  {article.title}
                </h3>
                <p className="text-gray-700 text-[0.9rem] mb-2">
                  {article.description}
                </p>
              </div>
            ))}
            {/* bottom */}
            {business.slice(2, 5).map((article, index) => (
              <div key={index} className="overflow-hidden my-3 border-solid border-t-[1px] border-gray-200">
                <h3
                  className="font-bold text-[1.1rem] mt-3 hover:underline hover:cursor-pointer text-gray-900"
                  onClick={() => window.open(article.url, "_blank")}>
                  {article.title}
                </h3>
              </div>
            ))}
          </div>

          {/* Health category */}
          <div className="border-solid border-t-[2px] border-gray-900">
            <Link to='/health' className="flex mt-3 text-[1.2rem] font-bold text-gray-900 hover:underline"> HEALTH  <ChevronRight size={25} className=" mt-[2px]"/></Link>
            {/* top */}
            {health.slice(3, 4).map((article, index) => (
              <div key={index} className="overflow-hidden mt-4 relative">
                <img src={article.urlToImage} alt={article.title} className="w-full h-[10rem] lg:h-[13rem] object-cover hover:opacity-90 cursor-pointer" onClick={() => window.open(article.url, "_blank")} />
                <BookmarkButton article={article} />
                <h3
                  className="font-bold text-[1.1rem] my-2 hover:underline hover:cursor-pointer text-gray-900"
                  onClick={() => window.open(article.url, "_blank")}>
                  {article.title}
                </h3>
                <p className="text-gray-700 text-[0.9rem] mb-2">
                  {article.description}
                </p>
              </div>
            ))}
            {/* bottom */}
            {health.slice(4, 7).map((article, index) => (
              <div key={index} className="overflow-hidden my-3 border-solid border-t-[1px] border-gray-200">
                <h3
                  className="font-bold text-[1.1rem] mt-3 hover:underline hover:cursor-pointer text-gray-900"
                  onClick={() => window.open(article.url, "_blank")}>
                  {article.title}
                </h3>
              </div>
            ))}
          </div>

          {/* Tech category */}
          <div className="border-solid border-t-[2px] border-gray-900">
            <Link to='/technology' className="flex mt-3 text-[1.2rem] font-bold text-gray-900 hover:underline"> TECH  <ChevronRight size={25} className=" mt-[2px]"/></Link>
            {/* top */}
            {techNews.slice(0, 1).map((article, index) => (
              <div key={index} className="overflow-hidden mt-4 relative">
                <img src={article.urlToImage} alt={article.title} className="w-full h-[10rem] lg:h-[13rem] object-cover hover:opacity-90 cursor-pointer" onClick={() => window.open(article.url, "_blank")} />
                <BookmarkButton article={article} />
                <h3
                  className="font-bold text-[1.1rem] my-2 hover:underline hover:cursor-pointer text-gray-900"
                  onClick={() => window.open(article.url, "_blank")}>
                  {article.title}
                </h3>
                <p className="text-gray-700 text-[0.9rem] mb-2">
                  {article.description}
                </p>
              </div>
            ))}
            {/* bottom */}
            {techNews.slice(1, 4).map((article, index) => (
              <div key={index} className="overflow-hidden my-3 border-solid border-t-[1px] border-gray-200">
                <h3
                  className="font-bold text-[1.1rem] mt-3 hover:underline hover:cursor-pointer text-gray-900"
                  onClick={() => window.open(article.url, "_blank")}>
                  {article.title}
                </h3>
              </div>
            ))}
          </div>

          {/* Arts category shown only in middle screen */}
          <div className="border-solid border-t-[2px] border-gray-900 lg:hidden ">
            <Link to='/arts' className="flex mt-3 text-[1.2rem] font-bold text-gray-900 hover:underline"> ARTS  <ChevronRight size={25} className=" mt-[2px]"/></Link>
            {/* top */}
            {artNews.slice(0, 1).map((article, index) => (
              <div key={index} className="overflow-hidden mt-4 relative">
                <img src={article.urlToImage} alt={article.title} className="w-full h-[10rem] lg:h-[13rem] object-cover hover:opacity-90 cursor-pointer" onClick={() => window.open(article.url, "_blank")} />
                <BookmarkButton article={article} />
                <h3
                  className="font-bold text-[1.1rem] my-2 hover:underline hover:cursor-pointer text-gray-900"
                  onClick={() => window.open(article.url, "_blank")}>
                  {article.title}
                </h3>
                <p className="text-gray-700 text-[0.9rem] mb-2">
                  {article.description}
                </p>
              </div>
            ))}
            {/* bottom */}
            {artNews.slice(1, 4).map((article, index) => (
              <div key={index} className="overflow-hidden my-3 border-solid border-t-[1px] border-gray-200">
                <h3
                  className="font-bold text-[1.1rem] mt-3 hover:underline hover:cursor-pointer text-gray-900"
                  onClick={() => window.open(article.url, "_blank")}>
                  {article.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-solid border-t-[1px] border-gray-900 mt-[2.8rem]">
        {/* world of sports */}
        <div className="border-solid border-t-[2px] border-gray-900 mt-14 w-[94%] mx-auto">
          <Link to='/sports' className="flex mt-3 text-[1.2rem] font-bold text-gray-900 hover:underline">WORLD OF SPORTS  <ChevronRight size={25} className=" mt-[2px]"/></Link>

          <div className="grid grid-cols-3 gap-8 mt-8 lg:mt-5">
            {/* left side */}
            <div className="col-span-2 relative">
              {sport.slice(0, 1).map((article, index) => (
                <div key={index} className="overflow-hidden">
                  <img src={article.urlToImage} alt={article.title} className="w-full h-[20rem] lg:h-[28rem] object-cover hover:opacity-90 cursor-pointer" onClick={() => window.open(article.url, "_blank")} />
                  <BookmarkButton article={article} />
                </div>
              ))}
            </div>
            {/* right side */}
            <div className="col-span-1">
              {sport.slice(0, 1).map((article, index) => (
                <div key={index} className="mt-1 lg:mt-7 overflow-hidden">                    
                  <h3
                    className="font-bold text-[1.2rem]  lg:text-[1.7rem] mb-2 hover:underline hover:cursor-pointer text-gray-900"
                    onClick={() => window.open(article.url, "_blank")}>
                    {article.title}
                  </h3>
                  <p className="text-gray-700  text-[0.9rem] mb-1">
                    {article.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* category list 2*/}
      <div className="border-solid border-y-2 border-gray-900 mt-[2.8rem]">
        <div className="grid grid-cols-2 lg:grid-cols-3 my-10 w-[94%] mx-auto gap-8">
          {/* crypto category */}
          <div className="border-solid border-t-[2px] border-gray-900">
            <Link to='/crypto' className="flex mt-3 text-[1.2rem] font-bold text-gray-900 hover:underline"> CRYPTO  <ChevronRight size={25} className=" mt-[2px]"/></Link>
            {/* top */}
            {crypto.slice(1, 2).map((article, index) => (
              <div key={index} className="overflow-hidden mt-4 relative">
                <img src={article.urlToImage} alt={article.title} className="w-full h-[10rem] lg:h-[13rem] object-cover hover:opacity-90 cursor-pointer" onClick={() => window.open(article.url, "_blank")} />
                <BookmarkButton article={article} />
                <h3
                  className="font-bold text-[1.1rem] my-2 hover:underline hover:cursor-pointer text-gray-900"
                  onClick={() => window.open(article.url, "_blank")}>
                  {article.title}
                </h3>
                <p className="text-gray-700 text-[0.9rem] mb-2">
                  {article.description}
                </p>
              </div>
            ))}
            {/* bottom */}
            {crypto.slice(2, 5).map((article, index) => (
              <div key={index} className="overflow-hidden my-3 border-solid border-t-[1px] border-gray-200">
                <h3
                  className="font-bold text-[1.1rem] mt-3 hover:underline hover:cursor-pointer text-gray-900"
                  onClick={() => window.open(article.url, "_blank")}>
                  {article.title}
                </h3>
              </div>
            ))}
          </div>

          {/* Arts category */}
          <div className="border-solid border-t-[2px] hidden lg:grid border-gray-900">
            <Link to='/arts' className="flex mt-3 text-[1.2rem] font-bold text-gray-900 hover:underline"> ARTS  <ChevronRight size={25} className=" mt-[2px]"/></Link>
            {/* top */}
            {artNews.slice(0, 1).map((article, index) => (
              <div key={index} className="overflow-hidden mt-4 relative">
                <img src={article.urlToImage} alt={article.title} className="w-full h-[10rem] lg:h-[13rem] object-cover hover:opacity-90 cursor-pointer" onClick={() => window.open(article.url, "_blank")} />
                <BookmarkButton article={article} />
                <h3
                  className="font-bold text-[1.1rem] my-2 hover:underline hover:cursor-pointer text-gray-900"
                  onClick={() => window.open(article.url, "_blank")}>
                  {article.title}
                </h3>
                <p className="text-gray-700 text-[0.9rem] mb-2">
                  {article.description}
                </p>
              </div>
            ))}
            {/* bottom */}
            {artNews.slice(1, 4).map((article, index) => (
              <div key={index} className="overflow-hidden my-3 border-solid border-t-[1px] border-gray-200">
                <h3
                  className="font-bold text-[1.1rem] mt-3 hover:underline hover:cursor-pointer text-gray-900"
                  onClick={() => window.open(article.url, "_blank")}>
                  {article.title}
                </h3>
              </div>
            ))}
          </div>

          {/* entertainment category */}
          <div className="border-solid border-t-[2px] border-gray-900">
            <Link to='/entertainment' className="flex mt-3 text-[1.2rem] font-bold text-gray-900 hover:underline"> ENTERTAINMENT  <ChevronRight size={25} className=" mt-[2px]"/></Link>
            {/* top */}
            {entertainment.slice(0, 1).map((article, index) => (
              <div key={index} className="overflow-hidden mt-4 relative">
                <img src={article.urlToImage} alt={article.title} className="w-full h-[10rem] lg:h-[13rem] object-cover hover:opacity-90 cursor-pointer" onClick={() => window.open(article.url, "_blank")} />
                <BookmarkButton article={article} />
                <h3
                  className="font-bold text-[1.1rem] my-2 hover:underline hover:cursor-pointer text-gray-900"
                  onClick={() => window.open(article.url, "_blank")}>
                  {article.title}
                </h3>
                <p className="text-gray-700 text-[0.9rem] mb-2">
                  {article.description}
                </p>
              </div>
            ))}
            {/* bottom */}
            {entertainment.slice(1, 4).map((article, index) => (
              <div key={index} className="overflow-hidden my-3 border-solid border-t-[1px] border-gray-200">
                <h3
                  className="font-bold text-[1.1rem] mt-3 hover:underline hover:cursor-pointer text-gray-900"
                  onClick={() => window.open(article.url, "_blank")}>
                  {article.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer/>
    </div>
  );
}

export default HomePage;