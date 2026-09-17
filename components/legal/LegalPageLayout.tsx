import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export function LegalPageLayout({
  title,
  path,
  lastUpdated,
  children,
}: {
  title: string;
  path: string;
  lastUpdated: string;
  children: ReactNode;
}) {
  return (
    <div className="py-12">
      <Container>
        <Breadcrumb items={[{ name: title, url: path }]} />
        <SectionHeading title={title} className="mt-6" />
        <p className="mt-3 text-sm text-gray-400">Last updated: {lastUpdated}</p>
        <div className="cms-content mt-10 max-w-3xl">{children}</div>
      </Container>
    </div>
  );
}
