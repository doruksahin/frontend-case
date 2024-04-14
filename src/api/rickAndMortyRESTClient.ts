import axios from "axios";

export const rickAndMortyRESTClient = axios.create({
  baseURL: "https://rickandmortyapi.com/api",
});
