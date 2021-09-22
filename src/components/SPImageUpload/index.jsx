import React, { useState, useEffect } from 'react';
import './index.css';
import {
  LabelDiv,
  Label,
  StyledDiv,
  StyledInput,
  StyledImage,
  StyledLabel,
  ImageWrapper,
} from './StyledComponents';
import SPButton from '../SPButton';
import UploadPin from '../../assets/svgIcon/uploadPin';
import Face from '../../assets/svgIcon/face';
import { StyledText } from '../SPButton/StyledComponents';

const SPImageUpload = props => {
  const { name } = props;
  const { value } = props;
  const { label } = props;
  const { onInputChange } = props;
  const { onBlur } = props;
  const { touched } = props;
  const { id } = props;
  const { disabled } = props;

  const [selectedFile, setSelectedFile] = useState(value);
  const [preview, setPreview] = useState();

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      onInputChange(name, undefined);
      return;
    }
    if(typeof selectedFile === "string"){
      setPreview(selectedFile);
    }else{
      const objectUrl = URL.createObjectURL(selectedFile);

    setPreview(objectUrl);
    onInputChange(name, selectedFile);
    return () => URL.revokeObjectURL(objectUrl);
    }

    
  }, [selectedFile]);

  useEffect(() => {
    if(value){
      setSelectedFile(value);
    }
    
  }, [value]);


  

  

  const onSelectFile = e => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
  };

  return (
    <StyledDiv>
      {label ? (
        <LabelDiv>
          <Label>{label}</Label>
        </LabelDiv>
      ) : null}
      {preview ? (
        <StyledImage src={preview} alt="Profile" />
      ) : (
        <ImageWrapper>
          <Face />
        </ImageWrapper>
      )}
      <StyledLabel for={id}>
        <UploadPin />
        <div style={{ flex: 1, textAlign: 'center' }}>
          <StyledText> Upload Image</StyledText>
        </div>
      </StyledLabel>
      <StyledInput
        id={id}
        type="file"
        onBlur={onBlur}
        name={name}
        onChange={onSelectFile}
        touched={touched}
        disabled={disabled}
        accept="image/*"
        hidden
      ></StyledInput>
    </StyledDiv>
  );
};

export default SPImageUpload;
