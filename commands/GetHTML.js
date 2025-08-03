import inquirer from 'inquirer';
import chalk from 'chalk';
import axios from 'axios';

const url = 'https://gagstock.gleeze.com/grow-a-garden';

const kategoriMap = {
  'Seed': 'seed',
  'Gear': 'gear',
  'Egg': 'pet',
  'Cosmetic': 'cosmetic'
};

const tampilkanStok = async (kategori) => {
  try {
    const { data } = await axios.get(url);
    const kategoriKey = kategoriMap[kategori];

    if (!data[kategoriKey] || data[kategoriKey].length === 0) {
      console.log(chalk.red(`❌ Tidak ditemukan stok untuk kategori ${kategori}.`));
      return;
    }

    console.log(chalk.greenBright(`\n📦 Daftar Stok ${kategori}:\n`));
    data[kategoriKey].forEach((item, index) => {
      console.log(chalk.yellow(`${index + 1}. ${item}`));
    });
    console.log();
  } catch (err) {
    console.log(chalk.red('❌ Gagal mengambil data stok:', err.message));
  }
};

export default async function cekStok() {
  console.clear();
  console.log(chalk.blueBright.bold('💠 CEK STOK GROW A GARDEN 💠\n'));

  const { kategori } = await inquirer.prompt([
    {
      type: 'list',
      name: 'kategori',
      message: 'Pilih kategori yang ingin dicek:',
      choices: Object.keys(kategoriMap).concat(['Kembali']),
    }
  ]);

  if (kategori === 'Kembali') return;

  await tampilkanStok(kategori);

  const { kembali } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'kembali',
      message: 'Ingin cek kategori lain?',
      default: true
    }
  ]);

  if (kembali) {
    await cekStok(); // rekursif
  }
}
