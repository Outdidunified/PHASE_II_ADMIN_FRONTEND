import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Sidebar from '../../components/Sidebar';
import Swal from 'sweetalert2';

const EditFinance = ({ userInfo, handleLogout }) => {
    const [newFinance, setNewFinance] = useState({
        association_id: '',
        client_id: '',
        eb_charges: '',
        app_charges: '',
        other_charges: '',
        parking_charges: '',
        rent_charges: '',
        open_a_eb_charges: '',
        open_other_charges: '',
        finance_id: '',
        status: '',
    });

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const { finance } = location.state || {};
        if (finance) {
            setNewFinance({
                association_id: finance.association_id || '',
                client_id: finance.client_id || '',
                eb_charges: finance.eb_charges || '',
                app_charges: finance.app_charges || '',
                other_charges: finance.other_charges || '',
                parking_charges: finance.parking_charges || '',
                rent_charges: finance.rent_charges || '',
                open_a_eb_charges: finance.open_a_eb_charges || '',
                open_other_charges: finance.open_other_charges || '',
                finance_id: finance.finance_id || '',
                status: finance.status || '',
            });
        }
    }, [location]);

    const updateFinanceDetails = async (e) => {
        e.preventDefault();
        try {
            const formattedFinanceData = {
                association_id: newFinance.association_id,
                client_id: newFinance.client_id,
                eb_charges: newFinance.eb_charges,
                app_charges: newFinance.app_charges,
                other_charges: newFinance.other_charges,
                parking_charges: newFinance.parking_charges,
                rent_charges: newFinance.rent_charges,
                open_a_eb_charges: newFinance.open_a_eb_charges,
                open_other_charges: newFinance.open_other_charges,
                finance_id: newFinance.finance_id,
                modified_by: userInfo.data.client_name,
                status: newFinance.status, // Assuming status is a boolean
            };
    
            const response = await axios.post(`/clientadmin/UpdateFinanceDetails`, formattedFinanceData);
            if (response.data.status === 'Success') {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Finance details updated successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                goBack();
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error updating finance details',
                    text: 'Please try again later.',
                    timer: 2000,
                    timerProgressBar: true
                });
            }
        } catch (error) {
            console.error('Error updating finance details:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error updating finance details',
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
        setNewFinance({ ...newFinance, [name]: value });
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
                                        <h3 className="font-weight-bold">Edit Finance Details</h3>
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
                                                    <h4 className="card-title">Update Finance Details</h4>
                                                    <form className="form-sample" onSubmit={updateFinanceDetails}>
                                                        <div className="row">
                                                        <div className="col-md-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Finance ID</label>
                                                                    <div className="col-sm-9">
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            name="finance_id"
                                                                            value={newFinance.finance_id}
                                                                            onChange={handleInputChange}
                                                                            readOnly
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
                                                                            value={newFinance.association_id}
                                                                            onChange={handleInputChange}
                                                                            readOnly
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Client ID</label>
                                                                    <div className="col-sm-9">
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            name="client_id"
                                                                            value={newFinance.client_id}
                                                                            onChange={handleInputChange}
                                                                            readOnly
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">EB Charges</label>
                                                                    <div className="col-sm-9">
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            name="eb_charges"
                                                                            value={newFinance.eb_charges}
                                                                            onChange={handleInputChange}
                                                                            required
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">App Charges</label>
                                                                    <div className="col-sm-9">
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            name="app_charges"
                                                                            value={newFinance.app_charges}
                                                                            onChange={handleInputChange}
                                                                            required
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Other Charges</label>
                                                                    <div className="col-sm-9">
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            name="other_charges"
                                                                            value={newFinance.other_charges}
                                                                            onChange={handleInputChange}
                                                                            required
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Parking Charges</label>
                                                                    <div className="col-sm-9">
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            name="parking_charges"
                                                                            value={newFinance.parking_charges}
                                                                            onChange={handleInputChange}
                                                                            required
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Rent Charges</label>
                                                                    <div className="col-sm-9">
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            name="rent_charges"
                                                                            value={newFinance.rent_charges}
                                                                            onChange={handleInputChange}
                                                                            required
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Open A EB Charges</label>
                                                                    <div className="col-sm-9">
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            name="open_a_eb_charges"
                                                                            value={newFinance.open_a_eb_charges}
                                                                            onChange={handleInputChange}
                                                                            required
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Open Other Charges</label>
                                                                    <div className="col-sm-9">
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            name="open_other_charges"
                                                                            value={newFinance.open_other_charges}
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
                                                                            value={newFinance.status}
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

export default EditFinance;
