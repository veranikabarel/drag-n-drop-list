export type ListItemProps = {
  id: number;
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
