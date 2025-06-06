type SubcategoryPageProps = {
  params: Promise<{
    category: string;
    subcategory: string;
  }>;
};

export default async function SubcategoryPage({
  params,
}: SubcategoryPageProps) {
  const { category, subcategory } = await params;

  return (
    <div className="flex items-center justify-center h-full">
      <h1 className="text-2xl font-bold">
        {category} - {subcategory}
      </h1>
    </div>
  );
}
