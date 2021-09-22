import React, { useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import SPModal from '../../../../../components/SPModal';
import SPButton from '../../../../../components/SPButton';
import InputBox from '../../../../../components/InputBox';
import SelectBox from '../../../../../components/SelectBox';
import 'antd/dist/antd.css';

const optionData = [
  { key: 1, value: 'ipv4', label: 'IPv4' },
  { key: 2, value: 'ipv6', label: 'IPv6' },
];

const initialValues = {
  value_artifact: '',
  add_artifact: '',
};

// const validationSchema = Yup.object({
//   artifact_value: Yup.string().required('Required'),
//   //  asr_organization:Yup.string().required('Required'),
// });

function AddToArtifact({
  selectedText,
  onClose,
  visible,
  artifact_type,
  onAdd,
  isType,
  htmlOutPut
}) {

  return (
    <SPModal
      title="Add to artifacts"
      centered
      visible={visible}
      onCancel={() => onClose()}
      width={750}
      footer={null}
    >
      <Formik
        id="formik"
        initialValues={{
          ...initialValues,
          value_artifact: selectedText ? selectedText : '',
        }}
        onSubmit={values => {

          if(isType){
            var data  = {
              heading : values.value_artifact,
              ina_output_html:htmlOutPut
            }
             onAdd(data);
          }else{
            onAdd(values);
          }
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
            resetForm();
            if (selectedText) {
              console.log({ form: selectedText });
              setFieldValue('value_artifact', selectedText);
            }
          }, [selectedText]);

      
          return (
            <Form onSubmit={handleSubmit}>
              {isType ?
                  <InputBox
                  id="value_artifact"
                  label="Value"
                  name="value_artifact"
                  placeholder="Value"
                  onInputChange={handleChange}
                  onBlur={handleBlur}
                  errorMessage={errors.value_artifact}
                  value={values.value_artifact}
                  touched={touched.value_artifact}
                  width={620}
                />


              :
              
              <>
              <SelectBox
                id="add_artifact"
                label="Select artifact"
                name="add_artifact"
                placeholder="Select artifact"
                onInputChange={setFieldValue}
                onBlur={handleBlur}
                errorMessage={errors.add_artifact}
                value={values.add_artifact}
                width={620}
                touched={touched.add_artifact}
                options={artifact_type}
              />
              <InputBox
                id="value_artifact"
                label="Value"
                name="value_artifact"
                placeholder="Value"
                onInputChange={handleChange}
                onBlur={handleBlur}
                errorMessage={errors.value_artifact}
                value={values.value_artifact}
                touched={touched.value_artifact}
                width={620}
              />
                </>
            }

             
              <Row
                gutter={11}
                justify="end"
                style={{ width: 640, paddingTop: 20 }}
              >
                <Col>
                  <SPButton
                    title="Cancel"
                    size="small"
                    type="secondary"
                    onButtonClick={onClose}
                  />
                </Col>
                <Col>
                  <SPButton
                    title="Add"
                    htmlType="submit"
                    size="small"
                    type="primary"
                    onButtonClick={handleSubmit}
                  />
                </Col>
              </Row>
            </Form>
          );
        }}
      </Formik>
    </SPModal>
  );
}

export default AddToArtifact;
