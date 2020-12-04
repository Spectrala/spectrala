import React, { useState, useEffect, useCallback } from 'react';
import {
    Button,
    FormControl,
    Col,
    ButtonGroup,
    Dropdown,
    Row,
} from 'react-bootstrap';
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

    const { selectedVariant, unselectedVariant, onChange } = props;

    const updateMediaElement = useCallback(
        (e) => {
            // setMediaElement(e);
            onChange(e);
            window.testvideoelem = e;
        },
        [onChange /*, setMediaElement*/]
    );

    const getBtnVariant = (isActive) =>
        isActive ? selectedVariant : unselectedVariant;

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

    return (
        <Row style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Col lg="auto">
                <Row>
                    <label
                        style={{
                            paddingLeft: '10px',
                            paddingRight: '10px',
                            alignItems: 'center',
                            display: 'flex',
                            height: '38px',
                        }}
                    >
                        Source
                    </label>
                    <ButtonGroup style={{ height: '38px' }}>
                        <Button
                            variant={getBtnVariant(
                                selectedSource === SourceEnum.STREAM
                            )}
                            onClick={() => setSelectedSource(SourceEnum.STREAM)}
                        >
                            Stream
                        </Button>
                        <Button
                            variant={getBtnVariant(
                                selectedSource === SourceEnum.WEBCAM
                            )}
                            onClick={() => setSelectedSource(SourceEnum.WEBCAM)}
                        >
                            Webcam
                        </Button>
                        <Button
                            variant={getBtnVariant(
                                selectedSource === SourceEnum.IMAGE
                            )}
                            onClick={() => setSelectedSource(SourceEnum.IMAGE)}
                        >
                            Upload Image
                        </Button>
                    </ButtonGroup>
                </Row>
            </Col>
            <Col
                xs
                lg={6}
                style={{ display: 'flex', justifyContent: 'flex-end' }}
            >
                {selectedSource === SourceEnum.STREAM && (
                    <>
                        <FormControl
                            type="text"
                            placeholder="Stream URL (e.g. http://192.0.2.1:8000/stream.mp4)"
                            value={streamUrl}
                            onChange={(e) => setStreamUrl(e.target.value)}
                        />
                    </>
                )}
                {selectedSource === SourceEnum.WEBCAM && (
                    <Dropdown>
                        <Dropdown.Toggle variant="dark" id="dropdown-basic">
                            Browser Default Webcam
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">
                                Macintosh HD Webcam
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                )}
            </Col>
        </Row>
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
