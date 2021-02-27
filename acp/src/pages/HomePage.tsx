import React from 'react';
import { Card, CardColumns, Spinner } from 'react-bootstrap';
import { sendRequest } from '../Util';

interface HomePageProps {

}

interface HomePageState {
    initialLoad: boolean
    data: null | Status
}

class HomePage extends React.Component<HomePageProps, HomePageState> {
    private nextLoad: NodeJS.Timeout | null = null;

    constructor(props: HomePageProps) {
        super(props);
        this.state = {
            initialLoad: false,
            data: null
        };
    }

    componentWillUnmount() {
        if (this.nextLoad) {
            clearTimeout(this.nextLoad);
        }
    }

    loadStatus() {
        sendRequest('/acp/status', 'GET', true, {}).then((response) => {
            this.setState({
                initialLoad: true,
                data: response.data.status
            });
            this.nextLoad = setTimeout(() => this.loadStatus(), 3000);
        });
    }

    render() {
        document.title = 'Home | Sokka ACP';
        const convertSecondsToString = (seconds: number) => {
            let hours = Math.floor(seconds / 3600);
            let minutes = Math.floor(seconds % 3600 / 60);
            seconds = Math.floor(seconds % 3600 % 60);
            let stringHours = hours > 0 ? hours + (hours == 1 ? " hour, " : " hours, ") : "";
            let stringMinutes = minutes > 0 ? minutes + (minutes == 1 ? " minute, " : " minutes, ") : "";
            let stringSeconds = seconds > 0 ? seconds + (seconds == 1 ? " second" : " seconds") : "";
            return stringHours + stringMinutes + stringSeconds;
        }
        if (!this.state.initialLoad) {
            this.loadStatus();
        }
        return (<div className="app">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1><i className="fa fa-home mr-2" aria-hidden="true"></i>Home</h1>
                        <p>
                            Welcome to the Sokka ACP! The ACP allows you to control everything about your Sokka system.
                            You can manage your system's users, create product listings, add them to menus and view your orders. Here is a quick overview on what you can do here:
                        </p>
                        <ul className="home-feature-list">
                            <li><b>Products / Menus: </b> Add products or menus by clicking the blue <i>Add product</i> / <i>Add menu</i> button on the right or edit / delete existing items by clicking the respective links in the cards.</li>
                            <li><b>Users: </b> View registered users or delete them from the system. You can also set user groups here to give out rebates.</li>
                            <li><b>Groups: </b> Manage user groups and add rebates to groups.</li>
                            <li><b>Orders: </b> View orders for the current day or past days.</li>
                        </ul>
                        <h2 className="mb-3">System Facts</h2>
                        {
                            this.state.data ?
                                <CardColumns>
                                    <DataCard title="Registered users" value={this.state.data.users} />
                                    <DataCard title="Registered products" value={this.state.data.registeredProducts} />
                                    <DataCard title="Registered menus" value={this.state.data.registeredMenus} />
                                </CardColumns>
                                : <Spinner className="mb-2" animation="border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </Spinner>
                        }
                        <h2 className="mb-3">System Performance</h2>
                        {
                            this.state.data ?
                                <CardColumns>
                                    <DataCard title="CPU Usage" value={(this.state.data.cpuUsage * 100).toFixed(2) + " %"} />
                                    <DataCard title="CPU Count" value={this.state.data.cpuCount} />
                                    <DataCard title="Host Platform" value={this.state.data.platform} />
                                    <DataCard title="Node Memory Usage" value={this.state.data.freeMem.toFixed(0) + " / " + this.state.data.totalMem.toFixed(0) + " MB"} />
                                    <DataCard title="System Uptime" value={convertSecondsToString(this.state.data.sysUptime)} />
                                    <DataCard title="Process Uptime" value={convertSecondsToString(this.state.data.procUptime)} />
                                </CardColumns>
                                : <Spinner className="mb-2" animation="border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </Spinner>
                        }
                    </div>
                </div>
            </div>
        </div>);
    }
}

function DataCard(props: { title: string, value: any, icon?: Element }) {
    return (
        <Card>
            <Card.Body>
                <Card.Title>{props.icon ? props.icon : null} {props.title}</Card.Title>
                <Card.Subtitle>{props.value}</Card.Subtitle>
            </Card.Body>
        </Card>
    )
}

export default HomePage;