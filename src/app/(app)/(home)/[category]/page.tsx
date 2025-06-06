type CategoryPageProps = {
  params: Promise<{
    category: string;
  }>;
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;

  return (
    <div className="flex items-center justify-center h-full">
      <h1 className="text-2xl font-bold">{category}</h1>
    </div>
  );
}
