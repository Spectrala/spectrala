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
const CustomToggle = forwardRef(({ children, onClick, variant }, ref) => (
    <Button
        href=""
        variant={children.variant}
        style={{ borderRadius: 0 }}
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
    >
        {children.thumbnail}
    </Button>
));


function WebcamDropdown({ variant }) {
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
        navigator.mediaDevices.ondevicechange = function (event) {
            updateDeviceList();
        };
    }, [updateDeviceList]);

    return (
        <Dropdown>
            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                {{
                    thumbnail: <CameraVideo />,
                    variant: variant,
                }}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {devices.map((device, idx) => {
                    return (
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
                    );
                })}
            </Dropdown.Menu>
        </Dropdown>
    );
}

WebcamDropdown.propTypes = {
    variant: PropTypes.string,
};

export default WebcamDropdown;
