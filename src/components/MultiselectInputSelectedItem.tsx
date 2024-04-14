import RemoveIcon from "../assets/close.svg";
import { ComponentProps } from "react";
import { Multiselect } from "./Multiselect.tsx";

export type MultiselectInputSelectedItemProps = {
  id: string;
  description: string;
};

export function MultiselectInputSelectedItem({
  description,
  id,
  onRemove,
}: MultiselectInputSelectedItemProps & {
  onRemove: ComponentProps<typeof Multiselect>["onRemoveSelectedItem"];
}) {
  return (
    <div
      className={"flex gap-1 items-center bg-[#e2e8f0] px-2 py-1 rounded-lg"}
    >
      <span>{description}</span>
      <div
        tabIndex={0}
        className={"rounded-md cursor-pointer bg-[#94a3b8] w-5"}
        onClick={() => onRemove(id)}
      >
        <img src={RemoveIcon} alt={"remove item"} />
      </div>
    </div>
  );
}
