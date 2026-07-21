import { apiGet, apiGetOrUndefined } from "@/lib/api-client";
import type { BlogCategory, BlogPost } from "@/types";

interface BlogsResponse {
  items: BlogPost[];
  total: number;
  page: number;
  limit: number;
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const res = await apiGet<BlogsResponse>("/blogs", { status: "published", sort: "newest" });
  return res.items;
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const post = await apiGetOrUndefined<BlogPost>(`/blogs/slug/${slug}`);
  return post && post.status === "published" ? post : undefined;
}

export async function getLatestBlogPosts(limit = 3): Promise<BlogPost[]> {
  const posts = await getAllBlogPosts();
  return posts.slice(0, limit);
}

export async function getBlogPostsByCategory(categorySlug: string): Promise<BlogPost[]> {
  const res = await apiGet<BlogsResponse>("/blogs", {
    status: "published",
    categorySlug,
    sort: "newest",
  });
  return res.items;
}

export async function getRelatedBlogPosts(post: BlogPost, limit = 3): Promise<BlogPost[]> {
  const posts = await getBlogPostsByCategory(post.categorySlug);
  return posts.filter((p) => p.id !== post.id).slice(0, limit);
}

export async function searchBlogPosts(query: string): Promise<BlogPost[]> {
  const q = query.trim();
  if (!q) return [];
  const res = await apiGet<BlogsResponse>("/blogs", { status: "published", search: q });
  return res.items;
}

export async function getAllBlogCategories(): Promise<BlogCategory[]> {
  return apiGet<BlogCategory[]>("/blog-categories");
}

export async function getBlogCategoryBySlug(slug: string): Promise<BlogCategory | undefined> {
  const categories = await getAllBlogCategories();
  return categories.find((c) => c.slug === slug);
}
