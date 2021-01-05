import React, { FunctionComponent, useState } from 'react';
import { sendRequest } from '../../Util';

interface ListConfigValuesComponentProps {

}

const ListConfigValuesComponent: FunctionComponent<ListConfigValuesComponentProps> = (props) => {
    let [configData, setConfigData] = useState([] as ConfigValue[]);
    const load = () => {
        sendRequest('/acp/getconfig', 'GET', true, {}).then((result) => {
            setConfigData(result.data.data);
        });
    };
    if (configData.length <= 0) {
        load();
        return null;
    }
    let vals = [];
    for (let configValue of configData) {
        vals.push(
            <div className="row config-value-row">
                <div className="col-8 config-name-col">
                    <span className="config-friendly-name">{configValue.friendlyName}</span> <pre className="config-key">({configValue.configKey})</pre>
                </div>
                <div className="col-2 config-val-col">
                    <ConfigValueInput configValue={configValue}/>
                </div>
            </div>
        );
    }
    return (<div className="configValues">
        {vals}
    </div>);
}

function ConfigValueInput(props: any) {
    return <div>{props.configValue.configValue}</div>;
}

export default ListConfigValuesComponent;