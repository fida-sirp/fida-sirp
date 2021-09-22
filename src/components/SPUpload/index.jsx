import React, { useState } from 'react';
import { Upload } from 'antd';
import 'antd/dist/antd.css';
import { isEmpty } from 'lodash';
import { AddDiv, StyledPlus, StyledRow, StyledCol, ErrorDiv } from './StyledComponents';
import { StyledPrimaryText } from '../SPMultiSelectDropdown/StyledComponents';
import UploadedItem from '../UploadedItem';
import PlusIcon from '../../assets/svgIcon/plusIcon';

function SPUpload({
  id,
  value,
  name,
  label,
  onInputChange,
  onBlur,
  disabled,
  width,
  multiple = false,
  touched,
  errorMessage
}) {
  return (
    <StyledRow>
      <StyledCol>
        <Upload
          multiple={multiple}
          id={id}
          onBlur={onBlur}
          showUploadList={false}
          maxCount={multiple ? 1 : undefined}
          disabled={disabled}
          beforeUpload={() => false}
          onChange={e => {
            let dimestion = {};
            if (e.file) {
              var img = new Image();
              img.src = window.URL.createObjectURL(e.file);
              img.onload = function () {
                dimestion = {
                  width: img.naturalWidth,
                  height: img.naturalHeight,
                };
                window.URL.revokeObjectURL(img.src);
                onInputChange(name, e.file, dimestion);
              };

              img.onerror = function (err) {
                onInputChange(name, e.file, dimestion);
              };
            }
          }}
        >
          <AddDiv width={width}>
            <StyledPrimaryText> {label} </StyledPrimaryText>
            <StyledPlus>
              <PlusIcon />
            </StyledPlus>
          </AddDiv>
        </Upload>
      </StyledCol>
      <StyledCol>
        {!isEmpty(value) ? (
          <UploadedItem
            name={value.name}
            onRemove={() => {
              onInputChange(name, {});
            }}
          />
        ) : null}
      </StyledCol>
    </StyledRow>
  );
}

export default SPUpload;
