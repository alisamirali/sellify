import {
  ProductList,
  ProductListSkeleton,
} from "@/modules/library/ui/components/product-list";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export function LibraryView() {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-[#F4F4F0] border-b h-20">
        <nav className="p-4 h-full flex items-center wrapper">
          <Link prefetch href="/" className="flex items-center gap-1.5">
            <ArrowLeftIcon className="size-5" />
            <span className="text-base font-medium">Continue Shopping</span>
          </Link>
        </nav>
      </header>

      <section className="bg-[#F4F4F0] py-8 border-b">
        <div className="px-6 wrapper flex flex-col gap-y-4">
          <h1 className="text-[40px] font-medium">Library</h1>
          <p className="font-medium">
            Your purchases and reviews are stored here.
          </p>
        </div>
      </section>

      <section className="wrapper px-6 py-10">
        <Suspense fallback={<ProductListSkeleton />}>
          <ProductList />
        </Suspense>
      </section>
    </div>
  );
}
