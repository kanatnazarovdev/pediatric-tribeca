/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import Image from 'next/image'
import Link from 'next/link' // Import Link
import { useParams } from 'next/navigation' // Import useParams to get the current language
import { motion } from 'framer-motion'

export default function TeamGrid({ doctors }: { doctors: any[] }) {
  const params = useParams()
  const lang = params.lang || 'en' 

  return (
    <section className="bg-white">
      {/* Filter Bar */}
      <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 py-10 border-b border-gray-100 mb-12">
        <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-gray-400">Filter by Specialty</span>
        {['All', 'Pediatric', 'Orthodontic', 'Airway'].map((filter) => (
          <button 
            key={filter} 
            className={`text-[11px] tracking-[0.2em] uppercase transition-all duration-300 pb-1 border-b-2 ${filter === 'All' ? 'border-black text-black' : 'border-transparent text-gray-400 hover:text-black'}`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="max-w-[1600px] mx-auto px-4 md:px-10 pb-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-16">
          {doctors.map((doctor, index) => (
            <Link 
              key={doctor.slug} 
              href={`/${lang}/team/${doctor.slug}`} 
              className="block group"
            >
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Image Container */}
                <div className="relative aspect-[1/1.3] overflow-hidden bg-[#f7f7f7]">
                  <Image
                    src={doctor.imageUrl}
                    alt={doctor.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover object-top  transition-all duration-1000 ease-in-out group-hover:scale-105"
                  />
                  
                  {/* Signature "Apa Box" Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-black/90 backdrop-blur-sm text-white px-5 py-3 min-w-[180px] text-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                      <p className="text-[9px] tracking-[0.4em] uppercase font-bold leading-none">
                        View Profile
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom Text */}
                <div className="mt-6 text-center lg:text-left lg:pl-2">
                  <h3 className="text-[12px] tracking-[0.25em] uppercase font-medium text-gray-900 leading-tight">
                    {doctor.name}
                  </h3>
                  <div className="h-[1px] w-4 bg-gray-300 my-3 mx-auto lg:mx-0 transition-all duration-500 group-hover:w-8 group-hover:bg-black" />
                  <p className="text-[9px] tracking-[0.2em] uppercase text-gray-400 font-light">
                    {doctor.role}
                  </p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}