import { useEffect, useState } from "react"

const messages = [
   "Bade Bade Celebrations Mein... Janasya Zaroori Hai!",
  "Pyaar Dosti Hai... Aur Style? Janasya Hai!",
  "Iss Festive Season... Dil Bhi Taiyaar, Wardrobe Bhi.",
  "AW'26 Collection — Coming Soon . . .",
  "Elegance Never Goes Out of Style.",
  " Free Shipping Across India!"
]

export function TickerBar() {
  const [text, setText] = useState("")
  const [messageIndex, setMessageIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)

  useEffect(() => {
    if (charIndex < messages[messageIndex].length) {
      const timeout = setTimeout(() => {
        setText((prev) => prev + messages[messageIndex][charIndex])
        setCharIndex((prev) => prev + 1)
      }, 55)

      return () => clearTimeout(timeout)
    }

    const hold = setTimeout(() => {
      setText("")
      setCharIndex(0)
      setMessageIndex((prev) => (prev + 1) % messages.length)
    }, 2500)

    return () => clearTimeout(hold)
  }, [charIndex, messageIndex])

  return (
    <div
      style={{
        background: "#0D9FB3",
color: "#FFFFFF",
        height: "42px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "12px",
        fontWeight: 600,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        overflow: "hidden",
      }}
    >
      <span>{text}</span>

      <span
        style={{
          display: "inline-block",
          marginLeft: "2px",
          width: "2px",
          height: "14px",
          background: "#F6D365",
          animation: "blink 1s infinite",
        }}
      />

      <style>{`
        @keyframes blink {
          0%,50% {opacity:1;}
          51%,100% {opacity:0;}
        }
      `}</style>
    </div>
  )
}