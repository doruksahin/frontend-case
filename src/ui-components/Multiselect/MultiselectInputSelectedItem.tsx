import RemoveIcon from "../../assets/close.svg";
import { ComponentProps } from "react";
import { Multiselect } from "./Multiselect.tsx";
import useFocusHandler from "../../hooks/useFocusHandler.tsx";
import { MULTISELECT_COMPONENT_ID_FOR_FOCUS_LOCK } from "./multiselectConstants.ts";

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
  const { onKeyNavigation } = useFocusHandler(
    MULTISELECT_COMPONENT_ID_FOR_FOCUS_LOCK,
  );
  return (
    <div
      className={"flex gap-1 items-center bg-[#e2e8f0] px-2 py-1 rounded-lg"}
    >
      <span>{description}</span>
      <div
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onRemove(id);
          } else {
            onKeyNavigation(e);
          }
        }}
        tabIndex={0}
        className={"rounded-md cursor-pointer bg-[#94a3b8] w-5"}
        onClick={() => onRemove(id)}
      >
        <img src={RemoveIcon} alt={"remove item"} />
      </div>
    </div>
  );
}
