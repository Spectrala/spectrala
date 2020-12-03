import React from 'react';
import {
    Card,
} from 'react-bootstrap';
import PropTypes from 'prop-types';


export default function ResultantSpectrumTools({ height }) {

    return (
        <Card style={{ width: '100%' }}>
            <Card.Header
                as="h5"
                style={{
                    height: '64px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingLeft: '15px',
                    paddingRight: '15px',
                }}
            >
                Saved Results
            </Card.Header>
            <div
                style={{
                    height: height,
                    display: 'flex',
                    justifyContent: 'flex-start',
                    paddingLeft: '15px',
                    paddingRight: '15px',
                }}
            >
                <label>This should be about the last thing</label>
            </div>
        </Card>
    );
}

ResultantSpectrumTools.propTypes = {
    height: PropTypes.number,
};