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
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-[6px]">
          <p className="text-sm font-semibold text-text-primary">{item.name}</p>
          <p className="text-sm font-normal text-text-tertiary">{item.url}</p>
        </div>

        <div>
          <button
            className="border-collapse rounded-l border border-border-primary bg-button-secondary px-4 py-[10px] text-sm font-semibold"
            onClick={() => deleteMenuItems(item.id)}
          >
            Usuń
          </button>
          <button
            className="border-collapse border border-border-primary bg-button-secondary px-4 py-[10px] text-sm font-semibold"
            onClick={() => editItem(item)}
          >
            Edytuj
          </button>
          <button
            className="border-collapse rounded-r border border-border-primary bg-button-secondary px-4 py-[10px] text-sm font-semibold"
            onClick={() => addMenuItem(item, item.id)}
          >
            Dodaj pozycję menu
          </button>
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
