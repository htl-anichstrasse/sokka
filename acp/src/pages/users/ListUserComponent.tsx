import React, { FunctionComponent } from 'react';
import { Button } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { sendRequest } from '../../Util';
import ChangeGroupModalComponent from './ChangeGroupModalComponent';
import './UsersPage.css';

interface ListUserComponentProps {

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

const columns = (deleteHandler: (row: any) => void, changeCallback: (row: any, group_id: number) => void, groups: Group[]) => [
    {
        name: '#',
        selector: 'id',
        sortable: true,
    },
    {
        name: 'Email',
        selector: 'email',
        sortable: true,
    },
    {
        name: 'Verified',
        selector: 'verified',
        sortable: true,
    },
    {
        name: 'Group',
        selector: 'groupname',
        sortable: true,
    },
    {
        cell: (row: any) => <ChangeGroupModalComponent row={row} callback={changeCallback} groups={groups} />,
        button: true,
    },
    {
        cell: (row: any) => <Button title="Delete" variant="danger" onClick={(e => deleteHandler(row))}><i className="fa fa-trash"></i></Button>,
        button: true,
    },
];

interface FilterComponentProps {
    filterText: string,
    onFilter: (e: any) => void
}

const FilterComponent = (props: FilterComponentProps) => (
    <input className="form-control users-search" id="search" type="text" placeholder="Filter by email" aria-label="Search Input" value={props.filterText} onChange={props.onFilter} />
);

const ListUserComponent: FunctionComponent<ListUserComponentProps> = (props) => {
    const [filterText, setFilterText] = React.useState('');
    const [state, setState] = React.useState({} as { users: Array<User>, groups: Array<Group> });

    let filteredUsers: any[] = [];
    if (state.users) {
        filteredUsers = state.users.filter(item => item.email.toLowerCase().includes(filterText.toLowerCase()));
        for (let i = 0; i < filteredUsers.length; i++) {
            filteredUsers[i].verified = filteredUsers[i].verified === '1' ? 'Yes' : 'No';
            filteredUsers[i].groupname = state.groups.find((group) => group.group_id === filteredUsers[i].group_id)?.groupname;
        }
    }

    const deleteHandler = (row: any) => {
        if (window.confirm(`Are you sure you want to delete:\r ${row.email}?`)) {
            sendRequest('/acp/deleteuser', 'POST', true, {
                email: row.email
            });
            const index = state.users.findIndex((r: any) => r.id === row.id);
            setState({ users: [...state.users.slice(0, index), ...state.users.slice(index + 1)], groups: state.groups });
        }
    }

    const changeCallback = (row: any, group_id: number) => {
        sendRequest('/acp/updateuser', 'POST', true, {
            email: row.email,
            user: {
                group: group_id
            }
        }).then((response) => {
            if (response.data.success) {
                let groupObject = state.groups.find((val) => val.group_id === group_id);
                if (groupObject) {
                    const index = state.users.findIndex((r: any) => r.id === row.id);
                    let user = state.users[index];
                    user.group_id = group_id;
                    let newUsers = [...state.users.slice(0, index), user, ...state.users.slice(index + 1)];
                    setState({ users: newUsers, groups: state.groups });
                } else {
                    alert('Group not found');
                }
            } else {
                alert('An error occured');
            }
        });
    }

    const subHeaderComponentMemo = React.useMemo(() => {
        return <FilterComponent onFilter={(e: any) => setFilterText(e.target.value)} filterText={filterText} />;
    }, [filterText]);

    const load = () => {
        Promise.all([sendRequest('/acp/getusers', 'GET', true, {}), sendRequest('/acp/getgroups', 'GET', true, {})]).then((values) => {
            setState({ users: values[0].data.users, groups: values[1].data.groups });
        });
    }

    if (state.users) {
        return (<>
            <p>You can manage Sokka users and manually remove them from the database here.</p>
            <DataTable
                noHeader={true}
                columns={columns(deleteHandler, changeCallback, state.groups) as any}
                data={filteredUsers}
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

export default ListUserComponent;