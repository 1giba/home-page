// Renders the default OG image (plan F6-02): src/assets/og/default.svg → public/og/default.png,
// 1200×630. Run by hand after changing the SVG, and commit the PNG; the build only copies it.
// sharp comes with Astro (its image service), so this adds no dependency.
import { mkdirSync } from 'node:fs'
import sharp from 'sharp'

const source = 'src/assets/og/default.svg'
const target = 'public/og/default.png'

mkdirSync('public/og', { recursive: true })
const info = await sharp(source).resize(1200, 630).png({ compressionLevel: 9 }).toFile(target)
console.log(`${target}: ${info.width}×${info.height}, ${info.size} bytes`)
