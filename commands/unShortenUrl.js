import chalk from 'chalk';
import promptSync from 'prompt-sync';
import unshorten from 'unshorten';

const prompt = promptSync();

export default async function () {
  console.clear();
  console.log(chalk.cyanBright('🔎 Unshorten URL (Multi-layanan)'));
  console.log(chalk.gray('Masukkan URL pendek dari TinyURL, Bitly, dll.\n'));

  const url = prompt(chalk.blue('Masukkan URL pendek: '));

  try {
    console.log(chalk.yellow('\n⏳ Mendeteksi...'));
    const realUrl = await unshorten(url);
    if (realUrl) {
      console.log(chalk.green('\n✅ URL Asli: ') + chalk.whiteBright(realUrl));
    } else {
      console.log(chalk.red('❌ Gagal mendeteksi URL asli.'));
    }
  } catch (err) {
    console.log(chalk.red(`❌ Error: ${err.message}`));
  }

  prompt(chalk.gray('\nTekan Enter untuk kembali ke menu...'));
}
