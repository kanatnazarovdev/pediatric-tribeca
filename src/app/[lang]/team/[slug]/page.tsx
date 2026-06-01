// src/app/[lang]/team/[slug]/page.tsx

import Image from "next/image";
import Link from "next/link"; 
import { client } from "@/sanity/lib/client";
import { PortableText } from "@portabletext/react";
import { Metadata } from "next";

async function getDoctor(slug: string) {
  return await client.fetch(
    `*[_type == "doctor" && slug.current == $slug][0]{
      name,
      role,
      "imageUrl": image.asset->url,
      bio,
      education,
      location
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
    { slug }
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
        {isZh ? "未找到医生" : isEs ? "Doctor no encontrado" : "Doctor not found"}
      </div>
    );

  return (
    <main className="bg-[#FCFCFC] min-h-screen">
      <div className="flex flex-col lg:flex-row items-stretch">
        <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 md:p-20 lg:p-32 lg:pr-16">
          <div className="max-w-xl w-full mx-auto">
            <nav className="mb-20">
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
              <h1 className="text-5xl md:text-6xl font-light tracking-tight text-gray-900 uppercase leading-[0.9] mb-10">
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

            <article className="prose prose-sm max-w-none text-gray-600 leading-relaxed tracking-wide space-y-6">
              <PortableText value={doctor.bio} />
            </article>

            <div className="mt-20 pt-10 border-t border-gray-100">
              <a
                href="https://truelark.com/bookonline/#/location?businessId=80613"
                target="_blank"
              >
                <button className="group relative text-[10px] tracking-[0.4em] uppercase font-bold py-5 px-12 border border-black overflow-hidden transition-all duration-500">
                  <span className="relative z-10 group-hover:text-white transition-colors duration-500">
                    {isZh ? "立即预约咨询" : isEs ? "Programar una Consulta" : "Schedule a Consultation"}
                  </span>
                  <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </button>
              </a>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 min-h-[60vh] lg:h-screen lg:sticky lg:top-0 flex items-center justify-center lg:justify-start lg:pl-10 p-10 lg:p-0 bg-white lg:mt-20">
          <div className="relative w-full max-w-[480px] aspect-[1/1.25] bg-[#F3F3F3] overflow-hidden">
            <Image
              src={doctor.imageUrl}
              alt={`${doctor.name} - ${doctor.role} at Tribeca Dental Studio 4 Kids`} 
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-top transition-all duration-1000 ease-in-out hover:scale-105"
            />
          </div>
        </div>
      </div>
    </main>
  );
}