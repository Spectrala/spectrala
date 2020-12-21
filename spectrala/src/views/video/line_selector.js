import React from 'react';
import { Col, InputGroup, FormControl } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { selectLineCoords, updateLineCoords } from '../../reducers/video';

function isValid(x) {
    if (isNaN(x)) return false;
    if (x < 0 || x > 1) return false;
    return true;
}

export default function LineSelector() {
    const lineCoords = useSelector(selectLineCoords);
    const dispatch = useDispatch();

    const createFormControl = (nm, stateTarget) => {
        return (
            <FormControl
                placeholder={nm + ' pct.'}
                aria-label={nm + ' percentage'}
                isInvalid={!isValid(lineCoords[stateTarget])}
                value={Math.round(lineCoords[stateTarget] * 100)}
                onChange={(event) => {
                    const value = event.target.value / 100;
                    if (isValid(value)) {
                        dispatch(
                            updateLineCoords({
                                value: value,
                                targetKey: stateTarget,
                            })
                        );
                    }
                }}
                onKeyDown={(e) => {
                    if (e.keyCode === 13) e.preventDefault();
                }}
            />
        );
    };

    return (
        <>
            <Col xl={5} lg xs={12}>
                <InputGroup style={{ display: 'flex' }}>
                    <InputGroup.Prepend>
                        <InputGroup.Text>Low Energy</InputGroup.Text>
                    </InputGroup.Prepend>
                    {createFormControl('X', 'lowX')}
                    {createFormControl('Y', 'lowY')}
                </InputGroup>
            </Col>
            <Col xl={5} lg xs={12}>
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
