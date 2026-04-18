import { ImageResponse } from 'next/og'

export const alt = 'AM Pachuca — Agencia de Viajes'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/** Miniatura al compartir: misma estética que el hero (fondo y copy principal). */
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#020C41',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 72,
            left: 32,
            width: 288,
            height: 288,
            borderRadius: 9999,
            background: 'rgba(0, 0, 227, 0.28)',
            filter: 'blur(48px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 48,
            right: 32,
            width: 384,
            height: 384,
            borderRadius: 9999,
            background: 'rgba(250, 0, 115, 0.18)',
            filter: 'blur(64px)',
          }}
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 56px',
            maxWidth: 1000,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              paddingLeft: 28,
              paddingRight: 28,
              paddingTop: 12,
              paddingBottom: 12,
              borderRadius: 9999,
              backgroundColor: 'rgba(0, 0, 227, 0.2)',
              color: '#fafafa',
              fontSize: 20,
              fontWeight: 500,
              marginBottom: 32,
            }}
          >
            Tu próxima aventura comienza aquí
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 0,
              fontSize: 58,
              fontWeight: 700,
              color: '#fafafa',
              textAlign: 'center',
              lineHeight: 1.08,
              letterSpacing: '-0.02em',
              marginBottom: 28,
              maxWidth: 1000,
            }}
          >
            <span>Descubre el Mundo con </span>
            <span style={{ color: '#FA0073' }}>AM Pachuca</span>
          </div>

          <div
            style={{
              fontSize: 22,
              color: 'rgba(250, 250, 250, 0.85)',
              textAlign: 'center',
              lineHeight: 1.5,
              maxWidth: 720,
            }}
          >
            Somos tu agencia de viajes de confianza. Ofrecemos paquetes turísticos exclusivos,
            promociones increíbles y experiencias inolvidables para ti y tu familia.
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  )
}
