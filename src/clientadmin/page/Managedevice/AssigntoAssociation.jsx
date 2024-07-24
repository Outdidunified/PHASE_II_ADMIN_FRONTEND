import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Footer from '../../components/Footer';


const AssigntoAssociation = ({ userInfo, handleLogout }) => {
    const [selectedAssociationId, setSelectedAssociationId] = useState('');
    const [selectedChargers, setSelectedChargers] = useState([]);
    const [commission, setCommission] = useState('');
    const [reloadPage, setReloadPage] = useState(false); // State to trigger page reload
    const [chargersLoading, setChargersLoading] = useState(true); // State to manage loading state
    const [unallocatedChargers, setUnallocatedChargers] = useState([]);

    const navigate = useNavigate();

    const [clientsList, setClientsList] = useState([]);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await axios.post('/clientadmin/FetchAssociationUserToAssginCharger', {
                    client_id: userInfo.data.client_id
                });
                setClientsList(response.data.data || []);
            } catch (error) {
                console.error('Error fetching clients:', error);
                setClientsList([]);
            }
        };

        const fetchUnallocatedChargers = async () => {
            try {
                const response = await axios.post('/clientadmin/FetchUnAllocatedChargerToAssgin', {
                    client_id: userInfo.data.client_id,
                });
                setUnallocatedChargers(response.data.data || []);
            } catch (error) {
                console.error('Error fetching unallocated charger details:', error);
                setUnallocatedChargers([]);
            } finally {
                setChargersLoading(false);
            }
        };

        fetchClients();
        fetchUnallocatedChargers();
    }, [userInfo, reloadPage]); // Include reloadPage in dependencies to trigger fetch on reload

    const handleAssociationChange = (e) => {
        const selectedAssociationId = e.target.value;
        setSelectedAssociationId(selectedAssociationId);
    };

    const handleChargerChange = (chargerId, checked) => {
        if (checked) {
            setSelectedChargers(prevState => [...prevState, chargerId]);
        } else {
            setSelectedChargers(prevState => prevState.filter(id => id !== chargerId));
        }
    };

    const handleCommissionChange = (e) => {
        setCommission(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (selectedChargers.length === 0) {
            Swal.fire({
                icon: 'warning',
                title: 'No Chargers Selected',
                text: 'Please select at least one charger.',
                timer: 2000,
                timerProgressBar: true
            });
            return;
        }

        // Confirm selected chargers
        Swal.fire({
            title: 'Confirm Selection',
            text: `You have selected chargers: ${selectedChargers.join(', ')}`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                submitAssign();
            }
        });
    };

    const submitAssign = async () => {
        try {
            const response = await axios.post('/clientadmin/AssginChargerToAssociation', {
                association_id: parseInt(selectedAssociationId),
                charger_id: selectedChargers,
                client_commission: commission,
                modified_by: userInfo.data.client_name,
            });

            if (response.data.status === 'Success') {
                Swal.fire({
                    icon: 'success',
                    title: 'Charger Assigned Successfully',
                    timer: 2000,
                    timerProgressBar: true,
                    onClose: () => {
                        setReloadPage(true); // Set reloadPage state to trigger page reload
                    }
                });
                navigate('/clientadmin/Allocateddevice')
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Charger Not Assigned',
                    text: 'Please try again.',
                    timer: 2000,
                    timerProgressBar: true
                });
            }
        } catch (error) {
            console.error('Error assigning charger:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error assigning charger',
                text: 'Please try again later.',
                timer: 2000,
                timerProgressBar: true
            });
        }
    };

    useEffect(() => {
        if (reloadPage) {
            setReloadPage(false); // Reset reloadPage state
            window.location.reload(); // Reload the page after success
        }
    }, [reloadPage]);

    const goBack = () => {
        navigate(-1);
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
                                        <h3 className="font-weight-bold">Assign Chargers to Association</h3>
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
                                                    <h2 className="card-title">Enter Details</h2>
                                                    <form onSubmit={handleSubmit} className="form-sample">
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Select Association</label>
                                                                    <div className="col-sm-9">
                                                                        <select
                                                                            className="form-control"
                                                                            value={selectedAssociationId}
                                                                            style={{color:'black'}}
                                                                            onChange={handleAssociationChange}
                                                                        >
                                                                            <option value="">Select Association</option>
                                                                            {clientsList.map((clientObj) => (
                                                                                <option key={clientObj.client_id} value={clientObj.association_id}>
                                                                                    {clientObj.association_name}
                                                                                </option>
                                                                            ))}
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Select Chargers</label>
                                                                    <div className="col-sm-9">
                                                                        {chargersLoading ? (
                                                                            <p>Loading chargers...</p>
                                                                        ) : (
                                                                            <div className="dropdown">
                                                                                <button
                                                                                    className="btn btn-secondary dropdown-toggle"
                                                                                    type="button"
                                                                                    id="dropdownMenuButton"
                                                                                    data-toggle="dropdown"
                                                                                    aria-haspopup="true"
                                                                                    aria-expanded="false"
                                                                                    style={{ backgroundColor: 'white', color: 'black' }}
                                                                                >
                                                                                    {unallocatedChargers.length > 0 ? (
                                                                                        selectedChargers.length > 0 ? `${selectedChargers.length} Chargers Selected` : 'Select Chargers'
                                                                                    ) : (
                                                                                        <span className="text-danger">No Chargers Available</span>
                                                                                    )}
                                                                                </button>
                                                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                                    {unallocatedChargers.length > 0 ? (
                                                                                        unallocatedChargers.map((chargerObj) => (
                                                                                            <div key={chargerObj.charger_id} className="dropdown-item">
                                                                                                <div className="form-check">
                                                                                                    <input
                                                                                                        className="form-check-input"
                                                                                                        type="checkbox"
                                                                                                        id={`charger-${chargerObj.charger_id}`}
                                                                                                        checked={selectedChargers.includes(chargerObj.charger_id)}
                                                                                                        onChange={(e) => handleChargerChange(chargerObj.charger_id, e.target.checked)}
                                                                                                    />
                                                                                                    <label className="form-check-label" htmlFor={`charger-${chargerObj.charger_id}`}>
                                                                                                        {chargerObj.charger_id}
                                                                                                    </label>
                                                                                                </div>
                                                                                            </div>
                                                                                        ))
                                                                                    ) : (
                                                                                        <div className="dropdown-item">No Chargers Found</div>
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Commission</label>
                                                                    <div className="col-sm-9">
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            value={commission}
                                                                            onChange={handleCommissionChange}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Selected Chargers</label>
                                                                    <div className="col-sm-9">
                                                                        <textarea
                                                                            className="form-control"
                                                                            value={selectedChargers.join(', ')}
                                                                            readOnly
                                                                            rows={4}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="text-center">
                                                            <button type="submit" className="btn btn-primary mr-2">Submit</button>
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

export default AssigntoAssociation;
