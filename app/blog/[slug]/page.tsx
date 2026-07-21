import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Clock } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SeafoodImage } from "@/components/ui/SeafoodImage";
import { BlogPostGrid } from "@/components/blog/BlogPostGrid";
import {
  getAllBlogPosts,
  getBlogPostBySlug,
  getRelatedBlogPosts,
} from "@/lib/services/blog.service";
import { blogPostingJsonLd } from "@/lib/seo/json-ld";
import { formatDate } from "@/lib/utils/format";
import { SITE_CONFIG } from "@/constants/site";
import type { RobotsMeta } from "@/types";

const ROBOTS_MAP: Record<RobotsMeta, { index: boolean; follow: boolean }> = {
  "index-follow": { index: true, follow: true },
  "noindex-follow": { index: false, follow: true },
  "noindex-nofollow": { index: false, follow: false },
};

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};

  const title = post.seo?.metaTitle || post.title;
  const description = post.seo?.metaDescription || "";
  const ogTitle = post.seo?.ogTitle || title;
  const ogDescription = post.seo?.ogDescription || description;
  const ogImage = post.seo?.ogImage || post.featuredImage?.url;
  const canonical = post.seo?.canonicalUrl || `/blog/${post.slug}`;
  const keywords = [post.seo?.focusKeyword, ...(post.seo?.secondaryKeywords ?? [])].filter(
    (v): v is string => Boolean(v)
  );

  return {
    title,
    description,
    keywords: keywords.length > 0 ? keywords : undefined,
    alternates: { canonical },
    robots: ROBOTS_MAP[post.seo?.robotsMeta ?? "index-follow"],
    openGraph: {
      type: "article",
      title: ogTitle,
      description: ogDescription,
      images: ogImage ? [{ url: ogImage }] : undefined,
      url: `${SITE_CONFIG.url}/blog/${post.slug}`,
      publishedTime: post.publishDate,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const related = await getRelatedBlogPosts(post, 3);
  const readTime = post.readTimeOverride ?? post.readTimeMinutes;

  return (
    <div className="py-12">
      <Container as="article" className="max-w-3xl">
        <Breadcrumb
          items={[
            { name: "Blog", url: "/blog" },
            ...(post.categoryName
              ? [{ name: post.categoryName, url: `/blog?category=${post.categorySlug}` }]
              : []),
            { name: post.title, url: `/blog/${post.slug}` },
          ]}
        />

        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd(post)) }}
        />

        <h1 className="mt-6 text-balance font-heading text-3xl font-bold tracking-tight text-ocean-950 sm:text-4xl lg:text-5xl">
          {post.title}
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-gray-500">
          <span>{formatDate(post.publishDate)}</span>
          {readTime && (
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> {readTime} min read
            </span>
          )}
          {post.author?.name && <span>By {post.author.name}</span>}
        </div>

        {post.featuredImage?.url && (
          <div className="relative mt-8 aspect-16/9 w-full overflow-hidden rounded-3xl bg-gray-100">
            <SeafoodImage
              src={post.featuredImage.url}
              alt={post.featuredImage.alt || post.title}
              fill
              priority
              sizes="(min-width: 1024px) 768px, 100vw"
              className="object-cover"
            />
          </div>
        )}
        {post.featuredImage?.caption && (
          <p className="mt-2 text-center text-sm text-gray-400">{post.featuredImage.caption}</p>
        )}

        <div
          className="cms-content mt-10"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {post.author?.name && (
          <div className="mt-12 flex items-start gap-4 rounded-3xl border border-gray-100 bg-gray-50/60 p-6">
            {post.author.image && (
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-gray-100">
                <SeafoodImage
                  src={post.author.image}
                  alt={post.author.name}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>
            )}
            <div>
              <p className="font-heading font-bold text-ocean-950">{post.author.name}</p>
              {post.author.position && (
                <p className="text-xs text-gray-400">{post.author.position}</p>
              )}
              {post.author.bio && (
                <p className="mt-2 text-sm text-gray-500">{post.author.bio}</p>
              )}
            </div>
          </div>
        )}

        {related.length > 0 && (
          <div className="mt-16">
            <SectionHeading eyebrow="Keep Reading" title="More From the Blog" />
            <div className="mt-8">
              <BlogPostGrid posts={related} className="sm:grid-cols-2 lg:grid-cols-2" />
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
