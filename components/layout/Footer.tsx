import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-navy text-gray-400 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-gold font-bold text-base mb-3">Freelon Property Inspections</h3>
            <p className="text-sm leading-relaxed">
              Professional inspections in Ashland and surrounding counties since 2004. 13,844+ inspections completed.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-3 uppercase tracking-wide">Services</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/services#home" className="hover:text-white transition-colors">Home Inspection</Link></li>
              <li><Link href="/services#condo" className="hover:text-white transition-colors">Condo Inspection</Link></li>
              <li><Link href="/services#radon" className="hover:text-white transition-colors">Radon Testing</Link></li>
              <li><Link href="/services#termite" className="hover:text-white transition-colors">WDI / Termite</Link></li>
              <li><Link href="/services#water" className="hover:text-white transition-colors">Water Sampling</Link></li>
              <li><Link href="/services#commercial" className="hover:text-white transition-colors">Commercial</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-3 uppercase tracking-wide">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="tel:4192814300" className="hover:text-white transition-colors">(419) 281-4300</a></li>
              <li className="text-gray-500">1304 Claremont Ave</li>
              <li className="text-gray-500">Ashland, OH 44805</li>
            </ul>
            <Link href="/book" className="inline-block mt-4 bg-gold text-navy text-sm font-semibold px-5 py-2 rounded-lg hover:bg-gold-light transition-colors">
              Book Online
            </Link>
          </div>
        </div>
        <div className="border-t border-navy-light mt-10 pt-6 text-xs text-center text-gray-600">
          © {new Date().getFullYear()} Freelon Property Inspections LLC. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
