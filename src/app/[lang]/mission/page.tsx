import CommunityPage from "./mission";
import { getAlternates } from "@/hooks/helper";
import { Metadata } from "next";

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ lang: string }> 
}): Promise<Metadata> {
  const { lang: rawLang } = await params;
  
  // Logic to handle en, es, and zh
  const lang = rawLang === "es" ? "es" : rawLang === "zh" ? "zh" : "en";
  const isEs = lang === "es";
  const isZh = lang === "zh";

  return {
    title: isZh
      ? "我们的使命 | Tribeca Dental Studio 4 kids | 曼哈顿专业儿童牙科"
      : isEs 
      ? "Nuestra Misión | Tribeca Dental Studio 4 kids" 
      : "Our Mission | Tribeca Dental Studio 4 kids",
    description: isZh
      ? "我们的使命是通过先进的教育、无痛激光技术以及对翠贝卡社区的深度承诺，重新定义儿童牙科体验。服务于曼哈顿下城家庭。"
      : isEs
      ? "Nuestra misión es transformar la odontología pediátrica a través de la educación, la tecnología láser sin dolor y el compromiso con la comunidad de Tribeca."
      : "Our mission is to transform pediatric dentistry through education, pain-free laser technology, and a deep commitment to the Tribeca community.",
    alternates: getAlternates(lang, "mission"),
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
      {/* SEO ARTICLE SECTION (Hidden from UI, visible to Google) */}
      <div className="sr-only" aria-hidden="true">
        {isZh ? (
          <article>
            <h1>我们在曼哈顿下城的儿童牙科社区使命</h1>
            <p>
              在 Tribeca Dental Studio 4 kids，我们的使命远超传统牙科。我们致力于通过三大核心支柱：教育、技术和社区参与，构建曼哈顿儿童健康的未来。我们相信，口腔健康始于消除对看牙的恐惧。通过在当地唐人街和翠贝卡附近的幼儿园及学校举办互动工作坊，我们将恐惧转化为好奇心。
            </p>
            <p>
              作为曼哈顿下城（Downtown Manhattan）社区的一部分，我们与当地教育机构紧密合作。通过利用高端电影制作技术记录患者故事，我们为儿童护理提供完全的透明度。我们确保每位孩子都能获得预防性、无痛激光治疗以及世界一流的牙科关注。
            </p>
            <ul>
              <li>纽约市 12+ 所合作学校与教育机构</li>
              <li>通过公益工作坊教育了 500+ 名儿童</li>
              <li>100% 致力于临床透明化与实景影像记录</li>
              <li>专注于气道发育、功能性成长以及无痛诊疗标准</li>
            </ul>
          </article>
        ) : isEs ? (
          <article>
            <h1>Nuestra Misión Pediátrica en Manhattan</h1>
            <p>
              En Tribeca Dental Studio 4 kids, nuestra misión va más allá de la odontología 
              tradicional. Nos dedicamos a mejorar el bienestar infantil en toda el área 
              de Manhattan a través de tres pilares fundamentales: educación, tecnología 
              y comunidad.
            </p>
            <p>
              Nuestra clínica se enorgullece de ser una parte integral de la comunidad de 
              Tribeca. Colaboramos estrechamente con instituciones educativas para 
              fomentar hábitos saludables desde una edad temprana.
            </p>
            <ul>
              <li>Más de 12 escuelas asociadas en Nueva York</li>
              <li>Más de 500 niños educados a través de nuestros talleres</li>
              <li>Compromiso total con la salud de las vías respiratorias infantiles</li>
              <li>Transparencia clínica mediante documentación visual</li>
            </ul>
          </article>
        ) : (
          <article>
            <h1>Our Pediatric Mission in Manhattan</h1>
            <p>
              At Tribeca Dental Studio 4 kids, our mission extends beyond traditional 
              dentistry. We are dedicated to architecting the future of childhood 
              wellness across Manhattan through three core pillars: education, 
              technology, and community engagement.
            </p>
            <p>
              Our clinic is proud to be a rooted part of the TriBeCa community. We 
              partner with local educational institutions to foster healthy habits 
              from a young age.
            </p>
            <ul>
              <li>12+ Partner schools in New York City</li>
              <li>500+ Children educated through our workshop series</li>
              <li>100% Commitment to clinical transparency and documentation</li>
              <li>Focus on airway development and functional pediatric growth</li>
            </ul>
          </article>
        )}
      </div>

      {/* RENDER THE ACTUAL VISUAL COMPONENT */}
      <CommunityPage params={params} />
    </>
  );
}