"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CategoriesSidebar } from "@/modules/home/ui/components/search-filters/categories-sidebar";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import {
  BookmarkCheckIcon,
  ListFilterPlusIcon,
  SearchIcon,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function SearchInput({ disabled }: { disabled?: boolean }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const trpc = useTRPC();
  const session = useQuery(trpc.auth.session.queryOptions());

  return (
    <div className="flex items-center gap-2 w-full py-1">
      <CategoriesSidebar open={isSidebarOpen} onOpenChange={setIsSidebarOpen} />

      <div className="w-full flex items-center gap-1 border px-3 rounded-md bg-white">
        <SearchIcon className="size-6 text-neutral-500" />
        <Input
          disabled={disabled}
          className="border-none outline-none bg-transparent"
          placeholder="Search products..."
        />
      </div>

      <Button
        variant="elevated"
        className="size-12 shrink-0 flex lg:hidden"
        onClick={() => setIsSidebarOpen(true)}
      >
        <ListFilterPlusIcon />
      </Button>

      {session.data?.user && (
        <Button variant="elevated" asChild>
          <Link href="/library">
            <BookmarkCheckIcon />
            Library
          </Link>
        </Button>
      )}
    </div>
  );
}
