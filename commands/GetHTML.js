import axios from 'axios';
import promptSync from 'prompt-sync';
import chalk from 'chalk';
import clipboard from 'clipboardy'; // <- Import clipboardy

const prompt = promptSync();
const log = console.log;

export default async function () {
  log(chalk.cyanBright.bold('╔══════════════════════════════════════════╗'));
  log(chalk.cyanBright.bold('║            🌐 Web HTML Viewer            ║'));
  log(chalk.cyanBright.bold('╚══════════════════════════════════════════╝'));

  const url = prompt(chalk.yellowBright('🔗 Masukkan URL website target: '));

  if (!url || !url.startsWith('http')) {
    log(chalk.redBright('❌ URL tidak valid. Harus diawali dengan http:// atau https://'));
    return;
  }

  try {
    log(chalk.blueBright(`📡 Mengambil HTML dari: ${chalk.underline(url)}\n`));
    const response = await axios.get(url);
    const html = response.data;

    log(chalk.gray('────────────────────────────────────────────'));
    log(chalk.white(html));
    log(chalk.gray('\n────────────────────────────────────────────'));

    // ⏬ Salin ke clipboard otomatis
    await clipboard.write(html);
    log(chalk.greenBright('\n✅ HTML berhasil ditampilkan & disalin ke clipboard!'));

  } catch (error) {
    log(chalk.redBright('❌ Gagal mengambil HTML:'), chalk.gray(error.message));
  }
}
