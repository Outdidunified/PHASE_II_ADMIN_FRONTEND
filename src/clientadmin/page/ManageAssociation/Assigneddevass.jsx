import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import { useLocation, useNavigate } from 'react-router-dom';

const Assigneddevass = ({ userInfo, handleLogout }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [originalData, setOriginalData] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const { association } = location.state || {};
        if (association && association.association_id) {
            const association_id = association.association_id;
            fetchAssignedDevices(association_id); // Call fetchAssignedDevices with association_id
        }
    }, [location]);

    const fetchAssignedDevices = async (association_id) => {
        try {
            const response = await axios.post('/clientadmin/FetchChargerDetailsWithSession', {
                association_id: association_id,
            });

            if (response.data.status === 'Success' && response.data.data.length > 0) {
                const fetchedData = response.data.data.map(item => ({
                    charger_id: item.charger_id,
                    finance_id: item.finance_id,
                    client_commission: item.client_commission,
                    sessiondata: item.sessiondata // Ensure sessiondata is included
                }));
                setFilteredData(fetchedData);
                setOriginalData(fetchedData); // Keep original data for resetting
            } else {
                console.log('No assigned devices found');
                setFilteredData([]);
                setOriginalData([]);
            }
        } catch (error) {
            console.error('Error fetching assigned devices:', error);
        }
    };

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        if (query.trim() === '') {
            // If search query is empty, show all original data
            setFilteredData(originalData);
        } else {
            // Filter data based on search query
            const filtered = originalData.filter(item =>
                item.charger_id.toLowerCase().includes(query)
            );
            setFilteredData(filtered);
        }
    };

    const goBack = () => {
        navigate(-1);
    };

    const navsessionhistory = (item) => {
        const sessiondata = item.sessiondata[0];
      
       
        navigate('/clientadmin/Sessionhistoryass', { state: { sessiondata } });
    };

    const navtoassignfinance = (charger_id) => {
        navigate('/clientadmin/assignfinance', { state: { charger_id } }); // Navigate to assignfinance page with charger_id
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
                                        <h3 className="font-weight-bold">Assigned Devices</h3>
                                    </div>
                                    <div className="col-12 col-xl-4">
                                        <div className="justify-content-end d-flex">
                                            <button
                                                type="button"
                                                className="btn btn-success"
                                                onClick={goBack}
                                                style={{ marginRight: '10px' }}
                                            >Go back
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
                                        <div className="col-md-12 grid-margin">
                                            <div className="row">
                                                <div className="col-4 col-xl-8">
                                                    {/* <h4 className="card-title" style={{ paddingTop: '10px' }}></h4> */}
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
                                                            placeholder="Search by Charger Id"
                                                            value={searchQuery}
                                                            onChange={handleSearch}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="table-responsive">
                                            <table className="table table-striped">
                                                <thead style={{ textAlign: 'center' }}>
                                                    <tr>
                                                        <th>Sl.No</th>
                                                        <th>Charger Id</th>
                                                        <th>Finance_Id</th>
                                                        <th>Client Commission</th>
                                                        <th>Assign Finance</th>
                                                        <th>Session History</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {filteredData.length > 0 ? (
                                                        filteredData.map((item, index) => (
                                                            <tr key={index} style={{ textAlign: 'center' }}>
                                                                <td>{index + 1}</td>
                                                                <td>{item.charger_id}</td>
                                                                <td>{item.finance_id ? item.finance_id : <span style={{ color: 'red' }}>Not yet Assigned</span>}</td>
                                                                <td>{item.client_commission}</td>
                                                                <td>
                                                                    <button
                                                                        type="button"
                                                                        className={`btn btn-outline-success btn-icon-text ${item.finance_id ? 'disabled' : ''}`}
                                                                        onClick={() => navtoassignfinance(item.charger_id)}
                                                                        style={{ marginBottom: '10px', marginRight: '10px' }}
                                                                        disabled={item.finance_id}
                                                                    >
                                                                        <i className="mdi mdi-check btn-icon-prepend"></i>Assign
                                                                    </button>
                                                                </td>
                                                                <td>
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-outline-dark btn-icon-text"
                                                                        onClick={() => navsessionhistory(item)}
                                                                        style={{ marginBottom: '10px', marginLeft: '10px' }}
                                                                    >
                                                                        <i className="mdi mdi-history btn-icon-prepend"></i>Session History
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td colSpan="8" className="text-center">No associations found.</td>
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

export default Assigneddevass;
