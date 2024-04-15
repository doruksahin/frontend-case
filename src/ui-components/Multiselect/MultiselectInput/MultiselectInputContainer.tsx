import { ComponentProps, useState } from "react";
import ArrowUpIcon from "../../../assets/arrow-up.svg";
import ArrowDownIcon from "../../../assets/arrow-down.svg";
import { MultiselectInputSelectedItem } from "./MultiselectInputSelectedItem.tsx";
import { Multiselect } from "../Multiselect.tsx";
import useFocusHandler from "../../../hooks/useFocusHandler.tsx";
import { MULTISELECT_COMPONENT_ID_FOR_FOCUS_LOCK } from "../multiselectConstants.ts";
import { useMultiselectInputFocus } from "./useMultiselectInputFocus.tsx";
import { useInputContainerFocus } from "./useInputContainerFocus.tsx";

export function MultiselectInputContainer({
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
      data-testid={"multiselect-input-container"}
      ref={inputContainerRef}
      onClick={onFocusInputContainer}
      className={`cursor-text rounded-xl shadow-md pl-1 py-1 text-[#112a44] text-sm font-medium ${isFocused ? "outline-blue-600 outline-2 outline" : "outline outline-1 outline-[#94a3b8]"}`}
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
            data-testid={"multiselect-input"}
            onBlur={onBlur}
            ref={inputRef}
            value={searchedText}
            onChange={(e) => {
              onOpenDropdown();
              onSearchedTextChange(e.target.value);
            }}
            className={`outline-none w-1/4 py-1`}
            onFocus={onOpenDropdown}
            onKeyDown={onKeyNavigation}
          />
        </div>

        <div
          className={
            "flex flex-col cursor-pointer items-center justify-center px-3"
          }
        >
          <div
            data-testid={"multiselect-dropdown-icon"}
            onClick={onClickDropdown}
            className={"min-w-4 w-4 "}
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
    </div>
  );
}
