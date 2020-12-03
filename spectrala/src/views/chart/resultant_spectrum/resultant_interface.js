import React from 'react';
import { Col, Card, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import ReferenceSpectrumTools from './resultant_tools';
import SpectrumLine from '../spectrum_line';
import { useSelector } from 'react-redux';
import { selectResultantSpectrumChartData } from '../../../reducers/resultant_spectrum';

export default function ResultantSpectrumChart({ height }) {

    const data = useSelector(selectResultantSpectrumChartData);
    
    function getHeader() {
        return (
            <Card.Header
                as="h5"
                style={{
                    height: '64px',
                    display: 'flex',
                    alignItems: 'center',
                    paddingLeft: '15px',
                    paddingRight: '15px',
                }}
            >
                Resultant Spectrum
            </Card.Header>
        );
    }

    console.log(data);
    return (
        <Row style={{ justifyContent: 'center', display: 'flex' }}>
            <Col xs lg={8}>
                <Card>
                    {getHeader()}
                    <div style={{ height: height }}>
                        <SpectrumLine height={height} data={data}/>
                    </div>
                </Card>
            </Col>
            <Col xs lg={3}>
                <ReferenceSpectrumTools height={height} />
            </Col>
        </Row>
    );
}

ResultantSpectrumChart.propTypes = {
    height: PropTypes.number,
};