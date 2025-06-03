import Link from "next/link";

/* eslint-disable @typescript-eslint/no-explicit-any */
export function SubcategoryMenu({
  category,
  isOpened,
  position,
}: {
  category: any;
  isOpened: boolean;
  position: { top: number; left: number };
}) {
  if (
    !isOpened ||
    !category.subcategories ||
    category.subcategories.length === 0
  )
    return null;

  const backgroundColor = category.color || "#F5F5F5";

  return (
    <div
      className="fixed z-50"
      style={{
        top: position.top,
        left: position.left,
      }}
    >
      <div className="h-3 w-60" />

      <div
        className="w-60 text-black rounded-md overflow-hidden border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-x-[2px] -translate-y-[2px]"
        style={{
          backgroundColor,
        }}
      >
        <div>
          {category.subcategories?.map((subcategory: any) => (
            <Link
              key={subcategory.slug}
              href="/"
              className="w-full text-left p-4 hover:bg-black hover:text-white flex justify-between items-center underline font-medium"
            >
              {subcategory.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
