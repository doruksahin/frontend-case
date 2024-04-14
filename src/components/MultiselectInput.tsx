import React from "react";
import ArrowUpIcon from "../assets/arrow-up.svg";
import ArrowDownIcon from "../assets/arrow-down.svg";
import {
  MultiselectInputSelectedItem,
  MultiselectInputSelectedItemProps,
} from "./MultiselectInputSelectedItem.tsx";

export function MultiselectInput({
  setIsDropdownOpen,
  isDropdownOpen,
}: {
  setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isDropdownOpen: boolean;
}) {
  const selectedItems: MultiselectInputSelectedItemProps[] = [
    { description: "Rick" },
    { description: "Morty" },
  ];

  return (
    <div
      className={`cursor-text rounded-xl shadow-md px-1 py-2 text-[#112a44] text-sm font-medium`}
    >
      <div className={"flex justify-between"}>
        <div className={"flex flex-wrap gap-2"}>
          {selectedItems.map((item, index) => (
            <MultiselectInputSelectedItem
              description={item.description}
              key={index}
            />
          ))}

          <input />
        </div>

        <div className={"flex flex-col justify-end"}>
          <div
            className={"cursor-pointer bg-blue-200 w-5"}
            onClick={() => setIsDropdownOpen((prev) => !prev)}
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
