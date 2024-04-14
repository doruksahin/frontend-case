import { ComponentProps } from "react";
import ArrowUpIcon from "../assets/arrow-up.svg";
import ArrowDownIcon from "../assets/arrow-down.svg";
import { MultiselectInputSelectedItem } from "./MultiselectInputSelectedItem.tsx";
import { Multiselect } from "./Multiselect.tsx";

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
  const onClickDropdown = () => {
    if (isDropdownOpen) {
      onCloseDropdown();
    } else {
      onOpenDropdown();
    }
  };

  return (
    <div
      className={`cursor-text rounded-xl shadow-md px-1 py-2 bg-red-300 text-[#112a44] text-sm font-medium`}
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
            value={searchedText}
            onChange={(e) => onSearchedTextChange(e.target.value)}
            className={"w-full"}
          />
        </div>

        <div className={"flex flex-col justify-end"}>
          <div
            className={"cursor-pointer bg-blue-200 w-5"}
            onClick={onClickDropdown}
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
