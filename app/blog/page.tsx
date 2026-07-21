import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { BlogPostGrid } from "@/components/blog/BlogPostGrid";
import {
  getAllBlogCategories,
  getAllBlogPosts,
  getBlogPostsByCategory,
  searchBlogPosts,
} from "@/lib/services/blog.service";
import { SITE_CONFIG } from "@/constants/site";
import { cn } from "@/lib/utils/cn";

export const metadata: Metadata = {
  title: "Blog",
  description: `Seafood guides, recipes, and news from ${SITE_CONFIG.name}.`,
  alternates: { canonical: "/blog" },
};

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string }>;
}) {
  const { category, search } = await searchParams;
  const categories = await getAllBlogCategories();

  const posts = search
    ? await searchBlogPosts(search)
    : category
      ? await getBlogPostsByCategory(category)
      : await getAllBlogPosts();

  return (
    <div className="py-12">
      <Container>
        <Breadcrumb items={[{ name: "Blog", url: "/blog" }]} />
        <SectionHeading
          eyebrow="Fresh Fish Dubai Blog"
          title="Seafood Guides, Recipes & News"
          description="Tips on choosing, storing, and cooking the freshest seafood, plus company news and updates."
          className="mt-6"
        />

        <div className="mt-8 flex flex-wrap gap-2">
          <Link
            href="/blog"
            className={cn(
              "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
              !category ? "bg-ocean-800 text-white" : "bg-gray-100 text-gray-600 hover:bg-ocean-50"
            )}
          >
            All Posts
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/blog?category=${cat.slug}`}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                category === cat.slug
                  ? "bg-ocean-800 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-ocean-50"
              )}
            >
              {cat.name}
            </Link>
          ))}
        </div>

        <div className="mt-10">
          <BlogPostGrid posts={posts} />
        </div>
      </Container>
    </div>
  );
}
