import React, { useState, useEffect } from 'react';
import { Col, InputGroup, FormControl } from 'react-bootstrap';
import PropTypes from 'prop-types';

function invalidToNull(x) {
    if (isNaN(x)) return null;
    if (x < 0 || x > 1) return null;
    return x;
}

export default function LineSelector({ onChange, defaultCalibCoords }) {
    const [calibCoords, setCalibCoords] = useState(defaultCalibCoords);

    const updateCalibCoords = (newval) => {
        setCalibCoords(newval);
        onChange(newval);
    };

    const createFormControl = (nm, stateTarget) => {
        return (
            <FormControl
                placeholder={nm + ' pct.'}
                aria-label={nm + ' percentage'}
                isInvalid={calibCoords[stateTarget] === null}
                value={Math.round(calibCoords[stateTarget] * 100)}
                onChange={(event) => {
                    const value = invalidToNull(event.target.value / 100);
                    updateCalibCoords({ ...calibCoords, [stateTarget]: value });
                }}
            />
        );
    };

    return (
        <>
            <Col>
                <InputGroup>
                    <InputGroup.Prepend>
                        <InputGroup.Text>Low Energy</InputGroup.Text>
                    </InputGroup.Prepend>
                    {createFormControl('X', 'lowX')}
                    {createFormControl('Y', 'lowY')}
                </InputGroup>
            </Col>
            <Col>
                <InputGroup>
                    <InputGroup.Prepend>
                        <InputGroup.Text>High Energy</InputGroup.Text>
                    </InputGroup.Prepend>
                    {createFormControl('X', 'highX')}
                    {createFormControl('Y', 'highY')}
                </InputGroup>
            </Col>
        </>
    );
}

LineSelector.propTypes = {
    onChange: PropTypes.func,
    defaultCalibCoords: PropTypes.object,
};

LineSelector.defaultProps = {
    onChange: () => {
        console.warn('Unimplemented onChange for LineSelector');
    },
    defaultCalibCoords: {
        lowX: .10,
        lowY: .50,
        highX: .90,
        highY: .50,
    },
};
