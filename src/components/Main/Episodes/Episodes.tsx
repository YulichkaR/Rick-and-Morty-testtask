import React, { useEffect, useState } from "react";
import { loadEpisode, loadSingleCharacter } from "../../../api/api";
import "./Episodes.css";
import Dropdown from "../../Dropdown/Dropdown";
import CharacterCard from "../Characters/CharacterCard/CharacterCard";

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
  location: {
    name: string;
  };
  origin: {
    name: string;
  };
}

interface EpisodeData {
  name: string;
  episode: string;
  air_date: string;
  characters: string[];
}

const Episodes: React.FC = () => {
  const [episodeNumber, setEpisodeNumber] = useState<number>(1);
  const [episodeData, setEpisodeData] = useState<EpisodeData | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getCharactersCards = async (characters: string[]) => {
    const charactersData = await Promise.all(
      characters.map(async (characterUrl) => {
        const res = await loadSingleCharacter(characterUrl);
        return res.data as Character;
      })
    );
    return charactersData;
  };

  useEffect(() => {
    setIsLoading(true);
    loadEpisode(episodeNumber).then((response) => {
      console.log(response.data);
      setEpisodeData(response.data);
      getCharactersCards(response.data.characters).then((characters) => {
        setCharacters(characters);
        setIsLoading(false);
      });
    });
  }, [episodeNumber]);

  const handleClick = (index: number) => {
    setOpen(false);
    setEpisodeNumber(index);
  };

  const characterCards = characters.map((character, index) => {
    return <CharacterCard props={character} key={index} />;
  });

  const options = [...Array(51).keys()].map((index) => {
    return (
      <li key={index} value={index + 1}>
        <button
          onClick={() => {
            handleClick(index + 1);
          }}
        >
          Episode - {index + 1}
        </button>
      </li>
    );
  });

  return (
    <div className="episodes">
      <div className="left-menu">
        {episodeData && (
          <div className="episode-info">
            <h4>{episodeData.name}</h4>
            <p>Season and episode: {episodeData.episode}</p>
            <p>Air date: {episodeData.air_date}</p>
          </div>
        )}

        <Dropdown
          elements={options}
          currentElementNumber={episodeNumber}
          open={open}
          setOpen={setOpen}
          buttonName={"Episode"}
        />
      </div>
      <div className="cards">{!isLoading && characterCards}</div>
    </div>
  );
};

export default Episodes;
