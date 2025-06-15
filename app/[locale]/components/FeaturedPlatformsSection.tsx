'use client'

import React from 'react'

/**
 * Featured Platforms section component
 * Shows platforms I've worked with
 */
export default function FeaturedPlatformsSection() {
  return (
    <section id="featured-platforms" className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block py-1 px-4 rounded-full bg-green-100 text-green-800 font-medium mb-4">
            Featured Platforms
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Platforms I've Worked With</h2>
          <p className="max-w-2xl mx-auto text-gray-600">Check out some of the platforms I've collaborated with</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Platform items */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <div className="h-40 flex items-center justify-center">
              <h3 className="text-xl font-bold text-gray-800">Jarvi</h3>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <div className="h-40 flex items-center justify-center">
              <h3 className="text-xl font-bold text-gray-800">HelloFatima</h3>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <div className="h-40 flex items-center justify-center">
              <h3 className="text-xl font-bold text-gray-800">Tray</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
