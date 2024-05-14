import axios, { AxiosResponse } from "axios";

interface Filters {
  status?: string;
  gender?: string;
  species?: string;
}

export const loadCharacters = async (
  pageNumber: number,
  searchText: string,
  filters: Filters
): Promise<AxiosResponse<any>> => {
  const status = filters.status ?? "";
  const gender = filters.gender ?? "";
  const species = filters.species ?? "";

  const response = await axios.get(
    `https://rickandmortyapi.com/api/character/?page=${pageNumber}&name=${searchText}&status=${status}&gender=${gender}&species=${species}`
  );
  return response;
};

export const loadEpisode = async (
  episodeNumber: number
): Promise<AxiosResponse<any>> => {
  const response = await axios.get(
    `https://rickandmortyapi.com/api/episode/${episodeNumber}`
  );
  return response;
};

export const loadSingleCharacter = async (
  link: string
): Promise<AxiosResponse<any>> => {
  const response = await axios.get(link);
  return response;
};

export const loadLocation = async (
  locationNumber: number
): Promise<AxiosResponse<any>> => {
  const response = await axios.get(
    `https://rickandmortyapi.com/api/location/${locationNumber}`
  );
  return response;
};
