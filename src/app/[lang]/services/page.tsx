import ServicesPage from "./services"; // 如果组件文件名有更改，请确保路径正确
import { getAlternates } from "@/hooks/helper";
import { Metadata } from "next";

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ lang: string }> 
}): Promise<Metadata> {
  const { lang: rawLang } = await params;
  
  // Normalize language selection
  const lang = rawLang === "es" ? "es" : rawLang === "zh" ? "zh" : "en";
  const isEs = lang === "es";
  const isZh = lang === "zh";

  return {
    title: isZh
      ? "综合儿童齿科与正畸诊疗服务 | Tribeca Dental Studio 4 Kids | 曼哈顿"
      : isEs 
      ? "Servicios de Odontopediatría y Ortodoncia | Tribeca Dental Studio 4 Kids" 
      : "Pediatric Dental & Orthodontic Services | Tribeca Dental Studio 4 Kids",
    description: isZh
      ? "提供全方位儿童齿科服务：预防保健、Biolase无痛激光诊疗、早期正畸与气道评估。位于纽约曼哈顿翠贝卡。"
      : isEs
      ? "Servicios dentales integrales para niños: odontología preventiva, láser Biolase sin dolor, ortodoncia temprana y evaluación de vías respiratorias en Tribeca, NYC."
      : "Comprehensive pediatric dental services: preventive care, painless Biolase laser dentistry, early orthodontics, and airway evaluations in Tribeca, NYC.",
    // 将 URL 规范别名更新为 services
    alternates: getAlternates(lang, "services"),
  };
}

export default async function Page({ 
  params 
}: { 
  params: Promise<{ lang: string }> 
}) {
  const { lang: rawLang } = await params;
  const lang = rawLang === "es" ? "es" : rawLang === "zh" ? "zh" : "en";
  
  const isEs = lang === "es";
  const isZh = lang === "zh";

  return (
    <>
      {/* SEO ARTICLE SECTION (Visible to Search Engines) */}
      <div className="sr-only" aria-hidden="true">
        {isZh ? (
          <article>
            <h1>纽约曼哈顿翠贝卡的专业儿童齿科与正畸服务</h1>
            <p>
              在 Tribeca Dental Studio 4 Kids，我们为儿童及青少年提供全方位的综合齿科诊疗服务。我们位于曼哈顿翠贝卡的核心诊所结合了专业的技术与温情的护理，涵盖预防性牙科、早期正畸干预、儿童气道健康评估以及微创修复治疗。
            </p>
            <p>
              我们采用先进的 Biolase 激光技术进行无针、无痛的诊疗，彻底消除孩子对看牙的恐惧；同时利用 iTero 3D 数码扫描替代传统咬模，极大地提升舒适度。作为纽约下城领先的儿童多专科牙科中心，我们致力于为每一个孩子打造持久、自信且健康的笑容。
            </p>
          </article>
        ) : isEs ? (
          <article>
            <h1>Servicios Odontológicos Integrales para Niños en Tribeca, NYC</h1>
            <p>
              En Tribeca Dental Studio 4 Kids, ofrecemos una gama completa de servicios de odontopediatría y ortodoncia diseñados para la salud bucal de su hijo. Nuestra clínica en el Bajo Manhattan combina tecnología avanzada con un enfoque cálido y sin estrés.
            </p>
            <p>
              Desde odontología preventiva y tratamientos con láser Biolase sin agujas ni dolor, hasta la evaluación del desarrollo facial y ortodoncia temprana, nuestros especialistas colaboran bajo un mismo techo para garantizar sonrisas saludables y duraderas en Nueva York.
            </p>
          </article>
        ) : (
          <article>
            <h1>Comprehensive Pediatric Dental & Orthodontic Services in Tribeca, NYC</h1>
            <p>
              At Tribeca Dental Studio 4 Kids, we provide a full spectrum of pediatric dental and orthodontic services tailored for growing smiles. Located in Lower Manhattan, our studio combines advanced dental technology with a gentle, child-friendly approach.
            </p>
            <p>
              Our services include preventive dentistry, painless Biolase laser treatments, early Phase 1 orthodontics, Invisalign® First, and airway health evaluations. We ensure a comfortable, anxiety-free experience for every child in New York City.
            </p>
          </article>
        )}
      </div>

      <ServicesPage />
    </>
  );
}