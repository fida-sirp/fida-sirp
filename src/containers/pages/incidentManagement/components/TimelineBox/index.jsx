import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Dropdown, Button  } from 'antd';
import  SPCog  from '../../../../../components/SPCog';
import Chart from "react-google-charts";
import { 
    StyledBox,
    StyledTab, 
    StyleTabPane, 
    StyleFlex, 
    TimeListMain, 
    DomainListMain,
    ListStyle, 
    ListLabelStyle,
    RightOutlinedStyle, 
    ReportBox,
    ReportTable 
} from './StyledComponents';







function TimelineBox() {


  

    return (
        <StyledBox>
          <Chart
            width={'100%'}
            height={'100%'}
            chartType="Timeline"
            loader={<div>Loading Chart</div>}
            data={[
              [
                { type: 'string', id: 'Term' },
                { type: 'string', id: 'Name' },
                { type: 'date', id: 'Start' },
                { type: 'date', id: 'End' },
              ],
              ['1', 'George Washington', new Date(1789, 3, 30), new Date(1797, 2, 4)],
              ['2', 'John Adams', new Date(1797, 2, 4), new Date(1801, 2, 4)],
              ['3', 'Thomas Jefferson', new Date(1801, 2, 4), new Date(1809, 2, 4)],
            ]}
            rootProps={{ 'data-testid': '2' }}
         
            options={{
              allowHtml: true,
              timeline: {
                singleColor: '#373747',
                isHtml: true,
                rowLabelStyle: {fontName: 'Helvetica', fontSize: 24, color: '#603913',height:'100px' },
                barLabelStyle: { fontName: 'Garamond', fontSize: 14,height:'100px' } 
          
              },
              tooltip: { isHtml: true, trigger: "visible" },
              backgroundColor: '#2C2C38',
              cssClassNames : {
                headerRow :'tableChartHeaderRow',
                hoverTableRow : 'tableChartHeaderRowHighlightedState'
              }
            }}
          />
        </StyledBox>
      );
}

export default TimelineBox;