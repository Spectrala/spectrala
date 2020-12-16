import React, { memo } from 'react';

const normalStyle = {
    cursor: 'move',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

export const Box = ({ title, radius }) => {
    return (
        <div style={{ ...normalStyle }}>
            <svg
                height={radius * 2}
                width={radius * 2}
                xmlns="http://www.w3.org/2000/svg"
            >
                <ellipse cx={radius} cy={radius} rx={radius} ry={radius} />
            </svg>
        </div>
    );
};

const dragStyle = {
    display: 'inline-block',
    alignItems: 'center',
};

export const BoxDragPreview = memo(({ energy, radius }) => {
    return (
        <div style={dragStyle}>
            <Box radius={radius}/>
            {/* <label >{energy}</label> */}
        </div>
    );
});

export default Box;
