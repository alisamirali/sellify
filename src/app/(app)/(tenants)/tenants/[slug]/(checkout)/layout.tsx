import { Navbar } from "@/modules/checkout/ui/components/navbar";
import { Footer } from "@/modules/tenants/ui/components/footer";

export default async function CheckoutLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div className="min-h-screen bg-[#F4F4F0] flex flex-col">
      <Navbar slug={slug} />
      <main className="flex-1 bg-[#F4F4F0]">{children}</main>
      <Footer />
    </div>
  );
}
