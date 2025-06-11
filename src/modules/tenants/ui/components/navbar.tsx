"use client";

import { generateTenantUrl } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

export function Navbar({ slug }: { slug?: string }) {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.tenants.getOne.queryOptions({ slug }));

  return (
    <header className="h-20 border-b bg-white">
      <nav className="wrapper h-full flex gap-3 items-center font-medium px-6">
        <Link
          href={generateTenantUrl(slug as string)}
          className="flex items-center gap-1.5"
        >
          {data?.image?.url && (
            <Image
              src={data.image.url}
              alt={data.name}
              width={32}
              height={32}
              className="rounded-full size-[32px] border shrink-0"
            />
          )}
          <p className="text-xl">{data?.name}</p>
        </Link>
      </nav>
    </header>
  );
}

export function NavbarSkeleton() {
  return (
    <header className="h-20 border-b bg-white">
      <nav className="wrapper h-full flex justify-between items-center font-medium px-6">
        <div />
      </nav>
    </header>
  );
}
