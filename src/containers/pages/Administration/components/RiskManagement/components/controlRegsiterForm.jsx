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

function ControlRegisterFormDrawer({ recordValue, submit, closeDrawer }) {
  const statusOptions = [
    { key: 'Enable', value: 'Enable', label: 'Enable' },
    { key: 'Disable', value: 'Disable', label: 'Disable' },
  ];
  const [formInitialValues, setFormInitialValues] = useState({
    crg_name: '',
    crg_status: [],
    crg_desc: '',
  });

  let validationSchemaStandard = Yup.object({
    crg_name: Yup.string().required('Required'),
  });

  useEffect(() => {
    let initialValues = {};
    if (!isEmpty(recordValue)) {
      initialValues['crg_name'] = recordValue.crg_name;
      initialValues['crg_desc'] = recordValue.crg_desc;
      initialValues['crg_status'] = recordValue.crg_status.toString();
      setFormInitialValues(initialValues);
    }else{
      setFormInitialValues({
        crg_name: '',
        crg_status: [],
        crg_desc: '',
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
              id={'crg_name'}
              label={'Name'}
              name={'crg_name'}
              placeholder={'Name'}
              onInputChange={handleChange}
              onBlur={handleBlur}
              value={values.crg_name}
              errorMessage={errors.crg_name}
              touched={touched.crg_name}
              width={345}
              noBorderValidation
            />

            <SelectBox
              id="crg_status"
              label="Status"
              name="crg_status"
              onInputChange={setFieldValue}
              onBlur={handleBlur}
              errorMessage={errors.crg_status}
              value={values.crg_status}
              touched={touched.crg_status}
              width={750}
              options={statusOptions}
              disabled={isSubmitting}
            />

            <TextAreaBox
              id="crg_desc"
              name="crg_desc"
              label={'Description'}
              onInputChange={handleChange}
              onBlur={handleBlur}
              errorMessage={errors.crg_desc}
              value={values.crg_desc}
              touched={touched.crg_desc}
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

export default ControlRegisterFormDrawer;
