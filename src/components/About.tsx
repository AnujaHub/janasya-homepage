import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Maximize, Pause, Play, Sparkles, Volume2, VolumeX } from 'lucide-react'
import { scrollToSection } from '@/utils/scroll'
import ABOUT_VIDEO_SRC from "@/data/videos/about.mp4";

const premiumEase = [0.22, 1, 0.36, 1] as const


const sectionVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.72,
      ease: premiumEase,
    },
  },
}

const videoReveal = {
  hidden: { opacity: 0, scale: 0.97, y: 18 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: premiumEase,
    },
  },
}

export function ABOUT() {
  const videoRef = useRef<HTMLVideoElement | null>(null)

const [isMuted, setIsMuted] = useState(true)
const [isPlaying, setIsPlaying] = useState(false)
const [currentTime, setCurrentTime] = useState(0)
const [duration, setDuration] = useState(0)

useEffect(() => {
  const video = videoRef.current
  if (!video) return

  video.muted = true
  video.defaultMuted = true

  const updateTime = () => setCurrentTime(video.currentTime)

  const loadedMetadata = () => {
    setDuration(video.duration)
  }

  const onPlay = () => setIsPlaying(true)
  const onPause = () => setIsPlaying(false)

  video.addEventListener('timeupdate', updateTime)
  video.addEventListener('loadedmetadata', loadedMetadata)
  video.addEventListener('play', onPlay)
  video.addEventListener('pause', onPause)

  return () => {
    video.removeEventListener('timeupdate', updateTime)
    video.removeEventListener('loadedmetadata', loadedMetadata)
    video.removeEventListener('play', onPlay)
    video.removeEventListener('pause', onPause)
  }
}, [])

const togglePlay = async () => {
  const video = videoRef.current
  if (!video) return

  if (video.paused) {
    try {
      await video.play()
    } catch (error) {
      console.error('Video playback failed:', error)
    }
  } else {
    video.pause()
  }
}

const handleSeek = (value: number) => {
  const video = videoRef.current
  if (!video) return

  video.currentTime = value
  setCurrentTime(value)
}

const toggleSound = () => {
  const video = videoRef.current
  if (!video) return

  video.muted = !video.muted
  setIsMuted(video.muted)
}

const toggleFullscreen = async () => {
  const video = videoRef.current
  if (!video) return

  try {
    if (document.fullscreenElement) {
      await document.exitFullscreen()
    } else {
      await video.requestFullscreen()
    }
  } catch (error) {
    console.error('Fullscreen failed:', error)
  }
}

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60)
    const secs = Math.floor(time % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }



  return (
    <motion.section
      id="about"
      aria-label="About Janasya"
      className="relative overflow-hidden bg-[#fbf6ee] py-16 sm:py-20 lg:py-28"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionVariants}
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.72)_0%,rgba(251,246,238,0.94)_35%,rgba(247,239,226,0.98)_100%)]" />
      <div
        className="absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(200,169,110,0.16) 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }}
      />
      <div className="pointer-events-none absolute left-1/2 top-0 h-56 w-208 -translate-x-1/2 rounded-full bg-[#d8c19b]/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-12 top-24 h-28 w-28 rounded-full bg-[#0ea5a4]/8 blur-3xl" />
      <div className="pointer-events-none absolute -right-12 bottom-16 h-32 w-32 rounded-full bg-[#c8a96e]/12 blur-3xl" />

      <div className="relative mx-auto max-w-1200 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <motion.p
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-[#e7ddcd] bg-white/70 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.34em] text-[#6a5942] shadow-[0_8px_20px_rgba(17,24,39,0.04)] backdrop-blur-sm sm:text-[11px]"
          >
            <Sparkles size={12} strokeWidth={2.2} aria-hidden="true" className="text-[#c8a96e]" />
            Celebrate Every Occasion
          </motion.p>

        </div>

        <motion.div
          variants={videoReveal}
          className="relative mx-auto mt-8 max-w-3xl sm:mt-10 lg:mt-12"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.35, ease: premiumEase }}
        >
          <div className="absolute -inset-2 rounded-[34px] bg-linear-to-br from-[#d8b76f]/55 via-white/65 to-[#9e7b3a]/55 blur-[1px] opacity-90" />
          <div className="relative rounded-4xl border border-white/70 bg-white/40 p-[1.5px] shadow-[0_24px_70px_rgba(17,24,39,0.12)] backdrop-blur-xl transition-shadow duration-500 hover:shadow-[0_30px_90px_rgba(17,24,39,0.16)]">
            <div className="group relative overflow-hidden rounded-[30px] bg-[#151515]">
              <div className="absolute inset-0 z-10 bg-linear-to-t from-black/38 via-transparent to-white/6" />
              <div className="absolute inset-0 z-10 opacity-45 mix-blend-screen" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.18) 1px, transparent 0)', backgroundSize: '18px 18px' }} />
              <div className="absolute inset-3 z-10 rounded-[22px] border border-[#e6c78a]/45" />
              <div className="pointer-events-none absolute left-4 top-4 z-10 h-7 w-7 rounded-tl-[18px] border-l border-t border-[#f3dfb0]/70" />
              <div className="pointer-events-none absolute right-4 top-4 z-10 h-7 w-7 rounded-tr-[18px] border-r border-t border-[#f3dfb0]/70" />
              <div className="pointer-events-none absolute bottom-4 left-4 z-10 h-7 w-7 rounded-bl-[18px] border-b border-l border-[#f3dfb0]/70" />
              <div className="pointer-events-none absolute bottom-4 right-4 z-10 h-7 w-7 rounded-br-[18px] border-b border-r border-[#f3dfb0]/70" />

              <video
                ref={videoRef}
                className="aspect-16/10 h-full w-full object-cover sm:aspect-video"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                aria-label="Janasya about video"
              >
                <source src={ABOUT_VIDEO_SRC} type="video/mp4" />
              </video>

              <div
  className="
    absolute bottom-4 left-4 right-4 z-20
    rounded-2xl bg-black/45 backdrop-blur-md p-3
    opacity-0 translate-y-3
    transition-all duration-300
    group-hover:opacity-100
    group-hover:translate-y-0
    group-focus-within:opacity-100
    group-focus-within:translate-y-0
  "
