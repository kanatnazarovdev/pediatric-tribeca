/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/[lang]/team/[slug]/page.tsx

import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { PortableText } from "@portabletext/react";
import { Metadata } from "next";
export const portableTextComponents: any = {
  block: {
    h2: ({ children }: any) => (
      <h2
        className="text-3xl font-light uppercase tracking-tight text-black mt-16 mb-6"
        style={{ fontFamily: "var(--font-d-din)" }}
      >
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl font-medium uppercase tracking-widest text-zinc-800 mt-10 mb-4">
        {children}
      </h3>
    ),
    normal: ({ children }: any) => (
      <p className="mb-8 leading-relaxed text-zinc-800 font-light text-lg">
        {children}
      </p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-2 border-[#C5A059] pl-6 my-10 italic text-zinc-600">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }: any) => {
      const isExternal = !value.href.startsWith("/");
      return (
        <Link
          href={value.href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="text-[#C5A059] underline decoration-zinc-300 underline-offset-4 hover:text-black transition-all duration-300 font-medium"
        >
          {children}
        </Link>
      );
    },
    strong: ({ children }: any) => (
      <strong className="font-bold text-black">{children}</strong>
    ),
  },
};
async function getDoctor(slug: string) {
  return await client.fetch(
    `*[_type == "doctor" && slug.current == $slug][0]{
      name,
      role,
      "imageUrl": image.asset->url,
      bio,
      education,
      location,
      links[] {
        title,
        url
      }
    }`,
    { slug },
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; lang: string }>;
}): Promise<Metadata> {
  const { slug, lang } = await params;
  const isEs = lang === "es";
  const isZh = lang === "zh";

  const doctor = await client.fetch(
    `*[_type == "doctor" && slug.current == $slug][0]{ name, role }`,
    { slug },
  );

  if (!doctor) return { title: "Doctor Not Found" };

  const title = isZh
    ? `${doctor.name} | ${doctor.role} | 纽约曼哈顿专家`
    : isEs
      ? `${doctor.name} | ${doctor.role} en Tribeca NYC`
      : `${doctor.name} | ${doctor.role} in Tribeca NYC`;

  const description = isZh
    ? `了解 ${doctor.name}，他是 Tribeca Dental Studio 4 kids 的专业 ${doctor.role}。在曼哈顿翠贝卡提供顶尖的儿童牙科和气道健康护理。`
    : isEs
      ? `Conozca a ${doctor.name}, ${doctor.role} en Tribeca Dental Studio 4 kids. Especialista en odontopediatría y cuidado dental para niños en Manhattan.`
      : `Meet ${doctor.name}, a specialized ${doctor.role} at Tribeca Dental Studio 4 kids. Providing expert pediatric dental care and airway health in Tribeca, NYC.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://pediatrics.tribecadentalstudio.com/${lang}/team/${slug}`,
      languages: {
        "en-US": `https://pediatrics.tribecadentalstudio.com/en/team/${slug}`,
        "es-ES": `https://pediatrics.tribecadentalstudio.com/es/team/${slug}`,
        "zh-CN": `https://pediatrics.tribecadentalstudio.com/zh/team/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      type: "profile",
    },
  };
}

export default async function DoctorProfile({
  params,
}: {
  params: Promise<{ slug: string; lang: string }>;
}) {
  const { slug, lang } = await params;
  const doctor = await getDoctor(slug);

  const isEs = lang === "es";
  const isZh = lang === "zh";

  if (!doctor)
    return (
      <div className="h-screen flex items-center justify-center uppercase tracking-[0.5em] text-[10px] text-gray-400">
        {isZh
          ? "未找到医生"
          : isEs
            ? "Doctor no encontrado"
            : "Doctor not found"}
      </div>
    );

  return (
    <main className="bg-[#FCFCFC] min-h-screen pt-[72px] lg:pt-0">
      <div className="flex flex-col-reverse lg:flex-row items-stretch">
        {/* Left/Bottom Column: Doctor Info */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 md:p-20 lg:p-32 lg:pr-16">
          <div className="max-w-xl w-full mx-auto">
            <nav className="mb-20 hidden lg:block">
              <Link
                href={`/${lang}/team`}
                className="group inline-flex items-center text-[10px] tracking-[0.3em] uppercase text-gray-400 hover:text-black transition-colors"
              >
                <span className="mr-2 transition-transform group-hover:-translate-x-1">
                  ←
                </span>
                {isZh ? "返回团队" : isEs ? "Volver al Equipo" : "Back to Team"}
              </Link>
            </nav>

            <header className="mb-16">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-gray-900 uppercase leading-[1.1] lg:leading-[0.9] mb-10">
                {doctor.name}
              </h1>

              <div className="flex flex-col space-y-6 border-l border-gray-200 pl-8 py-2">
                <div>
                  <p className="text-[9px] tracking-[0.3em] uppercase text-gray-400 font-bold mb-2">
                    {isZh ? "办公地点" : isEs ? "Ubicación" : "Location"}
                  </p>
                  <p className="text-[11px] tracking-widest uppercase font-medium text-gray-800">
                    {doctor.location || "New York"}
                  </p>
                </div>
                <div>
                  <p className="text-[9px] tracking-[0.3em] uppercase text-gray-400 font-bold mb-2">
                    {isZh ? "职位职务" : isEs ? "Cargo" : "Position"}
                  </p>
                  <p className="text-[11px] tracking-widest uppercase font-medium text-gray-800">
                    {doctor.role}
                  </p>
                </div>
              </div>
            </header>

            <article className="prose prose-sm max-w-none text-gray-600 leading-relaxed tracking-wide space-y-6 mb-12">
              <PortableText value={doctor.bio} />
            </article>

            {/* Rendering Education details if they exist in Sanity */}
            {doctor.education && (
              <div className="mb-8 pb-6 border-b border-gray-100">
                <p className="text-[9px] tracking-[0.3em] uppercase text-gray-400 font-bold mb-2">
                  {isZh ? "教育经历" : isEs ? "Educación" : "Education"}
                </p>
                <div className="text-xs text-gray-600 tracking-wide leading-relaxed">
                  <PortableText
                    value={doctor.education}
                    components={portableTextComponents}
                  />
                </div>
              </div>
            )}

            {/* Loop through all items inside the links array from Sanity */}
            {doctor.links && doctor.links.length > 0 && (
              <div className="mb-16 pt-2">
                <p className="text-[9px] tracking-[0.3em] uppercase text-gray-400 font-bold mb-4">
                  {isZh ? "相关链接" : isEs ? "Enlaces" : "Links & Resources"}
                </p>
                <div className="flex flex-col space-y-3">
                  {doctor.links.map(
                    (link: { title: string; url: string }, index: number) => (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center text-xs tracking-wider text-gray-600 hover:text-black underline underline-offset-4 transition-colors"
                      >
                        {link.title}
                        <span className="ml-1 inline-block transition-transform group-hover:translate-x-1">
                          →
                        </span>
                      </a>
                    ),
                  )}
                </div>
              </div>
            )}

            <div className="mt-12">
              <a
                href="https://www.patientsreach.com/schedule/TribecaDentalStudio/patient_types/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="w-full sm:w-auto group relative text-[10px] tracking-[0.4em] uppercase font-bold py-5 px-12 border border-black overflow-hidden transition-all duration-500">
                  <span className="relative z-10 group-hover:text-white transition-colors duration-500">
                    {isZh
                      ? "立即预约咨询"
                      : isEs
                        ? "Programar una Consulta"
                        : "Schedule a Consultation"}
                  </span>
                  <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </button>
              </a>
            </div>
          </div>
        </div>

        {/* Right/Top Column: Image Display */}
        <div className="w-full lg:w-1/2 lg:h-screen lg:sticky lg:top-0 flex items-center justify-center lg:justify-start lg:pl-10 p-0 sm:p-10 lg:p-0 bg-white lg:mt-20">
          <div className="relative w-full max-w-full lg:max-w-[480px] aspect-[4/5] sm:aspect-square lg:aspect-[1/1.25] bg-[#F3F3F3] overflow-hidden">
            <Image
              src={doctor.imageUrl}
              alt={`${doctor.name} - ${doctor.role} at Tribeca Dental Studio 4 Kids`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center lg:object-top transition-all duration-1000 ease-in-out hover:scale-105"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
