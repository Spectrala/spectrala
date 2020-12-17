import React, { useRef, useState } from 'react';
import { Alert, Card } from 'react-bootstrap';
import Camera from './camera';
import { PointContainer } from './draggable_points/Container';
import SourceSelect from './source_select';

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
                <SourceSelect
                    onChange={setVideoSrc}
                    setInSaveMode={setInSaveMode}
                    inSaveMode={inSaveMode}
                    saveOverlayTarget={saveOverlayTarget}
                />
            </Card.Header>
            {saturatedChannels.length > 0 && (
                <Alert variant={'warning'} style={{ marginBottom: '0px' }}>
                    Oversaturation in channel(s)
                    {saturatedChannels.map((e) => ChannelToText[e]).join(', ')}.
                    <Alert.Link>Learn more</Alert.Link>.
                </Alert>
            )}
            <PointContainer expectedHeight={height} showLine={!inSaveMode}>
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
            </PointContainer>
        </Card>
    );
};

export default CameraFrame;
