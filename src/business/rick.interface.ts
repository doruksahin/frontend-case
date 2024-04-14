import { BaseDropdownItem } from "../api/rick.interface.ts";
import { CharacterDTO } from "../api/characters.interface.ts";

export type RickCharacterProperties = {
  episodePlayCount: number;
  image: CharacterDTO["image"];
} & BaseDropdownItem;
