import React, { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { createStore, useSelector } from 'react-redux';



// const selectAdjustments = (state) => state.adjustments;

const AdjustmentOptions = () => {
    const [adjustments, setAdjustments] = useState(defaultAdjustments)

    // function handleChange(property, newValue) {
    //     var preferences = this.state.videoPreferences;
    //     preferences[property] = newValue;
    //     this.setState({ videoPreferences: preferences });
    // };

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
                    onChange={(newValue) => {
                        console.log("onchange")
                    }}
                    value={value}
                />
            </div>
        );
    };

    function getSliders() {
        return (
            <>
                {adjustments.map((adjustment, idx) =>
                    sliderControl(adjustment, idx)
                )}
            </>
        );
    };

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
                <Button variant="outline-secondary">Reset</Button>
            </Card.Header>
            {getSliders()}
        </Card>
    );
};

export default AdjustmentOptions;
