import React from 'react';
import {Card, InputGroup, FormControl, Dropdown, DropdownButton} from 'react-bootstrap';
import PropTypes from 'prop-types';

export default class DataOptions extends React.Component {


    state = {
        calibrationPoints: [412, 442]
    }



    getCalibrationBoxes = () => {
        return (
            <>
            {this.state.calibrationPoints.map((point, idx) => {
                return (
                    <InputGroup className="mb-3" key={idx} style={{paddingLeft:"15px", paddingRight:"15px", display: "flex"}}>
                        <FormControl
                        value={point}
                        aria-label={`Calibration point ${idx+1}`}
                        aria-describedby="basic-addon2"
                        onChange={(event) => {
                            var points = this.state.calibrationPoints;
                            points[idx] = event.target.value;
                            this.setState({calibrationPoints: points});
                        }}
                        />
                        <InputGroup.Append>
                        <InputGroup.Text id="basic-addon2">nm</InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>
                )
            })}
            </>
        )
    }

    render() {
        return (
            <Card>
                <Card.Header as="h5" style={{height:"64px", display:"flex",alignItems:"center",paddingLeft:"15px",paddingRight:"15px"}}>Set calibration points</Card.Header> 
                <div style={{height:this.props.height}}>

                    <DropdownButton title="Custom" variant="primary-link" id="collasible-nav-dropdown">
                        <Dropdown.Item>CFL Bulb</Dropdown.Item>
                        <Dropdown.Item>Green LED</Dropdown.Item>
                        <Dropdown.Item>Data collection</Dropdown.Item>
                    </DropdownButton>

                    {this.getCalibrationBoxes()}


                </div>

            </Card>
        )
    }
}


DataOptions.propTypes = {
    height: PropTypes.number
}