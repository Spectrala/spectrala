import React from 'react';
import { Col, Card, Row, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import SpectrumTools from './spectrum_tools';
import SpectrumLine from './spectrum_line';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectValidateLiveSpectrum,
} from '../../../reducers/spectrum';

export default function SpectrumChart({ height }) {
    const data = useSelector(selectValidateLiveSpectrum);
    const dispatch = useDispatch();

    function isCollapsed() {
        return false;
    }

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
                    justifyContent: 'space-between',
                }}
            >
                Spectrum
            </Card.Header>
        );
    }

    return (
        <Row style={{ justifyContent: 'center', display: 'flex' }}>
            <Col
                style={{ paddingBottom: '1vh' }}
                xl={8}
                lg={8}
                md={6}
                sm={12}
                xs={12}
            >
                <Card>
                    {getHeader()}
                    {isCollapsed() ? null : (
                        <div style={{ height: height }}>
                            <SpectrumLine height={height} spectrumData={data} />
                        </div>
                    )}
                </Card>
            </Col>
            <Col
                style={{ paddingBottom: '1vh' }}
                xl={4}
                lg={4}
                md={6}
                sm={12}
                xs={12}
            >
                <SpectrumTools
                    height={height}
                    isCollapsed={isCollapsed()}
                />
            </Col>
        </Row>
    );
}

SpectrumChart.propTypes = {
    height: PropTypes.number,
};