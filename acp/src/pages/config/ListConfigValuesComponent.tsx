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
            <div className="row">
                <div className="col">
                    {configValue.friendlyName}
                </div>
                <div className="col">
                    {configValue.configValue}
                </div>
            </div>
        );
    }
    return (<div className="configValues">
        {vals}
    </div>);
}

export default ListConfigValuesComponent;