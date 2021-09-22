import React, { useEffect, useState } from 'react';
import Chart from 'react-google-charts';
import { isNumber, isString, isArray } from 'lodash';
import NoWidgetData from '../NoWidgetData';
import { Label } from '../../../../../components/SelectBox/StyledComponents';
import { ChartTitle } from '../../StyledComponents';
import { MapContainer } from './StyledComponents';

const MapChart = ({ width, title, height, data }) => {
  const [controls, setControls] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [colors, setColors] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setControls([]);
  }, [width, height]);

  useEffect(() => {
    if (data && data.length > 0) {
      let count = 0;
      let colors = [];
      const chartDetails = data[0];
      const chartKeys = isArray(chartDetails) ? Object.keys(chartDetails) : [];
      const mergedData = [['Country', 'Population']];

      chartKeys.forEach((item, index) => {
        if (
          isString(chartDetails.label[index]) &&
          isNumber(Number(chartDetails.data[index])) &&
          isString(chartDetails.backgroundColor[index])
        ) {
          count += Number(chartDetails.data[index]);
          mergedData.push([
            chartDetails.label[index],
            Number(chartDetails.data[index])
          ]);
          colors.push(chartDetails.backgroundColor[index])
        }
      });
      setCount(count);
      setChartData(mergedData);
      setColors(colors);
    }
  }, []);

  return (

      <MapContainer height={height} width={width} >
        {/* <ChartTitle>{title}</ChartTitle> */}
        <Chart
          height={height - 55}
          width={width}
          controls={controls}
          chartType="GeoChart"
          data={[
            ['Country', 'Popularity'],
            ['Germany', 200],
            ['United States', 300],
            ['Brazil', 400],
            ['Canada', 500],
            ['France', 600],
            ['RU', 700],
          ]}
          loader={<Label>Loading Chart</Label>}
          options={{
            sliceVisibilityThreshold: 0.2,
            colorAxis: { colors },
            title:title,
            titleTextStyle: {
              color: '#fff',
              textAnchor: 'start',
              fontFamily: 'Arial',
              fontSize: 15.5,
              fontWeight: 'bold',
              stroke: 'none',
              strokeWidth: 0,
           },
            legend: {
              position: 'bottom',
            },
            backgroundColor: '#1C1C24',
            datalessRegionColor: '#525268',
            defaultColor: '#f5f5f5',
          }}
          mapsApiKey="YOUR_KEY_HERE"
          rootProps={{ 'data-testid': '4' }}
        />
      </MapContainer>
  );
}

export default MapChart;