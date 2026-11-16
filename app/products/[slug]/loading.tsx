export default function ProductLoading() {
  return (
    <div className="wrap py-6 sm:py-10" aria-label="Loading product">
      <div className="grid animate-pulse gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="aspect-square rounded-3xl bg-lilac-deep" />
        <div className="space-y-4">
          <div className="h-10 w-3/4 rounded bg-lilac-deep" />
          <div className="h-5 w-1/2 rounded bg-lilac-deep" />
          <div className="h-24 rounded bg-lilac-deep" />
          <div className="h-12 w-full rounded-full bg-lilac-deep" />
        </div>
      </div>
    </div>
  );
}
