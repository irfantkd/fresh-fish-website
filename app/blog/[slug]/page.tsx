import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Clock, User } from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SeafoodImage } from "@/components/ui/SeafoodImage";
import { BlogPostGrid } from "@/components/blog/BlogPostGrid";
import { BlogShareButtons } from "@/components/blog/BlogShareButtons";
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
  const postUrl = `${SITE_CONFIG.url}/blog/${post.slug}`;

  const metaRow = (
    <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/80">
      <span className="flex items-center gap-1.5">
        <Calendar className="h-3.5 w-3.5" /> {formatDate(post.publishDate)}
      </span>
      {readTime && (
        <span className="flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5" /> {readTime} min read
        </span>
      )}
      {post.author?.name && (
        <span className="flex items-center gap-1.5">
          <User className="h-3.5 w-3.5" /> By {post.author.name}
        </span>
      )}
    </div>
  );

  return (
    <div className="pb-16">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd(post)) }}
      />

      {/* Full-bleed hero — image with a top-transparent/bottom-black gradient
          so the overlaid title/meta stay legible against any photo. */}
      <div className="relative h-[42vh] min-h-64 w-full overflow-hidden bg-gray-100 sm:h-[48vh] sm:min-h-80 lg:h-[54vh] lg:max-h-130">
        {post.featuredImage?.url && (
          <SeafoodImage
            src={post.featuredImage.url}
            alt={post.featuredImage.alt || post.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 pb-6 sm:pb-8 lg:pb-10">
          <div className="mx-auto w-[90%] max-w-350">
            {post.categoryName && (
              <span className="inline-block rounded-full bg-aqua-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-aqua-200 backdrop-blur">
                {post.categoryName}
              </span>
            )}
            <h1 className="mt-3 text-balance font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            {metaRow}
          </div>
        </div>
      </div>

      <div className="mx-auto w-[90%] max-w-350">
        <div className="pt-6">
          <Breadcrumb
            items={[
              { name: "Blog", url: "/blog" },
              ...(post.categoryName
                ? [{ name: post.categoryName, url: `/blog?category=${post.categorySlug}` }]
                : []),
              { name: post.title, url: `/blog/${post.slug}` },
            ]}
          />
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-14 xl:gap-20">
          <article className="min-w-0">
            <div
              className="cms-content"
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
          </article>

          <aside className="flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl border border-gray-100 bg-gray-50/60 p-6">
              <h2 className="font-heading text-sm font-bold uppercase tracking-wide text-ocean-950">
                Share this article
              </h2>
              <div className="mt-4">
                <BlogShareButtons url={postUrl} title={post.title} />
              </div>
            </div>

            {post.categoryName && (
              <div className="rounded-3xl border border-gray-100 bg-gray-50/60 p-6">
                <h2 className="font-heading text-sm font-bold uppercase tracking-wide text-ocean-950">
                  Category
                </h2>
                <Link
                  href={`/blog?category=${post.categorySlug}`}
                  className="mt-3 inline-flex items-center rounded-full bg-aqua-500/10 px-3 py-1.5 text-sm font-semibold text-aqua-700 hover:bg-aqua-500/20"
                >
                  {post.categoryName}
                </Link>
              </div>
            )}
          </aside>
        </div>

        {related.length > 0 && (
          <div className="mt-20">
            <SectionHeading eyebrow="Keep Reading" title="More From the Blog" />
            <div className="mt-8">
              <BlogPostGrid posts={related} className="sm:grid-cols-2 lg:grid-cols-3" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
