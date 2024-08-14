import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Sidebar from '../../components/Sidebar';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Assignfinance = ({ userInfo, handleLogout }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [chargerId, setChargerId] = useState('');
    const [financeOptions, setFinanceOptions] = useState([]);
    const [selectedFinanceId, setSelectedFinanceId] = useState('');
   
    useEffect(() => {
        const { charger_id } = location.state || {};
        if (charger_id) {
            setChargerId(charger_id);
        }
        fetchFinanceId();
    }, [location]);

    // fetch finance details for selected
    const fetchFinanceId = async () => {
        try {
            const response = await axios.get('/clientadmin/FetchFinanceDetailsForSelection');
            if (response.data && Array.isArray(response.data.data)) {
                const financeIds = response.data.data.map(item => ({
                    finance_id: item.finance_id,
                    // Add other properties as needed
                }));
                setFinanceOptions(financeIds);
                // For demo purposes, setting the first finance ID as default
                if (financeIds.length > 0) {
                    setSelectedFinanceId(financeIds[0].finance_id); // Ensure to set the correct value here
                }
            } else {
                console.error('Expected an array from API response, received:', response.data);
            }
        } catch (error) {
            console.error('Error fetching finance details:', error);
        }
    };

    // submit data
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formattedData = {
                charger_id: chargerId,
                finance_id: parseInt(selectedFinanceId),
                modified_by: userInfo.data.email_id,
                // Add other fields as needed for submission
            };
            // await axios.post('/clientadmin/AssignFinanceToCharger', formattedData);
            const response = await axios.post('/clientadmin/AssignFinanceToCharger', formattedData);

            // Check the response data or status
            if (response.status === 200 && response.data.success) {
                // Show success alert using SweetAlert
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Finance has been assigned successfully.',
                    confirmButtonText: 'OK',
                }).then((result) => {
                    // Redirect to previous page or handle navigation as needed
                    navigate(-1); // Navigate back one step
                });
            } else {
                // Handle unexpected response or non-success status
                const responseData = await response.json();
                Swal.fire({
                    icon: 'warning',
                    title: 'Unexpected Response!',
                    text: 'Please check the details and try again,' + responseData.message,
                    confirmButtonText: 'OK',
                });
            }
        } catch (error) {
            console.error('Error assigning finance details:', error);
            // Handle error state or show error message
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Failed to assign finance. Please try again.',
                confirmButtonText: 'OK',
            });
        }
    };

    // back page
    const goBack = () => {
        navigate(-1);
    };

    return (
        <div className='container-scroller'>
            {/* Header */}
            <Header userInfo={userInfo} handleLogout={handleLogout} />
            <div className="container-fluid page-body-wrapper">
                {/* Sidebar */}
                <Sidebar />
                <div className="main-panel">
                    <div className="content-wrapper">
                    <div className="row">
                            <div className="col-md-12 grid-margin">
                                <div className="row">
                                    <div className="col-12 col-xl-8 mb-4 mb-xl-0">
                                        <h3 className="font-weight-bold">Assign Finance</h3>
                                    </div>
                                    <div className="col-12 col-xl-4">
                                        <div className="justify-content-end d-flex">
                                            <button
                                                type="button"
                                                className="btn btn-success"
                                                onClick={goBack}
                                                style={{ marginRight: '10px' }}
                                            >
                                               Back
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
                                                    <h4 className="card-title">Finance Details</h4>
                                                    <form className="form-sample" onSubmit={handleSubmit}>
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Charger ID</label>
                                                                    <div className="col-sm-9">
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            value={chargerId}
                                                                            readOnly
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Finance ID</label>
                                                                    <div className="col-sm-9">
                                                                        <select
                                                                            className="form-control"
                                                                            value={selectedFinanceId}
                                                                            onChange={(e) => setSelectedFinanceId(e.target.value)}
                                                                            required
                                                                        >
                                                                            {financeOptions.map((financeItem, index) => (
                                                                                <option key={index} value={financeItem.finance_id}>{financeItem.finance_id}</option>
                                                                            ))}
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div style={{ textAlign: 'center' }}>
                                                            <button type="submit" className="btn btn-primary mr-2">Assign</button>
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
                    {/* Footer */}
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default Assignfinance;
