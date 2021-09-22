import React, { useState } from 'react';
import './index.css';
import {
  TextInputWrapper,
  TextInputDiv,
  TextArea,
  ErrorDiv,
  LabelDiv,
  Label,
  OuterWrongImage,
  OuterRightImage,
  StyledDiv,
} from './StyledComponents';
import right from '../../assets/images/right.png';
import wrong from '../../assets/images/wrong.png';

const TextAreaBox = props => {
  const { errorMessage } = props;
  const { type } = props;
  const { placeholder } = props;
  const { name } = props;
  const { value } = props;
  const { label } = props;
  const { onInputChange } = props;
  const { onBlur } = props;
  const { touched } = props;
  const { id } = props;
  const { width } = props;
  const { disabled } = props;
  const { noBorderValidation } = props;
  const { isHide } = props;
  const { height } = props;

  const checkBorder = async elementID => {
    if (errorMessage) {
      document.getElementById(elementID).className = 'errorInput';
    }
    if (!errorMessage) {
      document.getElementById(elementID).className = 'noErrorInput';
    }
  };

  const onChange = e => {
    onInputChange(e);

    if (noBorderValidation !== true) {
      checkBorder(e.target.id);
    }
  };

  function renderData() {
    let renderItem = (
      <StyledDiv>
        <TextInputWrapper width={width}>
          {label ? (
            <LabelDiv>
              <Label>{label}</Label>
            </LabelDiv>
          ) : null}
          <TextInputDiv height={height}>
            <TextArea
              id={id}
              type={type}
              placeholder={placeholder}
              name={name}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              disabled={disabled}
            />
            {!noBorderValidation ? (
              value && !errorMessage ? (
                <OuterRightImage src={right} />
              ) : null
            ) : null}
            {!noBorderValidation ? (
              value && errorMessage ? (
                <OuterWrongImage src={wrong} />
              ) : null
            ) : null}
          </TextInputDiv>
        </TextInputWrapper>
        {touched && errorMessage ? <ErrorDiv>{errorMessage}</ErrorDiv> : null}
      </StyledDiv>
    );
    if (isHide === true) {
      renderItem = <></>;
    }
    return renderItem;
  }

  return <>{renderData()}</>;
};

export default TextAreaBox;
