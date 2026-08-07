import { WHATSAPP_URL, whatsappIcon } from '@/data/catalog'

export function WhatsAppChatButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Janasya on WhatsApp"
      className="interactive-btn fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] left-[calc(1rem+env(safe-area-inset-left))] z-60 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-[0_14px_30px_rgba(37,211,102,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 sm:bottom-5 sm:left-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]"
    >
      <img src={whatsappIcon} alt="" className="h-8 w-8 object-contain" aria-hidden="true" />
    </a>
  )
}
