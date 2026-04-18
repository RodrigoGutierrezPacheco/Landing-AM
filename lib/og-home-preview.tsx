/**
 * Vista para Open Graph / Twitter: evoca el home (chrome + header + hero + bloques),
 * compatible con el motor de next/og (Satori).
 */
export function OgHomePreview() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#94a3b8',
        padding: 18,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: 1164,
          height: 594,
          borderRadius: 12,
          border: '2px solid #64748b',
          overflow: 'hidden',
          background: '#f2f2f0',
        }}
      >
        {/* Ventana: botones */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            height: 34,
            background: '#e2e8f0',
            paddingLeft: 14,
            gap: 7,
          }}
        >
          <div style={{ width: 12, height: 12, borderRadius: 6, background: '#ef4444' }} />
          <div style={{ width: 12, height: 12, borderRadius: 6, background: '#eab308' }} />
          <div style={{ width: 12, height: 12, borderRadius: 6, background: '#22c55e' }} />
        </div>

        {/* Barra URL */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            height: 30,
            background: '#f1f5f9',
            paddingLeft: 18,
            paddingRight: 18,
            borderBottom: '1px solid #cbd5e1',
          }}
        >
          <span style={{ fontSize: 14, color: '#475569' }}>am-pachuca.com</span>
        </div>

        {/* Header tipo sitio */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 58,
            background: 'rgba(2, 12, 65, 0.96)',
            paddingLeft: 22,
            paddingRight: 22,
            borderBottom: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <span style={{ fontSize: 22, fontWeight: 700, color: '#fafafa' }}>AM Pachuca</span>
          <div style={{ display: 'flex', flexDirection: 'row', gap: 18 }}>
            <span style={{ fontSize: 13, color: 'rgba(250,250,250,0.78)' }}>Inicio</span>
            <span style={{ fontSize: 13, color: 'rgba(250,250,250,0.78)' }}>Promociones</span>
            <span style={{ fontSize: 13, color: 'rgba(250,250,250,0.78)' }}>Contacto</span>
          </div>
        </div>

        {/* Hero (mismo look que la sección real) */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: 340,
            background: '#020C41',
            position: 'relative',
            alignItems: 'center',
            justifyContent: 'center',
            paddingLeft: 36,
            paddingRight: 36,
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 24,
              left: 24,
              width: 200,
              height: 200,
              borderRadius: 9999,
              background: 'rgba(0, 0, 227, 0.28)',
              filter: 'blur(40px)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 16,
              right: 20,
              width: 260,
              height: 260,
              borderRadius: 9999,
              background: 'rgba(250, 0, 115, 0.16)',
              filter: 'blur(48px)',
            }}
          />

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              maxWidth: 920,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                paddingLeft: 18,
                paddingRight: 18,
                paddingTop: 8,
                paddingBottom: 8,
                borderRadius: 9999,
                backgroundColor: 'rgba(0, 0, 227, 0.2)',
                color: '#fafafa',
                fontSize: 15,
                fontWeight: 500,
                marginBottom: 16,
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
                fontSize: 38,
                fontWeight: 700,
                color: '#fafafa',
                textAlign: 'center',
                lineHeight: 1.1,
                marginBottom: 14,
              }}
            >
              <span>Descubre el Mundo con </span>
              <span style={{ color: '#FA0073' }}>AM Pachuca</span>
            </div>

            <div
              style={{
                fontSize: 16,
                color: 'rgba(250, 250, 250, 0.82)',
                textAlign: 'center',
                lineHeight: 1.45,
                maxWidth: 620,
              }}
            >
              Somos tu agencia de viajes de confianza. Paquetes exclusivos, promociones y
              experiencias inolvidables.
            </div>
          </div>
        </div>

        {/* Franja tipo scroll: secciones del home */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            height: 132,
            background: '#f2f2f0',
            padding: 12,
            gap: 10,
            alignItems: 'stretch',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              background: '#ffffff',
              borderRadius: 10,
              border: '1px solid #e2e8f0',
              overflow: 'hidden',
            }}
          >
            <div style={{ height: 5, width: '100%', background: '#FA0073' }} />
            <div
              style={{
                display: 'flex',
                flex: 1,
                flexDirection: 'column',
                padding: 12,
                justifyContent: 'center',
              }}
            >
              <span style={{ fontSize: 14, fontWeight: 700, color: '#020C41' }}>Promociones</span>
              <span style={{ fontSize: 12, color: '#64748b', marginTop: 6 }}>Ofertas del mes</span>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              background: '#ffffff',
              borderRadius: 10,
              border: '1px solid #e2e8f0',
              overflow: 'hidden',
            }}
          >
            <div style={{ height: 5, width: '100%', background: '#0000E3' }} />
            <div
              style={{
                display: 'flex',
                flex: 1,
                flexDirection: 'column',
                padding: 12,
                justifyContent: 'center',
              }}
            >
              <span style={{ fontSize: 14, fontWeight: 700, color: '#020C41' }}>Destinos</span>
              <span style={{ fontSize: 12, color: '#64748b', marginTop: 6 }}>50+ lugares</span>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              background: '#ffffff',
              borderRadius: 10,
              border: '1px solid #e2e8f0',
              overflow: 'hidden',
            }}
          >
            <div style={{ height: 5, width: '100%', background: '#020C41' }} />
            <div
              style={{
                display: 'flex',
                flex: 1,
                flexDirection: 'column',
                padding: 12,
                justifyContent: 'center',
              }}
            >
              <span style={{ fontSize: 14, fontWeight: 700, color: '#020C41' }}>Contacto</span>
              <span style={{ fontSize: 12, color: '#64748b', marginTop: 6 }}>Te asesoramos</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
