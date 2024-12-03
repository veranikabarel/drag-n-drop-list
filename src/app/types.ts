export type ListItemProps = {
  id: string;
  name: string;
  url?: string;
  children?: Array<ListItemProps>;
};

export type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
};
