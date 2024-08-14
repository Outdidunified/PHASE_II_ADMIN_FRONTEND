import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MainJS = (url) => {
    const navigate = useNavigate();

    // State variables
    const [chargerData, setChargerData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filteredChargerData] = useState([]);
    const [chargers, setCharger] = useState([]);
    const fetchDataCalled = useRef(false);
    const [isBoxVisible, setIsBoxVisible] = useState(false);

    // Get manage charger data
    useEffect(() => {
        if (!fetchDataCalled.current) {
            axios.get(url)
                .then((res) => {
                    setChargerData(res.data.data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error('Error fetching data:', err);
                    setError('Error fetching data. Please try again.');
                    setLoading(false);
                });
            fetchDataCalled.current = true;
        }
    }, [url]);

    // Search manage device 
    const handleSearchInputChange = (e) => {
        const inputValue = e.target.value.toUpperCase();
        if (Array.isArray(chargerData)) {
            const filteredChargerData = chargerData.filter((item) =>
                item.charger_id.toUpperCase().includes(inputValue)
            );
            setCharger(filteredChargerData);
        }
    };

    // Update table data 'data', and 'filteredData' 
    useEffect(() => {
        switch (chargerData) {
            case 'filteredData':
                setCharger(filteredChargerData);
                break;
            default:
                setCharger(chargerData);
                break;
        }
    }, [chargerData, filteredChargerData]);

    // Navigate functions add manage device page view
    const handleAddDeviceList = () => {
        navigate('/superadmin/AddManageDevice');
    };

    // Navigate functions manage device page view
    const handleViewDeviceList = (chargerId) => {
        if (Array.isArray(chargers)) {
            const viewChargers = chargers.filter((item) =>
                item._id === chargerId
            );
            navigate(`/superadmin/ViewManageDevice`, { state: { chargersView: viewChargers } });
        }
    };

    // Navigate functions assign reseller page view
    const handleAssignReseller = () => {
        navigate('/superadmin/AssignReseller');
    };

    // Toggle visibility of faulty chargers box
    const toggleBoxVisibility = () => {
        setIsBoxVisible(!isBoxVisible);
    };

    // Function to format timestamps
    function formatTimestamp(originalTimestamp) {
        const date = new Date(originalTimestamp);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        let hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        hours = String(hours).padStart(2, '0');

        const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds} ${ampm}`;
        return formattedDate;
    }

    // Back to manage device
    const handleBack = () => {
        navigate(-1);
    };

    // View edit manage device page
    const handleEditDeviceList = (chargersView) => {
        navigate('/superadmin/EditManageDevice', { state: { chargersView } });
    };

    // Edit back manage device
    const editBackManageDevice = () => {
        navigate('/superadmin/ManageDevice');
    };
    return {
        chargers,
        loading,
        error,
        handleAddDeviceList,
        handleAssignReseller,
        handleSearchInputChange,
        handleViewDeviceList,
        toggleBoxVisibility,
        formatTimestamp,
        handleBack,
        handleEditDeviceList,
        editBackManageDevice,
    };
};

export default MainJS;
