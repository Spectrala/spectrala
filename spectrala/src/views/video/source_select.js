import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    setSelectedSource,
    selectSource,
    selectWebcam,
} from '../../reducers/video';
import { Button, FormControl, ButtonGroup, Row, Col } from 'react-bootstrap';
import { CameraFill } from 'react-bootstrap-icons';
import { FileEarmarkArrowUp, Phone, BroadcastPin } from 'react-bootstrap-icons';
import PropTypes from 'prop-types';
import WebcamDropdown from './webcam_dropdown';
import { downloadImage } from '../../util/persistence';

export const SourceEnum = {
    STREAM: 'SOURCE_STREAM',
    WEBCAM: 'SOURCE_WEBCAM',
    IMAGE: 'SOURCE_IMAGE',
    MOBILE_STREAM: 'SOURCE_MOBILE_STREAM',
};

const isLocal = !window.location.hostname.includes('127.0.0.1');

// Will be used for checking permissions when listing cameras
// browser support here is weak but good enough
// async function getCameraPermissions() {
//     return (await navigator.permissions.query({ name: 'camera' })).state;
// }

export default function SourceSelect(props) {
    const selectedSource = useSelector(selectSource);
    const selectedWebcam = useSelector(selectWebcam);
    const saveOverlayTarget = useRef(null);

    const dispatch = useDispatch();

    const dispatchSelectedSource = (src) => {
        dispatch(
            setSelectedSource({
                value: src,
            })
        );
    };

    const [streamUrl, setStreamUrl] = useState('');
    const [streamIP, setStreamIP] = useState('');
    const [streamPort, setStreamPort] = useState('');
    // const [mediaElement, setMediaElement] = useState(null);

    const { selectedVariant, unselectedVariant, onChange, videoRef } = props;

    const getBtnVariant = (isActive) =>
        isActive ? selectedVariant : unselectedVariant;

    const updateMediaElement = useCallback(
        (e) => {
            // setMediaElement(e);
            onChange(e);
            window.testvideoelem = e;
        },
        [onChange /*, setMediaElement*/]
    );

    const promptImageUpload = () => {
        let staticImage;
        async function loadStaticImage() {
            const picker = document.createElement('input');
            picker.type = 'file';
            picker.accept = 'image/*';
            picker.addEventListener('change', (e) => {
                const file = e.target.files[0];
                const img = document.createElement('img');
                img.src = URL.createObjectURL(file);
                img.onload = () => {
                    URL.revokeObjectURL(img.src);
                };
                staticImage = img;
                updateMediaElement(staticImage);
            });
            picker.click();
        }
        loadStaticImage();
        // Cleanup isn't a big deal here because it's a single image,
        // but we're good citizens here.
        return () => {
            if (staticImage) {
                staticImage.src = '#';
                staticImage.removeAttribute('src');
                staticImage.removeAttribute('srcObject');
            } else {
                console.warn('No static image');
            }
        };
    };

    // Handle stream creation
    useEffect(() => {
        if (selectedSource === SourceEnum.WEBCAM) {
            let videoElement;
            let mediaStream;
            async function createVideoElem() {
                videoElement = document.createElement('video');
                mediaStream = await navigator.mediaDevices.getUserMedia({
                    video: {
                        deviceId: selectedWebcam,
                    },
                });
                videoElement.srcObject = mediaStream;
                videoElement.play();
                updateMediaElement(videoElement);
            }
            createVideoElem();
            return () => {
                // cleanup video
                videoElement.pause();
                videoElement.removeAttribute('src'); // empty source
                videoElement.removeAttribute('srcObject'); // empty source
                videoElement.load();
                if (!mediaStream) return; // exit early if creation failed.
                mediaStream.getTracks().forEach((track) => track.stop());
            };
        } else if (
            (selectedSource === SourceEnum.STREAM ||
                selectedSource === SourceEnum.MOBILE_STREAM) &&
            isLocal
        ) {
            let imageElement = document.createElement('img');
            imageElement.crossOrigin = 'anonymous';
            imageElement.src =
                selectedSource === SourceEnum.STREAM
                    ? streamUrl
                    : 'http://' + streamIP + ':' + streamPort + '/video';
            updateMediaElement(imageElement);
            return () => {
                imageElement.src = '#';
                imageElement.removeAttribute('src');
                imageElement.removeAttribute('srcObject');
            };
        } else {
            updateMediaElement(null);
        }
    }, [
        selectedSource,
        streamUrl,
        updateMediaElement,
        streamIP,
        streamPort,
        selectedWebcam,
    ]);

    // Button that looks like a camera for downloading the image on screen
    const snapshotButton = (
        <Button
            variant="outline-dark"
            style={{ alignItems: 'center' }}
            onClick={() => downloadImage(videoRef, 'spectrala_snapshot.png')}
            ref={saveOverlayTarget}
            title="Take Snapshot"
            aria-label="Take Snapshot"
        >
            <CameraFill />
        </Button>
    );

    // Forms for inputting source stream, ip
    const createFormControl = ({ placeholder, value, changeValue }) => {
        return (
            <FormControl
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => changeValue(e.target.value)}
                onKeyDown={(e) => {
                    if (e.keyCode === 13) e.preventDefault();
                }}
            />
        );
    };

    // Button formula for source select
    const createSourceButton = ({ source, label, icon, additionalOnClick }) => {
        return (
            <Button
                variant={getBtnVariant(selectedSource === source)}
                onClick={() => {
                    dispatchSelectedSource(source);
                    if (additionalOnClick) additionalOnClick();
                }}
                aria-label={label}
                title={label}
            >
                {icon}
            </Button>
        );
    };

    // Buttons for selecting source
    const sourceSelectBar = (
        <ButtonGroup style={{ height: '38px', paddingRight: '10px' }}>
            {isLocal &&
                createSourceButton({
                    source: SourceEnum.MOBILE_STREAM,
                    label: 'Mobile',
                    icon: <Phone />,
                })}
            {isLocal &&
                createSourceButton({
                    source: SourceEnum.STREAM,
                    label: 'Stream',
                    icon: <BroadcastPin />,
                })}
            <WebcamDropdown
                variant={getBtnVariant(selectedSource === SourceEnum.WEBCAM)}
            />
            {createSourceButton({
                source: SourceEnum.IMAGE,
                label: 'Image Upload',
                icon: <FileEarmarkArrowUp />,
                additionalOnClick: () => promptImageUpload(),
            })}
        </ButtonGroup>
    );

    // Styling for rows to contain forms from createFormControl
    const secondaryRowStyle = {
        width: '100%',
        paddingTop: 10,
        marginLeft: 0,
        marginRight: 0,
    };

    const secondaryRow = (
        <>
            {selectedSource === SourceEnum.STREAM && (
                <Row style={secondaryRowStyle}>
                    {createFormControl({
                        placeholder:
                            'Stream URL (e.g. http://192.0.2.1:8000/stream.mp4)',
                        value: streamUrl,
                        changeValue: setStreamUrl,
                    })}
                </Row>
            )}

            {selectedSource === SourceEnum.MOBILE_STREAM && (
                <Row style={secondaryRowStyle}>
                    <Col style={{ paddingLeft: 0 }}>
                        {createFormControl({
                            placeholder: 'IP (e.g. 192.146.4.184)',
                            value: streamIP,
                            changeValue: setStreamIP,
                        })}
                    </Col>
                    <Col style={{ paddingRight: 0, paddingLeft: 0 }}>
                        {createFormControl({
                            placeholder: 'Port (e.g. 4747)',
                            value: streamPort,
                            changeValue: setStreamPort,
                        })}
                    </Col>
                </Row>
            )}
        </>
    );

    return (
        <>
            <div>Source</div>
            <div>
                {sourceSelectBar}
                {snapshotButton}
            </div>
            {secondaryRow}
        </>
    );
}

SourceSelect.propTypes = {
    onChange: PropTypes.func,
    selectedVariant: PropTypes.string,
    unselectedVariant: PropTypes.string,
};

SourceSelect.defaultProps = {
    onChange: () => {
        console.warn('Unimplemented onChange for SourceSelect');
    },
    selectedVariant: 'dark',
    unselectedVariant: 'outline-dark',
};
