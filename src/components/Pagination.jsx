export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center mt-6 gap-4">
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="px-4 py-2 bg-gray-600 rounded-lg text-white disabled:opacity-50"
      >
        ◀ Anterior
      </button>
      <span className="text-white">
        Página {page} de {totalPages}
      </span>
      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="px-4 py-2 bg-gray-600 rounded-lg text-white disabled:opacity-50"
      >
        Siguiente ▶
      </button>
    </div>
  );
}
