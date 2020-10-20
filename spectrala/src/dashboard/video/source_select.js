import React from 'react';
import {Button, FormControl, Col, ButtonGroup, Dropdown, Row} from 'react-bootstrap';
import PropTypes from 'prop-types';

export default class SourceSelect extends React.Component {

    state = {
        webcamIsSelected: this.props.webcamIsDefault,
        hostedStreamLocation: {'port':'','ip':''}
    }

    /**
     * Pass the necessary info from this class back to the host 
     *  webcamIsSelected: bool -- true if the source is selected to be the 
     *                            webcam, false if Mobile/Raspberry Pi is selected.
     *  hostedStreamLocation: object -- port and IP of the hosted stream. {'port':'','ip':''}
     */
    handleChange = () => {
        this.props.onChange({
            'webcamIsSelected': this.state.webcamIsSelected,
            'hostedStreamLocation': this.state.hostedStreamLocation,
        });
    }

    /**
     * Returns the proper bootstrap variant (https://react-bootstrap.github.io/components/alerts#examples)
     * depending on whether or not the interface element is selected
     * @param {bool} isSelected Whether or not the given interface element is selected
     */
    getVariant = (isSelected) => {
        return isSelected ? this.props.selectedVariant : this.props.unselectedVariant
    }

    /**
     * Responds to the click of a source button and updates the state of webcamIsSelected if necessary.
     * @param {bool} buttonIsWebcam true if the button being used is the webcam button
     */
    toggleSelectedButton = (buttonIsWebcam) => {
        // Only update state if necessary
        if (buttonIsWebcam !== this.state.webcamIsSelected) {
            this.setState({webcamIsSelected: buttonIsWebcam})
            this.handleChange()
        }
    }

    /**
     * Returns the Mobile/Raspberry Pi and Webcam buttons for switching the video source
     */
    getSourceButtonGroup = () => {
        return (
            <ButtonGroup style={{height:"38px"}}>
                <Button 
                    variant={this.getVariant(!this.state.webcamIsSelected)}
                    onClick={() => this.toggleSelectedButton(false)}
                >Mobile/Raspberry Pi</Button>
                <Button 
                    variant={this.getVariant(this.state.webcamIsSelected)}
                    onClick={() => this.toggleSelectedButton(true)}
                >Webcam</Button>
            </ButtonGroup>
        )
    }

    /**
     * Return the dropdown to switch between webcams. 
     * TODO: Make this dynamic. Currently static. 
     */
    getWebcamSelector = () => {
        return (
            <Dropdown>
                <Dropdown.Toggle variant="dark" id="dropdown-basic">
                    HD Webcam 2
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Macintosh HD Webcam</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        )
    }

    /**
     * Handle change of a text field for the stream ip and port
     * @param {string} field key of the mobileOptions dictionary to modify
     * @param {string} newValue value to assign the given field to
     */
    changeMobileField = (field, newValue) => {
        var mobileOptions = this.state.hostedStreamLocation
        mobileOptions[field] = newValue
        this.setState({mobileOptions: mobileOptions})
        this.handleChange()
    }

    getMobileIPSelector = () => {
        return (
            <>
                <FormControl type="text" placeholder="Stream IP (e.g. 123.456.7.89)" onChange={(text) => { this.changeMobileField('ip',text)}}/>
                <FormControl type="text" placeholder="Stream Port (e.g. 4789)" onChange={(text) => { this.changeMobileField('port',text)}}/>
            </>
        )
    }
    
    getExpandedSelector = () => {
        return this.state.webcamIsSelected ? this.getWebcamSelector() : this.getMobileIPSelector()
    }

    render() {
        return (
            <Row style={{display: 'flex', justifyContent:'space-between'}}>
                <Col>
                    <Row >
                        <label style={{paddingLeft: '10px',paddingRight: '10px', alignItems: 'center', display: 'flex', height:"38px"}}>
                            Source
                        </label>
                        {this.getSourceButtonGroup()}
                    </Row>
                </Col>
                <Col xs lg={6} style={{display: 'flex', justifyContent: 'flex-end'}}>
                    {this.getExpandedSelector()}
                </Col>
            </Row>
        )
    }
}

SourceSelect.propTypes = {
    onChange: PropTypes.func,
    selectedVariant: PropTypes.string,
    unselectedVariant: PropTypes.string,
    webcamIsDefault: PropTypes.bool,
}

SourceSelect.defaultProps = {
    onChange: () => {console.warn("Unimplemented onChange for SourceSelect")},
    selectedVariant: "dark",
    unselectedVariant: "outline-dark",
    webcamIsDefault: false,
}