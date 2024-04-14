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
    <Multiselect
      selectedItems={selectedItems}
      onRemoveSelectedItem={onRemoveSelectedItem}
    />
  );
}
