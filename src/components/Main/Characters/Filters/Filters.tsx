import React from "react";
import "./Filters.css";

interface FilterButtonProps {
  value: string;
  onClick: () => void;
  isActive: boolean;
}

const FilterButton: React.FC<FilterButtonProps> = ({
  value,
  onClick,
  isActive,
}) => {
  const buttonClass = isActive ? "active" : "";

  return (
    <button className={buttonClass} onClick={onClick}>
      {value}
    </button>
  );
};

interface FiltersProps {
  filters: {
    status: string;
    gender: string;
    species: string;
    sortBy?: { field: string; order: string };
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      status: string;
      gender: string;
      species: string;
      sortBy?: { field: string; order: string };
    }>
  >;
  handleSortChange: any;
}

const Filters: React.FC<FiltersProps> = ({
  filters,
  setFilters,
  handleSortChange,
}) => {
  const handleFilterChange = (filterType: string, value: string | null) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  return (
    <div className="filters">
      <h4>Status</h4>
      <div>
        {["alive", "dead", "unknown"].map((status) => (
          <FilterButton
            key={status}
            value={status}
            onClick={() =>
              handleFilterChange(
                "status",
                filters.status === status ? null : status
              )
            }
            isActive={filters.status === status}
          />
        ))}
      </div>
      <h4>Gender</h4>
      <div>
        {["male", "female", "genderless", "unknown"].map((gender) => (
          <FilterButton
            key={gender}
            value={gender}
            onClick={() =>
              handleFilterChange(
                "gender",
                filters.gender === gender ? null : gender
              )
            }
            isActive={filters.gender === gender}
          />
        ))}
      </div>
      <h4>Species</h4>
      <div>
        {[
          "Human",
          "Alien",
          "Humanoid",
          "Poopybutthole",
          "Mythological",
          "Animal",
          "Robot",
          "Cronenberg",
          "Planet",
          "Disease",
          "Unknown",
        ].map((species) => (
          <FilterButton
            key={species}
            value={species}
            onClick={() =>
              handleFilterChange(
                "species",
                filters.species === species ? null : species
              )
            }
            isActive={filters.species === species}
          />
        ))}
      </div>
      <h4>Sort By</h4>
      <div>
        {["Status"].map((field) => (
          <FilterButton
            key={field}
            value={field}
            onClick={() => handleSortChange(field)}
            isActive={filters.sortBy?.field === field}
          />
        ))}
      </div>
    </div>
  );
};

export default Filters;