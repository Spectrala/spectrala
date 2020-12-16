import React, { useState, useEffect, useCallback } from 'react';
import {
    Button,
    FormControl,
    ButtonGroup,
    Row,
    Popover,
    Overlay,
} from 'react-bootstrap';
import { CameraFill } from 'react-bootstrap-icons';
import { FileEarmarkArrowUp, CameraVideo, Phone } from 'react-bootstrap-icons';
import PropTypes from 'prop-types';

const SourceEnum = {
    STREAM: 'SOURCE_STREAM',
    WEBCAM: 'SOURCE_WEBCAM',
    IMAGE: 'SOURCE_IMAGE',
};

// Will be used for checking permissions when listing cameras
// browser support here is weak but good enough
// async function getCameraPermissions() {
//     return (await navigator.permissions.query({ name: 'camera' })).state;
// }

export default function SourceSelect(props) {
    const [selectedSource, setSelectedSource] = useState(SourceEnum.WEBCAM);
    const [streamUrl, setStreamUrl] = useState('');
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
                    video: true,
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
        } else if (selectedSource === SourceEnum.STREAM) {
            let imageElement = document.createElement('img');
            imageElement.crossOrigin = 'anonymous';
            imageElement.src = streamUrl;
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
                staticImage.src = '#';
                staticImage.removeAttribute('src');
                staticImage.removeAttribute('srcObject');
            };
        } else {
            updateMediaElement(null);
        }
    }, [selectedSource, streamUrl, updateMediaElement]);

    function getWebcamDropdown() {
        // TODO: Retrieve the webcams availible and allow the user to toggle between them.
        // let dropdown = (
        //     <Dropdown>
        //         <Dropdown.Toggle variant="dark" id="dropdown-basic">
        //             Browser Default Webcam
        //         </Dropdown.Toggle>
        //         <Dropdown.Menu>
        //             <Dropdown.Item>
        //                 Macintosh HD Webcam
        //             </Dropdown.Item>
        //         </Dropdown.Menu>
        //     </Dropdown>
        // );
        return null;
    }

    return (
        <div style={{ paddingRight: '10px', paddingLeft: '10px' }}>
            <Row style={{ justifyContent: 'space-between' }}>
                <div>
                    <label
                        style={{
                            height: '100%',
                            alignItems: 'center',
                            display: 'flex',
                        }}
                    >
                        Source
                    </label>
                </div>

                <div>
                    {selectedSource === SourceEnum.WEBCAM &&
                        getWebcamDropdown()}
                    <ButtonGroup style={{ height: '38px', paddingRight: '10px'}}>
                        <Button
                            variant={getBtnVariant(
                                selectedSource === SourceEnum.STREAM
                            )}
                            onClick={() => setSelectedSource(SourceEnum.STREAM)}
                            aria-label={'Stream'}
                            title={'Stream'}
                        >
                            <Phone />
                        </Button>
                        <Button
                            variant={getBtnVariant(
                                selectedSource === SourceEnum.WEBCAM
                            )}
                            aria-label={'Webcam'}
                            title={'Webcam'}
                            onClick={() => setSelectedSource(SourceEnum.WEBCAM)}
                        >
                            <CameraVideo />
                        </Button>
                        <Button
                            variant={getBtnVariant(
                                selectedSource === SourceEnum.IMAGE
                            )}
                            aria-label={'File Upload'}
                            title={'File Upload'}
                            onClick={() => setSelectedSource(SourceEnum.IMAGE)}
                        >
                            <FileEarmarkArrowUp />
                        </Button>
                    </ButtonGroup>
                    <Button
                        variant="outline-primary"
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
                                as..." Click again when you are done to
                                re-enable the overlay.
                            </Popover.Content>
                        </Popover>
                    </Overlay>
                </div>
            </Row>
            {selectedSource === SourceEnum.STREAM && (
                <Row style={{ alignSelf: 'flex-end', paddingTop: '10px' }}>
                    <FormControl
                        type="text"
                        placeholder="Stream URL (e.g. http://192.0.2.1:8000/stream.mp4)"
                        value={streamUrl}
                        onChange={(e) => setStreamUrl(e.target.value)}
                    />
                </Row>
            )}
        </div>
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
