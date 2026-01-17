import Link from 'next/link';

export default function Pagination({ currentPage, totalPages }: any) {
  if (totalPages <= 1) return null;

  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center mt-8">
      <nav className="inline-flex items-center space-x-1 rounded-md shadow-sm" aria-label="Pagination">
        {currentPage > 1 && (
          <Link
            href={`?page=${currentPage - 1}`}
            className="px-3 py-1.5 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            ← Prev
          </Link>
        )}

        {pageNumbers.map((page) => (
          <Link
            key={page}
            href={`?page=${page}`}
            className={`px-3 py-1.5 border border-gray-300 rounded-md ${
              page === currentPage
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            {page}
          </Link>
        ))}

        {currentPage < totalPages && (
          <Link
            href={`?page=${currentPage + 1}`}
            className="px-3 py-1.5 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Next →
          </Link>
        )}
      </nav>
    </div>
  );
}
