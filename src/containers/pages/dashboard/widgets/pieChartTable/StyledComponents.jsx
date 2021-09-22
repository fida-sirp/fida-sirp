import styled from 'styled-components';

export const Container = styled.div`
    background-color: #1c1c24;
`;

export const PieChartWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const TableWrapper = styled.div`
    width: ${props => props.width};
    height: ${props => props.height};
    background-color: #1c1c24;
    overflow: auto;
    padding: 0 15px 15px 15px;

    section {
        width: 100%;
        height: 100%;
        /* overflow: auto; */
    }

    table {
        width: 100%;
    }

    table thead {
        background: #373747;
    }

    table thead tr {
        color: #FFFFFF !important;
    }

    table thead tr:first-child th:first-child {
        border-top-left-radius: 10px;
    }

    table thead tr:first-child th:last-child {
        border-top-right-radius: 10px;
    }

    table thead > tr > th {
        height: 46px !important;
        background-color: #373747;
        color: #FFFFFF !important;
        border-bottom: none;
        padding-left: 2px;
        padding-right: 2px;
    }

    table tbody tr {
        height: 46px !important;
        background-color: #373747;
        color: #FFFFFF;
        border-bottom: none;
    }

    table tbody > tr > td {
        color: #FFFFFF !important;
        background-color: #1c1c24;
        border-bottom: 1px solid #373747;
        padding-top: 25px;
        padding-bottom: 28px;
        padding-left: 2px;
        padding-right: 2px;
        text-align: center;

        a {
            color: #FFFFFF !important;
        }
    }

    table tbody > tr > td:first-child {
        text-align: left;
    }
`;


export default Container