"use client";

import { ReviewSidebar } from "@/modules/library/ui/components/review-sidebar";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

type ProductViewProps = {
  productId: string;
};

export function ProductView({ productId }: ProductViewProps) {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.library.getOne.queryOptions({ productId })
  );

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-[#F4F4F0] border-b h-20">
        <nav className="p-4 h-full flex items-center wrapper">
          <Link prefetch href="/library" className="flex items-center gap-1.5">
            <ArrowLeftIcon className="size-5" />
            <span className="text-base font-medium">Back to Library</span>
          </Link>
        </nav>
      </header>

      <section className="bg-[#F4F4F0] py-8 border-b">
        <div className="px-6 wrapper">
          <h1 className="text-[40px] font-medium">{data.name}</h1>
        </div>
      </section>

      <section className="wrapper px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 lg:gap-16">
          <div className="lg:col-span-2">
            <div className="p-4 bg-white rounded-md border gap-4">
              <ReviewSidebar productId={productId} />
            </div>
          </div>
          <div className="lg:col-span-5">
            <p className="font-medium italic text-muted-foreground">
              No special content
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
