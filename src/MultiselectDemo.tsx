import { Multiselect } from "./ui-components/Multiselect/Multiselect.tsx";
import { useEffect, useRef, useState } from "react";
import { RickDropdownItem } from "./components/RickDropdownItem.tsx";
import { ItemBaseWithDescription } from "./ui-components/Multiselect/multiselect.types.ts";
import { rickCharactersToDropdownRickCharacters } from "./business/rick.ts";
import axios, { AxiosError, CanceledError, CancelTokenSource } from "axios";
import { RickCharacterProperties } from "./business/rick.interface.ts";
import { toast } from "react-toastify";

export function MultiselectDemo() {
  const [dropdownItems, setDropdownItems] = useState<RickCharacterProperties[]>(
    [],
  );
  const [selectedItems, setSelectedItems] = useState<ItemBaseWithDescription[]>(
    [],
  );
  const cancelTokenSource = useRef<CancelTokenSource | null>(null);

  const [searchedText, setSearchedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    onSearchedTextChange("");
  }, []);

  const onRemoveSelectedItem = (id: string) => {
    setSelectedItems((prev) => prev.filter((item) => item.id !== id));
  };

  async function onSearchedTextChange(searchedText: string) {
    setIsLoading(true);
    setSearchedText(searchedText);
    if (cancelTokenSource.current) {
      cancelTokenSource.current.cancel();
    }
    cancelTokenSource.current = axios.CancelToken.source();

    const { dropdownCharacters, error } =
      await rickCharactersToDropdownRickCharacters({
        searchedText,
        page: currentPage,
        cancelTokenSource: cancelTokenSource.current,
      });
    if (error instanceof CanceledError) {
      setIsLoading(false);
      toast(error.message, {
        type: "error",
      });
      return;
    } else if (error instanceof AxiosError) {
      const requestError = error.request;
      if (requestError instanceof XMLHttpRequest) {
        toast(requestError.response, {
          type: "error",
        });
      } else {
        toast("Unknown error", {
          type: "error",
        });
      }
      setDropdownItems([]);
      setCurrentPage(1);
      setIsLoading(false);
      return;
    }
    setDropdownItems(dropdownCharacters);
    setCurrentPage(1);
    setIsLoading(false);
  }

  const onFetchNextPage = async () => {
    //setIsLoadingMore(true);
    setSearchedText(searchedText);
    if (cancelTokenSource.current) {
      cancelTokenSource.current.cancel();
    }
    cancelTokenSource.current = axios.CancelToken.source();

    const { dropdownCharacters, error } =
      await rickCharactersToDropdownRickCharacters({
        searchedText,
        page: currentPage + 1,
        cancelTokenSource: cancelTokenSource.current,
      });
    if (error instanceof CanceledError) {
      //setIsLoadingMore(false);
      return;
    } else if (error instanceof AxiosError) {
      const requestError = error.request;
      if (requestError instanceof XMLHttpRequest) {
        toast(requestError.response, {
          type: "error",
        });
      } else {
        toast("Unknown error", {
          type: "error",
        });
      }
      return;
    }
    setDropdownItems((prev) => [...prev, ...dropdownCharacters]);
    setCurrentPage((prev) => prev + 1);
    // setIsLoadingMore(false);
  };

  const onSelect = (selectedItemId: string) => {
    const newItem = dropdownItems.find((item) => item.id === selectedItemId);
    if (!newItem) return;
    setSelectedItems((prev) => [...prev, newItem]);
  };

  const onUnselect = (selectedItemId: string) => {
    setSelectedItems((prev) =>
      prev.filter((item) => item.id !== selectedItemId),
    );
  };

  return (
    <div className={"flex justify-center mt-5"}>
      <div className={"flex gap-4 items-center flex-col w-80"}>
        <span className={"text-xl font-bold"}>Rick-o-picker</span>
        <Multiselect
          searchedText={searchedText}
          onSearchedTextChange={onSearchedTextChange}
          onFetchNextPage={onFetchNextPage}
          isLoading={isLoading}
          renderDropdownItems={({ id, potentialLastListElementRef }) => {
            const dropdownItem = dropdownItems.find((item) => item.id === id);
            const isSelected = selectedItems.some((item) => item.id === id);
            if (!dropdownItem) return <></>;
            return (
              <RickDropdownItem
                ref={potentialLastListElementRef}
                key={id}
                {...dropdownItem}
                isSelected={isSelected}
                onSelect={onSelect}
                onDeselect={onUnselect}
                searchedText={searchedText}
              />
            );
          }}
          dropdownItems={dropdownItems}
          selectedItems={selectedItems}
          onRemoveSelectedItem={onRemoveSelectedItem}
        />
      </div>
    </div>
  );
}
