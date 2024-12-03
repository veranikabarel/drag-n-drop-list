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

  const handleCancel = () => {
    setOpen(false);
    setParentItemId(null);
    setEditingItemId(null);
    setNewName("");
    setNewUrl("");
  };

  return (
    <div className="px-6 pt-[30px]">
      {menuItems.length === 0 && (
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

      {menuItems.length > 0 && (
        <div className="flex flex-col rounded-md border border-border-primary bg-bg-secondary">
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
                isFirstItem={item.id === menuItems[0].id}
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
            </>
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
          <div className="bg-canvas-primary rounded-b-md border-t border-border-secondary px-6 py-5">
            <button
              className="w-fit rounded-md border border-border-primary bg-button-secondary px-[14px] py-[10px] text-sm font-semibold shadow-sm shadow-shadow"
              onClick={() => setOpen(true)}
            >
              Dodaj pozycję menu
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
