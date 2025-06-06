"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MobileSidebar } from "@/modules/home/ui/components/mobile-sidebar";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { MenuIcon } from "lucide-react";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
});

function NavbarLink({
  href,
  children,
  isActive,
}: {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
}) {
  return (
    <Button
      asChild
      variant="outline"
      className={cn(
        "bg-transparent hover:bg-transparent rounded-full hover:border-primary border-transparent px-3.5 text-lg",
        isActive && "bg-black text-white hover:bg-black hover:text-white"
      )}
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
}

const navbarLinks = [
  { href: "/", children: "Home" },
  { href: "/about", children: "About" },
  { href: "/features", children: "Features" },
  { href: "/pricing", children: "Pricing" },
  { href: "/contact", children: "Contact" },
];

export function Navbar() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const trpc = useTRPC();
  const session = useQuery(trpc.auth.session.queryOptions());

  return (
    <header className="h-20 border-b bg-white">
      <nav className="wrapper h-full flex justify-between font-medium px-6">
        <Link href="/" className="flex items-center">
          <span className={cn(poppins.className, "text-3xl font-semibold")}>
            sellify<span className="text-pink-400">.</span>
          </span>
        </Link>

        <MobileSidebar
          items={navbarLinks}
          open={isSidebarOpen}
          onOpenChange={setSidebarOpen}
        />

        <div className="lg:flex items-center gap-4 hidden">
          {navbarLinks.map((link) => (
            <NavbarLink
              key={link.href}
              href={link.href}
              isActive={pathname === link.href}
            >
              {link.children}
            </NavbarLink>
          ))}
        </div>

        {session.data?.user ? (
          <div className="hidden lg:flex">
            <Button
              asChild
              className="border-l border-t-0 border-b-0 border-r-0 px-12 rounded-none h-full bg-black text-white hover:bg-pink-400 hover:text-black transition-colors text-lg"
            >
              <Link href="/admin">Dashboard</Link>
            </Button>
          </div>
        ) : (
          <div className="hidden lg:flex">
            <Button
              variant="secondary"
              asChild
              className="border-l border-t-0 border-b-0 border-r-0 px-12 rounded-none h-full bg-white hover:bg-pink-400 transition-colors text-lg"
            >
              <Link prefetch href="/sign-in">
                Login
              </Link>
            </Button>
            <Button
              asChild
              className="border-l border-t-0 border-b-0 border-r-0 px-12 rounded-none h-full bg-black text-white hover:bg-pink-400 hover:text-black transition-colors text-lg"
            >
              <Link prefetch href="/sign-up">
                Start selling
              </Link>
            </Button>
          </div>
        )}

        <div className="flex lg:hidden items-center justify-center">
          <Button
            variant="ghost"
            className="size-12 border-transparent bg-white"
            onClick={() => setSidebarOpen(true)}
          >
            <MenuIcon className="size-6" />
          </Button>
        </div>
      </nav>
    </header>
  );
}
