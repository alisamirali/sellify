"use client";

import { StarRating } from "@/components/star-rating";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { generateTenantUrl } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { CheckCheck, LinkIcon, StarIcon } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useState } from "react";
import { toast } from "sonner";

const CartButton = dynamic(
  () =>
    import("@/modules/products/ui/components/cart-button").then(
      (mod) => mod.CartButton
    ),
  { ssr: false }
);

type Props = {
  productId: string;
  tenantSlug: string;
};

export function ProductView({ productId, tenantSlug }: Props) {
  const [isCopied, setIsCopied] = useState(false);

  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.products.getOne.queryOptions({
      id: productId,
    })
  );

  return (
    <div className="wrapper px-6 py-10">
      <div className="border rounded-md bg-white overflow-hidden">
        <div className="relative aspect-[3.9] border-b">
          <Image
            src={data?.image?.url || "/placeholder.png"}
            alt={data?.image?.alt || "Product Image"}
            className="object-cover"
            fill
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-6">
          <div className="col-span-4">
            <div className="p-6">
              {" "}
              <h1 className="text-3xl font-medium">{data?.name}</h1>
            </div>

            <div className="border-y flex">
              <div className="px-6 py-4 flex items-center justify-center border-r">
                <div className="px-2 py-1 border bg-pink-400 w-fit">
                  <p className="text-base font-medium">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                      maximumFractionDigits: 0,
                    }).format(Number(data?.price || 0))}
                  </p>
                </div>
              </div>
              <div className="px-6 py-4 flex items-center justify-center lg:border-r">
                <Link
                  href={generateTenantUrl(tenantSlug)}
                  className="flex items-center gap-2"
                >
                  {data?.tenant?.image?.url && (
                    <Image
                      src={data.tenant.image.url}
                      alt={data.tenant.image.alt || "Tenant Image"}
                      className="rounded-full border shrink-0 size-[20px]"
                      width={20}
                      height={20}
                    />
                  )}

                  <p className="text-base underline font-medium">
                    {data?.tenant?.name}
                  </p>
                </Link>
              </div>
              <div className="hidden lg:flex px-6 py-4 items-center justify-center">
                <div className="flex items-center gap-2">
                  <StarRating rating={data?.reviewRating} />
                  <p className="text-base font-medium">
                    ({data?.reviewCount || 0}) ratings
                  </p>
                </div>
              </div>
            </div>

            <div className="flex lg:hidden px-6 py-4 items-center border-b">
              <div className="flex items-center gap-2">
                <StarRating rating={data?.reviewRating} />
                <p className="text-base font-medium">
                  ({data?.reviewCount || 0}) ratings
                </p>
              </div>
            </div>

            <div className="p-6">
              {data?.description ? (
                <RichText data={data.description} />
              ) : (
                <p className="font-medium text-muted-foreground italic">
                  No description available for this product.
                </p>
              )}
            </div>
          </div>

          <div className="col-span-2">
            <div className="border-t lg:border-t-0 lg:border-l h-full">
              <div className="flex flex-col gap-4 p-6 border-b">
                <div className="flex flex-row items-center gap-2">
                  <CartButton
                    tenantSlug={tenantSlug}
                    productId={productId}
                    isPurchased={data?.isPurchased || false}
                  />
                  <Button
                    className="size-12"
                    variant="elevated"
                    onClick={() => {
                      setIsCopied(true);
                      navigator.clipboard.writeText(window.location.href);
                      toast.success("Product link copied to clipboard");

                      setTimeout(() => {
                        setIsCopied(false);
                      }, 1000);
                    }}
                    disabled={isCopied}
                  >
                    {isCopied ? <CheckCheck /> : <LinkIcon />}
                  </Button>
                </div>{" "}
                <p className="text-center font-medium">
                  {data?.refundPolicy === "no-refund"
                    ? "No Refund Policy"
                    : `${data?.refundPolicy || "No"} money back guarantee`}
                </p>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-medium">Ratings</h3>
                  <div className="flex items-center gap-x-1 font-medium">
                    <StarIcon className="size-4 fill-black" />
                    <p>({data?.reviewRating})</p>
                    <p className="text-base">{data?.reviewCount} ratings</p>
                  </div>
                </div>

                <div className="grid grid-cols-[auto_1fr_auto] gap-3 mt-3">
                  {[5, 4, 3, 2, 1].map((stars) => (
                    <Fragment key={stars}>
                      <div className="font-medium">
                        {stars} {stars === 1 ? "star" : "stars"}
                      </div>
                      <Progress
                        value={data.ratingDistribution[stars]}
                        className="h-[1lh]"
                      />
                      <div className="font-medium">
                        {data.ratingDistribution[stars]}%
                      </div>
                    </Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
