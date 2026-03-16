export default function BrandCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="relative bg-slate-200 rounded-xl overflow-hidden border border-slate-300 h-64">
        <div className="absolute top-4 right-4 z-10 h-6 w-20 bg-slate-400 rounded-full" />
        <div className="h-32 bg-slate-300 flex items-center justify-center">
          <div className="w-24 h-20 bg-slate-400 rounded" />
        </div>
        <div className="p-4 space-y-3">
          <div className="h-4 w-3/4 bg-slate-300 rounded" />
          <div className="h-3 w-full bg-slate-300 rounded" />
          <div className="h-3 w-1/2 bg-slate-300 rounded" />
        </div>
      </div>
    </div>
  );
}
