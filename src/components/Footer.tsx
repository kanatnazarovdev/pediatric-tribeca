"use client";
import { useParams } from "next/navigation";
import Container from "./Container";

export default function Footer() {
  const params = useParams();
  const lang = (params.lang as string) || "en";
  const isEs = lang === "es";

  return (
    <footer
      id="contact"
      className="bg-white border-t border-black/5 pt-24 pb-8"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 mb-24">
          <div className="relative h-[400px] w-full bg-gray-100 overflow-hidden group border border-black/5">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.162725514668!2d-74.0097762!3d40.714443!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a1f68744043%3A0xc47e3355088ca41c!2s54%20Warren%20St%2C%20New%20York%2C%20NY%2010007!5e0!3m2!1sen!2sus!4v1700000000000"
              className="absolute inset-0 w-full h-full grayscale contrast-125 opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* Right: Studio Details */}
          <div className="flex flex-col justify-between py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <span className="text-[10px] uppercase tracking-[0.5em] text-gray-400">
                  {isEs ? "Ubicación" : "The Location"}
                </span>
                <h3 className="text-2xl font-serif">
                  Tribeca <br />
                  <span className="italic font-light">Dental Studio</span>
                </h3>
                <p className="text-[14px] text-gray-500 font-light leading-relaxed">
                  54 Warren Street
                  <br />
                  New York, NY 10007
                </p>
              </div>

              <div className="space-y-6">
                <span className="text-[10px] uppercase tracking-[0.5em] text-gray-400">
                  {isEs ? "Consultas" : "Inquiries"}
                </span>
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-1">
                      {isEs ? "Línea Directa" : "Office Line"}
                    </p>
                    <a
                      href="tel:2125615303"
                      className="text-lg font-light hover:text-[#C5A059] transition-colors"
                    >
                      212.561.5303
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-12 border-t border-black/5">
              <span className="text-[10px] uppercase tracking-[0.5em] text-gray-400 block mb-6">
                {isEs ? "Disponibilidad" : "Availability"}
              </span>
              <div className="flex flex-wrap gap-x-12 gap-y-4 text-[13px] text-gray-500 font-light italic">
                <span>
                  {isEs ? "Lun – Vie: 8am – 7pm" : "Mon – Fri: 8am – 7pm"}
                </span>
                <span>
                  {isEs ? "Sáb – Dom: 9am – 4pm" : "Sat – Sun: 9am – 4pm"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-12 border-t border-black/5">
          <p className="text-[11px] md:text-[13px] uppercase tracking-[0.3em] text-gray-300 text-center md:text-left">
            © 2026 Tribeca Dental Studio.{" "}
            {isEs ? "Todos los derechos reservados." : "All Rights Reserved."}
            <br />
            <a
              href="https://kenzy.vercel.app/developer"
              target="_blank"
              className="hover:text-black transition-colors"
            >
              <strong>
                <i className="text-[13px] opacity-70 lowercase">
                  Design & Development by Kanat Nazarov
                </i>
              </strong>
            </a>
          </p>

          <div className="flex gap-8">
            <a
              href="https://tribecadentalstudio.com/privacy-policy/"
              target="_blank"
              className="text-[9px] uppercase tracking-[0.4em] text-gray-300 hover:text-black"
            >
              {isEs ? "Privacidad" : "Privacy"}
            </a>
            <a
              href="https://tribecadentalstudio.com/terms-conditions/"
              target="_blank"
              className="text-[9px] uppercase tracking-[0.4em] text-gray-300 hover:text-black"
            >
              {isEs ? "Términos" : "Terms"}
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
