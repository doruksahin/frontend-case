import { ComponentProps, useState } from "react";
import ArrowUpIcon from "../../../assets/arrow-up.svg";
import ArrowDownIcon from "../../../assets/arrow-down.svg";
import { MultiselectInputSelectedItem } from "./MultiselectInputSelectedItem.tsx";
import { Multiselect } from "../Multiselect.tsx";
import useFocusHandler from "../../../hooks/useFocusHandler.tsx";
import { MULTISELECT_COMPONENT_ID_FOR_FOCUS_LOCK } from "../multiselectConstants.ts";
import { useMultiselectInputFocus } from "./useMultiselectInputFocus.tsx";
import { useInputContainerFocus } from "./useInputContainerFocus.tsx";

export function MultiselectInput({
  isDropdownOpen,
  onOpenDropdown,
  onCloseDropdown,
  selectedItems,
  onRemoveSelectedItem,
  searchedText,
  onSearchedTextChange,
}: {
  isDropdownOpen: boolean;
  onOpenDropdown: () => void;
  onCloseDropdown: () => void;
  searchedText: string;
  onSearchedTextChange: (searchedText: string) => void;
} & Pick<
  ComponentProps<typeof Multiselect>,
  "selectedItems" | "onRemoveSelectedItem"
>) {
  const { onKeyNavigation } = useFocusHandler(
    MULTISELECT_COMPONENT_ID_FOR_FOCUS_LOCK,
  );
  const [isFocused, setIsFocused] = useState(false);
  const { inputContainerRef, onBlur } = useInputContainerFocus({
    onFocusLost: onInputFocusLost,
  });
  const { inputRef, onFocusInputContainer } = useMultiselectInputFocus({
    onInputFocus,
    onInputFocusLost,
    onOpenDropdown,
  });

  function onInputFocusLost() {
    setIsFocused(false);
  }

  function onInputFocus() {
    setIsFocused(true);
  }

  const onClickDropdown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!e) return;
    e.stopPropagation();
    if (isDropdownOpen) {
      onCloseDropdown();
    } else {
      onOpenDropdown();
    }
  };

  return (
    <div
      ref={inputContainerRef}
      onClick={onFocusInputContainer}
      className={`cursor-text rounded-xl shadow-md px-1 py-1 text-[#112a44] text-sm font-medium ${isFocused ? "outline-blue-600 outline-2 outline" : "outline outline-1 outline-[#94a3b8]"}`}
    >
      <div className={"flex justify-between"}>
        <div className={"flex flex-wrap gap-2"}>
          {selectedItems.map((item, index) => (
            <MultiselectInputSelectedItem
              {...item}
              key={index}
              onRemove={onRemoveSelectedItem}
            />
          ))}

          <input
            onBlur={onBlur}
            ref={inputRef}
            value={searchedText}
            onChange={(e) => {
              onOpenDropdown();
              onSearchedTextChange(e.target.value);
            }}
            className={`outline-none w-1/4 bg-red-300`}
            onFocus={onOpenDropdown}
            onKeyDown={onKeyNavigation}
          />
        </div>

        <div
          onClick={onClickDropdown}
          className={
            "min-w-5 w-5 flex flex-col cursor-pointer items-center mr-1 justify-center"
          }
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (isDropdownOpen) {
                onCloseDropdown();
              } else {
                onOpenDropdown();
              }
            } else {
              onKeyNavigation(e);
            }
          }}
        >
          <img
            src={isDropdownOpen ? ArrowUpIcon : ArrowDownIcon}
            alt={"arrow down"}
          />
        </div>
      </div>
    </div>
  );
}
