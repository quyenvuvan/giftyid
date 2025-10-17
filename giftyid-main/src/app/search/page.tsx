import { Suspense } from 'react';
import SearchResults from '@/components/search/SearchResults';

// Loading fallback
function SearchLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="animate-pulse">
        <div className="h-8 w-64 bg-gray-200 rounded mb-6"></div>
        <div className="h-4 w-32 bg-gray-200 rounded mb-8"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="bg-gray-200 h-64 rounded"></div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Server component - main page
export default function SearchPage() {
  return (
    <Suspense fallback={<SearchLoading />}>
      <SearchResults />
    </Suspense>
  );
} 