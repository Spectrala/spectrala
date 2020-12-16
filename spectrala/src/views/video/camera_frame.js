import React, { useState, useCallback } from 'react';
import Container from './draggable_points/Container';
import Camera from './camera';
const CameraFrame = ({height}) => {
    return (
        <div>
            <Container />
            <Camera height={height}/>
        </div>
    );
};

export default CameraFrame;
