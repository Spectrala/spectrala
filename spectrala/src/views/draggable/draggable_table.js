import React from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import { DraggableCell } from './draggable_cell';

function DraggableTable({
    list,
    getCell,
    getKey,
    onReorder,
    height,
    scrollable,
    itemType,
}) {
    function getCells() {
        return (
            <>
                <div style={{ height: '15px' }} />
                {list.map((ele, idx) => {
                    const cell = getCell(ele);
                    const key = getKey(ele, idx);

                    const moveCard = (dragIndex, hoverIndex) => {
                        const dragCard = list[dragIndex];
                        onReorder(
                            update(list, {
                                $splice: [
                                    [dragIndex, 1],
                                    [hoverIndex, 0, dragCard],
                                ],
                            })
                        );
                    };
                    return (
                        <DraggableCell
                            key={key}
                            id={key}
                            itemType={itemType}
                            cell={cell}
                            moveCard={moveCard}
                            index={idx}
                        />
                    );
                })}
            </>
        );
    }

    return (
        <>
            <div
                style={{
                    height: height,
                    overflowY: scrollable ? 'auto' : null,
                    width: '100%',
                }}
            >
                {getCells()}
            </div>
        </>
    );
}

DraggableTable.propTypes = {
    height: PropTypes.any,
    list: PropTypes.array.isRequired,
    getCell: PropTypes.func.isRequired,
    getKey: PropTypes.func.isRequired,
    onReorder: PropTypes.func.isRequired,
    itemType: PropTypes.string.isRequired,
    scrollable: PropTypes.bool,
};

DraggableTable.defaultProps = {
    height: '100%',
    scrollable: true,
};

export default DraggableTable;
