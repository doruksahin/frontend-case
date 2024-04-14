import { PaginationInfo } from "./rick.interface.ts";

export type CharacterDTO = {
  id: string;
  name: string;
  episode: string[];
  image: string;
};
export type GetCharactersDTO = {
  info: PaginationInfo;
  results: CharacterDTO[];
} | null;
