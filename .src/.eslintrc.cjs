const runcom = {
	env: {
		es2020: true,
		node: true,
	},
	extends: [
		'eslint:recommended'
	],
	parserOptions: {
		sourceType: 'script'
	},
	rules: {
		indent: [2, 'tab', { ignoreComments: true, SwitchCase: 1 }],
		linebreakStyle: [2, 'unix'],
		quotes: [2, 'single', { allowTemplateLiterals: true }],
		semi: [2, 'always'],
		noUnusedVars: [1, { vars: 'all', args: 'after-used' }],
		noConsole: [2],
		noVar: [2],
		quoteProps: [2, 'as-needed'],
		requireAtomicUpdates: [0]
	}
};

for(const key in runcom.rules) {
	const keyCamel = key.split(/(?=[A-Z])/).join('-').toLowerCase();
	if(keyCamel != key) {
		runcom.rules[keyCamel] = runcom.rules[key];

		delete runcom.rules[key];
	}
}

module.exports = runcom;