import React from 'react';
// import placeholder from './rainbow_placeholder.jpg';
import PropTypes from 'prop-types';


export default class WebcamView extends React.Component {
    render() {
      return <label style={{height: this.props.height}}>Webcam here</label>
        // return <img src={placeholder} style={{height: this.props.height}} alt={"Dummy spectral graph"}/>
    }
}

WebcamView.propTypes = {
  height: PropTypes.number
}
