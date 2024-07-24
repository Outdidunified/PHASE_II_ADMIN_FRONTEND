import React, { useEffect, useState, useCallback } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Assignuser = ({ userInfo, handleLogout }) => {
  const navigate = useNavigate();
  const [usersToAssign, setUsersToAssign] = useState([]);
  const [usersToUnassign, setUsersToUnassign] = useState([]);
  const [selectedAddUser, setSelectedAddUser] = useState('');
  const [selectedRemoveUser, setSelectedRemoveUser] = useState('');

  const fetchUsersToAssign = useCallback(async () => {
    try {
      const response = await axios.get('/associationadmin/FetchUsersWithSpecificRolesToAssgin');
      setUsersToAssign(response.data.data); // assuming response.data.data is an array of users
    } catch (error) {
      console.error(error);
    }
  }, []);

  const fetchUsersToUnassign = useCallback(async () => {
    try {
      const response = await axios.post('/associationadmin/FetchUsersWithSpecificRolesToUnAssgin', {
        association_id: userInfo.data.association_id,
      });
      setUsersToUnassign(response.data.data); // assuming response.data.data is an array of users
    } catch (error) {
      console.error(error);
    }
  }, [userInfo.data.association_id]);

  useEffect(() => {
    fetchUsersToAssign();
    fetchUsersToUnassign();
  }, [fetchUsersToAssign, fetchUsersToUnassign]);

  const handleAddUserSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/associationadmin/AddUserToAssociation', {
        association_id: userInfo.data.association_id,
        user_id: parseInt(selectedAddUser),
        modified_by: userInfo.data.association_name
      });
      Swal.fire({
        title: 'Success!',
        text: 'User has been added to the association.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      navigate('/associationadmin/ManageUsers');
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: 'Error!',
        text: 'There was a problem adding the user.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  const handleRemoveUserSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/associationadmin/RemoveUserFromAssociation', {
        association_id: userInfo.data.association_id,
        user_id: parseInt(selectedRemoveUser),
        modified_by: userInfo.data.association_name
      });
      Swal.fire({
        title: 'Success!',
        text: 'User has been removed from the association.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      navigate('/associationadmin/ManageUsers');
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
                    <h3 className="font-weight-bold">Assign User to Association</h3>
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
                          <form onSubmit={handleAddUserSubmit} className="form-sample">
                            <div className="row">
                              <div className="col-md-6">
                                <div className="form-group row">
                                  <label className="col-sm-3 col-form-label" style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>ADD USER</label>
                                  <div className="col-sm-6">
                                    <select
                                      className="form-control"
                                      value={selectedAddUser}
                                      onChange={(e) => setSelectedAddUser(e.target.value)}
                                    >
                                      <option value="">Select User</option>
                                      {usersToAssign.map((user) => (
                                        <option key={user._id} value={user.user_id}>
                                          {user.email_id}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                  <div className="col-sm-3">
                                    <button type="submit" className="btn btn-primary btn-block">ADD USER</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </form>
                          <form onSubmit={handleRemoveUserSubmit} className="form-sample mt-4">
                            <div className="row">
                              <div className="col-md-6">
                                <div className="form-group row">
                                  <label className="col-sm-3 col-form-label" style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>REMOVE USER</label>
                                  <div className="col-sm-6">
                                    <select
                                      className="form-control"
                                      value={selectedRemoveUser}
                                      onChange={(e) => setSelectedRemoveUser(e.target.value)}
                                    >
                                      <option value="">Select User</option>
                                      {usersToUnassign.map((user) => (
                                        <option key={user._id} value={user.user_id}>
                                          {user.email_id}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                  <div className="col-sm-3">
                                    <button type="submit" className="btn btn-primary btn-block">REMOVE USER</button>
                                  </div>
                                </div>
                              </div>
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
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Assignuser;
