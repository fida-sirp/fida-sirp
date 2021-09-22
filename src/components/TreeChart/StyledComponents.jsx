import styled from 'styled-components';
import { Colors } from '../../theme';

const Container = styled.div`
    background-color: ${Colors.backgroundSmokeBlack};
    
    .highcharts-figure {
        height:100%;
        width:100%;
        position:absolute;
    }
    
    .highcharts-background {
        fill: ${Colors.backgroundSmokeBlack};
    }
    
    .highcharts-title, .highcharts-subtitle, .highcharts-exporting-group, .highcharts-credits {
        display: none;
    }
`;

export default Container
