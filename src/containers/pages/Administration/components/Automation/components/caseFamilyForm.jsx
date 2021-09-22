import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { Row, Col } from 'antd';
import SPButton from '../../../../../../components/SPButton';
import 'antd/dist/antd.css';
import { isArray, isEmpty } from 'lodash';
import InputBox from '../../../../../../components/InputBox';
import SelectBox from '../../../../../../components/SelectBox';

const statusOptions = [
  { key: 'Enable', value: 'Enable', label: 'Enable' },
  { key: 'Disable', value: 'Disable', label: 'Disable' },
];

function CaseFamilyFormDrawer({ recordValue, submit, closeDrawer, isVisible, isCreate }) {
  const initialValues = {
    pc_name: recordValue?.pc_name || '',
    pc_status: recordValue?.pc_status || '',
  }
  let validationSchemaStandard = Yup.object({
    pc_name: Yup.string().required("This Field is Required")
  });

  return (
    <div>
      <Formik
        id="formik"
        validationSchema={validationSchemaStandard}
        initialValues={initialValues}
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
                id={'pc_name'}
                label={'Use Case Family Name'}
                name={'pc_name'}
                placeholder={'Use Case Family Name'}
                onInputChange={handleChange}
                onBlur={handleBlur}
                value={values.pc_name}
                errorMessage={errors.pc_name}
                touched={touched.pc_name}
                width={345}
                noBorderValidation
              />

              <SelectBox
                id="pc_status"
                label="Use Case Family Status"
                name="pc_status"
                placeholder="Use Case Family Status"
                onInputChange={setFieldValue}
                onBlur={handleBlur}
                errorMessage={errors.pc_status}
                value={values.pc_status}
                touched={touched.pc_status}
                options={statusOptions}
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

export default CaseFamilyFormDrawer;
