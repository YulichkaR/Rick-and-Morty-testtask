import { useEffect, useState } from "react";
import React from "react";
import { loadCharacters } from "../../../api/api";
import CharacterCard from "./CharacterCard/CharacterCard";
import Search from "./Search/Search";
import Filters from "./Filters/Filters";
import Pagination from "./Pagination/Pagination";
import "./Characters.css";
import Sort from "./Sort/Sort";

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
}

const Characters: React.FC = () => {
  const [searchText, setTextSearch] = useState<string>("");
  const [filters, setFilters] = useState<{
    status: string;
    gender: string;
    species: string;
  }>({
    status: "",
    gender: "",
    species: "",
  });
  const [pages, setPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    loadCharacters(pageNumber, searchText, filters)
      .then((response) => {
        if (response.status === 200) {
          setErrorMessage("");
          setCharacters(response.data.results);
          setPages(response.data.info.pages);
        }
      })
      .catch((_) => {
        setPages(1);
        setCharacters([]);
        setErrorMessage("No data found");
      });
  }, [pageNumber, searchText, filters]);

  const cards = characters.map((character) => {
    return <CharacterCard props={character} key={character.id} />;
  });
  console.log(characters);
  // const handleSortChange = (field: string) => {
  //   // setCharacters(
  //   //   characters.sort((a: any, b: any) => (a.name > b.name ? 1 : -1))
  //   // );
  //   const sortedCharacters = [...characters].sort((a: any, b: any) =>
  //     a[field] > b[field] ? 1 : -1
  //   );
  //   setCharacters(sortedCharacters);
  // };
  return (
    <>
      <div className="container">
        <div className="utils">
          <Search setTextSearch={setTextSearch} />
          <Filters filters={filters} setFilters={setFilters} />
          <Sort characters={characters} setCharacters={setCharacters} />
        </div>
        {characters.length > 0 && !errorMessage && (
          <div className="cards">{cards}</div>
        )}
        {errorMessage && <div className="error">{errorMessage}</div>}
      </div>

      {pages && <Pagination pages={pages} setPageNumber={setPageNumber} />}
    </>
  );
};

export default Characters;
