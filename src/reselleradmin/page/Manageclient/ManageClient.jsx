import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const Manageclient = ({ userInfo, handleLogout }) => {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const fetchUsersCalled = useRef(false); 

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.post('/reselleradmin/getAllClients', {
                    reseller_id: userInfo.data.reseller_id
                });
                setUsers(response.data.data || []);
            } catch (error) {
                console.error('Error fetching users:', error);
                setUsers([]);
            }
        };

        if (!fetchUsersCalled.current && userInfo.data.reseller_id) {
            fetchUsers();
            fetchUsersCalled.current = true;
        }
    }, [userInfo.data.reseller_id]);


    const handleDeactivateUser = async (client_id, status) => {
        try {
            const response = await axios.post('/reselleradmin/DeActivateClient', {
                client_id: client_id,
                modified_by: userInfo.data.reseller_name,
                status: !status // Toggle status
            });

            if (response.status === 200) {
                setUsers(prevUsers =>
                    prevUsers.map(user =>
                        user.client_id === client_id ? { ...user, status: !status } : user
                    )
                );
                Swal.fire({
                    title: status ? "Deactivated!" : "Activated!",
                    icon: "success"
                });
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Failed to update user status.",
                    icon: "error"
                });
            }
        } catch (error) {
            console.error('Error in updating user status:', error);
            Swal.fire({
                title: "Error",
                text: "An error occurred while updating user status.",
                icon: "error"
            });
        }
    };

    const navigateToCreateUser = () => {
        navigate('/reselleradmin/CreateClients');
    };

    const navigateToViewClient = (user) => {
        navigate('/reselleradmin/viewclient', { state: { user } });
    };

    const navassignedtoass = (client_id) => {
        navigate('/reselleradmin/Asssigntoass', { state: { client_id } });
    };

    const navtoassdev = (client_id) => {
        navigate('/reselleradmin/Assigneddevicesclient', { state: { client_id } });
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredUsers = users.filter((user) => {
        const searchFields = ['client_name'];
        return searchFields.some((field) =>
            user[field]?.toString().toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    return (
        <div className='container-scroller'>
            {/* Header */}
            <Header userInfo={userInfo} handleLogout={handleLogout} />
            <div className="container-fluid page-body-wrapper" style={{paddingTop:'40px'}}>
                {/* Sidebar */}
                <Sidebar />
                <div className="main-panel">
                    <div className="content-wrapper">
                        <div className="row">
                            <div className="col-md-12 grid-margin">
                                <div className="row">
                                    <div className="col-12 col-xl-8 mb-4 mb-xl-0">
                                        <h3 className="font-weight-bold">Manage Clients</h3>
                                    </div>
                                    <div className="col-12 col-xl-4">
                                        <div className="justify-content-end d-flex">
                                            <button type="button" className="btn btn-success" onClick={navigateToCreateUser} style={{ marginRight: '10px' }}>Create Client's</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12 grid-margin stretch-card">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-12 grid-margin">
                                                <div className="row">
                                                    <div className="col-4 col-xl-8">
                                                        <h4 className="card-title" style={{ paddingTop: '10px' }}>List Of Clients</h4>
                                                    </div>
                                                    <div className="col-8 col-xl-4">
                                                        <div className="input-group">
                                                            <div className="input-group-prepend hover-cursor" id="navbar-search-icon">
                                                                <span className="input-group-text" id="search">
                                                                    <i className="icon-search"></i>
                                                                </span>
                                                            </div>
                                                            <input type="text" className="form-control" placeholder="Search now" value={searchQuery} onChange={handleSearch}/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="table-responsive">
                                            <table className="table table-striped">
                                                <thead style={{ textAlign: 'center' }}>
                                                    <tr>
                                                        <th>Sl.No</th>
                                                        <th>Client Name</th>
                                                        <th>Phone Number</th>
                                                        <th>Email ID</th>
                                                        <th>Address</th>
                                                        <th>Status</th>
                                                        <th>Active/DeActive</th>
                                                        <th>Actions</th>
                                                        <th>Assigned Association</th>
                                                        <th>Assigned Devices</th>
                                                    </tr>
                                                </thead>
                                                <tbody style={{ textAlign: 'center' }}>
                                                    {filteredUsers.length > 0 ? (
                                                        filteredUsers.map((user, index) => (
                                                            <tr key={user.client_id}>
                                                                <td>{index + 1}</td>
                                                                <td>{user.client_name}</td>
                                                                <td>{user.client_phone_no}</td>
                                                                <td>{user.client_email_id}</td>
                                                                <td>{user.client_address}</td>
                                                                <td style={{ color: user.status ? 'green' : 'red' }}>
                                                                    {user.status ? 'Active' : 'DeActive'}
                                                                </td>
                                                                <td>
                                                                    <div className='form-group' style={{paddingTop:'13px'}}> 
                                                                        {user.status===true ?
                                                                            <div className="form-check form-check-danger">
                                                                                <label className="form-check-label"><input type="radio" className="form-check-input" name="optionsRadios1" id="optionsRadios2" value={false} onClick={() => handleDeactivateUser(user.client_id, user.status)}/>DeActive<i className="input-helper"></i></label>
                                                                            </div>
                                                                        :
                                                                            <div className="form-check form-check-success">
                                                                                <label className="form-check-label"><input type="radio" className="form-check-input" name="optionsRadios1" id="optionsRadios1" value={true} onClick={() => handleDeactivateUser(user.client_id, user.status)}/>Active<i className="input-helper"></i></label>
                                                                            </div>
                                                                        }
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <button type="button" className="btn btn-outline-success btn-icon-text" onClick={() => navigateToViewClient(user)} style={{ marginBottom: '10px', marginRight: '10px' }}><i className="mdi mdi-eye btn-icon-prepend"></i>View</button>
                                                                </td>
                                                                <td>
                                                                    <button type="button" className="btn btn-outline-warning btn-icon-text" onClick={() => navassignedtoass(user.client_id)} style={{ marginBottom: '10px', marginRight: '10px' }}><i className="ti-file btn-icon-prepend"></i>Association</button>
                                                                </td>
                                                                <td>
                                                                    <button type="button" className="btn btn-outline-warning btn-icon-text" onClick={() => navtoassdev(user.client_id)}style={{ marginBottom: '10px', marginRight: '10px' }}><i className="ti-file btn-icon-prepend"></i>Devices</button>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr className="text-center">
                                                            <td colSpan="10">No Record Found</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Footer */}
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default Manageclient;
