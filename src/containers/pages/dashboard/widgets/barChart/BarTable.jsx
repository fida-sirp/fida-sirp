import React, { useEffect, useState } from 'react';
import NoWidgetData from '../NoWidgetData';
import { Container, TableWrapper, BarChartWrapper } from './StyledComponents';
import { ChartTitle } from './../../StyledComponents';

function BarTable({ data, title, width, height, item }) {
  const [controls, setControls] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [tableData, setTableData] = useState('');
  const [hasData, setHasData] = useState(false);
  const [categroies, setCategories] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setControls([]);
  }, [width, height]);

  useEffect(() => {
    let hasData = false;;
    const barData = data?.bar?.data|| [];

    if (barData?.length > 0) {
      let counter = 0;
      const barChartDetails = data?.bar;
      const categoriesLabels = barChartDetails?.label;
      let result = [];
      
      barChartDetails?.data.map((item, itemIndex) => {
        let rowData = Number(item);
        counter+= rowData;
        result = [
          ...result,
          {
            y: rowData,
            color: barChartDetails?.backgroundColor[itemIndex]
          }
        ]
      });
      
      setCategories(categoriesLabels);
      setChartData(result)
      hasData = counter > 0;
    }

    if (data?.table?.data?.length > 0) {
      const tableData =
        data.table.data.replaceAll('BASE_URL', location.host);
      setTableData(tableData);
      hasData = tableData.length > 0;
    }

    setHasData(hasData);
  }, []);

  useEffect(() => {
    const node = document.getElementById(`hightchartBarTable_${item}`);
    if (chartData && chartData.length > 0 && node) {
      window.Highcharts.chart(`hightchartBarTable_${item}`, {
        chart: {
          type: 'column',
          backgroundColor: '#1C1C24',
          renderTo: `hightchartBarTable_${item}`,
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
        xAxis: {
          categories: categroies ? categroies : [],
          crosshair: true,
          labels: {
            style: {
              color: '#fff',
              // fontWeight: 'bold',
            },
          },
        },
        yAxis: {
          min: 0,
        },
        plotOptions: {
          column: {
            pointPadding: 0.2,
            borderWidth: 0,
          },
        },
        exporting: { enabled: false },
        series: [
          {
            name: title,
            data: chartData,
          },
        ],
      });
    }
  }, [chartData, width, height]);

  return (
    <Container
      style={{
        width,
        height,
      }}
    >
      {hasData ? (
        <>
        <ChartTitle>{title}</ChartTitle>
        <BarChartWrapper>
          {chartData ? (
          <div id={`hightchartBarTable_${item}`} style={{ height: height-40, width: width/2 }}></div>

        ) : (<NoWidgetData width={width/2} height={height-40} />)}
          <TableWrapper
            width={width/2}
            height={height-40}
          >
            <div dangerouslySetInnerHTML={{ __html: tableData }} />
          </TableWrapper>
        </BarChartWrapper>
        </>
      ) : <NoWidgetData width={width/2} height={height} />}
    </Container>
  );
}

export default BarTable;
