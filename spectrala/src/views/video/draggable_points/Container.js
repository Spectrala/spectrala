import React, { useCallback, useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop, useDragLayer } from 'react-dnd';
import { ItemTypes } from '../../draggable/item_types';
import { DraggableBox, toPct } from './DraggableBox';
import update from 'immutability-helper';
import { CustomDragLayer } from './CustomDragLayer';
import { withResizeDetector } from 'react-resize-detector';
import {selectLineCoords, updateAllLineCoords} from '../../../reducers/video'

const styles = {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    position: 'relative',
    zIndex: 100,
    top: 0,
    bottom: 0,
};
function renderBox(item, key, radius, containerWidth, containerHeight) {
    return (
        <DraggableBox
            key={key}
            id={key}
            radius={radius}
            containerWidth={containerWidth}
            containerHeight={containerHeight}
            {...item}
        />
    );
}
function renderLine(points) {
    return (
        <svg height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
            <line
                x1={toPct(points.x1)}
                y1={toPct(points.y1)}
                x2={toPct(points.x2)}
                y2={toPct(points.y2)}
                stroke="yellow"
                strokeWidth={3}
            />
        </svg>
    );
}

// TODO: Clean up code. boxes constant shouldn't exist. A lot of redundancies here.
const ContainerWithoutResize = ({ children, expectedHeight, targetRef, showLine }) => {
    const radius = 10;

    const dispatch = useDispatch();
    const calibCoords = useSelector(selectLineCoords);

    const setBoxes = (res) => {
        dispatch(
            updateAllLineCoords({
                value: {
                    lowX: res.lowEnergyPointer.left,
                    lowY: res.lowEnergyPointer.top,
                    highX: res.highEnergyPointer.left,
                    highY: res.highEnergyPointer.top,
                },
            })
        );
    };

    const boxes = () => {
        return {
            highEnergyPointer: {
                top: calibCoords.highY,
                left: calibCoords.highX,
                energy: 'High energy (Blue)',
            },
            lowEnergyPointer: {
                top: calibCoords.lowY,
                left: calibCoords.lowX,
                energy: 'Low energy (Red)',
            },
        };
    };
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const cont = useRef(null);
    useEffect(() => {
        setWidth(cont.current.clientWidth);
        setHeight(cont.current.clientHeight);
    });

    const {
        itemType,
        isDragging,
        item,
        initialOffset,
        currentOffset,
        differentialOffset,
    } = useDragLayer((monitor) => ({
        item: monitor.getItem(),
        itemType: monitor.getItemType(),
        initialOffset: monitor.getInitialSourceClientOffset(),
        currentOffset: monitor.getSourceClientOffset(),
        isDragging: monitor.isDragging(),
        differentialOffset: monitor.getDifferenceFromInitialOffset(),
    }));

    const getLine = () => {
        let pts = {
            lowEnergyPointer: {
                x: boxes().lowEnergyPointer.left,
                y: boxes().lowEnergyPointer.top,
            },
            highEnergyPointer: {
                x: boxes().highEnergyPointer.left,
                y: boxes().highEnergyPointer.top,
            },
        };

        if (isDragging && currentOffset && Object.keys(pts).includes(item.id)) {
            const dx = differentialOffset.x / width;
            const dy = differentialOffset.y / height;
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
                update(boxes(), {
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
            let left = item.left + delta.x / width;
            let top = item.top + delta.y / height;
            moveBox(item.id, left, top);
            return undefined;
        },
    });

    const getDraggableLine = () => {
        if (!showLine) return;
        return (
            <><div ref={targetRef} />
            <div ref={drop} style={styles}>
                {Object.keys(boxes()).map((key) =>
                    renderBox(boxes()[key], key, radius, width, height)
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
                    radius,
                }}
            /></>
        )
    }

    return (
        <div
            ref={cont}
            style={{ height: expectedHeight, position: 'relative' }}
        >
            {getDraggableLine()}
            {children}
        </div>
    );
};

export const Container = withResizeDetector(ContainerWithoutResize);
