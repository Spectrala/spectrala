import React from 'react';
import {Button, FormControl, Col, ButtonGroup, Dropdown, Row, Form} from 'react-bootstrap';
import PropTypes from 'prop-types';

export default class SourceSelect extends React.Component {

    state = {
        selectedSourceIndex: this.props.defaultSourceIndex,
        hostedStreamLocation: {'port':'','ip':''}
    }

    source_options = [
        "Webcam",
        "Mobile/Raspberry Pi",
        "File Upload"
    ]

    /**
     * Pass the necessary info from this class back to the host 
     *  webcamIsSelected: bool -- true if the source is selected to be the 
     *                            webcam, false if Mobile/Raspberry Pi is selected.
     *  hostedStreamLocation: object -- port and IP of the hosted stream. {'port':'','ip':''}
     */
    handleChange = () => {
        this.props.onChange({
            'selectedSourceIndex': this.state.selectedSourceIndex,
            'hostedStreamLocation': this.state.hostedStreamLocation,
        });
    }

    /**
     * Set state within promise for use with await for synchronous state changes
     * @param {object} state 
     */
    setStateAsync(state) {
        return new Promise((resolve) => {
          this.setState(state, resolve)
        });
    }
    
    /**
     * Returns the proper bootstrap variant (https://react-bootstrap.github.io/components/alerts#examples)
     * depending on whether or not the interface element is selected
     * @param {bool} isSelected Whether or not the given interface element is selected
     */
    getVariant = (idx) => {
        return idx == this.state.selectedSourceIndex ? this.props.selectedVariant : this.props.unselectedVariant
    }

    /**
     * Responds to the click of a source button and updates the state of webcamIsSelected if necessary.
     * @param {bool} buttonIsWebcam true if the button being used is the webcam button
     */
    toggleSelectedButton = async (idx) => {
        // Only update state if necessary
        if (idx !== this.state.selectedSourceIndex) {
            await this.setStateAsync({selectedSourceIndex: idx})
            this.handleChange()
        }
    }

    /**
     * Returns the buttons for switching the video source
     */
    getSourceButtonGroup = () => {
        return (
            <ButtonGroup style={{height:"38px"}}>
                {
                    this.source_options.map((name, idx) => {
                        return (
                            <Button 
                                key = {idx}
                                variant={this.getVariant(idx)}
                                onClick={() => this.toggleSelectedButton(idx)}
                            >{name}</Button>
                        )
                    })
                }
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
                <FormControl type="text" placeholder="Stream IP (e.g. 123.456.7.89)" value={this.state.hostedStreamLocation.ip} onChange={(event) => { this.changeMobileField('ip',event.target.value)}}/>
                <FormControl type="text" placeholder="Stream Port (e.g. 4789)" value={this.state.hostedStreamLocation.port} onChange={(event) => { this.changeMobileField('port',event.target.value)}}/>
            </>
        )
    }

    getFileSelector = () => {
        return (
            <Form style={{height:"38px", display:"flex"}}>
                <Form.File 
                    size="sm"
                    id="custom-file"
                    label="Custom file input"
                    custom
                    />
            </Form>
        );
    }
    
    getExpandedSelector = (idx) => {
        var name = this.source_options[idx];
        if (name == "Webcam") {
            return this.getWebcamSelector()
        } else if (name == "Mobile/Raspberry Pi") {
            return this.getMobileIPSelector()
        } else if (name == "File Upload") {
            return this.getFileSelector()
        }
    }

    render() {
        return (
            <Row style={{display: 'flex', justifyContent:'space-between'}}>
                <Col>
                    <Row >
                        <label style={{paddingLeft: '15px',paddingRight: '15px', alignItems: 'center', display: 'flex', height:"38px"}}>
                            Source
                        </label>
                        {this.getSourceButtonGroup()}
                    </Row>
                </Col>
                <Col xs lg={6} style={{display: 'flex', justifyContent: 'flex-end'}}>
                    {this.getExpandedSelector(this.state.selectedSourceIndex)}
                </Col>
            </Row>
        )
    }
}

SourceSelect.propTypes = {
    onChange: PropTypes.func,
    selectedVariant: PropTypes.string,
    unselectedVariant: PropTypes.string,
    defaultSourceIndex: PropTypes.number,
}

SourceSelect.defaultProps = {
    onChange: () => {console.warn("Unimplemented onChange for SourceSelect")},
    selectedVariant: "dark",
    unselectedVariant: "outline-dark",
}