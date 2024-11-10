import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { viewCustomer } from '../../Actions/Admin';

const Users = () => {
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [usersPerPage] = useState(10);
    const [filteredUsers, setFilteredUsers] = useState([]);

    const users = [
        {
            "username": "john_doe",
            "email": "john.doe@example.com",
            "mobile_number": "+12345678901",
            "photo": "https://example.com/photos/john_doe.jpg",
            "address": "123 Main St, Springfield, USA"
        },
        {
            "username": "jane_smith",
            "email": "jane.smith@example.com",
            "mobile_number": "+12345678902",
            "photo": "https://example.com/photos/jane_smith.jpg",
            "address": "456 Elm St, Springfield, USA"
        },
        {
            "username": "mike_jones",
            "email": "mike.jones@example.com",
            "mobile_number": "+12345678903",
            "photo": "https://example.com/photos/mike_jones.jpg",
            "address": "789 Maple St, Springfield, USA"
        },
        {
            "username": "emily_brown",
            "email": "emily.brown@example.com",
            "mobile_number": "+12345678904",
            "photo": "https://example.com/photos/emily_brown.jpg",
            "address": "321 Oak St, Springfield, USA"
        },
        {
            "username": "david_wilson",
            "email": "david.wilson@example.com",
            "mobile_number": "+12345678905",
            "photo": "https://example.com/photos/david_wilson.jpg",
            "address": "654 Pine St, Springfield, USA"
        },
        {
            "username": "sarah_johnson",
            "email": "sarah.johnson@example.com",
            "mobile_number": "+12345678906",
            "photo": "https://example.com/photos/sarah_johnson.jpg",
            "address": "987 Cedar St, Springfield, USA"
        },
        {
            "username": "chris_lee",
            "email": "chris.lee@example.com",
            "mobile_number": "+12345678907",
            "photo": "https://example.com/photos/chris_lee.jpg",
            "address": "135 Birch St, Springfield, USA"
        },
        {
            "username": "laura_hall",
            "email": "laura.hall@example.com",
            "mobile_number": "+12345678908",
            "photo": "https://example.com/photos/laura_hall.jpg",
            "address": "246 Spruce St, Springfield, USA"
        },
        {
            "username": "robert_garcia",
            "email": "robert.garcia@example.com",
            "mobile_number": "+12345678909",
            "photo": "https://example.com/photos/robert_garcia.jpg",
            "address": "357 Fir St, Springfield, USA"
        },
        {
            "username": "nancy_martinez",
            "email": "nancy.martinez@example.com",
            "mobile_number": "+12345678910",
            "photo": "https://example.com/photos/nancy_martinez.jpg",
            "address": "468 Willow St, Springfield, USA"
        },
        {
            "username": "steve_thomas",
            "email": "steve.thomas@example.com",
            "mobile_number": "+12345678911",
            "photo": "https://example.com/photos/steve_thomas.jpg",
            "address": "579 Poplar St, Springfield, USA"
        },
        {
            "username": "karen_harris",
            "email": "karen.harris@example.com",
            "mobile_number": "+12345678912",
            "photo": "https://example.com/photos/karen_harris.jpg",
            "address": "680 Walnut St, Springfield, USA"
        },
        {
            "username": "benjamin_clark",
            "email": "benjamin.clark@example.com",
            "mobile_number": "+12345678913",
            "photo": "https://example.com/photos/benjamin_clark.jpg",
            "address": "791 Chestnut St, Springfield, USA"
        },
        {
            "username": "megan_lewis",
            "email": "megan.lewis@example.com",
            "mobile_number": "+12345678914",
            "photo": "https://example.com/photos/megan_lewis.jpg",
            "address": "902 Ash St, Springfield, USA"
        },
        {
            "username": "james_rodriguez",
            "email": "james.rodriguez@example.com",
            "mobile_number": "+12345678915",
            "photo": "https://example.com/photos/james_rodriguez.jpg",
            "address": "113 Maple Ave, Springfield, USA"
        }
    ];


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(viewCustomer());
    }, [dispatch]);



    const userss = useSelector((state) => state.admin.customers);


    useEffect(() => {
        setFilteredUsers(userss);
    }, [userss]);














    useEffect(() => {
        // Filter users based on the search input
        const filtered = users.filter(user =>
            user.username.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredUsers(filtered);
        // Reset to page 1 when search changes
        setPage(1);
    }, [search]);

    // Calculate the index of the first and last user to be displayed
    const indexOfLastUser = page * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    // Calculate total pages
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    // Handle page change
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <input
                type="text"
                placeholder="Search by name..."
                className="mb-4 p-2 border rounded w-full"
                value={search}
                onChange={e => setSearch(e.target.value)}
            />

            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-pink-900">
                    <thead>
                        <tr className="bg-emerald-500">
                            <th className="border border-blue-300 p-2">Photo</th>
                            <th className="border border-blue-300 p-2">Name</th>
                            <th className="border border-blue-300 p-2">Email</th>
                            <th className="border border-blue-300 p-2">Mobile</th>
                            <th className="border border-blue-300 p-2">Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentUsers.length > 0 ? (
                            currentUsers.map((user, index) => (
                                <tr key={index} className="border-b hover:bg-yellow-200">
                                    <td className="border border-pink-900 p-2">
                                        <img src={`http://localhost:4000/uploads/customers/${user.photo}`} alt={user.username} className="w-24 h-24 object-cover rounded-full" />
                                    </td>
                                    <td className="border border-pink-900 p-2">{user.name}</td>
                                    <td className="border border-pink-900 p-2">{user.email}</td>
                                    <td className="border border-pink-900 p-2">{user.phone}</td>
                                    <td className="border border-pink-900 p-2">{user.address}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="border border-pink-900 p-2 text-center">
                                    No users found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-between mt-4">
                <button onClick={() => handlePageChange(page - 1)} disabled={page === 1} className="p-2 bg-gray-300 rounded">
                    Previous
                </button>
                <span>{`Page ${page} of ${totalPages}`}</span>
                <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages} className="p-2 bg-gray-300 rounded">
                    Next
                </button>
            </div>
        </div>
    );
};

export default Users;
