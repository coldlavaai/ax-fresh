export function LoadingSkeleton() {
  return (
    <div className="w-full">
      <div className="animate-pulse space-y-8">
        {/* Hero Skeleton */}
        <div className="h-screen bg-gradient-to-b from-gray-200 to-gray-300" />

        {/* Content Sections Skeleton */}
        <div className="max-w-7xl mx-auto px-6 space-y-20 py-20">
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto" />
            <div className="h-4 bg-gray-100 rounded w-2/3 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-gray-200 rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full border-4 border-sunset-500/20 border-t-sunset-500 animate-spin" />
        <p className="text-text-secondary font-medium">Loading your dream trip...</p>
      </div>
    </div>
  );
}
