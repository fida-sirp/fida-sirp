import React, { useEffect, useState } from 'react';
import Chart from 'react-google-charts';
import { isNumber, isString } from 'lodash';
import NoWidgetData from '../NoWidgetData';

function HorizantalBarChart({ data, title, width, height }) {
    const [fakeControls, setFakeControls] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [count, setCount] = useState();

    useEffect(() => {
        setFakeControls([]);
    }, [width, height]);


    useEffect(() => {
        if (data && data.length > 0) {
        let count = 0;
        const chartDetails = data[0];
        const chartKeys = Object.keys(data[0].data);
        const mergedData = [['Element', 'Numbers', { role: 'style' }]];
        chartKeys.forEach((item, index) => {
            if (
            isString(chartDetails.label[index]) &&
            isNumber(Number(chartDetails.data[index])) &&
            isString(chartDetails.backgroundColor[index])
            ) {
            count += Number(chartDetails.data[index]);
            mergedData.push([
                chartDetails.label[index],
                Number(chartDetails.data[index]),
                chartDetails.backgroundColor[index],
            ]);
            }
        });
        setCount(count);
        setChartData(mergedData);
        }
    }, []);

    return (
        chartData && count > 0 ? (
            <Chart
                width={width}
                height={height}
                controls={fakeControls}
                chartType="BarChart"
                loader={<div>Loading Chart</div>}
                data={chartData}
                options={{
                    sliceVisibilityThreshold: 0.2,
                    title: title,
                    titleTextStyle: {
                        color: '#fff',
                        align: 'start',
                        textAnchor: 'start',
                        fontFamily: 'Arial',
                        fontSize: 15.5,
                        fontWeight: 'bold',
                        stroke: 'none',
                        strokeWidth: 0,
                     },
                    chartArea: { width: '80%' },
                    hAxis: {
                        textStyle: { color: '#FFFFFF' },
                    },
                    vAxis: {
                        // title: 'Value of vertical',
                        titleTextStyle: { color: '#FFFFFF' },
                        textStyle: { color: '#FFFFFF' },
                        gridlines: {
                            count: 5,
                            color: '#373747',
                        },
                    },
                    backgroundColor: '#1C1C24',
                    legend: { position: 'bottom' },
                }}
                rootProps={{ 'data-testid': '6' }}
            />)
            : <NoWidgetData width={width} height={height} />
    );
}

export default HorizantalBarChart;
