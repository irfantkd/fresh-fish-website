export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <span className="h-10 w-10 animate-spin rounded-full border-2 border-ocean-100 border-t-aqua-500" />
        <p className="text-sm text-gray-400">Loading fresh catches...</p>
      </div>
    </div>
  );
}
