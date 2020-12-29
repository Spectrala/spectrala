/**
 * These are colors meant to be defined only once.
 * Interface elements get their color instructions from theme.js,
 * and theme.js gets its colors from colors.js.
 * */

const lightMode = {
    BRAND: '#f4f2f0',
    ACCENT: '#7f95d1',
    BACKGROUND: '#ffffff',
    FOREGROUND_1: '#F7F7F7',
    FOREGROUND_2: '#EDF2F7',
    RIM: '#33312e',
};

// const darkMode = {
//     BRAND: '#ff6e1e',
//     ACCENT: '#7f95d1',
//     BACKGROUND: '#2B2927',
//     FOREGROUND_1: '#605C57',
//     FOREGROUND_2: '#33312e',
//     RIM: '#eaf2ef',
// };

const universal = {
    LOW_ENERGY: '#4758eb',
    HIGH_ENERGY: '#d75b5b',
    WHITE: '#ffffff',
    NONE: '#00000000',
};

// TODO: Export whatever one is selected from a settings reducer.
const colors = { ...lightMode, ...universal };
export default colors;
