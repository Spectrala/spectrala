const lightMode = {
    BRAND: '#ff6e1e',
    ACCENT: '#7f95d1',
    BACKGROUND: '#eaf2ef',
    COMPLEMENT: '#FFFFFF',
    RIM: '#33312e',
};

const darkMode = {
    BRAND: '#ff6e1e',
    ACCENT: '#7f95d1',
    BACKGROUND: '#33312e',
    COMPLEMENT: '#232323',
    RIM: '#eaf2ef',
};

const universal = {
    LOW_ENERGY: '#440099',
    HIGH_ENERGY: '#BA0C2F',
};

// TODO: Export whatever one is selected from a settings reducer.
const theme = {...lightMode, ...universal};
export default theme;
