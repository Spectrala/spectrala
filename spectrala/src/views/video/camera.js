import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { selectLineCoords, updateFeed } from '../../reducers/video';

const FRAME_RENDER_INTERVAL_MS = 67; // 15fps

// Render this many frames per data read.
// 1 will push data every at the same framerate as video is displayed,
// 10 will push at 1/10 the rate, etc.
const DATA_PUSH_INTERVAL_LENGTH_FRAMES = 3; // 15 / 3 = 5fps

// Put ticker in here to dispatch slowly.
// Line selection should be in redux.
// Video source should not be part of calibration (webcam/image select)
/**Line selection goes in redux.
 * Calibration state (the nodes) go in redux.
 * The spectrum data goes in redux.
 *   - At some point you want a calibration and want a
 */

function getSinglePixel(imageData, initial, current) {
    let dist = 0;
    for (let i = 0; i < initial.length; i++) {
        dist += (current[i] - initial[i]) * (current[i] - initial[i]);
    }
    dist = Math.sqrt(dist);
    let offset = (current[1] * imageData.width + current[0]) * 4;
    const r = imageData.data[offset];
    const g = imageData.data[offset + 1];
    const b = imageData.data[offset + 2];
    const a = imageData.data[offset + 3];
    return {
        dist,
        r,
        g,
        b,
        a,
    };
}

// coordinates are 0-1.0 values. Returns array of {dist: , r: ...} values
function extractPixelData(imageData, beginX, beginY, finalX, finalY) {
    // we basically compute how we would raster a line, but sample instead of rasterizing
    // https://classic.csunplugged.org/wp-content/uploads/2014/12/Lines.pdf
    // https://en.wikipedia.org/wiki/Bresenham%27s_line_algorithm

    // https://github.com/thejonwithnoh/bresenham-js/blob/master/bresenham-js.js
    // Modified from code under the following license:
    // """
    // The MIT License (MIT)
    //
    // Copyright (c) 2016 Jonathan Faulch
    //
    // Permission is hereby granted, free of charge, to any person obtaining a copy of
    // this software and associated documentation files (the "Software"), to deal in
    // the Software without restriction, including without limitation the rights to
    // use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
    // the Software, and to permit persons to whom the Software is furnished to do so,
    // subject to the following conditions:
    //
    // The above copyright notice and this permission notice shall be included in all
    // copies or substantial portions of the Software.
    //
    // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    // IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
    // FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
    // COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
    // IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
    // CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
    // """

    let pos1 = [
        Math.round(imageData.width * beginX),
        Math.round(imageData.height * beginY),
    ];
    let pos2 = [
        Math.round(imageData.width * finalX),
        Math.round(imageData.height * finalY),
    ];
    // ensure we don't exceed image boundaries on a 1.0 value
    pos2[0] = Math.min(pos2[0], imageData.width - 1);
    pos2[1] = Math.min(pos2[1], imageData.height - 1);

    let delta = pos2.map(function (value, index) {
        return value - pos1[index];
    });
    let increment = delta.map(Math.sign);
    let absDelta = delta.map(Math.abs);
    let absDelta2 = absDelta.map(function (value) {
        return 2 * value;
    });
    let maxIndex = absDelta.reduce(function (accumulator, value, index) {
        return value > absDelta[accumulator] ? index : accumulator;
    }, 0);
    let error = absDelta2.map(function (value) {
        return value - absDelta[maxIndex];
    });

    var result = [];
    var current = pos1.slice();
    for (var j = 0; j < absDelta[maxIndex]; j++) {
        result.push(getSinglePixel(imageData, pos1, current));
        for (var i = 0; i < error.length; i++) {
            if (error[i] > 0) {
                current[i] += increment[i];
                error[i] -= absDelta2[maxIndex];
            }
            error[i] += absDelta2[i];
        }
    }
    result.push(getSinglePixel(imageData, pos1, current));
    return result;
}
export default function CameraView({ props }) {
    const calibCoords = useSelector(selectLineCoords);
    const dispatch = useDispatch();

    // TODO: detect saturated channels in the SetInterval call
    const canvas = useRef(null);
    const { styles, videoSrc, inSaveMode } = props;

    useEffect(() => {
        let frameCounter = 0;
        const videoInterval = setInterval(() => {
            const canvasElem = canvas.current;
            if (!canvasElem) return;
            const ctx = canvasElem.getContext('2d');
            if (
                !videoSrc ||
                (videoSrc instanceof HTMLImageElement &&
                    videoSrc.naturalHeight === 0)
            ) {
                // fill with placeholder color and return
                canvasElem.height = 200;
                ctx.fillStyle = 'black'; // Used to be green, this looks better imo
                ctx.fillRect(0, 0, canvasElem.width, canvasElem.height);
                return;
            }
            // render canvas frame
            if (videoSrc instanceof HTMLVideoElement) {
                canvasElem.width = videoSrc.videoWidth;
                canvasElem.height = videoSrc.videoHeight;
            } else if (videoSrc instanceof HTMLImageElement) {
                canvasElem.width = videoSrc.naturalWidth;
                canvasElem.height = videoSrc.naturalHeight;
            } else {
                /* eslint-disable no-throw-literal */
                throw {
                    err: 'Unsupported video source type',
                    type: typeof videoSrc,
                    src: videoSrc,
                };
                /* eslint-enable no-throw-literal */
            }
            ctx.drawImage(videoSrc, 0, 0, canvasElem.width, canvasElem.height);

            if (++frameCounter >= DATA_PUSH_INTERVAL_LENGTH_FRAMES) {
                frameCounter = 0;

                if (canvasElem.width * canvasElem.height === 0) {
                    console.error(
                        'Got to data reading step with zero-area canvas.'
                    );
                    return;
                }

                // TODO: this could be faster by querying only the region we need
                const imgData = ctx.getImageData(
                    0,
                    0,
                    canvasElem.width,
                    canvasElem.height
                );

                // TODO: Consider putting on timer. Right now, things are running smoothly through pushing everything.
                dispatch(
                    updateFeed({
                        value: extractPixelData(
                            imgData,
                            calibCoords.lowX,
                            calibCoords.lowY,
                            calibCoords.highX,
                            calibCoords.highY
                        ),
                    })
                );
            }

            // Regardless of data pushing, we render the overlay line:

            // get line pixel data
            if (
                !calibCoords ||
                calibCoords.lowX === null ||
                calibCoords.lowY === null ||
                calibCoords.highX === null ||
                calibCoords.highY === null
            ) {
                return;
            }

            /* Line drawing is now SVG, moved elsewhere
            if (inSaveMode) return; // don't render overlay if the user is saving
            ctx.strokeStyle = 'yellow';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(
                calibCoords.lowX * canvasElem.width,
                calibCoords.lowY * canvasElem.height
            );
            ctx.lineTo(
                calibCoords.highX * canvasElem.width,
                calibCoords.highY * canvasElem.height
            );
            ctx.stroke();*/
        }, FRAME_RENDER_INTERVAL_MS);

        return () => clearInterval(videoInterval);
    }, [canvas, videoSrc, calibCoords, dispatch, inSaveMode]);

    return <canvas ref={canvas} style={{ ...styles, width: '100%' }} />;
}

CameraView.propTypes = {
    height: PropTypes.number,
};
