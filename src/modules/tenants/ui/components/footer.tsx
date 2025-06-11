import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Link from "next/link";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
});

export function Footer() {
  return (
    <footer className="bg-white py-6">
      <div className="wrapper px-6 flex justify-center items-center gap-2">
        <span className="text-sm text-black">Powered by: </span>

        <Link href="/" className="flex items-center">
          <span className={cn(poppins.className, "text-xl font-semibold")}>
            sellify<span className="text-pink-400">.</span>
          </span>
        </Link>
      </div>
    </footer>
  );
}
