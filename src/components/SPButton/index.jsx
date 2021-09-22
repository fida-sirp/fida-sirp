import React from 'react';
import 'antd/dist/antd.css';
import { AppButton, StyledText, StyledDiv } from './StyledComponents';

const SPButton = props => {
  const {
    title,
    htmlType,
    onButtonClick,
    isLoading,
    size,
    image,
    type,
    disabled,
    rightImage,
    icon,
    style,
  } = props;

  let height = 42;

  switch (size) {
    case 'small':
      height = 33;
      break;
    case 'medium':
      height = 42;
      break;
    case 'large':
      height = 55;
      break;

    default:
      height = 42;
      break;
  }

  return (
    <AppButton
      style={style}
      type={type}
      htmlType={htmlType}
      onClick={onButtonClick}
      loading={isLoading}
      block
      height={height}
      disabled={disabled}
    >
      {image}
      <StyledText> {title} {icon}</StyledText>
      {rightImage ? <StyledDiv>{rightImage}</StyledDiv> : null}
    </AppButton>
  );
};

export default SPButton;
