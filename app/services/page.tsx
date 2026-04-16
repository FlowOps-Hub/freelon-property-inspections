import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const services = [
  {
    id: 'home',
    icon: '🏠',
    title: 'Home Inspection',
    price: 'Most popular',
    description:
      'Our most comprehensive service. We evaluate the structure, roof, foundation, electrical, plumbing, HVAC, insulation, and interior of the property. You receive a full onsite computer-generated report with color photographs — delivered the same day.',
    includes: [
      'Structural components and foundation',
      'Roof and attic systems',
      'Electrical panel and wiring',
      'Plumbing supply and drainage',
      'HVAC heating and cooling',
      'Interior rooms, doors, and windows',
      'Onsite color photo report',
    ],
  },
  {
    id: 'condo',
    icon: '🏢',
    title: 'Condo Inspection',
    price: null,
    description:
      'Tailored for condominium units where the exterior and common areas are managed by an HOA. We focus on everything within the unit boundary — interior walls, ceilings, floors, electrical, plumbing, windows, and HVAC systems.',
    includes: [
      'Interior unit systems and finishes',
      'Electrical and plumbing within unit',
      'HVAC and ventilation',
      'Windows and entry doors',
      'Balcony or patio (if applicable)',
    ],
  },
  {
    id: 'radon',
    icon: '☢️',
    title: 'Radon Testing',
    price: null,
    description:
      'Radon is a colorless, odorless radioactive gas that seeps from soil and rock. It\'s the second leading cause of lung cancer in the US. Ohio has above-average radon levels. We place certified test devices for the required exposure period and send samples to an accredited lab.',
    includes: [
      'Certified radon test devices placed on-site',
      'Lab-analyzed results',
      'Written report with EPA action level comparison',
      'Guidance on mitigation if levels are elevated',
    ],
  },
  {
    id: 'termite',
    icon: '🐛',
    title: 'WDI / Termite Inspection',
    price: null,
    description:
      'Wood-destroying insect inspections are required by most mortgage lenders and real estate transactions. We inspect for termites, carpenter ants, carpenter bees, and powder post beetles — and document any evidence of active infestation or prior damage.',
    includes: [
      'Visual inspection of accessible wood components',
      'Identification of all wood-destroying insect species',
      'Documentation of active or inactive evidence',
      'Official WDI report form accepted by lenders',
    ],
  },
  {
    id: 'water',
    icon: '💧',
    title: 'Water Sampling',
    price: null,
    description:
      'For properties on well water or when municipal water quality is a concern. We collect water samples and send them to a certified laboratory for analysis. Results are returned in a written report.',
    includes: [
      'Coliform and E. coli bacteria testing',
      'Nitrate and nitrite levels',
      'Lead and iron screening (optional)',
      'Certified lab results and summary report',
    ],
  },
  {
    id: 'commercial',
    icon: '🏗️',
    title: 'Commercial Inspection',
    price: null,
    description:
      'Whether you\'re acquiring a retail building, office space, warehouse, or multi-unit residential property, our commercial inspections deliver the detail investors and buyers need. We assess structural, mechanical, electrical, and safety systems.',
    includes: [
      'Structural and envelope systems',
      'Roof, HVAC, and plumbing',
      'Electrical systems and panels',
      'ADA and life safety observations',
      'Parking, site drainage, and accessibility',
    ],
  },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <section className="bg-navy py-14 px-4 text-center text-white">
        <h1 className="text-4xl font-bold mb-3">Our Services</h1>
        <p className="text-gray-300 max-w-xl mx-auto">
          Every inspection includes an onsite computer-generated report with color photos — delivered the same day.
        </p>
      </section>

      <section className="flex-1 py-16 px-4 bg-gray-surface">
        <div className="max-w-4xl mx-auto space-y-8">
          {services.map((s) => (
            <div key={s.id} id={s.id} className="card p-8">
              <div className="flex items-start gap-4">
                <span className="text-4xl">{s.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-xl font-bold text-navy">{s.title}</h2>
                    {s.price && (
                      <span className="text-xs bg-gold text-navy font-semibold px-2 py-0.5 rounded-full">{s.price}</span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{s.description}</p>
                  <ul className="space-y-1">
                    {s.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-steel mt-0.5">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-500 mb-4">Ready to book? We serve Ashland and surrounding counties.</p>
          <Link href="/book" className="btn-primary">Book an Inspection</Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
