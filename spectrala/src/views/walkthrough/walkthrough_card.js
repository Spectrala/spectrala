import React from 'react';
import { Card, Button } from 'react-bootstrap';

const ExpandedWalkthroughCard = ({ title, text }) => {
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
                <label
                    variant="link"
                    disabled={false}
                    style={{ padding: '0px' }}
                    onClick={() => console.log('Pressed the card link')}
                >
                    Done
                </label>
            </div>
            <Card.Text>{text}</Card.Text>
        </Card.Body>
    );
};

const CollapsedWalkthroughCard = ({ title }) => {
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
                <Card.Subtitle style={{ fontWeight: 'black' }}>
                    {title}
                </Card.Subtitle>
                <label
                    variant="link"
                    disabled={false}
                    onClick={() => console.log('Pressed the card link')}
                >
                    Done
                </label>
            </div>
        </Card.Body>
    );
};

const WalkthroughHeading = ({ title }) => {
    return (
        <Card.Title style={{ paddingTop: '16px', paddingBottom: '16px' }}>
            {title}
        </Card.Title>
    );
};

const WalkthroughCard = ({ title, text, expanded }) => {
    function getBody() {
        return expanded
            ? ExpandedWalkthroughCard({ title, text })
            : CollapsedWalkthroughCard({ title });
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

export const WalkthroughItem = ({ title, text, expanded, isHeading }) => {
    if (isHeading) return WalkthroughHeading({ title });
    return WalkthroughCard({ title, text, expanded });
};

export default null;
