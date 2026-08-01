import { useEffect, useState } from 'react'

export function useScrollSpy(sectionIds: string[], offset = 160) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? 'home')

  useEffect(() => {
    function handleScroll() {
      const scrollPosition = window.scrollY + offset
      let current = sectionIds[0] ?? 'home'

      for (const sectionId of sectionIds) {
        const element = document.getElementById(sectionId)
        if (element && scrollPosition >= element.offsetTop) {
          current = sectionId
        }
      }

      setActiveSection(current)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sectionIds, offset])

  return activeSection
}
