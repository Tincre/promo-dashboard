export function IsActivePill({ isActive }: { isActive: boolean }) {
  const isActivePillClassName = `${
    !isActive
      ? 'absolute top-0 right-0 rounded-bl-lg rounded-tr-sm bg-gray-300 px-2 py-1 text-xs font-medium text-gray-900 group-hover:bg-gray-700 group-hover:text-gray-200'
      : 'absolute top-0 right-0 rounded-bl-lg rounded-tr-sm bg-green-200 px-2 py-1 text-xs font-medium text-green-800 group-hover:bg-green-800 group-hover:text-green-200'
  }`;
  return (
    <span className={isActivePillClassName}>
      {isActive ? 'ACTIVE' : 'INACTIVE'}
    </span>
  );
}
