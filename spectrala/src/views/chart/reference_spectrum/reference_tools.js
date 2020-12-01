import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import {
    record_reference,
    remove_reference,
    rename_reference,
    selectRecordedReferences,
    selectReferenceSpectrumChartData,
    selectValidation,
} from '../../../reducers/spectrum';

export default function ReferenceSpectrumTools({ height }) {
    const dispatch = useDispatch();
    const spectra = useSelector(selectRecordedReferences);
    const currentSpectrum = useSelector(selectReferenceSpectrumChartData);
    const valid = useSelector(selectValidation);

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
                <Button disabled={valid.valid === false}
                    onClick={() => {
                        dispatch(record_reference({
                            data: currentSpectrum,
                        }));
                    }}
                >
                    Record
                </Button>
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
                <label>
                    Some tools for working with spectra like a record button and
                    stuff.
                </label>
            </div>
        </Card>
    );
}

ReferenceSpectrumTools.propTypes = {
    height: PropTypes.number,
};
