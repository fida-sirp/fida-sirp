import React from 'react';
import PropTypes from 'prop-types';
import {
  CancelButton,
  StyledDatepicker,
  ContainerDiv,
} from './StyledComponents';
import {
  StyledDiv,
  TextInputDiv,
  TextInputWrapper,
  Label,
  LabelDiv,
  ErrorDiv,
} from '../SelectBox/StyledComponents';
import CalenderIcon from '../../assets/svgIcon/calenderIcon';
import CancelIcon from '../../assets/svgIcon/cancelIcon';
import './index.css';
import { isFunction } from 'lodash';
import moment from 'moment';

function SPDatepicker({
  id,
  value,
  name,
  width,
  label,
  placeholder,
  onBlur,
  onInputChange,
  touched,
  errorMessage,
  disabled,
  isHide,
  noMargin,
  defaultValue,
}) {
  function onChangeDate(date, dateString) {
    onInputChange(name, date);
  }

  function getScrollParent(node) {
    if (node.parentElement === null) {
      return node;
    }

    return node.parentElement.scrollHeight > node.clientHeight ||
      node.parentElement.scrollWidth > node.clientWidth
      ? node.parentElement
      : getScrollParent(node.parentElement);
  }

  function renderData() {
    let renderItems = (
      <StyledDiv>
        <TextInputWrapper style={{ width }} noMargin={noMargin}>
          {label ? (
            <LabelDiv>
              <Label>{label}</Label>
            </LabelDiv>
          ) : null}
          <ContainerDiv style={{ width }}>
            <CalenderIcon />
            <StyledDatepicker
              getPopupContainer={triggerNode => getScrollParent(triggerNode)}
              width={width}
              id={id}
              value={
                isFunction(value?.isValid)
                  ? value?.isValid()
                    ? value
                    : moment()
                  : value
              }
              onBlur={onBlur}
              placeholder={placeholder}
              disabled={disabled}
              onChange={onChangeDate}
              dropdownClassName="abc"
              inputReadOnly={true}
              defaultValue={defaultValue}
            />
            <CancelButton
              onClick={e => {
                e.preventDefault();
                onInputChange(name, null);
              }}
            >
              <CancelIcon />
            </CancelButton>
          </ContainerDiv>
        </TextInputWrapper>
        {touched && errorMessage ? <ErrorDiv>{errorMessage}</ErrorDiv> : null}
      </StyledDiv>
    );
    if (isHide === true) {
      renderItems = <></>;
    }

    return renderItems;
  }

  return <>{renderData()}</>;
}

export default SPDatepicker;
