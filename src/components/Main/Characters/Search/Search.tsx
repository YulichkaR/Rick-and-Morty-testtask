import React, { ChangeEvent } from "react";
import "./Search.css";

interface SearchProps {
  setTextSearch: React.Dispatch<React.SetStateAction<string>>;
}

const Search: React.FC<SearchProps> = ({ setTextSearch }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTextSearch(event.target.value);
  };

  return (
    <>
      <div className="search__container">
        <input
          onChange={handleChange}
          className="search__input"
          type="text"
          placeholder="Search"
        />
      </div>
    </>
  );
};

export default Search;
