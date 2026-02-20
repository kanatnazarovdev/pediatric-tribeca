"use client";

export default function MapSection() {
  const address = "54 Warren St, New York, NY 10007";
  const mapSrc = `https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${encodeURIComponent(address)}&zoom=15`;

  return (
    <div className="relative w-full h-[500px] bg-gray-100 overflow-hidden group">
      {/* The Interactive Map */}
      <iframe
        width="100%"
        height="100%"
        frameBorder="0"
        style={{ border: 0 }}
        src={mapSrc}
        allowFullScreen
        className="grayscale contrast-125 brightness-100 opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 ease-in-out"
      />

      {/* Floating Address Card - "The Signature" */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:left-24 md:translate-x-0 z-20">
        <div className="bg-white/90 backdrop-blur-xl p-8 md:p-12 shadow-2xl border border-black/5 max-w-sm">
          <span className="text-[10px] uppercase tracking-[0.6em] text-[#C5A059] block mb-4">
            Visit the Studio
          </span>
          <h3 className="text-2xl font-serif text-black mb-4 leading-tight">
            Tribeca <br />
            <span className="italic font-light text-gray-700">Dental Studio</span>
          </h3>
          <p className="text-[13px] text-gray-500 font-light leading-relaxed mb-8">
            54 Warren Street <br />
            New York, NY 10007
          </p>
          <a
            href="https://maps.app.goo.gl/ChIJLyHqKB9awokRJd98H6okxow"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-[10px] uppercase tracking-[0.4em] text-black border-b border-black/20 pb-1 hover:border-[#C5A059] hover:text-[#C5A059] transition-all duration-500"
          >
            Get Directions
          </a>
        </div>
      </div>
    </div>
  );
}