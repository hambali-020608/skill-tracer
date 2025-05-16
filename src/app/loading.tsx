export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="relative">
        {/* Outer circle */}
        <div className="w-16 h-16 border-4 border-gray-700 rounded-full">
          {/* Animated spinner */}
          <div className="absolute top-0 left-0 w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
        {/* App initials in center */}
        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-green-400 font-bold">ST</span>
      </div>
    </div>
  );
}