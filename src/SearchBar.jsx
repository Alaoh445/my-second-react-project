import { useState } from "react";
import './index.css'
import { FaSearch, FaTimes } from "react-icons/fa"; // icons

function SearchBar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="search-container">
      {open ? (
        <div className="search-expanded">
          <input
            type="text"
            placeholder="Search posts..."
            className="search-input"
          />
          <button onClick={() => setOpen(false)} className="close-btn">
            <FaTimes />
          </button>
        </div>
      ) : (
        <button onClick={() => setOpen(true)} className="search-btn">
          <FaSearch />
        </button>
      )}
    </div>
  );
}

export default SearchBar;
