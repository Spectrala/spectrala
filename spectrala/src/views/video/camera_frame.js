import React, { useState, useCallback, useRef } from 'react';
import { Container } from './draggable_points/Container';
import Camera from './camera';

import {
    Button,
    Col,
    Card,
    Row,
    Alert,
    Overlay,
    Popover,
} from 'react-bootstrap';
import SourceSelect from './source_select';
import LineSelector from './line_selector';
import { CameraFill } from 'react-bootstrap-icons';

const ChannelEnum = {
    RED: 'CHANNEL_RED',
    GREEN: 'CHANNEL_GREEN',
    BLUE: 'CHANNEL_BLUE',
};

const ChannelToText = {
    [ChannelEnum.RED]: 'Red',
    [ChannelEnum.GREEN]: 'Green',
    [ChannelEnum.BLUE]: 'Blue',
};

const CameraFrame = ({ height }) => {
    // TODO: detect saturated channels in the SetInterval call
    const [saturatedChannels, _setSaturatedChannels] = useState([]);

    const [videoSrc, setVideoSrc] = useState(null);
    const [inSaveMode, setInSaveMode] = useState(false);
    const saveOverlayTarget = useRef(null);

    return (
        <Card>
            <Card.Header as="h5">
                <SourceSelect onChange={setVideoSrc} />
            </Card.Header>
            {saturatedChannels.length > 0 && (
                <Alert variant={'warning'} style={{ marginBottom: '0px' }}>
                    Oversaturation in channel(s)
                    {saturatedChannels.map((e) => ChannelToText[e]).join(', ')}.
                    <Alert.Link>Learn more</Alert.Link>.
                </Alert>
            )}
            <Container expectedHeight={height}>
                <Camera
                    props={{
                        styles: {
                            height,
                            position: 'absolute',
                            top: 0,
                            bottom: 0,
                        },
                        videoSrc,
                        inSaveMode,
                    }}
                />
            </Container>

            <Card.Footer>
                <Row style={{ display: 'flex' }}>
                    <LineSelector />
                    <Col
                        xl={2}
                        lg={2}
                        md={12}
                        sm={12}
                        xs={12}
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                        }}
                    >
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
                                    Right-click the preview and select "Save
                                    image as..." Click again when you are done
                                    to re-enable the overlay.
                                </Popover.Content>
                            </Popover>
                        </Overlay>
                    </Col>
                </Row>
            </Card.Footer>
        </Card>
    );
};

export default CameraFrame;
