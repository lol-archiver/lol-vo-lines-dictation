import { readFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

import js from '@eslint/js';
import globals from 'globals';



const PKG = JSON.parse(readFileSync(resolve(dirname(fileURLToPath(import.meta.url)), 'package.json'), 'utf8'));

/** @type {string[]} */
const typesSource = PKG.typesSource instanceof Array ? PKG.typesSource : [];


const rulesBase = {
	...js.configs.recommended.rules,

	indent: [1, 'tab', { ignoreComments: true, SwitchCase: 1 }],
	linebreakStyle: [1],
	quotes: [1, 'single', { allowTemplateLiterals: true }],
	semi: [1],
	noUnusedVars: [1, { vars: 'all', args: 'none' }],
	noVar: [1],
	noConsole: [1],
	requireAtomicUpdates: [1, { allowProperties: true }],
};




/** @type {import('eslint').Linter.FlatConfig[]} */
const configs = [
	{ ignores: ['dist/**/*.js'] },
	{
		files: ['eslint.config.js'],
		languageOptions: { globals: globals.node },
		rules: rulesBase,
	},
];


if(!typesSource.length) { configs.push({ rules: rulesBase }); }


if(typesSource.includes('node') && typesSource.includes('browser')) {
	configs.push({
		files: ['**/*.js'],
		ignores: [
			'eslint.config.js',
			'**/*.pure.js',
			'src/**/*.js',
			'!src/**/*.{api,lib,map}.js',
			'!src/**/*.lib/**/*.js'
		],
		languageOptions: {
			globals: globals.node,
		},
		rules: rulesBase,
	});

	configs.push({
		files: ['src/**/*.js'],
		ignores: [
			'**/*.pure.js',
			'src/**/*.{api,lib,map}.js',
			'src/**/*.lib/**/*.js'
		],
		languageOptions: {
			globals: globals.browser,
		},
		rules: rulesBase,
	});

	configs.push({
		files: ['**/*.pure.js'],
		rules: rulesBase,
	});
}
else if(typesSource.includes('node')) {
	configs.push({
		files: ['**/*.js'],
		ignores: [
			'eslint.config.js'
		],
		languageOptions: {
			globals: globals.node,
		},
		rules: rulesBase,
	});
}
else if(typesSource.includes('browser')) {
	configs.push({
		files: ['**/*.js'],
		ignores: [
			'eslint.config.js'
		],
		languageOptions: {
			globals: globals.browser,
		},
		rules: rulesBase,
	});
}


// browser with vue
if(typesSource.includes('vue')) {
	const vue = (await import('eslint-plugin-vue')).default;

	configs.push({
		files: ['src/**/*.vue'],
		languageOptions: {
			globals: globals.browser,
			parser: (await import('vue-eslint-parser')).default
		},
		plugins: { vue },
		processor: vue.processors['.vue'],
		rules: {
			...rulesBase,

			...vue.configs.base.rules,
			...vue.configs['vue3-essential'].rules,
			...vue.configs['vue3-strongly-recommended'].rules,
			...vue.configs['vue3-recommended'].rules,

			indent: [0],
			'vue/htmlIndent': [2, 'tab'],
			'vue/scriptIndent': [2, 'tab', { baseIndent: 1 }],
			'vue/maxAttributesPerLine': [0],
			'vue/mustacheInterpolationSpacing': [0],
			'vue/singlelineHtmlElementContentNewline': [0],
			'vue/noVHtml': [0],
			'vue/requireVForKey': [0],
			'vue/htmlSelfClosing': [1, { html: { void: 'always' } }],
			'vue/firstAttributeLinebreak': [0],
			'vue/multiWordComponentNames': [0],
		},
	});
}


if(typesSource.includes('vite')) {
	configs.push({
		files: ['**/vite.config.js'],
		languageOptions: {
			globals: globals.node,
		},
		rules: rulesBase,
	});
}


const convertKey = (raw, target) => {
	const key = raw.split(/(?=[A-Z])/).join('-').toLowerCase();

	if(key != raw) { target[key] = target[raw]; delete target[raw]; }
};
const convertKeys = config => (config.rules && Object.keys(config.rules).forEach(key => convertKey(key, config.rules)), config);

configs.forEach(config => convertKeys(config));



export default configs;
