import inquirer from 'inquirer';
import chalk from 'chalk';
import figlet from 'figlet';
import fs from 'fs';
import path from 'path';
import ora from 'ora';
import tinygradient from 'tinygradient';

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

const loadingSteps = [
  '🔌 Menghubungkan ke server U.M.B.R.E.O.N Network...',
  '📡 Autentikasi koneksi...',
  '🔌 Menghubungkan ke server Glaceeons_ Network...',
  '🧠 Memuat fitur...',
  '📦 Mengekstrak komponen internal...',
  '📁 Sinkronisasi direktori /commands...',
  '⚙️ Menyiapkan environment Termux / Windows...',
  '🌀 Menginisialisasi Engine...'
];

const printTitle = async () => {
  console.clear();

  const asciiTitle = figlet.textSync('U.M.B.R.E.O.N', {
    font: 'Standard',
    horizontalLayout: 'default',
  });

  const lines = asciiTitle.split('\n');
  const maxX = Math.max(...lines.map(line => line.length));
  const maxY = lines.length;

  const gradient = tinygradient([
    '#ff4b1f', '#ff9068', '#ffde7d',
    '#9ae66e', '#17ead9', '#6078ea', '#8e54e9'
  ]);

  for (let y = 0; y < maxY; y++) {
    let row = '';
    for (let x = 0; x < maxX; x++) {
      const char = lines[y][x] || ' ';
      const ratio = (x + (maxY - y)) / (maxX + maxY); // diagonal kiri bawah → kanan atas
      const color = gradient.rgbAt(ratio).toHexString();
      row += chalk.hex(color)(char);
    }
    console.log(row);
  }

  console.log(chalk.cyan.bold('\n🛠️  U.M.B.R.E.O.N Tools  🛠️\n'));
  await sleep(10000); // jeda 10 detik
};

const runLoading = async () => {
  for (const step of loadingSteps) {
    const spinner = ora(step).start();
    await sleep(3000);
    spinner.succeed();
  }
};

const loadCommands = () => {
  const dir = './commands';
  const files = fs.readdirSync(dir).filter(file => file.endsWith('.js'));
  return files.map(file => ({
    name: path.parse(file).name,
    path: path.resolve(dir, file)
  }));
};

const showMenu = async () => {
  console.log(chalk.yellow.bold("List Fitur :\n"))
  const commandList = loadCommands();
  const menuOptions = commandList.map((cmd, index) => ({
    name: chalk.cyanBright(`${index + 1}. `) + chalk.white(cmd.name),
    value: cmd.path,
    short: cmd.name
  }));

  menuOptions.unshift({
    name: chalk.redBright('0. Exit'),
    value: 'exit',
    short: 'Keluar'
  });

  const { selected } = await inquirer.prompt([
    {
      type: 'list',
      name: 'selected',
      message: chalk.gray('\n>'),
      choices: menuOptions,
      pageSize: 15
    }
  ]);

  if (selected === 'exit') {
    console.log(chalk.green('\n👋 Terima kasih telah menggunakan U.M.B.R.E.O.N Tools.'));
    process.exit(0);
  }

  const selectedCommand = commandList.find(cmd => cmd.path === selected);

  console.log(`\nMenjalankan fitur ${chalk.cyan(selectedCommand.name)}...\n`);
  try {
    const mod = await import(`file://${selectedCommand.path}`);
    if (typeof mod.default === 'function') {
      await mod.default();
    } else {
      console.log(chalk.red('❌ File tidak memiliki default function.'));
    }
  } catch (err) {
    console.error(chalk.red(`❌ Gagal menjalankan fitur: ${err.message}`));
  }

  console.log(chalk.yellow('\nTekan ENTER untuk kembali ke menu utama...'));
  await inquirer.prompt([{ name: 'pause', type: 'input', message: '' }]);
};

const menuLoop = async () => {
  while (true) {
    await showMenu();
  }
};

const main = async () => {
  await printTitle();
  await runLoading();
  await menuLoop();
};

main();
