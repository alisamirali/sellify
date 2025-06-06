import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-white py-6">
      <div className="wrapper px-6 flex justify-between items-center md:flex-row flex-col md:gap-0 gap-3">
        <span className="text-sm text-black">
          &copy; {new Date().getFullYear()} Sellify. All rights reserved.
        </span>
        <div className="flex space-x-3">
          <Link href="/privacy" className="text-sm text-black hover:underline">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-sm text-black hover:underline">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
