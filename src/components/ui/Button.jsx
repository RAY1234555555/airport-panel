export function Button({ className, ...props }) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-md text-sm font-medium bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 ${className}`}
      {...props}
    />
  );
}
