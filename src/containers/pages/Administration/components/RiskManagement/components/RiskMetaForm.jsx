import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { Row, Col } from 'antd';
import SPButton from '../../../../../../components/SPButton';
import 'antd/dist/antd.css';

import InputBox from '../../../../../../components/InputBox';
import { isEmpty } from 'lodash';


function RiskMetaForm({ recordValue, submit, closeDrawer }) {

  const [formInitialValues, setFormInitialValues] = useState({
    rrl_value: '',
  });

  let validationSchemaStandard = Yup.object({
    rrl_value: Yup.string().required('Required'),
  });

  useEffect(() => {
    let initialValues = {};
    if (!isEmpty(recordValue)) {
      initialValues['rrl_value'] = recordValue;
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
        }) => (
          <Form>
            <InputBox
              id={'rrl_value'}
              label={'Risk Label Value'}
              name={'rrl_value'}
              placeholder={'Risk Label Value'}
              onInputChange={handleChange}
              onBlur={handleBlur}
              value={values.rrl_value}
              errorMessage={errors.rrl_value}
              touched={touched.rrl_value}
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
                  title="Save"
                  size="small"
                  type="submit"
                  onButtonClick={handleSubmit}
                  isLoading={false}
                />
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default RiskMetaForm;
