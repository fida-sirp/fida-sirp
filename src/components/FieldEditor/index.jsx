import React from 'react';
import { Field } from 'formik';
import { ErrorText, WrapperDiv } from './StyledComponents';
import { Label, LabelDiv } from '../InputBox/StyledComponents';
import TextEditorBox from '../TextEditorBox';

const FieldEditor = ({ lable, name, touched, errors }) => {
  return (
    <WrapperDiv>
      <LabelDiv>
        <Label>{lable}</Label>
      </LabelDiv>
      <Field name={name}>
        {({ field }) => (
          <TextEditorBox
            value={field.value}
            onChange={field.onChange(field.name)}
          />
        )}
      </Field>
      {touched && errors ? <ErrorText>{errors}</ErrorText> : null}
    </WrapperDiv>
  );
};

export default FieldEditor;
