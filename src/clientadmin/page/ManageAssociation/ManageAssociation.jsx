import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';

const ManageAssociation = ({ userInfo, handleLogout }) => {
    const [associations, setAssociations] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filterAssociations = (associations) => {
        return associations.filter((association) =>
            association.association_id.toString().toLowerCase().includes(searchQuery.toLowerCase())
        );
    };

    const fetchAssociationDetails = async () => {
        try {
            const response = await axios.post('/clientadmin/FetchAssociationUser',{
              client_id: userInfo.data.client_id,
            });
            if (response.data.status === 'Success') {

                setAssociations(response.data.data || []);
            } else {
                console.error('Failed to fetch association details:', response.data.message);
            }
        } catch (error) {
            console.error('Error fetching association details:', error);
            // Handle error appropriately, such as showing an error message to the user
        }
    };

    useEffect(() => {
        fetchAssociationDetails();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const navigateToViewAssociationDetails = (association) => {
        
        navigate('/clientadmin/ViewAss', { state: { association } });
    };

    const deactivateAssociation = async (associationId, status) => {
        try {
            const response = await axios.post('/clientadmin/DeActivateOrActivateAssociationUser', {
                association_id: associationId,
                modified_by: userInfo.data.client_name,
                status: !status // Toggle status
            });

            if (response.status === 200) {
                // Update the association status in the state
                setAssociations(prevAssociations =>
                    prevAssociations.map(association =>
                        association.association_id === associationId ? { ...association, status: !status } : association
                    )
                );

                Swal.fire({
                    title: status ? "Deactivated!" : "Activated!",
                    icon: "success"
                });

                // Example: Perform an action after 10 seconds
                setTimeout(() => {
                    console.log('Timer finished after 10 seconds');
                    // Your action after 10 seconds, e.g., navigate, update state, or perform another action
                }, 10000); // 10000 milliseconds = 10 seconds
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Failed to update association status.",
                    icon: "error"
                });
            }
        } catch (error) {
            console.error('Error in updating association status:', error);
            Swal.fire({
                title: "Error",
                text: "An error occurred while updating association status.",
                icon: "error"
            });
        }
    };

    const handleEdit = (association) =>{
       
      navigate('/clientadmin/Editass',{ state: { association } })
     }

   const navtocreateass = () =>{
    navigate('/clientadmin/Createass')
   }

   const navigatetochargerdetails = (association) =>{
    navigate('/clientadmin/Assigneddevass',{ state: { association }})

   }

    return (
        <div className='container-scroller'>
            {/* Header */}
            <Header userInfo={userInfo} handleLogout={handleLogout} />
            <div className="container-fluid page-body-wrapper">
                {/* Sidebar */}
                <Sidebar />
                <div className="main-panel">
                    <div className="content-wrapper">
                        <div className="row">
                            <div className="col-md-12 grid-margin">
                                <div className="row">
                                    <div className="col-12 col-xl-8 mb-4 mb-xl-0">
                                        <h3 className="font-weight-bold">Manage Association</h3>
                                    </div>
                                    <div className="col-12 col-xl-4">
                                        <div className="justify-content-end d-flex">
                                            <button
                                                type="button"
                                                className="btn btn-success"
                                                onClick={navtocreateass}
                                                style={{ marginRight: '10px' }}
                                            >
                                                Create Association
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
                                                <h4 className="card-title" style={{ paddingTop: '10px' }}>List Of Associations</h4>
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
                                                        <th>Association ID</th>
                                                        <th>Association Name</th>
                                                        <th>Association Address</th>
                                                        <th>Email ID</th>
                                                        <th>Phone Number</th>
                                                        <th>Status</th>
                                                        <th>Active/DeActive</th>
                                                        <th>Actions</th>
                                                        <th>Assigned Devices</th>
                                                    </tr>
                                                </thead>
                                                <tbody style={{ textAlign: 'center' }}>
                                                    {filterAssociations(associations).length > 0 ? (
                                                        filterAssociations(associations).map((association, index) => (
                                                            <tr key={association._id || index}>
                                                                <td>{index + 1}</td>
                                                                <td>{association.association_id}</td>
                                                                <td>{association.association_name}</td>
                                                                <td>{association.association_address}</td>
                                                                <td>{association.association_email_id}</td>
                                                                <td>{association.association_phone_no}</td>
                                                                <td style={{ color: association.status ? 'green' : 'red' }}>{association.status ? 'Active' : 'DeActive'}</td>
                                                                <td>
                                                                    <div className='form-group' style={{paddingTop:'13px'}}> 
                                                                        {association.status===true ?
                                                                            <div className="form-check form-check-danger">
                                                                                <label className="form-check-label"><input type="radio" className="form-check-input" name="optionsRadios1" id="optionsRadios2" value={false} onClick={() => deactivateAssociation(association.association_id, association.status)}/>DeActive<i className="input-helper"></i></label>
                                                                            </div>
                                                                        :
                                                                            <div className="form-check form-check-success">
                                                                                <label className="form-check-label"><input type="radio" className="form-check-input" name="optionsRadios1" id="optionsRadios1" value={true} onClick={() => deactivateAssociation(association.association_id, association.status)}/>Active<i className="input-helper"></i></label>
                                                                            </div>
                                                                        }
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <button type="button" className="btn btn-outline-success btn-icon-text" onClick={() => navigateToViewAssociationDetails(association)} style={{ marginBottom: '10px', marginRight: '10px' }}><i className="mdi mdi-eye btn-icon-prepend"></i>View</button>
                                                                    <button type="button" className="btn btn-outline-info btn-icon-text" onClick={() => handleEdit(association)} style={{ marginBottom: '10px', marginRight: '10px' }}><i className="mdi mdi-pencil btn-icon-prepend"></i>Edit</button>
                                                                </td>
                                                                <td>
                                                                <button type="button" className="btn btn-outline-warning btn-icon-text" onClick={() => navigatetochargerdetails(association)} style={{ marginBottom: '10px', marginRight: '10px' }}><i className="ti-file btn-icon-prepend"></i>View</button>
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
                    {/* Footer */}
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default ManageAssociation;
