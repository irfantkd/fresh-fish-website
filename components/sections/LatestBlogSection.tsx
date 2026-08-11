import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/animations/FadeIn";
import { BlogPostGrid } from "@/components/blog/BlogPostGrid";
import { getLatestBlogPosts } from "@/lib/services/blog.service";

export async function LatestBlogSection() {
  const posts = await getLatestBlogPosts(3);

  if (posts.length === 0) return null;

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <FadeIn>
          <div className="flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
            <SectionHeading
              eyebrow="From the Blog"
              title="Blogs"
              description="Tips on choosing, storing, and cooking the freshest seafood in Dubai."
              className="items-center text-center sm:items-start sm:text-left [&_p]:mx-auto sm:[&_p]:mx-0"
            />
            <Button
              href="/blog"
              variant="outline"
              size="md"
              className="shrink-0"
            >
              Visit the Blog <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </FadeIn>

        <div className="mt-10">
          <BlogPostGrid posts={posts} />
        </div>
      </Container>
    </section>
  );
}
