export default function CategoryLoading() {
  return (
    <main className="min-h-screen bg-slate-950">
      {/* Header skeleton */}
      <div className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="h-4 w-40 bg-slate-800 rounded animate-pulse mb-3" />
          <div className="h-8 w-64 bg-slate-800 rounded animate-pulse" />
        </div>
      </div>

      {/* Grid skeleton */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden animate-pulse"
            >
              <div className="aspect-square bg-slate-700" />
              <div className="p-3 space-y-2">
                <div className="h-4 bg-slate-700 rounded w-3/4" />
                <div className="h-4 bg-slate-700 rounded w-1/2" />
                <div className="h-8 bg-slate-700 rounded mt-3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
