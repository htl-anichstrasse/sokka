import { Form } from "react-bootstrap";
import { getBaseURL } from "../../../Util";
import { ProductProperty, ProductPropertyType } from "./ProductProperty";

interface ProductPropertiesProps {
    values: any,
    product: Product
    categories: ProductCategory[]
}

function ProductProperties(props: ProductPropertiesProps) {
    return (
        <Form>
            <ProductProperty onChange={(val) => props.values['name'] = val} name="Name" type={ProductPropertyType.String} default={props.product.name}></ProductProperty>
            <ProductProperty onChange={(val) => props.values['price'] = val} name="Price" type={ProductPropertyType.Currency} default={props.product.price}></ProductProperty>
            <ProductProperty onChange={(val) => props.values['category_id'] = val} name="Category" type={ProductPropertyType.Enum} default={props.product.category_id} selection={props.categories}></ProductProperty>
            <ProductProperty onChange={(val) => props.values['hidden'] = val} name="Hidden" type={ProductPropertyType.Boolean} default={props.product.hidden}></ProductProperty>
            <ProductProperty onChange={(val) => props.values['image_id'] = val} name="Image" type={ProductPropertyType.Image} default={`${getBaseURL()}/image?id=${props.product.image_id}`}></ProductProperty>
        </Form>
    )
}

export default ProductProperties;