import React from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import MainJS from '../MainJS/MainJS'

const ManageDevice = ({ userInfo, handleLogout }) => {
    const url = `/superadmin/FetchCharger`;
    const {
        chargers, loading, error, handleAddDeviceList, handleAssignReseller, handleSearchInputChange, handleViewDeviceList,
    } = MainJS(url);

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
                                            <button type="button" className="btn btn-success" onClick={handleAddDeviceList} style={{marginBottom:'10px', marginRight:'10px'}}>Create</button> 
                                            <button type="button" className="btn btn-warning" onClick={handleAssignReseller} style={{marginBottom:'10px', marginRight:'10px'}}>Assign to Reseller</button>
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
                                                    <div className="col-4 col-xl-8">
                                                        <h4 className="card-title" style={{paddingTop:'10px'}}>List Of Chargers</h4>  
                                                    </div>
                                                    <div className="col-8 col-xl-4">
                                                        <div className="input-group">
                                                            <div className="input-group-prepend hover-cursor" id="navbar-search-icon">
                                                                <span className="input-group-text" id="search">
                                                                <i className="icon-search"></i>
                                                                </span>
                                                            </div>
                                                            <input type="text" className="form-control" placeholder="Search now" aria-label="search" aria-describedby="search" autoComplete="off" onChange={handleSearchInputChange}/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="table-responsive" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                            <table className="table table-striped">
                                                <thead style={{ textAlign: 'center', position: 'sticky', tableLayout: 'fixed', top: 0, backgroundColor: 'white', zIndex: 1 }}>
                                                    <tr> 
                                                        <th>Sl.No</th>
                                                        <th>Charger ID</th>
                                                        <th>Model</th>
                                                        <th>Charger Type</th>
                                                        <th>Gun Connector</th>
                                                        <th>Max Current</th>
                                                        <th>Status</th>
                                                        <th>Option</th>
                                                    </tr>
                                                </thead>
                                                <tbody style={{textAlign:'center'}}>
                                                    {loading ? (
                                                        <tr>
                                                        <td colSpan="8" style={{ marginTop: '50px', textAlign: 'center' }}>Loading...</td>
                                                        </tr>
                                                    ) : error ? (
                                                        <tr>
                                                        <td colSpan="8" style={{ marginTop: '50px', textAlign: 'center' }}>Error: {error}</td>
                                                        </tr>
                                                    ) : (
                                                        Array.isArray(chargers) && chargers.length > 0 ? (
                                                            chargers.map((chargerItem, index) => (
                                                                <tr key={index}>
                                                                    <td>{index + 1}</td>
                                                                    <td>{chargerItem.charger_id ? chargerItem.charger_id : '-'}</td>
                                                                    <td className="py-1">
                                                                        <img src={`../../images/dashboard/${chargerItem.model ? chargerItem.model : '-'}kw.png`} alt="img" />
                                                                    </td>  
                                                                    <td>{chargerItem.type ? chargerItem.type : '-'}</td>
                                                                    <td>
                                                                        {chargerItem.gun_connector === 1
                                                                            ? 'Single phase'
                                                                            : chargerItem.gun_connector === 2
                                                                            ? 'CSS Type 2'
                                                                            : chargerItem.gun_connector === 3
                                                                            ? '3 phase socket'
                                                                        : '-'}
                                                                    </td>
                                                                    <td>{chargerItem.max_current ? chargerItem.max_current : '-'}</td>
                                                                    <td>{chargerItem.status===true ? <span className="text-success">Active</span> : <span className="text-danger">DeActive</span>}</td>
                                                                    <td>
                                                                        <button type="button" className="btn btn-outline-success btn-icon-text" onClick={() => handleViewDeviceList(chargerItem._id)} style={{marginBottom:'10px', marginRight:'10px'}}><i className="mdi mdi-eye"></i>View</button> 
                                                                    </td>
                                                                </tr>
                                                            ))
                                                        ) : (
                                                            <tr>
                                                                <td colSpan="8" style={{ marginTop: '50px', textAlign: 'center' }}>No devices found</td>
                                                            </tr>
                                                        )
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
                 
export default ManageDevice