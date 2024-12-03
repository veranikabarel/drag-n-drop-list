"use client";

import { Form } from "@/app/components/Form";
import { ListItem } from "@/app/components/ListItem";
import { LinksContext } from "@/app/context/ListContext";

import { ListItemProps } from "@/app/types";
import { FormEvent, useContext, useState } from "react";

export const ListContainer = () => {
  const [open, setOpen] = useState<boolean>(false);

  const [newName, setNewName] = useState<string>("");
  const [newUrl, setNewUrl] = useState<string>("");
  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const [parentItemId, setParentItemId] = useState<number | null>(null);

  const { menuItems, addMenuItems, editMenuItems, deleteMenuItems } =
    useContext(LinksContext);

  const addMenuItem = (
    menuItem: ListItemProps,
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
      editMenuItems({ id: editingItemId, name: newName, url: newUrl });
    } else {
      addMenuItems(
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

  return (
    <>
      {menuItems.length === 0 && (
        <>
          <div>
            <div>
              <h1>Menu jest puste</h1>
              <p>W tym menu nie ma jeszcze żadnych linków.</p>
            </div>
            <button onClick={() => setOpen(true)}>
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
        </>
      )}
      <div>
        {menuItems.map((item: ListItemProps) => (
          <>
            <ListItem
              key={item.id}
              item={item}
              level={0}
              parentItemId={parentItemId}
              editItem={editItem}
              deleteMenuItems={deleteMenuItems}
              addMenuItem={addMenuItem}
              renderForm={() => (
                <Form
                  newName={newName}
                  newUrl={newUrl}
                  setNewName={setNewName}
                  setNewUrl={setNewUrl}
                  onSubmit={submitMenuLinkForm}
                  onCancel={() => setOpen(false)}
                />
              )}
              editingItemId={editingItemId}
            />
          </>
        ))}

        {open && (
          <Form
            newName={newName}
            newUrl={newUrl}
            setNewName={setNewName}
            setNewUrl={setNewUrl}
            onSubmit={submitMenuLinkForm}
            onCancel={() => setOpen(false)}
          />
        )}

        <button onClick={() => setOpen(true)}>Dodaj pozycję menu</button>
      </div>
    </>
  );
};
