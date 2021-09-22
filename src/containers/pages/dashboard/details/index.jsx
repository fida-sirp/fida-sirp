import React from 'react';
import PageHeader from '../../../layout/pageHeader';
import SPButton from '../../../../components/SPButton';
import SelectBox from '../../../../components/SelectBox';
import {
  Container,
  StyledDiv,
  TitleStyledDiv,
  TitleText,
  TextStyle,
} from './StyledComponents';
import BarChart from '../widgets/barChart';
import PieChart from '../widgets/pieChart';
import LineChart from '../widgets/lineChart';
import { MapChart, MapChartVertical } from '../widgets/mapChart';
import DoughnutChart from '../widgets/doughnutChart';
import PieChartTable from '../widgets/pieChartTable';
import FunnelGraphChart from '../widgets/funnelGraphChart';
import PolarChart from '../widgets/polarChart';
import MultiLineChart from '../widgets/multiLineChart';
import TableListing from '../widgets/tableListing';
import NumberCards from '../widgets/numberCards';
import Progressbar from '../widgets/pieChart/Progressbar'
import FunnelGraphHorizontal from '../widgets/funnelGraphChart/funnelGraphHorizontal';

const barChartData = [
  ['Element', 'Numbers', { role: 'style' }],
  ['Item 1', 60, '#1E75FF'],
  ['Item 2', 50, '#3DD598'],
  ['Item 3', 40, '#FC5A5A'],
  ['Item 4', 30, '#FFC542'],
  ['Item 5', 20, '#525268'],
  ['Item 6', 10, '#FFFFFF'],
];

const pieChartData = [
  ['Task', 'Percentage', { role: 'style' }],
  ['Point One', 24, '#FC5A5A'],
  ['Point Two', 47, '#33C758'],
  ['Point Three', 10, '#FFC542'],
  ['Point Four', 15, '#1E75FF'],
];

const DoughnutChartData = [
  ['Task', 'Numbers'],
  ['Item1', 24],
  ['Item2', 47],
  ['Item3', 10],
];

const lineChartData = [
  ['x', 'items', '#FC5A5A'],
  ['item1', 0.2, '#33C758'],
  ['item2', 0, '#33C758'],
  ['item3', 0.3],
  ['item4', 0],
  ['item5', 0.4],
];

const multiLineChartData = [
  ['x', 'items', 'any', 'data'],
  [0, 0.2, 0.6, 1.0],
  [10, 0, 0.2, 0.8],
  [17, 0.3, 0.8, 0.9],
  [20, 0, 0.2, 0.7],
  [30, 0.4, 1.0, 1.2],
];

const funnelData = [
  ['Website visits', 5654],
  ['Downloads', 4064],
  ['Product 1', 3022],
  ['Requested price list', 1987],
  ['Invoice sent', 976],
];

const polarData = [
  {
    name: 'Allocated Budget',
    data: [43000, 19000, 60000, 35000, 17000, 10000],
    pointPlacement: 'on',
    lineColor: '#FFC542',
  },
  {
    name: 'Actual Spending',
    data: [50000, 39000, 42000, 31000, 26000, 14000],
    pointPlacement: 'on',
    lineColor: '#1E75FF',
  },
];

const polarCategories = [
  'Category1',
  'Category2',
  'Category3',
  'Category4',
  'Category5',
  'Category6',
];

function DashboardDetails() {
  return (
    <>
      <PageHeader
        title="Your Dashboard"
        options={[
          <SelectBox
            placeholder="Dashboard: Dashboard name goes here"
            name="Dashboard"
            width={325}
          />,
          <SPButton title="Edit dashboard" size="small" />,
        ]}
      />
      {/* <Container>
        <TitleStyledDiv>
          <TitleText>Text input title you can replace it</TitleText>
          <TextStyle>
            SIRP’s case management and workflow capabilities enable effective
            communication across multiple teams. Provide your teams the
            ability to escalate cases to track and to monitor status and
            progress. Working together, teams can configure and customise
            workflows according to organisational processes.
          </TextStyle>
        </TitleStyledDiv>
      </Container> */}
      {/* <BarChart data={barChartData} />
        <PieChart data={pieChartData}/>
        <LineChart data={lineChartData} />
        <DoughnutChart data={DoughnutChartData} />
        // <PieChartTable />
        <PolarChart data={polarData} categories={polarCategories} />
        <MultiLineChart data={multiLineChartData} />
        <FunnelGraphChart data={funnelData} />
        <TableListing />
      */}
      {/* <Progressbar /> */}
      {/* <MapChart /> */}
      {/* <MapChartVertical /> */}
      {/* <PieChartTable /> */}
      {/* <FunnelGraphHorizontal /> */}
      {/* <NumberCards /> */}
      {/* <LineChart data={lineChartData} /> */}
    </>
  );
}

export default DashboardDetails
