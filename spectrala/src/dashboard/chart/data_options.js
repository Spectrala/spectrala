import React from 'react';
import {Redirect} from 'react-router-dom';
import {Button, Container, Col, Navbar, Spinner, Card, ButtonGroup, Dropdown, Row, InputGroup, FormControl} from 'react-bootstrap';
import PropTypes from 'prop-types';

export default class DataOptions extends React.Component {


    render() {
        return (
            <Card>
                <Card.Header as="h5" style={{height:"64px", display:"flex",alignItems:"center"}}>Data options</Card.Header> 
                <div style={{height:this.props.height}}>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                        placeholder="Username"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <FormControl
                        placeholder="Recipient's username"
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                        />
                        <InputGroup.Append>
                        <InputGroup.Text id="basic-addon2">@example.com</InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>

                    <label htmlFor="basic-url">Your vanity URL</label>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon3">
                            https://example.com/users/
                        </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl id="basic-url" aria-describedby="basic-addon3" />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                        <InputGroup.Text>$</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl aria-label="Amount (to the nearest dollar)" />
                        <InputGroup.Append>
                        <InputGroup.Text>.00</InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>

                </div>

                <Card.Footer style={{display:"flex", justifyContent: "flex-end"}}><Button variant='outline-secondary'>Reset defaults</Button></Card.Footer> 
            </Card>
        )
    }
}


DataOptions.propTypes = {
    height: PropTypes.number
}