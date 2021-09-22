import React from 'react';
import { Formik, Form } from 'formik';
import { Row, Col } from 'antd';
import * as Yup from 'yup';
import SPButton from '../../../../../../../../components/SPButton';
import InputBox from '../../../../../../../../components/InputBox';
import 'antd/dist/antd.css';
import { RowDiv, CreateAppControlBtn } from './StyledComponents';
import { useEffect } from 'react';

const validationSchema = Yup.object({
  aos_os_name: Yup.string().required('Required'),
  aos_os_version: Yup.string().required('Required'),
});

let initialValues = {
  aos_os_name: '',
  aos_os_version: '',
};

function CreateOs({
  onCloseDrawer,
  assetCurrentAction,
  createOs,
  isVisible
}) {

  return (
    <div>
      <Formik
        id="formik"
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={(values, { resetForm }) => {
          createOs(values);
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
                  id="aos_os_name"
                  label="Name"
                  name="aos_os_name"
                  placeholder="Name"
                  onInputChange={handleChange}
                  onBlur={handleBlur}
                  errorMessage={errors.aos_os_name}
                  value={values.aos_os_name}
                  touched={touched.aos_os_name}
                  width={750}
                  disabled={isSubmitting}
                  noBorderValidation
                />
              </RowDiv>
              <RowDiv>
                <InputBox
                  id="aos_os_version"
                  label="Version"
                  name="aos_os_version"
                  placeholder="Version"
                  onInputChange={handleChange}
                  onBlur={handleBlur}
                  errorMessage={errors.aos_os_version}
                  value={values.aos_os_version}
                  touched={touched.aos_os_version}
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
                      title={assetCurrentAction === 'Edit' ? 'save' : 'Create'}
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

export default CreateOs;
