import React from 'react';
import { Card } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectActiveIndex,
    lastActionIndex,
    gotoNextAction,
    rewindToAction,
} from '../../reducers/walkthrough';
import Markdown from './markdown';

const ActionButton = (cardIndex, activeIndex, lastIndex) => {
    const dispatch = useDispatch();
    const style = { padding: '0px' };

    if (cardIndex < activeIndex)
        return (
            <label
                style={style}
                onClick={() =>
                    dispatch(rewindToAction({ targetIndex: cardIndex }))
                }
            >
                Redo
            </label>
        );
    if (cardIndex === activeIndex && cardIndex < lastIndex)
        return (
            <label style={style} onClick={() => dispatch(gotoNextAction())}>
                Done
            </label>
        );
};

const ExpandedWalkthroughCard = ({ title, text, actionIndex, activeIndex, lastIndex }) => {
    return (
        <Card.Body>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    alignItems: 'center',
                    height: '40px',
                }}
            >
                <Card.Subtitle>{title}</Card.Subtitle>
                {ActionButton(actionIndex, activeIndex, lastIndex)}
            </div>
            {<Markdown step={text} />}
        </Card.Body>
    );
};

const CollapsedWalkthroughCard = ({ title, actionIndex, activeIndex, lastIndex }) => {
    return (
        <Card.Body>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    alignItems: 'center',
                    height: '20px',
                    paddingTop: '4px',
                }}
            >
                <Card.Subtitle>{title}</Card.Subtitle>
                {ActionButton(actionIndex, activeIndex, lastIndex)}
            </div>
        </Card.Body>
    );
};

const WalkthroughHeading = ({ title }) => {
    return (
        <Card.Title style={{ paddingTop: '10px', paddingBottom: '10px' }}>
            {title}
        </Card.Title>
    );
};

const WalkthroughCard = ({
    title,
    text,
    expanded,
    actionIndex,
    activeIndex,
    lastIndex,
}) => {
    function getBody() {
        return expanded
            ? ExpandedWalkthroughCard({ title, text, actionIndex, activeIndex, lastIndex })
            : CollapsedWalkthroughCard({ title, actionIndex, activeIndex, lastIndex });
    }

    return (
        <Card
            style={{
                width: '100%',
                boxShadow: '0px 0px 12px 4px rgba(100,100,100, .1)',
                borderStyle: 'none',
                marginBottom: '16px',
            }}
        >
            {getBody()}
        </Card>
    );
};

export const WalkthroughItem = ({ title, text, actionIndex, isHeading }) => {
    let activeIndex = useSelector(selectActiveIndex);
    let lastIndex = lastActionIndex();

    if (isHeading) return WalkthroughHeading({ title });
    return WalkthroughCard({
        title,
        text,
        expanded: activeIndex === actionIndex,
        actionIndex,
        activeIndex,
        lastIndex,
    });
};

export default null;
