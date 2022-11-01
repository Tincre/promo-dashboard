import {MouseEventHandler, } from "react";

export function Button({
  className,
  onClick,
  children,
}: {
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children?: string;
}) {
  return (
    <button className={className} type="button" onClick={onClick}>
      {children}
    </button>
  );
}
