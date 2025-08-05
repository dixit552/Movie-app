import React from "react";

const SearchBox = ({ value, setSearchValue }) => {
  return (
    <input
      className="search-box"
      value={value}
      onChange={(e) => setSearchValue(e.target.value)}
      placeholder="Search for movies..."
    />
  );
};

export default SearchBox;
