import chalk from 'chalk';
import inquirer from 'inquirer';

const developers = [
  {
    name: 'Kachi-Kyoshiki',
    discord: 'always_kachi',
    whatsapp: 'N/a',
    github: 'hhttps://github.com/Info80808090/',
  },
  {
    name: 'Glace Byte',
    discord: 'glacebyte',
    whatsapp: 'N/a',
    github: 'N/a',
  },
];

export default async function credits() {
  console.clear();
  console.log(chalk.magentaBright.bold('╔══════════════════════════════════════════════╗'));
  console.log(chalk.magentaBright.bold('║              👑 Developer Credits            ║'));
  console.log(chalk.magentaBright.bold('╚══════════════════════════════════════════════╝\n'));

  developers.forEach((dev, i) => {
    console.log(chalk.green.bold(`👤 Developer ${i + 1}: ${dev.name}`));
    console.log(`   Discord : ${chalk.cyan(dev.discord)}`);
    console.log(`   WhatsApp: ${chalk.cyan(dev.whatsapp)}`);
    console.log(`   GitHub  : ${chalk.cyan(dev.github)}\n`);
  });

  await inquirer.prompt([
    {
      type: 'input',
      name: 'back',
      message: chalk.yellow('🔁 Tekan ENTER untuk kembali ke menu utama...'),
    }
  ]);
}
