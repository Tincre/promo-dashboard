export function Button({
  className,
  onClick,
  children,
}: {
  className?: string;
  onClick?: Function;
  children?: string;
}) {
  return (
    <button className={className} type="button">
      {children}
    </button>
  );
}
