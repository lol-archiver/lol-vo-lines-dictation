import { readFileSync, writeFileSync } from 'fs';
import { parse, resolve } from 'path';



/** @param {string} fileMarkdown */
const make = fileMarkdown => {
	const linesRaw = readFileSync(fileMarkdown, 'utf-8').split('\n');

	const linesCatalog = linesRaw
		.filter(line => line.startsWith('### '))
		.map(line => line.replace(/(^### |\*\*)/g, ''))
		.map(title => `* [${title}](#${title.replace(/[、/:|[\]<>]/g, '').replace(/ /g, '-')})`);

	const indexCatalog = linesRaw.indexOf('## Catalog:目录');
	const indexLineHeader = linesRaw.indexOf('## Lines:台词');


	const linesResult = linesRaw.filter((line, index) => index <= indexCatalog || index >= indexLineHeader);

	linesResult.splice(indexCatalog + 1, 0, ...linesCatalog);

	writeFileSync(resolve(fileMarkdown, '..', `${parse(fileMarkdown).name}.md`), linesResult.join('\n'));
	writeFileSync(resolve(fileMarkdown, '..', `${parse(fileMarkdown).name}.bak.md`), linesRaw.join('\n'));
};



if(process.argv[2]) { make(process.argv[2]); }
