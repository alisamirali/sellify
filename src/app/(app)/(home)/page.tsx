"use client";

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.auth.session.queryOptions());

  return (
    <div className="p-6">
      Current user: {JSON.stringify(data?.user?.username, null, 2)}
    </div>
  );
}
