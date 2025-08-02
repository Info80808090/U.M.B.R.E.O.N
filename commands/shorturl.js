import chalk from 'chalk';
import promptSync from 'prompt-sync';

const prompt = promptSync();

export default async function () {
  console.clear();
  console.log(chalk.cyanBright('🔗 Shorten URL - TinyURL'));
  console.log(chalk.gray('Masukkan URL panjang untuk diperpendek.\n'));

  const url = prompt(chalk.blue('Masukkan URL: '));

  try {
    console.log(chalk.yellow('\nMemproses...'));
    const apiUrl = `https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`;
    const res = await fetch(apiUrl);
    const shortUrl = await res.text();

    if (shortUrl.startsWith('http')) {
      console.log(chalk.green('\nURL Shortened: ') + chalk.whiteBright(shortUrl));
    } else {
      console.log(chalk.red('❌ Gagal memendekkan URL.'));
    }
  } catch (err) {
    console.log(chalk.red(`❌ Error: ${err.message}`));
  }

  prompt(chalk.gray('\nTekan Enter untuk kembali ke menu...'));
}
