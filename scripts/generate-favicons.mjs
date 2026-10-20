import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function generateFavicons() {
  const svgPath = path.resolve('public/favicon.svg');
  const svgBuffer = fs.readFileSync(svgPath);

  const targets = [
    { name: 'public/favicon-16x16.png', size: 16 },
    { name: 'public/favicon-32x32.png', size: 32 },
    { name: 'public/favicon-48x48.png', size: 48 },
    { name: 'public/apple-touch-icon.png', size: 180 },
    { name: 'public/android-chrome-192x192.png', size: 192 },
    { name: 'public/android-chrome-512x512.png', size: 512 },
  ];

  for (const target of targets) {
    await sharp(svgBuffer)
      .resize(target.size, target.size)
      .png()
      .toFile(target.name);
    console.log(`Generated ${target.name} (${target.size}x${target.size})`);
  }

  // Create standard ICO file containing 16x16, 32x32, 48x48 PNGs
  const png16 = await sharp(svgBuffer).resize(16, 16).png().toBuffer();
  const png32 = await sharp(svgBuffer).resize(32, 32).png().toBuffer();
  const png48 = await sharp(svgBuffer).resize(48, 48).png().toBuffer();

  // Write ICO binary format containing PNG images
  const images = [
    { width: 16, height: 16, buffer: png16 },
    { width: 32, height: 32, buffer: png32 },
    { width: 48, height: 48, buffer: png48 },
  ];

  const headerSize = 6;
  const dirEntrySize = 16;
  let offset = headerSize + dirEntrySize * images.length;

  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // Reserved
  header.writeUInt16LE(1, 2); // 1 = ICO
  header.writeUInt16LE(images.length, 4); // Number of images

  const entries = [];
  for (const img of images) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(img.width === 256 ? 0 : img.width, 0);
    entry.writeUInt8(img.height === 256 ? 0 : img.height, 1);
    entry.writeUInt8(0, 2); // Color palette
    entry.writeUInt8(0, 3); // Reserved
    entry.writeUInt16LE(1, 4); // Color planes
    entry.writeUInt16LE(32, 6); // Bits per pixel
    entry.writeUInt32LE(img.buffer.length, 8); // Image size in bytes
    entry.writeUInt32LE(offset, 12); // File offset
    entries.push(entry);
    offset += img.buffer.length;
  }

  const icoBuffer = Buffer.concat([header, ...entries, ...images.map(img => img.buffer)]);
  fs.writeFileSync('public/favicon.ico', icoBuffer);
  console.log(`Generated public/favicon.ico with 16x16, 32x32, 48x48 resolution layers (${icoBuffer.length} bytes)`);
}

generateFavicons().catch(err => {
  console.error(err);
  process.exit(1);
});
