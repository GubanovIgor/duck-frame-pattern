import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from '../../src/theme';

export default storyFn => <ThemeProvider theme={theme}>{storyFn()}</ThemeProvider>;
