import React, { useState } from "react";
import { FilterButton } from "../Filters/Filters";
import { Character } from "../Characters";

interface SortProps {
  characters: Character[];
  setCharacters: React.Dispatch<React.SetStateAction<Character[]>>;
}

const Sort: React.FC<SortProps> = ({ characters, setCharacters }) => {
  const [isSorted, setIsSorted] = useState(false);

  const handleSortChange = (field: string) => {
    const sortedCharacters = [...characters].sort((a: any, b: any) =>
      a[field] > b[field] ? 1 : -1
    );
    setCharacters(sortedCharacters);
    setIsSorted(!isSorted);
  };

  return (
    <div className="filters">
      <h4 className="filters__title">Sort By</h4>
      <div>
        {["Name"].map((field) => (
          <FilterButton
            key={field}
            value={field}
            onClick={() => handleSortChange(field)}
            isActive={isSorted}
          />
        ))}
      </div>
    </div>
  );
};

export default Sort;
