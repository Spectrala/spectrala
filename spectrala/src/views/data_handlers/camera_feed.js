/**
 * This is a class that will be responsible for serving arrays
 * representing pixels across a line of interest.
 */

export default class CameraFeed {
    constructor(refreshRate, onChange) {
        this.refreshRate = refreshRate;
        this.intensities = [];
        this.listeners = [onChange];
        this.mustUpdate = false;
        this.refreshInterval = setInterval(() => {
            this.refresh();
        }, this.refreshRate * 1000);
    }

    refresh = () => {
        if (this.mustUpdate) {
            this.listeners.forEach((listener) => {
                listener();
            });
        }
    };

    addListener = (func) => {
        this.listeners.push(func);
    };

    onChange = () => {
        this.mustUpdate = true;
    };

    processRawData = (raw) => {
        this.intensities = raw.map((obj) => {
            return (obj.r + obj.g + obj.b) / 3 / 2.55;
        });
        this.onChange();
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
