"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

type ProductListProps = {
  category?: string;
};

export function ProductList({ category }: ProductListProps) {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.products.getMany.queryOptions({
      category,
    })
  );

  return <div>{JSON.stringify(data, null, 2)}</div>;
}

export function ProductListSkeleton() {
  return <div>Loading...</div>;
}
