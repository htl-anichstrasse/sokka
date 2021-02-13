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

const columns = (deleteHandler: (row: any) => void, changeCallback: (row: any, id: number, name: string, rebate: number) => void) => [
    {
        name: '#',
        selector: 'id',
        sortable: true,
    },
    {
        name: 'Name',
        selector: 'name',
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
        cell: (row: any) => <Button disabled={row.id === 1} title="Delete" variant="danger" onClick={(e => deleteHandler(row))}><i className="fa fa-trash"></i></Button>,
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
        filteredGroups = state.groups.filter(item => item.name.toLowerCase().includes(filterText.toLowerCase()));
        for (let i = 0; i < filteredGroups.length; i++) {
            filteredGroups[i].name = state.groups.find((group) => group.id === filteredGroups[i].id)?.name;
        }
    }

    const deleteHandler = (row: any) => {
        if (window.confirm(`Are you sure you want to delete '${row.name}'?`)) {
            sendRequest('/acp/group/delete', 'POST', true, {
                id: row.id
            });
            const index = state.groups.findIndex((r: any) => r.id === row.id);
            setState({ groups: [...state.groups.slice(0, index), ...state.groups.slice(index + 1)] });
        }
    }

    const changeCallback = (row: any, id: number, name: string, rebate: number) => {
        sendRequest('/acp/group/update', 'POST', true, {
            id: id,
            name: name,
            rebate: rebate
        }).then((response) => {
            if (response.data.success) {
                const index = state.groups.findIndex((r: any) => r.group_id === row.group_id);
                let group = state.groups[index];
                group.name = name;
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
        sendRequest('/acp/group/get', 'GET', true, {}).then((response) => {
            setState({ groups: response.data.groups });
        });
    }

    if (state.groups) {
        return (<>
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