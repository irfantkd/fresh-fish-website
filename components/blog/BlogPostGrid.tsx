import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { cn } from "@/lib/utils/cn";
import type { BlogPost } from "@/types";

export function BlogPostGrid({
  posts,
  className,
}: {
  posts: BlogPost[];
  className?: string;
}) {
  if (posts.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-gray-300 py-16 text-center text-gray-400">
        No blog posts found.
      </div>
    );
  }

  return (
    <div className={cn("grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {posts.map((post) => (
        <BlogPostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
