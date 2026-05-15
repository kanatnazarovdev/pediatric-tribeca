import InnovationPage from "./innovation";
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
      ? "牙科创新与领先技术 | Tribeca Dental Studio 4 kids | 无痛激光诊疗"
      : isEs 
      ? "Innovación y Tecnología Dental | Tribeca Dental Studio 4 kids" 
      : "Dental Innovation & Technology | Tribeca Dental Studio 4 kids",
    description: isZh
      ? "探索我们的前沿牙科技术：Biolase无痛激光、3D数码扫描以及针对儿童的微创诊疗方案。位于曼哈顿翠贝卡。"
      : isEs
      ? "Descubra nuestra tecnología dental de vanguardia: láser Biolase sin agujas, escaneos digitales y odontología de mínima intervención para niños."
      : "Experience our cutting-edge dental tech: needle-free Biolase laser, digital scans, and minimally invasive dentistry for children.",
    alternates: getAlternates(lang, "innovation"),
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
            <h1>曼哈顿翠贝卡的牙科技术创新</h1>
            <p>
              在 Tribeca Dental Studio 4 kids，我们正通过不断的创新重新定义儿童牙科。我们位于曼哈顿的诊所采用先进的 Biolase 激光技术进行无针、无痛的诊疗操作，彻底消除孩子对看牙的恐惧。我们专注于儿童气道健康和颌面发育，利用 iTero 数码扫描技术替代传统的咬模材料，提升舒适度。我们的使命是提供预防性、微创的牙科护理，确保纽约市的所有儿童都能拥有持久、健康的笑容。
            </p>
            <p>
              作为曼哈顿下城领先的儿童牙科中心，我们不仅关注牙齿修复，更关注整体健康。我们的技术涵盖了从早期的气道干预到高级的正畸监测。通过 3D 影像技术，我们可以精准预测孩子的口腔发育趋势，从而在问题发生前进行预防。选择我们，即是选择了一个结合了顶级科技与温情护理的专业团队。
            </p>
          </article>
        ) : isEs ? (
          <article>
            <h1>Innovación Dental en Tribeca y el Bajo Manhattan</h1>
            <p>
              En Tribeca Dental Studio 4 kids, estamos redefiniendo la odontopediatría 
              a través de la innovación constante. Nuestra clínica en Manhattan utiliza 
              el láser Biolase para procedimientos sin agujas y sin dolor, eliminando 
              el miedo al dentista para siempre. Nos especializamos en la salud de las 
              vías respiratorias y el desarrollo facial, utilizando escaneos digitales 
              iTero para evitar las pastas de impresión incómodas. Nuestra misión es 
              proporcionar un cuidado dental preventivo y mínimamente invasivo que 
              garantice sonrisas saludables y duraderas para todos los niños de Nueva York.
            </p>
            <p>
              Nuestra tecnología de vanguardia permite diagnósticos más precisos y tratamientos mucho más cortos. Entendemos que el tiempo de los padres en NYC es valioso y la comodidad de los niños es primordial. Al integrar la odontología funcional con la estética dental avanzada, aseguramos que el desarrollo de su hijo sea óptimo desde la primera infancia.
            </p>
          </article>
        ) : (
          <article>
            <h1>Dental Innovation in Tribeca</h1>
            <p>
              At Tribeca Dental Studio 4 kids, we are redefining pediatric dentistry 
              through constant innovation. Our Manhattan clinic utilizes the Biolase 
              laser for needle-free and pain-free procedures, eliminating the fear 
              of the dentist forever. We specialize in airway health and facial 
              development, using iTero digital scans to avoid uncomfortable impression 
              pastes. Our mission is to provide preventative and minimally invasive 
              dental care that ensures healthy, long-lasting smiles for all children 
              in New York City.
            </p>
          </article>
        )}
      </div>

      <InnovationPage />
    </>
  );
}