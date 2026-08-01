import { HeartHandshake, PackageCheck, ShieldCheck, Sparkles, Truck } from 'lucide-react'

const TRUST_ITEMS = [
  { title: 'Trusted by 10,00,000+ Women', icon: HeartHandshake },
  { title: '10,000+ Verified Reviews', icon: Sparkles },
  { title: 'Free Shipping On Prepaid Orders', icon: Truck },
  { title: 'Hassle-Free Returns', icon: PackageCheck },
  { title: 'Secure Payments', icon: ShieldCheck },
]

export function TrustSection() {
  return (
    <section
      className="border-y border-[#f0ebe3]/80 bg-[#faf8f5] py-5 sm:py-6"
      aria-label="Trust and service highlights"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-[#e6ddd1] bg-[#fbf9f4] px-5 py-5">
          <div className="grid gap-4 text-center sm:grid-cols-2 lg:grid-cols-5">
            {TRUST_ITEMS.map((item) => {
              const Icon = item.icon

              return (
                <div
                  key={item.title}
                  className="flex items-center justify-center gap-2 text-[13px] font-medium text-[#5a5a5a] transition-colors duration-300 hover:text-[#0ea5a4]"
                >
                  <Icon
                    size={16}
                    className="text-[#0ea5a4]"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                  <span>{item.title}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}



{/* <div className="mt-8 rounded-3xl border border-[#e6ddd1] bg-[#fbf9f4] px-4 py-4 sm:px-5">
            <div className="grid gap-3 text-center sm:grid-cols-2 xl:grid-cols-4">
              {trustItems.map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.label} className="flex items-center justify-center gap-2 text-[13px] text-[#5a5a5a]">
                    <Icon size={15} className="text-[#0ea5a4]" strokeWidth={2} aria-hidden="true" />
                    <span>{item.label}</span>
                  </div>
                )
              })}
            </div>
          </div> */}