import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useLocation, useNavigate } from 'react-router-dom';

const Sessionhistoryass = ({ userInfo, handleLogout }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [, setSessionData] = useState({
        charger_id: '',
        created_date: null,
        price: '',
        session_id: '',
        start_time: null,
        stop_time: '',
        unit_consummed: '',
        user: '',
        _id: '',
    });

    // State for storing sessions
    const [sessions, setSessions] = useState([]);

    useEffect(() => {
        const { sessiondata } = location.state || {};

        if (sessiondata) {
            setSessionData({
                charger_id: sessiondata.charger_id || '',
                created_date: sessiondata.created_date || null,
                price: sessiondata.price || '',
                session_id: sessiondata.session_id || '',
                start_time: sessiondata.start_time || null,
                stop_time: sessiondata.stop_time || '',
                unit_consummed: sessiondata.unit_consummed || '',
                user: sessiondata.user || '',
                _id: sessiondata._id || '',
            });
        }

        // Example: Fetch sessions data from an API or set from props
        const fetchedSessions = [
            {
                _id: '1',
                charger_id: '390606000999',
                session_id: 1,
                created_date: '2024-03-21T12:30:34.026Z',
                price: 10.9,
                start_time: null,
                stop_time: '2024-03-21T12:30:34.026Z',
                unit_consummed: 10.9,
                user: 'vivek',
            },
            // Add more session objects as needed
        ];
        setSessions(fetchedSessions);
    }, [location.state]); // Include location.state if it affects session data fetching

    const goBack = () => {
        navigate(-1);
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
                                        <h3 className="font-weight-bold">View Session</h3>
                                    </div>
                                    <div className="col-12 col-xl-4">
                                        <div className="justify-content-end d-flex">
                                            <button
                                                type="button"
                                                className="btn btn-success"
                                                onClick={goBack}
                                                style={{ marginRight: '10px' }}
                                            >
                                                Go Back
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
                                        <h4 className="card-title">Session Details</h4>
                                        <div className="table-responsive">
                                            <table className="table table-striped">
                                                <thead style={{ textAlign: 'center' }}>
                                                    <tr>
                                                        <th>Sl.No</th>
                                                        <th>Charger Id</th>
                                                        <th>Session ID</th>
                                                        <th>Created Date</th>
                                                        <th>Price</th>
                                                        <th>Start Time</th>
                                                        <th>Stop Time</th>
                                                        <th>Unit Consumed</th>
                                                        <th>User</th>
                                                    </tr>
                                                </thead>
                                                <tbody style={{ textAlign: 'center' }}>
                                                    {sessions.length > 0 ? (
                                                        sessions.map((session, index) => (
                                                            <tr key={session._id}>
                                                                <td>{index + 1}</td>
                                                                <td>{session.charger_id}</td>
                                                                <td>{session.session_id}</td>
                                                                <td>{session.created_date ? new Date(session.created_date).toLocaleString() : ''}</td>
                                                                <td>{session.price}</td>
                                                                <td>{session.start_time ? new Date(session.start_time).toLocaleString() : ''}</td>
                                                                <td>{session.stop_time ? new Date(session.stop_time).toLocaleString() : ''}</td>
                                                                <td>{session.unit_consummed}</td>
                                                                <td>{session.user}</td>
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
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default Sessionhistoryass;
