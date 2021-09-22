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

function ThreatRegisterFormDrawer({
  recordValue,
  submit,
  closeDrawer,
  valueList,
  associateList,
  isVisible,
  isCreate
}) {
  const [formInitialValues, setFormInitialValues] = useState({
    thr_name: '',
    thr_value: [],
    thr_desc: '',
    vrg_id: [],
  });

  let validationSchemaStandard = Yup.object({
    thr_name: Yup.string().required('Required'),
    vrg_id: Yup.string().required('Required'),
  });

  useEffect(() => {
    let initialValues = {};
    if (!isEmpty(recordValue)) {
      initialValues['thr_name'] = recordValue?.thr_name;
      initialValues['thr_desc'] = recordValue?.thr_desc;
      initialValues['thr_value'] = recordValue?.thr_value.toString();
      initialValues['vrg_id'] = recordValue?.thr_id.toString();
      setFormInitialValues(initialValues);
    } else {
      setFormInitialValues({
        thr_name: '',
        thr_value: [],
        thr_desc: '',
        vrg_id: [],
      });
    }

    console.log(formInitialValues);
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
                id={'thr_name'}
                label={'Name'}
                name={'thr_name'}
                placeholder={'Name'}
                onInputChange={handleChange}
                onBlur={handleBlur}
                value={values.thr_name}
                errorMessage={errors.thr_name}
                touched={touched.thr_name}
                noBorderValidation
              />

              <SelectBox
                id="thr_value"
                label="Value"
                name="thr_value"
                onInputChange={setFieldValue}
                onBlur={handleBlur}
                errorMessage={errors.thr_value}
                value={values.thr_value}
                touched={touched.thr_value}
                width={750}
                options={valueList}
                disabled={isSubmitting}
              />

              <TextAreaBox
                id="thr_desc"
                name="thr_desc"
                label={'Description'}
                onInputChange={handleChange}
                onBlur={handleBlur}
                errorMessage={errors.thr_desc}
                value={values.thr_desc}
                touched={touched.thr_desc}
                width={750}
                disabled={isSubmitting}
                noBorderValidation
              />

              <SelectBox
                id="vrg_id"
                label="Associated Vulnerabilities"
                name="vrg_id"
                onInputChange={setFieldValue}
                //   mode="multiple"
                onBlur={handleBlur}
                errorMessage={errors.vrg_id}
                value={values.vrg_id}
                touched={touched.vrg_id}
                width={750}
                options={associateList}
                disabled={isSubmitting}
              />
              <Row gutter={11} justify="end" >
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

export default ThreatRegisterFormDrawer;
