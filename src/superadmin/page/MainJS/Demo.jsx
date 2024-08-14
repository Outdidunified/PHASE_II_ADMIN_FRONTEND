import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';

const MainJS = (url, userInfo) => {
    const navigate = useNavigate();
    const location = useLocation();

    // State variables
    const [chargerData, setChargerData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filteredChargerData] = useState([]);
    const [chargers, setCharger] = useState([]);
    const fetchDataCalled = useRef(false);
    const [isBoxVisible, setIsBoxVisible] = useState(false);

    // Get manage charger data
    useEffect(() => {
        if (!fetchDataCalled.current) {
            axios.get(url)
                .then((res) => {
                    setChargerData(res.data.data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error('Error fetching data:', err);
                    setError('Error fetching data. Please try again.');
                    setLoading(false);
                });
            fetchDataCalled.current = true;
        }
    }, [url]);

    // Search manage device 
    const handleSearchInputChange = (e) => {
        const inputValue = e.target.value.toUpperCase();
        if (Array.isArray(chargerData)) {
            const filteredChargerData = chargerData.filter((item) =>
                item.charger_id.toUpperCase().includes(inputValue)
            );
            setCharger(filteredChargerData);
        }
    };

    // Update table data 'data', and 'filteredData' 
    useEffect(() => {
        switch (chargerData) {
            case 'filteredData':
                setCharger(filteredChargerData);
                break;
            default:
                setCharger(chargerData);
                break;
        }
    }, [chargerData, filteredChargerData]);

    // Navigate functions add manage device page view
    const handleAddDeviceList = () => {
        navigate('/superadmin/AddManageDevice');
    };

    // Navigate functions manage device page view
    const handleViewDeviceList = (chargerId) => {
        if (Array.isArray(chargers)) {
            const viewChargers = chargers.filter((item) =>
                item._id === chargerId
            );
            navigate(`/superadmin/ViewManageDevice`, { state: { chargersView: viewChargers } });
        }
    };

    // Navigate functions assign reseller page view
    const handleAssignReseller = () => {
        navigate('/superadmin/AssignReseller');
    };

    // Toggle visibility of faulty chargers box
    const toggleBoxVisibility = () => {
        setIsBoxVisible(!isBoxVisible);
    };

    // Function to format timestamps
    function formatTimestamp(originalTimestamp) {
        const date = new Date(originalTimestamp);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        let hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        hours = String(hours).padStart(2, '0');

        const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds} ${ampm}`;
        return formattedDate;
    }
    
    const handleBack = () => navigate(-1);

    const handleEditDeviceList = (chargersView) => {
        navigate('/superadmin/EditManageDevice', { state: { chargersView } });
    };

    const editBackManageDevice = () => navigate('/superadmin/ManageDevice');

    // Extract edit form state and logic
    const editChargerItems = location.state?.chargersView || JSON.parse(localStorage.getItem('editDeviceData'));
    localStorage.setItem('editDeviceData', JSON.stringify(editChargerItems));
    const editChargerItem = editChargerItems[0];

    const [charger_id, setChargerID] = useState(editChargerItem?.charger_id || '');
    const [tag_id, setTagID] = useState(editChargerItem?.tag_id || '');
    const [model, setModel] = useState(editChargerItem?.model || '');
    const [type, setType] = useState(editChargerItem?.type || '');
    const [vendor, setVendor] = useState(editChargerItem?.vendor || '');
    const [gun_connector, setGunConnector] = useState(editChargerItem?.gun_connector || '');
    const [max_current, setMaxCurrent] = useState(editChargerItem?.max_current || '');
    const [max_power, setMaxPower] = useState(editChargerItem?.max_power || '');
    const [socket_count, setSocketCount] = useState(editChargerItem?.socket_count || '');
    const [errorMessage, setErrorMessage] = useState('');
    const [errorMessageCurrent, setErrorMessageCurrent] = useState('');
    const [errorMessagePower, setErrorMessagePower] = useState('');

    useEffect(() => {
        if (errorMessageCurrent || errorMessagePower || errorMessage) {
            const timeout = setTimeout(() => {
                setErrorMessageCurrent('');
                setErrorMessagePower('');
                setErrorMessage('');
            }, 5000);
            return () => clearTimeout(timeout);
        }
    }, [errorMessageCurrent, errorMessagePower, errorMessage]);

    const handleModel = (e) => setModel(e.target.value);
    const handleSocket = (e) => setSocketCount(e.target.value);
    const handleGunconnector = (e) => setGunConnector(e.target.value);
    const handleChargerType = (e) => setType(e.target.value);

    const editManageDevice = async (e) => {
        e.preventDefault();
        const chargerIDRegex = /^[a-zA-Z0-9]{1,14}$/;
        if (!charger_id || !chargerIDRegex.test(charger_id)) {
            setErrorMessage("Charger ID must be a maximum of 14 characters.");
            return;
        }

        const tagIDRegex = /^[a-zA-Z0-9]{1,12}$/;
        if (!tag_id || !tagIDRegex.test(tag_id)) {
            setErrorMessage("Tag ID must be a maximum of 12 characters.");
            return;
        }

        const vendorRegex = /^[a-zA-Z0-9 ]{1,20}$/;
        if (!vendor || !vendorRegex.test(vendor)) {
            setErrorMessage("Vendor name must be 1 to 20 characters and contain alphanumeric characters.");
            return;
        }

        try {
            const gunConnector = parseInt(gun_connector);
            const maxCurrents = parseInt(max_current);
            const maxPowers = parseInt(max_power);
            const socketCounts = parseInt(socket_count);
            const response = await fetch('/superadmin/UpdateCharger', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    charger_id,
                    tag_id,
                    model,
                    type,
                    vendor,
                    gun_connector: gunConnector,
                    max_current: maxCurrents,
                    max_power: maxPowers,
                    socket_count: socketCounts,
                    modified_by: userInfo.data.email_id
                }),
            });
            if (response.ok) {
                Swal.fire({ title: "Charger updated successfully", icon: "success" });
                editBackManageDevice();
            } else {
                const responseData = await response.json();
                Swal.fire({ title: "Error", text: "Failed to Update, " + responseData.message, icon: "error" });
            }
        } catch (error) {
            Swal.fire({ title: "Error", text: "An error occurred while updating the charger", icon: "error" });
        }
    };

    const initialValues = {
        charger_id,
        tag_id,
        model,
        type,
        vendor,
        gun_connector,
        max_current,
        max_power,
        socket_count
    };

    const isFormChanged = () => (
        charger_id !== initialValues.charger_id ||
        tag_id !== initialValues.tag_id ||
        model !== initialValues.model ||
        type !== initialValues.type ||
        vendor !== initialValues.vendor ||
        gun_connector !== initialValues.gun_connector ||
        max_current !== initialValues.max_current ||
        max_power !== initialValues.max_power ||
        socket_count !== initialValues.socket_count
    );

    return {
        chargers,
        filteredChargerData,
        loading,
        error,
        handleAddDeviceList,
        handleAssignReseller,
        handleSearchInputChange,
        handleViewDeviceList,
        toggleBoxVisibility,
        formatTimestamp,
        handleBack,
        handleEditDeviceList,
        editBackManageDevice,
        charger_id, setChargerID, tag_id, setTagID, model, setModel, type, setType, vendor, setVendor,
        gun_connector, setGunConnector, max_current, setMaxCurrent, max_power, setMaxPower, socket_count, setSocketCount,
        errorMessage, errorMessageCurrent, errorMessagePower,
        handleModel, handleSocket, handleGunconnector, handleChargerType,
        editManageDevice, isFormChanged, setErrorMessageCurrent, setErrorMessagePower
    };
};

export default MainJS;







/////////////////////////////////////


import React from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import { useLocation } from 'react-router-dom';
import MainJS from '../MainJS/MainJS';

const EditManageDevice = ({ userInfo, handleLogout }) => {
    const location = useLocation();
    const editChargerItems = location.state?.chargersView || JSON.parse(localStorage.getItem('editDeviceData'));
    localStorage.setItem('editDeviceData', JSON.stringify(editChargerItems));
    const editChargerItem = editChargerItems[0];

    const url = '/api/charger'; // Your API endpoint
    const {
        handleBack,
        charger_id, setChargerID, tag_id, setTagID, model, setModel, type, setType, vendor, setVendor,
        gun_connector, setGunConnector, max_current, setMaxCurrent, max_power, setMaxPower, socket_count, setSocketCount,
        errorMessage, errorMessageCurrent, errorMessagePower,
        handleModel, handleSocket, handleGunconnector, handleChargerType,
        editManageDevice, isFormChanged, setErrorMessageCurrent, setErrorMessagePower
    } = MainJS(url);

    React.useEffect(() => {
        if (editChargerItem) {
            setChargerID(editChargerItem.charger_id || '');
            setTagID(editChargerItem.tag_id || '');
            setModel(editChargerItem.model || '');
            setType(editChargerItem.type || '');
            setVendor(editChargerItem.vendor || '');
            setGunConnector(editChargerItem.gun_connector || '');
            setMaxCurrent(editChargerItem.max_current || '');
            setMaxPower(editChargerItem.max_power || '');
            setSocketCount(editChargerItem.socket_count || '');
        }
    }, [editChargerItem, setChargerID, setTagID, setModel, setType, setVendor, setGunConnector, setMaxCurrent, setMaxPower, setSocketCount]);    
  
    return (
        <div className='container-scroller'>
            {/* Header */}
            <Header userInfo={userInfo} handleLogout={handleLogout}/>
            <div className="container-fluid page-body-wrapper">
                {/* Sidebar */}
                <Sidebar/>
                <div className="main-panel">
                    <div className="content-wrapper">
                        <div className="row">
                            <div className="col-md-12 grid-margin">
                                <div className="row">
                                    <div className="col-12 col-xl-8 mb-4 mb-xl-0">
                                        <h3 className="font-weight-bold">Edit Manage Device</h3>
                                    </div>
                                    <div className="col-12 col-xl-4">
                                        <div className="justify-content-end d-flex">
                                            <button type="button" className="btn btn-success" onClick={handleBack}>Back</button>
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
                                                    <h4 className="card-title">Manage Device</h4>
                                                    <form className="form-sample" onSubmit={editManageDevice}>
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Charger ID</label>
                                                                    <div className="col-sm-9">
                                                                        <input type="text" className="form-control" placeholder="Charger ID" value={charger_id}  onChange={(e) => setChargerID(e.target.value)} readOnly required/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Tag ID</label>
                                                                    <div className="col-sm-9">
                                                                        <input type="text" className="form-control" placeholder="Tag ID" value={tag_id} maxLength={12} onChange={(e) => {const value = e.target.value; const sanitizedValue = value.replace(/[^a-zA-Z0-9]/g, ''); setTagID(sanitizedValue);}} required/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Model</label>
                                                                    <div className="col-sm-9">
                                                                        <select className="form-control" value={model} onChange={handleModel} required>
                                                                            <option value="">Select model</option>
                                                                            <option value="3.5">3.5 KW</option>
                                                                            <option value="7.4">7.4 KW</option>
                                                                            <option value="11">11 KW</option>
                                                                            <option value="22">22 KW</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Charger Type</label>
                                                                    <div className="col-sm-9">
                                                                        <select className="form-control" value={type} onChange={handleChargerType} required >
                                                                            <option value="AC">AC</option>
                                                                            <option value="DC">DC</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Vendor</label>
                                                                    <div className="col-sm-9">
                                                                        <input type="text" className="form-control" placeholder="Vendor" value={vendor} maxLength={20} onChange={(e) => {const value = e.target.value; let sanitizedValue = value.replace(/[^a-zA-Z0-9 ]/g, ''); setVendor(sanitizedValue); }} required/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group row"> 
                                                                    <label className="col-sm-3 col-form-label">Gun connector</label>
                                                                    <div className="col-sm-9">
                                                                        <select className="form-control" value={gun_connector} onChange={handleGunconnector} required>
                                                                            <option value="">Select Gun connector</option>
                                                                            <option value="3">3 phase socket </option>
                                                                            <option value="2">CSS Type 2</option>
                                                                            <option value="1">Single phase socket</option>
                                                                        </select> 
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Max Current</label>
                                                                    <div className="col-sm-9">
                                                                        <input 
                                                                            type="tel" 
                                                                            className="form-control" 
                                                                            placeholder="Max Current" 
                                                                            value={max_current} 
                                                                            onChange={(e) => {
                                                                                let value = e.target.value;
                                                                                
                                                                                // Remove any non-numeric characters
                                                                                value = value.replace(/\D/g, '');
                                                                                
                                                                                // Ensure the value is within the specified range
                                                                                if (value < 1) {
                                                                                    value = '';
                                                                                } else if (value > 32) {
                                                                                    setErrorMessageCurrent('Max Current limit is 1 to 32');

                                                                                    value = '32';
                                                                                }
                                                                                
                                                                                // Update the state with the sanitized and restricted value
                                                                                setMaxCurrent(value);
                                                                            }} 
                                                                            required 
                                                                        />
                                                                        {errorMessageCurrent && <div className="text-danger">{errorMessageCurrent}</div>}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Max Power</label>
                                                                    <div className="col-sm-9">
                                                                        <input type="tel" className="form-control" placeholder="Max Power" value={max_power} 
                                                                        onChange={(e) => {
                                                                            let value = e.target.value;
                                                                            
                                                                            // Remove any non-numeric characters
                                                                            value = value.replace(/\D/g, '');
                                                                            
                                                                            // Ensure the value is within the specified range
                                                                            if (value < 1) {
                                                                                value = '';
                                                                            } else if (value > 200) {
                                                                                setErrorMessagePower('Max Power limit is 1 to 200');
                                                                                value = '200';
                                                                            }
                                                                            
                                                                            // Update the state with the sanitized and restricted value
                                                                            setMaxPower(value);
                                                                        }} 
                                                                         required/> 
                                                                          {errorMessagePower && <div className="text-danger">{errorMessagePower}</div>}

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Socket Count</label>
                                                                    <div className="col-sm-9">
                                                                        <select className="form-control" value={socket_count} onChange={handleSocket} required>
                                                                            <option value="">Select socket</option>
                                                                            <option value="1">1 Socket</option>
                                                                            <option value="2">2 Sockets</option>
                                                                            <option value="3">3 Sockets</option>
                                                                            <option value="4">4 Sockets</option>
                                                                        </select>                                                                    
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {errorMessage && <div className="text-danger">{errorMessage}</div>}
                                                        <div style={{textAlign:'center'}}>
                                                            <button type="submit" className="btn btn-primary mr-2" disabled={!isFormChanged()}>Update</button>
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
                 
export default EditManageDevice