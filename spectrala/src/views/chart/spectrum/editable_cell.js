import React from 'react';
import {
    InputGroup,
    Form,
} from 'react-bootstrap';

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
    append,
    onTextEdit,
}) => {
    return (
        <Form className="mb-3" key={`${index}`} style={style}>
            <InputGroup>
                <InputGroup.Prepend>{prepend}</InputGroup.Prepend>

                <Form.Control
                    value={text}
                    aria-label={aria}
                    aria-describedby="basic-addon2"
                    onChange={(event) => onTextEdit(event.target.value)}
                />

                <InputGroup.Append>{append}</InputGroup.Append>
            </InputGroup>
        </Form>
    );
};
