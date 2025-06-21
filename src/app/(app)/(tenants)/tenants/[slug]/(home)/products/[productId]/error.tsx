"use client";

import { TriangleAlertIcon } from "lucide-react";

export default function ErrorPage() {
  return (
    <div className="wrapper px-6 py-10">
      <div className="border border-black border-dashed flex items-center justify-center p-8 flex-col gap-y-2 bg-white w-full rounded-lg h-full">
        <TriangleAlertIcon />
        <h1 className="text-2xl font-bold">Product Not Found</h1>
        <p className="text-muted-foreground">
          The product you are looking for does not exist or has been removed.
        </p>
      </div>
    </div>
  );
}
