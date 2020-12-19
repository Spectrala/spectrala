/**
 * This file takes themes from theme.js and builds styles meant to be placed inside all components.
 */
import theme from './theme';

export const cardHeaderStyle = {
    backgroundColor: theme.CARD_HEADER,
    background: theme.CARD_HEADER,

    paddingLeft: theme.CARD_HEADER_PADDING,
    paddingRight: theme.CARD_HEADER_PADDING,
    justifyContent: 'space-between',
    minHeight: theme.VERTICAL_BAR_HEIGHT,
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
};

export const cardStyle = {
    backgroundColor: theme.CARD_BODY,
    borderWidth: theme.BORDER_WIDTH,
    borderRadius: theme.BORDER_RADIUS,
    display: 'flex',
};

export const containerStyle = {
    backgroundColor: theme.CONTAINER_BACKGROUND,
};

export const navBody = {
    backgroundColor: theme.NAV,
    height: theme.VERTICAL_BAR_HEIGHT,
};

export const secondaryButton = {
    backgroundColor: theme.CONTAINER_BACKGROUND,
};
export const dropdown = {
    backgroundColor: theme.CONTAINER_BACKGROUND,
};

export const activeNavItem = {
    backgroundColor: "#fff",
    height: '100%'
};
