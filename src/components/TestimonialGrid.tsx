"use client";
import { useState } from "react";

export default function TestimonialGrid({ testimonials }: { testimonials: any[] }) {
    const [activeVideo, setActiveVideo] = useState<string | null>(null);
    const getEmbedUrl = (url: string) => {
        if (!url) return "";

        // Handles standard links, shorts, and shared links
        const videoId = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/|\/shorts\/)/)[2]?.split(/[^0-9a-z_-]/i)[0];

        return `https://www.youtube.com/embed/${videoId}`;
    };
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {testimonials.map((t, i) => (
                    <div
                        key={i}
                        className="group cursor-pointer"
                        onClick={() => setActiveVideo(t.videoUrl)}
                    >
                        <div className="relative aspect-[2/3] overflow-hidden bg-zinc-100 rounded-sm shadow-sm transition-all duration-500 group-hover:shadow-xl">
                            <img
                                src={t.imageUrl}
                                alt={t.childName}
                                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                            {/* Play Icon Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center pl-1 shadow-lg">
                                    <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-black border-b-[8px] border-b-transparent" />
                                </div>
                            </div>
                        </div>
                        <h3 className="mt-6 text-[11px] uppercase tracking-[3px] font-bold text-zinc-900">
                            {t.childName}
                        </h3>
                        <p className="mt-2 text-sm text-zinc-500 font-light leading-relaxed">
                            {t.description}
                        </p>
                    </div>
                ))}
            </div>

            {/* Video Modal Overlay */}
            {activeVideo && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-white/95 backdrop-blur-sm p-4 md:p-10"
                    onClick={() => setActiveVideo(null)}
                >
                    <button className="absolute top-10 right-10 text-black text-sm uppercase tracking-widest font-bold">Close</button>
                    <div className="w-full max-w-5xl aspect-video bg-black shadow-2xl">
                        <iframe
                            src={getEmbedUrl(activeVideo)} // Use the formatted URL here
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            className="w-full aspect-video"
                        ></iframe>
                    </div>
                </div>
            )}
        </>
    );
}