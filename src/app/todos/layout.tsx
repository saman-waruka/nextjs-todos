import type { Metadata } from "next";
import SideNavigation from "@/components/Navigation/SideNavigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" container flex flex-row">
      <SideNavigation />
      {children}
    </div>
  );
}
