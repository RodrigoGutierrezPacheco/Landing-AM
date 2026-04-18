import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

const candidates = ['logo.jpg', 'logo.jpeg', 'logo.png'] as const

/** Lee el logo del sitio desde /public (mismo archivo que usa el header). */
export async function loadShareLogoDataUrl(): Promise<string | null> {
  for (const name of candidates) {
    try {
      const buf = await readFile(join(process.cwd(), 'public', name))
      const mime = name.endsWith('png') ? 'image/png' : 'image/jpeg'
      return `data:${mime};base64,${buf.toString('base64')}`
    } catch {
      continue
    }
  }
  return null
}
