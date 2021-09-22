import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { Row, Col } from 'antd';
import { isEmpty } from 'lodash';
import 'antd/dist/antd.css';
import SPButton from '../../../../../../../components/SPButton';
import InputBox from '../../../../../../../components/InputBox';
import SelectBox from "../../../../../../../components/SelectBox";

function ThreatActorFormDrawer({
  recordValue,
  submit,
  isVisible,
  closeDrawer,
  isCreated,
 associateThreatActor,
}) {
  const [formInitialValues, setFormInitialValues] = useState({
    tra_name: '',
  });

  let validationSchemaStandard = Yup.object({
    tra_name: Yup.string().required('Required'),
  });

  useEffect(() => {
    let initialValues = {};
    if (!isEmpty(recordValue)) {
      initialValues['tra_name'] = recordValue.tra_name;
      initialValues['tra_associated_groups'] = `${recordValue.tra_associated_groups}`;
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
                id={'tra_name'}
                label={'Name'}
                name={'tra_name'}
                placeholder={'Name'}
                onInputChange={handleChange}
                onBlur={handleBlur}
                value={values.tra_name}
                touched={touched.tra_name}
                noBorderValidation
              />
              <SelectBox
                  id="tra_associated_groups"
                  label="Associated Groups"
                  name="tra_associated_groups"
                  onInputChange={setFieldValue}
                  onBlur={handleBlur}
                  errorMessage={errors.tra_associated_groups}
                  value={values.tra_associated_groups}
                  touched={touched.tra_associated_groups}
                  options={associateThreatActor}
                  disabled={isSubmitting}
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

export default ThreatActorFormDrawer;
