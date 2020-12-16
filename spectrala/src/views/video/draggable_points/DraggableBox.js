import React, { useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../../draggable/item_types';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { Box } from './Box';
function getStyles(left, top, isDragging) {
    const transform = `translate3d(${left}px, ${top}px, 0)`;
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
export const DraggableBox = (props) => {
    const { id, energy, left, top, radius } = props;
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
        <div ref={drag} style={getStyles(left, top, isDragging)}>
            <Box energy={energy} radius={radius}/>
        </div>
    );
};
