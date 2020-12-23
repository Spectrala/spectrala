import React from 'react';
import { useSelector } from 'react-redux';
import Video from './video/video';
import CalibrationSpectrumChart from './chart/calibration/calibration_interface';
import SpectrumChart from './chart/spectrum/spectrum_interface';
import {
    widgets,
    selectCurrentWalkthroughItem,
} from '../../reducers/walkthrough';

const Camera = ({ props }) => {
    return (
        <Video
            height={250}
            showsLine={props.showsLine}
            showsPoints={props.showsPoints}
        />
    );
};

const CalibPointsTool = (widget) => {
    const canPlace = widget === widgets.CALIB_PTS_PLACE;
    const canConfig = widget === widgets.CALIB_PTS_CONFIG;
    return null;
};

const CalibChart = () => {
    return <CalibrationSpectrumChart height={350} />;
};

const SpectraTool = () => {
    return null;
};

const SpectrumChart = () => {
    return <SpectrumChart height={350} />;
};

const DataExport = () => {
    return <label>This is the data export you've all been waiting for</label>;
};

const GetWidget = (currentWidget, allWidgets) => {
    /**
     * camera, line, and points are all variants on camera.
     * There will not be line/points without camera, so only return something here
     * when camera is selected.
     **/
    if (currentWidget === widgets.LINE || currentWidget === widgets.POINTS)
        return null;
    if (currentWidget === widgets.CAMERA) {
        return Camera({
            showsLine: allWidgets.includes(widgets.LINE),
            showsPoints: allWidgets.includes(widgets.POINTS),
        });
    }

    // Calibration points tool
    if (
        currentWidget === widgets.CALIB_PTS_CONFIG ||
        currentWidget === widgets.CALIB_PTS_PLACE
    )
        return CalibPointsTool(currentWidget);

    // Calibration spectrum chart, spectra tool, spectrum chart, data export
    if (currentWidget === widgets.CALIB_CHART) return CalibChart();
    if (currentWidget === widgets.SPECTRA_TOOL) return SpectraTool();
    if (currentWidget === widgets.SPECTRUM_CHART) return SpectrumChart();
    if (currentWidget === widgets.DATA_EXPORT) return DataExport();
};

export const WidgetsView = () => {
    const walkthroughItem = useSelector(selectCurrentWalkthroughItem);
    const displayWidgets = walkthroughItem.shows;
    return (
        <>
            {displayWidgets.map((widget, idx) =>
                GetWidget(widget, displayWidgets)
            )}
        </>
    );
};

export default null;
