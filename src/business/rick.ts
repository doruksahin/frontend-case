import { CharacterDTO } from "../api/characters.interface.ts";
import { RickCharacterProperties } from "./rick.interface.ts";
import { rickApi } from "../api/rick.ts";
import { CancelTokenSource } from "axios";

function transformRickCharacterDTOToDropdownRickCharacter(
  characterDTO: CharacterDTO,
): RickCharacterProperties {
  return {
    id: characterDTO.id,
    description: characterDTO.name,
    episodePlayCount: characterDTO.episode.length,
    image: characterDTO.image,
    isSelected: false,
  };
}

export const rickCharactersToDropdownRickCharacters = async ({
  searchedText,
  cancelTokenSource,
  page,
}: {
  searchedText: string;
  cancelTokenSource: CancelTokenSource;
  page: number;
}) => {
  const getCharactersResult = await rickApi.getCharactersByName(
    searchedText,
    page,
    {
      cancelToken: cancelTokenSource.token,
    },
  );
  return {
    dropdownCharacters:
      getCharactersResult.data &&
      Array.isArray(getCharactersResult.data.results)
        ? getCharactersResult.data.results.map(
            (character): RickCharacterProperties => {
              return transformRickCharacterDTOToDropdownRickCharacter(
                character,
              );
            },
          )
        : [],
    error: getCharactersResult.error,
  };
};
