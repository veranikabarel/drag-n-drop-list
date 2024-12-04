"use client";

import { Form } from "@/app/components/Form";
import { ListItem } from "@/app/components/ListItem";
import { LinksContext } from "@/app/context/ListContext";

import { ListItemProps } from "@/app/types";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { FormEvent, useContext, useMemo, useState } from "react";

const findItemPath = (
  items: ListItemProps[],
  targetId: number,
  path: number[] = [],
): number[] | null => {
  for (let i = 0; i < items.length; i++) {
    if (items[i].id === targetId) return [...path, i];
    if (items[i].children?.length) {
      const childPath = findItemPath(items[i].children || [], targetId, [
        ...path,
        i,
      ]);
      if (childPath) return childPath;
    }
  }
  return null;
};

const removeItemAtPath = (
  items: ListItemProps[],
  path: number[],
): ListItemProps[] => {
  if (path.length === 1) {
    return [...items.slice(0, path[0]), ...items.slice(path[0] + 1)];
  }
  const [index, ...rest] = path;
  const newItems = [...items];
  newItems[index] = {
    ...newItems[index],
    children: removeItemAtPath(newItems[index].children || [], rest),
  };
  return newItems;
};

const getItemAtPath = (
  items: ListItemProps[],
  path: number[],
): ListItemProps => {
  return path.reduce((current, index) => (current.children || [])[index], {
    children: items,
  } as ListItemProps);
};

const insertItemAtPath = (
  items: ListItemProps[],
  path: number[],
  item: ListItemProps,
): ListItemProps[] => {
  if (path.length === 1) {
    const newItems = [...items];
    newItems.splice(path[0], 0, item);
    return newItems;
  }
  const [index, ...rest] = path;
  const newItems = [...items];
  newItems[index] = {
    ...newItems[index],
    children: insertItemAtPath(newItems[index].children || [], rest, item),
  };
  return newItems;
};

export const ListContainer = () => {
  const [open, setOpen] = useState<boolean>(false);

  const [newName, setNewName] = useState<string>("");
  const [newUrl, setNewUrl] = useState<string>("");
  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const [parentItemId, setParentItemId] = useState<number | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const isParentDrop =
      event.activatorEvent instanceof PointerEvent &&
      event.activatorEvent.clientY >
        (event.over?.rect.top ?? 0) + (event.over?.rect.height ?? 0) * 0.25;

    const activePath = findItemPath(listItems, active.id as number);
    const overPath = findItemPath(listItems, over.id as number);

    if (!activePath || !overPath) return;

    let updatedItems = [...listItems];
    const activeItem = getItemAtPath(listItems, activePath);

    updatedItems = removeItemAtPath(updatedItems, activePath);

    console.log("updatedItems", updatedItems);

    if (isParentDrop) {
      const targetPath = findItemPath(updatedItems, over.id as number);
      if (targetPath) {
        const targetItem = getItemAtPath(updatedItems, targetPath);
        if (!targetItem.children) targetItem.children = [];
        targetItem.children.push(activeItem);
        updateListItems(updatedItems);
      }
    } else {
      updatedItems = insertItemAtPath(updatedItems, overPath, activeItem);
      updateListItems(updatedItems);
    }
  };

  const {
    listItems,
    addListItems,
    editListItems,
    deleteListItems,
    updateListItems,
  } = useContext(LinksContext);

  const addListItem = (
    listItem: ListItemProps,
    parentId: number | null = null,
  ) => {
    setEditingItemId(null);
    setParentItemId(parentId);
    setOpen(parentId === null);
    setNewName("");
    setNewUrl("");
  };

  const editItem = (item: ListItemProps): void => {
    setEditingItemId(item.id);
    setParentItemId(null);
    setOpen(false);
    setNewName(item.name);
    setNewUrl(item.url as string);
  };

  const submitMenuLinkForm = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (editingItemId !== null) {
      editListItems({ id: editingItemId, name: newName, url: newUrl });
    } else {
      addListItems(
        {
          id: Math.random(),
          name: newName,
          url: newUrl,
          children: [],
        },
        parentItemId,
      );
    }

    setNewName("");
    setNewUrl("");
    setEditingItemId(null);
    setParentItemId(null);
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
    setParentItemId(null);
    setEditingItemId(null);
    setNewName("");
    setNewUrl("");
  };

  const flattenedItems = useMemo(() => {
    const flattenItems = (items: ListItemProps[]): ListItemProps[] => {
      return items.reduce((flat: ListItemProps[], item) => {
        return flat.concat([item], flattenItems(item.children || []));
      }, []);
    };

    return flattenItems(listItems);
  }, [listItems]);

  return (
    <div className="px-6 pt-[30px]">
      {listItems.length === 0 && (
        <>
          <div className="mb-8 flex flex-col items-center gap-6 rounded-lg border border-border-secondary bg-bg-secondary py-6">
            <div className="flex flex-col items-center gap-1">
              <h1 className="text-base font-semibold text-text-primary">
                Menu jest puste
              </h1>
              <p className="text-sm font-normal text-text-tertiary">
                W tym menu nie ma jeszcze żadnych linków.
              </p>
            </div>
            <div>
              <button
                className="flex gap-1 rounded-lg border-button-primary bg-button-primary px-4 py-2 text-sm font-semibold text-button-primary-fg"
                onClick={() => setOpen(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                Dodaj pozycję menu
              </button>
            </div>
          </div>
          {open && (
            <Form
              newName={newName}
              newUrl={newUrl}
              setNewName={setNewName}
              setNewUrl={setNewUrl}
              onSubmit={submitMenuLinkForm}
              onCancel={handleCancel}
            />
          )}
        </>
      )}

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={flattenedItems.map((item) => item.id)}
          strategy={verticalListSortingStrategy}
        >
          {listItems.length > 0 && (
            <div className="flex flex-col rounded-md border border-border-primary bg-bg-secondary">
              {listItems.map((item: ListItemProps) => (
                <ListItem
                  key={item.id}
                  item={item}
                  level={0}
                  parentItemId={parentItemId}
                  editItem={editItem}
                  deleteListItems={deleteListItems}
                  addListItem={addListItem}
                  isFirstItem={item.id === listItems[0].id}
                  renderForm={() => (
                    <Form
                      newName={newName}
                      newUrl={newUrl}
                      setNewName={setNewName}
                      setNewUrl={setNewUrl}
                      onSubmit={submitMenuLinkForm}
                      onCancel={handleCancel}
                      childForm={true}
                    />
                  )}
                  editingItemId={editingItemId}
                />
              ))}

              {open && (
                <div className="mx-6 my-4">
                  <Form
                    newName={newName}
                    newUrl={newUrl}
                    setNewName={setNewName}
                    setNewUrl={setNewUrl}
                    onSubmit={submitMenuLinkForm}
                    onCancel={handleCancel}
                  />
                </div>
              )}
              <div className="rounded-b-md border-t border-border-secondary bg-canvas-primary px-6 py-5">
                <button
                  className="w-fit rounded-md border border-border-primary bg-button-secondary px-[14px] py-[10px] text-sm font-semibold shadow-sm shadow-shadow"
                  onClick={() => setOpen(true)}
                >
                  Dodaj pozycję menu
                </button>
              </div>
            </div>
          )}
        </SortableContext>
      </DndContext>
    </div>
  );
};
