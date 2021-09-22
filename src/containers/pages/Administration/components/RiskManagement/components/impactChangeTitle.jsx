import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { Row, Col } from 'antd';
import SPButton from '../../../../../../components/SPButton';
import 'antd/dist/antd.css';
import { isArray, isEmpty } from 'lodash';
import InputBox from '../../../../../../components/InputBox';
import SelectBox from '../../../../../../components/SelectBox';
import TextAreaBox from '../../../../../../components/TextAreaBox';

function BusinessImpactChangeTitleFormDrawer({
  recordValue,
  submit,
  closeDrawer,
}) {
  const statusOptions = [
    { key: 'Enable', value: 'Enable', label: 'Enable' },
    { key: 'Disable', value: 'Disable', label: 'Disable' },
  ];
  const [formInitialValues, setFormInitialValues] = useState({
    rbi_label: recordValue?.rbi_label || '',
    rbi_short: recordValue?.rbi_short || '',

    // rbi_label: '',
    // rbi_short: '',
  });

  let validationSchemaStandard = Yup.object();

  //   useEffect(() => {
  //     let initialValues = {};
  //     if (!isEmpty(recordValue)) {
  //       initialValues['rbi_label'] = recordValue.rbi_label;
  //       initialValues['rbi_short'] = recordValue.rbi_short;
  //       setFormInitialValues(initialValues);
  //     }
  //   }, [recordValue]);

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
              id={'rbi_label'}
              label={'Title'}
              name={'rbi_label'}
              placeholder={'Title'}
              onInputChange={handleChange}
              onBlur={handleBlur}
              value={values.rbi_label}
              errorMessage={errors.rbi_label}
              touched={touched.rbi_label}
              width={345}
              noBorderValidation
            />

            <InputBox
              id={'rbi_short'}
              label={'Short'}
              name={'rbi_short'}
              placeholder={'Short'}
              onInputChange={handleChange}
              onBlur={handleBlur}
              value={values.rbi_short}
              errorMessage={errors.rbi_short}
              touched={touched.rbi_short}
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

export default BusinessImpactChangeTitleFormDrawer;
