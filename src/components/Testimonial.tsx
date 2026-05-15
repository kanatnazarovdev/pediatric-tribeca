"use client";
import Container from "./Container";
import { motion } from "framer-motion";

interface TestimonialProps {
  lang: string;
}

export default function PediatricTestimonial({ lang }: TestimonialProps) {
  const isEs = lang === "es";
  const isZh = lang === "zh";

  const testimonials = [
    {
      quote: isZh
        ? "看到孩子在发育上的进步真是太棒了。他们终于能安稳入睡，白天的精力也充沛了许多。"
        : isEs 
        ? "Ver el progreso en el desarrollo de mi hijo ha sido increíble. Ahora duerme profundamente y tiene mucha más energía durante el día."
        : "Watching the progress in my child’s development has been incredible. They are finally sleeping soundly and have so much more energy during the day.",
      author: isZh ? "来自家长的真实评价" : isEs ? "Padre de Familia" : "Family Member"
    },
    {
      quote: isZh
        ? "这家位于曼哈顿下城的专业诊所改变了我们的看法。他们不仅是在看诊，更是在保障我孩子的未来健康。"
        : isEs
        ? "El enfoque preventivo de Tribeca cambió nuestra perspectiva. No solo están tratando a un paciente; están asegurando el futuro de mi hijo."
        : "The preventative approach at Tribeca Dental Studio 4 kids changed our perspective. They aren’t just treating a patient; they are securing my child’s future.",
      author: isZh ? "曼哈顿下城家长" : isEs ? "Cuidado Preventivo" : "Preventative Care Parent"
    },
    {
      quote: isZh
        ? "环境非常安静且专业。我女儿从第一刻起就感到很安全，她呼吸质量的改善非常显著。"
        : isEs
        ? "Un ambiente tan tranquilo y profesional. Mi hija se sintió segura desde el primer momento, y los resultados en su respiración son notables."
        : "Such a calm and professional environment. My daughter felt safe from the first moment, and the results in her breathing are remarkable.",
      author: isZh ? "气道健康患者家长" : isEs ? "Salud de las Vías Respiratorias" : "Airway Health Patient"
    }
  ];

  return (
    <section className="bg-gray-200 py-24 md:py-40 border-t border-gray-100">
      <Container>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center mb-24">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-[10px] uppercase tracking-[0.8em] text-[#C5A059] font-bold block mb-6"
            >
              {isZh ? "曼哈顿家长的信赖评价" : isEs ? "Testimonios de Padres" : "Parental Testimonials"}
            </motion.span>
            <h2 className="text-black font-serif text-5xl md:text-6xl tracking-tight leading-tight">
              {isZh ? "信赖成长" : isEs ? "Confianza en el" : "Confidence in"} <br />
              <span className="italic font-light text-gray-400">
                {isZh ? "发育与健康" : isEs ? "Crecimiento" : "Development"}
              </span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-0">
            {testimonials.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1.2, delay: index * 0.2 }}
                className={`flex flex-col items-center text-center space-y-10 px-8 
                  ${index !== 2 ? "md:border-r border-gray-100" : ""}`}
              >
                {/* Visual Icon - Quote Mark */}
                <span className="text-4xl font-serif text-[#C5A059] opacity-30">“</span>
                
                <blockquote className="text-[18px] md:text-[20px] font-serif text-black leading-relaxed font-light italic">
                  {item.quote}
                </blockquote>
                
                <div className="space-y-4 pt-6">
                  {/* The long line you liked */}
                  <div className="h-[40px] w-[1px] bg-[#C5A059] mx-auto" />
                  <cite className="text-[10px] uppercase tracking-[0.4em] not-italic text-gray-400 font-medium block">
                    — {item.author}
                  </cite>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}