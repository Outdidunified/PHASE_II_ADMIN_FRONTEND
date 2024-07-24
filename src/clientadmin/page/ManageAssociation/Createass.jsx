import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Sidebar from '../../components/Sidebar';
import Swal from 'sweetalert2';

const CreateAss = ({ userInfo, handleLogout }) => {
    const [newAssociation, setNewAssociation] = useState({
        reseller_id: userInfo.data.reseller_id,
        client_id: userInfo.data.client_id,
        association_name: '',
        association_phone_no: '',
        association_email_id: '',
        association_address: '',
        created_by: userInfo.data.client_name, // Assuming userInfo has necessary client info
    });

    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const createAssociation = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/clientadmin/CreateAssociationUser', newAssociation);
            if (response.data.status === 'Success') {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Association created successfully',
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(-1); // Navigate back to previous page after successful creation
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to create association. Please try again later.',
                    timer: 2000,
                    timerProgressBar: true
                });
            }
        } catch (error) {
            console.error('Error creating association:', error);
            setErrorMessage('Failed to create association. Please try again.');
        }
    };

    const goBack = () => {
        navigate(-1);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewAssociation({ ...newAssociation, [name]: value });
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
                                        <h3 className="font-weight-bold">Create Association</h3>
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
                                                    <h4 className="card-title">Association Details</h4>
                                                    <form className="form-sample" onSubmit={createAssociation}>
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Association Name</label>
                                                                    <div className="col-sm-9">
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            name="association_name"
                                                                            value={newAssociation.association_name}
                                                                            onChange={handleInputChange}
                                                                            required
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Phone Number</label>
                                                                    <div className="col-sm-9">
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            name="association_phone_no"
                                                                            value={newAssociation.association_phone_no}
                                                                            onChange={handleInputChange}
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
                                                                            name="association_email_id"
                                                                            value={newAssociation.association_email_id}
                                                                            onChange={handleInputChange}
                                                                            required
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Address</label>
                                                                    <div className="col-sm-9">
                                                                        <textarea
                                                                            className="form-control"
                                                                            name="association_address"
                                                                            value={newAssociation.association_address}
                                                                            onChange={handleInputChange}
                                                                            required
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {errorMessage && <div className="text-danger">{errorMessage}</div>}
                                                        <div style={{ textAlign: 'center' }}>
                                                            <button type="submit" className="btn btn-primary mr-2">Create Association</button>
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

export default CreateAss;
