import React from 'react';
import {Button, Card, InputGroup, FormControl} from 'react-bootstrap';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

export default class VideoOptions extends React.Component {


    // Todo: handle this data, including saving it to user defaults

    state = {
        videoPreferences: {
            brightness:54,
            contrast:12,
            hue:93,
            saturation:50,
        },
        value: 44,
    }

    sliders = ["brightness","contrast","hue","saturation"]    

    titles = {
        "brightness":"Brightness",
        "contrast":"Contrast",
        "hue":"Hue",
        "saturation":"Saturation",
    }



    handleChange = (x) => {
        this.setState({value: x})
    }


    sliderControl = (idx, property) => {
        const value = this.state.videoPreferences[property]
        const title = this.titles[property]
        console.log(idx)
        return (
            <div style={{height:"100%", paddingLeft:"15px", paddingRight:"15px"}} key={idx}>
                <label style={{paddingTop:"10px"}}>{title}</label>
                <Slider animation={false} onChange={(x) => {this.setState({property: x})}} value={value}/>
            </div>
        )
    }

    getSliders = () => {
        return (
            <>
            {this.sliders.map((property, idx) => this.sliderControl(idx, property)) }
            </>
        )
    }

    render() {
        const {value} = this.state
        return (
            <Card style={{height:"100%"}}>
                <Card.Header as="h5" style={{height:"64px", justifyContent:"space-between", alignItems:'center',display:'flex',paddingLeft:"15px",paddingRight:"15px"}}>Adjustments
                    <Button variant='outline-secondary'>Reset</Button>
                </Card.Header> 
                {this.getSliders()}
            </Card>
        )
    }
}
