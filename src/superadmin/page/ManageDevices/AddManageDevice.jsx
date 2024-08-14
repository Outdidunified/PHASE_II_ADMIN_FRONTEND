import React from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import useAddManageDevice from '../MainJS/AddManageDevice';

const AddManageDevice = ({ userInfo, handleLogout }) => {
    const {
        charger_id, setChargerID, tag_id, setTagID, model, handleModel, vendor, setVendor,
        gunConnector, handleGunconnector, maxCurrent, setMaxCurrent, maxPower, setMaxPower,
        socketCount, handleSocket, selectChargerType, handleChargerType,
        errorMessage, errorMessageCurrent, errorMessagePower, data,
        addManageDevice, backManageDevice, handleClone, setErrorMessageCurrent, setErrorMessagePower,
    } = useAddManageDevice(userInfo);

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
                                        <h3 className="font-weight-bold">Add Manage Device</h3>
                                    </div>
                                    <div className="col-12 col-xl-4">
                                        <div className="justify-content-end d-flex">
                                            <div className="dropdown">
                                                <button className="btn btn-outline-warning btn-icon-text dropdown-toggle" type="button" style={{marginRight:'10px'}} id="dropdownMenuIconButton1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <i className="ti-file btn-icon-prepend"></i>Select Clone
                                                </button>
                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuIconButton1">
                                                    <h6 className="dropdown-header">Select clone model</h6>
                                                    {Array.from(new Set(data.map(item => item.model))).map((uniqueModel, index) => (
                                                        <p key={index} className="dropdown-item" onClick={() => handleClone(uniqueModel)}>{uniqueModel} KW</p>
                                                    ))}
                                                </div>
                                            </div>
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
                                                    <form className="form-sample" onSubmit={addManageDevice}>
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Charger ID</label>
                                                                    <div className="col-sm-9">
                                                                        <input type="text" className="form-control" placeholder="Charger ID" value={charger_id} maxLength={14} onChange={(e) => {const value = e.target.value; const sanitizedValue = value.replace(/[^a-zA-Z0-9]/g, ''); setChargerID(sanitizedValue);}} required/>
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
                                                                        <select className="form-control" value={selectChargerType} onChange={handleChargerType} required>
                                                                            <option value="">Select type</option>
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
                                                                        <input type="text" className="form-control" placeholder="Vendor" value={vendor} min={1} maxLength={20} onChange={(e) => {const value = e.target.value; let sanitizedValue = value.replace(/[^a-zA-Z0-9 ]/g, ''); setVendor(sanitizedValue); }} required/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Gun Connector</label>
                                                                    <div className="col-sm-9">
                                                                        <select className="form-control" value={gunConnector} onChange={handleGunconnector} required>
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
                                                                        <input type="tel" className="form-control" placeholder="Max Current" value={maxCurrent} 
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
                                                                         required/> 
                                                                        {errorMessageCurrent && <div className="text-danger">{errorMessageCurrent}</div>}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Max Power</label>
                                                                    <div className="col-sm-9">
                                                                        <input type="tel" className="form-control" placeholder="Max Power" value={maxPower} 
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
                                                                        <select className="form-control" value={socketCount} onChange={handleSocket} required>
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
                                                        {errorMessage && <div className="text-danger">{errorMessage}</div>}<br></br>
                                                        <div style={{ textAlign: 'center' }}>
                                                            <button type="submit" className="btn btn-primary mr-2">Add</button>
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

export default AddManageDevice;
