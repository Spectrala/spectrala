/**
 * Markdown.js
 *      This file is responsible for pulling the markdown files from
 *      the steps folder and throwing the desired one into the ReactMarkdown
 *      component.
 *
 *      gfm should allow for tables and checkboxes on lists
 *      Tex should allow for typing Tex (math expressions)
 *
 *      This is to be used in the walkthrough on the right to have richer text.
 */

import React from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import Tex from '@matejmazur/react-katex';
import math from 'remark-math';
import 'katex/dist/katex.min.css'; // `react-katex` does not import the CSS for you

import camera_source from './steps/camera_source.md';
import calibration_type from './steps/calibration_type.md';
import create_reference from './steps/create_reference.md';
import export_data from './steps/export_data.md';
import identify_peaks from './steps/identify_peaks.md';
import reader_line from './steps/reader_line.md';
import record_test from './steps/record_test.md';

import PropTypes from 'prop-types';

export const walkthroughSteps = {
    CAMERA_SOURCE: camera_source,
    READER_LINE: reader_line,
    CALIBRATION_TYPE: calibration_type,
    IDENTIFY_PEAKS: identify_peaks,
    CREATE_REFERENCE: create_reference,
    RECORD_TEST: record_test,
    EXPORT: export_data,
};

// Allows the math plugin to work 
const renderers = {
    inlineMath: ({ value }) => <Tex math={value} />,
    math: ({ value }) => <Tex block math={value} />,
};

class Markdown extends React.Component {
    state = {
        md: null,
    };

    componentDidMount() {
        // Fetch the file and store it in the state
        fetch(this.props.step)
            .then((response) => response.text())
            .then((text) => {
                this.setState({ md: text });
            });
    }

    render() {
        return (
            <ReactMarkdown
                plugins={[math, gfm]}
                renderers={renderers}
                children={this.state.md}
            />
        );
    }
}

Markdown.propTypes = {
    step: PropTypes.string.isRequired,
};

export default Markdown;
