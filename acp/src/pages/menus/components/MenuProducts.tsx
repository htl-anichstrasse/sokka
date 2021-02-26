import React, { useState } from 'react';
import { CardColumns } from 'react-bootstrap';
import AddProductToMenuButton from './AddProductToMenuButton';
import MenuProductEntry from './MenuProductEntry';

interface MenuProductsProps {
    menu: Menu
    onChange: (val: MenuEntry[]) => void
    default: MenuEntry[]
}

function MenuProducts(props: MenuProductsProps) {
    let [entries, setEntries] = useState(props.default);
    let changeCallback = (entry: MenuEntry): void => {
        let filteredEntries = entries.filter((e) => e.id !== entry.id);
        filteredEntries.push(entry);
        props.onChange(filteredEntries);
        setEntries(filteredEntries);
    };
    let deleteCallback = (entry: MenuEntry): void => {
        let filteredEntries = entries.filter((e) => e.id !== entry.id);
        props.onChange(filteredEntries);
        setEntries(filteredEntries);
    }
    let addCallback = (entry: MenuEntry): void => {
        let newEntries = [...entries];
        newEntries.push(entry);
        props.onChange(newEntries);
        setEntries(newEntries);
    }
    let content;
    if (entries.length === 0) {
        content = (<h3 className="text-muted mt-4 mb-4">There are no products in this menu yet</h3>);
    } else {
        let entriesDOM = entries.map((entry) => <MenuProductEntry key={entry.id} menu={props.menu} menuEntry={entry} onChange={changeCallback} onDelete={deleteCallback} />);
        content = (<CardColumns>
            {entriesDOM}
        </CardColumns>);
    }
    return <>
        {content}
        <AddProductToMenuButton menu={props.menu} onAdd={addCallback} />
    </>;
}

export default MenuProducts;