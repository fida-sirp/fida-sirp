import React, { useEffect, useState } from 'react';
import NoWidgetData from '../NoWidgetData';

function BarChart({ data, title, width, height, item}) {
  const [chartData, setChartData] = useState([]);
  const [categroies, setCategories] = useState([]);
  const [count, setCount] = useState();


  useEffect(()=>{
    let counter = 0;
    const barChartDetails = data[0];
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
    setCount(counter);
    setCategories(categoriesLabels);
    setChartData(result)
  }, [])

  useEffect(() => {
    const node = document.getElementById(`hightchartBar_${item}`);
    if (data && data.length > 0 && node) {
      window.Highcharts.chart(`hightchartBar_${item}`, {
        chart: {
          type: 'column',
          backgroundColor: '#1C1C24',
          renderTo: `hightchartBar_${item}`,
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
    <>
       {
         (data && data.length > 0) && count > 0?
         <div id={`hightchartBar_${item}`} style={{ height: height, width: width }}></div>
         :  <NoWidgetData width={width} height={height} />
       }
    </>
  );
}

export default BarChart;
