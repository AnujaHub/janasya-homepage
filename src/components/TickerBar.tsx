import { TICKER_ITEMS } from '@/data/catalog'

export function TickerBar() {
  const repeated = [...TICKER_ITEMS, ...TICKER_ITEMS]

  return (
    <div className="overflow-hidden border-b border-gray-100 bg-cream py-2.5">
      <div className="ticker-track">
        {repeated.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="inline-flex items-center gap-4 whitespace-nowrap px-6 text-[11px] font-medium uppercase tracking-widest text-brand"
          >
            <span>{item}</span>
            <span className="inline-block h-1 w-1 rounded-full bg-accent" />
          </span>
        ))}
      </div>
    </div>
  )
}
