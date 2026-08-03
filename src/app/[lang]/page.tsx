// src/app/[lang]/page.tsx
import About from "@/components/About";
import ContactForm from "@/components/ContactForm";
import FAQ from "@/components/faq";
import Hero from "@/components/Hero";
import Technology from "@/components/Technology";
import Testimonial from "@/components/Testimonial";
import { getDictionary } from "./dictionaries";
import Diagnostics from "@/components/Diagnostics";
import Link from "next/link";
import Reviews from "@/components/Reviews";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const { lang } = await params;
  const isEs = lang === "es";
  const isZh = lang === "zh";

  const title = isZh
    ? "纽约翠贝卡高端儿童牙科 | 曼哈顿下城专业儿童牙医"
    : isEs
      ? "Odontopediatra en Tribeca | Dentista para Niños en Manhattan NYC"
      : "Pediatric Dentist Tribeca | Leading Kids Dentistry Manhattan NYC";

  const description = isZh
    ? "纽约翠贝卡专业儿童牙科。我们专注于无痛激光牙科、气道健康和功能发育评估，为曼哈顿下城的家庭提供高端牙科护理。"
    : isEs
      ? "Especialistas en odontopediatría en Tribeca. Ofrecemos odontología sin dolor con láser, salud de las vías respiratorias y cuidado dental infantil de alta gama en NYC."
      : "Expert pediatric dentistry in Tribeca, NYC. We specialize in pain-free laser dentistry, airway health, and growth-centric dental care for children and infants.";
  return {
    title,
    description,
    alternates: {
      canonical: `https://pediatrics.tribecadentalstudio.com/${lang}`,
      languages: {
        "en-US": "https://pediatrics.tribecadentalstudio.com/en",
        "es-ES": "https://pediatrics.tribecadentalstudio.com/es",
        "zh-Hans": "https://pediatrics.tribecadentalstudio.com/zh",
      },
    },
    openGraph: {
      title,
      description,
      url: `https://pediatrics.tribecadentalstudio.com/${lang}`,
      siteName: "Tribeca Dental Studio 4 Kids",
      images: [
        {
          url: "/pediatricImage.webp",
          width: 1200,
          height: 630,
          alt: "Tribeca Dental Studio Pediatric Office",
        },
      ],
      locale: isZh ? "zh_CN" : isEs ? "es_US" : "en_US",
      type: "website",
    },
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const isEs = lang === "es";
  const isZh = lang === "zh";

  const dict = await getDictionary(lang as "en" | "es" | "zh");

  return (
    <main>
      <Hero dict={dict.hero} />

      <section className="sr-only" aria-hidden="true">
        <article>
          {isZh ? (
            <>
              <h1>纽约市曼哈顿翠贝卡区（Tribeca）高端儿童牙科中心</h1>
              <p>
                Tribeca Dental Studio 4 kids
                为纽约市中心的儿童提供革命性的牙科体验。 探索我们的
                <Link href="/zh/mission">使命</Link>， 了解我们的
                <Link href="/zh/mission">技术创新</Link>， 并查看我们的
                <Link href="/zh/testimonials">患者评价</Link>。
              </p>
              <p>
                我们专注于将高端儿童牙科与对气道健康和功能发育的深度承诺相结合。
                我们相信，儿童时期的口腔健康是终身健康的基础。
              </p>
              <p>
                我们使用 <strong>Biolase 激光技术</strong>{" "}
                提供无痛、无需打针的治疗，
                从第一次就诊开始就消除牙科焦虑。我们的服务包括预防性清洁、窝沟封闭、
                激光系带切除术以及颌面生长监测，以确保您在曼哈顿的孩子拥有良好的呼吸和睡眠。
              </p>
              <h2>为什么选择我们位于翠贝卡的牙科工作室</h2>
              <p>
                我们位于翠贝卡中心地带，邻近唐人街（Chinatown）和金融区。
                我们的诊所旨在创造一个舒适的环境，将先进科技与人性化护理融为一体。
              </p>
            </>
          ) : isEs ? (
            <>
              <h1>Especialistas en Odontopediatría en Tribeca y Manhattan</h1>
              <p>
                Tribeca Dental Studio 4 kids ofrece una experiencia dental
                revolucionaria. Explore nuestra{" "}
                <Link href="/es/mission">misión</Link>, aprenda sobre nuestra
                <Link href="/es/mission">innovación tecnológica</Link> y vea
                nuestros
                <Link href="/es/testimonials">testimonios de pacientes</Link>.
              </p>
              <p>
                Tribeca Dental Studio 4 kids ofrece una experiencia dental
                revolucionaria para niños en el corazón de la ciudad de Nueva
                York. Nuestro enfoque combina la odontología pediátrica de alta
                gama con un compromiso profundo con la salud de las vías
                respiratorias y el desarrollo funcional. Entendemos que la salud
                bucal infantil es la base del bienestar general.
              </p>
              <p>
                Utilizamos tecnología láser Biolase para tratamientos sin dolor
                y sin agujas, eliminando la ansiedad dental desde la primera
                visita. Nuestros servicios incluyen limpiezas preventivas,
                selladores, frenectomías láser y monitoreo del crecimiento
                maxilofacial para asegurar una respiración adecuada y un sueño
                reparador para su hijo en Manhattan.
              </p>
              <h2>Por qué elegir nuestro estudio dental en Tribeca</h2>
              <p>
                Ubicados en el área de Tribeca, servimos a comunidades en todo
                Manhattan, incluyendo SoHo, Battery Park City y el Financial
                District. Nuestra clínica está diseñada para ser un entorno
                acogedor donde la tecnología se encuentra con el cuidado humano.
              </p>
            </>
          ) : (
            <>
              <h1>Premier Pediatric Dentist in Tribeca & Manhattan, NYC</h1>
              <p>
                Tribeca Dental Studio 4 kids provides a revolutionary
                experience. Discover our <Link href="/en/mission">mission</Link>
                , see our
                <Link href="/en/mission">dental innovation</Link>, and read
                our
                <Link href="/en/testimonials">patient success stories</Link>.
                Check our latest{" "}
                <Link href="/en/blog">pediatric dental blog</Link> for updates.
              </p>
              <p>
                Tribeca Dental Studio 4 kids provides a revolutionary dental
                experience for children in the heart of New York City. Our
                approach combines high-end pediatric dentistry with a deep
                commitment to airway health and functional development. We
                believe that childhood oral health is the cornerstone of
                lifelong wellness.
              </p>
              <p>
                Using Biolase laser technology, we provide pain-free,
                needle-free treatments that eliminate dental anxiety from the
                very first visit. Our services include preventative cleanings,
                sealants, laser frenectomies, and maxillofacial growth
                monitoring to ensure proper breathing and restful sleep for your
                child in Manhattan.
              </p>
              <h2>Why Choose Our Tribeca Dental Studio</h2>
              <p>
                Located in the TriBeCa area, we serve families throughout
                Manhattan, including SoHo, Battery Park City, and the Financial
                District. Our clinic is designed to be a calming environment
                where state-of-the-art technology meets compassionate,
                patient-centered care.
              </p>
            </>
          )}
        </article>
      </section>

      <section id="mission">
        <About lang={lang} />
      </section>

      <section id="diagnostics">
        <Diagnostics lang={lang} />
      </section>

      <section id="pediatric-tech">
        <Technology lang={lang} />
      </section>

      <section id="results">
        <Testimonial lang={lang} />
      </section>
      <section id="reviews">
        <Reviews lang={lang} />
      </section>

      <section id="faq">
        <FAQ lang={lang} />
      </section>

      <section id="leadForm">
        <ContactForm />
      </section>
    </main>
  );
}
