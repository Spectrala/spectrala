import React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';

// How many digits are skipped when creating color stops.
const GRADIENT_GRANULARITY = 3;

// The opacity (in hex, from 00 to FF), of the area of the graph.
// FF is completely solid, 00 is completely transparent.
const AREA_OPACITY = 'CC';

/**
 * SpectrumLine:
 *      This interface is meant to handle both the reference
 *      spectrum and the resultant spectrum. It's the pretty rainbow.
 */

// TODO: Fix somewhat sketchy color settings.
export default function ReferenceSpectrumLine({
    height,
    referenceSpectrumData,
}) {
    if (!referenceSpectrumData) {
        return getLoadingScreen();
    } else if (!referenceSpectrumData.isValid()) {
        return getLoadingScreen(referenceSpectrumData.getMessage());
    } else {
        return getLineGraph(referenceSpectrumData.getData());
    }

    function getLoadingScreen(message) {
        // TODO: Change this to make it generic.
        let text = 'Waiting...';
        if (message) text = message;
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
                {text}
            </label>
        );
    }

    /**
     * decimalToHex and convert were taken from this website:
     * https://www.johndcook.com/wavelength_to_RGB.html
     */
    function decimalToHex(d) {
        d = Math.round(d);
        var hex = d.toString(16);
        while (hex.length < 2) {
            hex = '0' + hex;
        }

        return hex;
    }

    function convert(w) {
        var red, green, blue, factor;

        if (w >= 380 && w < 440) {
            red = -(w - 440) / (440 - 380);
            green = 0.0;
            blue = 1.0;
        } else if (w >= 440 && w < 490) {
            red = 0.0;
            green = (w - 440) / (490 - 440);
            blue = 1.0;
        } else if (w >= 490 && w < 510) {
            red = 0.0;
            green = 1.0;
            blue = -(w - 510) / (510 - 490);
        } else if (w >= 510 && w < 580) {
            red = (w - 510) / (580 - 510);
            green = 1.0;
            blue = 0.0;
        } else if (w >= 580 && w < 645) {
            red = 1.0;
            green = -(w - 645) / (645 - 580);
            blue = 0.0;
        } else if (w >= 645 && w < 781) {
            red = 1.0;
            green = 0.0;
            blue = 0.0;
        } else {
            red = 0.0;
            green = 0.0;
            blue = 0.0;
        }

        // Let the intensity fall off near the vision limits

        if (w >= 380 && w < 420) factor = 0.3 + (0.7 * (w - 380)) / (420 - 380);
        else if (w >= 420 && w < 701) factor = 1.0;
        else if (w >= 701 && w < 781)
            factor = 0.3 + (0.7 * (780 - w)) / (780 - 700);
        else factor = 0.0;

        var gamma = 0.8;
        var R = red > 0 ? 255 * Math.pow(red * factor, gamma) : 0;
        var G = green > 0 ? 255 * Math.pow(green * factor, gamma) : 0;
        var B = blue > 0 ? 255 * Math.pow(blue * factor, gamma) : 0;

        var hex = '#' + decimalToHex(R) + decimalToHex(G) + decimalToHex(B);
        return hex;
    }

    function addGradients(gradientStroke, data) {
        const min = data[0].x;
        const max = data[data.length - 1].x;
        const range = max - min;
        const len = Math.round(range / GRADIENT_GRANULARITY);

        const get_x = (w) => (w - min) / range;
        const wavelengths = Array.from(
            new Array(len),
            (x, i) => GRADIENT_GRANULARITY * i + min
        );
        wavelengths.forEach((p) => {
            gradientStroke.addColorStop(get_x(p), convert(p) + AREA_OPACITY);
        });
    }

    function getLineGraph(data) {
        const lineChartData = (canvas) => {
            const ctx = canvas.getContext('2d');

            const frame = canvas.getBoundingClientRect();
            const min_x = frame.x;
            const max_x = min_x + frame.width;

            var gradientStroke = ctx.createLinearGradient(min_x, 0, max_x, 0);
            addGradients(gradientStroke, data);
            return {
                datasets: [
                    {
                        borderColor: gradientStroke,
                        pointRadius: 0,
                        fill: true,
                        backgroundColor: gradientStroke,
                        borderWidth: 1,
                        data: data,
                    },
                ],
            };
        };

        const min_x_value = data[0].x;
        const max_x_value = data[data.length - 1].x;

        return (
            <div
                style={{ position: 'relative', height: height, width: '100%' }}
            >
                <Line
                    data={lineChartData}
                    options={{
                        legend: null,
                        hover: false,
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            yAxes: [
                                {
                                    type: 'linear',
                                    position: 'bottom',
                                    display: false,
                                    gridLines: {
                                        drawTicks: false,
                                        display: false,
                                    },
                                    ticks: {
                                        beginAtZero: true,
                                        steps: 10,
                                        stepValue: 5,
                                        max: 100,
                                    },
                                },
                            ],
                            xAxes: [
                                {
                                    type: 'linear',
                                    position: 'bottom',
                                    ticks: {
                                        precision: 0,
                                        min: min_x_value,
                                        max: max_x_value,
                                    },
                                },
                            ],
                        },
                    }}
                />
            </div>
        );
    }
}

ReferenceSpectrumLine.propTypes = {
    height: PropTypes.number,
    referenceSpectrumData: PropTypes.any,
};
