import { ImageResponse } from 'next/og'

import { OgHomePreview } from '@/lib/og-home-preview'

export const alt = 'AM Pachuca — previsualización del sitio web'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(<OgHomePreview />, { ...size })
}
