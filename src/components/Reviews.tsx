/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useEffect, useState } from "react";
import {
  Star,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Plus,
  Minus,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Review {
  author_name: string;
  rating: number;
  text: string;
  relative_time_description: string;
}

const ReviewCard = ({ review, index, lang }: { review: Review; index: number; lang: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isLongText = review.text.length > 280;
  
  const isZh = lang === "zh";
  const isEs = lang === "es";

  return (
    <div className="flex flex-col h-full bg-white transition-all duration-300">
      <div className="flex-1">
        <span className="text-[11px] font-medium text-[#c5a367] mb-6 block tracking-widest">
          [{String(index + 1).padStart(2, "0")}]
        </span>

        <div className="h-[1px] w-12 bg-[#c5a367]/30 mb-8" />

        <div className="relative">
          <p
            className={`text-[17px] leading-relaxed text-slate-600 font-light italic mb-4 transition-all duration-500 ${!isExpanded && isLongText ? "line-clamp-6" : ""}`}
          >
            "{review.text}"
          </p>

          {isLongText && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#c5a367] font-bold hover:text-slate-900 transition-colors mb-8"
            >
              {isExpanded ? (
                <>
                  <Minus size={12} /> {isZh ? "收起" : isEs ? "Leer Menos" : "Read Less"}
                </>
              ) : (
                <>
                  <Plus size={12} /> {isZh ? "阅读更多" : isEs ? "Leer Más" : "Read More"}
                </>
              )}
            </button>
          )}
        </div>
      </div>

      <div className="mt-auto pt-6 border-t border-slate-50">
        <h4 className="text-sm font-semibold text-slate-900 tracking-wide uppercase">
          {review.author_name}
        </h4>
        <p className="text-[10px] text-[#c5a367] uppercase tracking-widest mt-1">
          {isZh ? "验证家长" : isEs ? "Padre Verificado" : "Verified Parent"} • {review.relative_time_description}
        </p>
      </div>
    </div>
  );
};

const Reviews = ({ lang }: { lang: string }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  
  const isZh = lang === "zh";
  const isEs = lang === "es";

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("/api/reviews");
        const data = await response.json();
        if (Array.isArray(data)) setReviews(data);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  if (loading)
    return (
      <div className="w-full py-32 flex justify-center items-center bg-white">
        <Loader2
          className="animate-spin text-slate-200"
          size={32}
          strokeWidth={1}
        />
      </div>
    );

  if (reviews.length === 0) return null;

  return (
    <section className="w-full py-24 bg-white overflow-hidden border-t border-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-20">
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#c5a367] font-bold mb-4">
            {isZh ? "客户好评" : isEs ? "Testimonios" : "Testimonials"}
          </span>
          <h2 className="text-4xl md:text-5xl font-light text-slate-900 tracking-tight lowercase">
            {isZh ? "患者的故事" : isEs ? "historias de pacientes" : "patient stories"}
          </h2>
          <div className="mt-8 flex items-center gap-2 bg-slate-50/50 px-5 py-2.5 rounded-full border border-slate-100">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  fill="#c5a367"
                  className="text-[#c5a367]"
                />
              ))}
            </div>
            <span className="text-[10px] font-bold text-slate-400 tracking-[0.15em] uppercase">
              <a href="https://share.google/GKKk9kco6LieCVFiz" target="_blank">
                {isZh ? "谷歌 5.0 评分" : isEs ? "5 Calificación de Google" : "5 Google Rating"}
              </a>
            </span>
          </div>
        </div>

        <div className="relative premium-swiper-container">
          <Swiper
            modules={[Navigation, Pagination, A11y]}
            spaceBetween={60}
            slidesPerView={1}
            autoHeight={true}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            navigation={{
              nextEl: ".swiper-next",
              prevEl: ".swiper-prev",
            }}
            pagination={{ clickable: true }}
            className="!pb-20"
          >
            {reviews.map((review, i) => (
              <SwiperSlide key={i} className="h-auto">
                <ReviewCard review={review} index={i} lang={lang} />
              </SwiperSlide>
            ))}
          </Swiper>

          <button className="swiper-prev absolute -left-12 top-[40%] text-slate-200 hover:text-[#c5a367] transition-colors z-10 hidden xl:block">
            <ChevronLeft size={40} strokeWidth={1} />
          </button>
          <button className="swiper-next absolute -right-12 top-[40%] text-slate-200 hover:text-[#c5a367] transition-colors z-10 hidden xl:block">
            <ChevronRight size={40} strokeWidth={1} />
          </button>
        </div>
      </div>

      <style jsx global>{`
        .premium-swiper-container .swiper-pagination-bullet {
          background: #e2e8f0;
          opacity: 1;
          width: 5px;
          height: 5px;
          transition: all 0.3s ease;
        }
        .premium-swiper-container .swiper-pagination-bullet-active {
          background: #c5a367;
          width: 30px;
          border-radius: 4px;
        }
      `}</style>
    </section>
  );
};

export default Reviews;