import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { Row, Col } from 'antd';
import SPButton from '../../../../../../components/SPButton';
import 'antd/dist/antd.css';
import { isArray, isEmpty } from 'lodash';
import InputBox from '../../../../../../components/InputBox';

function GroupFormDrawer({ recordValue, submit, type, closeDrawer, isVisible }) {

  const [formInitialValues, setFormInitialValues] = useState({
    ugr_name: "",
  });

  let validationSchemaStandard = Yup.object({
    ugr_name: Yup.string().required('Required'),
  });

  useEffect(() => {
    let initialValues = {};
    if (!type && !isEmpty(recordValue)) {
      initialValues['ugr_name'] = recordValue?.ugr_name;
      setFormInitialValues(initialValues);
    } else {
      setFormInitialValues({
        ugr_name: ""
      });
    }
  }, [recordValue]);

  return (
    <div>
      <Formik
        id="formik"
        validationSchema={validationSchemaStandard}
        initialValues={formInitialValues}
        enableReinitialize={true}
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
                id={'ugr_name'}
                label={'Name'}
                name={'ugr_name'}
                placeholder={'Name'}
                onInputChange={handleChange}
                onBlur={handleBlur}
                value={values.ugr_name}
                errorMessage={errors.ugr_name}
                touched={touched.ugr_name}
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
                    title={type ? "Create" : "Update"}
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

export default GroupFormDrawer;
