import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { Row, Col } from 'antd';
import SPButton from '../../../../../../components/SPButton';
import 'antd/dist/antd.css';
import { isArray, isEmpty } from 'lodash';
import InputBox from '../../../../../../components/InputBox';

function ThreatFormDrawer({ recordValue, submit, closeDrawer, isVisible, isCreate }) {
  const intialValue = {
    feed_title: recordValue?.feed_title || '',
    feed_url: recordValue?.feed_url || '',
  }
  let validationSchemaStandard = Yup.object({
    feed_title: Yup.string().required('This Field is Required'),
    feed_url: Yup.string().required('This Field is Required'),
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
                id={'feed_title'}
                label={'Name'}
                name={'feed_title'}
                placeholder={'Name'}
                onInputChange={handleChange}
                onBlur={handleBlur}
                value={values.feed_title}
                errorMessage={errors.feed_title}
                touched={touched.feed_title}
                width={345}
                noBorderValidation
              />

              <InputBox
                id={'feed_url'}
                label={'Url'}
                name={'feed_url'}
                placeholder={'Url'}
                onInputChange={handleChange}
                onBlur={handleBlur}
                value={values.feed_url}
                errorMessage={errors.feed_url}
                touched={touched.feed_url}
                width={345}
                noBorderValidation
              />
              <Row gutter={11} justify="end">
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

export default ThreatFormDrawer;
