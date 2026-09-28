import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Check, FileImage, Gift, Heart, RefreshCw, Upload, X } from 'lucide-react'

type DonationStage = 'landing' | 'upload' | 'submitted' | 'status' | 'outcome'
type Outcome = 'reusable' | 'recycled'

const MAX_FILE_SIZE = 5 * 1024 * 1024
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const journey = ['Request Submitted', 'Janasya Verification', 'Collection', 'Processing', 'Final Outcome']

export function Donations() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [stage, setStage] = useState<DonationStage>('landing')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const [error, setError] = useState('')
  const [statusStep, setStatusStep] = useState(0)
  const [outcome, setOutcome] = useState<Outcome>('reusable')
  const [demoPoints, setDemoPoints] = useState(120)

  useEffect(() => () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl)
  }, [previewUrl])

  const resetFile = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    setSelectedFile(null)
    setPreviewUrl('')
    setError('')
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleFile = (file?: File) => {
    if (!file) return
    setError('')
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError('Please choose a JPG, JPEG, PNG, or WEBP image.')
      return
    }
    if (file.size > MAX_FILE_SIZE) {
      setError('That image is larger than 5 MB. Please choose a smaller file.')
      return
    }
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    setSelectedFile(file)
    setPreviewUrl(URL.createObjectURL(file))
  }

  const submitRequest = () => {
    if (!selectedFile) {
      setError('Please select a garment image before submitting your request.')
      return
    }
    setStatusStep(0)
    setStage('submitted')
  }

  const advanceStatus = () => {
    const nextStep = statusStep + 1
    setStatusStep(nextStep)
    if (nextStep === journey.length - 1) {
      // Demo-only progression: Janasya personnel always make the final decision.
      setOutcome(selectedFile && selectedFile.size % 2 === 0 ? 'reusable' : 'recycled')
      setDemoPoints((points) => points + 50)
      setStage('outcome')
    }
  }

  const startUpload = () => {
    setError('')
    setStage('upload')
  }

  return (
    <section className="bg-[#fffdf8] text-[#1d1d1d]">
      <div className="mx-auto max-w-1400 px-4 pb-20 pt-10 sm:px-6 sm:pt-16 lg:px-10 lg:pb-28">
        <div className="grid items-center gap-10 overflow-hidden rounded-[28px] border border-[#e6ddcc] bg-[#f7f2e8] shadow-[0_20px_60px_rgba(17,24,39,0.07)] lg:grid-cols-[1.02fr_0.98fr]">
          <div className="px-6 py-12 sm:px-12 lg:px-16 lg:py-20">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#0b6b6b]">Janasya Nayi Dor</p>
            <h1 className="mt-5 max-w-xl font-serif text-5xl leading-[0.95] text-[#1a1a1a] sm:text-6xl lg:text-7xl">Give Your Janasya Garment a Second Life.</h1>
            <p className="mt-7 max-w-lg text-base leading-7 text-[#5a6769] sm:text-lg">Have a Janasya garment you no longer use? Send it back to us and we&apos;ll help give it a second life.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <button type="button" onClick={startUpload} className="interactive-btn inline-flex items-center justify-center gap-2 rounded-full bg-[#0b6b6b] px-6 py-3.5 text-sm font-medium text-white shadow-[0_12px_24px_rgba(11,107,107,0.2)] hover:-translate-y-0.5 hover:bg-[#0ea5a4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0ea5a4]/35">Upload Garment <ArrowRight size={16} /></button>
              <button type="button" onClick={() => setStage('status')} className="interactive-btn inline-flex items-center justify-center rounded-full border border-[#d8cdbb] bg-transparent px-6 py-3.5 text-sm font-medium text-[#1d1d1d] hover:-translate-y-0.5 hover:border-[#0ea5a4] hover:text-[#0b6b6b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0ea5a4]/35">View Request Status</button>
            </div>
            <p className="mt-6 max-w-md text-sm leading-6 text-[#5a6769]">Janasya personnel will collect the garment, physically verify it, and determine its most responsible next step.</p>
          </div>
          <div className="relative min-h-90 overflow-hidden bg-[#0b6b6b] lg:min-h-140">
            <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, #c9a24d 0 1px, transparent 1px), radial-gradient(circle at 80% 70%, #f7f2e8 0 1px, transparent 1px)', backgroundSize: '34px 34px, 52px 52px' }} />
            <div className="absolute -right-16 -top-20 h-72 w-72 rounded-full border border-[#c9a24d]/50" />
            <div className="absolute -bottom-24 -left-20 h-80 w-80 rounded-full border border-white/20" />
            <div className="relative flex h-full flex-col justify-end p-8 text-[#fffdf8] sm:p-12 lg:p-16">
              <Heart className="mb-10 text-[#c9a24d]" size={34} strokeWidth={1.2} />
              <p className="font-serif text-4xl leading-none sm:text-5xl">Upload. Return. Continue.</p>
              <p className="mt-4 max-w-sm text-sm leading-6 text-white/75">A considered take-back journey for pieces that still have a story to tell.</p>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-14 max-w-5xl text-center sm:mt-20">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-[#0b6b6b]">The Janasya take-back journey</p>
          <h2 className="mt-3 font-serif text-4xl text-[#1a1a1a] sm:text-5xl">Simple for you. Thoughtful by us.</h2>
          <div className="mt-9 grid gap-3 sm:grid-cols-5">
            {['Upload', 'Request Collection', 'Janasya Verification', 'Reuse or Recycle', 'Get Rewarded'].map((step, index) => <div key={step} className="flex items-center gap-3 rounded-[18px] border border-[#e6ddcc] bg-white p-4 text-left shadow-[0_8px_22px_rgba(17,24,39,0.04)] sm:block sm:text-center"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0b6b6b] text-xs text-white sm:mx-auto">{index + 1}</span><span className="text-sm text-[#5a6769] sm:mt-3 sm:block">{step}</span></div>)}
          </div>
          <div className="mx-auto mt-8 inline-flex items-center gap-2 rounded-full border border-[#e6ddcc] bg-white px-4 py-2 text-xs text-[#5a6769] shadow-[0_8px_22px_rgba(17,24,39,0.04)]"><Gift size={14} className="text-[#c9a24d]" /> Rewear Points are awarded after successful collection, regardless of the final outcome.</div>
          <div className="mx-auto mt-4 flex max-w-sm items-center justify-between rounded-[18px] border border-[#c9a24d]/50 bg-[#fff8e9] px-5 py-4 text-left shadow-[0_8px_22px_rgba(17,24,39,0.04)]">
            <div><p className="text-xs font-medium uppercase tracking-[0.2em] text-[#0b6b6b]">Demo user</p><p className="mt-1 text-sm text-[#5a6769]">Janasya Rewear Points</p></div>
            <p className="font-serif text-3xl text-[#1a1a1a]">{demoPoints}</p>
          </div>
        </div>
      </div>

      {stage !== 'landing' && <div className="fixed inset-0 z-70 flex items-center justify-center overflow-y-auto bg-black/50 p-4" role="dialog" aria-modal="true" aria-labelledby="donation-dialog-title">
        <div className="motion-pop-in my-auto w-full max-w-2xl rounded-3xl bg-[#fffdf8] p-5 shadow-2xl sm:p-8">
          {stage === 'upload' && <UploadRequest fileInputRef={fileInputRef} previewUrl={previewUrl} selectedFile={selectedFile} error={error} onFile={handleFile} onReset={resetFile} onSubmit={submitRequest} onClose={() => setStage('landing')} />}
          {stage === 'submitted' && <SuccessModal onViewStatus={() => setStage('status')} onClose={() => setStage('landing')} />}
          {stage === 'status' && <StatusModal statusStep={statusStep} onAdvance={advanceStatus} onClose={() => setStage('landing')} />}
          {stage === 'outcome' && <OutcomeModal demoPoints={demoPoints} outcome={outcome} onRestart={() => { resetFile(); setStatusStep(0); setStage('landing') }} onClose={() => setStage('landing')} />}
        </div>
      </div>}
    </section>
  )
}

function DialogHeader({ eyebrow, title, onClose }: { eyebrow: string; title: string; onClose: () => void }) {
  return <div className="flex items-start justify-between gap-4"><div><p className="text-xs font-medium uppercase tracking-[0.25em] text-[#0b6b6b]">{eyebrow}</p><h2 id="donation-dialog-title" className="mt-3 font-serif text-4xl leading-none">{title}</h2></div><button type="button" onClick={onClose} aria-label="Close donation dialog" className="interactive-btn rounded-full p-2 text-[#5a6769] hover:bg-[#f7f2e8] hover:text-[#0b6b6b]"><X size={20} /></button></div>
}

function UploadRequest({ fileInputRef, previewUrl, selectedFile, error, onFile, onReset, onSubmit, onClose }: { fileInputRef: React.RefObject<HTMLInputElement | null>; previewUrl: string; selectedFile: File | null; error: string; onFile: (file?: File) => void; onReset: () => void; onSubmit: () => void; onClose: () => void }) {
  return <div><DialogHeader eyebrow="Donations" title="Upload Your Garment" onClose={onClose} /><p className="mt-3 max-w-lg text-sm leading-6 text-[#5a6769]">Upload a clear photo of the Janasya garment you would like to return to us.</p><input ref={fileInputRef} type="file" accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp" className="sr-only" onChange={(event) => onFile(event.target.files?.[0])} />{previewUrl ? <div className="mt-7 overflow-hidden rounded-[18px] border border-[#e6ddcc] bg-[#f7f2e8]"><div className="relative aspect-4/3 max-h-90"><img src={previewUrl} alt="Preview of the selected garment" className="h-full w-full object-contain" /></div><div className="flex flex-col gap-3 border-t border-[#e6ddcc] p-4 sm:flex-row sm:items-center sm:justify-between"><p className="flex min-w-0 items-center gap-2 truncate text-sm text-[#5a6769]"><FileImage size={16} className="shrink-0 text-[#0b6b6b]" /> {selectedFile?.name}</p><button type="button" onClick={onReset} className="interactive-btn inline-flex items-center justify-center gap-2 rounded-full border border-[#d8cdbb] px-4 py-2 text-xs font-medium hover:border-[#0ea5a4] hover:text-[#0b6b6b]"><RefreshCw size={14} /> Change image</button></div></div> : <button type="button" onClick={() => fileInputRef.current?.click()} className="interactive-btn mt-7 flex min-h-56 w-full flex-col items-center justify-center rounded-[18px] border border-dashed border-[#c9a24d] bg-[#f7f2e8] px-5 text-center hover:bg-[#f1ebdf] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0ea5a4]/35"><span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#0b6b6b] shadow-[0_8px_20px_rgba(17,24,39,0.06)]"><Upload size={20} /></span><span className="mt-4 text-sm font-medium">Choose a garment image</span><span className="mt-1 text-xs text-[#5a6769]">JPG, JPEG, PNG or WEBP · up to 5 MB</span></button>}{error && <p className="mt-3 text-sm text-[#a34d3a]" role="alert">{error}</p>}<button type="button" onClick={onSubmit} className="interactive-btn mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#0b6b6b] px-6 py-3.5 text-sm font-medium text-white hover:bg-[#0ea5a4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0ea5a4]/35">Submit Collection Request <ArrowRight size={16} /></button></div>
}

function SuccessModal({ onViewStatus, onClose }: { onViewStatus: () => void; onClose: () => void }) {
  return <div><DialogHeader eyebrow="Request received" title="🎉 You&apos;re eligible for the Janasya Loyalty Program!" onClose={onClose} /><div className="mt-8 rounded-[18px] border border-[#b9d8d2] bg-[#edf8f5] p-5 text-sm leading-6 text-[#315b5b]">Your garment collection request has been submitted successfully. Our team will review and collect your garment.</div><p className="mt-5 text-sm leading-6 text-[#5a6769]">Rewear Points are awarded after successful collection, whether the garment is reused or recycled.</p><button type="button" onClick={onViewStatus} className="interactive-btn mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#0b6b6b] px-6 py-3.5 text-sm font-medium text-white hover:bg-[#0ea5a4]">View Request Status <ArrowRight size={16} /></button></div>
}

function StatusModal({ statusStep, onAdvance, onClose }: { statusStep: number; onAdvance: () => void; onClose: () => void }) {
  return <div><DialogHeader eyebrow="Your request" title="Request Status" onClose={onClose} /><div className="mt-8 space-y-3">{journey.map((step, index) => { const complete = index <= statusStep; return <div key={step} className="flex items-center gap-3 rounded-2xl border border-[#e6ddcc] bg-white p-4"><span className={`flex h-8 w-8 items-center justify-center rounded-full border ${complete ? 'border-[#0b6b6b] bg-[#0b6b6b] text-white' : 'border-[#d8cdbb] text-[#8b8b84]'}`}>{complete ? <Check size={15} /> : index + 1}</span><span className={`text-sm ${complete ? 'font-medium text-[#1d1d1d]' : 'text-[#7b8585]'}`}>{step}</span></div> })}</div><div className="mt-6 rounded-[18px] border border-[#e6ddcc] bg-[#f7f2e8] p-5 text-sm leading-6 text-[#5a6769]"><p className="font-medium text-[#1d1d1d]">Janasya personnel will collect the garment.</p><p className="mt-1">Collection requests are grouped by area and scheduled for collection days. <strong>Collection Day: Saturday</strong> (proposed demo workflow).</p></div>{statusStep < journey.length - 1 && <button type="button" onClick={onAdvance} className="interactive-btn mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#0b6b6b] px-6 py-3.5 text-sm font-medium text-white hover:bg-[#0ea5a4]">Continue Demo Status <ArrowRight size={16} /></button>}</div>
}

function OutcomeModal({ demoPoints, outcome, onRestart, onClose }: { demoPoints: number; outcome: Outcome; onRestart: () => void; onClose: () => void }) {
  const reusable = outcome === 'reusable'
  return <div><DialogHeader eyebrow="Final notification" title={reusable ? 'Your garment is getting a second life ♻️' : 'Your garment is being recycled ♻️'} onClose={onClose} /><div className="mt-8 rounded-[18px] border border-[#b9d8d2] bg-[#edf8f5] p-5 text-sm leading-6 text-[#315b5b]">{reusable ? "After physical verification, your garment was found suitable for reuse and will be passed through Janasya's reuse/donation network." : 'After physical verification, your garment was found unsuitable for reuse and will be routed for recycling/upcycling.'}</div><div className="mt-5 rounded-[18px] border border-[#e7d7b7] bg-[#fff8e9] p-5"><p className="flex items-center gap-2 font-medium text-[#1d1d1d]"><Gift size={18} className="text-[#c9a24d]" /> You&apos;ve earned Janasya Rewear Points!</p><p className="mt-2 text-sm leading-6 text-[#5a6769]">Thank you for returning your garment and helping us reduce textile waste. Rewear Points added to your account.</p><p className="mt-4 border-t border-[#e7d7b7] pt-4 text-sm font-medium text-[#0b6b6b]">Demo user balance: {demoPoints} points <span className="font-normal text-[#5a6769]">(+50 for successful collection)</span></p></div><button type="button" onClick={onRestart} className="interactive-btn mt-6 inline-flex w-full items-center justify-center rounded-full border border-[#d8cdbb] px-6 py-3.5 text-sm font-medium hover:border-[#0ea5a4] hover:text-[#0b6b6b]">Return another garment</button></div>
}
