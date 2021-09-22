import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import { compose } from 'redux';
import { connect } from 'react-redux';
import SPButton from '../../../../../components/SPButton';
import SelectBox from '../../../../../components/SelectBox';
import InputBox from '../../../../../components/InputBox';
import FormHeader from '../../../incidentManagement/components/FormHeader';

const initialValues = {
  rootPath: '',
  importTemplate: '',
};

const ButtonRightWidth = styled.div`
width: 40px;
float: right;
`;


const optionData = [
  { key: 1, value: 'ipv1', label: 'IPv1' },
  { key: 2, value: 'ipv2', label: 'IPv2' },
  { key: 3, value: 'ipv3', label: 'IPv3' },
  { key: 4, value: 'ipv4', label: 'IPv4' },
  { key: 5, value: 'ipv5', label: 'IPv5' },
  { key: 6, value: 'ipv6', label: 'IPv7' },
  { key: 7, value: 'ipv7', label: 'IPv8' },
  { key: 8, value: 'ipv8', label: 'IPv9' },
];

function Settings({setSelectedRootPath, visible, onOpen, onClose, assetTemplateOption,setUpdatedTemplate, setTemplateVisible }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <Formik
        id="formik"
        initialValues={initialValues}
        onSubmit={(values, { resetForm }) => {

        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          resetForm,
          setFieldValue,
        }) => {

          useEffect(() => {
            if(values.importTemplate){
              setUpdatedTemplate(values.importTemplate);
            }
          }, [values.importTemplate]);

          useEffect(() => {
          
              setSelectedRootPath(values.rootPath);
      
          }, [values.rootPath]);


          
          return (
            <Form onSubmit={handleSubmit}>
              <FormHeader
                number={1}
                title="Setting"
                visible={visible}
                onOpen={onOpen}
                onClose={onClose}
              >
                <ButtonRightWidth>
                  <SPButton title="+" onButtonClick={setTemplateVisible} size="small" />
                </ButtonRightWidth>
                <SelectBox
                  id="importTemplate"
                  label="Import Template"
                  name="importTemplate"
                  placeholder="Import Template"
                  onInputChange={setFieldValue}
                  onBlur={handleBlur}
                  errorMessage={errors.importTemplate}
                  value={values.importTemplate}
                  touched={touched.importTemplate}
                  options={assetTemplateOption}
                  width={350}
                />
                <InputBox
                  id="rootPath"
                  label="Root-Path"
                  name="rootPath"
                  placeholder="Root-Path"
                  onInputChange={handleChange}
                  onBlur={handleBlur}
                  errorMessage={errors.rootPath}
                  value={values.rootPath}
                  touched={touched.rootPath}
                />
                  

               
              </FormHeader>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default Settings;
