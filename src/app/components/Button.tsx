import { ButtonProps } from "@/app/types";

export const Button = ({ children, onClick }: ButtonProps) => {
  return <div onClick={onClick}>{children}</div>;
};
