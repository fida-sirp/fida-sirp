import styled from 'styled-components'
import DateRangePicker from 'react-bootstrap-daterangepicker'
import { Colors } from '../../theme';


export const StyledDiv = styled.div`
    background-color: ${Colors.backgroundSmokeBlack};
    color:${Colors.primarySmokeWhite};
    display: inline-flex;
    align-items: center;
    justify-content: space-around;
    padding:10px;
    width: 400px;
    position: relative;
`;

export const StyleSpan = styled.span`
    margin: 0px 10px 0px 10px;
    font-size: 15px;
`;
