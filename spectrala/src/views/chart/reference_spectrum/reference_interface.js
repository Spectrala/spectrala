import React from 'react';
import { Col, Card, Row, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import ReferenceSpectrumTools from './reference_tools';
import SpectrumLine from '../spectrum_line';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectReferenceSpectrumChartData,
    selectRecordingStatus,
    cancelRecording,
    startRecording,
} from '../../../reducers/reference_spectrum';

export default function ReferenceSpectrumChart({ height }) {
    const data = useSelector(selectReferenceSpectrumChartData);
    const recording = useSelector(selectRecordingStatus);
    const dispatch = useDispatch();

    function getRecordButton() {
        if (recording) {
            return (
                <div>
                    {'Recording '}
                    <Button
                        variant={'outline-secondary'}
                        onClick={() => {
                            console.log('Cancel recording');
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
            <Col xs lg={8}>
                <Card>
                    {getHeader()}
                    <div style={{ height: height }}>
                        <SpectrumLine height={height} data={data} />
                    </div>
                </Card>
            </Col>
            <Col xs lg={3}>
                <ReferenceSpectrumTools height={height} />
            </Col>
        </Row>
    );
}

ReferenceSpectrumChart.propTypes = {
    height: PropTypes.number,
};
