import "./Locations.css";
import React, { useEffect, useState } from "react";
import { loadLocation, loadSingleCharacter } from "../../../api/api";
import Dropdown from "../../Dropdown/Dropdown";
import CharacterCard from "../Characters/CharacterCard/CharacterCard";

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
}

interface EpisodeData {
  name: string;
  type: string;
  dimension: string;
  residents: number[];
}

const Locations: React.FC = () => {
  const [episodeNumber, setEpisodeNumber] = useState<number>(1);
  const [episodeData, setEpisodeData] = useState<EpisodeData | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getCharactersCards = async (characterIds: string[]) => {
    const charactersData = await Promise.all(
      characterIds.map(async (characterId) => {
        const res = await loadSingleCharacter(characterId);
        return await res.data;
      })
    );
    return charactersData;
  };

  useEffect(() => {
    setIsLoading(true);
    loadLocation(episodeNumber).then((response) => {
      setEpisodeData(response.data);
      getCharactersCards(response.data.residents).then((characters) => {
        setCharacters(characters);
        setIsLoading(false);
      });
    });
  }, [episodeNumber]);

  const handleClick = (index: number) => {
    setOpen(false);
    setEpisodeNumber(index);
  };

  const characterCards = characters.map((character, index) => (
    <CharacterCard props={character} key={index} />
  ));

  const options = [...Array(126).keys()].map((index) => (
    <li key={index} value={index + 1}>
      <button onClick={() => handleClick(index + 1)}>
        Location - {index + 1}
      </button>
    </li>
  ));

  return (
    <div className="episodes">
      <div className="left-menu">
        {episodeData && (
          <div className="episode-info">
            <h4>{episodeData.name}</h4>
            <p>Type: {episodeData.type}</p>
            <p>Dimension: {episodeData.dimension}</p>
          </div>
        )}

        <Dropdown
          elements={options}
          currentElementNumber={episodeNumber}
          open={open}
          setOpen={setOpen}
          buttonName={"Location"}
        />
      </div>
      <div className="cards">{!isLoading && characterCards}</div>
    </div>
  );
};

export default Locations;
