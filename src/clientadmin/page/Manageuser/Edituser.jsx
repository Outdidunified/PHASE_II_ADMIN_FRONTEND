import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Sidebar from '../../components/Sidebar';
import Swal from 'sweetalert2';

const Edituser = ({ userInfo, handleLogout }) => {
    const [newUser, setNewUser] = useState({
        username: '',
        phone_no: '',
        email_id: '',
        role_id: '',
        status: '',
        password: ''
    });

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const { user } = location.state || {};
        if (user) {
            setNewUser({
                username: user.username || '',
                phone_no: user.phone_no || '',
                email_id: user.email_id || '',
                role_id: user.role_id || '',
                status: user.status ? 'Active' : 'Inactive',
                password: user.password || '',
            });
        }
    }, [location]);

    const updateClientUser = async (e) => {
        e.preventDefault();
        try {
            const formattedUserData = {
                user_id: userInfo.data.user_id,
                username: newUser.username,
                phone_no: parseInt(newUser.phone_no),
                modified_by: userInfo.data.client_name,
                password: newUser.password,
                status: newUser.status === 'Active',
            };

            await axios.post(`/clientadmin/UpdateUser`, formattedUserData);
            Swal.fire({
                position: "center",
                icon: "success",
                title: "User updated successfully",
                showConfirmButton: false,
                timer: 1500
            });
            navigate.goBack();
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const goBack = () => {
        navigate(-1);
    };

    const handleStatusChange = (e) => {
        setNewUser({ ...newUser, status: e.target.value });
    };

    return (
        <div className='container-scroller'>
            <Header userInfo={userInfo} handleLogout={handleLogout} />
            <div className="container-fluid page-body-wrapper">
                <Sidebar />
                <div className="main-panel">
                    <div className="content-wrapper">
                        <div className="row">
                            <div className="col-md-12 grid-margin">
                                <div className="row">
                                    <div className="col-12 col-xl-8 mb-4 mb-xl-0">
                                        <h3 className="font-weight-bold">Edit User</h3>
                                    </div>
                                    <div className="col-12 col-xl-4">
                                        <div className="justify-content-end d-flex">
                                            <button
                                                type="button"
                                                className="btn btn-success"
                                                onClick={goBack}
                                                style={{ marginRight: '10px' }}
                                            >
                                                Go Back
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12 grid-margin stretch-card">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="col-12 grid-margin">
                                            <div className="card">
                                                <div className="card-body">
                                                    <h4 className="card-title">Update Users</h4>
                                                    <form className="form-sample" onSubmit={updateClientUser}>
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">User Name</label>
                                                                    <div className="col-sm-9">
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            value={newUser.username}
                                                                            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                                                                            required
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Phone No</label>
                                                                    <div className="col-sm-9">
                                                                        <input
                                                                            type="number"
                                                                            className="form-control"
                                                                            value={newUser.phone_no}
                                                                            onChange={(e) => setNewUser({ ...newUser, phone_no: e.target.value })}
                                                                            required
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Email ID</label>
                                                                    <div className="col-sm-9">
                                                                        <input
                                                                            type="email"
                                                                            className="form-control"
                                                                            value={newUser.email_id}
                                                                            readOnly
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Password</label>
                                                                    <div className="col-sm-9">
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            value={newUser.password}
                                                                            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                                                                            required
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Role ID</label>
                                                                    <div className="col-sm-9">
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            value={newUser.role_id}
                                                                            readOnly
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Status</label>
                                                                    <div className="col-sm-9">
                                                                        <select
                                                                            className="form-control"
                                                                            value={newUser.status}
                                                                            onChange={handleStatusChange}
                                                                            required
                                                                            style={{ color: "black" }}
                                                                        >
                                                                            <option value="Active">Active</option>
                                                                            <option value="Inactive">Inactive</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div style={{ textAlign: 'center' }}>
                                                            <button type="submit" className="btn btn-primary mr-2">Update</button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default Edituser;
