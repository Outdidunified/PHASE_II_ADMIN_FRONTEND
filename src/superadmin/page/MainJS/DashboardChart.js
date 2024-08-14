import { useEffect, useRef } from 'react';
import MainJS from './MainJS';
import Chart from 'chart.js/auto';

const DashboardChart = () => {
    const url = `/superadmin/FetchCharger`;
    const {
        chargers,
    } = MainJS(url);   
    const chartRef = useRef(null);

    // Update chart
    useEffect(() => {
        if (chartRef.current) {
            chartRef.current.destroy();
        }

        const ctx = document.getElementById('myChart').getContext('2d');
        const onlineChargers = chargers.filter((charger) => charger.status === true || charger.status === 'true');
        const offlineChargers = chargers.filter((charger) => charger.status === false || charger.status === 'false');

        chartRef.current = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Total', 'Online', 'Offline'],
                datasets: [{
                    backgroundColor: ["#4B46AC", "#57B657", "#FF4747"],
                    data: [chargers.length, onlineChargers.length, offlineChargers.length]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Charger Status'
                    }
                }
            }
        });

        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, [chargers]);
   
    // Calculate percentages and get faulty chargers
    const totalChargers = chargers.length;
    const onlineChargers = chargers.filter(charger => charger.status === true || charger.status === 'true');
    const offlineChargers = chargers.filter(charger => charger.status === false || charger.status === 'false');
    const faultyChargers = chargers.filter(charger => charger.status === 'faulty' || charger.status === false);

    const totalPercentage = totalChargers > 0 ? 100 : 0;
    const onlinePercentage = totalChargers > 0 ? (onlineChargers.length / totalChargers) * 100 : 0;
    const offlinePercentage = totalChargers > 0 ? (offlineChargers.length / totalChargers) * 100 : 0;
    const faultyPercentage = totalChargers > 0 ? (faultyChargers.length / totalChargers) * 100 : 0;

    return {
        chartRef,
        totalChargers,
        onlineChargers,
        offlineChargers,
        faultyChargers,
        totalPercentage,
        onlinePercentage,
        offlinePercentage,
        faultyPercentage,
    };
};

export default DashboardChart;
