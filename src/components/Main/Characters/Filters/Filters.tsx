import React from "react";
import "./Filters.css";

interface FilterButtonProps {
  value: string;
  onClick: () => void;
  isActive?: boolean;
}

export const FilterButton: React.FC<FilterButtonProps> = ({
  value,
  onClick,
  isActive,
}) => {
  const buttonClass = isActive ? "active" : "";

  return (
    <button className={`Button ${buttonClass}`} onClick={onClick}>
      {value}
    </button>
  );
};

interface FiltersProps {
  filters: {
    status: string;
    gender: string;
    species: string;
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      status: string;
      gender: string;
      species: string;
    }>
  >;
}

const Filters: React.FC<FiltersProps> = ({ filters, setFilters }) => {
  const handleFilterChange = (filterType: string, value: string | null) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  return (
    <div className="filters">
      <h4 className="filters__title">Status</h4>
      <div>
        {["Alive", "Dead", "Unknown"].map((status) => (
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
      <h4 className="filters__title">Gender</h4>
      <div>
        {["Male", "Female", "Genderless", "Unknown"].map((gender) => (
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
      <h4 className="filters__title">Species</h4>
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
    </div>
  );
};

export default Filters;
