import { readFileSync, writeFileSync } from 'fs';
import { parse, resolve } from 'path';

const make = function(pathMD) {
	const arrLineRaw = readFileSync(pathMD, 'utf-8').split('\n');

	const arrLineCond = arrLineRaw
		.filter(line => line.startsWith('### '))
		.map(line => line.replace(/(^### |\*\*)/g, ''))
		.map(title => `* [${title}](#${title.replace(/[、/:|[\]]/g, '').replace(/ /g, '-')})`);

	const indexCatalog = arrLineRaw.indexOf('## Catalog:目录');
	const indexLines = arrLineRaw.indexOf('## Lines:台词');

	const arrLineResult = arrLineRaw.filter((line, index) => index <= indexCatalog || index >= indexLines);

	arrLineResult.splice(indexCatalog + 1, 0, ...arrLineCond);

	writeFileSync(resolve(pathMD, '..', `${parse(pathMD).name}.md`), arrLineResult.join('\n'));
	writeFileSync(resolve(pathMD, '..', `${parse(pathMD).name}.bak.md`), arrLineRaw.join('\n'));
};

if(process.argv[2]) { make(process.argv[2]); }