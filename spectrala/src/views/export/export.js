import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Card, Row, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { cardStyle, cardHeaderStyle } from '../theme/styles';

export default function DataExport({ height }) {
    function getHeader() {
        return (
            <Card.Header as="h5" style={cardHeaderStyle}>
                Export
                <Button variant="outline-dark">Export all as CSV</Button>
            </Card.Header>
        );
    }

    function getDataExport() {
        return (
            <Col style={{ paddingBottom: '1vh' }} lg={8} md={6} xs={12}>
                <Card style={cardStyle}>
                    {getHeader()}
                    <div style={{ height: height }}>Hello, world</div>
                </Card>
            </Col>
        );
    }

    return (
        <Row
            style={{
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            {getDataExport()}
        </Row>
    );
}

DataExport.propTypes = {
    height: PropTypes.number,
};
