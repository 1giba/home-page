// Renders the default OG image (plan F6-02): src/assets/og/default.svg → public/og/default.png,
// 1200×630. Run by hand after changing the SVG, and commit the PNG and src/assets/og/rendered.json
// (hashes of both files; a unit test fails while the PNG is stale). The build only copies the PNG.
// sharp comes with Astro (its image service), so this adds no dependency.
import { createHash } from 'node:crypto'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import sharp from 'sharp'

const source = 'src/assets/og/default.svg'
const target = 'public/og/default.png'

mkdirSync('public/og', { recursive: true })
const info = await sharp(source).resize(1200, 630).png({ compressionLevel: 9 }).toFile(target)
const sha256 = (path) => createHash('sha256').update(readFileSync(path)).digest('hex')
const rendered = { svgSha256: sha256(source), pngSha256: sha256(target) }
writeFileSync('src/assets/og/rendered.json', `${JSON.stringify(rendered, null, 2)}\n`)
console.log(`${target}: ${info.width}×${info.height}, ${info.size} bytes`)
