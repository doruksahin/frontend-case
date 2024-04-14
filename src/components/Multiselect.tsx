import { PropsWithChildren, useState } from "react";
import { MultiselectInput } from "./MultiselectInput.tsx";
import { MultiselectInputSelectedItemProps } from "./MultiselectInputSelectedItem.tsx";

type MultiselectProps = {
  selectedItems: MultiselectInputSelectedItemProps[];
  onRemoveSelectedItem: (id: string) => void;
};

export function Multiselect({
  children,
  selectedItems,
  onRemoveSelectedItem,
}: PropsWithChildren<MultiselectProps>) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  return (
    <div className="relative inline-block w-80 ">
      <MultiselectInput
        onRemoveSelectedItem={onRemoveSelectedItem}
        selectedItems={selectedItems}
        setIsDropdownOpen={setIsDropdownOpen}
        isDropdownOpen={isDropdownOpen}
      />
      {isDropdownOpen && (
        <div
          className="absolute right-0 mt-2 w-80 rounded-lg shadow-lg border border-[#94a3b8] text-sm"
          role="menu"
        >
          <div
            className="flex flex-col divide-y divide-[#8597af] h-80 overflow-y-auto"
            role="none"
          >
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
