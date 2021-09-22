import React, { useEffect, useState } from 'react';
import Chart from 'react-google-charts';
import { isNumber, isString } from 'lodash';
import NoWidgetData from '../NoWidgetData';
import { Label } from '../../../../../components/SelectBox/StyledComponents';

function PieChart({ data, title, width, height }) {
  const [controls, setControls] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setControls([]);
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
    chartData && count > 0 ?
      <Chart
        width={width}
        controls={controls}
        height={height}
        chartType="PieChart"
        loader={<Label>Loading Chart</Label>}
        data={chartData}
        options={{
          // sliceVisibilityThreshold: 0.2,
          title,
          backgroundColor: '#1C1C24',
          titleTextStyle: {
            color: '#fff',
            align:'start',
            textAnchor: 'start',
            fontFamily: 'Arial',
            fontSize: 15.5,
            fontWeight: 'bold',
            stroke: 'none',
            strokeWidth: 0,
         },
          chartArea: { width: '90%' },
          legend: {
            position: 'bottom',
            textStyle: {
              color: '#FFFFFF',
            },
          },
        }}
        rootProps={{ 'data-testid': '1' }}
      />
      : <NoWidgetData width={width} height={height} />
  );

}

export default PieChart;
