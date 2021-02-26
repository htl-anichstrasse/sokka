import React, { useState } from 'react';
import { Form, Spinner } from "react-bootstrap";
import { InputProperty, InputPropertyType } from "../../../components/InputProperty";
import { getBaseURL, sendRequest } from "../../../Util";
import MenuProducts from "./MenuProducts";

interface MenuPropertiesProps {
    values: any,
    menu: Menu
    categories: MenuCategory[]
}

function MenuProperties(props: MenuPropertiesProps) {
    const [state, setState] = useState({
        loaded: false,
        entries: [] as MenuEntry[]
    });
    const load = () => {
        Promise.all([sendRequest(`/acp/product/get?id=${props.menu.entries.map((entry) => entry.product_id).join(',')}`, 'GET', true, {}), sendRequest(`/acp/menu/title/get`, 'GET', true, {})]).then((response) => {
            if (response[0].data.success && response[1].data.success) {
                let menuEntries = [];
                for (let menuEntry of props.menu.entries) {
                    menuEntries.push({
                        id: menuEntry.id,
                        product: response[0].data.products.filter((product: Product) => product.id === menuEntry.product_id)[0],
                        menu: props.menu,
                        title: response[1].data.menutitles.filter((menuTitle: MenuTitle) => menuTitle.id === menuEntry.title_id)[0]
                    });
                }
                setState({
                    loaded: true,
                    entries: menuEntries
                });
            } else {
                alert(`The API returned an error: ${response[0].data.success ? '-' : response[0].data.message} / ${response[1].data.success ? '-' : response[1].data.message}`);
            }
        });
    };
    const onProductsChange = (val: MenuEntry[]) => {
        let newEntries: RawMenuEntry[] = [];
        for (let entry of val) {
            newEntries.push({
                id: entry.id,
                product_id: entry.product.id,
                menu_id: entry.menu.id,
                title_id: entry.title.id
            });
        }
        props.values['entries'] = newEntries;
    }

    if (state.loaded) {
        return (
            <Form>
                <InputProperty onChange={(val) => props.values['name'] = val} name="Name" type={InputPropertyType.String} default={props.menu.name}></InputProperty>
                <InputProperty onChange={(val) => props.values['price'] = val} name="Price" type={InputPropertyType.Currency} default={props.menu.price}></InputProperty>
                <InputProperty onChange={(val) => props.values['category_id'] = val} name="Category" type={InputPropertyType.Enum} default={props.menu.category_id} selection={props.categories}></InputProperty>
                <InputProperty onChange={(val) => props.values['image_id'] = val} name="Image" type={InputPropertyType.Image} default={`${getBaseURL()}/image?id=${props.menu.image_id}`}></InputProperty>
                <MenuProducts onChange={onProductsChange} default={state.entries} menu={props.menu} />
            </Form>
        );
    } else {
        load();
        return (<Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
        </Spinner>);
    }
}

export default MenuProperties;