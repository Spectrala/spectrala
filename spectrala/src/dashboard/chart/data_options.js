import React from 'react';
import {Card, InputGroup, FormControl, Dropdown, DropdownButton} from 'react-bootstrap';
import PropTypes from 'prop-types';

export default class DataOptions extends React.Component {


    render() {
        return (
            <Card>
                <Card.Header as="h5" style={{height:"64px", display:"flex",alignItems:"center",paddingLeft:"15px",paddingRight:"15px"}}>Data options</Card.Header> 
                <div style={{height:this.props.height}}>

                    <DropdownButton title="Custom" id="collasible-nav-dropdown">
                        <Dropdown.Item>CFL Bulb</Dropdown.Item>
                        <Dropdown.Item>Green LED</Dropdown.Item>
                        <Dropdown.Item>Data collection</Dropdown.Item>
                    </DropdownButton>

                    <InputGroup className="mb-3">
                        <FormControl
                        placeholder="402"
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                        />
                        <InputGroup.Append>
                        <InputGroup.Text id="basic-addon2">nm</InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>


                    <InputGroup className="mb-3">
                        <FormControl
                        placeholder="612"
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                        />
                        <InputGroup.Append>
                        <InputGroup.Text id="basic-addon2">nm</InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>



                </div>

            </Card>
        )
    }
}


DataOptions.propTypes = {
    height: PropTypes.number
}