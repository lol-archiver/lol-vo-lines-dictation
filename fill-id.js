import { readFileSync, writeFileSync } from 'node:fs';
import { parse, resolve } from 'node:path';



const dirWorking = process.cwd();
const { fileDatabase } = JSON.parse(readFileSync(resolve(dirWorking, 'config', 'config.path.json'), 'utf8'));
const db = JSON.parse(readFileSync(fileDatabase, 'utf8'));

const champions = Object.values(db);


/** @param {string} fileMarkdown */
const fill = fileMarkdown => {
	const lines = readFileSync(fileMarkdown, 'utf-8').split('\n');
	writeFileSync(resolve(fileMarkdown, '..', `${parse(fileMarkdown).name}.bak.md`), lines.join('\n'));


	for(let index = 0; index < lines.length; index++) {
		const line = lines[index];

		if(!/target:-/.test(line)) { continue; }

		const [,slot] = line.match(/target:-(.*?),/);

		const champion = champions.find(champion => champion.slot.toLowerCase() == slot);
		if(!champion) { continue; }

		lines[index] = line.replace(`target:-${slot}`, `target:${String(champion.id)?.padStart(3, '0')}-${slot}`);
	}

	writeFileSync(resolve(fileMarkdown, '..', `${parse(fileMarkdown).name}.md`), lines.join('\n'));
};



if(process.argv[2]) { fill(process.argv[2]); }
