/*
import React from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
    setValue,
    selectAdjustments,
} from '../../reducers/adjustments';

export default function AdjustmentOptions() {


    // TODO: Make adjustments do something, then show it to the user.
    return null;
    
    const adjustments = useSelector(selectAdjustments);
    const dispatch = useDispatch();

    function sliderControl(adjustment, idx) {
        const value = adjustment.value;
        const title = adjustment.title;
        return (
            <div
                style={{
                    height: '100%',
                    paddingLeft: '15px',
                    paddingRight: '15px',
                }}
                key={idx}
            >
                <label style={{ paddingTop: '10px' }}>{title}</label>
                <Form.Control
                    type="range"
                    custom
                    onChange={(event) => {
                        dispatch(
                            setValue({
                                value: parseInt(event.target.value),
                                targetIndex: idx,
                            })
                        );
                    }}
                    value={value}
                />
            </div>
        );
    }

    function getSliders() {
        return (
            <>
                {adjustments.map((adjustment, idx) =>
                    sliderControl(adjustment, idx)
                )}
            </>
        );
    }

    return (
        <Card style={{ height: '100%' }}>
            <Card.Header
                as="h5"
                style={{
                    height: '64px',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    display: 'flex',
                    paddingLeft: '15px',
                    paddingRight: '15px',
                }}
            >
                Adjustments
                <Button
                    variant="outline-secondary"
                    onClick={() => dispatch(setDefault())}
                >
                    Reset
                </Button>
            </Card.Header>
            {getSliders()}
        </Card>
    );
}
*/