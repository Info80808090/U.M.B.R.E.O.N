import fs from 'fs';
import path from 'path';
import axios from 'axios';
import * as cheerio from 'cheerio';
import archiver from 'archiver';
import chalk from 'chalk';
import promptSync from 'prompt-sync';
import { fileURLToPath } from 'url';

const prompt = promptSync();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function cloneWeb() {
  try {
    console.clear();
    const url = prompt(chalk.yellow('Masukkan URL website ( https://www.example.com ): ')).trim();

    if (!/^https?:\/\//.test(url)) {
      console.log(chalk.red('❌ URL harus diawali dengan http:// atau https://'));
      return;
    }

    console.log(chalk.yellow('Mengunduh...'));
    const res = await axios.get(url);
    const html = res.data;

    const $ = cheerio.load(html);
    const title = $('title').text().trim() || 'website';
    const safeTitle = title.replace(/[<>:"/\\|?*\x00-\x1F]/g, '').slice(0, 50);

    const folderPath = path.join(__dirname, '..', 'assets', 'clone-web', safeTitle);
    fs.mkdirSync(folderPath, { recursive: true });
    fs.writeFileSync(path.join(folderPath, 'index.html'), html);

    const zipPath = path.join(__dirname, '..', 'assets', 'clone-web', `${safeTitle}.zip`);
    const output = fs.createWriteStream(zipPath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    archive.pipe(output);
    archive.directory(folderPath, false);
    await archive.finalize();

    console.log(chalk.green(`✅ Website berhasil di-clone dan disimpan di:`));
    console.log(chalk.blue(`→ ${zipPath}`));
  } catch (err) {
    console.error(chalk.red(`❌ Terjadi kesalahan: ${err.message}`));
  }
}
