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
    const fullName = formData.get("name") as string;
    const nameParts = fullName.trim().split(" ");
    
    const payload = {
      firstName: nameParts[0],
      lastName: nameParts.length > 1 ? nameParts.slice(1).join(" ") : "",
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
          <div className="text-center mb-20">
            <span className="text-[10px] uppercase tracking-[0.8em] text-[#C5A059] font-bold block mb-6">
              {lang === 'es' ? 'Atención Especializada' : 'Specialized Care'}
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-black leading-tight">
              {lang === 'es' ? (
                <>Programe la <span className="italic font-light text-gray-400">Consulta de su Hijo.</span></>
              ) : (
                <>Schedule Your <span className="italic font-light text-gray-400">Child&apos;s Consultation.</span></>
              )}
            </h2>
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
                
                {/* Parent Name */}
                <div className="relative border-b border-black/10 focus-within:border-[#C5A059] transition-colors duration-500">
                  <label className="text-[9px] uppercase tracking-[0.4em] text-gray-400 block mb-2">
                    {lang === 'es' ? 'Nombre del Padre/Tutor' : 'Parent / Guardian Name'}
                  </label>
                  <input
                    name="name"
                    type="text"
                    required
                    className="w-full bg-transparent py-3 outline-none text-black font-light tracking-wide"
                    placeholder={lang === 'es' ? 'Su nombre' : 'Your name'}
                  />
                </div>

                {/* Child Name (Optional but adds a friendly touch) */}
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

                {/* Phone Field */}
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

                {/* Email Field */}
                <div className="relative border-b border-black/10 focus-within:border-[#C5A059] transition-colors duration-500">
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

              <div className="flex justify-center pt-8">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="group relative inline-block py-4 px-12 overflow-hidden border border-black/10 hover:border-[#C5A059] transition-all duration-700 bg-transparent cursor-pointer"
                >
                  <span className="relative z-10 text-[11px] uppercase tracking-[0.6em] text-black group-hover:text-white transition-colors duration-700">
                    {status === "submitting" 
                      ? (lang === 'es' ? "Enviando..." : "Sending...") 
                      : (lang === 'es' ? "Solicitar Cita" : "Request Appointment")}
                  </span>
                  <div className="absolute inset-0 bg-[#C5A059] translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out" />
                </button>
              </div>
            </form>
          )}
        </div>
      </Container>
    </section>
  );
}