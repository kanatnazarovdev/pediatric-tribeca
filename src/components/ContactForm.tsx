"use client";
import { useState } from "react";
import Container from "./Container";
import { motion } from "framer-motion";
import { useParams } from "next/navigation"; 

export default function ContactForm() {
  const params = useParams();
  const lang = params.lang as string; 

  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle",
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const formData = new FormData(e.currentTarget);
    const fullName = formData.get("name") as string;
    
    const nameParts = fullName.trim().split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

    const payload = {
      firstName,
      lastName,
      email: formData.get("email"),
      phone: formData.get("phone"),
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
      console.error("GHL Submission Error:", error);
      setStatus("idle");
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <section className="bg-black py-24 md:py-48 border-t border-white/5" id="leadForm">
      <Container>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-[10px] uppercase tracking-[0.8em] text-[#C5A059] block mb-6">
              {lang === 'es' ? 'Acceso Privado' : 'Private Access'}
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-white">
              {lang === 'es' ? (
                <>Solicite su <span className="italic font-light">Evaluación VIP.</span></>
              ) : (
                <>Request Your <span className="italic font-light">Concierge Evaluation.</span></>
              )}
            </h2>
          </div>

          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20 border border-[#C5A059]/20 bg-white/[0.02]"
            >
              <p className="font-serif italic text-2xl text-white px-6">
                {lang === 'es' 
                  ? "Gracias. Nuestro conserje se pondrá en contacto con usted en breve."
                  : "Thank you. Our concierge will contact you shortly."}
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Name Field */}
                <div className="relative border-b border-white/10 focus-within:border-[#C5A059] transition-colors duration-500">
                  <label className="text-[9px] uppercase tracking-[0.4em] text-gray-400 block mb-2">
                    {lang === 'es' ? 'Nombre Completo' : 'Full Name'}
                  </label>
                  <input
                    name="name"
                    type="text"
                    required
                    className="w-full bg-transparent py-3 outline-none text-white font-light tracking-wide"
                    placeholder={lang === 'es' ? 'Juan Pérez' : 'John Doe'}
                  />
                </div>

                {/* Phone Field */}
                <div className="relative border-b border-white/10 focus-within:border-[#C5A059] transition-colors duration-500">
                  <label className="text-[9px] uppercase tracking-[0.4em] text-gray-400 block mb-2">
                    {lang === 'es' ? 'Teléfono' : 'Phone Number'}
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    required
                    className="w-full bg-transparent py-3 outline-none text-white font-light tracking-wide"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="relative border-b border-white/10 focus-within:border-[#C5A059] transition-colors duration-500">
                <label className="text-[9px] uppercase tracking-[0.4em] text-gray-400 block mb-2">
                  {lang === 'es' ? 'Correo Electrónico' : 'Email Address'}
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full bg-transparent py-3 outline-none text-white font-light tracking-wide"
                  placeholder="john@example.com"
                />
              </div>

              <div className="flex justify-center pt-8">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="group relative inline-block py-4 px-12 overflow-hidden border border-[#C5A059]/30 hover:border-[#C5A059] transition-all duration-700 bg-transparent cursor-pointer"
                >
                  <span className="relative z-10 text-[11px] uppercase tracking-[0.6em] text-[#C5A059] group-hover:text-black transition-colors duration-700">
                    {status === "submitting" 
                      ? (lang === 'es' ? "Enviando..." : "Sending...") 
                      : (lang === 'es' ? "Enviar Solicitud" : "Submit Inquiry")}
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