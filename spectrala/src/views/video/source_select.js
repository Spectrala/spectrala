import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    setSelectedSource,
    selectSource,
    selectWebcam,
} from '../../reducers/video';
import {
    Button,
    FormControl,
    ButtonGroup,
    Row,
    Popover,
    Overlay,
    Col,
} from 'react-bootstrap';
import { CameraFill } from 'react-bootstrap-icons';
import { FileEarmarkArrowUp, Phone, BroadcastPin } from 'react-bootstrap-icons';
import PropTypes from 'prop-types';
import WebcamDropdown from './webcam_dropdown';

export const SourceEnum = {
    STREAM: 'SOURCE_STREAM',
    WEBCAM: 'SOURCE_WEBCAM',
    IMAGE: 'SOURCE_IMAGE',
    MOBILE_STREAM: 'SOURCE_MOBILE_STREAM',
};

// Will be used for checking permissions when listing cameras
// browser support here is weak but good enough
// async function getCameraPermissions() {
//     return (await navigator.permissions.query({ name: 'camera' })).state;
// }

export default function SourceSelect(props) {
    const selectedSource = useSelector(selectSource);
    const selectedWebcam = useSelector(selectWebcam);

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

    const {
        selectedVariant,
        unselectedVariant,
        onChange,
        inSaveMode,
        setInSaveMode,
        saveOverlayTarget,
    } = props;

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
            selectedSource === SourceEnum.STREAM ||
            selectedSource === SourceEnum.MOBILE_STREAM
        ) {
            let imageElement = document.createElement('img');
            imageElement.crossOrigin = 'anonymous';
            imageElement.src =
                selectedSource === SourceEnum.STREAM
                    ? streamUrl
                    : 'http://' + streamIP + ':' + streamPort + '/video';
            updateMediaElement(imageElement);
            return () => {
                // cleanup video
                imageElement.src = '#';
                imageElement.removeAttribute('src');
                imageElement.removeAttribute('srcObject');
            };
        } else if (selectedSource === SourceEnum.IMAGE) {
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

    return (
        <>
            <div>Source</div>
            <div>
                <ButtonGroup style={{ height: '38px', paddingRight: '10px' }}>
                    <Button
                        variant={getBtnVariant(
                            selectedSource === SourceEnum.MOBILE_STREAM
                        )}
                        onClick={() =>
                            dispatchSelectedSource(SourceEnum.MOBILE_STREAM)
                        }
                        aria-label={'Mobile'}
                        title={'Mobile'}
                    >
                        <Phone />
                    </Button>
                    <Button
                        variant={getBtnVariant(
                            selectedSource === SourceEnum.STREAM
                        )}
                        onClick={() =>
                            dispatchSelectedSource(SourceEnum.STREAM)
                        }
                        aria-label={'Stream'}
                        title={'Stream'}
                    >
                        <BroadcastPin />
                    </Button>
                    <WebcamDropdown
                        variant={getBtnVariant(
                            selectedSource === SourceEnum.WEBCAM
                        )}
                    />

                    <Button
                        variant={getBtnVariant(
                            selectedSource === SourceEnum.IMAGE
                        )}
                        aria-label={'Image Upload'}
                        title={'Image Upload'}
                        onClick={() => dispatchSelectedSource(SourceEnum.IMAGE)}
                    >
                        <FileEarmarkArrowUp />
                    </Button>
                </ButtonGroup>
                <Button
                    variant="outline-dark"
                    style={{ alignItems: 'center' }}
                    onClick={() => setInSaveMode(!inSaveMode)}
                    ref={saveOverlayTarget}
                    title="Snapshot Mode"
                    aria-label="Snapshot Mode"
                >
                    <CameraFill />
                </Button>
                <Overlay
                    show={inSaveMode}
                    target={saveOverlayTarget.current}
                    placement="left-start"
                >
                    <Popover id="snapshot-popover">
                        <Popover.Title>Snapshot Mode</Popover.Title>
                        <Popover.Content>
                            Right-click the preview and select "Save image
                            as..." Click again when you are done to re-enable
                            the overlay.
                        </Popover.Content>
                    </Popover>
                </Overlay>
            </div>

            {selectedSource === SourceEnum.STREAM && (
                <Row
                    style={{
                        width: '100%',
                        paddingTop: 10,
                        marginLeft: 0,
                        marginRight: 0,
                    }}
                >
                    <FormControl
                        style={{ width: '100%' }}
                        type="text"
                        placeholder="Stream URL (e.g. http://192.0.2.1:8000/stream.mp4)"
                        value={streamUrl}
                        onChange={(e) => setStreamUrl(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.keyCode === 13) e.preventDefault();
                        }}
                    />
                </Row>
            )}

            {selectedSource === SourceEnum.MOBILE_STREAM && (
                <Row
                    style={{
                        width: '100%',
                        paddingTop: 10,
                        marginLeft: 0,
                        marginRight: 0,
                    }}
                >
                    <Col style={{ paddingLeft: 0 }}>
                        <FormControl
                            type="text"
                            placeholder="IP (e.g. 192.146.4.184)"
                            value={streamIP}
                            onChange={(e) => setStreamIP(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.keyCode === 13) e.preventDefault();
                            }}
                        />
                    </Col>
                    <Col style={{ paddingRight: 0, paddingLeft: 0 }}>
                        <FormControl
                            type="text"
                            placeholder="Port (e.g. 4747)"
                            value={streamPort}
                            onChange={(e) => setStreamPort(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.keyCode === 13) e.preventDefault();
                            }}
                        />
                    </Col>
                </Row>
            )}
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
