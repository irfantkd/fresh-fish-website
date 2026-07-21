"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { SeafoodImage } from "@/components/ui/SeafoodImage";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils/format";
import type { BlogPost } from "@/types";

export function BlogPostCard({ post }: { post: BlogPost }) {
  const readTime = post.readTimeOverride ?? post.readTimeMinutes;

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-gray-200/70 transition-shadow hover:shadow-xl hover:shadow-ocean-900/10"
    >
      <Link href={`/blog/${post.slug}`} className="relative block aspect-16/10 w-full overflow-hidden bg-gray-100">
        <SeafoodImage
          src={post.featuredImage.url}
          alt={post.featuredImage.alt || post.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        {post.categoryName && (
          <span className="absolute left-3 top-3">
            <Badge variant="aqua">{post.categoryName}</Badge>
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <span className="flex items-center gap-3 text-xs text-gray-400">
          <span>{formatDate(post.publishDate)}</span>
          {readTime && (
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> {readTime} min read
            </span>
          )}
        </span>
        <Link href={`/blog/${post.slug}`}>
          <h3 className="font-heading text-lg font-bold text-ocean-950 transition-colors group-hover:text-aqua-700">
            {post.title}
          </h3>
        </Link>
        {post.seo?.metaDescription && (
          <p className="line-clamp-2 text-sm text-gray-500">{post.seo.metaDescription}</p>
        )}
        <Link
          href={`/blog/${post.slug}`}
          className="mt-2 text-sm font-semibold text-aqua-600 hover:text-aqua-700"
        >
          Read More →
        </Link>
      </div>
    </motion.div>
  );
}
