import { useEffect, useMemo, useRef, useState } from "react";

function SearchableSelect({
  label,
  placeholder,
  options,
  value,
  onChange,
  disabled,
  loading,
  error,
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [highlight, setHighlight] = useState(0);
  const rootRef = useRef(null);

  const inputId = label.toLowerCase().replace(/\s+/g, "-");

  const filtered = useMemo(() => {
    if (!query.trim()) return options;
    const q = query.trim().toLowerCase();
    return options.filter((option) => option.toLowerCase().includes(q));
  }, [options, query]);

  useEffect(() => {
    function handleClick(e) {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const selectOption = (option) => {
    onChange(option);
    setOpen(false);
    setQuery("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setOpen(false);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (filtered.length > 0) {
        setHighlight((h) => (h + 1) % filtered.length);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (filtered.length > 0) {
        setHighlight((h) => (h - 1 + filtered.length) % filtered.length);
      }
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filtered[highlight]) {
        selectOption(filtered[highlight]);
      }
    }
  };

  return (
    <div className={`searchable-select${disabled ? " is-disabled" : ""}`} ref={rootRef}>
      <label htmlFor={inputId}>{label}</label>

      <button
        type="button"
        id={inputId}
        className="searchable-trigger"
        onClick={() => {
          if (!disabled) {
            setOpen((o) => !o);
            setHighlight(0);
          }
        }}
        disabled={disabled}
      >
        <span className={value ? "searchable-value" : "searchable-placeholder"}>
          {value || placeholder}
        </span>
        <svg
          className={`searchable-chevron${open ? " open" : ""}`}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div className="searchable-panel">
          <input
            type="text"
            className="searchable-input"
            placeholder="Type to search..."
            value={query}
            autoFocus
            onChange={(e) => {
              setQuery(e.target.value);
              setHighlight(0);
            }}
            onKeyDown={handleKeyDown}
          />
          <ul className="searchable-list">
            {filtered.map((option, i) => (
              <li key={option}>
                <button
                  type="button"
                  className={`searchable-option${i === highlight ? " active" : ""}${
                    option === value ? " selected" : ""
                  }`}
                  onMouseEnter={() => setHighlight(i)}
                  onClick={() => selectOption(option)}
                >
                  {option}
                </button>
              </li>
            ))}
            {filtered.length === 0 && (
              <li className="searchable-empty">No results found</li>
            )}
          </ul>
        </div>
      )}

      {loading && (
        <span className="loading-indicator">Loading cities...</span>
      )}
      {error && <p className="search-error">{error}</p>}
    </div>
  );
}

export default SearchableSelect;
