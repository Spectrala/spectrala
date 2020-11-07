/**
 * This is a class that will be responsible for serving arrays
 * representing pixels across a line of interest.
 */

export default class CameraFeed {
    constructor(refreshRate, onChange) {
        this.refreshRate = refreshRate;
        this.intensities = [];
        this.onChange = onChange;
    }

    processRawData = (raw) => {
        console.log('PROCESS RAW DATA');
        console.log(raw);
        this.intensities = raw.map((obj) => {
            return (obj.r + obj.g + obj.b) / 3;
        });
    };

    getChartData = () => {
        return [
            {
                id: 'spectrum',
                color: '#00873E',
                data: this.intensities.map((y, idx) => {
                    return {
                        x: idx / (this.intensities.length - 1),
                        y: y,
                    };
                }),
            },
        ];
    };
}
