import React from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import CameraFrame from './camera_frame';

export default function Video({showsLine, showsPoints}) {
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
                    <CameraFrame showsLine={showsLine} showsPoints={showsPoints}/>
                </Col>
            </Row>
        </>
    );
}

Video.propTypes = {
    showsLine: PropTypes.bool,
    showsPoints: PropTypes.bool,
};
