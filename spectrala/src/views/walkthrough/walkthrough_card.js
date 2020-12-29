import React from 'react';
import { Card } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectActiveIndex,
    gotoNextAction,
    rewindToAction,
} from '../../reducers/walkthrough';
import Markdown from './markdown';

const ActionButton = (actionIndex, activeIndex) => {
    const dispatch = useDispatch();
    const style = { padding: '0px' };

    if (actionIndex < activeIndex)
        return (
            <label
                style={style}
                onClick={() =>
                    dispatch(rewindToAction({ targetIndex: actionIndex }))
                }
            >
                Redo
            </label>
        );
    if (actionIndex === activeIndex)
        return (
            <label style={style} onClick={() => dispatch(gotoNextAction())}>
                Done
            </label>
        );
};

const ExpandedWalkthroughCard = ({ title, text, actionIndex, activeIndex }) => {
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
                {ActionButton(actionIndex, activeIndex)}
            </div>
            {<Markdown step={text} />}
        </Card.Body>
    );
};

const CollapsedWalkthroughCard = ({ title, actionIndex, activeIndex }) => {
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
                {ActionButton(actionIndex, activeIndex)}
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
}) => {
    function getBody() {
        return expanded
            ? ExpandedWalkthroughCard({ title, text, actionIndex, activeIndex })
            : CollapsedWalkthroughCard({ title, actionIndex, activeIndex });
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

    if (!!isHeading) return WalkthroughHeading({ title });
    return WalkthroughCard({
        title,
        text,
        expanded: activeIndex === actionIndex,
        actionIndex,
        activeIndex,
    });
};

export default null;
