import { useState } from "react";
import { MultiselectInput } from "./MultiselectInput.tsx";
import { ItemBase, ItemBaseWithDescription } from "../types.ts";
import LoadingSpinner from "./LoadingSpinner/LoadingSpinner.tsx";
import { MULTISELECT_COMPONENT_ID_FOR_FOCUS_LOCK } from "./multiselectConstants.ts";

type MultiselectProps = {
  selectedItems: ItemBaseWithDescription[];
  dropdownItems: ItemBaseWithDescription[];
  renderDropdownItems: (args: ItemBase) => JSX.Element;
  isLoading: boolean;
  onRemoveSelectedItem: (id: string) => void;
  onFetchNextPage: () => void;
  searchedText: string;
  onSearchedTextChange: (searchedText: string) => void;
};

export function Multiselect({
  selectedItems,
  dropdownItems,
  onRemoveSelectedItem,
  renderDropdownItems,
  isLoading,
  onSearchedTextChange,
  searchedText,
  onFetchNextPage: _onFetchNextPage,
}: MultiselectProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const onDropdownOpen = () => {
    setIsDropdownOpen(true);
  };
  const onDropdownClose = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div
      className="relative w-full"
      id={MULTISELECT_COMPONENT_ID_FOR_FOCUS_LOCK}
    >
      <MultiselectInput
        onSearchedTextChange={onSearchedTextChange}
        searchedText={searchedText}
        onRemoveSelectedItem={onRemoveSelectedItem}
        selectedItems={selectedItems}
        isDropdownOpen={isDropdownOpen}
        onCloseDropdown={onDropdownClose}
        onOpenDropdown={onDropdownOpen}
      />
      {isDropdownOpen && (
        <div
          className="absolute right-0 mt-2 w-full rounded-lg shadow-lg border border-[#94a3b8] text-sm"
          role="menu"
        >
          <div
            className="flex flex-col divide-y divide-[#8597af] max-h-80 overflow-y-auto"
            role="none"
          >
            <MultiselectDropdownContainer
              renderDropdownItems={renderDropdownItems}
              isLoading={isLoading}
              dropdownItems={dropdownItems}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function MultiselectDropdownContainer({
  isLoading,
  dropdownItems,
  renderDropdownItems,
}: Pick<
  MultiselectProps,
  "isLoading" | "dropdownItems" | "renderDropdownItems"
>) {
  if (isLoading) {
    return (
      <div className={"flex justify-center items-center h-16"}>
        <LoadingSpinner />
      </div>
    );
  } else if (dropdownItems.length === 0) {
    return (
      <div className={"flex justify-center items-center h-16"}>
        <span className={"text-[#112a44] text-sm font-medium"}>
          No results found
        </span>
      </div>
    );
  } else {
    return dropdownItems.map((item) =>
      renderDropdownItems({
        id: item.id,
      }),
    );
  }
}
