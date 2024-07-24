import React, { useState } from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import QRCode from 'qrcode.react'; // Import the QRCode library

const ManageDevice = ({ userInfo, handleLogout }) => {

    // Qr and location icon bottom box css start
    const divStyle = {
        background: '#070707BD',
        color:'white',
        borderRadius: '5px',
        width: 'fit-content',
        padding: '5px',
        marginTop:'10px',
        marginBottom: '5px',
        marginRight:'5px',
        display: 'inline-block', // Set display to inline-block to show divs in the same line
    };
    const divStyleTwo = {
        background: '#070707BD',
        color:'white',        
        borderRadius: '5px',
        width: 'fit-content',
        padding: '5px',
        marginBottom: '5px',
        marginRight:'5px',
        display: 'inline-block', // Set display to inline-block to show divs in the same line
    }
    // Qr and location icon bottom box css end

    // Add Chargers start 
    const [showAddForm, setShowAddForm] = useState(false);

    const addChargers = () => {
        setShowAddForm(prevState => !prevState); // Toggles the form visibility
    };
    const closeAddModal = () => {
        setShowAddForm(false); // Close the form
    };
    const modalAddStyle = {
        display: showAddForm ? 'block' : 'none',
    }

    // Add charger details in server
    const [hardwareID, sethardwareID] = useState('');
    const [maxCurrent, setmaxCurrent] = useState('');
    const [gunCount, setgunCount] = useState('');
    const [connectivity, setconnectivity] = useState('');
    const [chargerModel, setchargerModel] = useState('');
    const [currentPhase, setcurrentPhase] = useState('');
    const [maxPower, setmaxPower] = useState('');
    const [socketCount, setsocketCount] = useState('');
    const [chargerTag, setchargerTag] = useState('');
    const [chargerType, setchargerType] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const addChargerSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://192.168.1.70:9090/GetAllinputData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ hardwareID, maxCurrent, gunCount, connectivity, chargerModel, currentPhase, maxPower, socketCount, chargerTag, chargerType, }),
            });
            alert(  JSON.stringify({ hardwareID, maxCurrent, gunCount, connectivity, chargerModel, currentPhase,
                maxPower, socketCount, chargerTag, chargerType }), 'add charger all data' );
            if (response.ok) {
                alert('Charger added successfully');
                // Clear the input after successful submission if needed
                sethardwareID(''); 
                setmaxCurrent(''); 
                setgunCount(''); 
                setconnectivity(''); 
                setchargerModel(''); 
                setcurrentPhase(''); 
                setmaxPower(''); 
                setsocketCount(''); 
                setchargerTag(''); 
                setchargerType(''); 

                setShowAddForm(false); // Close the form after successful addition
            } else {
                setErrorMessage('Failed to add charger');
            }
        }catch (error) {
                setErrorMessage('An error occurred while adding the charger');
                console.error('Error:', error);
        }
    };
    // Add Chargers end

    // QR start 
    const [showQRForm, setShowQRForm] = useState(false);

    const toggleQRForm = () => {
        setShowQRForm(prevState => !prevState); // Toggles the form visibility
    };
    const closeQRModal = () => {
        setShowQRForm(false); // Close the form
    };
    const modalQRStyle = {
        display: showQRForm ? 'block' : 'none',
    }
    // QR end

    // Location start 
    const [showLocationForm, setShowLocationForm] = useState(false);

    const toggleLocationForm = () => {
        setShowLocationForm(prevState => !prevState); // Toggles the form visibility
    };
    const closeLocationModal = () => {
        setShowLocationForm(false); // Close the form
    };
    const modalLocationStyle = {
        display: showLocationForm ? 'block' : 'none',
    }
    // QR end

    // Mode selection option start
    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionChange = async (e) => {
        const value = e.target.value;
        setSelectedOption(value);

        try {
            const response = await fetch('http://192.168.1.70:9090/GetAllinputData', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ value }), // Pass value as an object property
            });

            alert('Selected data' + JSON.stringify({ value })); // Alert the selected value
 
            if (response.ok) {
                alert(`Selected option: ${value} - Data sent successfully!`);
            } else {
                alert('Error sending data.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Something went wrong.');
        }
    };
    // Mode selection option end

    //  Edit Info box start
    const [showForm, setShowForm] = useState(false);

    const toggleForm = () => {
        setShowForm(prevState => !prevState); // Toggles the form visibility
    };

    const closeModal = () => {
        setShowForm(false); // Close the form
    };
    const modalStyle = {
        display: showForm ? 'block' : 'none',
    }
    // Edit Info box end

    //  Clone box start
    const [showCloneForm, setShowCloneForm] = useState(false);

    const toggleCloneForm = () => {
        setShowCloneForm(prevState => !prevState); // Toggles the form visibility
    };

    const closeCloneModal = () => {
        setShowCloneForm(false); // Close the form
    };
    const modalCloneStyle = {
        display: showCloneForm ? 'block' : 'none',
    }
    // Clone Info box end

    //  Rates box start
    const [showRatesForm, setShowRatesForm] = useState(false);

    const toggleRatesForm = () => {
        setShowRatesForm(prevState => !prevState); // Toggles the form visibility
    };

    const closeRatesModal = () => {
        setShowRatesForm(false); // Close the form
    };
    const modalRatesStyle = {
        display: showRatesForm ? 'block' : 'none',
    }

    const [baseRate, setBaseRate] = useState('BASE PRICE');
    const [discount, setDiscount] = useState('WEEKENDS');
    const [surcharge, setSurcharge] = useState('MORNING');
    const [errorMessageRate, setErrorMessageRate] = useState('');

    const handleSubmit = async () => {
        // Construct the data object to be sent to the API
        const dataToSend = {
            baseRate,
            discount,
            surcharge,
        };
    
        try {
            // Send data to the Node.js API using fetch or axios
            const response = await fetch('http://192.168.1.70:9090/GetAllinputData', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });
            alert('Data to be sent: ' + JSON.stringify(dataToSend)); // Alert with the data before sending
            if (response.ok) {
                // Data successfully sent
                alert('Data sent successfully!');
            } else {
                // Error handling if the response is not OK
                // alert('Error sending data.');
                setErrorMessageRate('Failed to add rates');
            }
        } catch (error) {
            // Handle network errors or other exceptions
            setErrorMessageRate('An error occurred while adding the rates');
            console.error('Error:', error);
        }
    };
    // Rates Info box end
    
    return (
        <div className='container-scroller'>
            {/* Header */}
            {/* <Header/> */}
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
                                            <button type="button" className="btn btn-success" onClick={addChargers}>ADD CHARGERS</button>
                                            {/* Edit Info box start */}
                                            <div className="modalStyle" style={modalAddStyle}>
                                                <div className="modalContentStyle" style={{ maxHeight: '680px', overflowY: 'auto' }}>
                                                    <span onClick={closeAddModal} style={{ float: 'right', cursor: 'pointer', fontSize:'30px' }}>&times;</span>
                                                    <form className="pt-3" onSubmit={addChargerSubmit}>
                                                        <div className="card-body">
                                                            <h4 className="card-title">Add Charger</h4>
                                                            <div className="table-responsive pt-3">
                                                                <div className="input-group">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text" style={{color:'black', width:'125px'}}>Hardware ID</span>
                                                                    </div>
                                                                    <input type="text" className="form-control" value={hardwareID}  onChange={(e) => sethardwareID(e.target.value)} required/>
                                                                </div>
                                                                <div className="input-group">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text" style={{color:'black', width:'125px'}}>Max Current(A)</span>
                                                                    </div>
                                                                    <input type="text" className="form-control" value={maxCurrent}  onChange={(e) => setmaxCurrent(e.target.value)} required/>
                                                                </div>
                                                                <div className="input-group">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text" style={{color:'black', width:'125px'}}>Gun Count</span>
                                                                    </div>
                                                                    <input type="text" className="form-control" value={gunCount}  onChange={(e) => setgunCount(e.target.value)} required/>
                                                                </div>
                                                                <div className="input-group">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text" style={{color:'black', width:'125px'}}>Connectivity</span>
                                                                    </div>
                                                                    <input type="text" className="form-control" value={connectivity}  onChange={(e) => setconnectivity(e.target.value)} required/>
                                                                </div>
                                                                <div className="input-group">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text" style={{color:'black', width:'125px'}}>Charger Model</span>
                                                                    </div>
                                                                    <input type="text" className="form-control" value={chargerModel}  onChange={(e) => setchargerModel(e.target.value)} required/>
                                                                </div>
                                                                <div className="input-group">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text" style={{color:'black', width:'125px'}}>Current Phase</span>
                                                                    </div>
                                                                    <input type="text" className="form-control" value={currentPhase}  onChange={(e) => setcurrentPhase(e.target.value)} required/>
                                                                </div>
                                                                <div className="input-group">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text" style={{color:'black', width:'125px'}}>Max Power(Wh)</span>
                                                                    </div>
                                                                    <input type="text" className="form-control" value={maxPower}  onChange={(e) => setmaxPower(e.target.value)} required/>
                                                                </div>
                                                                <div className="input-group">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text" style={{color:'black', width:'125px'}}>Socket Count</span>
                                                                    </div>
                                                                    <input type="text" className="form-control" value={socketCount}  onChange={(e) => setsocketCount(e.target.value)} required/>
                                                                </div>
                                                                <div className="input-group">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text" style={{color:'black', width:'125px'}}>Charger Tag</span>
                                                                    </div>
                                                                    <input type="text" className="form-control" value={chargerTag}  onChange={(e) => setchargerTag(e.target.value)} required/>
                                                                </div>
                                                                <div className="input-group">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text" style={{color:'black', width:'125px'}}>Charger Type</span>
                                                                    </div>
                                                                    <input type="text" className="form-control" value={chargerType}  onChange={(e) => setchargerType(e.target.value)} required/>
                                                                </div>
                                                            </div>
                                                            {errorMessage && <div className="text-danger">{errorMessage}</div>}
                                                            <button type="submit" className="btn btn-primary mr-2" style={{marginTop:'10px'}}>Add</button>
                                                            <button className="btn btn-danger" onClick={closeAddModal} style={{marginTop:'10px'}}>Cancel</button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                            {/* Edit Info box start */}
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
                                                            <input type="text" className="form-control" placeholder="Search now" aria-label="search" aria-describedby="search" autoComplete="off"/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="table-responsive">
                                            <table className="table table-striped">
                                                <thead style={{textAlign:'center'}}>
                                                    <tr> 
                                                        <th>Sl.No</th>
                                                        <th>ID</th>
                                                        <th>Hardware</th>
                                                        <th>Mode</th>
                                                        <th>Pricing</th>
                                                        <th>Operation</th>
                                                    </tr>
                                                </thead>
                                                <tbody style={{textAlign:'center'}}>
                                                    <tr>
                                                        <td>1</td>
                                                        <td>390606000926</td>
                                                        <td> 
                                                            <button type="button" className="btn btn-social-icon btn-outline-dribbble" onClick={toggleQRForm} style={{marginRight:'10px'}}><i className="mdi mdi-qrcode-scan" style={{fontSize: '30px'}}></i></button>
                                                            <button type="button" className="btn btn-social-icon btn-outline-success" onClick={toggleLocationForm}><i className="mdi mdi-map-marker-multiple" style={{fontSize: '30px'}}></i> </button><br></br>
                                                            <div style={divStyle}>AW1201</div>
                                                            <div style={divStyle}>3.5KWH | 16A</div><br></br>
                                                            <div style={divStyleTwo}>OTD36_0110 | AC | 1 PHASE | WIFI</div><br></br>
                                                            <div style={divStyleTwo}>GUN 0 | SOCKET 1</div>
                                                        </td>
                                                        <td>
                                                            <div className='form-group'> 
                                                                <div className="form-check form-check-success">
                                                                    <label className="form-check-label"><input type="radio" className="form-check-input" name="optionsRadios1" id="optionsRadios1" value="Public" checked={selectedOption === 'Public'} onChange={handleOptionChange}/>Public<i className="input-helper"></i></label>
                                                                </div>
                                                                <div className="form-check form-check-warning">
                                                                    <label className="form-check-label"><input type="radio" className="form-check-input" name="optionsRadios1" id="optionsRadios2" value="Private" checked={selectedOption === 'Private'} onChange={handleOptionChange}/>Private<i className="input-helper"></i></label>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <h6 style={{color:'#0fcb0f'}}>NO PARKING FEE</h6><hr></hr>
                                                            <h6 style={{color:'#ff42ac'}}>CLUB MEMBER</h6>
                                                        </td>
                                                        <td>
                                                            <button type="button" className=" btn btn-outline-success btn-icon-text" onClick={toggleForm} style={{marginBottom:'10px', marginRight:'10px'}}><i className="mdi mdi-pencil btn-icon-prepend"></i>Edit Info</button>
                                                            <button type="button" className="btn btn-outline-primary btn-icon-text" onClick={toggleRatesForm} style={{marginBottom:'10px', marginRight:'10px'}}><i className="mdi mdi-currency-inr btn-icon-prepend"></i>Edit Rates</button><br></br>
                                                            <button type="button" className="btn btn-outline-warning btn-icon-text" onClick={toggleCloneForm} style={{marginBottom:'10px', marginRight:'10px'}}><i className="ti-file btn-icon-prepend"></i>Clone</button> 
                                                            <button type="button" className="btn btn-outline-danger btn-icon-text" style={{marginBottom:'10px', marginRight:'10px'}}><i className="mdi mdi-delete-forever btn-icon-prepend"></i>Delete</button><br></br>
                                                           
                                                            {/* QR box start */}
                                                            <div className="modalStyle" style={modalQRStyle}>
                                                                <div className="modalContentStyle" style={{ maxHeight: '650px', overflowY: 'auto' }}>
                                                                    <span onClick={closeQRModal} style={{ float: 'right', cursor: 'pointer', fontSize:'30px' }}>&times;</span>
                                                                    <div className="card">
                                                                        <div className="card-body">
                                                                            <h4 className="card-title">Scan Me</h4>
                                                                            <div className="table-responsive pt-3">
                                                                                {20154548 && <QRCode value='20154548' style={{width:'200px', height:'200px'}}/>} {/* Display QR code if device ID is available */}
                                                                            </div>
                                                                        </div> 
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {/* QR box end */}

                                                            {/* Location box start */}
                                                            <div className="modalStyle" style={modalLocationStyle}>
                                                                <div className="modalContentStyle" style={{ maxHeight: '650px', overflowY: 'auto' }}>
                                                                    <span onClick={closeLocationModal} style={{ float: 'right', cursor: 'pointer', fontSize:'30px' }}>&times;</span>
                                                                    <div className="card">
                                                                        <div className="card-body">
                                                                            <h4 className="card-title">Location : Scan Me</h4>
                                                                            <div className="table-responsive pt-3">
                                                                                {20154548 && <QRCode value='20154548' style={{width:'200px', height:'200px'}}/>} {/* Display QR code if device ID is available */}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {/* Location box end */}

                                                            {/* Edit Info box start */}
                                                            <div className="modalStyle" style={modalStyle}>
                                                                <div className="modalContentStyle" style={{ maxHeight: '650px', overflowY: 'auto' }}>
                                                                    <span onClick={closeModal} style={{ float: 'right', cursor: 'pointer', fontSize:'30px' }}>&times;</span>
                                                                    <div className="card">
                                                                        <div className="card-body">
                                                                            <h4 className="card-title">Edit Info</h4>
                                                                            <div className="table-responsive pt-3">
                                                                                <div className="input-group">
                                                                                    <div className="input-group-prepend">
                                                                                        <span className="input-group-text" style={{color:'black', width:'125px'}}>Hardware ID</span>
                                                                                    </div>
                                                                                    <input type="text" className="form-control" />
                                                                                </div>
                                                                                <div className="input-group">
                                                                                    <div className="input-group-prepend">
                                                                                        <span className="input-group-text" style={{color:'black', width:'125px'}}>Max Current(A)</span>
                                                                                    </div>
                                                                                    <input type="text" className="form-control" />
                                                                                </div>
                                                                                <div className="input-group">
                                                                                    <div className="input-group-prepend">
                                                                                        <span className="input-group-text" style={{color:'black', width:'125px'}}>Gun Count</span>
                                                                                    </div>
                                                                                    <input type="text" className="form-control" />
                                                                                </div>
                                                                                <div className="input-group">
                                                                                    <div className="input-group-prepend">
                                                                                        <span className="input-group-text" style={{color:'black', width:'125px'}}>Connectivity</span>
                                                                                    </div>
                                                                                    <input type="text" className="form-control" />
                                                                                </div>
                                                                                <div className="input-group">
                                                                                    <div className="input-group-prepend">
                                                                                        <span className="input-group-text" style={{color:'black', width:'125px'}}>Charger Model</span>
                                                                                    </div>
                                                                                    <input type="text" className="form-control" />
                                                                                </div>
                                                                                <div className="input-group">
                                                                                    <div className="input-group-prepend">
                                                                                        <span className="input-group-text" style={{color:'black', width:'125px'}}>Current Phase</span>
                                                                                    </div>
                                                                                    <input type="text" className="form-control" />
                                                                                </div>
                                                                                <div className="input-group">
                                                                                    <div className="input-group-prepend">
                                                                                        <span className="input-group-text" style={{color:'black', width:'125px'}}>Max Power(Wh)</span>
                                                                                    </div>
                                                                                    <input type="text" className="form-control" />
                                                                                </div>
                                                                                <div className="input-group">
                                                                                    <div className="input-group-prepend">
                                                                                        <span className="input-group-text" style={{color:'black', width:'125px'}}>Socket Count</span>
                                                                                    </div>
                                                                                    <input type="text" className="form-control" />
                                                                                </div>
                                                                                <div className="input-group">
                                                                                    <div className="input-group-prepend">
                                                                                        <span className="input-group-text" style={{color:'black', width:'125px'}}>Charger Tag</span>
                                                                                    </div>
                                                                                    <input type="text" className="form-control" />
                                                                                </div>
                                                                                <div className="input-group">
                                                                                    <div className="input-group-prepend">
                                                                                        <span className="input-group-text" style={{color:'black', width:'125px'}}>Charger Type</span>
                                                                                    </div>
                                                                                    <input type="text" className="form-control" />
                                                                                </div>
                                                                            </div>
                                                                            <button type="submit" className="btn btn-primary mr-2" style={{marginTop:'10px'}}>Submit</button>
                                                                            <button className="btn btn-danger" onClick={closeModal} style={{marginTop:'10px'}}>Cancel</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {/* Edit Info box end */}

                                                            {/* Clone Info box start */}
                                                            <div className="modalStyle" style={modalCloneStyle}>
                                                                <div className="modalContentStyle" style={{ maxHeight: '650px', overflowY: 'auto' }}>
                                                                    <span onClick={closeCloneModal} style={{ float: 'right', cursor: 'pointer', fontSize:'30px' }}>&times;</span>
                                                                    <div className="card">
                                                                        <div className="card-body">
                                                                            <h4 className="card-title">Clone</h4>
                                                                            <div className="table-responsive pt-3">
                                                                                <div className="input-group">
                                                                                    <div className="input-group-prepend">
                                                                                        <span className="input-group-text" style={{color:'black', width:'125px'}}>Hardware ID</span>
                                                                                    </div>
                                                                                    <input type="text" className="form-control" />
                                                                                </div>
                                                                                <div className="input-group">
                                                                                    <div className="input-group-prepend">
                                                                                        <span className="input-group-text" style={{color:'black', width:'125px'}}>Max Current(A)</span>
                                                                                    </div>
                                                                                    <input type="text" className="form-control" />
                                                                                </div>
                                                                                <div className="input-group">
                                                                                    <div className="input-group-prepend">
                                                                                        <span className="input-group-text" style={{color:'black', width:'125px'}}>Gun Count</span>
                                                                                    </div>
                                                                                    <input type="text" className="form-control" />
                                                                                </div>
                                                                                <div className="input-group">
                                                                                    <div className="input-group-prepend">
                                                                                        <span className="input-group-text" style={{color:'black', width:'125px'}}>Connectivity</span>
                                                                                    </div>
                                                                                    <input type="text" className="form-control" />
                                                                                </div>
                                                                                <div className="input-group">
                                                                                    <div className="input-group-prepend">
                                                                                        <span className="input-group-text" style={{color:'black', width:'125px'}}>Charger Model</span>
                                                                                    </div>
                                                                                    <input type="text" className="form-control" />
                                                                                </div>
                                                                                <div className="input-group">
                                                                                    <div className="input-group-prepend">
                                                                                        <span className="input-group-text" style={{color:'black', width:'125px'}}>Current Phase</span>
                                                                                    </div>
                                                                                    <input type="text" className="form-control" />
                                                                                </div>
                                                                                <div className="input-group">
                                                                                    <div className="input-group-prepend">
                                                                                        <span className="input-group-text" style={{color:'black', width:'125px'}}>Max Power(Wh)</span>
                                                                                    </div>
                                                                                    <input type="text" className="form-control" />
                                                                                </div>
                                                                                <div className="input-group">
                                                                                    <div className="input-group-prepend">
                                                                                        <span className="input-group-text" style={{color:'black', width:'125px'}}>Socket Count</span>
                                                                                    </div>
                                                                                    <input type="text" className="form-control" />
                                                                                </div>
                                                                                <div className="input-group">
                                                                                    <div className="input-group-prepend">
                                                                                        <span className="input-group-text" style={{color:'black', width:'125px'}}>Charger Tag</span>
                                                                                    </div>
                                                                                    <input type="text" className="form-control" />
                                                                                </div>
                                                                                <div className="input-group">
                                                                                    <div className="input-group-prepend">
                                                                                        <span className="input-group-text" style={{color:'black', width:'125px'}}>Charger Type</span>
                                                                                    </div>
                                                                                    <input type="text" className="form-control" />
                                                                                </div>
                                                                            </div>
                                                                            <button type="submit" className="btn btn-primary mr-2" style={{marginTop:'10px'}}>Submit</button>
                                                                            <button className="btn btn-danger" onClick={closeCloneModal} style={{marginTop:'10px'}}>Cancel</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {/* Clone box start */}

                                                            {/* Rates Info box start */}
                                                            <div className="modalStyle" style={modalRatesStyle}>
                                                                <div className="modalContentStyle" style={{ maxHeight: '650px', overflowY: 'auto' }}>
                                                                    <span onClick={closeRatesModal} style={{ float: 'right', cursor: 'pointer', fontSize:'30px' }}>&times;</span>
                                                                    <div className="card">
                                                                        <div className="card-body">
                                                                            <h4 className="card">Assign/Edit pricing <br></br>and slabs for Charger ID</h4>
                                                                            <div className="table-responsive pt-3">
                                                                                <div className="input-group">
                                                                                    <div className="input-group-prepend">
                                                                                        <span className="input-group-text" style={{color:'black', width:'125px'}}>Select Base Rate</span>
                                                                                    </div>
                                                                                    <select className="form-control" value={baseRate} onChange={(e) => setBaseRate(e.target.value)}>
                                                                                        <option>BASE PRICE</option>
                                                                                        <option>NO PARKING FEE</option>
                                                                                    </select>
                                                                                </div>
                                                                                <div className="input-group">
                                                                                    <div className="input-group-prepend">
                                                                                        <span className="input-group-text" style={{color:'black', width:'125px'}}>Assign Discount</span>
                                                                                    </div>
                                                                                    <select className="form-control" value={discount} onChange={(e) => setDiscount(e.target.value)}>
                                                                                        <option>WEEKENDS</option>
                                                                                        <option>CLUB MEMBER</option>
                                                                                    </select>
                                                                                </div>
                                                                                <div className="input-group mb-1">
                                                                                    <div className="input-group-prepend">
                                                                                        <span className="input-group-text" style={{color:'black', width:'125px'}}>Add Surcharge's</span>
                                                                                    </div>
                                                                                    <select className="form-control" value={surcharge} onChange={(e) => setSurcharge(e.target.value)}>
                                                                                        <option>MORNING</option>
                                                                                        <option>MIDNIGHT</option>
                                                                                        <option>NOON</option>
                                                                                    </select>
                                                                                </div>
                                                                            </div>
                                                                            {errorMessageRate && <div className="text-danger">{errorMessageRate}</div>}
                                                                            <button type="submit" className="btn btn-primary mr-2" onClick={handleSubmit} style={{marginTop:'10px'}}>Select Pricing</button>
                                                                            <button className="btn btn-danger" onClick={closeRatesModal} style={{marginTop:'10px'}}>Cancel</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {/* Rates box start */}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>2</td>
                                                        <td>390606000926</td>
                                                        <td> 
                                                            <button type="button" className="btn btn-social-icon btn-outline-dribbble" onClick={toggleQRForm} style={{marginRight:'10px'}}><i className="mdi mdi-qrcode-scan" style={{fontSize: '30px'}}></i></button>
                                                            <button type="button" className="btn btn-social-icon btn-outline-success" onClick={toggleLocationForm}><i className="mdi mdi-map-marker-multiple" style={{fontSize: '30px'}}></i> </button><br></br>
                                                            <div style={divStyle}>AW1201</div>
                                                            <div style={divStyle}>3.5KWH | 16A</div><br></br>
                                                            <div style={divStyleTwo}>OTD36_0110 | AC | 1 PHASE | WIFI</div><br></br>
                                                            <div style={divStyleTwo}>GUN 0 | SOCKET 1</div>
                                                        </td>
                                                        <td>
                                                            <div className='form-group'> 
                                                                <div className="form-check form-check-success">
                                                                    <label className="form-check-label"><input type="radio" className="form-check-input" name="optionsRadios2" id="optionsRadios1" value=""/>Public<i className="input-helper"></i></label>
                                                                </div>
                                                                <div className="form-check form-check-warning">
                                                                    <label className="form-check-label"><input type="radio" className="form-check-input" name="optionsRadios2" id="optionsRadios2" value=""/>Private<i className="input-helper"></i></label>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <h6 style={{color:'#0fcb0f'}}>NO PARKING FEE</h6><hr></hr>
                                                            <h6 style={{color:'#ff42ac'}}>CLUB MEMBER</h6>
                                                        </td>
                                                        <td>
                                                        <button type="button" className=" btn btn-outline-success btn-icon-text" onClick={toggleForm} style={{marginBottom:'10px', marginRight:'10px'}}><i className="mdi mdi-pencil btn-icon-prepend"></i>Edit Info</button>
                                                            <button type="button" className="btn btn-outline-primary btn-icon-text" onClick={toggleRatesForm} style={{marginBottom:'10px', marginRight:'10px'}}><i className="mdi mdi-currency-inr btn-icon-prepend"></i>Edit Rates</button><br></br>
                                                            <button type="button" className="btn btn-outline-warning btn-icon-text" onClick={toggleCloneForm} style={{marginBottom:'10px', marginRight:'10px'}}><i className="ti-file btn-icon-prepend"></i>Clone</button> 
                                                            <button type="button" className="btn btn-outline-danger btn-icon-text" style={{marginBottom:'10px', marginRight:'10px'}}><i className="mdi mdi-delete-forever btn-icon-prepend"></i>Delete</button><br></br>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>3</td>
                                                        <td>390606000926</td>
                                                        <td> 
                                                            <button type="button" className="btn btn-social-icon btn-outline-dribbble" onClick={toggleQRForm} style={{marginRight:'10px'}}><i className="mdi mdi-qrcode-scan" style={{fontSize: '30px'}}></i></button>
                                                            <button type="button" className="btn btn-social-icon btn-outline-success" onClick={toggleLocationForm}><i className="mdi mdi-map-marker-multiple" style={{fontSize: '30px'}}></i> </button><br></br>
                                                            <div style={divStyle}>AW1201</div>
                                                            <div style={divStyle}>3.5KWH | 16A</div><br></br>
                                                            <div style={divStyleTwo}>OTD36_0110 | AC | 1 PHASE | WIFI</div><br></br>
                                                            <div style={divStyleTwo}>GUN 0 | SOCKET 1</div>
                                                        </td>
                                                        <td>
                                                            <div className='form-group'> 
                                                                <div className="form-check form-check-success">
                                                                    <label className="form-check-label"><input type="radio" className="form-check-input" name="optionsRadios3" id="optionsRadios1" value=""/>Public<i className="input-helper"></i></label>
                                                                </div>
                                                                <div className="form-check form-check-warning">
                                                                    <label className="form-check-label"><input type="radio" className="form-check-input" name="optionsRadios3" id="optionsRadios2" value=""/>Private<i className="input-helper"></i></label>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <h6 style={{color:'#0fcb0f'}}>NO PARKING FEE</h6><hr></hr>
                                                            <h6 style={{color:'#ff42ac'}}>CLUB MEMBER</h6>
                                                        </td>
                                                        <td>
                                                        <button type="button" className=" btn btn-outline-success btn-icon-text" onClick={toggleForm} style={{marginBottom:'10px', marginRight:'10px'}}><i className="mdi mdi-pencil btn-icon-prepend"></i>Edit Info</button>
                                                            <button type="button" className="btn btn-outline-primary btn-icon-text" onClick={toggleRatesForm} style={{marginBottom:'10px', marginRight:'10px'}}><i className="mdi mdi-currency-inr btn-icon-prepend"></i>Edit Rates</button><br></br>
                                                            <button type="button" className="btn btn-outline-warning btn-icon-text" onClick={toggleCloneForm} style={{marginBottom:'10px', marginRight:'10px'}}><i className="ti-file btn-icon-prepend"></i>Clone</button> 
                                                            <button type="button" className="btn btn-outline-danger btn-icon-text" style={{marginBottom:'10px', marginRight:'10px'}}><i className="mdi mdi-delete-forever btn-icon-prepend"></i>Delete</button><br></br>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>4</td>
                                                        <td>390606000926</td>
                                                        <td> 
                                                            <button type="button" className="btn btn-social-icon btn-outline-dribbble" onClick={toggleQRForm} style={{marginRight:'10px'}}><i className="mdi mdi-qrcode-scan" style={{fontSize: '30px'}}></i></button>
                                                            <button type="button" className="btn btn-social-icon btn-outline-success" onClick={toggleLocationForm}><i className="mdi mdi-map-marker-multiple" style={{fontSize: '30px'}}></i> </button><br></br>
                                                            <div style={divStyle}>AW1201</div>
                                                            <div style={divStyle}>3.5KWH | 16A</div><br></br>
                                                            <div style={divStyleTwo}>OTD36_0110 | AC | 1 PHASE | WIFI</div><br></br>
                                                            <div style={divStyleTwo}>GUN 0 | SOCKET 1</div>
                                                        </td>
                                                        <td>
                                                            <div className='form-group'> 
                                                                <div className="form-check form-check-success">
                                                                    <label className="form-check-label"><input type="radio" className="form-check-input" name="optionsRadios4" id="optionsRadios1" value=""/>Public<i className="input-helper"></i></label>
                                                                </div>
                                                                <div className="form-check form-check-warning">
                                                                    <label className="form-check-label"><input type="radio" className="form-check-input" name="optionsRadios4" id="optionsRadios2" value=""/>Private<i className="input-helper"></i></label>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <h6 style={{color:'#0fcb0f'}}>NO PARKING FEE</h6><hr></hr>
                                                            <h6 style={{color:'#ff42ac'}}>CLUB MEMBER</h6>
                                                        </td>
                                                        <td>
                                                        <button type="button" className=" btn btn-outline-success btn-icon-text" onClick={toggleForm} style={{marginBottom:'10px', marginRight:'10px'}}><i className="mdi mdi-pencil btn-icon-prepend"></i>Edit Info</button>
                                                            <button type="button" className="btn btn-outline-primary btn-icon-text" onClick={toggleRatesForm} style={{marginBottom:'10px', marginRight:'10px'}}><i className="mdi mdi-currency-inr btn-icon-prepend"></i>Edit Rates</button><br></br>
                                                            <button type="button" className="btn btn-outline-warning btn-icon-text" onClick={toggleCloneForm} style={{marginBottom:'10px', marginRight:'10px'}}><i className="ti-file btn-icon-prepend"></i>Clone</button> 
                                                            <button type="button" className="btn btn-outline-danger btn-icon-text" style={{marginBottom:'10px', marginRight:'10px'}}><i className="mdi mdi-delete-forever btn-icon-prepend"></i>Delete</button><br></br>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>5</td>
                                                        <td>390606000926</td>
                                                        <td> 
                                                            <button type="button" className="btn btn-social-icon btn-outline-dribbble" onClick={toggleQRForm} style={{marginRight:'10px'}}><i className="mdi mdi-qrcode-scan" style={{fontSize: '30px'}}></i></button>
                                                            <button type="button" className="btn btn-social-icon btn-outline-success" onClick={toggleLocationForm}><i className="mdi mdi-map-marker-multiple" style={{fontSize: '30px'}}></i> </button><br></br>
                                                            <div style={divStyle}>AW1201</div>
                                                            <div style={divStyle}>3.5KWH | 16A</div><br></br>
                                                            <div style={divStyleTwo}>OTD36_0110 | AC | 1 PHASE | WIFI</div><br></br>
                                                            <div style={divStyleTwo}>GUN 0 | SOCKET 1</div>
                                                        </td>
                                                        <td>
                                                            <div className='form-group'> 
                                                                <div className="form-check form-check-success">
                                                                    <label className="form-check-label"><input type="radio" className="form-check-input" name="optionsRadios5" id="optionsRadios1" value=""/>Public<i className="input-helper"></i></label>
                                                                </div>
                                                                <div className="form-check form-check-warning">
                                                                    <label className="form-check-label"><input type="radio" className="form-check-input" name="optionsRadios5" id="optionsRadios2" value=""/>Private<i className="input-helper"></i></label>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <h6 style={{color:'#0fcb0f'}}>NO PARKING FEE</h6><hr></hr>
                                                            <h6 style={{color:'#ff42ac'}}>CLUB MEMBER</h6>
                                                        </td>
                                                        <td>
                                                        <button type="button" className=" btn btn-outline-success btn-icon-text" onClick={toggleForm} style={{marginBottom:'10px', marginRight:'10px'}}><i className="mdi mdi-pencil btn-icon-prepend"></i>Edit Info</button>
                                                            <button type="button" className="btn btn-outline-primary btn-icon-text" onClick={toggleRatesForm} style={{marginBottom:'10px', marginRight:'10px'}}><i className="mdi mdi-currency-inr btn-icon-prepend"></i>Edit Rates</button><br></br>
                                                            <button type="button" className="btn btn-outline-warning btn-icon-text" onClick={toggleCloneForm} style={{marginBottom:'10px', marginRight:'10px'}}><i className="ti-file btn-icon-prepend"></i>Clone</button> 
                                                            <button type="button" className="btn btn-outline-danger btn-icon-text" style={{marginBottom:'10px', marginRight:'10px'}}><i className="mdi mdi-delete-forever btn-icon-prepend"></i>Delete</button><br></br>
                                                        </td>
                                                    </tr>
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
    )
}   
                 
export default ManageDevice