import { Multiselect } from "./components/Multiselect.tsx";
import { useState } from "react";
import { RickDropdownItem } from "./components/RickDropdownItem.tsx";
import { ItemBaseWithDescription, RickItem } from "./types.ts";

export function MultiselectDemo() {
  const [dropdownItems, setDropdownItems] = useState<RickItem[]>([
    { id: "0", description: "Rick", episodePlayCount: 0 },
    { id: "1", description: "Morty", episodePlayCount: 0 },
    { id: "2", description: "Summer", episodePlayCount: 0 },
    { id: "3", description: "Beth", episodePlayCount: 0 },
  ]);
  const [selectedItems, setSelectedItems] = useState<ItemBaseWithDescription[]>(
    [
      { id: "0", description: "Rick" },
      { id: "1", description: "Morty" },
    ],
  );

  const [searchedText, setSearchedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onRemoveSelectedItem = (id: string) => {
    setSelectedItems((prev) => prev.filter((item) => item.id !== id));
  };

  const onSearchedTextChange = (searchedText: string) => {
    setSearchedText(searchedText);
    setIsLoading(true);
    setTimeout(() => {
      setDropdownItems(
        dropdownItems.filter((item) =>
          item.description.toLowerCase().includes(searchedText.toLowerCase()),
        ),
      );
      setIsLoading(false);
    }, 1000);
  };

  const onFetchNextPage = () => {
    setIsLoading(true);
    setTimeout(() => {
      setDropdownItems((prev) => [...prev]);
      setIsLoading(false);
    }, 1000);
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
          renderDropdownItems={({ id }) => {
            const dropdownItem = dropdownItems.find((item) => item.id === id);
            const isSelected = selectedItems.some((item) => item.id === id);
            if (!dropdownItem) return <></>;
            return (
              <RickDropdownItem
                key={id}
                {...dropdownItem}
                isSelected={isSelected}
                onSelect={onSelect}
                onDeselect={onUnselect}
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
