import React from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { createStore, useSelector } from 'react-redux';

const defaultAdjustments = {
    brightness: { value: 50, title: 'Brightness' },
    contrast: { value: 50, title: 'Contrast' },
    hue: { value: 50, title: 'Hue' },
    saturation: { value: 50, title: 'Saturation' },
};

const selectAdjustments = (state) => state.adjustments;

const AdjustmentOptions = () => {
    const todos = useSelector(selectAdjustments);

    // Todo: handle this data, including saving it to user defaults
    // Todo: left edge of control can go past 0. Looks bad given left alignment is strictly at 15px everywhere else.
    var state = {
        videoPreferences: defaultAdjustments,
    };

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
                {selectAdjustments.map((adjustment, idx) =>
                    this.sliderControl(adjustment, idx)
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
            {this.getSliders()}
        </Card>
    );
};

export default AdjustmentOptions;
