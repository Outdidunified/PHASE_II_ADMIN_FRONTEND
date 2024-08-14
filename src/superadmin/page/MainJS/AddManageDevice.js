import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

const useAddManageDevice = (userInfo) => {
    const navigate = useNavigate();

    // State variables
    const [charger_id, setChargerID] = useState('');
    const [tag_id, setTagID] = useState('');
    const [model, setModel] = useState('');
    const [vendor, setVendor] = useState('');
    const [gunConnector, setGunConnector] = useState('');
    const [maxCurrent, setMaxCurrent] = useState('');
    const [maxPower, setMaxPower] = useState('');
    const [socketCount, setSocketCount] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [selectChargerType, setSelectedChargerType] = useState('');
    const [data, setData] = useState([]);
    const fetchDataCalled = useRef(false);
    const [errorMessageCurrent, setErrorMessageCurrent] = useState('');
    const [errorMessagePower, setErrorMessagePower] = useState('');

    // Select model 
    const handleModel = (e) => {
        setModel(e.target.value);
    };

    // Select socket
    const handleSocket = (e) => {
        setSocketCount(e.target.value);
    };

    // Select Gunconnector
    const handleGunconnector = (e) => {
        setGunConnector(e.target.value);
    };

    // Select charger type
    const handleChargerType = (e) => {
        setSelectedChargerType(e.target.value);
    };

    useEffect(() => {
        const clearErrorMessage = (messageSetter) => {
            const timeout = setTimeout(() => messageSetter(''), 5000);
            return () => clearTimeout(timeout);
        };

        if (errorMessageCurrent) clearErrorMessage(setErrorMessageCurrent);
        if (errorMessagePower) clearErrorMessage(setErrorMessagePower);
        if (errorMessage) clearErrorMessage(setErrorMessage);
    }, [errorMessageCurrent, errorMessagePower, errorMessage]);

    // Get manage charger data
    useEffect(() => {
        if (!fetchDataCalled.current) {
            const url = `/superadmin/FetchCharger`;
            axios.get(url)
                .then((res) => {
                    setData(res.data.data);
                })
                .catch((err) => {
                    console.error('Error fetching data:', err);
                    setErrorMessage('Error fetching data. Please try again.');
                });
            fetchDataCalled.current = true;
        }
    }, []);

    // handle cloned data
    const handleClone = (cloneModel) => {
        const selectedModelData = data.find(item => item.model === cloneModel);
        if (selectedModelData) {
            setModel(selectedModelData.model);
            setVendor(selectedModelData.vendor);
            setGunConnector(selectedModelData.gun_connector);
            setMaxCurrent(selectedModelData.max_current);
            setMaxPower(selectedModelData.max_power);
            setSocketCount(selectedModelData.socket_count);
            setSelectedChargerType(selectedModelData.type);
        }
    };

    // back manage device
    const backManageDevice = () => {
        navigate('/superadmin/ManageDevice');
    };

    // validate
    const validateForm = () => {
        const chargerIDRegex = /^[a-zA-Z0-9]{1,14}$/;
        if (!charger_id) {
            setErrorMessage("Charger ID can't be empty.");
            return false;
        }
        if (!chargerIDRegex.test(charger_id)) {
            setErrorMessage('Oops! Charger ID must be a maximum of 14 characters.');
            return false;
        }

        const tagIDRegex = /^[a-zA-Z0-9]{1,12}$/;
        if (!tag_id) {
            setErrorMessage("Tag ID can't be empty.");
            return false;
        }
        if (!tagIDRegex.test(tag_id)) {
            setErrorMessage('Oops! Tag ID must be a maximum of 12 characters.');
            return false;
        }

        const vendorRegex = /^[a-zA-Z0-9 ]{1,20}$/;
        if (!vendor) {
            setErrorMessage("Vendor name can't be empty.");
            return false;
        }
        if (!vendorRegex.test(vendor)) {
            setErrorMessage('Oops! Vendor name must be 1 to 20 characters and contain alphanumeric characters.');
            return false;
        }

        return true;
    };

    // add manage device
    const addManageDevice = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            const max_current = parseInt(maxCurrent);
            const max_power = parseInt(maxPower);
            const gun_connector = parseInt(gunConnector);
            const socket_count = parseInt(socketCount);

            const response = await fetch('/superadmin/CreateCharger', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ charger_id, tag_id, model, type: selectChargerType, vendor, gun_connector, max_current, max_power, socket_count, created_by: userInfo.data.email_id }),
            });

            if (response.ok) {
                Swal.fire({
                    title: "Charger added successfully",
                    icon: "success"
                });
                resetForm();
                backManageDevice();
            } else {
                const responseData = await response.json();
                Swal.fire({
                    title: "Error",
                    text: "Failed to add charger, " + responseData.message,
                    icon: "error"
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error:",
                text: "An error occurred while adding the charger: " + error,
                icon: "error"
            });
        }
    };

    const resetForm = () => {
        setChargerID('');
        setTagID('');
        setModel('');
        setSelectedChargerType('');
        setVendor('');
        setGunConnector('');
        setMaxCurrent('');
        setMaxPower('');
        setSocketCount('');
    };

    return {
        charger_id, setChargerID, tag_id, setTagID, model, handleModel, vendor, setVendor,
        gunConnector, handleGunconnector, maxCurrent, setMaxCurrent, maxPower, setMaxPower,
        socketCount, handleSocket, selectChargerType, handleChargerType,
        errorMessage, errorMessageCurrent, errorMessagePower, data,
        addManageDevice, backManageDevice, handleClone, setErrorMessageCurrent, setErrorMessagePower,
    };
};

export default useAddManageDevice;
