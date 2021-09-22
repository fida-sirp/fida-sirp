import React, { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import './index.css';
import { StyledInputBox, LabelDiv, Label } from './StyledComponents';

const TextEditorBox = ({ value, onChange, placeholder, label }) => {
  return (
    <>
      {label && (
        <LabelDiv>
          <Label>{label}</Label>
        </LabelDiv>
      )}
      <StyledInputBox
        theme="snow"
        onChange={onChange}
        value={value}
        modules={TextEditorBox.modules}
        formats={TextEditorBox.formats}
        placeholder={placeholder}
      />
    </>
  );
};

export default TextEditorBox;

TextEditorBox.modules = {
  toolbar: [
    ['bold', 'italic', 'underline'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['image'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};

TextEditorBox.formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
];
