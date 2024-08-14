import React, { useEffect, useState, useCallback } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';
import Swal from 'sweetalert2';

const Assignuser = ({ userInfo, handleLogout }) => {
  const [usersToAssign, setUsersToAssign] = useState([]);
  const [usersToUnassign, setUsersToUnassign] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // fetch users to assign data
  const fetchUsersToAssign = useCallback(async () => {
    try {
      const response = await axios.get('/associationadmin/FetchUsersWithSpecificRolesToAssgin');
      setUsersToAssign(response.data.data); // assuming response.data.data is an array of users
    } catch (error) {
      console.error(error);
    }
  }, []);

  // fetch user to unassign data
  const fetchUsersToUnassign = useCallback(async () => {
    try {
      const response = await axios.post('/associationadmin/FetchUsersWithSpecificRolesToUnAssgin', {
        association_id: userInfo.data.association_id,
      });
      setUsersToUnassign(response.data.data); // assuming response.data.data is an array of users
      setLoading(false);
    } catch (error) {
      setError('Error fetching data. Please try again.');
      console.error(error);
    }
  }, [userInfo.data.association_id]);

  useEffect(() => {
    fetchUsersToAssign();
    fetchUsersToUnassign();
  }, [fetchUsersToAssign, fetchUsersToUnassign]);

  // Function to handle selecting and removing a user
  const handleSelectRemove = async (userId) => {
    try {
      await axios.post('/associationadmin/RemoveUserFromAssociation', {
        association_id: userInfo.data.association_id,
        user_id: parseInt(userId),
        modified_by: userInfo.data.email_id
      });
      Swal.fire({
        title: 'Success!',
        text: 'User has been removed from the association.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      fetchUsersToUnassign(); // Refresh the list after removal
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: 'Error!',
        text: 'There was a problem removing the user.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };
  
  const [searchAddEmail, setSearchAddEmail] = useState([]); // Updated state name
  const [searchInput, setSearchInput] = useState(''); // New state for search input
  const [selectedUser, setSelectedUser] = useState(null); // Changed to null for better control

  // Search and filter users
  const handleSearchUserAdd = (e) => {
    const inputValue = e.target.value.toUpperCase();
    setSearchInput(inputValue); // Update search input state
    if (Array.isArray(usersToAssign)) {
      const filteredEmails = usersToAssign.filter((item) =>
        item.email_id.toUpperCase().includes(inputValue)
      );
      setSearchAddEmail(filteredEmails); // Store the filtered users in the state
    }
  };

  // Handle checkbox selection
  const handleSelectUser = (userId) => {
    setSelectedUser(userId);
  };

  // Submit selected users and submit
  const handleAddUserSubmits = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/associationadmin/AddUserToAssociation', {
        association_id: userInfo.data.association_id,
        user_id: parseInt(selectedUser),
        modified_by: userInfo.data.email_id
      });
      Swal.fire({
        title: 'Success!',
        text: 'Users have been added to the association.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      setSearchAddEmail([]);
      setSearchInput('');
      setSelectedUser(null);
      fetchUsersToUnassign();
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: 'Error!',
        text: 'There was a problem adding the users.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

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
                    <h3 className="font-weight-bold">Assign User to Association</h3>
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
                            <h4 className="card-title" style={{paddingTop:'10px'}}>Assign user's</h4>  
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 grid-margin">
                      <div className="card">
                        <div className="card-body">
                          <form onSubmit={handleAddUserSubmits} className="form-sample">
                            <div className="row">
                              <div className="col-md-12">
                                <div className="form-group row">
                                  <div className="col-sm-5">
                                    <div className="input-group">
                                      <div className="input-group-prepend hover-cursor" id="navbar-search-icon">
                                        <span className="input-group-text" id="search">
                                          <i className="icon-search"></i>
                                        </span>
                                      </div>
                                      <input type="text" className="form-control" placeholder="Search for user's" id="searchInput" aria-label="search" aria-describedby="search" onChange={handleSearchUserAdd} autoComplete="off"/>
                                    </div>
                                  </div>
                                  <div className="col-sm-5">
                                    {searchInput && searchAddEmail.length > 0 ? (
                                      searchAddEmail.map((user, index) => (
                                        <div key={user.user_id} className="form-control d-flex align-items-center">
                                          <button
                                            type="button"
                                            className={`btn btn-${selectedUser === user.user_id ? 'success' : 'secondary'} btn-sm`}
                                            onClick={() => handleSelectUser(user.user_id)}
                                          >
                                            {selectedUser === user.user_id ? 'Selected' : 'Select'}
                                          </button>
                                          <label style={{ marginLeft: '8px' }}>{user.email_id}</label>
                                        </div>
                                      ))
                                    ) : (
                                      <p className="form-control">No users found</p>
                                    )}
                                  </div>
                                  <div className="col-sm-2">
                                    <button type="submit" className="btn btn-primary btn-block" disabled={!selectedUser}>Submit</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                    <div className="table-responsive" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                      <table className="table table-striped">
                        <thead style={{ textAlign: 'center', position: 'sticky', tableLayout: 'fixed', top: 0, backgroundColor: 'white', zIndex: 1 }}>
                          <tr> 
                            <th>Sl.No</th>
                            <th>Role Name</th>
                            <th>User Name</th>
                            <th>Email ID</th>
                            <th>Phone</th>
                            <th>Status</th>
                            <th>Option</th>
                          </tr>
                        </thead>                          
                        <tbody style={{textAlign:'center'}}>
                          {loading ? (
                            <tr>
                             <td colSpan="10" style={{ marginTop: '50px', textAlign: 'center' }}>Loading...</td>
                            </tr>
                          ) : error ? (
                            <tr>
                              <td colSpan="10" style={{ marginTop: '50px', textAlign: 'center' }}>Error: {error}</td>
                            </tr>
                          ) : (
                            Array.isArray(usersToUnassign) && usersToUnassign.length > 0 ? (
                              usersToUnassign.map((dataItem, index) => (
                                <tr key={index}>
                                  <td>{index + 1}</td>
                                  <td>{dataItem.role_name ? dataItem.role_name : '-'}</td>
                                  <td>{dataItem.username ? dataItem.username : '-'}</td>
                                  <td>{dataItem.email_id ? dataItem.email_id : '-'}</td>
                                  <td>{dataItem.phone_no ? dataItem.phone_no : '-'}</td>
                                  <td>{dataItem.status===true ? <span className="text-success">Active</span> : <span className="text-danger">DeActive</span>}</td>
                                  <th>
                                    <button type="submit" className="btn btn-danger mr-2" onClick={() => handleSelectRemove(dataItem.user_id)}>Remove</button>
                                  </th>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan="6" style={{ marginTop: '50px', textAlign: 'center' }}>No devices found</td>
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

export default Assignuser;
