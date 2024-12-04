"use client";

import { ListItemProps } from "@/app/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const ListItem = ({
  item,
  level,
  isFirstItem = false,
  parentItemId,
  editItem,
  deleteListItems,
  addListItem,
  renderForm,
  editingItemId,
}: {
  item: ListItemProps;
  level: number;
  isFirstItem?: boolean;
  parentItemId: number | null;
  editItem: (item: ListItemProps) => void;
  deleteListItems: (listItemId: number) => void;
  addListItem: (listItem: ListItemProps, parentItemId: number) => void;
  renderForm: () => React.ReactNode;
  editingItemId: number | null;
}) => {
  const getBorderClasses = () => {
    if (level === 0) {
      if (isFirstItem) {
        return "rounded-t-md border-t";
      }
      return "";
    }
    return "rounded-bl-md";
  };

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <div
        className={`w-100 flex justify-between ${getBorderClasses()} border border-border-secondary bg-bg-primary p-5`}
      >
        <div className="flex items-center gap-2">
          <svg
            {...attributes}
            {...listeners}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="cursor-move"
          >
            <g clipPath="url(#clip0_3223_384)">
              <path
                d="M4.16667 7.50002L1.66667 10M1.66667 10L4.16667 12.5M1.66667 10H18.3333M7.5 4.16669L10 1.66669M10 1.66669L12.5 4.16669M10 1.66669V18.3334M12.5 15.8334L10 18.3334M10 18.3334L7.5 15.8334M15.8333 7.50002L18.3333 10M18.3333 10L15.8333 12.5"
                stroke="currentColor"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_3223_384">
                <rect width="20" height="20" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <div className="flex flex-col gap-[6px]">
            <p className="text-sm font-semibold text-text-primary">
              {item.name}
            </p>
            <p className="text-sm font-normal text-text-tertiary">{item.url}</p>
          </div>
        </div>

        <div className="border-collapse">
          <button
            className="rounded-l border border-border-primary bg-button-secondary px-4 py-[10px] text-sm font-semibold"
            onClick={() => deleteListItems(item.id)}
          >
            Usuń
          </button>
          <button
            className="border border-border-primary bg-button-secondary px-4 py-[10px] text-sm font-semibold"
            onClick={() => editItem(item)}
          >
            Edytuj
          </button>
          <button
            className="rounded-r border border-border-primary bg-button-secondary px-4 py-[10px] text-sm font-semibold"
            onClick={() => addListItem(item, item.id)}
          >
            Dodaj pozycję menu
          </button>
        </div>
      </div>

      {(parentItemId === item.id || editingItemId === item.id) && renderForm()}

      {item.children && item.children.length > 0 && (
        <div className="ml-16">
          {item.children.map((child, index) => (
            <ListItem
              key={child.id}
              item={child}
              level={level + 1}
              isFirstItem={index === 0}
              parentItemId={parentItemId}
              editItem={editItem}
              deleteListItems={deleteListItems}
              addListItem={addListItem}
              renderForm={renderForm}
              editingItemId={editingItemId}
            />
          ))}
        </div>
      )}
    </div>
  );
};
