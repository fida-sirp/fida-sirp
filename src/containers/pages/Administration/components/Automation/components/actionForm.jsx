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

function ActionFormDrawer({
  recordValue,
  submit,
  closeDrawer,
  type,
  scriptType,
  ioType,
  application,
  isVisible,
  isCreate
}) {
  const formInitialValues = {
    act_app_id: recordValue?.act_app_id?.toString() || '',
    act_name: recordValue?.act_name || '',
    act_description: recordValue?.act_description || '',
    act_input_type_id: recordValue?.act_input_type_id?.toString() || '',
    act_output_type_id: recordValue?.act_output_type_id?.toString() || '',
    act_execution_script: recordValue?.act_execution_script || '',
    act_location: recordValue?.act_location || 'both',
    act_execution_script_type: recordValue?.act_execution_script_type || 'php',
    act_type: recordValue?.act_type || 'investigation',
    act_is_multistep: recordValue?.act_is_multistep || 'False',
    act_is_multiinput: recordValue?.act_is_multiinput || 'False',
    act_sample_output: '',
  }
  let validationSchemaStandard = Yup.object({
    act_name: Yup.string().required("Field Is Required")
  });
  const location = [
    {
      key: 'both',
      value: 'both',
      label: 'Both',
    },
    {
      key: 'internal',
      value: 'internal',
      label: 'Internal',
    },
    {
      key: 'external',
      value: 'external',
      label: 'External',
    },
  ];

  const multi = [
    {
      key: 'False',
      value: 'False',
      label: 'False',
    },
    {
      key: 'True',
      value: 'True',
      label: 'True',
    },
  ];
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
              <SelectBox
                id="act_app_id"
                label="App"
                name="act_app_id"
                onInputChange={setFieldValue}
                onBlur={handleBlur}
                errorMessage={errors.act_app_id}
                value={values.act_app_id}
                touched={touched.act_app_id}
                options={application}
                disabled={isSubmitting}
              />

              <InputBox
                id={'act_name'}
                label={'Name'}
                name={'act_name'}
                placeholder={'Name'}
                onInputChange={handleChange}
                onBlur={handleBlur}
                value={values.act_name}
                errorMessage={errors.act_name}
                touched={touched.act_name}
                noBorderValidation
              />

              <TextAreaBox
                id="act_description"
                label="Description"
                name="act_description"
                placeholder="Description"
                className=""
                onInputChange={handleChange}
                onBlur={handleBlur}
                errorMessage={errors.act_description}
                touched={touched.act_description}
                value={values.act_description}
                noBorderValidation
              />
              <SelectBox
                id="act_input_type_id"
                label="Input Type"
                name="act_input_type_id"
                onInputChange={setFieldValue}
                onBlur={handleBlur}
                errorMessage={errors.act_input_type_id}
                value={values.act_input_type_id}
                touched={touched.act_input_type_id}
                options={ioType}
                disabled={isSubmitting}
              />

              <SelectBox
                id="act_output_type_id"
                label="Output Type"
                name="act_output_type_id"
                onInputChange={setFieldValue}
                onBlur={handleBlur}
                errorMessage={errors.act_output_type_id}
                value={values.act_output_type_id}
                touched={touched.act_output_type_id}
                options={ioType}
                disabled={isSubmitting}
              />

              <InputBox
                id={'act_execution_script'}
                label={'Execution Script'}
                name={'act_execution_script'}
                placeholder={'Execution Script'}
                onInputChange={handleChange}
                onBlur={handleBlur}
                value={values.act_execution_script}
                errorMessage={errors.act_execution_script}
                touched={touched.act_execution_script}
                noBorderValidation
              />

              <SelectBox
                id="act_location"
                label="Execution location"
                name="act_location"
                onInputChange={setFieldValue}
                onBlur={handleBlur}
                errorMessage={errors.act_location}
                value={values.act_location}
                touched={touched.act_location}
                options={location}
                disabled={isSubmitting}
              />

              <SelectBox
                id="act_execution_script_type"
                label="Execution Script type"
                name="act_execution_script_type"
                onInputChange={setFieldValue}
                onBlur={handleBlur}
                errorMessage={errors.act_execution_script_type}
                value={values.act_execution_script_type}
                touched={touched.act_execution_script_type}
                options={scriptType}
                disabled={isSubmitting}
              />

              <SelectBox
                id="act_type"
                label="Type"
                name="act_type"
                onInputChange={setFieldValue}
                onBlur={handleBlur}
                errorMessage={errors.act_type}
                value={values.act_type}
                touched={touched.act_type}
                options={type}
                disabled={isSubmitting}
              />

              <SelectBox
                id="act_is_multistep"
                label="Multi-Step"
                name="act_is_multistep"
                onInputChange={setFieldValue}
                onBlur={handleBlur}
                errorMessage={errors.act_is_multistep}
                value={values.act_is_multistep}
                touched={touched.act_is_multistep}
                options={multi}
                disabled={isSubmitting}
              />

              <SelectBox
                id="act_is_multiinput"
                label="Multi-Input"
                TextAreaBox
                name="act_is_multiinput"
                onInputChange={setFieldValue}
                onBlur={handleBlur}
                errorMessage={errors.act_is_multiinput}
                value={values.act_is_multiinput}
                touched={touched.act_is_multiinput}
                options={multi}
                disabled={isSubmitting}
              />

              <TextAreaBox
                id={'act_sample_output'}
                label={'Sample Output'}
                name={'act_sample_output'}
                placeholder={'Artifact'}
                onInputChange={handleChange}
                onBlur={handleBlur}
                value={values.act_sample_output}
                errorMessage={errors.act_sample_output}
                touched={touched.act_sample_output}
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

export default ActionFormDrawer;
