import React, { useRef, useState } from 'react';
import { Alert, Card } from 'react-bootstrap';
import Camera from './camera';
import { PointContainer } from './draggable_points/point_container';
import SourceSelect from './source_select';
import { cardStyle, cardHeaderStyle } from '../theme/styles';
import PropTypes from 'prop-types';
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

const CameraFrame = ({ showsLine, showsPoints }) => {
    // TODO: detect saturated channels in the SetInterval call
    const [saturatedChannels, _setSaturatedChannels] = useState([]);

    const [videoSrc, setVideoSrc] = useState(null);
    const [inSaveMode, setInSaveMode] = useState(false);
    const saveOverlayTarget = useRef(null);

    return (
        <Card style={cardStyle}>
            <Card.Header style={cardHeaderStyle} as="h5">
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
            <PointContainer expectedHeight={'500px'} showsLine={showsLine} showsPoints={showsPoints}>
                <Camera
                    props={{
                        styles: {
                            height: '100%',
                            width: '100%',
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

CameraFrame.propTypes = {
    showsLine: PropTypes.bool,
    showsPoints: PropTypes.bool,
};

export default CameraFrame;
