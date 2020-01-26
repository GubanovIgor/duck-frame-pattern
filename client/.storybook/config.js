import { configure, addParameters, addDecorator } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

import viewports from './viewports';
import theme from './theme';

// автоматически импортировать все файлы, оканчивающиеся на *.stories.js
const req = require.context('../src', true, /\.stories\.js$/);
function loadStories() { req.keys().forEach(filename => req(filename)) };

addParameters({
	options: {
		theme,
	},
	viewport: {
		viewports: {
			...INITIAL_VIEWPORTS,
			...viewports,
		},
	},
});
configure(loadStories, module);
