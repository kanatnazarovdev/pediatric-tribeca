import Image from 'next/image'
import { client } from '@/sanity/lib/client'
import { PortableText } from '@portabletext/react'

async function getDoctor(slug: string) {
  return await client.fetch(`*[_type == "doctor" && slug.current == $slug][0]{
    name,
    role,
    "imageUrl": image.asset->url,
    bio,
    education,
    location
  }`, { slug })
}

export default async function DoctorProfile({ params }: { params: { slug: string } }) {
  const doctor = await getDoctor(params.slug)

  if (!doctor) return <div>Doctor not found</div>

  return (
    <main className="bg-[#FCFCFC] min-h-screen">
      <div className="flex flex-col lg:flex-row min-h-screen">
        
        {/* LEFT SIDE: Content (Scrollable) */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-20 lg:p-32">
          <div className="max-w-xl w-full">
            {/* Breadcrumb / Back Link */}
            <nav className="mb-12">
              <a href="./" className="text-[10px] tracking-[0.3em] uppercase text-gray-400 hover:text-black transition-colors">
                ← Back to Team
              </a>
            </nav>

            <header className="mb-16">
              <h1 className="text-5xl md:text-6xl font-light tracking-tight text-gray-900 uppercase leading-none mb-8">
                {doctor.name}
              </h1>
              
              <div className="flex flex-col space-y-4 border-l border-gray-200 pl-6 py-2">
                <div>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-gray-400 font-bold mb-1">Location</p>
                  <p className="text-xs tracking-widest uppercase font-medium text-gray-800">{doctor.location || 'New York'}</p>
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-gray-400 font-bold mb-1">Position</p>
                  <p className="text-xs tracking-widest uppercase font-medium text-gray-800">{doctor.role}</p>
                </div>
              </div>
            </header>

            <article className="prose prose-sm max-w-none text-gray-600 leading-relaxed tracking-wide space-y-6 italic-none">
              <PortableText value={doctor.bio} />
            </article>

            <div className="mt-20 pt-10 border-t border-gray-100">
              <button className="group relative text-[11px] tracking-[0.4em] uppercase font-bold py-4 px-10 border border-black overflow-hidden transition-all duration-500">
                <span className="relative z-10 group-hover:text-white transition-colors duration-500">
                  Schedule a Consultation
                </span>
                <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Visual (Sticky/Fixed) */}
        <div className="w-full lg:w-1/2 h-[70vh] lg:h-screen lg:sticky lg:top-0 order-first lg:order-last">
          <div className="relative w-full h-full bg-[#E5E7EB]">
             {/* Gradient Overlay for a more "Couture" feel */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10 z-10" />
            
            <Image
              src={doctor.imageUrl}
              alt={doctor.name}
              fill
              priority
              className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-1000 ease-in-out"
            />
          </div>
        </div>
        
      </div>

      {/* Modern Footer Detail */}
      <section className="bg-white py-20 px-10 text-center border-t border-gray-50">
         <h2 className="text-[10px] tracking-[0.5em] uppercase text-gray-300">
            Tribeca Dental Studio — Excellence in Pediatric Care
         </h2>
      </section>
    </main>
  )
}