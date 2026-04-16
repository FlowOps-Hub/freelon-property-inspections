import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const services = [
  { icon: '🏠', title: 'Home Inspection', desc: 'Comprehensive top-to-bottom inspection of residential properties.' },
  { icon: '🏢', title: 'Condo Inspection', desc: 'Interior unit inspections tailored for condo buyers and sellers.' },
  { icon: '☢️', title: 'Radon Testing', desc: 'Professional radon measurement to protect your family\'s health.' },
  { icon: '🐛', title: 'WDI / Termite', desc: 'Wood-destroying insect inspections required by most lenders.' },
  { icon: '💧', title: 'Water Sampling', desc: 'Lab-tested water quality analysis for wells and municipal sources.' },
  { icon: '🏗️', title: 'Commercial Inspection', desc: 'Thorough assessments for commercial buildings and investment properties.' },
]

const stats = [
  { value: '13,844+', label: 'Inspections Completed' },
  { value: '21+', label: 'Years in Business' },
  { value: '5.0★', label: 'Angi Rating' },
  { value: 'Same Day', label: 'Onsite Reports' },
]

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero */}
      <section className="bg-navy text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-4">Ashland, Ohio &amp; Surrounding Counties</p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Property Inspections <br className="hidden md:block" />
            You Can Trust
          </h1>
          <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto">
            Serving Ohio homebuyers, sellers, and realtors since 2004. Onsite computer-generated reports with color photos — delivered the same day.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book" className="btn-gold text-center text-base">
              Book an Inspection
            </Link>
            <Link href="/services" className="btn-outline text-center text-base border-gray-500 text-gray-300 hover:bg-white hover:text-navy">
              View Services
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-steel py-10 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-bold text-gold">{s.value}</div>
              <div className="text-sm text-blue-100 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services grid */}
      <section className="py-20 px-4 bg-gray-surface">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy mb-3">Our Inspection Services</h2>
            <p className="text-gray-500 max-w-xl mx-auto">From first-time homebuyers to commercial investors — we have the inspection you need.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <div key={s.title} className="card p-6 hover:shadow-md transition-shadow">
                <div className="text-3xl mb-3">{s.icon}</div>
                <h3 className="text-navy font-semibold text-lg mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/services" className="btn-outline">See Full Details</Link>
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="bg-navy py-16 px-4 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Ready to Schedule?</h2>
        <p className="text-gray-300 mb-8 max-w-lg mx-auto">
          Book online in minutes. Todd will confirm your appointment and show up ready to deliver a thorough, same-day report.
        </p>
        <Link href="/book" className="btn-gold text-base">
          Book Your Inspection
        </Link>
      </section>

      <Footer />
    </div>
  )
}
