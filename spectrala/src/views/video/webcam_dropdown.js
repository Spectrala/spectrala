import React, { forwardRef, useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dropdown, Button } from 'react-bootstrap';
import { CameraVideo } from 'react-bootstrap-icons';
import PropTypes from 'prop-types';
import { setSelectedSource, selectWebcam } from '../../reducers/video';
import { SourceEnum } from './source_select';
// Code based off of snippets here: https://react-bootstrap.github.io/components/dropdowns/

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const CustomToggle = forwardRef(({ children, onClick, variant }, ref) => {
    let style = { borderTopRightRadius: 0, borderBottomRightRadius: 0 };
    if (!children.roundLeft)
        style = { borderTopLeftRadius: 0, borderBottomLeftRadius: 0, ...style };
    return (
        <Button
            href=""
            variant={children.variant}
            style={style}
            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
                children.updateDeviceList();
            }}
        >
            {children.thumbnail}
        </Button>
    );
});

function WebcamDropdown({ variant, roundLeft }) {
    const [devices, setDevices] = useState([]);
    const dispatch = useDispatch();
    const selectedWebcam = useSelector(selectWebcam);

    const updateDeviceList = useCallback(() => {
        navigator.mediaDevices
            .enumerateDevices()
            .then(function (devices) {
                setDevices(
                    devices
                        .filter((device) => device.kind === 'videoinput')
                        .map((device) => ({
                            name: device.label,
                            id: device.deviceId,
                        }))
                );
            })
            .catch(function (err) {
                console.error(err.name + ': ' + err.message);
            });
    }, [setDevices]);

    useEffect(() => {
        updateDeviceList();
        navigator.mediaDevices.addEventListener(
            'devicechanged',
            updateDeviceList
        );
        return () =>
            navigator.mediaDevices.removeEventListener(
                'devicechanged',
                updateDeviceList
            );
    }, [updateDeviceList]);

    const getDeviceList = useCallback(() => {
        // Return warning if there are no detected devices.
        // It's possible that there's one device, yet it has a blank ID and name, so also detect this.
        if (devices.length === 0 || devices.map((d) => d.id).join('').length===0) {
            return (
                <Dropdown.Menu>
                    <label style={{padding: '10px'}}>
                        No webcam detected. If you're sure one is connected,
                        make sure you've allowed your browser to use the webcam
                        in your privacy settings.
                    </label>
                </Dropdown.Menu>
            );
        }

        return (
            <Dropdown.Menu>
                {devices.map((device, idx) => (
                    <Dropdown.Item
                        key={idx}
                        active={device.id === selectedWebcam}
                        onClick={() => {
                            dispatch(
                                setSelectedSource({
                                    value: SourceEnum.WEBCAM,
                                    webcam: device.id,
                                })
                            );
                        }}
                    >
                        {device.name}
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        );
    }, [devices, dispatch, selectedWebcam]);

    return (
        <Dropdown>
            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                {{
                    thumbnail: <CameraVideo />,
                    variant: variant,
                    roundLeft,
                    updateDeviceList,
                }}
            </Dropdown.Toggle>
            {getDeviceList()}
        </Dropdown>
    );
}

WebcamDropdown.propTypes = {
    variant: PropTypes.string,
};

export default WebcamDropdown;
