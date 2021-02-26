import { Form } from "react-bootstrap";
import { InputProperty, InputPropertyType } from "../../../components/InputProperty";
import { getBaseURL } from "../../../Util";

interface ProductPropertiesProps {
    values: any,
    product: Product
    categories: ProductCategory[]
}

function ProductProperties(props: ProductPropertiesProps) {
    return (
        <Form>
            <InputProperty onChange={(val) => props.values['name'] = val} name="Name" type={InputPropertyType.String} default={props.product.name}></InputProperty>
            <InputProperty onChange={(val) => props.values['price'] = val} name="Price" type={InputPropertyType.Currency} default={props.product.price}></InputProperty>
            <InputProperty onChange={(val) => props.values['category_id'] = val} name="Category" type={InputPropertyType.Enum} default={props.product.category_id} selection={props.categories}></InputProperty>
            <InputProperty onChange={(val) => props.values['hidden'] = val} name="Hidden" type={InputPropertyType.Boolean} default={props.product.hidden}></InputProperty>
            <InputProperty onChange={(val) => props.values['image_id'] = val} name="Image" type={InputPropertyType.Image} default={`${getBaseURL()}/image?id=${props.product.image_id}`}></InputProperty>
        </Form>
    )
}

export default ProductProperties;