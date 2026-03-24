/* eslint-disable @typescript-eslint/no-explicit-any */
import { client } from "@/sanity/lib/client";
import { postsQuery } from "@/sanity/lib/queries";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";

export default async function BlogPage({
  params,
}: {
  params: { lang: string };
}) {
  const posts = await client.fetch(postsQuery);

  return (
    // Flex-col stacks the header and grid vertically, items-center aligns them to the middle
    <div className="flex flex-col items-center justify-center min-h-screenpy-24 px-6">
      {/* Header Section */}
      <div className=" bg-[#1a1a1a] w-[100vw] h-[38vh] flex items-end justify-center lg:h-[33vh]">
        <header className="text-center mb-6">
          <h1
            className="text-5xl font-light mb-6 tracking-tight uppercase text-white"
            style={{ fontFamily: "var(--font-D-DIN)" }}
          >
            Blog
          </h1>
          <p className="text-[18px] font-light tracking-[6px]  text-zinc-400">
            Notes from the Studio{" "}
          </p>
        </header>
      </div>

      {/* Grid Section */}
      <div className="max-w-7xl w-full mt-6 lg:mt-15 mb-10 lg:mb-18">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {posts.map((post: any) => (
            <Link
              key={post.slug.current}
              // Ensure the link matches your dynamic route structure: /[lang]/blog/[slug]
              href={`/blog/${post.slug.current}`}
              className="group"
            >
              <div className="relative aspect-[16/10] overflow-hidden mb-6 bg-zinc-900">
                {post.mainImage && (
                  <Image
                    src={urlFor(post.mainImage).url()}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
              </div>
              <div className="space-y-3">
                <h2
                  className="text-xl font-medium text-black leading-tight group-hover:text-[#8ed1fc] transition-colors uppercase"
                  style={{ fontFamily: "var(--font-D-DIN)" }}
                >
                  {post.title}
                </h2>
                <p className="text-zinc-500 text-[14px] line-clamp-2 font-light leading-relaxed tracking-wider">
                  {post.excerpt}
                </p>
                <div className="pt-2 text-[10px] uppercase tracking-widest text-zinc-600">
                  {new Date(post.publishedAt).toLocaleDateString(params.lang)} —{" "}
                  {post.authorName}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
