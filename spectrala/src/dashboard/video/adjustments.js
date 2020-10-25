import React from 'react';
import {Button, Card} from 'react-bootstrap';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

export default class VideoOptions extends React.Component {


    // Todo: handle this data, including saving it to user defaults
    // Todo: left edge of control can go past 0. Looks bad given left alignment is strictly at 15px everywhere else.
    state = {
        videoPreferences: {
            brightness:54,
            contrast:12,
            hue:93,
            saturation:50,
        },
    }

    sliders = ["brightness","contrast","hue","saturation"]    

    titles = {
        "brightness":"Brightness",
        "contrast":"Contrast",
        "hue":"Hue",
        "saturation":"Saturation",
    }



    handleChange = (property, newValue) => {
        var preferences = this.state.videoPreferences
        preferences[property] = newValue
        this.setState({videoPreferences: preferences})
    }


    sliderControl = (idx, property) => {
        const value = this.state.videoPreferences[property]
        const title = this.titles[property]
        console.log(idx)
        return (
            <div style={{height:"100%", paddingLeft:"15px", paddingRight:"15px"}} key={idx}>
                <label style={{paddingTop:"10px"}}>{title}</label>
                <Slider onChange={(newValue) => this.handleChange(property, newValue)} value={value}/>
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
