"use client";
import { useState } from "react";
import Container from "./Container";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";

export default function PediatricContactForm() {
  const params = useParams();
  const lang = params.lang as string;

  const isEs = lang === "es";
  const isZh = lang === "zh";

  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const formData = new FormData(e.currentTarget);
    
    const payload = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      childName: formData.get("childName"),
      lang: lang,
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Submission failed");
      setStatus("success");
    } catch (error) {
      console.error("Submission Error:", error);
      setStatus("idle");
      const errorMsg = isZh 
        ? "发生错误，请稍后再试。" 
        : isEs 
        ? "Algo salió mal. Por favor intente de nuevo." 
        : "Something went wrong. Please try again.";
      alert(errorMsg);
    }
  };

  return (
    <section className="bg-white py-24 md:py-48 border-t border-gray-100" id="leadForm">
      <Container>
        <div className="max-w-2xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <span className="text-[10px] uppercase tracking-[0.8em] text-[#C5A059] font-bold block mb-6">
              {isZh ? '专业化诊疗护理' : isEs ? 'Atención Especializada' : 'Specialized Care'}
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-black leading-tight mb-8">
              {isZh ? (
                <>预约您的 <span className="italic font-light text-gray-400">孩子健康咨询</span></>
              ) : isEs ? (
                <>Programe la <span className="italic font-light text-gray-400">Consulta de su Hijo.</span></>
              ) : (
                <>Schedule Your <span className="italic font-light text-gray-400">Child&apos;s Consultation.</span></>
              )}
            </h2>
            
            {/* Instant Booking Link */}
            <div className="flex flex-col items-center space-y-4">
              <p className="text-xs uppercase tracking-widest text-gray-500 font-light">
                {isZh ? '选择您的预约方式' : isEs ? 'Elija su preferencia' : 'Choose your preference'}
              </p>
              <div className="flex flex-wrap justify-center gap-6 items-center">
                <a 
                  href="https://truelark.com/bookonline/#/location?businessId=80613"
                  target="_blank"
                  className="text-[11px] uppercase tracking-[0.3em] font-bold text-[#C5A059] border-b border-[#C5A059] pb-1 hover:text-black hover:border-black transition-all duration-300"
                >
                  {isZh ? '立即在线预约' : isEs ? 'Reservar al Instante' : 'Book Instantly Online'}
                </a>
                <span className="text-gray-300 text-[10px] uppercase tracking-widest italic">{isZh ? '— 或 —' : isEs ? '— o —' : '— or —'}</span>
                <p className="text-[11px] uppercase tracking-[0.3em] text-gray-400">
                  {isZh ? '填写下方信息我们将与您联系' : isEs ? 'Envíe sus datos abajo' : 'Request a Callback Below'}
                </p>
              </div>
            </div>
          </div>

          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20 border border-[#C5A059]/20 bg-gray-50"
            >
              <p className="font-serif italic text-2xl text-black px-6">
                {isZh 
                  ? "谢谢。我们的团队将很快与您联系，为您的孩子提供护理。"
                  : isEs
                  ? "Gracias. Nuestro equipo se pondrá en contacto con usted para cuidar de su pequeño."
                  : "Thank you. Our team will contact you shortly to care for your little one."}
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                
                <div className="relative border-b border-black/10 focus-within:border-[#C5A059] transition-colors duration-500">
                  <label className="text-[9px] uppercase tracking-[0.4em] text-gray-400 block mb-2">
                    {isZh ? '名字' : isEs ? 'Nombre' : 'First Name'}
                  </label>
                  <input
                    name="firstName"
                    type="text"
                    required
                    className="w-full bg-transparent py-3 outline-none text-black font-light tracking-wide"
                    placeholder={isZh ? '您的名字' : isEs ? 'Su nombre' : 'Your first name'}
                  />
                </div>

                <div className="relative border-b border-black/10 focus-within:border-[#C5A059] transition-colors duration-500">
                  <label className="text-[9px] uppercase tracking-[0.4em] text-gray-400 block mb-2">
                    {isZh ? '姓氏' : isEs ? 'Apellido' : 'Last Name'}
                  </label>
                  <input
                    name="lastName"
                    type="text"
                    required
                    className="w-full bg-transparent py-3 outline-none text-black font-light tracking-wide"
                    placeholder={isZh ? '您的姓氏' : isEs ? 'Su apellido' : 'Your last name'}
                  />
                </div>

                <div className="relative border-b border-black/10 focus-within:border-[#C5A059] transition-colors duration-500">
                  <label className="text-[9px] uppercase tracking-[0.4em] text-gray-400 block mb-2">
                    {isZh ? '孩子姓名 (选填)' : isEs ? 'Nombre del Niño (Opcional)' : 'Child’s Name (Optional)'}
                  </label>
                  <input
                    name="childName"
                    type="text"
                    className="w-full bg-transparent py-3 outline-none text-black font-light tracking-wide"
                    placeholder={isZh ? '孩子的姓名' : isEs ? 'Nombre del pequeño' : 'Little one’s name'}
                  />
                </div>

                <div className="relative border-b border-black/10 focus-within:border-[#C5A059] transition-colors duration-500">
                  <label className="text-[9px] uppercase tracking-[0.4em] text-gray-400 block mb-2">
                    {isZh ? '联系电话' : isEs ? 'Teléfono Directo' : 'Direct Phone Number'}
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    required
                    className="w-full bg-transparent py-3 outline-none text-black font-light tracking-wide"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                <div className="relative border-b border-black/10 focus-within:border-[#C5A059] transition-colors duration-500 md:col-span-2">
                  <label className="text-[9px] uppercase tracking-[0.4em] text-gray-400 block mb-2">
                    {isZh ? '电子邮箱' : isEs ? 'Correo Electrónico' : 'Email Address'}
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    className="w-full bg-transparent py-3 outline-none text-black font-light tracking-wide"
                    placeholder="example@mail.com"
                  />
                </div>
              </div>

              <div className="flex flex-col items-center space-y-6 pt-8">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="group relative inline-block py-4 px-12 overflow-hidden border border-black/10 hover:border-[#C5A059] transition-all duration-700 bg-transparent cursor-pointer"
                >
                  <span className="relative z-10 text-[11px] uppercase tracking-[0.6em] text-black group-hover:text-white transition-colors duration-700">
                    {status === "submitting"
                      ? (isZh ? "发送中..." : isEs ? "Enviando..." : "Sending...")
                      : (isZh ? "申请回访" : isEs ? "Solicitar Seguimiento" : "Request Callback")}
                  </span>
                  <div className="absolute inset-0 bg-[#C5A059] translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out" />
                </button>
                
                <p className="text-[9px] text-gray-400 uppercase tracking-widest text-center">
                   {isZh 
                     ? "我们通常会在 2 个工作小时内回复。" 
                     : isEs 
                     ? "Le responderemos en menos de 2 horas hábiles." 
                     : "We typically respond in under 2 business hours."}
                </p>
              </div>
            </form>
          )}
        </div>
      </Container>
    </section>
  );
}