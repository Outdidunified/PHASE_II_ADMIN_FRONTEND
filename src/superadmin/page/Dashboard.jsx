import React from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import MainJS  from './MainJS/MainJS';
import DashboardChart from './MainJS/DashboardChart';
const Dashboard = ({ userInfo, handleLogout }) => {
    const url = `/superadmin/FetchCharger`;
    const {
        chargers, loading, error, handleSearchInputChange, toggleBoxVisibility,
    } = MainJS(url);

    const {
        totalChargers, onlineChargers, offlineChargers, faultyChargers, totalPercentage, onlinePercentage, offlinePercentage, faultyPercentage,
    } = DashboardChart();

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
                                        <h3 className="font-weight-bold">Welcome to <span style={{color:'#4B49AC'}}>{userInfo.data.email_id}</span>,</h3>
                                        <h4 className="font-weight-bold">Super Admin Dashboard</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 grid-margin stretch-card">
                                <div className="card tale-bg">
                                    <div className="card-people mt-auto">
                                        <img src="../../images/dashboard/ev_bg_image-2.png" alt="people" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 grid-margin transparent">
                                <div className="row">
                                    <div className="col-md-6 mb-4 stretch-card transparent">
                                        <div className="card card-tale">
                                            <div className="card-body">
                                                <h4 className="mb-4">Todays Chargers</h4>
                                                <h3 className="fs-30 mb-2">{chargers.length} Charger's</h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-4 stretch-card transparent">
                                        <div className="card card-dark-blue">
                                            <div className="card-body">
                                                <p className="mb-4">Total Bookings</p>
                                                <p className="fs-30 mb-2">61344</p>
                                                <p>22.00% (30 days)</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-4 mb-lg-0 stretch-card transparent">
                                        <div className="card card-light-blue">
                                            <div className="card-body">
                                                <p className="mb-4">Number of Meetings</p>
                                                <p className="fs-30 mb-2">34040</p>
                                                <p>2.00% (30 days)</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 stretch-card transparent">
                                        <div className="card card-light-danger">
                                            <div className="card-body">
                                                <p className="mb-4">Number of Clients</p>
                                                <p className="fs-30 mb-2">47033</p>
                                                <p>0.22% (30 days)</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 grid-margin stretch-card">
                                <div className="card position-relative">
                                    <div className="card-body">
                                        <div id="detailedReports" className="carousel slide detailed-report-carousel position-static pt-2" data-ride="carousel">
                                            <div className="carousel-inner">
                                                <div className="carousel-item active">
                                                    <div className="row">
                                                        <div className="col-md-12 col-xl-3 d-flex flex-column justify-content-start">
                                                            <div className="ml-xl-4 mt-3">
                                                                <p className="card-title">Reports</p>
                                                                <h1 className="text-primary">1000</h1>
                                                                <h3 className="font-weight-500 mb-xl-4 text-primary">Charged cycles</h3>
                                                                <p className="mb-2 mb-xl-0">This achievement underscores the durability of our chargers, ensuring sustained functionality. It also reflects our commitment to providing a reliable and long-lasting charging infrastructure for electric vehicles.</p>
                                                            </div>  
                                                        </div>
                                                        <div className="col-md-12 col-xl-9">
                                                            <div className="row">
                                                                <div className="col-md-6 border-right">
                                                                    <div className="table-responsive mb-3 mb-md-0 mt-3">
                                                                        <table className="table table-borderless report-table">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td className="text-muted"><h5>Total</h5>Chargers installed</td>
                                                                                    <td className="w-100 px-0">
                                                                                        <div className="progress progress-md mx-4">
                                                                                            <div className="progress-bar bg-primary" role="progressbar" style={{width:`${totalPercentage}%`}}></div>
                                                                                        </div>
                                                                                    </td>
                                                                                    <td><h5 className="font-weight-bold mb-0">{totalChargers}</h5></td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td className="text-muted"><h5>Online</h5>Currently Charging</td>
                                                                                    <td className="w-100 px-0">
                                                                                        <div className="progress progress-md mx-4">
                                                                                            <div className="progress-bar bg-success" role="progressbar"  style={{width:`${onlinePercentage}%`}}></div>
                                                                                        </div>
                                                                                    </td>
                                                                                    <td><h5 className="font-weight-bold mb-0">{onlineChargers.length}</h5></td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td className="text-muted"><h5>Offline</h5>Not live</td>
                                                                                    <td className="w-100 px-0">
                                                                                        <div className="progress progress-md mx-4">
                                                                                            <div className="progress-bar bg-danger" role="progressbar"  style={{width:`${offlinePercentage}%`}}></div>
                                                                                        </div>
                                                                                    </td>
                                                                                    <td><h5 className="font-weight-bold mb-0">{offlineChargers.length}</h5></td>
                                                                                </tr>
                                                                                <tr onClick={toggleBoxVisibility} className="custom-hover">
                                                                                    <td className="text-muted"><h5>Faulty</h5>Not live</td>
                                                                                    <td className="w-100 px-0">
                                                                                        <div className="progress progress-md mx-4">
                                                                                            <div className="progress-bar bg-warning" role="progressbar"  style={{width:`${faultyPercentage}%`}}></div>
                                                                                        </div>
                                                                                    </td>
                                                                                    <td><h5 className="font-weight-bold mb-0">{faultyChargers.length}</h5></td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6 mt-3">
                                                                    <div className="report-chart">
                                                                        <div style={{ width: '70%', height: '70%', margin: 'auto', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center'  }}>
                                                                            <canvas id="myChart" style={{ width: '100% !important', height: 'auto !important'}}/>
                                                                        </div> 
                                                                    </div>
                                                                    <div>
                                                                        <div className="report-chart">
                                                                            <div className="d-flex justify-content-between mx-4 mx-xl-5 mt-3">
                                                                                <div className="d-flex align-items-center">
                                                                                    <div className="mr-3" style={{width:'20px', height:'20px', borderRadius:'50%', backgroundColor:' #4B49AC'}}></div>
                                                                                        <p className="mb-0">Total</p>
                                                                                </div>
                                                                                        <p className="mb-0">{totalChargers}</p>
                                                                                </div>
                                                                            <div className="d-flex justify-content-between mx-4 mx-xl-5 mt-3">
                                                                                <div className="d-flex align-items-center">
                                                                                    <div className="mr-3" style={{width:'20px', height:'20px', borderRadius:'50%', backgroundColor:' #57B657'}}></div>
                                                                                    <p className="mb-0">Online </p>
                                                                                </div>
                                                                                        <p className="mb-0">{onlineChargers.length}</p>
                                                                            </div>
                                                                            <div className="d-flex justify-content-between mx-4 mx-xl-5 mt-3">
                                                                                <div className="d-flex align-items-center">
                                                                                    <div className="mr-3" style={{width:'20px', height:'20px', borderRadius:'50%', backgroundColor:' #FF4747'}}></div>
                                                                                    <p className="mb-0">Offline</p>
                                                                                </div>
                                                                                <p className="mb-0">{offlineChargers.length}</p>
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
                                </div>
                            </div>
                        </div>
                        {/* {isBoxVisible && (
                            <div className="row">
                                {faultyChargers.map((charger, index) => (
                                    <div key={index} className="col-md-3 mb-4 stretch-card transparent">
                                        <div className="card card-tale">
                                            <div className="card-body" style={{backgroundImage:'url("images/dashboard/hand-holding-ev.png")', backgroundSize: "cover", backgroundRepeat: "no-repeat"}}>
                                                <div style={{padding:'10px',borderRadius:'10px' ,color:'black'}}>
                                                    <h4>CHARGER :  {charger.ChargerID}</h4>
                                                    <h5>{formatTimestamp(charger.timestamp)}</h5>
                                                </div>
                                                    <hr></hr>
                                                <div style={{padding:'10px',borderRadius:'10px' ,background:'#000000ab'}}>
                                                    <h5>Connector : <span>{charger.connector}</span></h5>
                                                    <h5>Error : <span style={{color:'red'}}>{charger.errorCode}</span></h5>
                                                    <h5>Status: <span style={{color:'yellow'}}>{charger.status}</span></h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>  
                        )} */}
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
                                        <div className="table-responsive" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                            <table className="table table-striped">
                                                <thead style={{ textAlign: 'center', tableLayout: 'fixed', position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 1 }}>
                                                    <tr> 
                                                        <th>Sl.No</th>
                                                        <th>Charger ID</th>
                                                        <th>Model</th>
                                                        <th>Charger Type</th>
                                                        <th>Gun Connector</th>
                                                        <th>Max Current</th>
                                                        <th>Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody style={{textAlign:'center'}}>
                                                    {loading ? (
                                                        <tr>
                                                            <td colSpan="9" style={{ marginTop: '50px', textAlign: 'center' }}>Loading...</td>
                                                        </tr>
                                                    ) : error ? (
                                                        <tr>
                                                        <td colSpan="9" style={{ marginTop: '50px', textAlign: 'center' }}>Error: {error}</td>
                                                        </tr>
                                                    ) : (
                                                        Array.isArray(chargers) && chargers.length > 0 ? (
                                                            chargers.map((chargerItem, index) => (
                                                            <tr key={index}>
                                                                <td>{index + 1}</td>
                                                                <td>{chargerItem.charger_id ? (
                                                                    <span>{chargerItem.charger_id}</span>
                                                                    ): (
                                                                        <span>-</span> 
                                                                    )}
                                                                </td>
                                                                <td className="py-1">
                                                                    <img src={`../../images/dashboard/${chargerItem.model ? chargerItem.model : '-'}kw.png`} alt="img" />
                                                                </td>
                                                                {/* <td>{dataItem.model ? (
                                                                    <span>{dataItem.model}</span>
                                                                    ): (
                                                                        <span>-</span> 
                                                                    )}
                                                                </td> */}
                                                                <td>{chargerItem.type ? (
                                                                    <span>{chargerItem.type}</span>
                                                                    ): (
                                                                        <span>-</span> 
                                                                    )}
                                                                </td>
                                                                <td>
                                                                    {chargerItem.gun_connector === 1
                                                                        ? 'Single phase'
                                                                        : chargerItem.gun_connector === 2
                                                                        ? 'CSS Type 2'
                                                                        : chargerItem.gun_connector === 3
                                                                        ? '3 phase socket'
                                                                    : '-'}
                                                                </td>
                                                                <td>{chargerItem.max_current ? (
                                                                    <span>{chargerItem.max_current}</span>
                                                                    ) : (
                                                                    <span>-</span>
                                                                    )}
                                                                </td>
                                                                <td>{chargerItem.status === true ? (
                                                                        <span className="text-success">Active</span>
                                                                    ) : chargerItem.status === false ? (
                                                                        <span className="text-danger">DeActive</span>
                                                                    ) : (
                                                                        <span>-</span>
                                                                    )}
                                                                </td>
                                                            </tr>
                                                        ))
                                                        ) : (
                                                        <tr>
                                                            <td colSpan="9" style={{ marginTop: '50px', textAlign: 'center' }}>No devices found.</td>
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

export default Dashboard