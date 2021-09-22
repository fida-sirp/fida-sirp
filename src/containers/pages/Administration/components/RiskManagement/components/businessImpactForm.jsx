import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form, } from 'formik';
import { Row, Col } from 'antd';
import SPButton from '../../../../../../components/SPButton';
import 'antd/dist/antd.css';
import { isArray, isEmpty } from 'lodash';
import InputBox from '../../../../../../components/InputBox';
import SelectBox from '../../../../../../components/SelectBox';
import TextAreaBox from '../../../../../../components/TextAreaBox';

function BusinessImpactFormDrawer({ recordValue, submit, closeDrawer }) {
  const statusOptions = [
    { key: 'Enable', value: 'Enable', label: 'Enable' },
    { key: 'Disable', value: 'Disable', label: 'Disable' },
  ];
  const [formInitialValues, setFormInitialValues] = useState({
    rbi_name: '',
    rbi_value: '',
  });

  let validationSchemaStandard = Yup.object({
    rbi_name: Yup.string().required('Required'),
    rbi_value: Yup.string().required('Required'),
  });

  useEffect(() => {
    let initialValues = {};
    if (!isEmpty(recordValue)) {
      initialValues['rbi_name'] = recordValue.rbi_name;
      initialValues['rbi_value'] = recordValue.rbi_value;
      setFormInitialValues(initialValues);
    }else{
      setFormInitialValues({
        rbi_name: '',
        rbi_value: '',
      })
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
              id={'rbi_name'}
              label={'Name'}
              name={'rbi_name'}
              placeholder={'Name'}
              onInputChange={handleChange}
              onBlur={handleBlur}
              value={values.rbi_name}
              errorMessage={errors.rbi_name}
              touched={touched.rbi_name}
              width={345}
              noBorderValidation
            />

            <InputBox
              id={'rbi_value'}
              label={'Value'}
              name={'rbi_value'}
              placeholder={'Value'}
              onInputChange={handleChange}
              onBlur={handleBlur}
              value={values.rbi_value}
              errorMessage={errors.rbi_value}
              touched={touched.rbi_value}
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

export default BusinessImpactFormDrawer;
