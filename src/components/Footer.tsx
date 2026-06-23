"use client";
import { useParams } from "next/navigation";
import Container from "./Container";
import { usePathname } from "next/navigation";

export default function Footer() {
  const params = useParams();
  const pathname = usePathname();
  const lang = (params.lang as string) || "en";
  const isEs = lang === "es";
  const isZh = lang === "zh";

  const isStudio =
    pathname.startsWith(`/${lang}/studio`) || pathname.startsWith("/studio");

  if (isStudio) return null;

  return (
    <footer
      id="contact"
      className="bg-white border-t border-black/5 pt-24 pb-8"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 mb-24">
          <div className="relative h-[400px] w-full bg-gray-100 overflow-hidden group border border-black/5">
           <iframe 
src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDZvkuB9PQa9z_GLSZD_FBuIbAUWWTjHRg&q=Tribeca+Dental+Studio+4+Kids,54+Warren+St,New+York,NY+10007`}  className="absolute inset-0 w-full h-full grayscale contrast-125 opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
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
                  {isZh ? "诊所地址" : isEs ? "Ubicación" : "The Location"}
                </span>
                <h3 className="text-2xl font-serif">
                  Tribeca <br />
                  <span className="italic font-light">
                    {" "}
                    Dental Studio <span className="text-[#4add30]">4 kids</span>
                  </span>
                </h3>
                <p className="text-[14px] text-gray-500 font-light leading-relaxed">
                  54 Warren Street
                  <br />
                  New York, NY 10007
                </p>
              </div>

              <div className="space-y-6">
                <span className="text-[10px] uppercase tracking-[0.5em] text-gray-400">
                  {isZh ? "联系咨询" : isEs ? "Consultas" : "Inquiries"}
                </span>
                <div className="space-y-6">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-1">
                      {isZh ? "办公电话" : isEs ? "Línea Directa" : "Office Line"}
                    </p>
                    <a
                      href="tel:2125615303"
                      className="text-lg font-light hover:text-[#4add30] transition-colors"
                    >
                      212.561.5303
                    </a>
                  </div>

                  {/* Added: Instagram Social Link Block */}
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-1">
                      {isZh ? "社交媒体" : isEs ? "Redes Sociales" : "Social Media"}
                    </p>
                    <a
                      href="https://www.instagram.com/tds4kids/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-light flex items-center gap-2 hover:text-[#4add30] transition-colors group/insta"
                    >
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5 fill-current text-gray-400 group-hover/insta:text-[#4add30] transition-colors"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                      </svg>
                      @tds4kids
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-12 border-t border-black/5">
              <span className="text-[10px] uppercase tracking-[0.5em] text-gray-400 block mb-6">
                {isZh ? "营业时间" : isEs ? "Disponibilidad" : "Availability"}
              </span>
              <div className="flex flex-wrap gap-x-12 gap-y-4 text-[13px] text-gray-500 font-light italic">
                <span>
                  {isZh ? "周一 – 周五: 8am – 7pm" : isEs ? "Lun – Vie: 8am – 7pm" : "Mon – Fri: 8am – 7pm"}
                </span>
                <span>
                  {isZh ? "周六 – 周日: 9am – 4pm" : isEs ? "Sáb – Dom: 9am – 4pm" : "Sat – Sun: 9am – 4pm"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-12 border-t border-black/5">
          <p className="text-[11px] md:text-[13px] uppercase tracking-[0.3em] text-gray-300 text-center md:text-left">
            © 2026 Tribeca Dental Studio.{" "}
            {isZh ? "版权所有。" : isEs ? "Todos los derechos reservados." : "All Rights Reserved."}
            <br />
            <a
              href="https://kanatnazarov.com"
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
              {isZh ? "隐私权政策" : isEs ? "Privacidad" : "Privacy"}
            </a>
            <a
              href="https://tribecadentalstudio.com/terms-conditions/"
              target="_blank"
              className="text-[9px] uppercase tracking-[0.4em] text-gray-300 hover:text-black"
            >
              {isZh ? "使用条款" : isEs ? "Términos" : "Terms"}
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}