import React from 'react';
import { Col, Card, Row, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import ReferenceSpectrumTools from './reference_tools';
import SpectrumLine from '../spectrum_line';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectValidateLiveReferenceSpectrum,
    selectRecordingStatus,
    cancelRecording,
    startRecording,
} from '../../../reducers/reference_spectrum';

export default function ReferenceSpectrumChart({ height }) {
    const data = useSelector(selectValidateLiveReferenceSpectrum);
    const recording = useSelector(selectRecordingStatus);
    const dispatch = useDispatch();

    function isCollapsed() {
        return false;
    }

    function getRecordButton() {
        if (recording) {
            return (
                <div>
                    {'Recording '}
                    <Button
                        variant={'outline-secondary'}
                        onClick={() => {
                            dispatch(cancelRecording());
                        }}
                    >
                        Cancel
                    </Button>
                </div>
            );
        }
        return (
            <Button
                variant={'outline-secondary'}
                onClick={() => {
                    dispatch(startRecording());
                }}
            >
                Record new
            </Button>
        );
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
                Reference Spectrum
                {getRecordButton()}
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

ReferenceSpectrumChart.propTypes = {
    height: PropTypes.number,
};
