import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { Row, Col } from 'antd';
import SPButton from '../../../../../../components/SPButton';
import 'antd/dist/antd.css';
import { isArray, isEmpty } from 'lodash';
import InputBox from '../../../../../../components/InputBox';
import TextAreaBox from '../../../../../../components/TextAreaBox';

function RolesFormDrawer({ recordValue, submit, closeDrawer, type, isVisible }) {
  const [formInitialValues, setFormInitialValues] = useState({
    uro_name: '',
    uro_desc: ""
  });

  let validationSchemaStandard = Yup.object({
    uro_name: Yup.string().required('Required'),
  });

  useEffect(() => {
    let initialValues = {};
    if (!isEmpty(recordValue)) {
      initialValues['uro_name'] = recordValue?.uro_name;
      initialValues['uro_desc'] = recordValue.uro_desc; // For the Descriptions
      setFormInitialValues(initialValues);
    } else {
      setFormInitialValues({
        uro_name: "",
        uro_desc: ""
      });
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
                id={'uro_name'}
                label={'Name'}
                name={'uro_name'}
                placeholder={'Name'}
                onInputChange={handleChange}
                onBlur={handleBlur}
                value={values.uro_name}
                errorMessage={errors.uro_name}
                touched={touched.uro_name}
                width={345}
                noBorderValidation
              />

              <TextAreaBox
                id="description"
                label="Dashboard description"
                name="uro_desc"
                placeholder="Description"
                className="description"
                onInputChange={handleChange}
                onBlur={handleBlur}
                value={values.uro_desc}
                errorMessage={errors.uro_desc}
                touched={touched.uro_desc}
                width={345}
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

export default RolesFormDrawer;
