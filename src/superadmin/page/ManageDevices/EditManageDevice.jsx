import React, {useState} from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';

const EditManageDevice = ({ userInfo, handleLogout }) => {
    const location = useLocation();
    const dataItem = location.state?.newUser || JSON.parse(localStorage.getItem('editDeviceData'));
    localStorage.setItem('editDeviceData', JSON.stringify(dataItem));
    
    const navigate = useNavigate();
    
    // Back view manage device
    const backManageDevice = () => {
        navigate('/superadmin/ViewManageDevice');
    };
    
    // Edit back manage device
    const editBackManageDevice = () => {
        navigate('/superadmin/ManageDevice');
    };
    // Edit manage device
    const [charger_id, setChargerID] = useState(dataItem?.charger_id || '');
    const [tag_id, setTagID] = useState(dataItem?.tag_id || '');
    const [model, setModel] = useState(dataItem?.model || '');
    const [type, setType] = useState(dataItem?.type || '');
    const [vendor, setVendor] = useState(dataItem?.vendor || '');
    const [gun_connector, setGunConnetor] = useState(dataItem?.gun_connector || '');
    const [max_current, setMaxCurrent] = useState(dataItem?.max_current || '');
    const [max_power, setMaxPower] = useState(dataItem?.max_power || '');
    const [socket_count, setSocketCount] = useState(dataItem?.socket_count || '');
    const [errorMessage, setErrorMessage] = useState('');

    // Select model 
    const handleModel = (e) => {
        setModel(e.target.value);
    };
    
    // Select socket
    const handleSocket = (e) => {
        setSocketCount(e.target.value);
    };

    // Select Gunconnector
    const handleGunconnector = (e) => {
        setGunConnetor(e.target.value);
    };
    
    // Selected charger type
    const handleChargerType = (e) => {
        setType(e.target.value);
    };

    // Update manage device
    const editManageDevice = async (e) => {
        e.preventDefault();
        // Validate Charger ID
        const chargerIDRegex = /^[a-zA-Z0-9]{1,14}$/;;
        if (!charger_id) {
            setErrorMessage("Charger ID can't be empty.");
            return;
        }
        if (!chargerIDRegex.test(charger_id)) {
            setErrorMessage('Oops! Charger ID must be a maximum of 14 characters.');
            return;
        }

        // Validate Tag ID
        const tagIDRegex = /^[a-zA-Z0-9]{1,12}$/;;
        if (!tag_id) {
            setErrorMessage("Charger ID can't be empty.");
            return;
        }
        if (!tagIDRegex.test(tag_id)) {
            setErrorMessage('Oops! Tag ID must be a maximum of 12 characters.');
            return;
        }

        // Validate vendor
        const vendorRegex = /^[a-zA-Z0-9 ]{1,20}$/;
        if (!vendor) {
            setErrorMessage("Vendor name can't be empty.");
            return;
        }
        if (!vendorRegex.test(vendor)) {
            setErrorMessage('Oops! Vendor name must be 1 to 20 characters and contain alphanumeric and numbers.');
            return;
        }

        try {
            const gunConnector = parseInt(gun_connector);
            const maxCurrents = parseInt(max_current);
            const maxPowers = parseInt(max_power);
            const socketCounts = parseInt(socket_count);
            const response = await fetch('/superadmin/UpdateCharger', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ charger_id, tag_id, model, type, vendor, gun_connector:gunConnector, max_current:maxCurrents, max_power:maxPowers, socket_count:socketCounts, modified_by: userInfo.data.username  }),
            });
            if (response.ok) {
                Swal.fire({
                    title: "Charger updated successfully",
                    icon: "success"
                });
                editBackManageDevice();
            } else {
                const responseData = await response.json();
                Swal.fire({
                    title: "Error",
                    text: "Failed to Update, " + responseData.message,
                    icon: "error"
                });
            }
        }catch (error) {
            Swal.fire({
                title: "Error:", error,
                text: "An error occurred while updated the charger",
                icon: "error"
            });
        }
    };
    // Add Chargers end
    
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
                                            <button type="button" className="btn btn-success" onClick={backManageDevice}>Back</button>
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
                value = '1';
            } else if (value > 32) {
                value = '32';
            }
            
            // Update the state with the sanitized and restricted value
            setMaxCurrent(value);
        }} 
        required 
    />
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
                                                                                value = '1';
                                                                            } else if (value > 32) {
                                                                                value = '200';
                                                                            }
                                                                            
                                                                            // Update the state with the sanitized and restricted value
                                                                            setMaxPower(value);
                                                                        }} 
                                                                         required/> 
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
                    {/* Footer */}
                    <Footer />
                </div>         
            </div>    
        </div>
    );
};   
                 
export default EditManageDevice