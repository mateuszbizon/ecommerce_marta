"use client"

import { useEffect, useRef } from "react"

type InPostGeoWidgetProps = {
  token: string
  country?: string
  language?: string
  onSelect?: (point: any) => void
}

export default function InpostWidget({
  token,
  country = "PL",
  language = "pl",
  onSelect
}: InPostGeoWidgetProps) {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!ref.current) return

    const existing = document.querySelector('script[src="https://geowidget.inpost.pl/inpost-geowidget.js"]')

    if (!existing) {
        const script = document.createElement("script")
        script.src = "https://geowidget.inpost.pl/inpost-geowidget.js"
        script.async = true
        document.body.appendChild(script)
    }

    const widget = document.createElement("inpost-geowidget")

    widget.setAttribute("token", token)
    widget.setAttribute("country", country)
    widget.setAttribute("language", language)
    widget.setAttribute("config", "parcelcollect")
    widget.style.width = "100%"
    widget.style.height = "600px"
    widget.style.display = "block"

    ref.current.innerHTML = ""
    ref.current.appendChild(widget)

    const handleSelect = (event: CustomEvent) => {
        if (onSelect) onSelect(event.detail)
    }

    window.addEventListener("inpost-geowidget-selected", handleSelect as EventListener)

    return () => {
        window.removeEventListener("inpost-geowidget-selected", handleSelect as EventListener)
        ref.current && (ref.current.innerHTML = "")
    }
  }, [token, country, language, onSelect])

  return (
    <div ref={ref} className="mt-4" />
  )
}