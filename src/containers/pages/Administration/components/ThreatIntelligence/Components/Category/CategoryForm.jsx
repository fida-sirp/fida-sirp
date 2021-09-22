import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { Row, Col } from 'antd';
import { isEmpty } from 'lodash';
import 'antd/dist/antd.css';
import SPButton from '../../../../../../../components/SPButton';
import InputBox from '../../../../../../../components/InputBox';

function CategoryFormDrawer({
  recordValue,
  submit,
  isVisible,
  closeDrawer,
  isCreated,
  severityOptions,
}) {
  const [formInitialValues, setFormInitialValues] = useState({
    adc_name: '',
  });

  let validationSchemaStandard = Yup.object({
    adc_name: Yup.string().required('Required'),
  });

  useEffect(() => {
    let initialValues = {};
    if (!isEmpty(recordValue)) {
      initialValues['adc_name'] = recordValue.adc_name;
      setFormInitialValues(initialValues);
    }
  }, [recordValue]);

  return (
    <div>
      <Formik
        id="formik"
        validationSchema={validationSchemaStandard}
        initialValues={formInitialValues}
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
              resetForm();
            }, [isVisible])
          return(
            <Form>
              <InputBox
                id={'adc_name'}
                label={'Name'}
                name={'adc_name'}
                placeholder={'Name'}
                onInputChange={handleChange}
                onBlur={handleBlur}
                value={values.adc_name}
                touched={touched.adc_name}
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

export default CategoryFormDrawer;
