import { ListItemProps } from "@/app/types";

export const ListItem = ({
  item,
  deleteMenuItems,
  editItem,
  addMenuItem,
}: {
  item: ListItemProps;
  deleteMenuItems: (id: string) => void;
  editItem: (item: ListItemProps) => void;
  addMenuItem: (id: string) => void;
}) => {
  return (
    <div>
      <div>
        <div>
          <p>{item.name}</p>
          <p> {item.url}</p>
        </div>

        <div>
          <button onClick={() => deleteMenuItems(item.id)}>Usuń</button>
          <button onClick={() => editItem(item)}>Edytuj</button>
          <button onClick={() => addMenuItem(item.id)}>
            Dodaj pozycję menu
          </button>
        </div>
      </div>
    </div>
  );
};
