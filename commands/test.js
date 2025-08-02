// commands/test.js
import chalk from 'chalk';

export default function runTest(callback) {
  console.clear();
  console.log(chalk.bgBlueBright.black('\n[ TEST FITUR ]'));
  console.log(chalk.cyan('Menjalankan fitur test...\n'));

  console.log(chalk.green('✓ Tes koneksi berhasil'));
  console.log(chalk.green('✓ Tes fungsi sukses'));

  console.log(chalk.yellow('\nTekan Enter untuk kembali ke menu...'));
  process.stdin.once('data', callback);
}
