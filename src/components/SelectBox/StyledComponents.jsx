import styled from 'styled-components';
import { Select } from 'antd';
import { Colors } from '../../theme';

export const TextInputWrapper = styled.div`
  width: ${props => (props.width ? props.width + 'px' : '100%')};
  min-width: max-content;
  height: max-content;
  display: flex;
  align-items: center;
  margin-bottom: ${props => (props.noMargin ? '0px' : '24px')};
  justify-content: center;
  flex-direction: column;

  .ant-select-selection-search-input {
    padding-left: 0 !important;
  }
`;

export const TextInputDiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: max-content;
  justify-content: center;
  background: #1c1c24;
  border-radius: 5px;
`;

export const SelectInput = styled(Select)`
  font-size: 15px;
  width: 100%;
  flex-wrap: flex;
  text-align: left;
  border-radius: 5px;
  border: 1px solid #ffffff5c;
  color: white;
  outline: none;
  min-height: 38px;
  height: ${props =>
    props.mode === 'tags' || props.mode === 'multiple'
      ? 'max-content'
      : '38px'};
  max-width: ${props => (props.width ? props.width + 'px' : '100%')};

  .ant-select-selection-item {
    display: flex;
    align-items: center;
    height: max-content;
    margin-left: 5px;
  }
  .ant-select-selector {
    background-color: transparent !important;
    border: none !important;
    color: white !important;
    font-size: 15px;
    height: max-content;
  }
  .ant-select-arrow {
    color: white;
  }
`;
export const ErrorDiv = styled.p`
  color: #fc5a5a;
  font-size: 13px;
  font-weight: 700;
  margin-left: 3px;
  margin-top: -20px;
  text-align: left;

  @media (max-width: 768px) {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  @media (max-width: 300px) {
    max-width: 122px;
  }
`;

export const LabelDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  flex-direction: row;
`;

export const Label = styled.label`
  font-size: 15px;
  color: #ffffff;
  font-weight: 700;
  display: flex;
  margin-bottom: 15px;
`;

export const OuterWrongImage = styled.img`
  width: 20px;
  height: auto;
  display: flex;
  position: absolute;
  top: 10px;
  right: -30px;
`;

export const OuterRightImage = styled.img`
  width: 15px;
  height: auto;
  display: flex;
  position: absolute;
  top: 10px;
  right: -30px;
`;

export const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${props => (props.padding ? props.padding + 'px' : 'unset')};
`;
