import React, { useEffect, useState } from 'react';
import Chart from 'react-google-charts';
import { isNumber, isString } from 'lodash';
import { Row, Col } from 'antd';
import NoWidgetData from '../NoWidgetData';
import { Container, Circle } from './StyledComponents';

const MapChartVertical = ({ width, height, data }) => {
  const [controls, setControls] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [colors, setColors] = useState([]);
  const [labelData, setLabelData] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setControls([]);
  }, [width, height]);

  useEffect(() => {
    if (data && data.length > 0) {
      let count = 0;
      let colors = [];
      let labelData = [];
      const chartDetails = data[0];
      const chartKeys = Object.keys(data[0].data);
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
            Number(chartDetails.data[index]),
          ]);
          colors.push(chartDetails.backgroundColor[index]);
          labelData.push({
            label: chartDetails.label[index],
            data: Number(chartDetails.data[index]),
            color: chartDetails.backgroundColor[index],
          });
        }
      });
      setCount(count);
      setChartData(mergedData);
      setColors(colors);
      setLabelData(labelData);
    }
  }, []);

  return (
    <div
      style={{
        margin: '15px',
        width: width,
        height: height,
        backgroundColor: '#1C1C24',
        padding: '15px 0',
      }}
    >
      <Chart
        height={height - (height * 30) / 100}
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
        options={{
          sliceVisibilityThreshold: 0.2,
          colorAxis: { colors },
          title: title,
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

      <Container>
        {labelData &&
          labelData.length > 0 &&
          labelData.map(labelRow => (
            <Row>
              <Col span={12}>
                <Circle color={labelRow.color} />
                {labelRow.label}
              </Col>
              <Col span={12}>{labelRow.data}</Col>
            </Row>
          ))}
      </Container>
    </div>
  );
};

export default MapChartVertical;
