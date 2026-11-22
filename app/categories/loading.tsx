export default function CategoriesLoading() {
  return (
    <main className="min-h-screen bg-slate-950">
      {/* Header skeleton */}
      <div className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="h-4 w-32 bg-slate-800 rounded animate-pulse mb-3" />
          <div className="h-8 w-64 bg-slate-800 rounded animate-pulse mb-2" />
          <div className="h-4 w-96 bg-slate-800 rounded animate-pulse" />
        </div>
      </div>

      {/* Grid skeleton */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col items-center animate-pulse"
            >
              <div className="w-20 h-20 rounded-2xl bg-slate-800 mb-4" />
              <div className="h-5 w-32 bg-slate-800 rounded mb-2" />
              <div className="h-4 w-20 bg-slate-800 rounded" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
