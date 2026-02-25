import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname, basename } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const photosDir = join(__dirname, '..', 'public', 'photos');

const SUPPORTED_EXTENSIONS = ['.jpg', '.jpeg', '.png'];

async function convertToWebP(inputPath, outputPath, quality) {
    const inputStat = await stat(inputPath);
    await sharp(inputPath)
        .webp({ quality })
        .toFile(outputPath);
    const outputStat = await stat(outputPath);
    const savings = (((inputStat.size - outputStat.size) / inputStat.size) * 100).toFixed(1);
    const inputKB = (inputStat.size / 1024).toFixed(1);
    const outputKB = (outputStat.size / 1024).toFixed(1);
    console.log(`✅ ${basename(inputPath)} → ${basename(outputPath)} | ${inputKB}KB → ${outputKB}KB (saved ${savings}%)`);
}

async function main() {
    console.log('🔄 Converting images to WebP...\n');

    const files = await readdir(photosDir);
    const imageFiles = files.filter(f => SUPPORTED_EXTENSIONS.includes(extname(f).toLowerCase()));

    let totalInputSize = 0;
    let totalOutputSize = 0;

    for (const file of imageFiles) {
        const inputPath = join(photosDir, file);
        const ext = extname(file);
        const baseName = basename(file, ext);
        const outputPath = join(photosDir, `${baseName}.webp`);

        // Use higher quality for logo PNG, standard for photos
        const quality = ext.toLowerCase() === '.png' ? 90 : 80;

        try {
            const inputStat = await stat(inputPath);
            await convertToWebP(inputPath, outputPath, quality);
            const outputStat = await stat(outputPath);
            totalInputSize += inputStat.size;
            totalOutputSize += outputStat.size;
        } catch (err) {
            console.error(`❌ Failed to convert ${file}:`, err.message);
        }
    }

    const totalSavedKB = ((totalInputSize - totalOutputSize) / 1024).toFixed(0);
    const totalSavedPercent = (((totalInputSize - totalOutputSize) / totalInputSize) * 100).toFixed(1);
    console.log(`\n🎉 Done! Total saved: ${totalSavedKB}KB (${totalSavedPercent}% reduction)`);
}

main().catch(console.error);
