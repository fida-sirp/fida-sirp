import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { Row, Col } from 'antd';
import SPButton from '../../../../../../components/SPButton';
import 'antd/dist/antd.css';
import { isArray, isEmpty } from 'lodash';
import InputBox from '../../../../../../components/InputBox';
import TextAreaBox from '../../../../../../components/TextAreaBox';

function ComplianceFormDrawer({ recordValue, submit, closeDrawer }) {
  const [formInitialValues, setFormInitialValues] = useState({
    com_section_number: '',
    com_section: '',
    com_clause_number: '',
    com_clause: '',
  });

  let validationSchemaStandard = Yup.object({
    com_section_number: Yup.string().required('Required'),
    com_section: Yup.string().required('Required'),
    com_clause_number: Yup.string().required('Required'),
    com_clause: Yup.string().required('Required'),
  });

  useEffect(() => {
    let initialValues = {};
    if (!isEmpty(recordValue)) {
      initialValues['com_section_number'] = recordValue.com_section_number;
      initialValues['com_section'] = recordValue.com_section;
      initialValues['com_clause_number'] = recordValue.com_clause_number;
      initialValues['com_clause'] = recordValue.com_clause;
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
              id={'com_section_number'}
              label={'Section Number'}
              name={'com_section_number'}
              placeholder={'Section Number'}
              onInputChange={handleChange}
              onBlur={handleBlur}
              value={values.com_section_number}
              errorMessage={errors.com_section_number}
              touched={touched.com_section_number}
              width={345}
              noBorderValidation
            />

            <TextAreaBox
              id="com_section"
              name="com_section"
              label={'Section'}
              placeholder={'Section'}
              onInputChange={handleChange}
              onBlur={handleBlur}
              errorMessage={errors.com_section}
              value={values.com_section}
              touched={touched.com_section}
              width={750}
              disabled={isSubmitting}
              noBorderValidation
            />

            <InputBox
              id={'com_clause_number'}
              label={'Clause Number'}
              name={'com_clause_number'}
              placeholder={'Clause Number'}
              onInputChange={handleChange}
              onBlur={handleBlur}
              value={values.com_clause_number}
              errorMessage={errors.com_clause_number}
              touched={touched.com_clause_number}
              width={345}
              noBorderValidation
            />

            <TextAreaBox
              id="com_clause"
              name="com_clause"
              label={'Clause'}
              placeholder={'Clause'}
              onInputChange={handleChange}
              onBlur={handleBlur}
              errorMessage={errors.com_clause}
              value={values.com_clause}
              touched={touched.com_clause}
              width={750}
              disabled={isSubmitting}
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

export default ComplianceFormDrawer;
