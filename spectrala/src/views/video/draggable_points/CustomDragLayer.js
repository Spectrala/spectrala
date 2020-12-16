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

function getItemStyles(initialOffset, currentOffset) {
    if (!initialOffset || !currentOffset) {
        return {
            display: 'none',
        };
    }
    let { x, y } = currentOffset;
    const transform = `translate3d(${x}px, ${y}px, 0)`;
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
        <div style={layerStyles}>
            <div style={getItemStyles(initialOffset, currentOffset)}>
                {renderItem()}
            </div>
        </div>
    );
};

export default null;
