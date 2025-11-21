import React from "react";
import "./Pagination.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ page, pages, onChange }) {
  const arr = Array.from({ length: pages }, (_, i) => i + 1);

  return (
    <div className="pagination">
      {/* LEFT ARROW */}
      <button
        className="arrow"
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
      >
        <ChevronLeft size={20} />
      </button>

      {/* PAGE NUMBERS */}
      {arr.map((n) => (
        <button
          key={n}
          className={`page-btn ${n === page ? "active" : ""}`}
          onClick={() => onChange(n)}
        >
          {n}
        </button>
      ))}

      {/* RIGHT ARROW */}
      <button
        className="arrow"
        onClick={() => onChange(Math.min(pages, page + 1))}
        disabled={page === pages}
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
