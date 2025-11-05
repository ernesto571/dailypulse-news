const NewsCardSkeleton = () => {
    return (
      <div className="border rounded-lg p-4 animate-pulse">
        {/* Image skeleton */}
        <div className="w-full h-[10rem] bg-gray-300 rounded-md mb-4"></div>
        
        {/* Title skeleton */}
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
        
        {/* Description skeleton */}
        <div className="h-3 bg-gray-300 rounded w-full mb-2"></div>
        <div className="h-3 bg-gray-300 rounded w-5/6 mb-2"></div>
        
        {/* Footer skeleton */}
        <div className="flex justify-between items-center">
          <div className="h-3 bg-gray-300 rounded w-24"></div>
          <div className="h-3 bg-gray-300 rounded w-16"></div>
        </div>
      </div>
    );
  };

export default NewsCardSkeleton  