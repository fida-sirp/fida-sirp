import React, { useState, useEffect } from 'react';
import { isEmpty, isNumber, isString } from 'lodash';

import NoWidgetData from '../NoWidgetData';
import Container from './StyledComponents';


function PolarChart({ data, title, width, height, item }) {
  const [chartData, setChartData] = useState([]);
  const [categories, setCategories] = useState([]);
  // const [count, setCount] = useState(0);

  useEffect(() => {
    // console.log('<<<<<<<<<< POLAR DATA', data)
    if (data && data[0]?.data.length > 0) {
      let count = 0;
      const chartDetails = data[0];
      const chartKeys = chartDetails?.data;
      const FilterChartData = chartKeys.map((item, index) => {
          // count += Number(chartDetails.data[index]);
          return {
            data: item?.data.map(item=> Number(item)),
            name: item?.label,
            lineColor:item?.borderColor,
            pointPlacement: 'on',
          };
      });
      // setCount(count);
      setCategories(data[0]?.label);
      setChartData(FilterChartData);


    }
  }, [data]);

  useEffect(() => {
    if (!isEmpty(chartData)) {
      window.Highcharts.chart(`container_${item}`, {
        navigation: {
          buttonOptions: {
            enabled: false,
          },
        },
        chart: {
          backgroundColor: '#1C1C24',
          polar: true,
          type: 'line',
          renderTo: `container_${item}`,
          reflow: false,
        },
        title: {
          text: title,
          align: 'start',
          style: {
            color: '#fff',
            textAnchor: 'start',
            fontFamily: 'Arial',
            fontSize: 15.5,
            fontWeight: 'bold',
            stroke: 'none',
            strokeWidth: 0,
          },
        },
        pane: {
          size: '90%',
        },
        xAxis: {
          gridLineColor: '#373747',
          categories: categories,
          tickmarkPlacement: 'on',
          lineWidth: 0,
          labels: {
            style: {
              color: '#fff',
            },
          },
        },

        yAxis: {
          gridLineInterpolation: 'polygon',
          lineWidth: 0,
          min: 0,
          gridLineColor: '#373747',
        },

        legend: {
          align: 'center',
          verticalAlign: 'bottom',
          layout: 'horizantal',
          itemStyle: { color: '#fff' },
        },

        series: chartData,

        responsive: {
          rules: [
            {
              condition: {
                maxWidth: 500,
              },
              chartOptions: {
                legend: {
                  align: 'center',
                  verticalAlign: 'bottom',
                  layout: 'horizontal',
                },
                pane: {
                  size: '90%',
                },
              },
            },
          ],
        },
      });
    }

  }, [chartData, width, height]);

  return (
    <Container>
      {data[0]?.data.length > 0 ? (
        <figure
          className="highcharts-figure"
          style={{ height: height, width: width }}
        >
          <div
            id={`container_${item}`}
            style={{ height: height, width: width }}
          />
        </figure>
      ) : (
        <NoWidgetData height={height} width={width} />
      )}
    </Container>
  );
}

export default PolarChart;
