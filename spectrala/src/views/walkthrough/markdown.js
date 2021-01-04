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
import camera_source from './steps/camera_source.md';
import calibration_type from './steps/calibration_type.md';
import create_reference from './steps/create_reference.md';
import export_data from './steps/export_data.md';
import identify_peaks from './steps/identify_peaks.md';
import reader_line from './steps/reader_line.md';
import record_test from './steps/record_test.md';
import good_spectrum from './steps/good_spectrum.md';
import PropTypes from 'prop-types';

export const walkthroughSteps = {
    CAMERA_SOURCE: camera_source,
    GOOD_SPECTRUM: good_spectrum,
    READER_LINE: reader_line,
    CALIBRATION_TYPE: calibration_type,
    IDENTIFY_PEAKS: identify_peaks,
    CREATE_REFERENCE: create_reference,
    RECORD_TEST: record_test,
    EXPORT: export_data,
};

// Allows for the sizing of images, and creation of links
const renderers = {
    image: ({ alt, src }) => {
        // Size to fit the parent view
        return (
            <img
                alt={alt}
                src={src}
                style={{
                    width: '100%',
                    maxHeight: '300px',
                    objectFit: 'contain',
                    marginTop: '16px',
                }}
            />
        );
    },
    link: ({ href, children }) => {
        // Open link in a new tab
        return (
            <a href={href} target="_blank" rel="noopener noreferrer">
                {children[0].props.children}
            </a>
        );
    },
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
                renderers={renderers}
                children={this.state.md}
                allowDangerousHtml
            />
        );
    }
}

Markdown.propTypes = {
    step: PropTypes.string.isRequired,
};

export default Markdown;
