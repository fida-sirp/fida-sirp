import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import { Row, Col } from 'antd';
import * as Yup from 'yup';
import SPButton from '../../../../../../../../components/SPButton';
import InputBox from '../../../../../../../../components/InputBox';
import SelectBox from '../../../../../../../../components/SelectBox';
import 'antd/dist/antd.css';
import { RowDiv, CreateAppControlBtn } from './StyledComponents';

const validationSchema = Yup.object({
  asv_name: Yup.string().required('This Field Required'),
  asv_value: Yup.number().required('This Field Required'),
});

let initialValues = {
  asv_name: '',
  asv_value: ''
};

function CreateAssetValue({
  onCloseDrawer,
  createAssetValue,
  isVisible
}) {

  return (
    <div>
      <Formik
        id="formik"
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={(values, { resetForm }) => {
          createAssetValue(values);
          resetForm();
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
            resetForm()
          }, [isVisible])
          return (
            <Form>
              <RowDiv>
                <InputBox
                  id="asv_name"
                  label="Asset Name"
                  name="asv_name"
                  placeholder="Asset Name"
                  onInputChange={handleChange}
                  onBlur={handleBlur}
                  errorMessage={errors.asv_name}
                  value={values.asv_name}
                  touched={touched.asv_name}
                  width={750}
                  disabled={isSubmitting}
                  noBorderValidation
                />
              </RowDiv>
              <RowDiv>
                <InputBox
                  id="asv_value"
                  label="Asset Value"
                  name="asv_value"
                  type="number"
                  placeholder="Asset Value"
                  onInputChange={handleChange}
                  onBlur={handleBlur}
                  errorMessage={errors.asv_value}
                  value={values.asv_value}
                  touched={touched.asv_value}
                  width={750}
                  disabled={isSubmitting}
                  noBorderValidation
                />
              </RowDiv>

              <CreateAppControlBtn>
                <Row gutter={11} justify="end">
                  <Col>
                    <SPButton
                      title="Cancel"
                      size="small"
                      type="secondary"
                      onButtonClick={() => {
                        resetForm();
                        onCloseDrawer();
                      }}
                    />
                  </Col>
                  <Col>
                    <SPButton
                      title={'Create'}
                      size="small"
                      type="submit"
                      onButtonClick={handleSubmit}
                    // isLoading={
                    //   newAsset.isProcessing ? newAsset.isProcessing : false
                    // }
                    />
                  </Col>
                </Row>
              </CreateAppControlBtn>
            </Form>
          )
        }}
      </Formik>
    </div>
  );
}

export default CreateAssetValue;
