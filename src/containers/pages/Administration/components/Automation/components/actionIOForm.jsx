import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { Row, Col } from 'antd';
import SPButton from '../../../../../../components/SPButton';
import 'antd/dist/antd.css';
import { isArray, isEmpty } from 'lodash';
import InputBox from '../../../../../../components/InputBox';
import SelectBox from '../../../../../../components/SelectBox';

function ActionIOFormDrawer({
  isVisible,
  recordValue,
  submit,
  closeDrawer,
  validationList,
  isCreate
}) {
  const initialValues = {
    aio_type: recordValue?.aio_type || '',
    aio_artifact_name: recordValue?.aio_artifact_name || '',
    aio_validation: recordValue?.aio_validation || "",
  }

  let validationSchemaStandard = Yup.object({
    aio_type: Yup.string().required('Required'),
  });

  return (
    <div>
      <Formik
        id="formik"
        validationSchema={validationSchemaStandard}
        initialValues={initialValues}
        enableReinitialize
        onSubmit={(values, { resetForm }) => {
          submit(values);
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
              <InputBox
                id={'aio_type'}
                label={'Type'}
                name={'aio_type'}
                placeholder={'Type'}
                onInputChange={handleChange}
                onBlur={handleBlur}
                value={values.aio_type}
                errorMessage={errors.aio_type}
                touched={touched.aio_type}
                width={345}
                noBorderValidation
              />

              <InputBox
                id={'aio_artifact_name'}
                label={'Artifact'}
                name={'aio_artifact_name'}
                placeholder={'Artifact'}
                onInputChange={handleChange}
                onBlur={handleBlur}
                value={values.aio_artifact_name}
                errorMessage={errors.aio_artifact_name}
                touched={touched.aio_artifact_name}
                width={345}
                noBorderValidation
              />

              <SelectBox
                id="aio_validation"
                label="Validation"
                name="aio_validation"
                placeholder="Validation"
                onInputChange={setFieldValue}
                onBlur={handleBlur}
                errorMessage={errors.aio_validation}
                value={values.aio_validation}
                touched={touched.aio_validation}
                width={345}
                options={validationList}
                disabled={isSubmitting}
              />
              <Row gutter={11} justify="end" >
                <Col>
                  <SPButton
                    title="Cancel"
                    size="small"
                    type="secondary"
                    onButtonClick={() => {
                      resetForm();
                      closeDrawer();
                    }}
                  />
                </Col>
                <Col>
                  <SPButton
                    title={isCreate ? "Save" : "Update"}
                    size="small"
                    type="submit"
                    onButtonClick={handleSubmit}
                    isLoading={false}
                  />
                </Col>
              </Row>
            </Form>
          )
        }}
      </Formik>
    </div>
  );
}

export default ActionIOFormDrawer;
