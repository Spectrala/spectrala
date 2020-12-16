import React, { useState, useRef, useEffect } from 'react';
import { useDragLayer } from 'react-dnd';
import { ItemTypes } from '../../draggable/item_types';
import { BoxDragPreview } from './Box';
import { toPct } from './DraggableBox';
const layerStyles = {
    position: 'fixed',
    pointerEvents: 'none',
    zIndex: 100,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
};

function getItemStyles(initialOffset, currentOffset, width, height) {
    if (!initialOffset || !currentOffset) {
        return {
            display: 'none',
        };
    }
    let { x, y } = currentOffset;
    const transform = `translate(${toPct(x/width)}, ${toPct(y/height)})`;
    return {
        transform,
        WebkitTransform: transform,
    };
}
export const CustomDragLayer = ({ props }) => {
    const {
        itemType,
        isDragging,
        item,
        initialOffset,
        currentOffset,
        radius,
    } = props;

    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const cont = useRef(null);
    useEffect(() => {
        if (cont.current) {
            setWidth(cont.current.clientWidth);
            setHeight(cont.current.clientHeight);
        }
    });

    function renderItem() {
        switch (itemType) {
            case ItemTypes.BOX:
                return <BoxDragPreview energy={item.energy} radius={radius} />;
            default:
                return null;
        }
    }
    if (!isDragging) {
        return null;
    }
    return (
        <div ref={cont} style={layerStyles}>
            <div style={getItemStyles(initialOffset, currentOffset, width, height)}>
                {renderItem()}
            </div>
        </div>
    );
};

export default null;
