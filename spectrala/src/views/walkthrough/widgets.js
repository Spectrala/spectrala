import React from 'react';
import { useSelector } from 'react-redux';
import Video from '../video/video';
import CalibrationSpectrumChart from '../chart/calibration/calibration_interface';
import SpectrumChart from '../chart/spectrum/spectrum_interface';
import {
    widgets,
    selectCurrentWalkthroughItem,
} from '../../reducers/walkthrough';

const getCamera = (props) => {
    return (
        <Video showsLine={props.showsLine} showsPoints={props.showsPoints} />
    );
};

const getCalibrationTools = ({ widget, showsChart }) => {
    const canPlace = widget === widgets.CALIB_PTS_PLACE;
    const canConfig = widget === widgets.CALIB_PTS_CONFIG;
    return CalibrationSpectrumChart({height: 350, showsChart, showsTool: true, canPlace, canConfig})
};


const getSpectrumChart = () => {
    return <SpectrumChart height={350} />;
};

const getDataExport = () => {
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
        return getCamera({
            showsLine: allWidgets.includes(widgets.LINE),
            showsPoints: allWidgets.includes(widgets.POINTS),
        });
    }

    /**
     * There will not be the chart without the tools, so only return something here
     * when tools are chosen
     **/
    if (
        currentWidget === widgets.CALIB_PTS_CONFIG ||
        currentWidget === widgets.CALIB_PTS_PLACE
    )
        return getCalibrationTools({
            widget: currentWidget,
            showsChart: allWidgets.includes(widgets.CALIB_CHART),
        });
    if (currentWidget === widgets.CALIB_CHART) return null;


    if (currentWidget === widgets.SPECTRA) return getSpectrumChart();
    if (currentWidget === widgets.DATA_EXPORT) return getDataExport();
};

export const WidgetsView = () => {
    const walkthroughItem = useSelector(selectCurrentWalkthroughItem);
    const displayWidgets = walkthroughItem.shows;
    return (
        <>
            {displayWidgets.map((widget, idx) => (
                <div key={idx}>{GetWidget(widget, displayWidgets)}</div>
            ))}
        </>
    );
};

export default null;
