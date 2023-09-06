import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "List component",
  description: "test all component",
};

export default function ComponentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="flex-1 py-8">{children}</main>;
}
