/* eslint-disable @typescript-eslint/no-explicit-any */
import configPromise from "@payload-config";
import { getPayload } from "payload";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { SearchFilters } from "@/components/search-filters";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const payload = await getPayload({
    config: configPromise,
  });

  const data = await payload.find({
    collection: "categories",
    depth: 1,
    pagination: false,
    where: {
      parent: {
        exists: false,
      },
    },
    sort: "name",
  });

  const formattedData = data.docs.map((doc) => ({
    ...doc,
    subcategories: (doc?.subcategories?.docs ?? []).map((doc: any) => ({
      ...doc,
      subcategories: undefined,
    })),
  }));

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <SearchFilters data={formattedData} />
      <main className="flex-1 bg-[#F4F4F0]">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
