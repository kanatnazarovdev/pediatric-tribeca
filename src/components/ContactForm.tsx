"use client";
import { useState } from "react";
import Container from "./Container";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";

export default function PediatricContactForm() {
  const params = useParams();
  const lang = params.lang as string;

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
      alert(lang === 'es' ? "Algo salió mal. Por favor intente de nuevo." : "Something went wrong. Please try again.");
    }
  };

  return (
    <section className="bg-white py-24 md:py-48 border-t border-gray-100" id="leadForm">
      <Container>
        <div className="max-w-2xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <span className="text-[10px] uppercase tracking-[0.8em] text-[#C5A059] font-bold block mb-6">
              {lang === 'es' ? 'Atención Especializada' : 'Specialized Care'}
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-black leading-tight mb-8">
              {lang === 'es' ? (
                <>Programe la <span className="italic font-light text-gray-400">Consulta de su Hijo.</span></>
              ) : (
                <>Schedule Your <span className="italic font-light text-gray-400">Child&apos;s Consultation.</span></>
              )}
            </h2>
            
            {/* Instant Booking Link - Framing the Choice */}
            <div className="flex flex-col items-center space-y-4">
              <p className="text-xs uppercase tracking-widest text-gray-500 font-light">
                {lang === 'es' ? 'Elija su preferencia' : 'Choose your preference'}
              </p>
              <div className="flex flex-wrap justify-center gap-6 items-center">
                <a 
                  href="https://booking.adit.com/4dcced5c-07a5-4e12-b80f-d470bca99a63" // Replace with actual booking URL
                  target="_blank"
                  className="text-[11px] uppercase tracking-[0.3em] font-bold text-[#C5A059] border-b border-[#C5A059] pb-1 hover:text-black hover:border-black transition-all duration-300"
                >
                  {lang === 'es' ? 'Reservar al Instante' : 'Book Instantly Online'}
                </a>
                <span className="text-gray-300 text-[10px] uppercase tracking-widest italic">{lang === 'es' ? '— o —' : '— or —'}</span>
                <p className="text-[11px] uppercase tracking-[0.3em] text-gray-400">
                  {lang === 'es' ? 'Envíe sus datos abajo' : 'Request a Callback Below'}
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
                {lang === 'es'
                  ? "Gracias. Nuestro equipo se pondrá en contacto con usted para cuidar de su pequeño."
                  : "Thank you. Our team will contact you shortly to care for your little one."}
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Form Fields remain exactly as they were */}
                <div className="relative border-b border-black/10 focus-within:border-[#C5A059] transition-colors duration-500">
                  <label className="text-[9px] uppercase tracking-[0.4em] text-gray-400 block mb-2">
                    {lang === 'es' ? 'Nombre' : 'First Name'}
                  </label>
                  <input
                    name="firstName"
                    type="text"
                    required
                    className="w-full bg-transparent py-3 outline-none text-black font-light tracking-wide"
                    placeholder={lang === 'es' ? 'Su nombre' : 'Your first name'}
                  />
                </div>

                <div className="relative border-b border-black/10 focus-within:border-[#C5A059] transition-colors duration-500">
                  <label className="text-[9px] uppercase tracking-[0.4em] text-gray-400 block mb-2">
                    {lang === 'es' ? 'Apellido' : 'Last Name'}
                  </label>
                  <input
                    name="lastName"
                    type="text"
                    required
                    className="w-full bg-transparent py-3 outline-none text-black font-light tracking-wide"
                    placeholder={lang === 'es' ? 'Su apellido' : 'Your last name'}
                  />
                </div>

                <div className="relative border-b border-black/10 focus-within:border-[#C5A059] transition-colors duration-500">
                  <label className="text-[9px] uppercase tracking-[0.4em] text-gray-400 block mb-2">
                    {lang === 'es' ? 'Nombre del Niño (Opcional)' : 'Child’s Name (Optional)'}
                  </label>
                  <input
                    name="childName"
                    type="text"
                    className="w-full bg-transparent py-3 outline-none text-black font-light tracking-wide"
                    placeholder={lang === 'es' ? 'Nombre del pequeño' : 'Little one’s name'}
                  />
                </div>

                <div className="relative border-b border-black/10 focus-within:border-[#C5A059] transition-colors duration-500">
                  <label className="text-[9px] uppercase tracking-[0.4em] text-gray-400 block mb-2">
                    {lang === 'es' ? 'Teléfono Directo' : 'Direct Phone Number'}
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
                    {lang === 'es' ? 'Correo Electrónico' : 'Email Address'}
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
                      ? (lang === 'es' ? "Enviando..." : "Sending...")
                      : (lang === 'es' ? "Solicitar Seguimiento" : "Request Callback")}
                  </span>
                  <div className="absolute inset-0 bg-[#C5A059] translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out" />
                </button>
                
                <p className="text-[9px] text-gray-400 uppercase tracking-widest text-center">
                   {lang === 'es' 
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