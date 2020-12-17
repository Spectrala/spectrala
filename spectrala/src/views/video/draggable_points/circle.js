import React, { memo } from 'react';
import theme from '../../theme/theme';
import { energies } from './point_ontainer';
const normalStyle = {
    cursor: 'move',
    display: 'flex',
    alignItems: 'center',
};

export const Circle = ({ energy, radius }) => {
    let color = '#FFF';
    if (energy === energies.HIGH) color = theme.HIGH_ENERGY_THUMBNAIL;
    if (energy === energies.LOW) color = theme.LOW_ENERGY_THUMBNAIL;
    const strokeWidth = 2;

    return (
        <div style={normalStyle}>
            {
                <svg
                    height={(radius + strokeWidth) * 2}
                    width={(radius + strokeWidth) * 2}
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <ellipse
                        cx={radius + strokeWidth}
                        cy={radius + strokeWidth}
                        rx={radius}
                        ry={radius}
                        fill={color}
                        stroke={theme.CAMERA_LINE_COLOR}
                        strokeWidth={strokeWidth}
                    />
                </svg>
            }
        </div>
    );
};

export const CircleDragPreview = memo(({ energy, radius }) => {
    return <Circle energy={energy} radius={radius} />;
});

export default null;
