import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import { Row, Col } from 'antd';
import * as Yup from 'yup';
import SPButton from '../../../../../../components/SPButton';
import InputBox from '../../../../../../components/InputBox';
import SelectBox from '../../../../../../components/SelectBox';
import 'antd/dist/antd.css';

const validationSchema = Yup.object({
  rcc_name: Yup.string().required('Required'),
  rrc_to: Yup.number().required('Required'),
  rrc_from: Yup.number().required('Required'),
});

let initialValues = {
  rcc_name: '',
  rrc_to: '',
  rrc_from: '',
};

function CreateRiskMatrix({
  onCloseDrawer,
  createRiskMatrix,
  rangeFromOptions,
  rangeToOptions,
  colorOptions
}) {

 
  return (
    <div>
      <Formik
        id="formik"
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={(values, { resetForm }) => {
          // console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<')
          createRiskMatrix(values);
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
            <Row>
              <InputBox
                id="rcc_name"
                label="Name"
                name="rcc_name"
                placeholder="Name"
                onInputChange={handleChange}
                onBlur={handleBlur}
                errorMessage={errors.rcc_name}
                value={values.rcc_name}
                touched={touched.rcc_name}
                width={750}
                disabled={isSubmitting}
                noBorderValidation
              />
            </Row>
            <Row>
                <SelectBox
                    id="rrc_from"
                    label="From"
                    name="rrc_from"
                    onInputChange={setFieldValue}
                    onBlur={handleBlur}
                    errorMessage={errors.rrc_from}
                    value={values.rrc_from}
                    touched={touched.rrc_from}
                    options={rangeFromOptions}
                    width={350}
                />
            </Row>

            <Row>
              <SelectBox
                id="rrc_to"
                label="To"
                name="rrc_to"
                // placeholder="rrc_to"
                onInputChange={setFieldValue}
                onBlur={handleBlur}
                errorMessage={errors.rrc_to}
                value={values.rrc_to}
                touched={touched.rrc_to}
                width={750}
                options={rangeToOptions}
                disabled={isSubmitting}
              />
            </Row>

            <Row>
              <SelectBox
                id="rrc_color"
                label="Color"
                name="rrc_color"
                // placeholder="rrc_color"
                onInputChange={setFieldValue}
                onBlur={handleBlur}
                errorMessage={errors.rrc_color}
                value={values.rrc_color}
                touched={touched.rrc_color}
                width={750}
                options={colorOptions}
                disabled={isSubmitting}
              />
            </Row>

            <Row gutter={11} justify="end">
                <Col>
                  <SPButton
                    title="Cancel"
                    size="small"
                    type="secondary"
                    onButtonClick={() => {
                      resetForm();
                      onCloseDrawer();
                    }}
                  />
                </Col>
                <Col>
                  <SPButton
                    title={'Create'}
                    size="small"
                    type="submit"
                    onButtonClick={handleSubmit}
                  />
                </Col>
              </Row>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default CreateRiskMatrix;
