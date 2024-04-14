import { Multiselect } from "./components/Multiselect.tsx";
import { useState } from "react";

export function MultiselectDemo() {
  const [selectedItems, setSelectedItems] = useState([
    { id: "0", description: "Rick" },
    { id: "1", description: "Morty" },
  ]);
  const onRemoveSelectedItem = (id: string) => {
    setSelectedItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className={"flex justify-center mt-5"}>
      <div className={"flex gap-4 items-center flex-col"}>
        <span className={"text-xl font-bold"}>Rick-o-picker</span>
        <Multiselect
          selectedItems={selectedItems}
          onRemoveSelectedItem={onRemoveSelectedItem}
        />
      </div>
    </div>
  );
}
