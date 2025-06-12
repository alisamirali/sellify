import { cn } from "@/lib/utils";
import { Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type CheckoutItemProps = {
  isLast?: boolean;
  imageUrl?: string | null;
  name: string;
  productUrl: string;
  tenantUrl: string;
  tenantName: string;
  price: number;
  onRemove: () => void;
};

export function CheckoutItem({
  isLast,
  imageUrl,
  name,
  productUrl,
  tenantUrl,
  tenantName,
  price,
  onRemove,
}: CheckoutItemProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-[8.5rem_1fr_auto] gap-4 pr-4 border-b",
        isLast && "border-b-0"
      )}
    >
      <div className="overflow-hidden border-r">
        <div className="relative aspect-square h-full">
          <Image
            src={imageUrl || "/placeholder.png"}
            alt={name}
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="py-4 flex flex-col justify-between">
        <div>
          <Link href={productUrl}>
            <h4 className="font-bold underline">{name}</h4>
          </Link>
          <Link href={tenantUrl}>
            <p className="font-medium underline">{tenantName}</p>
          </Link>
        </div>
      </div>

      <div className="py-4 flex flex-col justify-between">
        <p className="font-medium">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
          }).format(Number(price))}
        </p>
        <button
          className="underline font-medium cursor-pointer hover:text-red-500 flex justify-end items-center"
          onClick={onRemove}
          type="button"
        >
          <Trash className="size-5" />
        </button>
      </div>
    </div>
  );
}
