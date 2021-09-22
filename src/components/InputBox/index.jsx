import React, { useState } from 'react';
import './index.css';
import { CloseOutlined } from '@ant-design/icons';
import {
  TextInputWrapper,
  TextInputDiv,
  TextInput,
  ErrorDiv,
  LabelDiv,
  Label,
  EyeIcon,
  EyeSlashIcon,
  OuterWrongImage,
  OuterRightImage,
  StyledDiv,
  CloseDynamicField,
} from './StyledComponents';
import right from '../../assets/images/right.png';
import wrong from '../../assets/images/wrong.png';

const InputBox = props => {
  const { errorMessage } = props;
  const { type } = props;
  const { placeholder } = props;
  const { onKeyHit } = props;
  const { name } = props;
  const { value } = props;
  const { label } = props;
  const { onInputChange } = props;
  const { onBlur } = props;
  const { touched } = props;
  const { id } = props;
  const { width } = props;
  const [viewOn, setViewOn] = useState(false);
  const { disabled } = props;
  const { noBorderValidation } = props;
  const { isHide } = props;
  const { noMargin } = props;
  const { min } = props;
  const { removeField } = props;
  const { max } = props;

  const checkBorder = async elementID => {
    if (errorMessage) {
      document.getElementById(elementID).className = 'errorInput';
    }
    if (!errorMessage) {
      document.getElementById(elementID).className = 'noErrorInput';
    }
  };
  const handleView = () => {
    const x = document.getElementById(id);
    if (x.type === 'password') {
      x.type = 'text';
      setViewOn(true);
    } else {
      x.type = 'password';
      setViewOn(false);
    }
  };
  const onChange = e => {
    if (type === 'number') {
      const val = e.target.value;
      if (val !== '' && parseFloat(val) > 0) {
        onInputChange(e);
      } else {
        e.target.value = '';
        onInputChange(e);
      }
      return;
    }
    onInputChange(e);
    if (noBorderValidation !== true) {
      checkBorder(e.target.id);
    }
  };

  const onRemoveField = e => {
    removeField(name);
  };

  let minNumber;
  if (type === 'number') {
    minNumber = 0;
  }

  function renderData() {
    let renderItems = (
      <StyledDiv className={disabled ? 'disabled-ip' : ''}>
        <TextInputWrapper width={width} noMargin={noMargin}>
          {label ? (
            <LabelDiv>
              <Label>{label}</Label>
            </LabelDiv>
          ) : null}
          <TextInputDiv>
            {type === 'password' ? (
              <TextInput
                id={id}
                type={type}
                placeholder={placeholder}
                name={name}
                min={min || minNumber}
                value={value ?? ''}
                max={max}
                onChange={onChange}
                onKeyDown={onKeyHit}
                onBlur={onBlur}
                disabled={disabled}
              ></TextInput>
            ) : (
              <TextInput
                id={id}
                type={type}
                placeholder={placeholder}
                min={min}
                name={name}
                max={max}
                value={value ?? ''}
                onChange={onChange}
                onKeyDown={onKeyHit}
                onBlur={onBlur}
                disabled={disabled}
                min={min}
              ></TextInput>
            )}

            {type === 'password' && value && !viewOn ? (
              <EyeIcon onClick={handleView} />
            ) : null}
            {viewOn ? <EyeSlashIcon onClick={handleView} /> : null}

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

            {type === 'dynamicField' ? (
              <CloseDynamicField onClick={onRemoveField}>
                <CloseOutlined />{' '}
              </CloseDynamicField>
            ) : null}
          </TextInputDiv>
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
};

export default InputBox;
