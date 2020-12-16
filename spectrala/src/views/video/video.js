import React from 'react';
import {Row, Col} from 'react-bootstrap';
import PropTypes from 'prop-types';
import CameraView from './camera';
import AdjustmentOptions from './adjustments';
import CameraFrame from './camera_frame';

export default function Video({ height }) {
    return (
        <>
            <Row style={{ justifyContent: 'center', display: 'flex' }}>
                <Col
                    style={{ paddingBottom: '1vh' }}
                    xl={8}
                    lg={8}
                    md={6}
                    sm={12}
                    xs={12}
                >
                    {/* <CameraView height={height}/> */}
                    <CameraFrame height={height}/>
                </Col>
                <Col
                    style={{ paddingBottom: '1vh' }}
                    xl={4}
                    lg={4}
                    md={6}
                    sm={12}
                    xs={12}
                >
                    <AdjustmentOptions />
                </Col>
            </Row>
        </>
    );
}

Video.propTypes = {
    height: PropTypes.number,
};
