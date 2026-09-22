import sharp from 'sharp';
import { existsSync, statSync, writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const dir = path.join(root, 'public', 'atmosphere');
const pngPath = path.join(dir, 'hydro-risk-bg.png');
const jpgPath = path.join(dir, 'hydro-risk-bg.jpg');
const hiresPath = path.join(dir, 'hydro-risk-bg-hires.jpg');

const usePng = existsSync(pngPath);
const inputPath = usePng ? pngPath : jpgPath;

if (!existsSync(inputPath)) {
  console.error('No hydro-risk-bg.png or hydro-risk-bg.jpg found.');
  process.exit(1);
}

const inputStat = statSync(inputPath);
const inputMeta = await sharp(inputPath).metadata();

let pipeline = sharp(inputPath);

if (usePng) {
  const w = Math.round(inputMeta.width * 3);
  const h = Math.round(inputMeta.height * 3);
  pipeline = pipeline.resize(w, h, { kernel: sharp.kernel.lanczos3 });
} else {
  pipeline = pipeline.sharpen({ sigma: 1, m1: 1.2, m2: 0.5 });
}

const jpegOptions = { quality: 92, mozjpeg: true };
const buffer = await pipeline.jpeg(jpegOptions).toBuffer();

writeFileSync(jpgPath, buffer);
writeFileSync(hiresPath, buffer);

const outMeta = await sharp(buffer).metadata();
const jpgStat = statSync(jpgPath);
const hiresStat = statSync(hiresPath);

console.log(
  JSON.stringify(
    {
      mode: usePng ? '3x lanczos3 upscale from PNG' : 'mild sharpen from existing JPG',
      input: {
        file: path.basename(inputPath),
        width: inputMeta.width,
        height: inputMeta.height,
        bytes: inputStat.size,
        kb: +(inputStat.size / 1024).toFixed(1),
      },
      output: {
        width: outMeta.width,
        height: outMeta.height,
        files: {
          'hydro-risk-bg.jpg': { bytes: jpgStat.size, kb: +(jpgStat.size / 1024).toFixed(1) },
          'hydro-risk-bg-hires.jpg': { bytes: hiresStat.size, kb: +(hiresStat.size / 1024).toFixed(1) },
        },
        jpeg: jpegOptions,
      },
    },
    null,
    2,
  ),
);
