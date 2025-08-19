// src/components/SearchBox.jsx
import React from "react";

const SearchBox = ({ value, onChange, name }) => {
  return (
    <div className="max-w-md mx-auto mb-8">
      <input
        type="text"
        placeholder={`Tìm theo tên ${name}...`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-300 rounded px-4 py-2 shadow-sm focus:outline-none focus:ring focus:border-yellow-500"
      />
    </div>
  );
};

export default SearchBox;
