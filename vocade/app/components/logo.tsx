import type React from "react"

export function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M20 20L50 35L80 20L50 5L20 20Z" fill="currentColor" fillOpacity="0.8" />
      <path d="M20 50L50 65L80 50L50 35L20 50Z" fill="currentColor" fillOpacity="0.6" />
      <path d="M20 80L50 95L80 80L50 65L20 80Z" fill="currentColor" fillOpacity="0.4" />
    </svg>
  )
}

