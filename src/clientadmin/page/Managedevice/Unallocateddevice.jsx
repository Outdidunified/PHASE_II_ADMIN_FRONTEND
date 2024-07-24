import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const Unallocateddevice = ({ userInfo, handleLogout }) => {
    const [unallocatedChargers, setUnallocatedChargers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filterChargers = (chargers) => {
        return chargers.filter((charger) =>
            charger.charger_id.toString().toLowerCase().includes(searchQuery.toLowerCase())
        );
    };

    const navigateToViewChargerDetails = (charger) => {
        navigate('/clientadmin/ViewUnalloc', { state: { charger } });
    };

    useEffect(() => {
        const fetchUnAllocatedChargerDetails = async () => {
            try {
                const response = await axios.post('/clientadmin/FetchUnAllocatedCharger', {
                    client_id: userInfo.data.client_id,
                });

             
                setUnallocatedChargers(response.data.data || []);
            } catch (error) {
                console.error('Error fetching unallocated charger details:', error);
                // Handle error appropriately, such as showing an error message to the user
            }
        };

        fetchUnAllocatedChargerDetails();

        // Include fetchUnAllocatedChargerDetails in the dependency array
    }, [userInfo.data.client_id]);  // userInfo.data.client_id should remain the only dependency here

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
                                        <h3 className="font-weight-bold">Manage Devices - UnAllocated</h3>
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
                                        <div className="row">
                                            <div className="col-12 col-xl-8">
                                                <h4 className="card-title" style={{ paddingTop: '10px' }}>List Of Devices</h4>
                                            </div>
                                            <div className="col-12 col-xl-4">
                                                <div className="input-group">
                                                    <div className="input-group-prepend hover-cursor" id="navbar-search-icon">
                                                        <span className="input-group-text" id="search">
                                                            <i className="icon-search"></i>
                                                        </span>
                                                    </div>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Search by Charger ID..."
                                                        value={searchQuery}
                                                        onChange={handleSearch}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="table-responsive">
                                            <table className="table table-striped">
                                                <thead style={{ textAlign: 'center' }}>
                                                    <tr>
                                                        <th>Sl.No</th>
                                                        <th>Charger Id</th>
                                                        <th>Model</th>
                                                        <th>Charger Type</th>
                                                        <th>Gun Connector</th>
                                                        <th>Max Current</th>
                                                        <th>Created Date</th>
                                                        <th>Status</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody style={{ textAlign: 'center' }}>
                                                    {filterChargers(unallocatedChargers).length > 0 ? (
                                                        filterChargers(unallocatedChargers).map((charger, index) => (
                                                            <tr key={charger.charger_id}>
                                                                <td>{index + 1}</td>
                                                                <td>{charger.charger_id}</td>
                                                                <td>{charger.model}</td>
                                                                <td>{charger.type}</td>
                                                                <td>{charger.gun_connector}</td>
                                                                <td>{charger.max_current}</td>
                                                                <td>{charger.created_date ? new Date(charger.created_date).toLocaleString() : ''}</td>
                                                                <td style={{ color: charger.status ? 'green' : 'red' }}>{charger.status ? 'Active' : 'Inactive'}</td>
                                                                <td>
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-outline-dark btn-icon-text"
                                                                        onClick={() => navigateToViewChargerDetails(charger)}
                                                                        style={{ marginBottom: '10px', marginRight: '10px' }}
                                                                    >
                                                                        <i className="mdi mdi-eye btn-icon-prepend"></i>View
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr className="text-center">
                                                            <td colSpan="9">No Record Found</td>
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
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default Unallocateddevice;
