import { Footer } from "@/modules/tenants/ui/components/footer";
import { Navbar, NavbarSkeleton } from "@/modules/tenants/ui/components/navbar";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

export default async function TenantsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.tenants.getOne.queryOptions({
      slug,
    })
  );

  return (
    <div className="min-h-screen bg-[#F4F4F0] flex flex-col">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<NavbarSkeleton />}>
          <Navbar slug={slug} />
        </Suspense>
      </HydrationBoundary>

      <main className="flex-1 bg-[#F4F4F0]">{children}</main>

      <Footer />
    </div>
  );
}
