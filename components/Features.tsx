'use client';

import { SECTIONS } from '@/constants'
import Image from 'next/image'
import React from 'react'
import { cn } from '@/lib/utils'
import { useMedical } from '@/lib/MedicalProvider'

const CARD_COLORS = [
  { bg: 'bg-[#1B2A3D]', iconBg: 'bg-white/15', hoverBorder: 'hover:border-[#2a4060]' },
  { bg: 'bg-[#8BC34A]', iconBg: 'bg-white/20', hoverBorder: 'hover:border-[#a4d65a]' },
  { bg: 'bg-[#26A69A]', iconBg: 'bg-white/20', hoverBorder: 'hover:border-[#4db6ac]' },
  { bg: 'bg-[#42A5F5]', iconBg: 'bg-white/20', hoverBorder: 'hover:border-[#64b5f6]' },
]

const Features = () => {
  const { features } = useMedical()

  return (
    <section id={SECTIONS.features} className="bg-gray-10 py-16 lg:py-24">
      <div className="max-container padding-container w-full">
        <div className="mb-4 text-center">
          <h2 className="bold-40 lg:bold-64">Keunggulan Kami</h2>
          <div className="mx-auto mt-2 h-1.5 w-24 rounded-full bg-green-50" />
          <p className="regular-16 mx-auto mt-4 max-w-2xl text-gray-30">
            Kami berkomitmen memberikan layanan dan produk terbaik untuk memenuhi kebutuhan alat
            kesehatan Anda.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              title={feature.title}
              icon={feature.icon}
              description={feature.description}
              colorIndex={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

type FeatureCardProps = {
  title: string
  icon: string
  description: string
  colorIndex: number
}

const FeatureCard = ({ title, icon, description, colorIndex }: FeatureCardProps) => {
  const colors = CARD_COLORS[colorIndex % CARD_COLORS.length]

  return (
    <div
      className={cn(
        'group relative flex flex-col items-center rounded-2xl border-2 border-transparent p-8 text-center text-white transition-all duration-300',
        'hover:-translate-y-2 hover:shadow-2xl',
        colors.bg,
        colors.hoverBorder
      )}
    >
      <div
        className={cn(
          'mb-5 flex h-16 w-16 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110',
          colors.iconBg
        )}
      >
        <Image
          src={icon}
          alt={title}
          width={32}
          height={32}
          className="brightness-0 invert"
        />
      </div>
      <h3 className="bold-20 capitalize">{title}</h3>
      <p className="regular-14 mt-3 leading-relaxed text-white/80">
        {description}
      </p>
    </div>
  )
}

export default Features