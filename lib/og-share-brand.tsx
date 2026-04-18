/** Tarjeta de marca para Open Graph / Twitter: logo + copy de la agencia (motor next/og). */
export function OgShareBrand({ logoDataUrl }: { logoDataUrl: string | null }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#F2F2F0',
        padding: 56,
      }}
    >
      {logoDataUrl ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 40,
          }}
        >
          <img width={220} height={220} src={logoDataUrl} alt="" />
        </div>
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 36,
          }}
        >
          <span
            style={{
              fontSize: 64,
              fontWeight: 800,
              color: '#020C41',
              letterSpacing: '-0.03em',
            }}
          >
            AM{' '}
          </span>
          <span
            style={{
              fontSize: 64,
              fontWeight: 800,
              color: '#FA0073',
              letterSpacing: '-0.03em',
            }}
          >
            Pachuca
          </span>
        </div>
      )}

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
          maxWidth: 920,
        }}
      >
        <span
          style={{
            fontSize: 34,
            fontWeight: 600,
            color: '#020C41',
            textAlign: 'center',
            lineHeight: 1.25,
          }}
        >
          Tu agencia de viajes en Pachuca
        </span>

        <span
          style={{
            fontSize: 22,
            fontWeight: 400,
            color: '#334155',
            textAlign: 'center',
            lineHeight: 1.45,
            maxWidth: 820,
          }}
        >
          Paquetes turísticos, promociones exclusivas y los mejores destinos para tus vacaciones.
        </span>
      </div>
    </div>
  )
}
