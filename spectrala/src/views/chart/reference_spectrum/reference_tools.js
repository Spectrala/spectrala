import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import {
    record_reference,
    selectRecordedReferences,
    selectValidateLiveReferenceSpectrum,
    selectValidateCalibrationPoints,
} from '../../../reducers/reference_spectrum';
import ReferencePointsControl from './reference_points_control';
export default function ReferenceSpectrumTools({ height, isCollapsed }) {
    const dispatch = useDispatch();
    const spectra = useSelector(selectRecordedReferences);
    const currentSpectrum = useSelector(selectValidateLiveReferenceSpectrum);
    const valid = useSelector(selectValidateCalibrationPoints);

    function getSpectraNames() {
        if (!spectra) return <label>No saved reference spectra.</label>;
        return ReferencePointsControl(height);
    }

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
                Saved References
                <Button
                    disabled={!valid.isValid()}
                    onClick={() => {
                        dispatch(
                            record_reference({
                                data: currentSpectrum,
                            })
                        );
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

ReferenceSpectrumTools.propTypes = {
    height: PropTypes.number,
    isCollapsed: PropTypes.bool,
};
