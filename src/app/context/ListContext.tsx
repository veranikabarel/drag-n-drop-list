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
  menuItems: Array<ListItemProps>;
  addMenuItems: (menuItem: ListItemProps, parentId?: number | null) => void;
  editMenuItems: (menuItem: ListItemProps) => void;
  deleteMenuItems: (menuItemId: number) => void;
  reorganizeMeniItem: (
    menuItems: (menuItems: Array<ListItemProps>) => Array<ListItemProps>,
  ) => void;
}

export const LinksContext = createContext<LinksContextState>({
  menuItems: [],
  addMenuItems: () => {},
  editMenuItems: () => {},
  deleteMenuItems: () => {},
  reorganizeMeniItem: () => {},
});

export const LinksContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [menuItems, setMenuItems] = useState<Array<ListItemProps>>([]);

  console.log(menuItems);

  useEffect(() => {
    const storedItems = localStorage.getItem("menuItems");
    if (storedItems) {
      setMenuItems(JSON.parse(storedItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("menuItems", JSON.stringify(menuItems));
  }, [menuItems]);

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

  const addMenuItems = useCallback(
    (menuItem: ListItemProps, parentId: number | null = null) => {
      console.log("add");
      let updatedItems;
      if (parentId) {
        updatedItems = addChildToParent(menuItems, menuItem, parentId);
      } else {
        updatedItems = [...menuItems, menuItem];
      }
      setMenuItems(updatedItems);
      localStorage.setItem("menuItems", JSON.stringify(updatedItems));
    },
    [menuItems, addChildToParent],
  );

  const editMenuItems = useCallback(
    (menuItem: ListItemProps) => {
      const updateItems = (
        items: Array<ListItemProps>,
      ): Array<ListItemProps> => {
        return items.map((item) => {
          if (item.id === menuItem.id) {
            return { ...item, ...menuItem };
          }
          if (item.children) {
            return { ...item, children: updateItems(item.children) };
          }
          return item;
        });
      };

      const updatedItems = updateItems(menuItems);
      setMenuItems(updatedItems);
      localStorage.setItem("menuItems", JSON.stringify(updatedItems));
    },
    [menuItems],
  );

  const deleteMenuItems = useCallback(
    (menuItemId: number) => {
      const removeItem = (
        items: Array<ListItemProps>,
      ): Array<ListItemProps> => {
        return items
          .filter((item) => Number(item.id) !== menuItemId)
          .map((item) => ({
            ...item,
            children: item.children ? removeItem(item.children) : [],
          }));
      };

      const updatedItems = removeItem(menuItems);
      setMenuItems(updatedItems);
      localStorage.setItem("menuItems", JSON.stringify(updatedItems));
    },
    [menuItems],
  );

  const reorganizeMeniItem = useCallback(
    (menuItems: (menuItems: Array<ListItemProps>) => Array<ListItemProps>) => {
      setMenuItems(menuItems);
    },
    [],
  );

  const contextValue = useMemo(
    () => ({
      menuItems,
      addMenuItems,
      editMenuItems,
      deleteMenuItems,
      reorganizeMeniItem,
    }),
    [
      menuItems,
      addMenuItems,
      editMenuItems,
      deleteMenuItems,
      reorganizeMeniItem,
    ],
  );

  return (
    <LinksContext.Provider value={contextValue}>
      {children}
    </LinksContext.Provider>
  );
};
