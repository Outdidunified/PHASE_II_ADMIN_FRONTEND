import React from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import { useLocation } from 'react-router-dom';
import MainJS from '../MainJS/MainJS'

const ViewManageDevice = ({ userInfo, handleLogout }) => {
    const {
        handleBack,
        handleEditDeviceList,
        formatTimestamp,
    } = MainJS();

    const location = useLocation();
    const chargersView = location.state?.chargersView || JSON.parse(localStorage.getItem('viewDeviceData')) || {};
    localStorage.setItem('viewDeviceData', JSON.stringify(chargersView));
    const device = chargersView[0] || {}; // Ensure device is an object to avoid errors

    return (
        <div className='container-scroller'>
            {/* Header */}
            <Header userInfo={userInfo} handleLogout={handleLogout} />
            <div className="container-fluid page-body-wrapper">
                {/* Sidebar */}
                <Sidebar/>
                <div className="main-panel">
                    <div className="content-wrapper">
                        <div className="row">
                            <div className="col-md-12 grid-margin">
                                <div className="row">
                                    <div className="col-12 col-xl-8 mb-4 mb-xl-0">
                                        <h3 className="font-weight-bold">Manage Device</h3>
                                    </div>
                                    <div className="col-12 col-xl-4">
                                        <div className="justify-content-end d-flex">
                                            <button type="button" className="btn btn-outline-primary btn-icon-text" onClick={() => handleEditDeviceList(chargersView)} style={{marginRight:'10px'}}><i className="mdi mdi-pencil btn-icon-prepend"></i>Edit</button>
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
                                        <div className="row">
                                            <div className="col-md-12 grid-margin">
                                                <div className="row">
                                                    <div className="col-12 col-xl-12">
                                                        <div style={{textAlign:'center'}}>
                                                            <h4 className="card-title" style={{paddingTop:'10px'}}>Device Details</h4>  
                                                            <hr></hr>
                                                        </div>
                                                    </div>
                                                    <div className="row col-12 col-xl-12">
                                                        <div className="col-md-4">
                                                            <div className="form-group row">
                                                                <div className="col-sm-12">Charger ID: <span style={{fontWeight:'normal'}}>{device.charger_id ? device.charger_id : '-'}</span></div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <div className="form-group row">
                                                                <div className="col-sm-12">Model: <span style={{fontWeight:'normal'}}>{device.model ? device.model +'KW': '-'}</span></div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <div className="form-group row">
                                                                <div className="col-sm-12">Charger Type: <span style={{fontWeight:'normal'}}>{device.type ? device.type : '-'}</span></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row col-12 col-xl-12">
                                                        <div className="col-md-4">
                                                            <div className="form-group row">
                                                                <div className="col-sm-12">Vendor: <span style={{fontWeight:'normal'}}>{device.vendor ?  device.vendor : '-'}</span></div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <div className="form-group row">
                                                                <div className="col-sm-12">Gun Connector: <span style={{ fontWeight: 'normal' }}>{device.gun_connector === 1 ? ' Single phase' : device.gun_connector === 2 ? ' CSS Type 2' :  device.gun_connector === 3 ? ' 3 phase socket' : '-'}</span></div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <div className="form-group row">
                                                                <div className="col-sm-12">Max Current: <span style={{fontWeight:'normal'}}>{device.max_current ?  device.max_current : '-'}</span></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row col-12 col-xl-12">
                                                        <div className="col-md-4">
                                                            <div className="form-group row">
                                                                <div className="col-sm-12">Max Power: <span style={{fontWeight:'normal'}}>{device.max_power ? device.max_power : '-'}</span></div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <div className="form-group row">
                                                                <div className="col-sm-12">Socket Count: <span style={{fontWeight:'normal'}}>{device.socket_count === 1 ? ' 1 Socket ' : device.socket_count === 2 ? ' 2 Sockets' : device.socket_count === 3 ? ' 3 Sockets' : device.socket_count === 4 ? ' 4 Sockets' : '-'}</span></div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <div className="form-group row">
                                                                <div className="col-sm-12">Current or Active User: <span style={{fontWeight:'normal'}}>{device.current_active_user ?  device.current_active_user : '-'}</span></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row col-12 col-xl-12">
                                                        <div className="col-md-4">
                                                            <div className="form-group row">
                                                                <div className="col-sm-12">Superadmin Commission: <span style={{fontWeight:'normal'}}>{device.superadmin_commission ? device.superadmin_commission : '-'}</span></div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <div className="form-group row">
                                                                <div className="col-sm-12">Reseller Commission: <span style={{fontWeight:'normal'}}>{device.reseller_commission ? device.reseller_commission : '-'}</span></div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <div className="form-group row">
                                                                <div className="col-sm-12">Client Commission: <span style={{fontWeight:'normal'}}>{device.client_commission ? device.client_commission : '-'}</span></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row col-12 col-xl-12">
                                                        <div className="col-md-4">
                                                            <div className="form-group row">
                                                                <div className="col-sm-12">IP: <span style={{fontWeight:'normal'}}>{device.ip ? device.ip : '-'}</span></div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <div className="form-group row">
                                                                <div className="col-sm-12">Latitude: <span style={{fontWeight:'normal'}}>{device.lat ? device.lat : '-'}</span></div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <div className="form-group row">
                                                                <div className="col-sm-12">Longitude: <span style={{fontWeight:'normal'}}>{device.long ? device.long : '-'}</span></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row col-12 col-xl-12">
                                                        <div className="col-md-4">
                                                            <div className="form-group row">
                                                                <div className="col-sm-12">Short Description: <span style={{fontWeight:'normal'}}>{device.short_description ? device.short_description : '-'}</span></div>   
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <div className="form-group row">
                                                                <div className="col-sm-12">Charger Accessibility: <span style={{fontWeight:'normal'}}>{device.charger_accessibility ? device.charger_accessibility : '-'}</span></div>  
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <div className="form-group row">
                                                                <div className="col-sm-12">Unit Price: <span style={{fontWeight:'normal'}}>{device.unit_price ? device.unit_price : '-'}</span></div> 
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row col-12 col-xl-12">
                                                       <div className="col-md-4">
                                                            <div className="form-group row">
                                                                <div className="col-sm-12">Assigned User: <span style={{fontWeight:'normal'}}>{device.assigned_user ? device.assigned_user : '-'}</span></div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <div className="form-group row">
                                                                <div className="col-sm-12">Wifi Password: <span style={{fontWeight:'normal'}}>{device.wifi_password ? device.wifi_password : '-'}</span></div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <div className="form-group row">
                                                                <div className="col-sm-12">Created By: <span style={{fontWeight:'normal'}}>{device.created_by ? device.created_by : '-'}</span></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row col-12 col-xl-12">
                                                        <div className="col-md-4">
                                                            <div className="form-group row">
                                                                <div className="col-sm-12">Created Date: <span style={{fontWeight:'normal'}}>{device.created_date ? formatTimestamp(device.created_date) : '-'}</span></div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <div className="form-group row">
                                                                <div className="col-sm-12">Modified By: <span style={{fontWeight:'normal'}}>{device.modified_by ? device.modified_by : '-'}</span></div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <div className="form-group row">
                                                                <div className="col-sm-12">Modified Date: <span style={{fontWeight:'normal'}}>{device.modified_date ? formatTimestamp(device.modified_date) : '-'}</span></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row col-12 col-xl-12">
                                                        <div className="col-md-4">
                                                            <div className="form-group row">
                                                                <div className="col-sm-12">Status: <span style={{fontWeight:'normal'}}>{device.status === true ? <span className="text-success">Active</span> :  <span className="text-danger">DeActive</span>}</span></div>
                                                            </div>
                                                        </div>                                                               
                                                    </div>
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
                 
export default ViewManageDevice