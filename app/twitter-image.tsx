import { ImageResponse } from 'next/og'

import { loadShareLogoDataUrl } from '@/lib/load-share-logo'
import { OgShareBrand } from '@/lib/og-share-brand'

export const alt = 'AM Pachuca — Tu agencia de viajes en Pachuca'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  const logoDataUrl = await loadShareLogoDataUrl()
  return new ImageResponse(<OgShareBrand logoDataUrl={logoDataUrl} />, { ...size })
}
