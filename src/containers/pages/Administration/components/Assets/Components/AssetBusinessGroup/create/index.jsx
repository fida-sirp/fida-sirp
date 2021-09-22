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
  bgp_name: Yup.string().required('Required'),
});

let initialValues = {
  bgp_name: '',
};

function CreateBusinessGroup({
  onCloseDrawer,
  createBusinessGroup,
  isVisible
}) {
  return (
    <div>
      <Formik
        id="formik"
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={(values, { resetForm }) => {
          createBusinessGroup(values);
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
                  id="bgp_name"
                  label="Name"
                  name="bgp_name"
                  placeholder="Name"
                  onInputChange={handleChange}
                  onBlur={handleBlur}
                  errorMessage={errors.bgp_name}
                  value={values.bgp_name}
                  touched={touched.bgp_name}
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
                      title="Create"
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

export default CreateBusinessGroup;
