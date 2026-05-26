import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

const POSTS_PER_PAGE = 9;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lang = searchParams.get("lang") || "en";
  const pageNum = Math.max(1, parseInt(searchParams.get("page") || "1", 10));

  const startIdx = (pageNum - 1) * POSTS_PER_PAGE;
  const endIdx = startIdx + POSTS_PER_PAGE;

  const dynamicQuery = groq`
    {
      "posts": *[_type == "post" && language == $lang] | order(publishedAt desc) [$start...$end]
    }
  `;

  try {
    const { posts } = await client.fetch(dynamicQuery, {
      lang,
      start: startIdx,
      end: endIdx,
    });
    return NextResponse.json({ posts });
  } catch (error) {
    return NextResponse.json({ error: "Failed to pull posts from CMS" }, { status: 500 });
  }
}