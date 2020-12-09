import React, { FunctionComponent } from 'react';
import { Button } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { sendRequest } from '../../Util';
import ChangeGroupButton from './ChangeGroupButton';

interface ListGroupsComponentProps {

}

const customStyle = {
    rows: {
        style: {
            fontSize: "inherit",
            fontFamily: "inherit",
            fontWeight: "inherit"
        }
    },
    headCells: {
        style: {
            fontSize: "inherit",
            fontFamily: "inherit",
            fontWeight: "inherit"
        }
    }
}

const columns = (deleteHandler: (row: any) => void, changeCallback: (row: any, group_id: number, groupname: string, rebate: number) => void) => [
    {
        name: '#',
        selector: 'group_id',
        sortable: true,
    },
    {
        name: 'Name',
        selector: 'groupname',
        sortable: true,
    },
    {
        name: 'Rebate',
        selector: 'rebate',
        sortable: true,
    },
    {
        name: "Change",
        cell: (row: any) => <ChangeGroupButton row={row} callback={changeCallback} />,
        button: true,
    },
    {
        name: "Delete",
        cell: (row: any) => <Button title="Delete" variant="danger" onClick={(e => deleteHandler(row))}><i className="fa fa-trash"></i></Button>,
        button: true,
    },
];

interface FilterComponentProps {
    filterText: string,
    onFilter: (e: any) => void
}

const FilterComponent = (props: FilterComponentProps) => (
    <input className="form-control users-search" id="search" type="text" placeholder="Filter by name" aria-label="Search Input" value={props.filterText} onChange={props.onFilter} />
);

const ListGroupsComponent: FunctionComponent<ListGroupsComponentProps> = (props) => {
    const [filterText, setFilterText] = React.useState('');
    const [state, setState] = React.useState({} as { groups: Array<Group> });

    let filteredGroups: any[] = [];
    if (state.groups) {
        filteredGroups = state.groups.filter(item => item.groupname.toLowerCase().includes(filterText.toLowerCase()));
        for (let i = 0; i < filteredGroups.length; i++) {
            filteredGroups[i].groupname = state.groups.find((group) => group.group_id === filteredGroups[i].group_id)?.groupname;
        }
    }

    const deleteHandler = (row: any) => {
        if (window.confirm(`Are you sure you want to delete '${row.groupname}'?`)) {
            sendRequest('/acp/deletegroup', 'POST', true, {
                group_id: row.group_id
            });
            const index = state.groups.findIndex((r: any) => r.group_id === row.group_id);
            setState({ groups: [...state.groups.slice(0, index), ...state.groups.slice(index + 1)] });
        }
    }

    const changeCallback = (row: any, group_id: number, groupname: string, rebate: number) => {
        sendRequest('/acp/updategroup', 'POST', true, {
            group_id: group_id,
            groupname: groupname,
            rebate: rebate
        }).then((response) => {
            if (response.data.success) {
                const index = state.groups.findIndex((r: any) => r.group_id === row.group_id);
                let group = state.groups[index];
                group.groupname = groupname;
                group.rebate = rebate;
                let newGroups = [...state.groups.slice(0, index), group, ...state.groups.slice(index + 1)];
                setState({ groups: newGroups });
            } else {
                alert('An error occured');
            }
        });
    }

    const subHeaderComponentMemo = React.useMemo(() => {
        return <FilterComponent onFilter={(e: any) => setFilterText(e.target.value)} filterText={filterText} />;
    }, [filterText]);

    const load = () => {
        sendRequest('/acp/getgroups', 'GET', true, {}).then((values) => {
            setState({ groups: values.data.groups });
        });
    }

    if (state.groups) {
        return (<>
            <p>You can manage Sokka groups and manage their rebate here.</p>
            <DataTable
                noHeader={true}
                columns={columns(deleteHandler, changeCallback) as any}
                data={filteredGroups}
                pagination={true}
                paginationPerPage={5}
                paginationRowsPerPageOptions={[5, 10, 15, 20, 30, 50]}
                subHeader={true}
                customStyles={customStyle}
                subHeaderComponent={subHeaderComponentMemo}
            />
        </>);
    } else {
        load();
        return (<h3>Loading...</h3>);
    }
}

export default ListGroupsComponent;