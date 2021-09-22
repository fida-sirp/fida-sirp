import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form, isInputEvent } from 'formik';
import { Row, Col } from 'antd';
import SPButton from '../../../../../../components/SPButton';
import 'antd/dist/antd.css';
import { isArray, isEmpty } from 'lodash';
import InputBox from '../../../../../../components/InputBox';
import SelectBox from '../../../../../../components/SelectBox';
import TextAreaBox from '../../../../../../components/TextAreaBox';

function ThreatValueFormDrawer({ recordValue, submit, closeDrawer, isVisible, isCreate }) {
  const [formInitialValues, setFormInitialValues] = useState({
    thv_name: '',
    thv_value: '',
  });

  let validationSchemaStandard = Yup.object({
    thv_name: Yup.string().required('Required'),
    thv_value: Yup.string().required('Required'),
  });

  useEffect(() => {
    let initialValues = {};
    if (!isEmpty(recordValue)) {
      initialValues['thv_name'] = recordValue.thv_name;
      initialValues['thv_value'] = recordValue.thv_value;
      setFormInitialValues(initialValues);
    } else {
      setFormInitialValues({
        thv_name: '',
        thv_value: '',
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
        }) => {
          useEffect(() => {
            resetForm()
          }, [isVisible])
          return (
            <Form>
              <InputBox
                id={'thv_name'}
                label={'Name'}
                name={'thv_name'}
                placeholder={'Name'}
                onInputChange={handleChange}
                onBlur={handleBlur}
                value={values.thv_name}
                errorMessage={errors.thv_name}
                touched={touched.thv_name}
                width={345}
                noBorderValidation
              />
              <InputBox
                id={'thv_value'}
                label={'Value'}
                name={'thv_value'}
                placeholder={'Value'}
                onInputChange={handleChange}
                onBlur={handleBlur}
                value={values.thv_value}
                errorMessage={errors.thv_value}
                touched={touched.thv_value}
                type="number"
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

export default ThreatValueFormDrawer;
