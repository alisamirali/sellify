import { Button } from "@/components/ui/button";
import { cn, generateTenantUrl } from "@/lib/utils";
import { useCart } from "@/modules/checkout/hooks/use-cart";
import { ShoppingCartIcon } from "lucide-react";
import Link from "next/link";

type CheckoutButtonProps = {
  className?: string;
  hideIfEmpty?: boolean;
  tenantSlug: string;
};

export function CheckoutButton({
  className,
  hideIfEmpty,
  tenantSlug,
}: CheckoutButtonProps) {
  const { totalItems } = useCart(tenantSlug);

  if (hideIfEmpty && totalItems === 0) {
    return null;
  }

  return (
    <Button variant="elevated" className={cn("bg-white", className)} asChild>
      <Link href={`${generateTenantUrl(tenantSlug)}/checkout`}>
        <ShoppingCartIcon />
        {totalItems > 0 ? totalItems : ""}
      </Link>
    </Button>
  );
}
