import axios from 'axios';
import promptSync from 'prompt-sync';
import chalk from 'chalk';
import boxen from 'boxen';

const prompt = promptSync();
const categories = ['seed', 'gear', 'egg', 'cosmetics'];

export default async function cekStok() {
  console.clear();
  console.log(boxen(
    chalk.bold.rgb(100, 255, 100)('STOK GROW A GARDEN'),
    {
      padding: 1,
      borderColor: 'green',
      borderStyle: 'round',
      title: chalk.green.bold('Stok Checker'),
      titleAlignment: 'center'
    }
  ));

  console.log(chalk.blueBright.bold('\nPilihan Kategori:\n'));
  categories.forEach((c, i) => {
    console.log(
      chalk.yellowBright(`${i + 1}.`) +
      chalk.white(` ${c.charAt(0).toUpperCase() + c.slice(1)}`)
    );
  });

  const sel = prompt(chalk.whiteBright('\n❓ Pilih kategori [1‑4]: '));
  const idx = Number(sel) - 1;

  if (![0, 1, 2, 3].includes(idx)) {
    console.log(chalk.bgRed.whiteBright('\n❌ Pilihan tidak valid!\n'));
    return;
  }

  console.log(chalk.gray('\nMengambil data stok terbaru...\n'));

  try {
    const res = await axios.get('https://gagstock.gleeze.com/grow-a-garden');
    const body = res.data;
    if (body.status !== 'success' || !body.data[categories[idx]]) {
      throw new Error('Format data tidak sesuai');
    }

    const cat = body.data[categories[idx]];

    console.log(boxen(
      chalk.greenBright.bold(`{categories[idx].toUpperCase()} STOCK`) +
      chalk.white(`\nUpdate: ${new Date(body.updated_at).toLocaleTimeString()}`),
      {
        padding: 1,
        borderColor: 'green',
        borderStyle: 'round',
        title: chalk.green.bold('Stock Info'),
        titleAlignment: 'center'
      }
    ));

    cat.items.forEach((item, i) => {
      const emoji = item.emoji ? `${item.emoji} ` : '';
      console.log('\n')
      console.log(
        chalk.cyanBright(`${i + 1}. ${item.name}`) +
        chalk.white(` — x${item.quantity}`)
      );
    });

    console.log(chalk.gray(`\nRestock In: ${cat.countdown}`));
    console.log(chalk.gray(`Sumber: gagstock.gleeze.com\n`));
  } catch (err) {
    console.log(chalk.bgRed.whiteBright('❌ Gagal mengambil data stok:'), chalk.gray(err.message));
  }
}