>

  <input
    type="range"
    min={0}
    max={duration || 0}
    value={currentTime}
    onChange={(e) => handleSeek(Number(e.target.value))}
    className="mb-3 w-full accent-[#0ea5a4]"
  />

  <div className="flex items-center justify-between">

    <div className="flex items-center gap-2">

      <button
        onClick={togglePlay}
        className="rounded-full bg-white/20 p-2 text-white hover:bg-white/30"
      >
        {isPlaying ? <Pause size={18} /> : <Play size={18} />}
      </button>

      <button
        onClick={toggleSound}
        className="rounded-full bg-white/20 p-2 text-white hover:bg-white/30"
      >
        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </button>

      <span className="text-xs text-white">
        {formatTime(currentTime)} / {formatTime(duration)}
      </span>

    </div>

    <button
      onClick={toggleFullscreen}
      className="rounded-full bg-white/20 p-2 text-white hover:bg-white/30"
    >
      <Maximize size={18} />
    </button>

  </div>

</div>

              <div className="absolute inset-x-0 bottom-0 z-10 h-24 bg-linear-to-t from-black/40 to-transparent" />
            </div>
          </div>
        </motion.div>

        <motion.div variants={fadeUp} className="mt-9 text-center sm:mt-10">
            <motion.p
            variants={fadeUp}
            className="mx-auto mt-4 max-w-3xl text-[clamp(0.98rem,1.9vw,1.1rem)] leading-[1.85] text-[#5c564f] sm:mt-5"
          >
            Rooted in Indian craftsmanship, designed for every woman, and crafted with heart since 2015.
          </motion.p>
          <br />
          <button
            type="button"
            onClick={() => scrollToSection('products')}
            className="group interactive-btn inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#0ea5a4] px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.26em] text-white shadow-[0_16px_34px_rgba(14,165,164,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0b9492] hover:shadow-[0_20px_42px_rgba(14,165,164,0.24)] sm:w-auto sm:px-8 sm:text-[12px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0ea5a4]/35"
          >
            <span>Explore Collections</span>
            <ArrowDown size={16} strokeWidth={2.1} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>

        </motion.div>
      </div>
    </motion.section>
  )
}