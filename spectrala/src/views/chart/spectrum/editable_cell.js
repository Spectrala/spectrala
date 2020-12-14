import React from 'react';
import {
    InputGroup,
    Button,
    Form,
    Dropdown,
    DropdownButton,
} from 'react-bootstrap';
import { ItemTypes } from '../../draggable/item_types';

const style = {
    paddingLeft: '15px',
    paddingRight: '15px',
    display: 'flex',
};

export const EditableCell = ({
    index,
    prepend,
    text,
    aria,
    dropdown,
    onTextEdit,
}) => {
    return (
        <Form className="mb-3" key={`${index}`} style={style}>
            <InputGroup>
                <InputGroup.Prepend>{prepend()}</InputGroup.Prepend>

                <Form.Control
                    value={text}
                    aria-label={aria}
                    aria-describedby="basic-addon2"
                    onChange={(event) => onTextEdit(event.target.value)}
                />

                <InputGroup.Append>{dropdown()}</InputGroup.Append>
            </InputGroup>
        </Form>
    );
};
