import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import { Formik, Form } from 'formik';
import { compose } from 'redux';
import { connect } from 'react-redux';
import SPButton from '../../../../../components/SPButton';
import SelectBox from '../../../../../components/SelectBox';
import InputBox from '../../../../../components/InputBox';
import FormHeader from '../../../incidentManagement/components/FormHeader';

const initialValues = {
  fieldPath: '{*/}',
};

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

function FieldPath({ visible, onOpen, onClose, setFilterName }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <Formik
        id="formik"
        initialValues={initialValues}
        onSubmit={(values, { resetForm }) => {}}
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
          const onFilterClick = () => {
            setFilterName(values.fieldPath);
          };

          const onCopyValue = () => {
            navigator.clipboard.writeText(values.fieldPath);
          };

          const handleOnClickEvent = e => {
            let htmlData = e.target;
            let value = e.target.innerHTML;
            value = '{*/' + value + '}';
            setFieldValue('fieldPath', value, false);
          };

          useEffect(() => {
            let jsonbox = document.getElementsByClassName(
              'jsoneditor-expand-all'
            );
            Object.keys(jsonbox).forEach(key => {
              jsonbox[key].click();
            });
            let closeIcons = document.getElementsByClassName(
              'jsoneditor-field'
            );
            console.log(closeIcons);
            Object.keys(closeIcons).forEach(key => {
              closeIcons[key].addEventListener('click', handleOnClickEvent);
            });
            return () => {
              Object.keys(closeIcons).forEach(key => {
                closeIcons[key].removeEventListener(
                  'click',
                  handleOnClickEvent
                );
              });
            };
          }, []);

          return (
            <Form onSubmit={handleSubmit}>
              <FormHeader
                number={3}
                title="Use this field path in your Decisions and Filters."
                visible={visible}
                onOpen={onOpen}
                onClose={onClose}
              >
                <Row gutter={11}>
                  <Col flex={3}>
                    <InputBox
                      id="fieldPath"
                      name="fieldPath"
                      onInputChange={handleChange}
                      onBlur={handleBlur}
                      errorMessage={errors.fieldPath}
                      value={values.fieldPath}
                      touched={touched.fieldPath}
                      noMargin
                    />
                  </Col>
                  <Col flex={2} style={{ marginTop: 12 }}>
                    <Row gutter={11} justify="end">
                      <Col>
                        <SPButton
                          title="Results"
                          size="small"
                          onButtonClick={onFilterClick}
                        />
                      </Col>
                      <Col>
                        <SPButton
                          title="Copy"
                          htmlType="submit"
                          size="small"
                          onButtonClick={onCopyValue}
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </FormHeader>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default FieldPath;
