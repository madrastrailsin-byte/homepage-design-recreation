import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dir = path.join(__dirname, "../public/images/services");

async function walk(folder) {
  const files = fs.readdirSync(folder);

  for (const file of files) {
    const full = path.join(folder, file);
    const stat = fs.statSync(full);

    if (stat.isDirectory()) {
      await walk(full);
      continue;
    }

    if (!/\.(png|jpg|jpeg)$/i.test(file)) continue;

    const ext = path.extname(file).toLowerCase();

    if (ext === ".png") {
      await sharp(full)
        .resize({ width: 1200, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(full.replace(ext, ".webp"));
    } else {
      const temp = full.replace(ext, ".tmp.jpg");

      await sharp(full)
        .resize({ width: 1800, withoutEnlargement: true })
        .jpeg({ quality: 75, mozjpeg: true })
        .toFile(temp);

      fs.renameSync(temp, full);
    }

    console.log(file);
  }
}

walk(dir).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});