import React, { FunctionComponent } from 'react';
import { Button } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { sendRequest } from '../../Util';
import './UsersPage.css';

interface ListUserComponentProps {

}

const columns = (deleteHandler: (row: any) => void) => [
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
        cell: (row: any) => <Button variant="danger" onClick={(e => deleteHandler(row))}><i className="fa fa-trash"></i></Button>,
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
    const [users, setUsers] = React.useState({} as [{ id: number, email: string, verified: string, group: string }]);

    let filteredUsers: any[] = [];
    if (users.length > 0) {
        filteredUsers = users.filter(item => item.email.toLowerCase().includes(filterText.toLowerCase()));
        for (let i = 0; i < filteredUsers.length; i++) {
            filteredUsers[i].verified = filteredUsers[i].verified === '1' ? 'Yes' : 'No';
        }
    }

    const deleteHandler = (row: any) => {
        if (window.confirm(`Are you sure you want to delete:\r ${row.email}?`)) {
            sendRequest('/acp/deleteuser', 'POST', true, {
                email: row.email
            });
            const index = users.findIndex((r: any) => r.id === row.id);
            setUsers([...users.slice(0, index), ...users.slice(index + 1)] as any);
        }
    }

    const subHeaderComponentMemo = React.useMemo(() => {
        return <FilterComponent onFilter={(e: any) => setFilterText(e.target.value)} filterText={filterText} />;
    }, [filterText]);

    const load = () => {
        sendRequest('/acp/getusers', 'GET', true, {}).then((response) => {
            setUsers(response.data.users);
        }).catch();
    }

    if (users.length > 0) {
        return (<>
            <p>You can manage Sokka users and manually remove them from the database here.</p>
            <DataTable
                noHeader={true}
                columns={columns(deleteHandler) as any}
                data={filteredUsers}
                pagination={true}
                paginationPerPage={5}
                paginationRowsPerPageOptions={[5, 10, 15, 20, 30, 50]}
                subHeader={true}
                subHeaderComponent={subHeaderComponentMemo}
            />
        </>);
    } else {
        load();
        return (<div className="box">
            <h3>Loading...</h3>
        </div>)
    }
}

export default ListUserComponent;