/**
 * This file takes themes from theme.js and builds styles meant to be placed inside all components.
 */
import theme from './theme';

export const cardHeaderStyle = {
    backgroundColor: theme.CARD_HEADER,
    background: theme.CARD_HEADER,
    borderWidth: theme.BORDER_WIDTH,
    borderRadius: theme.BORDER_RADIUS,


    paddingLeft: theme.CARD_HEADER_PADDING,
    paddingRight: theme.CARD_HEADER_PADDING,
    justifyContent: 'space-between',
};

export const cardStyle = {
    backgroundColor: theme.CARD_BODY,
    borderWidth: theme.BORDER_WIDTH,
    borderRadius: theme.BORDER_RADIUS,
};
