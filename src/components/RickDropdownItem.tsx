import { MultiselectDropdownItemProps } from "../ui-components/Multiselect/multiselect.types.ts";
import useFocusHandler from "../hooks/useFocusHandler.tsx";
import { MULTISELECT_COMPONENT_ID_FOR_FOCUS_LOCK } from "../ui-components/Multiselect/multiselectConstants.ts";
import { forwardRef } from "react";

export const RickDropdownItem = forwardRef<
  HTMLDivElement,
  MultiselectDropdownItemProps
>(
  (
    {
      description,
      id,
      isSelected,
      onSelect,
      onDeselect,
      episodePlayCount,
      image,
    }: MultiselectDropdownItemProps,
    ref,
  ) => {
    const { onKeyNavigation } = useFocusHandler(
      MULTISELECT_COMPONENT_ID_FOR_FOCUS_LOCK,
    );
    const _onSelect = () => {
      if (isSelected) {
        onDeselect(id);
      } else {
        onSelect(id);
      }
    };

    return (
      <div className={"flex gap-2 items-center p-2"} ref={ref}>
        <input
          type={"checkbox"}
          checked={isSelected}
          onChange={_onSelect}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              _onSelect();
            } else {
              onKeyNavigation(e);
            }
          }}
        />
        <img
          src={image}
          className={"rounded-md"}
          width={"30"}
          alt={"rick image"}
        />
        <div className={"flex flex-col"}>
          <span>{description}</span>
          <span
            className={"text-[#728aa7]"}
          >{`${episodePlayCount} Episode${episodePlayCount > 1 ? "s" : ""}`}</span>
        </div>
      </div>
    );
  },
);
