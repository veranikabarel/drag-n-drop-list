"use client";

import { ListItemProps } from "@/app/types";
import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

export interface LinksContextState {
  listItems: Array<ListItemProps>;
  addListItems: (listItem: ListItemProps, parentId?: number | null) => void;
  editListItems: (listItem: ListItemProps) => void;
  deleteListItems: (listItemId: number) => void;
  updateListItems: (listItems: Array<ListItemProps>) => void;
}

export const LinksContext = createContext<LinksContextState>({
  listItems: [],
  addListItems: () => {},
  editListItems: () => {},
  deleteListItems: () => {},
  updateListItems: () => {},
});

export const LinksContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [listItems, setListItems] = useState<Array<ListItemProps>>([]);

  useEffect(() => {
    const storedItems = localStorage.getItem("menuItems");
    if (storedItems) {
      setListItems(JSON.parse(storedItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("listItems", JSON.stringify(listItems));
  }, [listItems]);

  const addChildToParent = useCallback(
    (
      items: Array<ListItemProps>,
      newItem: ListItemProps,
      parentId: number,
    ): Array<ListItemProps> => {
      return items.map((item) => {
        if (Number(item.id) === parentId) {
          return {
            ...item,
            children: item.children ? [...item.children, newItem] : [newItem],
          };
        }
        if (item.children) {
          return {
            ...item,
            children: addChildToParent(item.children, newItem, parentId),
          };
        }
        return item;
      });
    },
    [],
  );

  const addListItems = useCallback(
    (listItem: ListItemProps, parentId: number | null = null) => {
      let updatedItems;
      if (parentId) {
        updatedItems = addChildToParent(listItems, listItem, parentId);
      } else {
        updatedItems = [...listItems, listItem];
      }
      setListItems(updatedItems);
      localStorage.setItem("listItems", JSON.stringify(updatedItems));
    },
    [listItems, addChildToParent],
  );

  const editListItems = useCallback(
    (listItem: ListItemProps) => {
      const updateItems = (
        items: Array<ListItemProps>,
      ): Array<ListItemProps> => {
        return items.map((item) => {
          if (item.id === listItem.id) {
            return { ...item, ...listItem };
          }
          if (item.children) {
            return { ...item, children: updateItems(item.children) };
          }
          return item;
        });
      };

      const updatedItems = updateItems(listItems);
      setListItems(updatedItems);
      localStorage.setItem("listItems", JSON.stringify(updatedItems));
    },
    [listItems],
  );

  const deleteListItems = useCallback(
    (listItemId: number) => {
      const removeItem = (
        items: Array<ListItemProps>,
      ): Array<ListItemProps> => {
        return items
          .filter((item) => Number(item.id) !== listItemId)
          .map((item) => ({
            ...item,
            children: item.children ? removeItem(item.children) : [],
          }));
      };

      const updatedItems = removeItem(listItems);
      setListItems(updatedItems);
      localStorage.setItem("listItems", JSON.stringify(updatedItems));
    },
    [listItems],
  );

  const updateListItems = useCallback((listItems: Array<ListItemProps>) => {
    setListItems(listItems);
  }, []);

  const contextValue = useMemo(
    () => ({
      listItems,
      addListItems,
      editListItems,
      deleteListItems,
      updateListItems,
    }),
    [listItems, addListItems, editListItems, deleteListItems, updateListItems],
  );

  return (
    <LinksContext.Provider value={contextValue}>
      {children}
    </LinksContext.Provider>
  );
};
