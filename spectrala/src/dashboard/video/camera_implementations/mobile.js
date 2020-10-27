import React from 'react';
import PropTypes from 'prop-types';


export default class MobileView extends React.Component {


    // Note: ip and port are unverified, may be invalid or empty strings. 
    componentDidMount() {

    }

    /**
     * TODO: return the real image, not the label
     * The parameter this.props.height is supposed to dictate the height of the camera view. 
     * This seems like a workaround; looking for a better solution. 
     */
    render() {
        return <label style={{height: this.props.height}}>{`Streaming from ip (${this.props.ip}) and port (${this.props.port}) `}</label>
    }


}

/**
 * Props: 
 *  ip (string) -- the IP address of the stream (unchecked, could be any string)
 *  port (string) -- the port of the stream (unchecked, could be any string)
 *  height (number) -- the expected height of the view
 */
MobileView.propTypes = {
    ip: PropTypes.string,
    port: PropTypes.string,
    height: PropTypes.number,
    onChange: PropTypes.func,
    // lowEnergy: PropTypes.object,
    // highEnergy: PropTypes.object,
}


/**
 * Do we want this?
 * lowEnergy: {
 *   xpct: float
 *   ypct: float
 * }
 * 
 */