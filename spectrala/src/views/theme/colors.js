/**
 * These are colors meant to be defined only once.
 * Interface elements get their color instructions from theme.js,
 * and theme.js gets its colors from colors.js.
 * */

const lightMode = {
    BRAND: '#ff6e1e',
    ACCENT: '#7f95d1',
    BACKGROUND: '#eaf2ef',
    FOREGROUND_1: '#fbf2ff',
    FOREGROUND_2: '#ffebff',
    RIM: '#33312e',
};

const darkMode = {
    BRAND: '#ff6e1e',
    ACCENT: '#7f95d1',
    BACKGROUND: '#33312e',
    FOREGROUND_1: '#fbf2ff',
    FOREGROUND_2: '#ffebff',
    RIM: '#eaf2ef',
};

const universal = {
    LOW_ENERGY: '#4758eb',
    HIGH_ENERGY: '#d75b5b',
    WHITE: '#ffffff',
    NONE: '#00000000'
};

// TODO: Export whatever one is selected from a settings reducer.
const colors = { ...lightMode, ...universal };
export default colors;
