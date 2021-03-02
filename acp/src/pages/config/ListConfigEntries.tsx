import React, { ChangeEvent, FunctionComponent, useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { sendRequest } from '../../Util';

interface ListConfigEntriesProps {

}

const ListConfigEntries: FunctionComponent<ListConfigEntriesProps> = (props) => {
    let [configEntries, setConfigEntries] = useState([] as ConfigEntry[]);
    let [changedEntries, setChangedEntries] = useState([] as string[]);
    const load = () => {
        sendRequest('/acp/config/get', 'GET', true, {}).then((result) => {
            setConfigEntries(result.data.configEntries);
        });
    };

    // Called whenever a value gets changed and needs to be updated
    const onChange = (configEntry: ConfigEntry) => {
        let entries = [...changedEntries, configEntry.key];
        setChangedEntries(entries);
    }

    // Click handler for submit button, performs an update API request
    const onSubmit = () => {
        Promise.all(configEntries.filter((entry) => changedEntries.includes(entry.key)).map((configEntry) => sendRequest('/acp/config/update', 'POST', true, { ...configEntry }))).then((values) => {
            if (values.some((response) => !response.data.success)) {
                alert('Could not update config entries');
            } else {
                alert('Config entries updated');
            }
        });
    }

    // Initially load data from API
    if (configEntries.length <= 0) {
        load();
        return (<Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
        </Spinner>);
    }

    // Loop over received data and create and array of config entries
    let entries = [];
    for (let configEntry of configEntries) {
        entries.push(
            <div key={configEntry.key} className="row config-value-row">
                <div className="col-7 config-name-col">
                    <span className="config-friendly-name">{configEntry.friendlyName}</span> <pre className="config-key">({configEntry.key})</pre>
                </div>
                <div className="col-md-4 col-sm-5 config-val-col">
                    <ConfigValueInput changeHandler={(entry: any) => onChange(entry)} configEntry={configEntry} />
                </div>
            </div>
        );
    }

    // Add entries and submit button to DOM
    return (<div className="configValues">
        {entries}
        <Button className="mb-sm-0 mb-4" color="secondary" onClick={() => onSubmit()}>Save changes</Button>
    </div>);
}

function ConfigValueInput(props: any) {
    let inputNode: JSX.Element;
    const handleChange = (event: ChangeEvent) => {
        let target: HTMLInputElement = event.target as HTMLInputElement;
        let configEntry: ConfigEntry = props.configEntry;
        configEntry.value = target.value;
        props.changeHandler(configEntry);
    }
    switch (props.configEntry.type) {
        case 'TIME':
            inputNode = <input onChange={(event) => handleChange(event)} type="time" id={`config-input-node-${props.configEntry.key}`} name={props.configEntry.key} defaultValue={props.configEntry.value} />;
            break;
        case 'STRING':
            inputNode = <input onChange={(event) => handleChange(event)} type="text" id={`config-input-node-${props.configEntry.key}`} name={props.configEntry.key} defaultValue={props.configEntry.value} />;
            break;
        default:
            inputNode = <div>{props.configEntry.value}</div>;
    }
    return (<div className="config-value-input">
        {inputNode}
    </div>);
}

export default ListConfigEntries;