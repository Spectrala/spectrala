import React, { useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../../draggable/item_types';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { Circle } from './circle';

export function toPct(decimal) {
    return `${decimal * 100}%`;
}

function getStyles(left, top, isDragging, containerWidth, containerHeight, radius) {
    const x = Math.round(left * containerWidth) - radius;
    const y = Math.round(top * containerHeight) - radius;
    const transform = `translate3d(${x}px, ${y}px, 0)`;
    return {
        position: 'absolute',
        transform,
        WebkitTransform: transform,
        // IE fallback: hide the real node using CSS when dragging
        // because IE will ignore our custom "empty image" drag preview.
        opacity: isDragging ? 0 : 1,
        height: isDragging ? 0 : '',
    };
}
export const DraggableCircle = (props) => {
    const {
        id,
        energy,
        left,
        top,
        radius,
        containerWidth,
        containerHeight,
    } = props;
    const [{ isDragging }, drag, preview] = useDrag({
        item: { type: ItemTypes.BOX, id, left, top, energy },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    useEffect(() => {
        preview(getEmptyImage(), { captureDraggingState: true });
    }, [preview]);
    return (
        <div
            ref={drag}
            style={getStyles(
                left,
                top,
                isDragging,
                containerWidth,
                containerHeight,
                radius
            )}
        >
            <Circle energy={energy} radius={radius} />
        </div>
    );
};
