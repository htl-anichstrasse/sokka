import React, { ChangeEvent, FunctionComponent, useState } from 'react';
import { Button } from 'react-bootstrap';
import { sendRequest } from '../../Util';

interface ListConfigValuesComponentProps {

}

const ListConfigValuesComponent: FunctionComponent<ListConfigValuesComponentProps> = (props) => {
    let [configData, setConfigData] = useState([] as ConfigEntry[]);
    let [changedEntries, setChangedEntries] = useState([] as string[]);
    const load = () => {
        sendRequest('/acp/getconfig', 'GET', true, {}).then((result) => {
            setConfigData(result.data.data);
        });
    };

    // Called whenever a value gets changed and needs to be updated
    const onChange = (configEntry: ConfigEntry) => {
        let entries = [...changedEntries, configEntry.configKey];
        setChangedEntries(entries);
    }

    // Click handler for submit button, performs an update API request
    const onSubmit = () => {
        for (let configEntry of configData) {
            if (!changedEntries.includes(configEntry.configKey)) {
                continue;
            }
            sendRequest('/acp/updateconfig', 'POST', true, configEntry).then((result) => {
                if (result.data.success) {
                    window.location.reload();
                } else {
                    alert(`Could not update config entries, the API reported: '${result.data.message}'`);
                }
            });
        }
    }

    // Initially load data from API
    if (configData.length <= 0) {
        load();
        return null;
    }

    // Loop over received data and create and array of config entries
    let entries = [];
    for (let configValue of configData) {
        entries.push(
            <div key={configValue.configKey} className="row config-value-row">
                <div className="col-8 config-name-col">
                    <span className="config-friendly-name">{configValue.friendlyName}</span> <pre className="config-key">({configValue.configKey})</pre>
                </div>
                <div className="col-2 config-val-col">
                    <ConfigValueInput changeHandler={(configEntry: ConfigEntry) => onChange(configEntry)} configValue={configValue} />
                </div>
            </div>
        );
    }

    // Add entries and submit button to DOM
    return (<div className="configValues">
        {entries}
        <Button color="secondary" onClick={() => onSubmit()}>Save changes</Button>
    </div>);
}

function ConfigValueInput(props: any) {
    let inputNode: JSX.Element;
    const handleChange = (event: ChangeEvent) => {
        let target: HTMLInputElement = event.target as HTMLInputElement;
        let configEntry: ConfigEntry = props.configValue;
        configEntry.configValue = target.value;
        props.changeHandler(configEntry);
    }
    switch (props.configValue.type) {
        case 'TIME':
            inputNode = <input onChange={(event) => handleChange(event)} type="time" id={`config-input-node-${props.configValue.configKey}`} name={props.configValue.configKey} defaultValue={props.configValue.configValue} />;
            break;
        case 'STRING':
            inputNode = <input onChange={(event) => handleChange(event)} type="text" id={`config-input-node-${props.configValue.configKey}`} name={props.configValue.configKey} defaultValue={props.configValue.configValue} />;
            break;
        default:
            inputNode = <div>{props.configValue.configValue}</div>;
    }
    return (<div className="config-value-input">
        {inputNode}
    </div>);
}

export default ListConfigValuesComponent;