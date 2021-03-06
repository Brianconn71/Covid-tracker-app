//  Functional Component
import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api';
import { Line, Bar } from 'react-chartjs-2';

import styles from './Chart.module.css';

const Chart = () => {
    const [dailyData, setDailyData] = useState({});

    useEffect(() => {
        let isMounted = true; 
        const fetchAPI = async () => {
            if (isMounted) setDailyData(await fetchDailyData());
        }

        fetchAPI();
        return () => { isMounted = false };
    });

    const lineChart = (
        dailyData.length // can be left  as is without != 0
            ? (
                <Line
                    data={{
                        labels: dailyData.map(({ date }) => date),
                        datasets: [{
                            data: dailyData.map(({ confirmed }) => confirmed),
                            label: 'Infected',
                            borderColor: '#333fff',
                            fill: true,
                        }, {
                            data: dailyData.map(({ deaths }) => deaths),
                            label: 'Deaths',
                            borderColor: 'red',
                            backgroundColor: 'rgba(255,0,0,0.5)',
                            fill: true,
                        }]
                    }}
                />) : null

    );

    return(
        <div className={styles.container}>
            {lineChart}
        </div>
    )
}

export default Chart;