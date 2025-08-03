import chalk from 'chalk';
import boxen from 'boxen';

export default function cekResepGAG() {
  const title = boxen(chalk.greenBright.bold('📋 Resep Grow a Garden Cooking Guide'), {
    padding: 1,
    borderColor: 'green',
    borderStyle: 'round',
  });

  const recipes = [
    {
      nama: 'Soup',
      bahan: 'Carrot (any)',
      waktu: '5:00',
      tier: 'Common',
      rate: '~0.001%',
    },
    {
      nama: 'Salad',
      bahan: '2 × Tomato',
      waktu: '5:18',
      tier: 'Common',
      rate: '~0.002%',
    },
    {
      nama: 'Ice Cream',
      bahan: 'Corn + Blueberry / Pineapple',
      waktu: '5:48',
      tier: 'Uncommon',
      rate: '~0.015%',
    },
    {
      nama: 'Waffle',
      bahan: 'Pumpkin + Watermelon / Sugar Apple',
      waktu: '6:15',
      tier: 'Uncommon',
      rate: '~0.025%',
    },
    {
      nama: 'Burger',
      bahan: 'Pepper + Corn + Tomato',
      waktu: '6:07',
      tier: 'Rare',
      rate: '~0.045%',
    },
    {
      nama: 'Hotdog',
      bahan: 'Pepper + Corn / Banana',
      waktu: '6:46',
      tier: 'Rare',
      rate: '~0.035%',
    },
    {
      nama: 'Sandwich',
      bahan: '2 × Tomato + Corn',
      waktu: '7:06',
      tier: 'Rare',
      rate: '~0.055%',
    },
    {
      nama: 'Pie',
      bahan: 'Pumpkin + Apple / Corn + Coconut',
      waktu: '7:52',
      tier: 'Legendary',
      rate: '~0.125%',
    },
    {
      nama: 'Sushi',
      bahan: '4 × Bamboo + Corn',
      waktu: '8:30',
      tier: 'Mythical',
      rate: '~0.275%',
    },
    {
      nama: 'Cake',
      bahan: '2 × Corn + Watermelon',
      waktu: '8:45',
      tier: 'Mythical',
      rate: '~0.245%',
    },
    {
      nama: 'Donut',
      bahan: 'Corn + Blueberry + Strawberry / Strawberry + Tomato + Apple',
      waktu: '9:37',
      tier: 'Divine',
      rate: '~0.450%',
    },
    {
      nama: 'Pizza',
      bahan: 'Corn + Tomato + Pepper',
      waktu: '9:15',
      tier: 'Prismatic',
      rate: '~0.825%',
    },
  ];

  console.log(title);
  recipes.forEach((r, i) => {
    console.log(
      chalk.yellow.bold(`${i + 1}. ${r.nama}`) +
        chalk.gray(` | ${r.tier}`) +
        '\n' +
        chalk.white(`   Bahan: `) + chalk.cyan(r.bahan) +
        '\n' +
        chalk.white(`   Waktu: `) + chalk.magenta(r.waktu) +
        '\n' +
        chalk.white(`   Rate:  `) + chalk.green(r.rate) +
        '\n'
    );
  });

  console.log(
    chalk.gray('\nSumber: ') + chalk.underline.blue('https://growagardenvalue.com/recipes')
  );
}
