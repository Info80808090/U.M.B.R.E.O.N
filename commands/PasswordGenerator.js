const prompt = require('prompt-sync')();
const chalk = require('chalk');

function generatePassword(length, useUpper, useLower, useNumbers, useSymbols) {
  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lower = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()-_=+[]{}|;:,.<>?';

  let charset = '';
  if (useUpper) charset += upper;
  if (useLower) charset += lower;
  if (useNumbers) charset += numbers;
  if (useSymbols) charset += symbols;

  if (!charset) {
    console.log(chalk.red('❌ Tidak ada karakter yang dipilih untuk password.'));
    return null;
  }

  let password = '';
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }

  return password;
}

module.exports = () => {
  console.clear();
  console.log(chalk.bold.blue('🔐 Password Generator'));

  const length = parseInt(prompt('Masukkan panjang password: '));
  const useUpper = prompt('Gunakan huruf besar? (y/n): ').toLowerCase() === 'y';
  const useLower = prompt('Gunakan huruf kecil? (y/n): ').toLowerCase() === 'y';
  const useNumbers = prompt('Gunakan angka? (y/n): ').toLowerCase() === 'y';
  const useSymbols = prompt('Gunakan simbol? (y/n): ').toLowerCase() === 'y';

  const password = generatePassword(length, useUpper, useLower, useNumbers, useSymbols);

  if (password) {
    console.log(chalk.green('\n✅ Password berhasil dibuat:'));
    console.log(chalk.yellowBright.bold(password));
  }
};
