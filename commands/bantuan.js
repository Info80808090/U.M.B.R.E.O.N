import chalk from 'chalk';
import promptSync from 'prompt-sync';

const prompt = promptSync();

export default function bantuan() {
  console.clear();
  console.log(chalk.bgMagenta.black('\n=== BANTUAN ===\n'));
  console.log(`Gunakan menu berikut untuk mengeksekusi fitur:
- ${chalk.green('cekpokemon')}: Cari data lengkap tentang Pokémon
- ${chalk.green('bantuan')}: Menampilkan bantuan ini`);

  prompt(chalk.yellow('\nTekan Enter untuk kembali ke menu...'));
}
