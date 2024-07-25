import React, { useState, useEffect, useRef } from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import { useNavigate, useLocation } from 'react-router-dom';

const Assigneddevicesclient = ({ userInfo, handleLogout }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const client_id = location.state?.client_id || JSON.parse(localStorage.getItem('client_id'));
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const fetchChargerDetailsCalled = useRef(false);

    // Fetch charger details
    useEffect(() => {
        const fetchChargerDetails = async () => {
            try {
                const response = await fetch('/reselleradmin/FetchChargerDetailsWithSession', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ client_id }),
                });
                if (response.ok) {
                    const responseData = await response.json();
                    setData(responseData.data);
                    setFilteredData(responseData.data); // Initialize filtered data with all data
                } else {
                    console.error('Failed to fetch assigned chargers');
                }
            } catch (error) {
                console.error('An error occurred while fetching assigned chargers');
                console.error('Error:', error);
            }
        };

        if (!fetchChargerDetailsCalled.current && client_id) {
            fetchChargerDetails();
            fetchChargerDetailsCalled.current = true; // Mark fetchChargerDetails as called
        }
    }, [client_id]);

    // Data localstorage 
    useEffect(() => {
        if (client_id) {
            localStorage.setItem('client_id', client_id);
        }
    }, [client_id]);

    // Back to manage client
    const backToManageClient = () => {
        navigate('/reselleradmin/ManageClient');
    };

    // View session history page
    const navigateToSessionHistory = (data) => {
        const sessiondata = data.sessiondata[0]; // Assuming sessiondata is an array and we take the first element
        navigate('/reselleradmin/Sessionhistoryclient', { state: { sessiondata } });
    };

    // Search input
    const handleSearchInputChange = (e) => {
        const inputValue = e.target.value.toUpperCase();
        const filteredData = data.filter((item) =>
            item.chargerID.toUpperCase().includes(inputValue)
        );
        setFilteredData(filteredData);
    };

    return (
        <div className='container-scroller'>
            {/* Header */}
            <Header userInfo={userInfo} handleLogout={handleLogout} />
            <div className="container-fluid page-body-wrapper" style={{ paddingTop: '40px' }}>
                {/* Sidebar */}
                <Sidebar />
                <div className="main-panel">
                    <div className="content-wrapper">
                        <div className="row">
                            <div className="col-md-12 grid-margin">
                                <div className="row">
                                    <div className="col-12 col-xl-8 mb-4 mb-xl-0">
                                        <h3 className="font-weight-bold">Assigned Devices</h3>
                                    </div>
                                    <div className="col-12 col-xl-4">
                                        <div className="justify-content-end d-flex">
                                            <button type="button" className="btn btn-success" onClick={backToManageClient}>Back</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12 grid-margin stretch-card">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="col-md-12 grid-margin">
                                            <div className="row">
                                                <div className="col-4 col-xl-8">
                                                    <h4 className="card-title" style={{ paddingTop: '10px' }}>List Of Chargers</h4>
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
                                                            placeholder="Search now"
                                                            onChange={handleSearchInputChange}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="table-responsive" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                            <table className="table table-striped">
                                                <thead style={{ textAlign: 'center', position: 'sticky', tableLayout: 'fixed', top: 0, backgroundColor: 'white', zIndex: 1 }}>
                                                    <tr> 
                                                        <th>Sl.No</th>
                                                        <th>Charger Id</th>
                                                        <th>Session History</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {filteredData.length > 0 ? (
                                                        filteredData.map((item, index) => (
                                                            <tr key={index} style={{ textAlign: 'center' }}>
                                                                <td>{index + 1}</td>
                                                                <td>{item.chargerID}</td>
                                                                <td>
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-outline-success btn-icon-text"
                                                                        onClick={() => navigateToSessionHistory(item)}
                                                                        style={{ marginBottom: '10px', marginLeft: '10px' }}
                                                                    >
                                                                        <i className="mdi mdi-history btn-icon-prepend"></i>Session History
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr className="text-center">
                                                            <td colSpan="6">No Record Found</td>
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

export default Assigneddevicesclient;
