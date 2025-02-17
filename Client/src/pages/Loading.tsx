

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[2px] z-50">
      <div className="bg-white p-8 rounded-lg shadow-2xl flex flex-col items-center gap-4">
        <div className="relative w-20 h-20">
          {/* Outer spinning circle */}
          <div className="absolute inset-0 border-4 border-t-primary-red border-r-primary-red border-b-transparent border-l-transparent rounded-full animate-spin"></div>
          {/* Inner spinning circle */}
          <div className="absolute inset-2 border-4 border-t-transparent border-r-transparent border-b-primary-red border-l-primary-red rounded-full animate-spin-reverse"></div>
        </div>
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-700 animate-pulse">
            Loading...
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Please wait while we process your request
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loading;