import { Button } from "@/app/components/Button";
import { ListItem } from "@/app/components/ListItem";
import { ListItemProps } from "@/app/types";

export const ListContainer = () => {
  const listItems: Array<ListItemProps> = [
    {
      id: "1",
      name: "test",
      url: "test",
    },
  ];
  const deleteMenuItems = (id: string) => {};

  const editItem = (item: ListItemProps) => {};

  const addMenuItem = (id: string) => {};

  return (
    <div>
      {listItems.map((item) => (
        <ListItem
          key={item.id}
          item={item}
          deleteMenuItems={deleteMenuItems}
          editItem={editItem}
          addMenuItem={addMenuItem}
        />
      ))}
      <Button onClick={() => addMenuItem("1")}>Dodaj pozycję menu</Button>
    </div>
  );
};
