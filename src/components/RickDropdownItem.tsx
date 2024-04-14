import { MultiselectDropdownItemProps } from "../types.ts";

export function RickDropdownItem({
  description,
  id,
  isSelected,
  onSelect,
  onDeselect,
  episodePlayCount,
}: MultiselectDropdownItemProps) {
  const _onSelect = () => {
    if (isSelected) {
      onDeselect(id);
    } else {
      onSelect(id);
    }
  };

  return (
    <div className={"flex gap-2 items-center p-2"}>
      <input type={"checkbox"} checked={isSelected} onChange={_onSelect} />
      <img className={"rounded-md"} width={"30"} alt={"rick image"} />
      <div className={"flex flex-col"}>
        <span>{description}</span>
        <span
          className={"text-[#728aa7]"}
        >{`${episodePlayCount} Episode${episodePlayCount > 1 ? "s" : ""}`}</span>
      </div>
    </div>
  );
}
