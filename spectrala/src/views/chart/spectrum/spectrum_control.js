import React, { useCallback } from 'react';
import { InputGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import { Droplet } from 'react-bootstrap-icons';
import PropTypes from 'prop-types';
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
import { EditableCell } from './editable_cell';
import DraggableTable from '../../draggable/draggable_table';

export default function SpectrumControl({ height }) {
    const dispatch = useDispatch();
    const recordedSpectra = useSelector(selectRecordedSpectra);

    const getActionDropdown = useCallback(
        (spectrum, idx) => {
            return (
                <DropdownButton
                    title=""
                    as={InputGroup.Append}
                    variant="outline-secondary"
                    id="collasible-nav-dropdown"
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
        },
        [dispatch]
    );

    const prepend = useCallback((spectrum) => {
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
    }, []);

    const onTextEdit = useCallback(
        (value, idx) => {
            dispatch(
                renameSpectrum({
                    targetIndex: idx,
                    name: value,
                })
            );
        },
        [dispatch]
    );

    const getCell = useCallback(
        (spectrum, idx) => {
            const text = spectrum.name ? spectrum.name : '';
            const aria = `Saved Spectrum ${idx + 1}`;

            return (
                <EditableCell
                    key={idx}
                    index={idx}
                    prepend={prepend(spectrum)}
                    text={text}
                    aria={aria}
                    append={getActionDropdown(spectrum, idx)}
                    onTextEdit={(value) => onTextEdit(value, idx)}
                />
            );
        },
        [prepend, getActionDropdown, onTextEdit]
    );

    const getKey = (spectrum) => spectrum.key;

    const onReorder = (list) => {
        dispatch(
            setRecordedSpectra({
                value: list,
            })
        );
    };

    return (
        <DraggableTable
            height={height}
            list={recordedSpectra}
            getCell={getCell}
            getKey={getKey}
            onReorder={onReorder}
            itemType={ItemTypes.EDITABLE_CELL}
        />
    );
}

SpectrumControl.propTypes = {
    height: PropTypes.number,
};
