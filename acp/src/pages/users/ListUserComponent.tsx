import React, { FunctionComponent, useState } from 'react';
import { sendRequest } from '../../Util';
import DataTable from 'react-data-table-component';
import './UsersPage.css';

interface ListUserComponentProps {

}

let loaded: number, setLoaded: React.Dispatch<React.SetStateAction<number>>;
let users: [{ id: number, email: string, verified: string, group: string }]
const columns = [
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
    }
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
    let filteredUsers: {
        id: number;
        email: string;
        verified: string;
        group: string;
    }[] = [];
    if (users) {
        filteredUsers = users.filter(item => item.email.toLowerCase().includes(filterText.toLowerCase()));
        for (let i = 0; i < filteredUsers.length; i++) {
            filteredUsers[i].verified = filteredUsers[i].verified === '1' ? 'Yes' : 'No';
        }
    }

    const subHeaderComponentMemo = React.useMemo(() => {
        return <FilterComponent onFilter={(e: any) => setFilterText(e.target.value)} filterText={filterText} />;
    }, [filterText]);

    [loaded, setLoaded] = useState(1);
    if (loaded === 0) {
        return (<>
            <p>You can manage Sokka users and manually remove them from the database here.</p>
            <DataTable
                noHeader={true}
                columns={columns}
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

function load(): void {
    sendRequest('/acp/getusers', 'GET', true, {}).then((response) => {
        users = response.data.users;
        for (let i = 0; i < users.length; i++) {
            users[i].id = i + 1;
        }
        setLoaded(0);
    });
}

export default ListUserComponent;