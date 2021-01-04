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
import camera_source from './steps/camera_source.js';
import calibration_type from './steps/calibration_type.js';
import create_reference from './steps/create_reference.js';
import export_data from './steps/export_data.js';
import identify_peaks from './steps/identify_peaks.js';
import reader_line from './steps/reader_line.js';
import record_test from './steps/record_test.js';
import good_spectrum from './steps/good_spectrum.js';
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


/**
 * Markdown used to be a happy place where react-markdown was used.
 * Unfortunately, things aren't that easy. We're doing HTML instead of markdown. 
 * TODO: Change this to not be the "Markdown" class anymore
 */
class Markdown extends React.Component {
    render() {
        return this.props.step;
    }
}

Markdown.propTypes = {
    step: PropTypes.any.isRequired,
};

export default Markdown;
