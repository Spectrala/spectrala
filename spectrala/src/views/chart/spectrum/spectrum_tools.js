import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import {
    selectRecordedSpectra,
    selectIntensity,
    selectValidateCalibrationPoints,
    recordSpectrum,
} from '../../../reducers/spectrum';
import SpectrumControl from './spectrum_control';
import { cardStyle, cardHeaderStyle } from '../../theme/styles';

export default function SpectrumTools({ height, isCollapsed }) {
    const dispatch = useDispatch();
    const spectra = useSelector(selectRecordedSpectra);
    const intensities = useSelector(selectIntensity);
    const valid = useSelector(selectValidateCalibrationPoints);

    function getSpectraNames() {
        if (!spectra) return <label>No saved spectra.</label>;
        return SpectrumControl(height);
    }

    return (
        <Card style={{ width: '100%', ...cardStyle }}>
            <Card.Header as="h5" style={cardHeaderStyle}>
                Saved Spectra
                <Button
                    disabled={!valid.isValid()}
                    onClick={() => {
                        dispatch(recordSpectrum({ data: intensities }));
                    }}
                >
                    Capture
                </Button>
            </Card.Header>
            {isCollapsed ? null : (
                <div
                    style={{
                        height: height,
                        display: 'flex',
                        justifyContent: 'flex-start',
                        paddingLeft: '0px',
                        paddingRight: '0px',
                    }}
                >
                    {getSpectraNames()}
                </div>
            )}
        </Card>
    );
}

SpectrumTools.propTypes = {
    height: PropTypes.number,
    isCollapsed: PropTypes.bool,
};
