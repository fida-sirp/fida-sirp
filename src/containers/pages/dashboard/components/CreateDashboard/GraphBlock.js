import React from 'react';

import BarChart from '../../widgets/barChart';
import MultiBarChart from '../../widgets/barChart/MultiBarChart';
import BarTable from '../../widgets/barChart/BarTable';
import PieChart from '../../widgets/pieChart';
import NoWidgetData from '../../widgets/NoWidgetData';
import DoughnutChart from '../../widgets/doughnutChart';
import FunnelGraphChart from '../../widgets/funnelGraphChart';
import LineChart from '../../widgets/lineChart';
import HorizantalBarChart from '../../widgets/barChart/HorizantalBar';
import TableListing from '../../widgets/tableListing';
import MultiLineChart from '../../widgets/multiLineChart';
import MapChart from '../../widgets/mapChart';
import MapChartVertical from '../../widgets/mapChart/MapChartVertical';
import ProgressBar from '../../widgets/pieChart/Progressbar';
import PolarChart from '../../widgets/polarChart';
import PieChartTable from '../../widgets/pieChartTable';
import NumberCards from '../../widgets/numberCards';
import FunnelGraphHorizontal from '../../widgets/funnelGraphChart/funnelGraphHorizontal';

const GraphBlock = ({ data, width, height, item }) => {

  switch (data?.type) {
    case 'bar':
      return (
        <BarChart
          data={data?.data}
          title={data?.widgetTitle}
          width={width}
          item={item}
          height={height}
        />
      );

    case 'horizontalBar':
      return (
        <HorizantalBarChart
          data={data?.data}
          title={data?.widgetTitle}
          width={width}
          height={height}
        />
      );

    case 'multiLevelBar':
      return (
        <MultiBarChart
          data={data?.data}
          item={item}
          title={data?.widgetTitle}
          width={width}
          height={height}
        />
      );

    case 'bar,table':
      return (
        <BarTable
          data={data?.data}
          item={item}
          title={data?.widgetTitle}
          width={width}
          height={height}
        />
      );
    case 'pie':
      return (
        <PieChart
          data={data?.data}
          title={data?.widgetTitle}
          width={width}
          height={height}
        />
      );

    case 'pie,table':
      return (
        <PieChartTable
          data={data?.data}
          title={data?.widgetTitle}
          width={width}
          height={height}
        />
      );

    case 'doughnut':
      return (
        <DoughnutChart
          data={data?.data}
          title={data?.widgetTitle}
          width={width}
          height={height}
        />
      );

    case 'line':
      return (
        <LineChart
          data={data?.data}
          title={data?.widgetTitle}
          width={width}
          height={height}
        />
      );

    case 'multiLine':
      return (
        <MultiLineChart
          data={data?.data}
          title={data?.widgetTitle}
          width={width}
          height={height}
        />
      );

    case 'funnel':
      return (
        <FunnelGraphChart
          data={data?.data}
          item={item}
          title={data?.widgetTitle}
          width={width}
          height={height}
        />
      );

    case 'horizontalFunnel': // Type is not in the doc
      return (
        <FunnelGraphHorizontal
          data={data?.data}
          item={item}
          title={data?.widgetTitle}
          width={width}
          height={height}
        />
      );

    case 'progressbar': // Type is not in the doc
      return (
        <ProgressBar
          data={data?.data}
          title={data?.widgetTitle}
          width={width}
          height={height}
        />
      );

    case 'table':
      return (
        <TableListing
          data={data?.data}
          title={data?.widgetTitle}
          width={width}
          height={height}
        />
      );

    case 'map':
      return (
        <MapChart
          data={data?.data}
          title={data?.widgetTitle}
          width={width}
          height={height}
        />
      );

    case 'mapVertical': // Type is not in the doc
      return (
        <MapChartVertical
          data={data?.data}
          title={data?.widgetTitle}
          width={width}
          height={height}
        />
      );

    case 'polar':
      return (
        <PolarChart
          item={item}
          data={data?.data}
          title={data?.widgetTitle}
          width={width}
          height={height}
        />
      );

    case 'numberCards': // Type is not in the doc
      return (
        <NumberCards
          data={data?.data}
          title={data?.widgetTitle}
          width={width}
          height={height}
        />
      );

    default:
      return <NoWidgetData width={width} height={height} />;
  }
};

export default GraphBlock;
