import { ComponentProps, useEffect, useRef, useState } from "react";
import ArrowUpIcon from "../assets/arrow-up.svg";
import ArrowDownIcon from "../assets/arrow-down.svg";
import { MultiselectInputSelectedItem } from "./MultiselectInputSelectedItem.tsx";
import { Multiselect } from "./Multiselect.tsx";
import useFocusHandler from "../hooks/useFocusHandler.tsx";
import { MULTISELECT_COMPONENT_ID_FOR_FOCUS_LOCK } from "./multiselectConstants.ts";

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

  const onClickDropdown = () => {
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
      className={`cursor-text rounded-xl shadow-md px-1 py-2 text-[#112a44] text-sm font-medium ${isFocused ? "outline-blue-600 outline-2 outline" : "outline outline-1 outline-[#94a3b8]"}`}
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
            className={`py-1 outline-none`}
            onFocus={onOpenDropdown}
            onKeyDown={onKeyNavigation}
          />
        </div>

        <div
          onClick={onClickDropdown}
          className={
            "min-w-5 w-5 flex flex-col cursor-pointer items-center  justify-center"
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

export function useInputContainerFocus({
  onFocusLost,
}: {
  onFocusLost: () => void;
}) {
  const inputContainerRef = useRef<HTMLDivElement>(null);
  const onBlur = () => {
    onFocusLost();
  };

  return { inputContainerRef, onBlur };
}

export function useMultiselectInputFocus({
  onInputFocus,
  onInputFocusLost,
  onOpenDropdown,
}: {
  onInputFocusLost: () => void;
  onInputFocus: () => void;
  onOpenDropdown: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const onFocusInputContainer = () => {
    onInputFocus();
    if (!inputRef.current) return;
    inputRef.current.focus();
    onOpenDropdown();
  };

  useEffect(() => {
    const onFocusInput = () => {
      onInputFocus();
      onOpenDropdown();
    };

    const onFocusInputLost = () => {
      onInputFocusLost();
    };

    const inputElement = inputRef.current;
    if (!inputElement) return;
    inputElement.addEventListener("focusin", onFocusInput);
    inputElement.addEventListener("focusout", onFocusInputLost);
    return () => {
      inputElement.removeEventListener("focusin", onFocusInput);
      inputElement.removeEventListener("focusout", onFocusInputLost);
    };
  }, []);

  return { inputRef, onFocusInputContainer };
}
