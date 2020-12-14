import React from 'react';
import {
    InputGroup,
    Button,
    Form,
    Dropdown,
    DropdownButton,
} from 'react-bootstrap';
import { XCircle, Droplet } from 'react-bootstrap-icons';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import { useDispatch, useSelector } from 'react-redux';
import {
    renameSpectrum,
    selectRecordedSpectra,
    removeSpectrum,
    removeReference,
    setReference,
    downloadSpectrum,
    setRecordedSpectra,
} from '../../../reducers/spectrum';

import { ItemTypes } from '../../draggable/item_types';
import { DraggableCell } from '../../draggable/draggable_cell';
import { EditableCell } from './editable_cell';

export default function SpectrumControl({ height }) {
    const dispatch = useDispatch();
    const recordedSpectra = useSelector(selectRecordedSpectra);

    function getActionDropdown(spectrum, idx) {
        return (
            <DropdownButton
                title=""
                as={InputGroup.Append}
                variant="outline-secondary"
                id="collasible-nav-dropdown"
                key={`more_${idx}`}
            >
                <Dropdown.Item
                    key={'reference'}
                    onClick={() => {
                        spectrum.isReference
                            ? dispatch(removeReference())
                            : dispatch(setReference({ targetIndex: idx }));
                    }}
                >
                    {spectrum.isReference
                        ? 'Unset reference'
                        : 'Use as reference'}
                </Dropdown.Item>

                <Dropdown.Item
                    key={'download'}
                    onClick={() => {
                        dispatch(downloadSpectrum({ targetIndex: idx }));
                    }}
                >
                    Download as CSV
                </Dropdown.Item>

                <Dropdown.Divider />
                <Dropdown.Item
                    key={'delete'}
                    onClick={() => {
                        dispatch(
                            removeSpectrum({
                                targetIndex: idx,
                            })
                        );
                    }}
                >
                    Delete Spectrum
                </Dropdown.Item>
            </DropdownButton>
        );
    }

    function getCells() {
        return (
            <>
                <div style={{ height: '15px' }} />
                {recordedSpectra.map((spectrum, idx) => {
                    const dropdown = () => getActionDropdown(spectrum, idx);
                    const onTextEdit = (value) => {
                        dispatch(
                            renameSpectrum({
                                targetIndex: idx,
                                name: value,
                            })
                        );
                    };
                    const prepend = () => {
                        return spectrum.isReference ? (
                            <InputGroup.Text>
                                <Droplet
                                    style={{
                                        display: 'flex',
                                        alignSelf: 'flex-center',
                                    }}
                                />
                            </InputGroup.Text>
                        ) : null;
                    };
                    const text = spectrum.name ? spectrum.name : '';
                    const aria = `Saved Spectrum ${idx + 1}`;
                    const getCell = () => {
                        return (
                            <EditableCell
                                key={idx}
                                index={idx}
                                prepend={prepend}
                                text={text}
                                aria={aria}
                                dropdown={dropdown}
                                onTextEdit={onTextEdit}
                            />
                        );
                    };
                    const moveCard = (dragIndex, hoverIndex) => {
                        const dragCard = recordedSpectra[dragIndex];
                        dispatch(
                            setRecordedSpectra({
                                value: update(recordedSpectra, {
                                    $splice: [
                                        [dragIndex, 1],
                                        [hoverIndex, 0, dragCard],
                                    ],
                                }),
                            })
                        );
                    };
                    return (
                        <DraggableCell
                            key={spectrum.key}
                            id={spectrum.key}
                            itemType={ItemTypes.EDITABLE_CELL}
                            getCell={getCell}
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
            <div style={{ height: height, overflowY: 'auto', width: '100%' }}>
                {getCells()}
            </div>
        </>
    );
}

SpectrumControl.propTypes = {
    height: PropTypes.number,
};
