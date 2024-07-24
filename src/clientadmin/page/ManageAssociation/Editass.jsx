import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Sidebar from '../../components/Sidebar';
import Swal from 'sweetalert2';

const Editass = ({ userInfo, handleLogout }) => {
    const [newAss, setNewAss] = useState({
        association_address: '',
        association_email_id: '',
        association_id: '',
        association_name: '',
        association_phone_no: '',
        
        status: ''
    });

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const { association } = location.state || {};
        if (association) {
            setNewAss({
                association_address: association.association_address || '',
                association_email_id: association.association_email_id || '',
                association_id: association.association_id || '',
                association_name: association.association_name || '',
                association_phone_no: association.association_phone_no || '',
                
                status: association.status || ''
            });
        }
    }, [location]);

    const updateAssociationDetails = async (e) => {
        e.preventDefault();
        try {
            const formattedAssData = {
                association_address: newAss.association_address,
                association_email_id: newAss.association_email_id,
                association_id: newAss.association_id,
                association_name: newAss.association_name,
                association_phone_no: newAss.association_phone_no,
                modified_by:userInfo.data.client_name,
                
                status: newAss.status
            };

            const response = await axios.post(`/clientadmin/UpdateAssociationUser`, formattedAssData);
            if (response.data.status === 'Success') {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Association details updated successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                goBack();
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error updating association details',
                    text: 'Please try again later.',
                    timer: 2000,
                    timerProgressBar: true
                });
            }
        } catch (error) {
            console.error('Error updating association details:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error updating association details',
                text: 'Please try again later.',
                timer: 2000,
                timerProgressBar: true
            });
        }
    };

    const goBack = () => {
        navigate(-1);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewAss({ ...newAss, [name]: value });
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
                                        <h3 className="font-weight-bold">Edit Association Details</h3>
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
                                                    <h4 className="card-title">Update Association Details</h4>
                                                    <form className="form-sample" onSubmit={updateAssociationDetails}>
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Association Address</label>
                                                                    <div className="col-sm-9">
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            name="association_address"
                                                                            value={newAss.association_address}
                                                                            onChange={handleInputChange}
                                                                            required
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Association Email</label>
                                                                    <div className="col-sm-9">
                                                                        <input
                                                                            type="email"
                                                                            className="form-control"
                                                                            name="association_email_id"
                                                                            value={newAss.association_email_id}
                                                                            onChange={handleInputChange}
                                                                            required
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Association ID</label>
                                                                    <div className="col-sm-9">
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            name="association_id"
                                                                            value={newAss.association_id}
                                                                            onChange={handleInputChange}
                                                                            readOnly
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Association Name</label>
                                                                    <div className="col-sm-9">
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            name="association_name"
                                                                            value={newAss.association_name}
                                                                            onChange={handleInputChange}
                                                                            required
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Association Phone</label>
                                                                    <div className="col-sm-9">
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            name="association_phone_no"
                                                                            value={newAss.association_phone_no}
                                                                            onChange={handleInputChange}
                                                                            required
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
                                                                            name="status"
                                                                            value={newAss.status}
                                                                            onChange={handleInputChange}
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

export default Editass;
