import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import { Row, Col } from 'antd';
import * as Yup from 'yup';
import SPButton from '../../../../../../../../components/SPButton';
import InputBox from '../../../../../../../../components/InputBox';
import 'antd/dist/antd.css';
import { RowDiv, CreateAppControlBtn } from './StyledComponents';

const validationSchema = Yup.object({
  dep_name: Yup.string().required('Required'),
  dep_email: Yup.string().email('Invalid Email').required('Required'),
});

function EditDepartments({
  onCloseDrawer,
  selectedDepartmentData,
  editDepartment,
}) {

  let initialValues = {
    dep_name: selectedDepartmentData?.dep_name || '',
    dep_email: selectedDepartmentData?.dep_email || '',
  };

  return (
    <div>
      <Formik
        id="formik"
        enableReinitialize
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={(values, { resetForm }) => {
          editDepartment(values);
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
          return (
            <Form>
              <RowDiv>
                <InputBox
                  id="dep_name"
                  label="Name"
                  name="dep_name"
                  placeholder="Name"
                  onInputChange={handleChange}
                  onBlur={handleBlur}
                  errorMessage={errors.dep_name}
                  value={values.dep_name}
                  touched={touched.dep_name}
                  width={750}
                  disabled={isSubmitting}
                  noBorderValidation
                />
              </RowDiv>
              <RowDiv>
                <InputBox
                  id="dep_email"
                  label="Email"
                  name="dep_email"
                  placeholder="Email"
                  onInputChange={handleChange}
                  onBlur={handleBlur}
                  errorMessage={errors.dep_email}
                  value={values.dep_email}
                  touched={touched.dep_email}
                  width={750}
                  disabled={isSubmitting}
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
                      title={'save'}
                      size="small"
                      type="submit"
                      onButtonClick={handleSubmit}
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

export default EditDepartments;
