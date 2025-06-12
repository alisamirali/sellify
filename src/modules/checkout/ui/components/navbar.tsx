import { Button } from "@/components/ui/button";
import { generateTenantUrl } from "@/lib/utils";
import Link from "next/link";

export function Navbar({ slug }: { slug: string }) {
  return (
    <header className="h-20 border-b bg-white">
      <nav className="wrapper h-full flex gap-3 items-center justify-between font-medium px-6">
        <p className="text-xl">Checkout</p>
        <Button variant="elevated" asChild>
          <Link href={generateTenantUrl(slug)}>Continue Shopping</Link>
        </Button>
      </nav>
    </header>
  );
}
