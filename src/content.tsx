import cssText from "data-text:~style.css"
import type { PlasmoCSConfig } from "plasmo"
import { useEffect, useState } from "react"

import AutomationUi from "~Components/automationUi"
import getCurrentPageUrl from "~useFullFunctions/getCurrentPageUrl"

import "~base.css"

export const config: PlasmoCSConfig = {
  matches: [
    "https://www.plasmo.com/*",
    "https://docs.plasmo.com/*",
    "https://studio.bases.com/platformservices/studio/*",
    "https://forecasting.nielsenplatform.com/*"
  ]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const PlasmoOverlay = () => {
  const [currentPageUrl, setCurrentPageUrl] = useState<null | string>("")

  useEffect(() => {
    async function setCurrentPageUrlState() {
      const currentPageUrl = await getCurrentPageUrl()
      setCurrentPageUrl(currentPageUrl)
    }

    if (!currentPageUrl) {
      setCurrentPageUrlState()
    }
  }, [])

  return (
    <div className="fixed z-50 flex top-20 right-8" draggable="true">
      {currentPageUrl && <AutomationUi {...{ currentPageUrl }} />}
    </div>
  )
}

export default PlasmoOverlay
