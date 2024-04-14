import React, { PropsWithChildren, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import ArrowUpIcon from "./assets/arrow-up.svg";
import ArrowDownIcon from "./assets/arrow-down.svg";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Multiselect />
  </React.StrictMode>,
);

function Multiselect({ children }: PropsWithChildren<Record<never, never>>) {
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

function MultiselectInput({
  setIsDropdownOpen,
  isDropdownOpen,
}: {
  setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isDropdownOpen: boolean;
}) {
  return (
    <div
      className={`cursor-text rounded-xl shadow-md px-1 py-2 text-[#112a44] text-sm font-medium`}
    >
      <div className={"flex justify-between"}>
        <div className={"flex flex-wrap gap-2"}>
          <input />
        </div>

        <div className={"flex flex-col justify-end"}>
          <div
            className={"cursor-pointer h-full bg-blue-200 w-5"}
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
