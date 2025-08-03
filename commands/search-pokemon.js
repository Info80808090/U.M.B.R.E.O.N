// commands/cekpokemon.js
import chalk from 'chalk';
import fetch from 'node-fetch';
import promptSync from 'prompt-sync';

const prompt = promptSync();

export default async function cekPokemon() {
  console.clear();
  const input = prompt(chalk.blue('Masukkan nama atau ID Pokémon: ')).trim().toLowerCase();

  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${input}`);
    if (!res.ok) throw new Error('Pokémon tidak ditemukan.');
    const data = await res.json();

    const speciesRes = await fetch(data.species.url);
    const species = await speciesRes.json();

    const evoRes = await fetch(species.evolution_chain.url);
    const evoData = await evoRes.json();

    const types = data.types.map(t => t.type.name).join(', ');
    const height = `${data.height / 10} m`;
    const weight = `${data.weight / 10} kg`;
    const baseExp = data.base_experience;

    let genderRatio = 'Genderless';
    if (species.gender_rate >= 0) {
      const female = (species.gender_rate / 8 * 100).toFixed(1);
      const male = (100 - female).toFixed(1);
      genderRatio = `♂️ ${male}%  ♀️ ${female}%`;
    }

    const abilities = data.abilities.map(a =>
      `${a.ability.name}${a.is_hidden ? ' (Hidden)' : ''}`
    ).join(', ');

    let totalStats = 0;
    const statsDisplay = data.stats.map(stat => {
      totalStats += stat.base_stat;
      return `  ${stat.stat.name.padEnd(15)}: ${stat.base_stat}`;
    }).join('\n');

    const warna = species.color?.name || '-';
    const habitat = species.habitat?.name || '-';
    const generation = species.generation?.name.replace('generation-', '') || '-';
    const eggGroups = species.egg_groups.map(g => g.name).join(', ');
    const hatchSteps = 255 * (species.hatch_counter + 1);

    const evolusi = [];
    function ambilEvolusi(chain) {
      evolusi.push(chain.species.name);
      if (chain.evolves_to.length > 0) {
        chain.evolves_to.forEach(ambilEvolusi);
      }
    }
    ambilEvolusi(evoData.chain);
    const evoDisplay = evolusi.join(' → ');

    const typeInfoRes = await fetch(data.types[0].type.url);
    const typeInfo = await typeInfoRes.json();
    const weaknesses = typeInfo.damage_relations.double_damage_from.map(t => t.name).join(', ') || '-';
    const resistances = typeInfo.damage_relations.half_damage_from.map(t => t.name).join(', ') || '-';

    const img = data.sprites.other['official-artwork'].front_default;

    // 🆕 Deskripsi (ciri khas Pokémon)
    const flavor = species.flavor_text_entries.find(f =>
      f.language.name === 'en' && f.version.name === 'sword'
    )?.flavor_text.replace(/\f|\n/g, ' ') || 'Deskripsi tidak tersedia.';

    // 🆕 Moveset (daftar jurus)
    const moves = data.moves.map(m => {
      const learnedBy = m.version_group_details[0];
      return {
        name: m.move.name,
        method: learnedBy?.move_learn_method.name || '-',
        level: learnedBy?.level_learned_at || 0
      };
    });

    const limitedMoves = moves.slice(0, 15).map(m =>
      `  - ${m.name} [${m.method}${m.level ? ` @${m.level}` : ''}]`
    ).join('\n');

    // Tampilkan hasil
    console.clear();
    console.log(chalk.bgGreen.black(`\n[ ${data.name.toUpperCase()} ]`));
    console.log(`${chalk.cyan('ID Pokédex')}: ${data.id}`);
    console.log(`${chalk.cyan('Nama')}: ${data.name}`);
    console.log(`${chalk.cyan('Region')}: ${generation.toUpperCase()}`);
    console.log(`${chalk.cyan('Tipe')}: ${types}`);
    console.log(`${chalk.cyan('Tinggi')}: ${height}`);
    console.log(`${chalk.cyan('Berat')}: ${weight}`);
    console.log(`${chalk.cyan('Base EXP')}: ${baseExp}`);
    console.log(`${chalk.cyan('Abilities')}: ${abilities}`);
    console.log(`${chalk.cyan('Warna')}: ${warna}`);
    console.log(`${chalk.cyan('Habitat')}: ${habitat}`);
    console.log(`${chalk.cyan('Gender Ratio')}: ${genderRatio}`);
    console.log(`${chalk.cyan('Egg Groups')}: ${eggGroups}`);
    console.log(`${chalk.cyan('Langkah Menetas')}: ~${hatchSteps} langkah`);
    console.log(`${chalk.cyan('Evolusi')}: ${evoDisplay}`);
    console.log(`${chalk.cyan('Weakness')}: ${weaknesses}`);
    console.log(`${chalk.cyan('Resistance')}: ${resistances}`);

    console.log(chalk.cyan('\nBase Stats:'));
    console.log(statsDisplay);
    console.log(`  ${chalk.yellow('Total'.padEnd(15))}: ${totalStats}`);

    console.log(chalk.cyan('\nCiri Khas (Pokédex Entry):'));
    console.log(`  "${chalk.gray(flavor)}"`);

    console.log(chalk.cyan('\nContoh Moveset:'));
    console.log(limitedMoves || '  - Tidak tersedia');

    console.log(`${chalk.cyan('\nGambar')}: ${img}`);

  } catch (err) {
    console.log(chalk.red(`\n❌ Gagal: ${err.message}`));
  }

  prompt(chalk.yellow('\nTekan Enter untuk kembali ke menu...'));
}
