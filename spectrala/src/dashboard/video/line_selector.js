import React, { useState } from 'react';
import { Col, InputGroup, FormControl } from 'react-bootstrap';
import PropTypes from 'prop-types';

function invalidToNull(x) {
    if (isNaN(x)) return null;
    if (x < 0 || x > 1) return null;
    return x;
}

export default function LineSelector({ onChange }) {
    const [calibCoords, setCalibCoords] = useState({
        lowX: null,
        lowY: null,
        highX: null,
        highY: null,
    });

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
};

LineSelector.defaultProps = {
    onChange: () => {
        console.warn('Unimplemented onChange for LineSelector');
    },
};
