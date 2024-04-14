import { RefObject, useRef, useState } from "react";
import { MultiselectInput } from "./MultiselectInput/MultiselectInput.tsx";
import { MultiselectProps } from "./multiselect.types.ts";
import { MULTISELECT_COMPONENT_ID_FOR_FOCUS_LOCK } from "./multiselectConstants.ts";
import { MultiselectDropdownContainer } from "./MultiselectDropdownContainer.tsx";
import { useOnClickOutside } from "usehooks-ts";

export function Multiselect({
  selectedItems,
  dropdownItems,
  onRemoveSelectedItem,
  renderDropdownItems,
  isLoading,
  onSearchedTextChange,
  searchedText,
  onFetchNextPage,
}: MultiselectProps) {
  const multiselectComponentRef = useRef<HTMLDivElement>(null);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const onDropdownOpen = () => {
    setIsDropdownOpen(true);
  };
  const onDropdownClose = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div
      ref={multiselectComponentRef}
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
              onFetchNextPage={onFetchNextPage}
              renderDropdownItems={renderDropdownItems}
              isLoading={isLoading}
              dropdownItems={dropdownItems}
            />
          </div>
        </div>
      )}
      <MultiselectOutsideClickHandler
        multiselectComponentRef={multiselectComponentRef}
        onCloseDropdown={onDropdownClose}
      />
    </div>
  );
}

function MultiselectOutsideClickHandler({
  multiselectComponentRef,
  onCloseDropdown,
}: {
  multiselectComponentRef: RefObject<HTMLDivElement>;
  onCloseDropdown: () => void;
}) {
  const onClickOutside = () => {
    onCloseDropdown();
  };

  useOnClickOutside(multiselectComponentRef, onClickOutside);
  return <></>;
}
