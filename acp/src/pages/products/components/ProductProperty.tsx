import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';

enum ProductPropertyType {
    String = 0,
    Image = 1,
    Currency = 2,
    Number = 3,
    Boolean = 4,
    Enum = 5
}

interface ProductPropertyProps {
    onChange: (val: any) => void
    name: string
    type: ProductPropertyType
    default: any
    selection?: any[]
}

function ProductProperty(props: ProductPropertyProps) {
    let input;
    let [value, setValue] = React.useState(props.default);

    const updateValue = (value: any) => {
        props.onChange(value);
        setValue(isNaN(value) ? String(value) : value);
    }

    switch (props.type) {
        case ProductPropertyType.String:
            input = <>
                <Form.Label column sm={2}>
                    {props.name}
                </Form.Label>
                <Col sm={10}>
                    <Form.Control type="text" value={value} onChange={(e) => updateValue(e.target.value)}></Form.Control>
                </Col>
            </>;
            break;
        case ProductPropertyType.Image:
            input = <>
                <Form.Label column sm={2}>
                    {props.name}
                </Form.Label>
                <Col sm={10}>
                    <Form.File onChange={(e: any) => {
                        let file = e.target.files[0];
                        if (!file.type.startsWith('image/')) {
                            e.target.value = '';
                            alert('Invalid file type');
                            return;
                        }
                        if (file.size > 1000000) {
                            e.target.value = '';
                            alert('File is too large (max 1 MB)');
                            return;
                        }
                        let reader = new FileReader();
                        reader.onload = function (le) {
                            if (le.target) {
                                updateValue(le.target.result);
                            }
                        }
                        reader.readAsDataURL(file);
                    }} />
                    <img src={value} width="50px" id={`file-result-${props.name}`}></img>
                </Col>
            </>;
            break;
        case ProductPropertyType.Currency:
            input = <>
                <Form.Label column sm={2}>
                    {props.name}
                </Form.Label>
                <Col sm={10}>
                    <Form.Control min="0" type="number" step=".01" value={value} onChange={(e) => updateValue(parseFloat(e.target.value))}></Form.Control>
                </Col>
            </>;
            break;
        case ProductPropertyType.Number:
            input = <>
                <Form.Label column sm={2}>
                    {props.name}
                </Form.Label>
                <Col sm={10}>
                    <Form.Control min="0" type="number" value={value} onChange={(e) => updateValue(parseInt(e.target.value))}></Form.Control>
                </Col>
            </>;
            break;
        case ProductPropertyType.Boolean:
            input = <>
                <Col sm={2}><Form.Check
                    id={`boolean-check-${props.name}`}
                    type="switch"
                    label={props.name}
                    defaultChecked={value}
                    onChange={(e) => updateValue(e.target.checked)}
                /></Col>
            </>;
            break;
        case ProductPropertyType.Enum:
            if (!props.selection) {
                return <span>No options defined</span>;
            }
            let options = props.selection.map((v) => <option key={v.id} value={v.id}>{v.name}</option>);
            input = <>
                <Form.Label column sm={2}>
                    {props.name}
                </Form.Label>
                <Col sm={10}>
                    <Form.Control value={value} as="select" onChange={(e) => updateValue(parseInt(e.target.value))}>
                        {options}
                    </Form.Control>
                </Col>
            </>;
            break;
    }
    return (<Form.Group as={Row}>
        {input}
    </Form.Group>);
}

export { ProductProperty, ProductPropertyType };

