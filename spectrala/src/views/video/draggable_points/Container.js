import React, { useCallback, useState } from 'react';
import { useDrop, useDragLayer } from 'react-dnd';
import { ItemTypes } from '../../draggable/item_types';
import { DraggableBox } from './DraggableBox';
import update from 'immutability-helper';
import { CustomDragLayer } from './CustomDragLayer';

const styles = {
    width: "100%",
    height: "100%",
    border: '1px solid black',
    position: 'relative',
};
function renderBox(item, key, radius) {
    return <DraggableBox key={key} id={key} radius={radius} {...item} />;
}
function renderLine(points) {
    return (
        <svg height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
            <line
                x1={points.x1}
                y1={points.y1}
                x2={points.x2}
                y2={points.y2}
                stroke="black"
            />
        </svg>
    );
}
const Container = () => {
    const radius = 10;
    const [boxes, setBoxes] = useState({
        highEnergyPointer: { top: 10, left: 10, energy: 'High energy (Blue)' },
        lowEnergyPointer: { top: 10, left: 80, energy: 'Low energy (Red)' },
    });
    const {
        itemType,
        isDragging,
        item,
        initialOffset,
        currentOffset,
    } = useDragLayer((monitor) => ({
        item: monitor.getItem(),
        itemType: monitor.getItemType(),
        initialOffset: monitor.getInitialSourceClientOffset(),
        currentOffset: monitor.getSourceClientOffset(),
        isDragging: monitor.isDragging(),
    }));

    const getLine = () => {
        let pts = {
            lowEnergyPointer: {
                x: boxes.lowEnergyPointer.left + radius,
                y: boxes.lowEnergyPointer.top + radius,
            },
            highEnergyPointer: {
                x: boxes.highEnergyPointer.left + radius,
                y: boxes.highEnergyPointer.top + radius,
            },
        };

        if (isDragging && currentOffset && Object.keys(pts).includes(item.id)) {
            const dx = currentOffset.x - initialOffset.x;
            const dy = currentOffset.y - initialOffset.y;
            pts[item.id] = { x: pts[item.id].x + dx, y: pts[item.id].y + dy };
        }
        const ends = Object.values(pts);
        return renderLine({
            x1: ends[0].x,
            y1: ends[0].y,
            x2: ends[1].x,
            y2: ends[1].y,
        });
    };

    const moveBox = useCallback(
        (id, left, top) => {
            setBoxes(
                update(boxes, {
                    [id]: {
                        $merge: { left, top },
                    },
                })
            );
        },
        [boxes]
    );
    const [, drop] = useDrop({
        accept: ItemTypes.BOX,
        drop(item, monitor) {
            const delta = monitor.getDifferenceFromInitialOffset();
            let left = Math.round(item.left + delta.x);
            let top = Math.round(item.top + delta.y);
            moveBox(item.id, left, top);
            return undefined;
        },
    });
    return (
        <div>
            <div ref={drop} style={styles}>
                {Object.keys(boxes).map((key) =>
                    renderBox(boxes[key], key, radius)
                )}
                {getLine()}
            </div>
            <CustomDragLayer
                props={{
                    itemType,
                    isDragging,
                    item,
                    initialOffset,
                    currentOffset,
                    radius
                }}
            />
        </div>
    );
};

/*

const CameraFrame = () => {
    return (
        <div>
            <Container />
            <CustomDragLayer />
        </div>
    );
};

*/

export default Container;
