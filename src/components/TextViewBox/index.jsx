import React from 'react';
import { StyledDiv, TextInputWrapper, LabelDiv, Label, TextAreaView } from './StyledComponents';
import Tag from '../UploadedItem';

function TextViewBox({ label, width, height, children, tag }) {
  return (
    <StyledDiv>
      <TextInputWrapper>
        {label ? ( 
          <LabelDiv>
            <Label>{label}</Label>
          </LabelDiv>
        ) : null}
      </TextInputWrapper>
      <TextAreaView width={width} height={height}>
        {children}
      </TextAreaView>
    </StyledDiv>
  );
}

export default TextViewBox
