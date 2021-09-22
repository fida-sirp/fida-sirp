import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { Row, Col } from 'antd';
import SPButton from '../../../../../../components/SPButton';
import 'antd/dist/antd.css';
import { isArray, isEmpty } from 'lodash';
import InputBox from '../../../../../../components/InputBox';

function PublisherFormDrawer({ recordValue, submit, closeDrawer, isVisible, isCreated }) {

  const intialValue = {
    apb_name: recordValue?.apb_name || "",
    apb_url: recordValue?.apb_url || ""
  }
  let validationSchemaStandard = Yup.object({
    apb_name: Yup.string().required('Required'),
    apb_url: Yup.string().required('Required'),
  });

  return (
    <div>
      <Formik
        id="formik"
        validationSchema={validationSchemaStandard}
        initialValues={intialValue}
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
                id={'apb_name'}
                label={'Name'}
                name={'apb_name'}
                placeholder={'Name'}
                onInputChange={handleChange}
                onBlur={handleBlur}
                value={values.apb_name}
                errorMessage={errors.apb_name}
                touched={touched.apb_name}
                width={345}
                noBorderValidation
              />

              <InputBox
                id={'apb_url'}
                label={'Url'}
                name={'apb_url'}
                placeholder={'Url'}
                onInputChange={handleChange}
                onBlur={handleBlur}
                value={values.apb_url}
                errorMessage={errors.apb_url}
                touched={touched.apb_url}
                width={345}
                noBorderValidation
              />
              <Row gutter={11} justify="end" style={{ width: 640 }}>
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
                    title={isCreated ? "Save" : "Update"}
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

export default PublisherFormDrawer;
