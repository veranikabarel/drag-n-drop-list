import { ListItemProps } from "@/app/types";

export const ListItem = ({
  item,
  level,
  parentItemId,
  editItem,
  deleteMenuItems,
  addMenuItem,
  renderForm,
  editingItemId,
}: {
  item: ListItemProps;
  level: number;
  parentItemId: number | null;
  editItem: (item: ListItemProps) => void;
  deleteMenuItems: (menuItemId: number) => void;
  addMenuItem: (menuItem: ListItemProps, parentItemId: number) => void;
  renderForm: () => React.ReactNode;
  editingItemId: number | null;
}) => {
  return (
    <div>
      <div>
        <div>
          <div>
            <p>{item.name}</p>
            <p> {item.url}</p>
          </div>

          <div>
            <button onClick={() => deleteMenuItems(item.id)}>Usuń</button>
            <button onClick={() => editItem(item)}>Edytuj</button>
            <button onClick={() => addMenuItem(item, item.id)}>
              Dodaj pozycję menu
            </button>
          </div>
        </div>
      </div>
      <div>
        {(parentItemId === item.id || editingItemId === item.id) &&
          renderForm()}

        {item.children && item.children.length > 0 && (
          <div style={{ marginLeft: `${64 * Math.pow(2, level - 1)}px` }}>
            {item.children.map((child) => (
              <ListItem
                key={child.id}
                item={child}
                level={level + 1}
                parentItemId={parentItemId}
                editItem={editItem}
                deleteMenuItems={deleteMenuItems}
                addMenuItem={addMenuItem}
                renderForm={renderForm}
                editingItemId={editingItemId}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
