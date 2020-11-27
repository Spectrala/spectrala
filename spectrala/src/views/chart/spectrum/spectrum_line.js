import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSpectrumChartData } from '../../../reducers/spectrum';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';

export default function SpectrumLine({height, width}) {
    const data = useSelector(selectSpectrumChartData);
    const dispatch = useDispatch();
    const CLOSE_POINT_THRESHOLD = 0.015;
    const canvas = useRef(null);

    if (!data) {
        return getLoadingScreen();
    } else {
        return getLineGraph();
    }

    function getLoadingScreen() {
        return (
            <label
                style={{
                    display: 'flex',
                    flex: '1',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                Waiting for data. Make sure to set points of interest on camera
                feed.
            </label>
        );
    }

    function getLineGraph() {
        
        const lineChartData = (canvas) => {
            const ctx = canvas.getContext("2d")

            var gradientStroke = ctx.createLinearGradient(1000, 0, 100, 0);
            gradientStroke.addColorStop(0, "#80b6f4");
            gradientStroke.addColorStop(0.5, "#FF0000");
            gradientStroke.addColorStop(1, "#f49080");
            return {
                datasets: [{
                    borderColor: gradientStroke,
                    pointRadius: 0,
                    fill: true,
                    backgroundColor: gradientStroke,
                    borderWidth: 1,
                    data: data
                }]
            }
        }

        return (
            <Line
            data= {lineChartData}
            options= {{
                legend: null,
                scales: {
                    yAxes: [{
                        type: 'linear',
                        position: 'bottom',

                        gridLines: {
                            drawTicks: false,
                            display: false
                        }
                    }],
                    xAxes: [{
                        type: 'linear',
                        position: 'bottom'
                    }]
                }
            }}
        
            />
        );
    }
}

SpectrumLine.propTypes = {
    height: PropTypes.number,
    width: PropTypes.number
}