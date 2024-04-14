import { PropsWithChildren, useState } from "react";
import { MultiselectInput } from "./MultiselectInput.tsx";

export function Multiselect({
  children,
}: PropsWithChildren<Record<never, never>>) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  return (
    <div className="relative inline-block w-80 ">
      <MultiselectInput
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
