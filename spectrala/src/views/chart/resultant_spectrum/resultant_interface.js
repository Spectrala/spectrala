import React from 'react';
import { Col, Card, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import ReferenceSpectrumTools from './resultant_tools';
import SpectrumLine from '../spectrum_line';
import { useSelector } from 'react-redux';
import { selectValidateLiveResultantSpectrum } from '../../../reducers/resultant_spectrum';

export default function ResultantSpectrumChart({ height }) {
    const data = useSelector(selectValidateLiveResultantSpectrum);

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
                }}
            >
                Resultant Spectrum
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
                <ReferenceSpectrumTools
                    height={height}
                    isCollapsed={isCollapsed()}
                />
            </Col>
        </Row>
    );
}

ResultantSpectrumChart.propTypes = {
    height: PropTypes.number,
};
