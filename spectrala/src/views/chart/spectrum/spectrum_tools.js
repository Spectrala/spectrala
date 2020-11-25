import React from 'react';
import {
    Card,
} from 'react-bootstrap';
import PropTypes from 'prop-types';


export default function SpectrumTools({ height, maximumPoints }) {

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
                Spectrum Tools
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
                <label>Some tools for working with spectra</label>
            </div>
        </Card>
    );
}

SpectrumTools.propTypes = {
    height: PropTypes.number,
};
