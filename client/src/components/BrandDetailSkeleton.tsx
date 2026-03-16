export default function BrandDetailSkeleton() {
  return (
    <div className="animate-pulse">
      <section className="relative py-20 lg:py-28 bg-gradient-to-r from-slate-200 to-slate-100">
        <div className="container">
          <div className="h-4 w-32 bg-slate-300 rounded mb-8" />
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
            <div className="w-44 h-44 lg:w-54 lg:h-54 bg-slate-300 rounded-2xl flex-shrink-0" />
            <div className="flex-1">
              <div className="h-6 w-24 bg-slate-300 rounded-full mb-4" />
              <div className="space-y-3 mb-6">
                <div className="h-10 w-3/4 bg-slate-300 rounded" />
                <div className="h-6 w-full bg-slate-300 rounded" />
              </div>
              <div className="flex flex-wrap gap-3">
                <div className="h-10 w-32 bg-slate-300 rounded-full" />
                <div className="h-10 w-40 bg-slate-300 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              <div>
                <div className="h-8 w-48 bg-slate-300 rounded mb-4" />
                <div className="space-y-3">
                  <div className="h-4 w-full bg-slate-200 rounded" />
                  <div className="h-4 w-full bg-slate-200 rounded" />
                  <div className="h-4 w-3/4 bg-slate-200 rounded" />
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="h-6 w-32 bg-slate-300 rounded" />
              <div className="space-y-3">
                <div className="h-4 w-full bg-slate-200 rounded" />
                <div className="h-4 w-3/4 bg-slate-200 rounded" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
