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
  aty_label: Yup.string().required('This Field Required'),
  aty_value: Yup.string().required('This Field Required'),
});


function EditTitle({
  onCloseDrawer,
  editAssetTitleValues,
  selectedAssetValue,
  isVisible
}) {

  let initialValues = {
    aty_label: selectedAssetValue?.asv_label || '',
    aty_value: selectedAssetValue?.asv_value || '',
  };

  return (
    <div>
      <Formik
        id="formik"
        enableReinitialize
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={(values, { resetForm }) => {
          editAssetTitleValues(values);
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
          return ((
            <Form>
              <RowDiv>
                <InputBox
                  id="aty_label"
                  label="Title"
                  name="aty_label"
                  placeholder="Title"
                  onInputChange={handleChange}
                  onBlur={handleBlur}
                  errorMessage={errors.aty_label}
                  value={values.aty_label}
                  touched={touched.aty_label}
                  width={750}
                  disabled={isSubmitting}
                  noBorderValidation
                />
              </RowDiv>
              <RowDiv>
                <InputBox
                  id="aty_value"
                  label="Short"
                  name="aty_value"

                  placeholder="Short"
                  onInputChange={handleChange}
                  onBlur={handleBlur}
                  errorMessage={errors.aty_value}
                  value={values.aty_value}
                  touched={touched.aty_value}
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
                      title={'Update'}
                      size="small"
                      type="submit"
                      onButtonClick={handleSubmit}
                    />
                  </Col>
                </Row>
              </CreateAppControlBtn>
            </Form>
          ))
        }}
      </Formik>
    </div>
  );
}

export default EditTitle;
