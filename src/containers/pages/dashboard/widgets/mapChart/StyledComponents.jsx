import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 15px;

  .ant-row {
    padding: 0 15px;
    color: #afbdd1;

    .ant-col:first-child {
      display: flex;
      vertical-align: middle;
    }

    .ant-col:last-child {
      text-align: right;
    }
  }
`;

export const Circle = styled.div`
    height: 15px;
    width: 15px;    
    border-radius: 50%;
    background-color: ${props => props.color};
    margin-top: 4px;
    margin-right: 5px;
`;

export const MapContainer = styled.div`
  height: ${props => props.height};
  width: ${props => props.width};
  background-color: #1c1c24;
`;