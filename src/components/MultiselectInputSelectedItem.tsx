import RemoveIcon from "../assets/close.svg";

export type MultiselectInputSelectedItemProps = {
  description: string;
};

export function MultiselectInputSelectedItem({
  description,
}: MultiselectInputSelectedItemProps) {
  const onRemove = () => {
    console.log("remove item");
  };

  return (
    <div
      className={"flex gap-1 items-center bg-[#e2e8f0] px-2 py-1 rounded-lg"}
    >
      <span>{description}</span>
      <div
        tabIndex={0}
        className={"rounded-md cursor-pointer bg-[#94a3b8] w-5"}
        onClick={onRemove}
      >
        <img src={RemoveIcon} alt={"remove item"} />
      </div>
    </div>
  );
}
