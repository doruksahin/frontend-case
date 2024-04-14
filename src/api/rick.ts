import { rickAndMortyRESTClient } from "./rickAndMortyRESTClient.ts";
import { GetCharactersDTO } from "./characters.interface.ts";
import { AxiosRequestConfig } from "axios";

export const rickApi = {
  getCharactersByName,
};

async function getCharactersByName(
  searchedText: string,
  page: number,
  config: AxiosRequestConfig,
) {
  const params = new URLSearchParams();
  if (searchedText !== "") {
    params.append("name", searchedText);
  }
  params.append("page", page.toString());

  try {
    const res = await rickAndMortyRESTClient.get<GetCharactersDTO>(
      `character`,
      { ...config, params },
    );
    return { data: res.data, error: null };
  } catch (e) {
    return { data: null, error: e };
  }
}
